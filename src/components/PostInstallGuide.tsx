import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Copy, 
  Check, 
  Terminal, 
  Zap, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink,
  Film,
  Layers,
  ChevronDown,
  ChevronUp,
  Cpu,
  Monitor,
  HardDrive,
  Wrench
} from 'lucide-react';
import { POST_INSTALL_TASKS, MASTER_POST_INSTALL_SCRIPT } from '../data/postInstall';
import { PostInstallTask } from '../types';

interface PostInstallGuideProps {
  onSendToTerminal: (command: string) => void;
  onOpenVideoLesson?: (lessonId: string) => void;
  onOpenTroubleshoot?: () => void;
}

export const PostInstallGuide: React.FC<PostInstallGuideProps> = ({
  onSendToTerminal,
  onOpenVideoLesson,
  onOpenTroubleshoot,
}) => {
  const [completedTasks, setCompletedTasks] = useState<Record<string, boolean>>({});
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [copiedMasterScript, setCopiedMasterScript] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>('speedup-dnf');
  const [showMasterScript, setShowMasterScript] = useState(false);

  const toggleTaskCompleted = (id: string) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  const handleCopyMasterScript = () => {
    navigator.clipboard.writeText(MASTER_POST_INSTALL_SCRIPT);
    setCopiedMasterScript(true);
    setTimeout(() => setCopiedMasterScript(false), 2500);
  };

  const totalTasks = POST_INSTALL_TASKS.length;
  const completedCount = Object.values(completedTasks).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / totalTasks) * 100);

  const filteredTasks = POST_INSTALL_TASKS.filter((task) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'essential') return task.priority === 'ضروری' || task.priority === 'بسیار مهم';
    return task.category === activeCategory;
  });

  return (
    <div id="post-install-guide" className="space-y-6">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-950/40 via-slate-900/90 to-blue-950/40 border border-amber-500/30 p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>کارهای ضروری بلافاصله پس از نصب فدورا (Post-Installation Setup)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
              چک‌لیست طلایی راه‌اندازی و بهینه‌سازی فدورا پس از نصب اولیه
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              توزیع فدورا پس از نصب بسیار تمیز و سبک است، اما برای استفاده روان روزمره، وبگردی و برنامه‌نویسی باید چند گام حیاتی مثل <strong className="text-amber-300">چندبرابر کردن سرعت DNF</strong>، <strong className="text-amber-300">فعال‌سازی RPM Fusion</strong>، <strong className="text-amber-300">نصب کدک‌های FFmpeg</strong> و <strong className="text-amber-300">مخزن کامل Flathub</strong> را انجام دهید.
            </p>
            
            {/* Real-world 3 examples note */}
            <div className="text-xs text-amber-200/80 flex items-center gap-2 bg-amber-950/40 px-3 py-1.5 rounded-lg border border-amber-500/20 w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
              <span>تمامی مباحث و سناریوها شامل <strong>حداقل ۳ مثال عملی و واقعی با خروجی ترمینال</strong> هستند.</span>
            </div>
          </div>

          {/* Progress Card & Quick Master Script Button */}
          <div className="w-full lg:w-72 p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3 shrink-0">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">پیشرفت راه‌اندازی سیستم:</span>
              <span className="text-amber-400 font-bold">{completedCount} از {totalTasks} اقدام</span>
            </div>
            
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                id="btn-toggle-master-script"
                onClick={() => setShowMasterScript(!showMasterScript)}
                className="w-full py-2 px-3 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <Zap className="w-4 h-4 text-amber-400" />
                <span>{showMasterScript ? 'بستن اسکریپت خودکار' : 'اسکریپت خودکار کل اقدامات'}</span>
              </button>

              {onOpenVideoLesson && (
                <button
                  id="btn-open-postinstall-video"
                  onClick={() => onOpenVideoLesson('lesson-post-install')}
                  className="w-full py-1.5 px-3 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>مشاهده ویدیوی آموزشی درس ۰</span>
                </button>
              )}

              {onOpenTroubleshoot && (
                <button
                  id="btn-open-postinstall-troubleshoot"
                  onClick={onOpenTroubleshoot}
                  className="w-full py-1.5 px-3 bg-rose-600/20 hover:bg-rose-600/30 border border-rose-500/40 text-rose-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  <Wrench className="w-3.5 h-3.5 text-rose-400" />
                  <span>عیب‌یابی خطاهای GPG و وابستگی</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Master Script Collapsible Box */}
        {showMasterScript && (
          <div className="mt-6 p-4 rounded-xl bg-slate-950 border border-amber-500/40 space-y-3 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-bold text-amber-300">اسکریپت نصاب خودکار تمام ۸ اقدام با یک دستور:</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyMasterScript}
                  className="px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-200 rounded text-xs flex items-center gap-1.5"
                >
                  {copiedMasterScript ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedMasterScript ? 'کپی شد!' : 'کپی اسکریپت'}</span>
                </button>
                <button
                  onClick={() => onSendToTerminal('sudo dnf upgrade --refresh -y')}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs flex items-center gap-1.5"
                >
                  <Terminal className="w-3.5 h-3.5 text-blue-400" />
                  <span>ارسال به ترمینال</span>
                </button>
              </div>
            </div>

            <pre className="p-3 bg-slate-900 rounded-lg text-xs text-slate-300 font-mono overflow-x-auto max-h-56 leading-relaxed select-all" dir="ltr">
              {MASTER_POST_INSTALL_SCRIPT}
            </pre>
            <p className="text-xs text-slate-400">
              💡 نکته: این اسکریپت تمام مراحل شامل سرعت DNF، مخازن RPM Fusion، کدک‌های FFmpeg، Flathub و GNOME Tweaks را به صورت خودکار پیکربندی می‌کند.
            </p>
          </div>
        )}
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: 'all', label: 'همه اقدامات (۸ مرحله)' },
          { id: 'essential', label: 'اقدامات بسیار حیاتی' },
          { id: 'speed', label: 'سرعت و به‌روزرسانی' },
          { id: 'codecs', label: 'کدک‌ها و مالتی‌مدیا' },
          { id: 'repositories', label: 'مخازن نرم‌افزاری' },
          { id: 'tweaks', label: 'شخصی‌سازی و فونت' },
          { id: 'drivers', label: 'درایور انویدیا و گیمینگ' },
          { id: 'backup', label: 'باتری و اسنپ‌شات' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              activeCategory === cat.id
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Checklist Task Cards */}
      <div className="space-y-4">
        {filteredTasks.map((task: PostInstallTask) => {
          const isCompleted = !!completedTasks[task.id];
          const isExpanded = expandedTaskId === task.id;

          const priorityBadgeColor = 
            task.priority === 'ضروری' 
              ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
              : task.priority === 'بسیار مهم'
              ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
              : 'bg-blue-500/10 text-blue-400 border-blue-500/30';

          return (
            <div
              key={task.id}
              className={`rounded-2xl border transition-all ${
                isCompleted
                  ? 'bg-slate-950/60 border-emerald-900/40 opacity-90'
                  : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Card Header Row */}
              <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3.5">
                  <button
                    onClick={() => toggleTaskCompleted(task.id)}
                    className="mt-0.5 text-slate-400 hover:text-emerald-400 transition-colors"
                    title={isCompleted ? 'علامت‌گذاری به عنوان انجام نشده' : 'علامت‌گذاری به عنوان انجام شده'}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-950" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400" />
                    )}
                  </button>

                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className={`text-base font-bold transition-colors ${isCompleted ? 'line-through text-slate-500' : 'text-white'}`}>
                        {task.titleFa}
                      </h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${priorityBadgeColor}`}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                      {task.summaryFa}
                    </p>
                  </div>
                </div>

                {/* Right controls: copy primary command, send to terminal & expand */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button
                    onClick={() => handleCopy(task.primaryCommand, task.id)}
                    className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-xs flex items-center gap-1.5 transition-colors"
                    title="کپی دستور اصلی"
                  >
                    {copiedCmd === task.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span className="hidden md:inline text-xs">کپی دستور</span>
                  </button>

                  <button
                    onClick={() => onSendToTerminal(task.primaryCommand)}
                    className="p-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 text-blue-300 text-xs flex items-center gap-1.5 transition-colors"
                    title="اجرا در شبیه‌ساز ترمینال"
                  >
                    <Terminal className="w-3.5 h-3.5 text-blue-400" />
                    <span className="hidden md:inline text-xs">تست در ترمینال</span>
                  </button>

                  <button
                    onClick={() => setExpandedTaskId(isExpanded ? null : task.id)}
                    className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                    title={isExpanded ? 'بستن جزئیات و ۳ مثال' : 'مشاهده ۳ مثال و توضیحات'}
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Primary Command Strip */}
              <div className="px-4 sm:px-5 pb-3">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between gap-3 text-xs font-mono text-emerald-400" dir="ltr">
                  <span className="truncate selection:bg-emerald-950">{task.primaryCommand}</span>
                  <button
                    onClick={() => handleCopy(task.primaryCommand, task.id + '-raw')}
                    className="text-slate-500 hover:text-slate-300 shrink-0"
                    title="کپی سریع"
                  >
                    {copiedCmd === task.id + '-raw' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Expanded View: 3 Concrete Real-World Examples, Why needed, and Verification */}
              {isExpanded && (
                <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-slate-800/60 space-y-4">
                  {/* Why Needed Explanation */}
                  <div className="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 space-y-1">
                    <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      چرا این کار پس از نصب فدورا ضروری است؟
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {task.whyNeededFa}
                    </p>
                  </div>

                  {/* 3 Real-World Examples Section (Requested by user) */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-blue-400" />
                        حداقل ۳ مثال کاربردی و عملی برای این موضوع:
                      </span>
                      <span className="text-[11px] text-slate-400">شامل خروجی واقعی ترمینال فدورا</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {task.examples.map((ex, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between gap-2.5 text-xs"
                        >
                          <div className="space-y-1">
                            <span className="font-semibold text-blue-300 block">{ex.title}</span>
                            <p className="text-[11px] text-slate-400 leading-normal">{ex.description}</p>
                          </div>

                          <div className="space-y-1.5">
                            <div className="p-2 rounded bg-slate-900 border border-slate-800 text-[11px] font-mono text-emerald-300 break-all select-all" dir="ltr">
                              {ex.command}
                            </div>
                            {ex.simulatedOutput && (
                              <div className="p-2 rounded bg-black/50 border border-slate-800/60 text-[10px] font-mono text-slate-400 max-h-20 overflow-y-auto leading-tight" dir="ltr">
                                {ex.simulatedOutput}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-end gap-1.5 pt-1">
                            <button
                              onClick={() => handleCopy(ex.command, `${task.id}-ex-${idx}`)}
                              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] flex items-center gap-1"
                            >
                              {copiedCmd === `${task.id}-ex-${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              <span>کپی</span>
                            </button>
                            <button
                              onClick={() => onSendToTerminal(ex.command)}
                              className="px-2 py-1 bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 rounded text-[11px] flex items-center gap-1"
                            >
                              <Terminal className="w-3 h-3 text-blue-400" />
                              <span>ترمینال</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Verification Command & Tips */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    {task.verificationCommand && (
                      <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                        <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          دستور تست صحت کارکرد (Verification):
                        </span>
                        <div className="p-2 rounded bg-slate-900 border border-slate-800/80 font-mono text-xs text-slate-300 flex items-center justify-between gap-2" dir="ltr">
                          <span className="truncate">{task.verificationCommand}</span>
                          <button
                            onClick={() => onSendToTerminal(task.verificationCommand!)}
                            className="text-slate-400 hover:text-white shrink-0"
                            title="تست در ترمینال"
                          >
                            <Terminal className="w-3.5 h-3.5 text-blue-400" />
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
                      <span className="text-xs font-semibold text-slate-300">نکات تکمیلی و مهم:</span>
                      <ul className="text-xs text-slate-400 space-y-1 list-disc list-inside">
                        {task.tipsFa.map((tip, idx) => (
                          <li key={idx} className="leading-relaxed">{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
