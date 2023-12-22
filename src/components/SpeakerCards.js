import React from 'react';

const SpeakerBio = ({ name, dateTime, description, rsvpLink }) => {
    return (
        <div className='card drop-shadow-md rounded-sm bg-base-100 shadow-xl flex flex-col'>
            <div className='flex-1  p-4'>
                <h3 className='text-2xl font-semibold'>{name}</h3>
                <p className='mt-2'>Date & Time: {dateTime}</p>
                <p className='mt-2 text-[0.8rem]'>{description}</p>
            </div>
            <a href={rsvpLink} className=' bg-[#013057] mt-4 text-white hover:text-blue-600 p-4 text-center text-[0.8rem]'>
                RSVP to {name}&apos;s Talk
            </a>
        </div>
    );
};

export default SpeakerBio;
