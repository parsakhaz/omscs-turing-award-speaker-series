#!/usr/bin/env node
// pane-run-script.js — Cross-platform dev server launcher for Pane worktree workflows.
// Handles port assignment, stale lock cleanup, dependency freshness, and clean shutdown.

const { execSync, spawn } = require("child_process");
const fs = require("fs");
const net = require("net");
const path = require("path");
const crypto = require("crypto");

const IS_WIN = process.platform === "win32";
const CWD = process.cwd();

// ---------------------------------------------------------------------------
// 1. Detect project type
// ---------------------------------------------------------------------------

function detectProject() {
  if (fs.existsSync(path.join(CWD, "package.json"))) {
    const pkg = JSON.parse(fs.readFileSync(path.join(CWD, "package.json"), "utf8"));
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    const scripts = pkg.scripts || {};

    // Determine package manager
    let pm = "npm";
    if (fs.existsSync(path.join(CWD, "bun.lockb"))) pm = "bun";
    else if (fs.existsSync(path.join(CWD, "pnpm-lock.yaml"))) pm = "pnpm";
    else if (fs.existsSync(path.join(CWD, "yarn.lock"))) pm = "yarn";

    // Determine framework
    let framework = "node";
    if (deps["next"]) framework = "next";
    else if (deps["nuxt"]) framework = "nuxt";
    else if (deps["vite"] || deps["@vitejs/plugin-react"]) framework = "vite";
    else if (deps["@angular/core"]) framework = "angular";
    else if (deps["svelte"] || deps["@sveltejs/kit"]) framework = "svelte";

    // Dev command — use the package.json "dev" script if available
    let devCmd = scripts.dev ? `${pm} run dev` : null;
    if (!devCmd && scripts.start) devCmd = `${pm} run start`;
    if (!devCmd) devCmd = `${pm} run dev`;

    // Lock file for dependency freshness check
    const lockFiles = {
      npm: "package-lock.json",
      yarn: "yarn.lock",
      pnpm: "pnpm-lock.yaml",
      bun: "bun.lockb",
    };

    return {
      type: "node",
      framework,
      pm,
      devCmd,
      lockFile: lockFiles[pm],
      installCmd: pm === "npm" ? "npm install" : `${pm} install`,
      buildDir: framework === "next" ? ".next" : "dist",
      portFlag: framework === "next" ? "-p" : "--port",
    };
  }

  if (fs.existsSync(path.join(CWD, "requirements.txt")) || fs.existsSync(path.join(CWD, "pyproject.toml"))) {
    return { type: "python", devCmd: "python -m http.server", portFlag: "", framework: "python" };
  }
  if (fs.existsSync(path.join(CWD, "Cargo.toml"))) {
    return { type: "rust", devCmd: "cargo run", portFlag: "", framework: "rust" };
  }
  if (fs.existsSync(path.join(CWD, "go.mod"))) {
    return { type: "go", devCmd: "go run .", portFlag: "", framework: "go" };
  }

  console.error("Could not detect project type in", CWD);
  process.exit(1);
}

// ---------------------------------------------------------------------------
// 2. Git worktree detection and port assignment
// ---------------------------------------------------------------------------

function isWorktree() {
  const dotGit = path.join(CWD, ".git");
  try {
    const stat = fs.statSync(dotGit);
    // A worktree has a .git *file* pointing to the main repo, not a directory
    return stat.isFile();
  } catch {
    return false;
  }
}

function assignPort() {
  const hash = crypto.createHash("md5").update(CWD).digest();
  const numeric = hash.readUInt32BE(0);
  // Main repo: 3000–3999, worktrees: 4000–4999
  const basePort = isWorktree() ? 4000 : 3000;
  return basePort + (numeric % 1000);
}

// ---------------------------------------------------------------------------
// 3. Port availability — check BOTH IPv4 and IPv6
// ---------------------------------------------------------------------------

