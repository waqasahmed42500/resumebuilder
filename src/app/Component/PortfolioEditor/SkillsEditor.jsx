'use client';

import { usePortfolio } from '@/app/context/PortfolioContext';

export default function SkillsEditor() {
  const { portfolio, setField } = usePortfolio();
  const skills = portfolio.skills || [];

  const handleAddSkill = () => {
    const newSkill = { name: '', level: 50, category: '' };
    setField('skills', [...skills, newSkill]);
  };

  const handleUpdateSkill = (index, field, value) => {
    const newSkills = [...skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    setField('skills', newSkills);
  };

  const handleRemoveSkill = (index) => {
    const newSkills = [...skills];
    newSkills.splice(index, 1);
    setField('skills', newSkills);
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold text-slate-900 mb-6">Skills</h2>
      
      <div className="flex flex-col gap-4 mb-6">
        {skills.map((skill, index) => (
          <div key={index} className="bg-slate-50 rounded-xl p-5 border border-slate-200 relative">
            <button
              onClick={() => handleRemoveSkill(index)}
              className="absolute top-3 right-3 text-red-500 hover:text-red-700 bg-white hover:bg-red-50 rounded-full w-8 h-8 flex items-center justify-center transition-colors border border-slate-200 hover:border-red-200"
              title="Remove skill"
            >
              ✕
            </button>
            
            <div className="grid grid-cols-2 gap-5 mb-4 pr-8">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Skill Name</label>
                <input
                  type="text"
                  value={skill.name || ''}
                  onChange={(e) => handleUpdateSkill(index, 'name', e.target.value)}
                  placeholder="e.g. JavaScript"
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Category (Optional)</label>
                <input
                  type="text"
                  value={skill.category || ''}
                  onChange={(e) => handleUpdateSkill(index, 'category', e.target.value)}
                  placeholder="e.g. Frontend"
                  className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-slate-700">Proficiency Level</label>
                <span className="text-sm font-medium text-emerald-600">{skill.level || 0}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={skill.level || 50}
                onChange={(e) => handleUpdateSkill(index, 'level', parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
            </div>
          </div>
        ))}
        
        {skills.length === 0 && (
          <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-500 text-sm">No skills added yet.</p>
          </div>
        )}
      </div>

      <button
        onClick={handleAddSkill}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-emerald-600 bg-white border border-emerald-200 border-dashed rounded-xl hover:bg-emerald-50 hover:border-emerald-300 transition-colors"
      >
        <span>+</span> Add New Skill
      </button>
    </div>
  );
}
