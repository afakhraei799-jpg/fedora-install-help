import React, { useState } from 'react';
import {
  Wrench,
  AlertTriangle,
  CheckCircle2,
  Copy,
  Check,
  Terminal,
  Search,
  Zap,
  ShieldAlert,
  Key,
  Database,
  WifiOff,
  FileCode,
  Layers,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  HelpCircle
} from 'lucide-react';
import { TROUBLESHOOTING_ISSUES, FEDORA_SELF_HEAL_SCRIPT } from '../data/troubleshooting';
import { TroubleshootingIssue } from '../types';

interface TroubleshootingGuideProps {
  onSendToTerminal: (command: string) => void;
}

export const TroubleshootingGuide: React.FC<TroubleshootingGuideProps> = ({
  onSendToTerminal
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedIssueId, setExpandedIssueId] = useState<string | null>('dependency-conflict');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [copiedMasterScript, setCopiedMasterScript] = useState(false);
  const [showSelfHealScript, setShowSelfHealScript] = useState(false);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const handleCopySelfHealScript = () => {
    navigator.clipboard.writeText(FEDORA_SELF_HEAL_SCRIPT);
    setCopiedMasterScript(true);
    setTimeout(() => setCopiedMasterScript(false), 2500);
  };

  const filteredIssues = TROUBLESHOOTING_ISSUES.filter((issue) => {
    const matchesCategory = selectedCategory === 'all' || issue.category === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchesCategory;

    const matchesSearch =
      issue.titleFa.toLowerCase().includes(query) ||
      issue.errorSignFa.toLowerCase().includes(query) ||
      issue.sampleErrorMessage.toLowerCase().includes(query) ||
      issue.causeFa.toLowerCase().includes(query) ||
      issue.quickSolutionCommand.toLowerCase().includes(query) ||
      issue.examples.some((ex) => ex.title.toLowerCase().includes(query) || ex.fixCommand.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'dependency':
        return <Layers className="w-4 h-4 text-rose-400" />;
      case 'gpg':
        return <Key className="w-4 h-4 text-amber-400" />;
      case 'lock':
        return <Database className="w-4 h-4 text-sky-400" />;
      case 'network':
        return <WifiOff className="w-4 h-4 text-indigo-400" />;
      case 'execution':
        return <FileCode className="w-4 h-4 text-emerald-400" />;
      case 'driver':
        return <Zap className="w-4 h-4 text-purple-400" />;
      default:
        return <Wrench className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div id="troubleshooting-guide" className="space-y-6">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-950/40 via-slate-900/90 to-amber-950/40 border border-rose-500/30 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>راهنمای جامع عیب‌یابی و رفع خطاهای پس از نصب فدورا</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              عیب‌یابی تخصصی: رفع خطاهای وابستگی (Dependencies)، کلیدهای GPG و قفل DNF
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              هنگام مدیریت بسته‌ها در فدورا ممکن است با خطاهایی مانند <strong className="text-rose-300">تداخل وابستگی‌ها (Conflicting Requests)</strong>، <strong className="text-amber-300">خطای عدم تطابق کلید GPG</strong> یا <strong className="text-sky-300">قفل بودن دیتابیس RPM</strong> مواجه شوید. در این بخش می‌توانید سریعاً علت خطا را تشخیص داده و با راه‌حل‌های قطعی و تست‌شده آن را ترمیم کنید.
            </p>

            <div className="text-xs text-rose-200/80 flex items-center gap-2 bg-rose-950/40 px-3 py-1.5 rounded-lg border border-rose-500/20 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
              <span>تمام بخش‌های عیب‌یابی شامل <strong>حداقل ۳ مثال واقعی از خطاهای ترمینال و دستور ترمیم</strong> هستند.</span>
            </div>
          </div>

          {/* Quick Action: Self-Heal Automation Script */}
          <div className="w-full lg:w-72 p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 shrink-0">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span>ترمیم خودکار فدورا (Self-Heal)</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-normal">
                اجرای یکجای دستورات آزادسازی قفل، رفرش کلیدهای GPG، بازسازی rpmdb و همگام‌سازی بسته‌ها.
              </p>
            </div>

            <button
              id="btn-toggle-self-heal"
              onClick={() => setShowSelfHealScript(!showSelfHealScript)}
              className="w-full py-2 px-3 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md shadow-rose-900/30"
            >
              <Zap className="w-4 h-4 text-white" />
              <span>{showSelfHealScript ? 'بستن اسکریپت ترمیم' : 'مشاهده اسکریپت ترمیم سریع'}</span>
            </button>
          </div>
        </div>

        {/* Collapsible Self-Heal Script Box */}
        {showSelfHealScript && (
          <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-amber-500/40 space-y-3 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-bold text-amber-300">اسکریپت تعمیری خودکار چندکاره فدورا:</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopySelfHealScript}
                  className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-200 rounded-lg text-xs flex items-center gap-1.5 transition-colors touch-target"
                >
                  {copiedMasterScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedMasterScript ? 'کپی شد!' : 'کپی اسکریپت'}</span>
                </button>
                <button
                  onClick={() => onSendToTerminal('sudo dnf distro-sync --allowerasing -y')}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs flex items-center gap-1.5 transition-colors touch-target"
                >
                  <Terminal className="w-3.5 h-3.5 text-blue-400" />
                  <span>تست دستور کلیدی</span>
                </button>
              </div>
            </div>

            <pre className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300 font-mono overflow-x-auto max-h-56 leading-relaxed select-all" dir="ltr">
              {FEDORA_SELF_HEAL_SCRIPT}
            </pre>
            <p className="text-xs text-slate-400">
              💡 نکته: این اسکریپت بدون تغییر در فایل‌های شخصی شما، دیتابیس بسته‌های فدورا را نوسازی و سلامت سیستم را بازمی‌گرداند.
            </p>
          </div>
        )}
      </div>

      {/* Quick Search & Interactive Issue Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Search Bar */}
        <div className="md:col-span-2 relative">
          <Search className="w-4 h-4 text-slate-400 absolute right-3.5 top-3" />
          <input
            id="troubleshoot-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجوی متن ارور ترمینال (مانند GPG, conflicting, locked, fuse, timeout)..."
            className="w-full pl-4 pr-10 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors min-w-0"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute left-3 top-3 text-xs text-slate-400 hover:text-white"
            >
              پاک کردن
            </button>
          )}
        </div>

        {/* Quick Diagnostic Jump dropdown */}
        <div>
          <select
            value={expandedIssueId || ''}
            onChange={(e) => {
              setExpandedIssueId(e.target.value);
              const element = document.getElementById(`issue-${e.target.value}`);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none focus:border-rose-500"
          >
            <option value="">پرش مستقیم به خطای مورد نظر...</option>
            {TROUBLESHOOTING_ISSUES.map((issue) => (
              <option key={issue.id} value={issue.id}>
                {issue.titleFa.substring(0, 45)}...
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1.5 sm:pb-0 sm:flex-wrap no-scrollbar">
        {[
          { id: 'all', label: 'همه خطاها (۶ دسته)' },
          { id: 'dependency', label: 'وابستگی‌ها (Dependencies)' },
          { id: 'gpg', label: 'کلیدهای امنیتی GPG' },
          { id: 'lock', label: 'قفل دیتابیس DNF' },
          { id: 'network', label: 'تایم‌اوت و آینه‌ها' },
          { id: 'execution', label: 'خطای اجرای AppImage/FUSE' },
          { id: 'driver', label: 'درایور انویدیا و Akmod' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all touch-target flex items-center justify-center ${
              selectedCategory === cat.id
                ? 'bg-rose-500 text-white font-bold shadow-md shadow-rose-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Issues List */}
      <div className="space-y-4">
        {filteredIssues.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
            <HelpCircle className="w-8 h-8 text-slate-500 mx-auto" />
            <p className="text-slate-300 font-medium text-sm">هیچ خطایی منطبق با جستجوی شما یافت نشد.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-xs text-rose-400 hover:underline"
            >
              نمایش مجدد همه خطاهای فدورا
            </button>
          </div>
        ) : (
          filteredIssues.map((issue: TroubleshootingIssue) => {
            const isExpanded = expandedIssueId === issue.id;

            const severityBadgeColor =
              issue.severity === 'بحرانی'
                ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                : issue.severity === 'متوسط'
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                : 'bg-blue-500/10 text-blue-400 border-blue-500/30';

            return (
              <div
                id={`issue-${issue.id}`}
                key={issue.id}
                className="rounded-2xl border bg-slate-900/70 border-slate-800 hover:border-slate-700 transition-all"
              >
                {/* Issue Header */}
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="p-2 rounded-xl bg-slate-800/80 border border-slate-700/60 shrink-0 mt-0.5">
                      {getCategoryIcon(issue.category)}
                    </div>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-white">
                          {issue.titleFa}
                        </h3>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${severityBadgeColor}`}>
                          سطح اهمیت: {issue.severity}
                        </span>
                      </div>
                      <p className="text-xs text-rose-300/90 font-mono flex items-center gap-1.5" dir="ltr">
                        <AlertTriangle className="w-3 h-3 text-rose-400 shrink-0" />
                        <span className="truncate">{issue.errorSignFa}</span>
                      </p>
                    </div>
                  </div>

                  {/* Actions: Copy quick fix, send to terminal & expand toggle */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      onClick={() => handleCopy(issue.quickSolutionCommand, issue.id)}
                      className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs flex items-center gap-1.5 transition-colors"
                      title="کپی دستور سریع رفع خطا"
                    >
                      {copiedCmd === issue.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span className="hidden md:inline text-xs">کپی راه‌حل فوری</span>
                    </button>

                    <button
                      onClick={() => onSendToTerminal(issue.quickSolutionCommand)}
                      className="p-2 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-1.5 transition-colors"
                      title="تست در شبیه‌ساز ترمینال"
                    >
                      <Terminal className="w-3.5 h-3.5 text-rose-400" />
                      <span className="hidden md:inline text-xs">تست در ترمینال</span>
                    </button>

                    <button
                      onClick={() => setExpandedIssueId(isExpanded ? null : issue.id)}
                      className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                      title={isExpanded ? 'بستن جزئیات' : 'مشاهده توضیحات و ۳ مثال'}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Quick Solution Command Strip */}
                <div className="px-4 sm:px-5 pb-3">
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between gap-3 text-xs font-mono text-emerald-400" dir="ltr">
                    <span className="truncate selection:bg-emerald-950">{issue.quickSolutionCommand}</span>
                    <button
                      onClick={() => handleCopy(issue.quickSolutionCommand, `${issue.id}-strip`)}
                      className="text-slate-500 hover:text-slate-300 shrink-0"
                      title="کپی سریع"
                    >
                      {copiedCmd === `${issue.id}-strip` ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details: Sample Error, Cause, Steps, and 3 Real-World Examples */}
                {isExpanded && (
                  <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-slate-800/60 space-y-4">
                    {/* Sample Error Log from Terminal */}
                    <div className="space-y-1.5">
                      <span className="text-xs font-semibold text-rose-300 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                        نمونه پیام خطایی که در ترمینال فدورا ظاهر می‌شود:
                      </span>
                      <pre className="p-3 rounded-xl bg-black/60 border border-rose-950 text-[11px] font-mono text-rose-300/90 leading-relaxed overflow-x-auto select-all" dir="ltr">
                        {issue.sampleErrorMessage}
                      </pre>
                    </div>

                    {/* Root Cause Explanation */}
                    <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                      <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5" />
                        علت ریشه‌ای وقوع این خطا چیست؟
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {issue.causeFa}
                      </p>
                    </div>

                    {/* Step-by-Step Resolution */}
                    <div className="space-y-2">
                      <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                        <Wrench className="w-3.5 h-3.5 text-blue-400" />
                        مراحل اصولی رفع کامل خطا:
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5">
                        {issue.stepsFa.map((step, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/90 space-y-1.5">
                            <span className="text-xs font-bold text-blue-300 block">{step.title}</span>
                            <p className="text-[11px] text-slate-400 leading-normal">{step.description}</p>
                            {step.command && (
                              <div className="pt-1 flex items-center justify-between gap-2">
                                <code className="p-1.5 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-emerald-400 truncate select-all" dir="ltr">
                                  {step.command}
                                </code>
                                <button
                                  onClick={() => handleCopy(step.command!, `${issue.id}-step-${idx}`)}
                                  className="text-slate-500 hover:text-slate-300 shrink-0"
                                  title="کپی"
                                >
                                  {copiedCmd === `${issue.id}-step-${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 3 Real-World Concrete Examples Showcase */}
                    <div className="space-y-2.5 pt-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                          <Layers className="w-3.5 h-3.5 text-rose-400" />
                          حداقل ۳ مثال کاربردی از این خطا و دستور مستقیم رفع آن:
                        </span>
                        <span className="text-[11px] text-slate-400">همراه با خروجی مورد انتظار در ترمینال</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {issue.examples.map((ex, idx) => (
                          <div
                            key={idx}
                            className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between gap-2.5 text-xs"
                          >
                            <div className="space-y-1">
                              <span className="font-semibold text-rose-300 block">{ex.title}</span>
                              <p className="text-[11px] text-slate-400 leading-normal">{ex.scenarioText}</p>
                            </div>

                            <div className="space-y-1.5">
                              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-emerald-300 break-all select-all" dir="ltr">
                                {ex.fixCommand}
                              </div>
                              {ex.simulatedOutput && (
                                <div className="p-2 rounded bg-black/60 border border-slate-800/60 text-[10px] font-mono text-slate-400 max-h-24 overflow-y-auto leading-tight" dir="ltr">
                                  {ex.simulatedOutput}
                                </div>
                              )}
                            </div>

                            <div className="flex items-center justify-end gap-1.5 pt-1">
                              <button
                                onClick={() => handleCopy(ex.fixCommand, `${issue.id}-ex-${idx}`)}
                                className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] flex items-center gap-1"
                              >
                                {copiedCmd === `${issue.id}-ex-${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                <span>کپی</span>
                              </button>
                              <button
                                onClick={() => onSendToTerminal(ex.fixCommand)}
                                className="px-2 py-1 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 rounded text-[11px] flex items-center gap-1"
                              >
                                <Terminal className="w-3 h-3 text-rose-400" />
                                <span>ترمینال</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Prevention Tip */}
                    <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 flex items-start gap-2.5 text-xs">
                      <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <span className="font-bold text-emerald-300">نکته پیشگیری از تکرار خطا:</span>
                        <p className="text-slate-300 leading-relaxed">{issue.preventionTipFa}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
