import React, { useState } from 'react';
import { 
  X, 
  Terminal, 
  Copy, 
  Check, 
  CheckCircle2, 
  AlertTriangle, 
  Info, 
  Trash2, 
  ShieldCheck, 
  PlayCircle,
  HelpCircle,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';
import { InstallationScenario } from '../types';

interface ScenarioDetailModalProps {
  scenario: InstallationScenario | null;
  onClose: () => void;
  onSendToTerminal: (cmd: string) => void;
  onWatchVideo: (scenarioId: string) => void;
}

export const ScenarioDetailModal: React.FC<ScenarioDetailModalProps> = ({
  scenario,
  onClose,
  onSendToTerminal,
  onWatchVideo,
}) => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  if (!scenario) return null;

  const currentStep = scenario.steps[activeStepIndex] || scenario.steps[0];

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl overflow-hidden my-auto max-h-[92vh] sm:max-h-[90vh] flex flex-col">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 bg-slate-950 border-b border-slate-800 gap-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
              {scenario.badge}
            </span>
            <h2 className="text-sm sm:text-lg font-bold text-white truncate">{scenario.titleFa}</h2>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={() => onWatchVideo(scenario.id)}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm touch-target"
            >
              <PlayCircle className="w-4 h-4" />
              <span className="hidden xs:inline">پخش ویدیوی این بخش</span>
              <span className="xs:hidden">ویدیو</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors touch-target flex items-center justify-center"
              title="بستن پنجره"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 sm:space-y-6">
          {/* Summary & Pros/Cons Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-7 p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-400">چرا از این روش استفاده کنیم؟</h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{scenario.whyUseThis}</p>
              
              <div className="pt-2 border-t border-slate-800/80">
                <span className="text-xs font-bold text-slate-400 block mb-1">نمونه نرم‌افزارهای دنیای واقعی:</span>
                <p className="text-xs text-blue-300 font-semibold">{scenario.realWorldAppExample}</p>
              </div>
            </div>

            <div className="md:col-span-5 p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
              <div>
                <h4 className="text-xs font-bold text-emerald-400 mb-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>مزایای کلیدی:</span>
                </h4>
                <ul className="text-[11px] text-slate-300 space-y-1 pr-2">
                  {scenario.pros.map((p, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-500 mt-0.5">•</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 border-t border-slate-800/80">
                <h4 className="text-xs font-bold text-amber-400 mb-1 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>محدودیت‌ها / معایب:</span>
                </h4>
                <ul className="text-[11px] text-slate-300 space-y-1 pr-2">
                  {scenario.cons.map((c, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-500 mt-0.5">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Step-by-Step Interactive Guide */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span>مراحل اجرایی گام‌به‌گام ({scenario.steps.length} مرحله)</span>
              </h3>

              {/* Step pills */}
              <div className="flex items-center gap-1.5">
                {scenario.steps.map((s, idx) => (
                  <button
                    key={s.stepNumber}
                    onClick={() => setActiveStepIndex(idx)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                      activeStepIndex === idx
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {s.stepNumber}
                  </button>
                ))}
              </div>
            </div>

            {/* Current Step Detail Card */}
            <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950/80 space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-xs font-bold text-blue-400">مرحله {currentStep.stepNumber}</span>
                  <h4 className="text-base font-bold text-white mt-0.5">{currentStep.title}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                    disabled={activeStepIndex === 0}
                    className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveStepIndex((prev) => Math.min(scenario.steps.length - 1, prev + 1))}
                    disabled={activeStepIndex === scenario.steps.length - 1}
                    className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-30"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {currentStep.description}
              </p>

              {/* Command Box */}
              {currentStep.command && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                    <span>دستور اجرایی در خط فرمان فدورا:</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(currentStep.command!)}
                        className="flex items-center gap-1 text-slate-300 hover:text-white px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 transition-colors"
                      >
                        {copiedCmd === currentStep.command ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span className="text-[11px]">{copiedCmd === currentStep.command ? 'کپی شد' : 'کپی'}</span>
                      </button>
                      <button
                        onClick={() => {
                          onSendToTerminal(currentStep.command!);
                          onClose();
                        }}
                        className="flex items-center gap-1 text-blue-300 hover:text-white px-2 py-0.5 rounded bg-blue-600/30 border border-blue-500/40 hover:bg-blue-600 transition-colors"
                      >
                        <Terminal className="w-3 h-3" />
                        <span className="text-[11px]">ارسال به ترمینال</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#080c14] border border-slate-800 font-mono text-xs text-emerald-400 dir-ltr text-left overflow-x-auto select-all">
                    {currentStep.command}
                  </div>
                </div>
              )}

              {/* Terminal output simulation */}
              {currentStep.terminalOutputSimulation && (
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 block px-1">
                    نمای خروجی مورد انتظار در ترمینال:
                  </span>
                  <pre className="p-3 rounded-xl bg-[#06090e] border border-slate-800/80 font-mono text-[11px] text-slate-300 dir-ltr text-left overflow-x-auto leading-relaxed">
                    {currentStep.terminalOutputSimulation}
                  </pre>
                </div>
              )}

              {/* Tips & Warnings */}
              {currentStep.explanationTip && (
                <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-500/30 flex items-start gap-2.5 text-xs text-blue-200">
                  <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>{currentStep.explanationTip}</span>
                </div>
              )}

              {currentStep.warningNotice && (
                <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 flex items-start gap-2.5 text-xs text-amber-200">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span>{currentStep.warningNotice}</span>
                </div>
              )}
            </div>
          </div>

          {/* 3 Real-World Examples Showcase (Requested by User) */}
          {scenario.examplesList && scenario.examplesList.length > 0 && (
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-blue-500/30 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-blue-300 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                  حداقل ۳ مثال کاربردی و واقعی برای این سناریو در فدورا:
                </h4>
                <span className="text-[11px] text-slate-400">آماده کپی و اجرا</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {scenario.examplesList.map((ex, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex flex-col justify-between gap-2">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-white block">{ex.appName}</span>
                      <p className="text-[11px] text-slate-400 leading-normal">{ex.description}</p>
                    </div>

                    <div className="space-y-2 pt-1">
                      <div className="p-2 rounded bg-slate-950 font-mono text-[11px] text-emerald-400 break-all select-all" dir="ltr">
                        {ex.command}
                      </div>

                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleCopy(ex.command)}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] flex items-center gap-1"
                        >
                          {copiedCmd === ex.command ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>کپی</span>
                        </button>
                        <button
                          onClick={() => {
                            onSendToTerminal(ex.command);
                            onClose();
                          }}
                          className="px-2 py-1 bg-blue-600/30 hover:bg-blue-600 text-blue-200 rounded text-[11px] flex items-center gap-1"
                        >
                          <Terminal className="w-3 h-3" />
                          <span>ترمینال</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Verification & Removal Commands */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>بررسی و راستی‌آزمایی نصب موفق:</span>
              </h4>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-slate-200 dir-ltr text-left select-all">
                {scenario.verificationCommand}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                <Trash2 className="w-4 h-4" />
                <span>دستور حذف تمیز و کامل نرم‌افزار:</span>
              </h4>
              <div className="p-2.5 rounded-lg bg-slate-900 font-mono text-xs text-slate-200 dir-ltr text-left select-all">
                {scenario.removalCommand}
              </div>
            </div>
          </div>

          {/* Common Pitfalls & FAQs */}
          {scenario.commonPitfalls.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/20 space-y-2">
              <h4 className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-amber-400" />
                <span>اشتباهات رایج و نکات عیب‌یابی کاربران:</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300 pr-4 list-disc">
                {scenario.commonPitfalls.map((pitfall, i) => (
                  <li key={i}>{pitfall}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            راهنمای رسمی استانداردهای بسته‌بندی لینوکس فدورا
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
          >
            بستن راهنما
          </button>
        </div>
      </div>
    </div>
  );
};
