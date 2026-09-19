import React from 'react';
import { 
  PlayCircle, 
  Terminal, 
  Layers, 
  HelpCircle, 
  BookOpen, 
  Volume2, 
  VolumeX,
  Sparkles,
  CheckCircle2,
  Wrench
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'video' | 'postinstall' | 'troubleshoot' | 'scenarios' | 'terminal' | 'wizard' | 'cheatsheet';
  setActiveTab: (tab: 'video' | 'postinstall' | 'troubleshoot' | 'scenarios' | 'terminal' | 'wizard' | 'cheatsheet') => void;
  voiceEnabled: boolean;
  setVoiceEnabled: (val: boolean) => void;
  onOpenRpmFusion: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  voiceEnabled,
  setVoiceEnabled,
  onOpenRpmFusion,
}) => {
  return (
    <header id="app-header" className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-400 p-0.5 shadow-lg shadow-blue-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                {/* Fedora-like Infinity Icon */}
                <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 16.93V14h-2v4.93C7.05 18.44 4 14.58 4 10c0-4.42 3.58-8 8-8s8 3.58 8 8c0 4.58-3.05 8.44-7 8.93zM11 6h2v6h-2V6z"/>
                </svg>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-white">آموزش تعاملی فدورا لینوکس</span>
                <span className="px-2 py-0.5 text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full">
                  فدورا ۴۱ و ۴۲
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">راهنمای جامع و مرحله‌به‌مرحله تمام سناریوهای نصب برنامه</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
            <button
              id="nav-video-tab"
              onClick={() => setActiveTab('video')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'video'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <PlayCircle className="w-4 h-4" />
              <span>فیلم آموزشی اینتراکتیو</span>
            </button>

            <button
              id="nav-postinstall-tab"
              onClick={() => setActiveTab('postinstall')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'postinstall'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-amber-400" />
              <span>کارهای پس از نصب</span>
            </button>

            <button
              id="nav-troubleshoot-tab"
              onClick={() => setActiveTab('troubleshoot')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'troubleshoot'
                  ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Wrench className="w-4 h-4 text-rose-400" />
              <span>عیب‌یابی و رفع خطا</span>
            </button>

            <button
              id="nav-scenarios-tab"
              onClick={() => setActiveTab('scenarios')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'scenarios'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>سناریوهای نصب (DNF, Flatpak...)</span>
            </button>

            <button
              id="nav-terminal-tab"
              onClick={() => setActiveTab('terminal')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'terminal'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>شبیه‌ساز ترمینال</span>
            </button>

            <button
              id="nav-wizard-tab"
              onClick={() => setActiveTab('wizard')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'wizard'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>کمک‌یار انتخاب روش</span>
            </button>

            <button
              id="nav-cheatsheet-tab"
              onClick={() => setActiveTab('cheatsheet')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'cheatsheet'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>کدهای تقلب</span>
            </button>
          </nav>

          {/* Right actions: Voice toggle & RPM Fusion quick button */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              id="btn-voice-toggle"
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              title={voiceEnabled ? 'روایت صوتی فارسی روشن است' : 'روایت صوتی خاموش است'}
              className={`p-2 sm:px-2.5 sm:py-2 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-colors touch-target justify-center ${
                voiceEnabled
                  ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                  : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              {voiceEnabled ? <Volume2 className="w-4 h-4 shrink-0" /> : <VolumeX className="w-4 h-4 shrink-0" />}
              <span className="hidden lg:inline text-xs">{voiceEnabled ? 'گوینده فعال' : 'صدا خاموش'}</span>
            </button>

            <button
              id="btn-quick-rpmfusion"
              onClick={onOpenRpmFusion}
              className="flex items-center gap-1.5 px-2.5 py-2 sm:px-3 sm:py-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 text-amber-300 rounded-xl text-xs font-semibold hover:bg-amber-500/30 transition-all shadow-sm touch-target"
            >
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="hidden sm:inline">فعال‌سازی کدک‌ها و انویدیا</span>
              <span className="sm:hidden text-xs">کدک‌ها</span>
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Nav Tabs (Scrollable & Touch-friendly) */}
        <div className="flex md:hidden overflow-x-auto py-2.5 px-1 gap-1.5 border-t border-slate-800/70 no-scrollbar items-center">
          <button
            onClick={() => setActiveTab('video')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors touch-target flex items-center gap-1.5 ${
              activeTab === 'video' ? 'bg-blue-600 text-white font-bold shadow-sm' : 'text-slate-300 bg-slate-900/90 border border-slate-800'
            }`}
          >
            <PlayCircle className="w-3.5 h-3.5" />
            <span>فیلم آموزشی</span>
          </button>
          <button
            onClick={() => setActiveTab('postinstall')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors touch-target flex items-center gap-1.5 ${
              activeTab === 'postinstall' ? 'bg-amber-600 text-white font-bold shadow-sm' : 'text-slate-300 bg-slate-900/90 border border-slate-800'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
            <span>کارهای پس از نصب</span>
          </button>
          <button
            onClick={() => setActiveTab('troubleshoot')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors touch-target flex items-center gap-1.5 ${
              activeTab === 'troubleshoot' ? 'bg-rose-600 text-white font-bold shadow-sm' : 'text-slate-300 bg-slate-900/90 border border-slate-800'
            }`}
          >
            <Wrench className="w-3.5 h-3.5 text-rose-400" />
            <span>عیب‌یابی و رفع خطا</span>
          </button>
          <button
            onClick={() => setActiveTab('scenarios')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors touch-target flex items-center gap-1.5 ${
              activeTab === 'scenarios' ? 'bg-blue-600 text-white font-bold shadow-sm' : 'text-slate-300 bg-slate-900/90 border border-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>سناریوهای نصب</span>
          </button>
          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors touch-target flex items-center gap-1.5 ${
              activeTab === 'terminal' ? 'bg-blue-600 text-white font-bold shadow-sm' : 'text-slate-300 bg-slate-900/90 border border-slate-800'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>شبیه‌ساز ترمینال</span>
          </button>
          <button
            onClick={() => setActiveTab('wizard')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors touch-target flex items-center gap-1.5 ${
              activeTab === 'wizard' ? 'bg-blue-600 text-white font-bold shadow-sm' : 'text-slate-300 bg-slate-900/90 border border-slate-800'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>انتخاب روش</span>
          </button>
          <button
            onClick={() => setActiveTab('cheatsheet')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors touch-target flex items-center gap-1.5 ${
              activeTab === 'cheatsheet' ? 'bg-blue-600 text-white font-bold shadow-sm' : 'text-slate-300 bg-slate-900/90 border border-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>کدهای تقلب</span>
          </button>
        </div>
      </div>
    </header>
  );
};
