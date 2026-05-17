import React from 'react';
import { Window } from '@/components/Window';
import { Folder } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolio';

export const Skills = () => {
  const skillCategories = PORTFOLIO_DATA.skills;

  return (
    <Window id="skills" defaultWidth={500} defaultHeight={400}>
      <div className="flex h-full text-black">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-gray-100 border-r border-gray-300 p-2 flex flex-col gap-2">
          <div className="font-bold mb-2">Categories</div>
          {skillCategories.map(cat => (
            <div key={cat.title} className="flex items-center gap-2 cursor-pointer hover:bg-gray-200 px-1 py-0.5">
              <Folder size={16} fill="var(--color-win-blue-light)" className="text-gray-600" />
              <span className="text-sm">{cat.title}</span>
            </div>
          ))}
        </div>
        
        {/* Main Content */}
        <div className="w-2/3 p-4 bg-white overflow-y-auto">
          <div className="text-xl font-bold mb-4">Skills & Proficiencies</div>
          <div className="flex flex-col gap-4">
            {skillCategories.map(category => (
              <div key={category.title}>
                <h3 className="font-bold text-gray-700 border-b border-gray-200 mb-2">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map(skill => (
                    <div key={skill} className="px-2 py-1 bg-[var(--color-win-surface)] win-border-inset text-xs font-semibold cursor-default hover:bg-gray-300">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Window>
  );
};