function checkPortFree(port, host, opts) {
  return new Promise((resolve) => {
    const srv = net.createServer();
    srv.once("error", () => resolve(false));
    srv.listen({ port, host, ...opts }, () => srv.close(() => resolve(true)));
  });
}

async function isPortAvailable(port) {
  // Check sequentially — parallel binds conflict on Linux where :: grabs IPv4 too.
  // Use ipv6Only so the :: check doesn't also claim 0.0.0.0.
  const v4 = await checkPortFree(port, "0.0.0.0");
  if (!v4) return false;
  const v6 = await checkPortFree(port, "::", { ipv6Only: true });
  return v6;
}

// ---------------------------------------------------------------------------
// 4. Port reclamation — find PID holding port, kill only if it's ours
// ---------------------------------------------------------------------------

function getPidOnPort(port) {
  try {
    if (IS_WIN) {
      const out = execSync(`netstat -ano -p TCP | findstr :${port}`, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] });
      for (const line of out.trim().split("\n")) {
        if (line.includes("LISTENING")) {
          const parts = line.trim().split(/\s+/);
          return parseInt(parts[parts.length - 1], 10);
        }
      }
    } else {
      // Try lsof first, fall back to ss (more reliable for orphaned children on Linux)
      let out = execSync(`lsof -iTCP:${port} -sTCP:LISTEN -t 2>/dev/null || true`, { encoding: "utf8" });
      let pid = parseInt(out.trim().split("\n")[0], 10);
      if (!isNaN(pid)) return pid;

      // Fallback: ss -tlnp parses "pid=NNNN" from output
      out = execSync(`ss -tlnp 'sport = :${port}' 2>/dev/null || true`, { encoding: "utf8" });
      const m = out.match(/pid=(\d+)/);
      if (m) return parseInt(m[1], 10);
    }
  } catch { /* port not held */ }
  return null;
}

function getProcessCmdline(pid) {
  try {
    if (IS_WIN) {
      return execSync(`wmic process where ProcessId=${pid} get CommandLine /format:list`, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] });
    } else {
      return fs.readFileSync(`/proc/${pid}/cmdline`, "utf8").replace(/\0/g, " ");
    }
  } catch {
    return "";
  }
}

