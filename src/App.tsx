import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { InteractiveVideoPlayer } from './components/InteractiveVideoPlayer';
import { PostInstallGuide } from './components/PostInstallGuide';
import { TroubleshootingGuide } from './components/TroubleshootingGuide';
import { TerminalSimulator } from './components/TerminalSimulator';
import { ScenarioCard } from './components/ScenarioCard';
import { ScenarioDetailModal } from './components/ScenarioDetailModal';
import { DecisionWizard } from './components/DecisionWizard';
import { CheatSheetModal } from './components/CheatSheetModal';
import { RpmFusionModal } from './components/RpmFusionModal';
import { UserSpecialScenariosBanner } from './components/UserSpecialScenariosBanner';
import { SCENARIOS } from './data/scenarios';
import { InstallationScenario } from './types';
import { 
  PlayCircle, 
  Terminal, 
  Layers, 
  HelpCircle, 
  BookOpen, 
  Sparkles, 
  CheckCircle,
  Cpu,
  Package,
  ShieldCheck,
  Wrench
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'video' | 'postinstall' | 'troubleshoot' | 'scenarios' | 'terminal' | 'wizard' | 'cheatsheet'>('video');
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [selectedScenario, setSelectedScenario] = useState<InstallationScenario | null>(null);
  const [rpmFusionModalOpen, setRpmFusionModalOpen] = useState<boolean>(false);
  const [activeTerminalCommand, setActiveTerminalCommand] = useState<string>('');
  const [scenarioFilter, setScenarioFilter] = useState<'all' | 'core' | 'sandboxed' | 'third-party' | 'advanced'>('all');

  const handleSendToTerminal = (cmd: string) => {
    setActiveTerminalCommand(cmd);
    setActiveTab('terminal');
  };

  const handleWatchVideoForScenario = (scenarioId: string) => {
    setSelectedScenario(null);
    setActiveTab('video');
  };

  const filteredScenarios = SCENARIOS.filter((s) => {
    if (scenarioFilter === 'all') return true;
    return s.category === scenarioFilter;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white" dir="rtl">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        voiceEnabled={voiceEnabled}
        setVoiceEnabled={setVoiceEnabled}
        onOpenRpmFusion={() => setRpmFusionModalOpen(true)}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 sm:space-y-8">
        {/* Subtle Overview & Status Strip */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-blue-950/40 via-slate-900/60 to-slate-950 border border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
              <h1 className="text-sm sm:text-base md:text-lg font-black text-white">
                دانشنامه و آموزش تعاملی نصب اپلیکیشن در لینوکس فدورا
              </h1>
            </div>
            <p className="text-[11px] sm:text-xs text-slate-400">
              پوشش کامل تمامی ابزارها: DNF5، مخازن رسمی، فلت‌پک Flathub، فایل‌های RPM، مخازن Copr، پرتابل AppImage و کامپایل سورس کد
            </p>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 text-xs overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
            <button
              onClick={() => setActiveTab('postinstall')}
              className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 flex items-center gap-1.5 text-amber-300 font-semibold transition-colors whitespace-nowrap touch-target shrink-0"
            >
              <CheckCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>کارهای پس از نصب فدورا</span>
            </button>
            <button
              onClick={() => setActiveTab('troubleshoot')}
              className="px-3 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 flex items-center gap-1.5 text-rose-300 font-semibold transition-colors whitespace-nowrap touch-target shrink-0"
            >
              <Wrench className="w-3.5 h-3.5 text-rose-400" />
              <span>عیب‌یابی خطاها (GPG، وابستگی‌ها)</span>
            </button>
            <div className="hidden sm:flex px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 items-center gap-1.5 text-blue-400 font-semibold whitespace-nowrap">
              <Package className="w-3.5 h-3.5" />
              <span>۱۱ سناریوی کاربردی</span>
            </div>
          </div>
        </div>

        {/* Featured Answer for User-Requested Scenarios (Local File & GitHub Link) */}
        <UserSpecialScenariosBanner
          onSendToTerminal={handleSendToTerminal}
          onOpenVideoLesson={(lessonId) => {
            setActiveTab('video');
          }}
          onSelectScenarioId={(scenarioId) => {
            const sc = SCENARIOS.find((s) => s.id === scenarioId);
            if (sc) setSelectedScenario(sc);
          }}
        />

        {/* Tab: Post-Installation Checklist & Master Script */}
        {activeTab === 'postinstall' && (
          <PostInstallGuide
            onSendToTerminal={handleSendToTerminal}
            onOpenVideoLesson={(lessonId) => setActiveTab('video')}
            onOpenTroubleshoot={() => setActiveTab('troubleshoot')}
          />
        )}

        {/* Tab: Troubleshooting & Common Error Fixer */}
        {activeTab === 'troubleshoot' && (
          <TroubleshootingGuide
            onSendToTerminal={handleSendToTerminal}
          />
        )}

        {/* Tab 1: Interactive Video Player */}
        {activeTab === 'video' && (
          <div className="space-y-8">
            <InteractiveVideoPlayer
              voiceEnabled={voiceEnabled}
              onSendToTerminal={handleSendToTerminal}
              onSelectScenario={(scenarioId) => {
                const sc = SCENARIOS.find((s) => s.id === scenarioId);
                if (sc) setSelectedScenario(sc);
              }}
            />

            {/* Quick Grid of Key Scenarios beneath the Video */}
            <div className="space-y-4 pt-4 border-t border-slate-800/80">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-white">فهرست سریع سناریوها و ابزارهای مدیریت بسته</h3>
                  <p className="text-xs text-slate-400">روی هر روش کلیک کنید تا آموزش مرحله‌به‌مرحله به همراه دستورات را ببینید</p>
                </div>
                <button
                  onClick={() => setActiveTab('scenarios')}
                  className="text-xs text-blue-400 hover:text-blue-300 font-medium"
                >
                  مشاهده تمام ۱۱ سناریو ←
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SCENARIOS.slice(0, 3).map((scenario) => (
                  <ScenarioCard
                    key={scenario.id}
                    scenario={scenario}
                    onSelect={(sc) => setSelectedScenario(sc)}
                    onQuickRun={handleSendToTerminal}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: All 11 Scenarios Explorer */}
        {activeTab === 'scenarios' && (
          <div className="space-y-6">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
              <span className="text-xs text-slate-400 ml-2">دسته‌بندی:</span>
              <button
                onClick={() => setScenarioFilter('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  scenarioFilter === 'all'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                همه روش‌ها (۱۱ مورد)
              </button>
              <button
                onClick={() => setScenarioFilter('core')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  scenarioFilter === 'core'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                بومی و رسمی (DNF & RPM Fusion & GUI)
              </button>
              <button
                onClick={() => setScenarioFilter('sandboxed')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  scenarioFilter === 'sandboxed'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                سندباکس و پرتابل (Flatpak, AppImage, Snap)
              </button>
              <button
                onClick={() => setScenarioFilter('third-party')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  scenarioFilter === 'third-party'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                فایل‌های مستقیم RPM دانلودی
              </button>
              <button
                onClick={() => setScenarioFilter('advanced')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  scenarioFilter === 'advanced'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                پیشرفته (مخازن Copr و کامپایل سورس)
              </button>
            </div>

            {/* Grid of Scenarios */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredScenarios.map((scenario) => (
                <ScenarioCard
                  key={scenario.id}
                  scenario={scenario}
                  onSelect={(sc) => setSelectedScenario(sc)}
                  onQuickRun={handleSendToTerminal}
                />
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Interactive Terminal Simulator */}
        {activeTab === 'terminal' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-emerald-400" />
                  <span>شبیه‌ساز زنده خط فرمان فدورا (Fedora Terminal Simulator)</span>
                </h2>
                <p className="text-xs text-slate-400">
                  می‌توانید دستورات DNF، Flatpak، RPM و AppImage را مستقیماً تایپ و امتحان کنید
                </p>
              </div>
            </div>

            <TerminalSimulator initialCommand={activeTerminalCommand} />
          </div>
        )}

        {/* Tab 4: Decision Wizard */}
        {activeTab === 'wizard' && (
          <DecisionWizard
            onSelectScenario={(sc) => setSelectedScenario(sc)}
            onSendToTerminal={handleSendToTerminal}
          />
        )}

        {/* Tab 5: Cheat Sheet */}
        {activeTab === 'cheatsheet' && (
          <CheatSheetModal onSendToTerminal={handleSendToTerminal} />
        )}
      </main>

      {/* Detail Modal */}
      <ScenarioDetailModal
        scenario={selectedScenario}
        onClose={() => setSelectedScenario(null)}
        onSendToTerminal={handleSendToTerminal}
        onWatchVideo={handleWatchVideoForScenario}
      />

      {/* RPM Fusion Special Codecs Modal */}
      <RpmFusionModal
        isOpen={rpmFusionModalOpen}
        onClose={() => setRpmFusionModalOpen(false)}
        onSendToTerminal={handleSendToTerminal}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p>آموزش جامع و اینتراکتیو مدیریت بسته در فدورا لینوکس • منطبق بر آخرین استانداردهای فدورا ۴۱ و ۴۲</p>
          <p className="text-[11px] text-slate-600">پوشش DNF5, Flathub, RPM Fusion, Copr, AppImage, Snapd و Source Build</p>
        </div>
      </footer>
    </div>
  );
}
