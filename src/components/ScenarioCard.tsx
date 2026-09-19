import React from 'react';
import { 
  Package, 
  ShieldCheck, 
  Layers, 
  FileDown, 
  Users, 
  PlaySquare, 
  Box, 
  LayoutGrid, 
  Terminal as TerminalIcon,
  CheckCircle2, 
  ArrowLeft,
  ChevronLeft,
  HardDrive,
  GitBranch
} from 'lucide-react';
import { InstallationScenario, PackageTool } from '../types';

interface ScenarioCardProps {
  scenario: InstallationScenario;
  onSelect: (scenario: InstallationScenario) => void;
  onQuickRun: (cmd: string) => void;
}

export const ScenarioCard: React.FC<ScenarioCardProps> = ({ scenario, onSelect, onQuickRun }) => {
  const getToolIcon = (tool: PackageTool) => {
    switch (tool) {
      case 'dnf': return <Package className="w-5 h-5 text-blue-400" />;
      case 'flatpak': return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
      case 'rpmfusion': return <Layers className="w-5 h-5 text-amber-400" />;
      case 'rpm': return <FileDown className="w-5 h-5 text-purple-400" />;
      case 'localfile': return <HardDrive className="w-5 h-5 text-sky-400" />;
      case 'github': return <GitBranch className="w-5 h-5 text-violet-400" />;
      case 'copr': return <Users className="w-5 h-5 text-indigo-400" />;
      case 'appimage': return <PlaySquare className="w-5 h-5 text-cyan-400" />;
      case 'snap': return <Box className="w-5 h-5 text-rose-400" />;
      case 'gui': return <LayoutGrid className="w-5 h-5 text-teal-400" />;
      case 'source': return <TerminalIcon className="w-5 h-5 text-orange-400" />;
      default: return <Package className="w-5 h-5 text-blue-400" />;
    }
  };

  const getToolColor = (tool: PackageTool) => {
    switch (tool) {
      case 'dnf': return 'border-blue-500/30 hover:border-blue-500/60 bg-gradient-to-b from-blue-950/20 to-slate-900/40';
      case 'flatpak': return 'border-emerald-500/30 hover:border-emerald-500/60 bg-gradient-to-b from-emerald-950/20 to-slate-900/40';
      case 'rpmfusion': return 'border-amber-500/30 hover:border-amber-500/60 bg-gradient-to-b from-amber-950/20 to-slate-900/40';
      case 'rpm': return 'border-purple-500/30 hover:border-purple-500/60 bg-gradient-to-b from-purple-950/20 to-slate-900/40';
      case 'localfile': return 'border-sky-500/30 hover:border-sky-500/60 bg-gradient-to-b from-sky-950/20 to-slate-900/40';
      case 'github': return 'border-violet-500/30 hover:border-violet-500/60 bg-gradient-to-b from-violet-950/20 to-slate-900/40';
      case 'copr': return 'border-indigo-500/30 hover:border-indigo-500/60 bg-gradient-to-b from-indigo-950/20 to-slate-900/40';
      case 'appimage': return 'border-cyan-500/30 hover:border-cyan-500/60 bg-gradient-to-b from-cyan-950/20 to-slate-900/40';
      case 'snap': return 'border-rose-500/30 hover:border-rose-500/60 bg-gradient-to-b from-rose-950/20 to-slate-900/40';
      case 'gui': return 'border-teal-500/30 hover:border-teal-500/60 bg-gradient-to-b from-teal-950/20 to-slate-900/40';
      case 'source': return 'border-orange-500/30 hover:border-orange-500/60 bg-gradient-to-b from-orange-950/20 to-slate-900/40';
      default: return 'border-slate-800 hover:border-slate-700 bg-slate-900/40';
    }
  };

  return (
    <div className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between group shadow-lg ${getToolColor(scenario.tool)}`}>
      <div className="space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 shadow-md">
              {getToolIcon(scenario.tool)}
            </div>
            <div>
              <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700/60 mb-1">
                {scenario.badge}
              </span>
              <h3 className="font-bold text-base text-white group-hover:text-blue-400 transition-colors">
                {scenario.titleFa}
              </h3>
            </div>
          </div>
        </div>

        {/* English Title & Summary */}
        <p className="text-xs font-mono text-slate-400">{scenario.titleEn}</p>
        <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">
          {scenario.summary}
        </p>

        {/* Real-world app examples */}
        <div className="p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <span className="text-[11px] font-semibold text-slate-400 block mb-1">برنامه‌های متداول:</span>
          <p className="text-xs text-blue-300 font-medium">{scenario.realWorldAppExample}</p>
        </div>

        {/* Badges: Security & Isolation */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-900 text-slate-300 border border-slate-800">
            {scenario.isolationLevel}
          </span>
          <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-900 text-emerald-400 border border-slate-800">
            {scenario.securityLevel}
          </span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-5 pt-3 border-t border-slate-800/70 flex items-center justify-between gap-2">
        <button
          onClick={() => onSelect(scenario)}
          className="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
        >
          <span>آموزش مرحله‌به‌مرحله</span>
          <ChevronLeft className="w-4 h-4" />
        </button>

        {scenario.steps[0]?.command && (
          <button
            onClick={() => onQuickRun(scenario.steps[0].command!)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            title="اجرای دستور گام اول در ترمینال"
          >
            <TerminalIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
