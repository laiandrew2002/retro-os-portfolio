import React from 'react';
import { Window } from '@/components/Window';
import { FileText } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolio';

export const Experience = () => {
  const { experience } = PORTFOLIO_DATA;

  return (
    <Window id="experience" defaultWidth={600} defaultHeight={700}>
      <div className="flex flex-col h-full bg-white text-black text-sm font-sans p-6 overflow-y-auto">
        <div className="border-b-2 border-black pb-2 mb-6">
          <h1 className="text-3xl font-bold font-serif mb-1">{experience.pageTitle}</h1>
          <p className="text-gray-600">{experience.pageSubtitle}</p>
        </div>

        <div className="space-y-8">
          {experience.jobs.map(job => (
            <div key={job.id}>
              <div className="flex justify-between items-baseline mb-1">
                <h2 className="text-xl font-bold">{job.role}</h2>
                <span className="font-bold text-gray-700">{job.period}</span>
              </div>
              <p className="text-blue-800 font-bold mb-2">{job.company}</p>
              <ul className="list-disc ml-6 space-y-1">
                {job.achievements.map((ach, idx) => (
                  <li key={idx}>{ach}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Window>
  );
};
