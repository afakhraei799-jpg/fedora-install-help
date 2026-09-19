import React, { useState } from 'react';
import { 
  HardDrive, 
  GitBranch, 
  Terminal, 
  Copy, 
  Check, 
  ExternalLink, 
  FileCode, 
  Package, 
  Download, 
  PlayCircle,
  HelpCircle,
  FolderDown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

interface UserSpecialScenariosBannerProps {
  onSendToTerminal: (cmd: string) => void;
  onOpenVideoLesson?: (lessonId: string) => void;
  onSelectScenarioId?: (scenarioId: string) => void;
}

export const UserSpecialScenariosBanner: React.FC<UserSpecialScenariosBannerProps> = ({
  onSendToTerminal,
  onOpenVideoLesson,
  onSelectScenarioId
}) => {
  const [activeScenario, setActiveScenario] = useState<'local' | 'github'>('local');
  const [localFileType, setLocalFileType] = useState<'rpm' | 'appimage' | 'flatpak' | 'tar' | 'script'>('rpm');
  const [githubMode, setGithubMode] = useState<'direct-rpm' | 'release-asset' | 'git-clone'>('direct-rpm');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <section className="rounded-3xl border border-blue-500/30 bg-gradient-to-b from-blue-950/40 via-slate-900/90 to-slate-950 p-5 sm:p-7 shadow-2xl space-y-6">
      {/* Header with clear callout */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
              <Sparkles className="w-5 h-5" />
            </span>
            <h2 className="text-base sm:text-lg font-black text-white">
              پاسخ مستقیم به سناریوهای درخواستی شما در فدورا لینوکس
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300">
            بررسی دقیق دو حالت پرکاربرد: <strong className="text-blue-300">۱. فایل نصبی روی هارد کامپیوتر موجود است</strong> و <strong className="text-violet-300">۲. آدرس فایل در گیت‌هاب (GitHub) را دارید</strong>.
          </p>
        </div>

        {/* Main 2-Way Scenario Toggle Switch */}
        <div className="flex items-center p-1 bg-slate-950 rounded-2xl border border-slate-800 w-full sm:w-auto shrink-0">
          <button
            onClick={() => setActiveScenario('local')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeScenario === 'local'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <HardDrive className="w-4 h-4" />
            <span>۱. فایل در کامپیوتر موجود است</span>
          </button>
          <button
            onClick={() => setActiveScenario('github')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeScenario === 'github'
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GitBranch className="w-4 h-4" />
            <span>۲. آدرس گیت‌هاب را دارید</span>
          </button>
        </div>
      </div>

      {/* Content Scenario 1: Local File on PC/Laptop */}
      {activeScenario === 'local' && (
        <div className="space-y-5 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <span className="text-xs font-bold text-slate-300">
              پسوند یا فرمت فایلی که در کامپیوتر یا لپ‌تاپ خود دارید چیست؟
            </span>
            {/* Subtabs for file types */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1.5 sm:pb-0 sm:flex-wrap no-scrollbar">
              <button
                onClick={() => setLocalFileType('rpm')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors touch-target flex items-center justify-center ${
                  localFileType === 'rpm'
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                فایل .rpm (رد‌هت/فدورا)
              </button>
              <button
                onClick={() => setLocalFileType('appimage')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors touch-target flex items-center justify-center ${
                  localFileType === 'appimage'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                فایل .AppImage (پرتابل)
              </button>
              <button
                onClick={() => setLocalFileType('flatpak')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors touch-target flex items-center justify-center ${
                  localFileType === 'flatpak'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                باندل .flatpak
              </button>
              <button
                onClick={() => setLocalFileType('tar')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors touch-target flex items-center justify-center ${
                  localFileType === 'tar'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                فشرده .tar.gz / .zip
              </button>
              <button
                onClick={() => setLocalFileType('script')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors touch-target flex items-center justify-center ${
                  localFileType === 'script'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                اسکریپت .sh / .run
              </button>
            </div>
          </div>

          {/* Dynamic details for Local File Types */}
          {localFileType === 'rpm' && (
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-blue-500/30 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 shrink-0">
                  <Package className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">نحوه نصب فایل .rpm موجود در سیستم شما</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    فرض کنید فایل نصبی مانند <code className="text-blue-300">google-chrome.rpm</code> یا <code className="text-blue-300">app-installer.rpm</code> در پوشه دانلودها (Downloads) یا فلش مموری شما قرار دارد.
                  </p>
                </div>
              </div>

              {/* Terminal vs Graphical */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Method 1: Terminal with DNF */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <Terminal className="w-4 h-4" /> روش ۱: خط فرمان ترمینال (استاندارد و توصیه‌شده)
                  </span>
                  <p className="text-xs text-slate-400">
                    ابتدا به پوشه فایل بروید و با DNF نصب کنید. <strong className="text-white">نکته حیاتی:</strong> علامت <code className="text-amber-400">./</code> قبل از نام فایل الزامی است تا فدورا متوجه شود فایل روی کامپیوتر است و در اینترنت دنبال آن نگردد!
                  </p>

                  <div className="p-2.5 rounded-lg bg-[#070b12] border border-slate-800 flex items-center justify-between gap-2">
                    <code className="text-xs font-mono text-emerald-400 dir-ltr text-left overflow-x-auto select-all">
                      cd ~/Downloads && sudo dnf install ./app-name.rpm -y
                    </code>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleCopy('cd ~/Downloads && sudo dnf install ./app-name.rpm -y')}
                        className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                        title="کپی دستور"
                      >
                        {copiedCmd === 'cd ~/Downloads && sudo dnf install ./app-name.rpm -y' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => onSendToTerminal('sudo dnf install ./google-chrome-stable_current_x86_64.rpm -y')}
                        className="p-1.5 rounded bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white"
                        title="تست در شبیه‌ساز"
                      >
                        <Terminal className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/30 text-[11px] text-amber-200">
                    ⚠️ <strong>اشتباه مرگبار:</strong> هرگز از دستور <code className="font-mono text-amber-300">sudo rpm -i file.rpm</code> استفاده نکنید! چون دستور rpm وابستگی‌های پیش‌نیاز را حل نمی‌کند و خطا می‌دهد. اما <code className="font-mono text-emerald-300">dnf install</code> کتابخانه‌ها را خودکار دانلود و وصل می‌کند.
                  </div>
                </div>

                {/* Method 2: Graphical (GNOME Software) */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                  <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
                    <FolderDown className="w-4 h-4" /> روش ۲: محیط گرافیکی و دابل کلیک (بدون ترمینال)
                  </span>
                  <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
                    <li>نرم‌افزار مدیریت فایل (Files / Nautilus) را باز کنید و به پوشه دانلودها بروید.</li>
                    <li>روی فایل <span className="font-mono text-blue-300">.rpm</span> دوبار کلیک کنید (یا راست‌کلیک کرده و گزینه <strong>Open With Software Install</strong> را بزنید).</li>
                    <li>پنجره GNOME Software باز می‌شود؛ روی دکمه آبی‌رنگ <strong>Install</strong> کلیک کرده و رمز عبور لینوکس خود را وارد کنید.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {localFileType === 'appimage' && (
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-cyan-500/30 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                  <HardDrive className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">نحوه اجرای فایل .AppImage موجود در کامپیوتر</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    فایل‌های AppImage پرتابل هستند و اصلاً <strong>نیازی به نصب یا دسترسی روت (sudo) ندارند!</strong> فقط کافی است یک‌بار به آن‌ها مجوز اجرایی (Executable) بدهید.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
                  <span className="text-xs font-bold text-cyan-300">دستور ترمینال (فقط ۲ دستور ساده):</span>
                  <div className="p-2.5 rounded-lg bg-[#070b12] border border-slate-800 flex items-center justify-between gap-2">
                    <code className="text-xs font-mono text-emerald-400 dir-ltr text-left overflow-x-auto select-all">
                      chmod +x ./program.AppImage && ./program.AppImage
                    </code>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleCopy('chmod +x ./program.AppImage && ./program.AppImage')}
                        className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                      >
                        {copiedCmd?.includes('chmod +x') ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                      <button
                        onClick={() => onSendToTerminal('chmod +x Krita.AppImage && ./Krita.AppImage')}
                        className="p-1.5 rounded bg-cyan-600/30 hover:bg-cyan-600 text-cyan-300 hover:text-white"
                      >
                        <Terminal className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-slate-200">روش گرافیکی:</span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    روی فایل AppImage راست‌کلیک کنید &gt; به تب <strong>Properties</strong> بروید &gt; گزینه <strong>Allow executing file as program</strong> یا Executable را تیک بزنید. از حالا به بعد با دابل کلیک برنامه باز می‌شود!
                  </p>
                </div>
              </div>
            </div>
          )}

          {localFileType === 'flatpak' && (
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-emerald-500/30 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">نصب فایل آفلاین .flatpak یا .flatpakref از روی هارد</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    اگر پکیج آفلاین یک برنامه فلت‌پک یا فایل ارجاع مخزن آن را از قبل روی کامپیوتر دانلود کرده‌اید:
                  </p>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#070b12] border border-slate-800 flex items-center justify-between gap-2">
                <code className="text-xs font-mono text-emerald-400 dir-ltr text-left overflow-x-auto select-all">
                  flatpak install ./app-bundle.flatpak
                </code>
                <button
                  onClick={() => onSendToTerminal('flatpak install ./app-bundle.flatpak')}
                  className="px-3 py-1 rounded bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white text-xs font-medium flex items-center gap-1"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>تست در ترمینال</span>
                </button>
              </div>
            </div>
          )}

          {localFileType === 'tar' && (
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-amber-500/30 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                  <FolderDown className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">فایل‌های فشرده باینری .tar.gz / .tar.xz (مثل تلگرام یا بلندر)</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    برنامه‌هایی مانند Telegram Desktop به صورت یک فولدر باینری فشرده ارائه می‌شوند.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs text-slate-300">مراحل استخراج و انتقال به دایرکتوری برنامه‌های کاربر:</p>
                <div className="p-3 rounded-lg bg-[#070b12] border border-slate-800 space-y-1.5 font-mono text-xs dir-ltr text-left">
                  <p className="text-slate-400"># ۱. استخراج فایل فشرده</p>
                  <p className="text-amber-300">tar -xvf app.tar.gz</p>
                  <p className="text-slate-400"># ۲. انتقال به پوشه برنامه‌های کاربر محلی و اجرا</p>
                  <p className="text-emerald-400">mkdir -p ~/.local/bin && cp ./app/binary ~/.local/bin/</p>
                  <p className="text-sky-300">~/.local/bin/binary</p>
                </div>
              </div>
            </div>
          )}

          {localFileType === 'script' && (
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-rose-500/30 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400 shrink-0">
                  <FileCode className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">اسکریپت‌های نصاب محلی با پسوند .sh یا .run</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    نصاب‌هایی که شرکت‌ها برای بازی‌ها، درایورها یا متلب و VMware می‌گذارند.
                  </p>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#070b12] border border-slate-800 flex items-center justify-between gap-2">
                <code className="text-xs font-mono text-rose-400 dir-ltr text-left overflow-x-auto select-all">
                  chmod +x installer.sh && sudo ./installer.sh
                </code>
                <button
                  onClick={() => onSendToTerminal('chmod +x installer.sh && ./installer.sh')}
                  className="px-3 py-1 rounded bg-rose-600/30 hover:bg-rose-600 text-rose-300 hover:text-white text-xs font-medium flex items-center gap-1"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>تست در ترمینال</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Content Scenario 2: GitHub URL or Repository */}
      {activeScenario === 'github' && (
        <div className="space-y-5 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <span className="text-xs font-bold text-slate-300">
              آدرس گیت‌هاب شما مربوط به کدام حالت است؟
            </span>
            {/* Subtabs for GitHub */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1.5 sm:pb-0 sm:flex-wrap no-scrollbar">
              <button
                onClick={() => setGithubMode('direct-rpm')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors touch-target flex items-center justify-center ${
                  githubMode === 'direct-rpm'
                    ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                شاهکار DNF: نصب مستقیم آدرس URL پکیج RPM از گیت‌هاب
              </button>
              <button
                onClick={() => setGithubMode('release-asset')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors touch-target flex items-center justify-center ${
                  githubMode === 'release-asset'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                دانلود فایل‌های Release (مانند AppImage یا باینری)
              </button>
              <button
                onClick={() => setGithubMode('git-clone')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors touch-target flex items-center justify-center ${
                  githubMode === 'git-clone'
                    ? 'bg-orange-500/20 text-orange-300 border border-orange-500/40'
                    : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                سورس‌کد مخزن (git clone & build)
              </button>
            </div>
          </div>

          {githubMode === 'direct-rpm' && (
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-violet-500/30 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-violet-500/10 text-violet-400 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">ترفند شگفت‌انگیز DNF در فدورا: نصب مستقیم لینک گیت‌هاب!</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    آیا می‌دانستید در فدورا <strong>هیچ نیازی به دانلود دستی فایل .rpm از صفحه Releases گیت‌هاب نیست؟</strong> شما می‌توانید آدرس مستقیم لینک دانلود فایل .rpm از گیت‌هاب را به دستور dnf بدهید؛ فدورا خودکار آن را دانلود، وابستگی‌هایش را از مخازن چک و مستقیماً نصب می‌کند!
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-semibold text-violet-300">فرمت دستور اجرای مستقیم لینک گیت‌هاب:</span>
                <div className="p-2.5 rounded-lg bg-[#070b12] border border-slate-800 flex items-center justify-between gap-2">
                  <code className="text-xs font-mono text-emerald-400 dir-ltr text-left overflow-x-auto select-all">
                    sudo dnf install https://github.com/fastfetch-cli/fastfetch/releases/download/2.30.1/fastfetch-linux-amd64.rpm -y
                  </code>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleCopy('sudo dnf install https://github.com/fastfetch-cli/fastfetch/releases/download/2.30.1/fastfetch-linux-amd64.rpm -y')}
                      className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                    >
                      {copiedCmd?.includes('fastfetch') ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => onSendToTerminal('sudo dnf install https://github.com/fastfetch-cli/fastfetch/releases/download/2.30.1/fastfetch-linux-amd64.rpm -y')}
                      className="p-1.5 rounded bg-violet-600/30 hover:bg-violet-600 text-violet-300 hover:text-white"
                      title="تست در شبیه‌ساز"
                    >
                      <Terminal className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400">
                  کافی است در صفحه Release پروژه گیت‌هاب، روی فایل با پسوند .rpm راست‌کلیک کرده و <strong>Copy Link Address</strong> را بزنید و جلوی <code className="text-slate-300">sudo dnf install</code> قرار دهید.
                </p>
              </div>
            </div>
          )}

          {githubMode === 'release-asset' && (
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-cyan-500/30 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 shrink-0">
                  <Download className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">دانلود و اجرای مستقیم فایل‌های باینری / AppImage از لینک Releases گیت‌هاب</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    وقتی آدرس مستقیم فایل AppImage یا اسکریپت در بخش Releases گیت‌هاب را دارید، با ابزار <code className="text-cyan-300">curl</code> یا <code className="text-cyan-300">wget</code> با یک خط آن را بگیرید و اجرا کنید:
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#070b12] border border-slate-800 space-y-2 font-mono text-xs dir-ltr text-left">
                <p className="text-slate-400"># ۱. دانلود با پرچم L برای دنبال کردن خودکار ریدایرکت‌های گیت‌هاب</p>
                <p className="text-cyan-400">curl -LO https://github.com/user/repo/releases/download/v1.0/app.AppImage</p>
                <p className="text-slate-400"># ۲. اعطای مجوز و اجرای فوری</p>
                <p className="text-emerald-400">chmod +x app.AppImage && ./app.AppImage</p>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>یا با استفاده از خط فرمان رسمی GitHub CLI در فدورا: <code className="text-violet-300">gh release download --repo user/repo</code></span>
                <button
                  onClick={() => onSendToTerminal('curl -LO https://github.com/user/repo/releases/download/v1.0/app.AppImage && chmod +x app.AppImage')}
                  className="px-2.5 py-1 rounded bg-cyan-600/30 hover:bg-cyan-600 text-cyan-200 text-[11px] font-semibold"
                >
                  ارسال به شبیه‌ساز
                </button>
              </div>
            </div>
          )}

          {githubMode === 'git-clone' && (
            <div className="p-5 rounded-2xl bg-slate-950/70 border border-orange-500/30 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 shrink-0">
                  <GitBranch className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">آدرس سورس‌کد مخزن در گیت‌هاب (git clone و بیلد در فدورا)</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    اگر آدرس صفحه اصلی پروژه مانند <code className="text-orange-300">https://github.com/owner/repository</code> را دارید، مراحل به ترتیب زیر است:
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-[#070b12] border border-slate-800 space-y-2 font-mono text-xs dir-ltr text-left">
                  <p className="text-slate-400"># مرحله ۱: کلون مخزن به سیستم فدورا</p>
                  <p className="text-orange-300">git clone https://github.com/owner/project-repo.git && cd project-repo</p>
                  
                  <p className="text-slate-400"># مرحله ۲: کامپایل بر اساس سیستم پروژه (مثال CMake):</p>
                  <p className="text-emerald-400">mkdir build && cd build && cmake .. && make -j$(nproc)</p>
                  
                  <p className="text-slate-400"># مرحله ۳: نصب باینری در فدورا</p>
                  <p className="text-sky-300">sudo make install</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                  <span>اگر پروژه با زبان‌های مدرن دیگر نوشته شده باشد:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-amber-300">Rust: cargo install --path .</span>
                    <span className="text-slate-600">|</span>
                    <span className="font-mono text-cyan-300">Go: go build</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
};