function isOurProcess(pid) {
  const cmdline = getProcessCmdline(pid);
  const projectDir = CWD.replace(/\\/g, "/");
  const normalizedCmd = cmdline.replace(/\\/g, "/");

  // Direct match: cmdline references this project directory
  if (normalizedCmd.includes(projectDir)) return true;

  // Worktree match: cmdline references the main repo (parent of worktrees/)
  const mainRepoMatch = projectDir.match(/^(.+?)\/worktrees\//);
  if (mainRepoMatch && normalizedCmd.includes(mainRepoMatch[1])) return true;

  // CWD match: check the process's working directory via /proc
  if (!IS_WIN) {
    try {
      const procCwd = fs.readlinkSync(`/proc/${pid}/cwd`).replace(/\\/g, "/");
      if (procCwd === projectDir || procCwd.startsWith(projectDir + "/")) return true;
      if (mainRepoMatch && procCwd.startsWith(mainRepoMatch[1])) return true;
    } catch { /* /proc may not be available */ }
  }

  return false;
}

function killProcess(pid) {
  try {
    if (IS_WIN) {
      execSync(`taskkill /F /T /PID ${pid}`, { stdio: "ignore" });
    } else {
      // Kill the process group to catch child processes
      try { process.kill(-pid, "SIGTERM"); } catch { process.kill(pid, "SIGTERM"); }
    }
    // Give it a moment to release the port
    execSync(IS_WIN ? "timeout /t 1 >nul" : "sleep 0.5", { stdio: "ignore" });
    console.log(`  Killed stale process (PID ${pid}) to reclaim port.`);
  } catch {
    console.warn(`  Warning: could not kill PID ${pid}.`);
  }
}

async function reclaimOrFindPort(preferred) {
  if (await isPortAvailable(preferred)) return preferred;

  // Try to reclaim
  const pid = getPidOnPort(preferred);
  if (pid && isOurProcess(pid)) {
    console.log(`  Port ${preferred} held by stale dev server (PID ${pid}), reclaiming...`);
    killProcess(pid);
    if (await isPortAvailable(preferred)) return preferred;
  } else if (pid) {
    console.log(`  Port ${preferred} in use by another process (PID ${pid}), skipping.`);
  }

  // Auto-increment to find a free port
  for (let offset = 1; offset <= 50; offset++) {
    const candidate = preferred + offset;
    if (await isPortAvailable(candidate)) {
      console.log(`  Preferred port ${preferred} unavailable, using ${candidate} instead.`);
      return candidate;
    }
  }

  console.error("Could not find a free port in range. Exiting.");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// 5. Stale framework lock file cleanup
// ---------------------------------------------------------------------------

function cleanStaleLocks() {
  const stalePaths = [
    ".next/dev/lock",
    ".next/trace",
    ".cache/lock",
    ".vite/deps/_metadata.json.lock",
    ".svelte-kit/tsconfig.json.lock",
    ".angular/cache/lock",
  ];

  // Also clean .vite temp files
  const viteTmp = path.join(CWD, ".vite");
  if (fs.existsSync(viteTmp)) {
    try {
      const files = fs.readdirSync(viteTmp);
      for (const f of files) {
        if (f.endsWith(".tmp")) {
          fs.unlinkSync(path.join(viteTmp, f));
          console.log(`  Cleaned stale temp: .vite/${f}`);
        }
      }
    } catch { /* ignore */ }
  }

  for (const rel of stalePaths) {
    const full = path.join(CWD, rel);
    if (fs.existsSync(full)) {
      try {
        const stat = fs.statSync(full);
        if (stat.isDirectory()) {
          fs.rmSync(full, { recursive: true, force: true });
        } else {
          fs.unlinkSync(full);
        }
        console.log(`  Cleaned stale lock: ${rel}`);
      } catch { /* ignore */ }
    }
  }
}

// ---------------------------------------------------------------------------
// 6. Dependency freshness check
// ---------------------------------------------------------------------------

function checkDeps(project) {
  if (project.type !== "node" || !project.lockFile) return;

  const lockPath = path.join(CWD, project.lockFile);
  const nmPath = path.join(CWD, "node_modules");

  if (!fs.existsSync(nmPath)) {
    console.log("  node_modules missing — running install...");
    execSync(project.installCmd, { cwd: CWD, stdio: "inherit" });
    return;
  }

  if (!fs.existsSync(lockPath)) return;

  try {
    const lockMtime = fs.statSync(lockPath).mtimeMs;
    // Use node_modules/.package-lock.json (npm) or node_modules/.yarn-integrity (yarn) as sentinel
    const sentinels = [
      path.join(nmPath, ".package-lock.json"),
      path.join(nmPath, ".yarn-integrity"),
      path.join(nmPath, ".modules.yaml"),
    ];

    let newest = 0;
    for (const s of sentinels) {
      try {
        const t = fs.statSync(s).mtimeMs;
        if (t > newest) newest = t;
      } catch { /* sentinel doesn't exist */ }
    }

    if (newest === 0) {
      // No sentinel found, fall back to node_modules dir mtime
      newest = fs.statSync(nmPath).mtimeMs;
    }

    if (lockMtime > newest) {
      console.log("  Lock file newer than node_modules — refreshing dependencies...");
      execSync(project.installCmd, { cwd: CWD, stdio: "inherit" });
    }
  } catch { /* non-fatal */ }
}

// ---------------------------------------------------------------------------
// 7. Build staleness check
// ---------------------------------------------------------------------------

function newestMtime(dir, ext) {
  let newest = 0;
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      if (e.name === "node_modules" || e.name === ".next" || e.name === ".git") continue;
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        const sub = newestMtime(full, ext);
        if (sub > newest) newest = sub;
      } else if (!ext || ext.some((x) => e.name.endsWith(x))) {
        const t = fs.statSync(full).mtimeMs;
        if (t > newest) newest = t;
      }
    }
  } catch { /* ignore permission errors etc. */ }
  return newest;
}

