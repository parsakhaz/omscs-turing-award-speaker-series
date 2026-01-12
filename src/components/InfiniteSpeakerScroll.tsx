import { motion } from 'framer-motion';
import Image from 'next/legacy/image';
import { useEffect, useState } from 'react';

interface Speaker {
  name: string;
  speakerPhoto: string;
  year?: number;
}

interface Props {
  speakers: Speaker[];
}

export default function InfiniteSpeakerScroll({ speakers }: Props) {
  const [isMobile, setIsMobile] = useState(() => {
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false; // Default for server-side rendering
  });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Add event listener
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-white py-8">
      <motion.div
        className="flex"
        animate={{
          x: ['0%', '-50%']
        }}
        transition={{
          duration: isMobile ? 5 : 20, // Reduced from 10 to 5 seconds for mobile
          ease: "linear",
          repeat: Infinity,
        }}
        whileHover={{ animationPlayState: 'paused' }}
      >
        {/* First set of images */}
        <div className="flex md:gap-16 gap-4 md:px-8 px-2">
          {speakers.map((speaker, idx) => (
            <div
              key={`first-${idx}`}
              className="relative w-[240px] md:w-[200px] h-[120px] md:h-[100px] flex-shrink-0"
            >
              <Image
                src={speaker.speakerPhoto}
                alt={speaker.name}
                layout="fill"
                objectFit="contain"
                className="grayscale hover:grayscale-0 transition-all duration-300"
              />
              {speaker.year && (
                <div className="absolute top-1 right-1 bg-slate-800/80 text-white px-2 py-0.5 rounded-full text-[10px] font-medium">
                  {speaker.year}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Duplicated set of images */}
        <div className="flex md:gap-16 gap-4 md:px-8 px-2">
          {speakers.map((speaker, idx) => (
            <div
              key={`second-${idx}`}
              className="relative w-[240px] md:w-[200px] h-[120px] md:h-[100px] flex-shrink-0"
            >
              <Image
                src={speaker.speakerPhoto}
                alt={speaker.name}
                layout="fill"
                objectFit="contain"
                className="grayscale hover:grayscale-0 transition-all duration-300"
              />
              {speaker.year && (
                <div className="absolute top-1 right-1 bg-slate-800/80 text-white px-2 py-0.5 rounded-full text-[10px] font-medium">
                  {speaker.year}
                </div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}