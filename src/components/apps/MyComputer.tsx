import React from 'react';
import { Window } from '@/components/Window';
import { PORTFOLIO_DATA } from '@/data/portfolio';

export const MyComputer = () => {
  const { personalInfo } = PORTFOLIO_DATA;

  return (
    <Window id="my-computer" defaultWidth={700} defaultHeight={500}>
      <div className="p-4 flex flex-col h-full bg-white text-black">
        <div className="flex gap-6 border-b border-gray-300 pb-4">
          <div className="w-24 h-24 bg-gray-200 border border-gray-400 p-1 shrink-0">
            <img src={personalInfo.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-1">{personalInfo.name}</h1>
            <h2 className="text-gray-600 mb-2">{personalInfo.title}</h2>
            <p className="text-sm">Location: <span className="font-mono">{personalInfo.location}</span></p>
            <p className="text-sm">Status: <span className="text-green-600 font-bold">{personalInfo.status}</span></p>
          </div>
        </div>

        <div className="mt-4 flex-1">
          <h3 className="font-bold border-b border-gray-300 mb-2 pb-1">About Me</h3>
          <p className="text-sm leading-relaxed mb-4">
            {personalInfo.aboutMe}
          </p>

          <h3 className="font-bold border-b border-gray-300 mb-2 pb-1">System Properties</h3>
          <ul className="text-sm flex flex-col gap-1">
            {personalInfo.systemProperties.map((prop, idx) => (
              <li key={idx}><strong>{prop.label}:</strong> {prop.value}</li>
            ))}
          </ul>
        </div>
        
        <div className="mt-auto flex justify-end">
          <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer" className="win-btn px-4 py-1 font-bold shadow-md cursor-pointer text-sm inline-block text-center no-underline text-black">
            Download Resume
          </a>
        </div>
      </div>
    </Window>
  );
};
