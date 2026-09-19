import React, { useState } from 'react';
import { HelpCircle, ArrowLeft, RotateCcw, CheckCircle2, Terminal, ListOrdered, Sparkles } from 'lucide-react';
import { DECISION_TREE, SCENARIOS } from '../data/scenarios';
import { DecisionNode, InstallationScenario } from '../types';

interface DecisionWizardProps {
  onSelectScenario: (scenario: InstallationScenario) => void;
  onSendToTerminal: (cmd: string) => void;
}

export const DecisionWizard: React.FC<DecisionWizardProps> = ({
  onSelectScenario,
  onSendToTerminal,
}) => {
  const [currentNodeId, setCurrentNodeId] = useState<string>('start');
  const [finalRecommendation, setFinalRecommendation] = useState<{
    scenarioId: string;
    reasonFa: string;
  } | null>(null);

  const currentNode: DecisionNode | undefined = DECISION_TREE.find((n) => n.id === currentNodeId);

  const handleSelectOption = (option: typeof DECISION_TREE[0]['options'][0]) => {
    if (option.recommendedScenarioId) {
      setFinalRecommendation({
        scenarioId: option.recommendedScenarioId,
        reasonFa: option.reasonFa || 'بر اساس پاسخ‌های شما، این روش بهترین عملکرد را برای شما خواهد داشت.'
      });
    } else if (option.nextId) {
      setCurrentNodeId(option.nextId);
    }
  };

  const handleReset = () => {
    setCurrentNodeId('start');
    setFinalRecommendation(null);
  };

  const matchedScenario = finalRecommendation
    ? SCENARIOS.find((s) => s.id === finalRecommendation.scenarioId)
    : null;

  return (
    <div id="decision-wizard-container" className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950 shadow-xl max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-black text-white">کمک‌یار انتخاب بهترین روش نصب</h3>
            <p className="text-xs text-slate-400">راهنمای هوشمند انتخاب بین DNF، Flatpak، RPM و AppImage</p>
          </div>
        </div>

        {(currentNodeId !== 'start' || finalRecommendation) && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>شروع دوباره</span>
          </button>
        )}
      </div>

      {/* Content */}
      {!finalRecommendation && currentNode ? (
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-blue-400">پرسش تشخیصی:</span>
            <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
              {currentNode.questionFa}
            </h4>
            <p className="text-xs text-slate-400">{currentNode.subtitleFa}</p>
          </div>

          {/* Options list */}
          <div className="space-y-2.5">
            {currentNode.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(opt)}
                className="w-full p-4 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-blue-950/20 hover:border-blue-500/40 text-right transition-all group flex items-center justify-between gap-4"
              >
                <div>
                  <h5 className="font-bold text-xs sm:text-sm text-slate-200 group-hover:text-blue-300 transition-colors">
                    {opt.textFa}
                  </h5>
                  <p className="text-[11px] text-slate-400 mt-1">{opt.hintFa}</p>
                </div>
                <ArrowLeft className="w-4 h-4 text-slate-600 group-hover:text-blue-400 shrink-0 transition-transform group-hover:-translate-x-1" />
              </button>
            ))}
          </div>
        </div>
      ) : matchedScenario && finalRecommendation ? (
        <div className="p-6 rounded-2xl border border-emerald-500/40 bg-emerald-950/20 space-y-5">
          <div className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-xs font-bold uppercase tracking-wider">روش پیشنهادی نهایی:</span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {matchedScenario.badge}
              </span>
              <h4 className="text-xl font-black text-white">{matchedScenario.titleFa}</h4>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {finalRecommendation.reasonFa}
            </p>
          </div>

          {matchedScenario.steps[0]?.command && (
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-400 block">دستور آغازین این روش:</span>
              <div className="font-mono text-xs text-emerald-400 dir-ltr text-left select-all">
                {matchedScenario.steps[0].command}
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2 pt-2">
            <button
              onClick={() => onSelectScenario(matchedScenario)}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/20"
            >
              <ListOrdered className="w-4 h-4" />
              <span>مشاهده آموزش کامل گام‌به‌گام</span>
            </button>

            {matchedScenario.steps[0]?.command && (
              <button
                onClick={() => onSendToTerminal(matchedScenario.steps[0].command!)}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-colors"
              >
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>اجرای زنده در ترمینال</span>
              </button>
            )}

            <button
              onClick={handleReset}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-xl text-xs transition-colors"
            >
              پرسش دیگر
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
