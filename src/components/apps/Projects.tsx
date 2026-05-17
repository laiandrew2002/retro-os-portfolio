import React, { useState } from 'react';
import { Window, cn } from '@/components/Window';
import { Folder, FileBox, ArrowLeft } from 'lucide-react';
import { PORTFOLIO_DATA } from '@/data/portfolio';

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const projectsData = PORTFOLIO_DATA.projects;
  const activeProject = projectsData.find(p => p.id === selectedProject);

  return (
    <Window id="projects" defaultWidth={650} defaultHeight={450}>
      <div className="flex flex-col h-full bg-white text-black text-sm">
        {/* Toolbar */}
        <div className="bg-[var(--color-win-surface)] flex gap-2 p-1 border-b border-gray-400">
          <button 
            className="win-btn px-2 h-6 flex items-center gap-1 disabled:opacity-50"
            onClick={() => setSelectedProject(null)}
            disabled={!selectedProject}
          >
            <ArrowLeft size={14} /> Back
          </button>
          <div className="flex-1 bg-white border border-gray-400 px-2 h-6 flex items-center shadow-inner text-gray-600 font-mono text-xs">
            C:\Windows\Desktop\Projects{selectedProject ? `\\${activeProject?.title}` : ''}
          </div>
        </div>

        {/* Content Explorer */}
        <div className="flex-1 overflow-auto p-4">
          {!selectedProject ? (
            <div className="flex flex-wrap gap-6 mt-2 ml-2">
              {projectsData.map(proj => (
                <div 
                  key={proj.id} 
                  className="flex flex-col items-center w-24 gap-1 cursor-pointer group"
                  onClick={() => setSelectedProject(proj.id)}
                >
                  <Folder size={42} fill="var(--color-win-blue-light)" className="text-gray-600 group-hover:scale-105 transition-transform" />
                  <span className="text-center group-hover:bg-[var(--color-win-blue)] group-hover:text-white px-1">{proj.title}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col h-full animation-fade-in gap-4">
               <div className="flex items-start gap-4 border-b border-gray-300 pb-4">
                  <FileBox size={48} className="text-[var(--color-win-blue)]" />
                  <div>
                    <h2 className="text-2xl font-bold">{activeProject?.title}</h2>
                    <p className="text-gray-600">{activeProject?.desc}</p>
                  </div>
               </div>

               <div>
                 <h3 className="font-bold border-b border-gray-200 mb-2">Tech Stack</h3>
                 <p className="font-mono text-xs p-2 bg-gray-100 win-border-inset">{activeProject?.tech}</p>
               </div>

               <div>
                 <h3 className="font-bold border-b border-gray-200 mb-2">Key Achievements</h3>
                 <ul className="list-disc ml-5 space-y-1">
                   {activeProject?.achievements.map((ach, i) => (
                     <li key={i}>{ach}</li>
                   ))}
                 </ul>
               </div>

               <div className="mt-auto flex gap-2">
                 {activeProject?.githubUrl && <a href={activeProject.githubUrl} target="_blank" rel="noopener noreferrer" className="win-btn px-4 py-1 text-xs no-underline text-black">open_github.bat</a>}
                 {activeProject?.demoUrl && <a href={activeProject.demoUrl} target="_blank" rel="noopener noreferrer" className="win-btn px-4 py-1 text-xs no-underline text-black">launch_demo.exe</a>}
               </div>
            </div>
          )}
        </div>

      </div>
    </Window>
  );
};