function isBuildStale(project) {
  if (project.type !== "node") return false;
  const buildDir = path.join(CWD, project.buildDir);
  if (!fs.existsSync(buildDir)) return false; // dev mode doesn't need pre-built output

  const srcMtime = newestMtime(path.join(CWD, "src"), [".ts", ".tsx", ".js", ".jsx", ".css", ".json"]);
  const buildMtime = newestMtime(buildDir, null);

  if (srcMtime > buildMtime) {
    console.log("  Build output appears stale (src modified after last build).");
    return true;
  }
  return false;
}

// ---------------------------------------------------------------------------
// 8. Spawn dev server with clean shutdown
// ---------------------------------------------------------------------------

function buildPortArgs(project, port) {
  // Next.js: next dev -p PORT
  if (project.framework === "next") return ["-p", String(port)];
  // Vite / others: --port PORT
  if (["vite", "angular", "svelte", "nuxt"].includes(project.framework)) return ["--port", String(port)];
  return [];
}

function startServer(project, port) {
  const portArgs = buildPortArgs(project, port);

  // Build the command: split devCmd into command + args, append port args
  const parts = project.devCmd.split(/\s+/);
  const cmd = parts[0];
  // npm/yarn need "--" to forward extra args to the underlying script
  const needsSeparator = portArgs.length > 0 && (project.pm === "npm" || project.pm === "yarn");
  const args = [...parts.slice(1), ...(needsSeparator ? ["--"] : []), ...portArgs];

  console.log(`\n  Starting: ${cmd} ${args.join(" ")}`);
  console.log(`  URL:      http://localhost:${port}\n`);

  const child = spawn(cmd, args, {
    cwd: CWD,
    stdio: "inherit",
    shell: true,
    // Create process group on Unix for clean group kill
    detached: !IS_WIN,
    env: { ...process.env, PORT: String(port) },
  });

  // ---- Clean shutdown handler ----
  let exiting = false;
  function shutdown(signal) {
    if (exiting) return;
    exiting = true;
    console.log(`\n  Received ${signal}, shutting down dev server...`);

    if (IS_WIN) {
      try { execSync(`taskkill /F /T /PID ${child.pid}`, { stdio: "ignore" }); } catch { /* already gone */ }
    } else {
      try { process.kill(-child.pid, "SIGTERM"); } catch { /* already gone */ }
    }

    // Give the child a moment to exit, then force kill
    setTimeout(() => {
      try {
        if (IS_WIN) {
          execSync(`taskkill /F /T /PID ${child.pid}`, { stdio: "ignore" });
        } else {
          process.kill(-child.pid, "SIGKILL");
        }
      } catch { /* already gone */ }
      process.exit(0);
    }, 3000);
  }

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
  if (IS_WIN) process.on("SIGHUP", () => shutdown("SIGHUP"));

  child.on("exit", (code) => {
    if (!exiting) {
      console.log(`  Dev server exited with code ${code}`);
      process.exit(code || 0);
    }
  });

  return child;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("╔══════════════════════════════════════════╗");
  console.log("║         Pane Dev Server Launcher         ║");
  console.log("╚══════════════════════════════════════════╝\n");

  // Detect project
  const project = detectProject();
  console.log(`  Project:    ${project.framework} (${project.pm})`);
  console.log(`  Worktree:   ${isWorktree() ? "yes" : "no (main repo)"}`);
  console.log(`  Directory:  ${CWD}\n`);

  // Clean stale locks from crashed sessions
  cleanStaleLocks();

  // Check dependency freshness
  checkDeps(project);

  // Check build staleness
  if (isBuildStale(project)) {
    console.log("  (Build is stale — the dev server will rebuild automatically.)\n");
  }

  // Assign and resolve port
  const preferred = assignPort();
  console.log(`  Preferred port: ${preferred}`);
  const port = await reclaimOrFindPort(preferred);

  // Start the dev server
  startServer(project, port);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
