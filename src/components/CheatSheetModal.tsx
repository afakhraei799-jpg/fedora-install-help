import React, { useState } from 'react';
import { BookOpen, Search, Copy, Check, Terminal, Filter } from 'lucide-react';
import { CHEAT_SHEET_COMMANDS } from '../data/scenarios';
import { PackageTool } from '../types';

interface CheatSheetModalProps {
  onSendToTerminal: (cmd: string) => void;
}

export const CheatSheetModal: React.FC<CheatSheetModalProps> = ({ onSendToTerminal }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const tools: { id: string; label: string }[] = [
    { id: 'all', label: 'همه دستورات' },
    { id: 'localfile', label: '📁 فایل‌های محلی روی سیستم' },
    { id: 'github', label: '🌐 آدرس‌های گیت‌هاب' },
    { id: 'dnf', label: 'مدیریت بسته DNF' },
    { id: 'flatpak', label: 'فلت‌پک Flatpak' },
    { id: 'rpm', label: 'دستورات RPM' },
    { id: 'copr', label: 'مخازن Copr' },
    { id: 'appimage', label: 'پرتابل AppImage' },
    { id: 'snap', label: 'اسنپ Snap' },
  ];

  const filteredCommands = CHEAT_SHEET_COMMANDS.filter((item) => {
    const matchesFilter = activeFilter === 'all' || item.tool === activeFilter;
    const matchesSearch =
      item.command.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.descriptionFa.includes(searchQuery) ||
      item.actionName.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="p-6 rounded-2xl border border-slate-800 bg-slate-900 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">برگه تقلب و راهنمای سریع دستورات فدورا</h3>
            <p className="text-xs text-slate-400">فهرست کاربردی‌ترین دستورات DNF، Flatpak، RPM و AppImage با امکان کپی یا اجرای سریع</p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجوی دستور یا توضیح..."
            className="w-full pr-9 pl-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-1.5 border-b border-slate-800/80 pb-3">
        {tools.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveFilter(t.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeFilter === t.id
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Commands Table / Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {filteredCommands.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-slate-800 bg-slate-950/70 hover:border-slate-700 transition-all flex flex-col justify-between space-y-3"
          >
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{item.actionName}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded uppercase bg-slate-900 border border-slate-800 text-blue-400">
                  {item.tool}
                </span>
              </div>
              <p className="text-xs text-slate-300">{item.descriptionFa}</p>
            </div>

            {/* Command Box */}
            <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-[#070b12] border border-slate-800">
              <code className="text-[11px] font-mono text-emerald-400 dir-ltr text-left overflow-x-auto select-all">
                {item.command}
              </code>

              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => handleCopy(item.command)}
                  className="p-1.5 rounded text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
                  title="کپی در کلیپ‌بورد"
                >
                  {copiedCmd === item.command ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
                <button
                  onClick={() => onSendToTerminal(item.command)}
                  className="p-1.5 rounded text-blue-300 hover:text-white bg-blue-600/30 hover:bg-blue-600 transition-colors"
                  title="اجرا در شبیه‌ساز ترمینال"
                >
                  <Terminal className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
