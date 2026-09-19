import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Play, Trash2, Copy, Check, Sparkles, CornerDownLeft } from 'lucide-react';

interface TerminalSimulatorProps {
  initialCommand?: string;
}

interface CommandHistoryItem {
  id: string;
  command: string;
  output: string | React.ReactNode;
  isError?: boolean;
}

export const TerminalSimulator: React.FC<TerminalSimulatorProps> = ({ initialCommand }) => {
  const [inputVal, setInputVal] = useState<string>('');
  const [history, setHistory] = useState<CommandHistoryItem[]>([
    {
      id: 'welcome',
      command: 'fastfetch',
      output: (
        <div className="flex flex-col sm:flex-row gap-4 py-1">
          <pre className="text-blue-400 font-mono text-[11px] leading-tight select-none">
{`             .',;::::;,'.
         .';:cccccccccccc:;'.
      .';cccccccccccccccccccc:;.
    .:cccccccccccccccccccccccccc:.
  .:ccccccccccccc;.:cccccccccccccc:.
 .:ccccccccccccc;   ;cccccccccccccc:.
 :ccccccccccccc;     ;cccccccccccccc:
;ccccccccccccc;   .   ;cccccccccccccc;
;cccccccccccc;   :c;   ;ccccccccccccc;
:cccccccccccc.  .ccc.   :cccccccccccc:
:cccccccccccc.  .ccc.   :cccccccccccc:
;cccccccccccc;   :c;   ;ccccccccccccc;
;ccccccccccccc;   '   ;cccccccccccccc;
 :ccccccccccccc;     ;cccccccccccccc:
 .:ccccccccccccc;   ;cccccccccccccc:.
  .:ccccccccccccc;.:cccccccccccccc:.
    .:cccccccccccccccccccccccccc:.
      .';cccccccccccccccccccc:;'.
         .';:cccccccccccc:;'.
             .',;::::;,'.`}
          </pre>
          <div className="space-y-0.5 text-[11px] text-slate-300 font-mono">
            <p className="text-blue-400 font-bold">user@fedora</p>
            <p className="text-slate-500">-----------</p>
            <p><span className="text-blue-300 font-semibold">OS:</span> Fedora Linux 41 (Workstation Edition) x86_64</p>
            <p><span className="text-blue-300 font-semibold">Kernel:</span> 6.11.4-301.fc41.x86_64</p>
            <p><span className="text-blue-300 font-semibold">Uptime:</span> 3 hours, 42 mins</p>
            <p><span className="text-blue-300 font-semibold">Packages:</span> 1942 (rpm), 18 (flatpak)</p>
            <p><span className="text-blue-300 font-semibold">Shell:</span> bash 5.2.32</p>
            <p><span className="text-blue-300 font-semibold">DE:</span> GNOME 47.0 (Wayland)</p>
            <p><span className="text-blue-300 font-semibold">Package Managers:</span> DNF5, Flatpak</p>
            <p className="mt-2 text-emerald-400">شبیه‌ساز ترمینال آماده است. دستورات DNF یا Flatpak را تایپ یا تست کنید.</p>
          </div>
        </div>
      )
    }
  ]);

  const [commandListHistory, setCommandListHistory] = useState<string[]>(['fastfetch']);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [copied, setCopied] = useState<boolean>(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto execute if initialCommand is passed
  useEffect(() => {
    if (initialCommand) {
      handleExecuteCommand(initialCommand);
    }
  }, [initialCommand]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleExecuteCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    setCommandListHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const cmdLower = trimmed.toLowerCase();

    // Command handling logic
    let outputContent: React.ReactNode = '';
    let isError = false;

    if (cmdLower === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    } else if (cmdLower === 'help') {
      outputContent = (
        <div className="space-y-1 text-slate-300 text-xs">
          <p className="text-blue-400 font-bold">دستورات پشتیبانی شده در شبیه‌ساز فدورا:</p>
          <p><span className="text-emerald-400 font-mono">dnf / dnf5</span>: مدیریت پکیج‌های رسمی فدورا (install, search, info, remove, upgrade, history)</p>
          <p><span className="text-emerald-400 font-mono">flatpak</span>: مدیریت پکیج‌های فلت‌پک (install, search, list, run, update, remote-add)</p>
          <p><span className="text-emerald-400 font-mono">rpm</span>: بررسی پکیج‌های RPM محلی</p>
          <p><span className="text-emerald-400 font-mono">chmod +x / ./app.AppImage</span>: اجرای برنامه‌های پرتابل AppImage</p>
          <p><span className="text-emerald-400 font-mono">fastfetch / neofetch</span>: نمایش اطلاعات سیستم‌عامل و سخت‌افزار</p>
          <p><span className="text-emerald-400 font-mono">cat /etc/os-release</span>: مشاهده اطلاعات توزیع فدورا</p>
          <p><span className="text-emerald-400 font-mono">clear</span>: پاک کردن صفحه ترمینال</p>
        </div>
      );
    } else if (cmdLower.includes('os-release')) {
      outputContent = (
        <pre className="text-slate-300 text-xs font-mono">
{`NAME="Fedora Linux"
VERSION="41 (Workstation Edition)"
ID=fedora
VERSION_ID=41
PLATFORM_ID="platform:f41"
PRETTY_NAME="Fedora Linux 41 (Workstation Edition)"
ANSI_COLOR="0;38;2;60;110;180"
LOGO=fedora-logo-icon
CPE_NAME="cpe:/o:fedoraproject:fedora:41"
HOME_URL="https://fedoraproject.org/"
DOCUMENTATION_URL="https://docs.fedoraproject.org/en-US/fedora/f41/"`}
        </pre>
      );
    } else if (cmdLower.startsWith('dnf search') || cmdLower.startsWith('dnf5 search')) {
      const query = trimmed.split(' ').slice(2).join(' ') || 'app';
      outputContent = (
        <pre className="text-slate-300 text-xs font-mono">
{`Updating and loading repositories:
Fedora 41 - x86_64                                100% |  28 kB/s | 4.8 kB |  00m00s
Fedora 41 - Updates                               100% |  32 kB/s | 6.1 kB |  00m00s
========================= Matched: ${query} =========================
${query}.x86_64 : Official package for ${query} on Fedora 41
${query}-libs.x86_64 : Shared libraries required by ${query}
${query}-devel.x86_64 : Header files and libraries for development`}
        </pre>
      );
    } else if (cmdLower.includes('dnf history') || cmdLower.includes('dnf5 history')) {
      outputContent = (
        <pre className="text-slate-300 text-xs font-mono">
{`ID     | Command line                 | Date and time    | Action(s)      | Altered
-------------------------------------------------------------------------------
    14 | install vlc -y               | 2026-09-19 14:10 | Install        |    3   
    13 | groupupdate multimedia       | 2026-09-18 19:42 | Upgrade        |   12   
    12 | copr enable agriffis/neovim  | 2026-09-17 11:20 | Config         |    1   
    11 | install ./google-chrome.rpm  | 2026-09-15 08:35 | Install        |    1   
    10 | upgrade                      | 2026-09-12 10:15 | Upgrade        |   45 EE

Tip: برای بازگردانی هر تراکنش از دستور: sudo dnf history undo <ID> استفاده کنید.`}
        </pre>
      );
    } else if (cmdLower.includes('dnf install') || cmdLower.includes('dnf5 install')) {
      const isLocalRpm = cmdLower.includes('.rpm');
      outputContent = (
        <div className="text-xs font-mono space-y-1 text-slate-300">
          <p className="text-yellow-400">Updating and loading repositories...</p>
          <p>Package architecture: x86_64 (Fedora 41)</p>
          <p className="text-sky-300">Resolving dependencies...</p>
          <p>Transaction Summary:</p>
          <p className="text-emerald-400"> Installing: {isLocalRpm ? 'Local Package from command line' : 'Matched Package from Fedora Official Repo'}</p>
          <p> Installing Dependencies: [libgstreamer, libvpx, ffmpeg-libs, mesa-dri-drivers]</p>
          <p>Downloading Packages (12.4 MB total)...</p>
          <p className="text-blue-400">[1/3] Downloading core binary... 100% [====================]</p>
          <p className="text-blue-400">[2/3] Checking GPG signature of package... OK</p>
          <p className="text-blue-400">[3/3] Running transaction test and installing...</p>
          <p className="text-emerald-400 font-bold mt-2">Complete! پکیج با موفقیت در فدورا نصب شد و از منوی دسکتاپ قابل اجراست.</p>
        </div>
      );
    } else if (cmdLower.startsWith('flatpak search')) {
      const query = trimmed.split(' ').slice(2).join(' ') || 'app';
      outputContent = (
        <pre className="text-slate-300 text-xs font-mono">
{`Name             Description                                 Application ID           Version    Branch    Remotes
${query}          Modern desktop application for Fedora       org.${query}.Client      1.8.4      stable    flathub
${query}-plugin   Additional plugins and extensions           org.${query}.Plugin      1.2.0      stable    flathub`}
        </pre>
      );
    } else if (cmdLower.startsWith('flatpak install')) {
      outputContent = (
        <div className="text-xs font-mono space-y-1 text-slate-300">
          <p className="text-sky-300">Looking for matches in remote 'flathub'...</p>
          <p>Required runtime for Application (runtime/org.freedesktop.Platform/x86_64/24.08) found.</p>
          <p className="text-yellow-400">Do you want to install it? [Y/n]: Y</p>
          <p className="text-blue-400">[1/2] Installing org.freedesktop.Platform runtime: 100% [====================]</p>
          <p className="text-blue-400">[2/2] Installing Sandboxed Application: 100% [====================]</p>
          <p className="text-emerald-400 font-bold mt-2">Installation complete. برنامه در محیط امن سندباکس نصب شد.</p>
          <p className="text-slate-400">برای اجرای این برنامه بنویسید: flatpak run &lt;Application-ID&gt;</p>
        </div>
      );
    } else if (cmdLower.startsWith('flatpak list')) {
      outputContent = (
        <pre className="text-slate-300 text-xs font-mono">
{`Name               Application ID                  Version    Branch    Origin    Installation
Spotify            com.spotify.Client              1.2.31     stable    flathub   user
Discord            com.discordapp.Discord          0.0.60     stable    flathub   user
Flatseal           com.github.tchx84.Flatseal      2.2.0      stable    flathub   user
Freedesktop SDK    org.freedesktop.Platform        24.08      24.08     flathub   user`}
        </pre>
      );
    } else if (cmdLower.startsWith('rpm -i')) {
      outputContent = (
        <div className="text-xs font-mono space-y-1.5 p-2 rounded bg-amber-950/40 border border-amber-500/40 text-amber-200">
          <p className="font-bold text-amber-300">⚠️ هشدار مهم سیستم مدیریت بسته فدورا:</p>
          <p>دستور rpm -i توانایی حل و دانلود خودکار وابستگی‌ها (Missing Dependencies) را ندارد!</p>
          <p className="text-white">روش اصولی و پیشنهادی در فدورا:</p>
          <p className="text-emerald-400 font-bold">sudo dnf install ./{trimmed.split(' ').slice(2).join(' ') || 'file.rpm'}</p>
        </div>
      );
    } else if (cmdLower.includes('chmod +x') || cmdLower.endsWith('.appimage')) {
      outputContent = (
        <div className="text-xs font-mono space-y-1 text-slate-300">
          <p className="text-emerald-400">Permissions verified: -rwxr-xr-x (Executable flag set)</p>
          <p className="text-sky-300">Mounting AppImage to temporary sandbox /tmp/.mount_app...</p>
          <p className="text-blue-400">Starting application interface...</p>
          <p className="text-emerald-400 font-bold">برنامه پرتابل بدون نیاز به نصب یا دسترسی روت اجرا شد.</p>
        </div>
      );
    } else if (cmdLower.includes('git clone')) {
      outputContent = (
        <div className="text-xs font-mono space-y-1 text-slate-300">
          <p className="text-sky-300">Cloning into repository...</p>
          <p className="text-slate-400">remote: Enumerating objects: 18420, done.</p>
          <p className="text-slate-400">remote: Counting objects: 100% (2314/2314), done.</p>
          <p className="text-slate-400">remote: Compressing objects: 100% (1482/1482), done.</p>
          <p className="text-blue-400">Receiving objects: 100% (18420/18420), 14.82 MiB | 12.4 MiB/s, done.</p>
          <p className="text-slate-400">Resolving deltas: 100% (11200/11200), done.</p>
          <p className="text-emerald-400 font-bold">سورس کد پروژه از گیت‌هاب با موفقیت در سیستم فدورا کلون شد.</p>
          <p className="text-amber-300 text-[11px]">گام بعدی: cd repository && mkdir build && cd build && cmake .. && make</p>
        </div>
      );
    } else if (cmdLower.includes('curl') || cmdLower.includes('wget')) {
      outputContent = (
        <div className="text-xs font-mono space-y-1 text-slate-300">
          <p className="text-sky-300">Connecting to server and following HTTP redirects (-L)...</p>
          <p className="text-slate-400">HTTP/2 302 Found -&gt; assets from githubusercontent.com</p>
          <p className="text-slate-400">HTTP/2 200 OK (Content-Length: 48.2 MB)</p>
          <p className="text-blue-400">Downloading asset: 100% [====================] 48.2 MB (15.2 MB/s)</p>
          <p className="text-emerald-400 font-bold">فایل باینری ریلیز گیت‌هاب با موفقیت در پوشه ذخیره شد.</p>
        </div>
      );
    } else if (cmdLower.startsWith('tar')) {
      outputContent = (
        <div className="text-xs font-mono space-y-1 text-slate-300">
          <p className="text-sky-300">Extracting tarball archive...</p>
          <p className="text-slate-400">x application-extracted/</p>
          <p className="text-slate-400">x application-extracted/bin/executable</p>
          <p className="text-slate-400">x application-extracted/share/icons/</p>
          <p className="text-emerald-400 font-bold">آرشیو فشرده با موفقیت استخراج شد. فایل باینری آماده اجرا در ~/.local/bin می‌باشد.</p>
        </div>
      );
    } else if (cmdLower.startsWith('ls') || cmdLower.includes('downloads')) {
      outputContent = (
        <pre className="text-slate-300 text-xs font-mono">
{`-rw-r--r--. 1 user user 106M Sep 19 14:00 google-chrome.rpm
-rwxr-xr-x. 1 user user 234M Sep 19 14:05 Krita.AppImage
-rw-r--r--. 1 user user  48M Sep 19 14:10 telegram.tar.gz
-rw-r--r--. 1 user user  82M Sep 19 14:15 app-bundle.flatpak`}
        </pre>
      );
    } else if (cmdLower.includes('cmake') || cmdLower.includes('make')) {
      outputContent = (
        <div className="text-xs font-mono space-y-1 text-slate-300">
          <p className="text-sky-300">-- The C/C++ compiler identification is GNU 14.2.1</p>
          <p className="text-slate-400">-- Detecting CXX compile features - done</p>
          <p className="text-slate-400">-- Configuring done. Generating build system...</p>
          <p className="text-blue-400">[ 33%] Building CXX object src/core.cpp.o</p>
          <p className="text-blue-400">[ 66%] Building CXX object src/ui.cpp.o</p>
          <p className="text-blue-400">[100%] Linking CXX executable binary</p>
          <p className="text-emerald-400 font-bold">کامپایل سورس کد با موفقیت در فدورا به پایان رسید!</p>
        </div>
      );
    } else if (cmdLower.includes('copr enable')) {
      outputContent = (
        <div className="text-xs font-mono space-y-1 text-slate-300">
          <p className="text-yellow-400">Enabling a Copr repository from copr.fedorainfracloud.org...</p>
          <p>Note: Packages in Copr are community builds and not officially maintained by Fedora.</p>
          <p className="text-emerald-400 font-bold">Repository successfully enabled! اکنون می‌توانید با sudo dnf install پکیج را نصب کنید.</p>
        </div>
      );
    } else if (cmdLower.includes('distro-sync')) {
      outputContent = (
        <div className="text-xs font-mono space-y-1 text-slate-300">
          <p className="text-yellow-400">Synchronizing installed packages to levels of current repositories...</p>
          <p className="text-sky-300">Resolving dependencies with --allowerasing enabled...</p>
          <p className="text-blue-400">Analyzing 1942 packages across [fedora, updates, rpmfusion-free, rpmfusion-nonfree]...</p>
          <p className="text-emerald-400 font-bold">Complete! تمامی پکیج‌های سیستم با آخرین نسخه‌های پایدار مخازن همگام و بسته‌های متضاد ترمیم شدند.</p>
        </div>
      );
    } else if (cmdLower.includes('swap ffmpeg-free') || cmdLower.includes('swap ffmpeg')) {
      outputContent = (
        <div className="text-xs font-mono space-y-1 text-slate-300">
          <p className="text-sky-300">Swapping ffmpeg-free package with full multimedia ffmpeg...</p>
          <p className="text-yellow-400">Removing conflicting package: ffmpeg-free-6.1.1-4.fc41.x86_64</p>
          <p className="text-blue-400">Installing: ffmpeg-6.1.1-14.fc41.x86_64 from rpmfusion-free</p>
          <p className="text-emerald-400 font-bold">Complete! جایگزینی بدون تداخل پایان یافت. اکنون تمام کدک‌های ویدئویی H.264/H.265 فعال هستند.</p>
        </div>
      );
    } else if (cmdLower.includes('rpm --import')) {
      outputContent = (
        <div className="text-xs font-mono space-y-1 text-slate-300">
          <p className="text-sky-300">Importing GPG public key into RPM keyring (/var/lib/rpm)...</p>
          <p className="text-blue-400">Verifying RSA/SHA256 signature finger-print... [VALID]</p>
          <p className="text-emerald-400 font-bold">کلید امنیتی GPG با موفقیت ثبت شد. خطای GPG check FAILED برطرف شد.</p>
        </div>
      );
    } else if (cmdLower.includes('packagekit') || cmdLower.includes('killall -9')) {
      outputContent = (
        <div className="text-xs font-mono space-y-1 text-slate-300">
          <p className="text-yellow-400">Terminating background PackageKit update process (PID 4512)...</p>
          <p className="text-sky-300">Releasing locks on /var/lib/dnf and /var/lib/rpm/rpmdb.sqlite...</p>
          <p className="text-emerald-400 font-bold">قفل دیتابیس DNF با موفقیت آزاد شد. اکنون می‌توانید دستورات dnf را اجرا کنید.</p>
        </div>
      );
    } else if (cmdLower.includes('rebuilddb')) {
      outputContent = (
        <div className="text-xs font-mono space-y-1 text-slate-300">
          <p className="text-sky-300">Rebuilding corrupt /var/lib/rpm SQLite database...</p>
          <p className="text-slate-400">Checking headers and B-Tree indexes... [OK]</p>
          <p className="text-emerald-400 font-bold">بازسازی دیتابیس بسته‌ها با موفقیت انجام شد. تمامی خطاهای rpmdb رفع گردید.</p>
        </div>
      );
    } else if (cmdLower.includes('clean all') || cmdLower.includes('makecache')) {
      outputContent = (
        <div className="text-xs font-mono space-y-1 text-slate-300">
          <p className="text-yellow-400">Cleaning metadata cache: 38 files removed (142 MB)</p>
          <p className="text-sky-300">Refreshing repositories [fedora, updates, rpmfusion]...</p>
          <p className="text-emerald-400 font-bold">کش متادیتا با موفقیت پاکسازی و تازه شد. خطاهای تایم‌اوت آینه‌ها برطرف گردید.</p>
        </div>
      );
    } else if (cmdLower.includes('fuse-libs') || cmdLower.includes('fuse2')) {
      outputContent = (
        <div className="text-xs font-mono space-y-1 text-slate-300">
          <p className="text-sky-300">Resolving dependencies for fuse-libs.x86_64...</p>
          <p className="text-blue-400">Installing: fuse-libs-2.9.9-19.fc41.x86_64 (Provides: libfuse.so.2)</p>
          <p className="text-emerald-400 font-bold">کتابخانه FUSE با موفقیت نصب شد. اکنون فایل‌های AppImage بدون خطا باز می‌شوند.</p>
        </div>
      );
    } else if (cmdLower.includes('akmods')) {
      outputContent = (
        <div className="text-xs font-mono space-y-1 text-slate-300">
          <p className="text-yellow-400">Checking kernel modules for 6.11.4-301.fc41.x86_64...</p>
          <p className="text-sky-300">Rebuilding nvidia-kmod with gcc 14.2.1: [  OK  ]</p>
          <p className="text-blue-400">Updating initramfs image with dracut: [  OK  ]</p>
          <p className="text-emerald-400 font-bold">ماژول گرافیک اختصاصی انویدیا بازسازی شد و پس از ریستارت سیستم فعال می‌شود.</p>
        </div>
      );
    } else if (cmdLower.includes('unsatisfied')) {
      outputContent = (
        <div className="text-xs font-mono space-y-1 text-slate-300">
          <p className="text-sky-300">Querying RPM database for broken or missing dependencies...</p>
          <p className="text-emerald-400 font-bold">تبریک! هیچ وابستگی ارضانشده یا پکیج شکسته‌ای در سیستم فدورا وجود ندارد.</p>
        </div>
      );
    } else if (cmdLower === 'fastfetch' || cmdLower === 'neofetch') {
      outputContent = (
        <pre className="text-blue-400 font-mono text-xs leading-tight">
{`Fedora Linux 41 Workstation x86_64
Kernel: 6.11.4-301.fc41.x86_64
Packages: 1942 (rpm), 18 (flatpak)
Shell: bash 5.2.32
DE: GNOME 47.0`}
        </pre>
      );
    } else {
      outputContent = (
        <div className="text-xs font-mono space-y-1 text-slate-300">
          <p className="text-slate-400">[Executing: {trimmed}]</p>
          <p className="text-emerald-400">دستور با موفقیت در محیط فدورا شبیه‌سازی شد (exit code 0).</p>
          <p className="text-slate-500 text-[11px]">برای مشاهده دستورات خاص راهنمایی help را تایپ کنید.</p>
        </div>
      );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        command: trimmed,
        output: outputContent,
        isError
      }
    ]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleExecuteCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandListHistory.length > 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandListHistory.length) {
          setHistoryIndex(nextIdx);
          setInputVal(commandListHistory[commandListHistory.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandListHistory[commandListHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  const quickSamples = [
    { label: '📁 ۱. فایل محلی: نصب .rpm با DNF', cmd: 'sudo dnf install ./google-chrome.rpm -y' },
    { label: '🚀 ۱. فایل محلی: اجرای AppImage', cmd: 'chmod +x ./Krita.AppImage && ./Krita.AppImage' },
    { label: '🌐 ۲. گیت‌هاب: نصب مستقیم لینک RPM', cmd: 'sudo dnf install https://github.com/fastfetch-cli/fastfetch/releases/download/2.30.1/fastfetch-linux-amd64.rpm -y' },
    { label: '⚡ ۲. گیت‌هاب: کلون ریپازیتوری', cmd: 'git clone https://github.com/fastfetch-cli/fastfetch.git' },
    { label: 'نصب VLC با DNF', cmd: 'sudo dnf install vlc -y' },
    { label: 'نصب فلت‌پک Flathub', cmd: 'flatpak install flathub com.spotify.Client -y' },
    { label: 'مشاهده مشخصات فدورا', cmd: 'fastfetch' }
  ];

  return (
    <div id="terminal-simulator-container" className="rounded-2xl border border-slate-800 bg-[#090d16] overflow-hidden shadow-2xl flex flex-col h-[480px] sm:h-[580px]">
      {/* Top OS Window Title Bar */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block hover:opacity-100 cursor-pointer" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block hover:opacity-100 cursor-pointer" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block hover:opacity-100 cursor-pointer" />
          </div>
          <span className="text-slate-400 font-mono text-[11px] mr-1 sm:mr-2 truncate">
            user@fedora: ~ (Bash)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setHistory([])}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors touch-target flex items-center justify-center"
            title="پاکسازی ترمینال"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Command Launcher Chips */}
      <div className="px-4 py-2 bg-slate-900/50 border-b border-slate-800/60 flex items-center gap-2 overflow-x-auto text-[11px] no-scrollbar">
        <span className="text-slate-400 shrink-0 flex items-center gap-1 font-sans">
          <Sparkles className="w-3 h-3 text-blue-400" />
          <span>تست سریع:</span>
        </span>
        {quickSamples.map((item, idx) => (
          <button
            key={idx}
            onClick={() => handleExecuteCommand(item.cmd)}
            className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-blue-600 hover:text-white text-slate-300 font-mono text-[11px] whitespace-nowrap transition-all border border-slate-700/60"
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Terminal Output Area */}
      <div 
        onClick={() => inputRef.current?.focus()}
        className="flex-1 p-4 overflow-y-auto font-mono text-xs dir-ltr text-left space-y-4 select-text bg-[#070a10]"
      >
        {history.map((item) => (
          <div key={item.id} className="space-y-1">
            <div className="flex items-center gap-2 text-slate-200">
              <span className="text-emerald-400 font-semibold">[user@fedora ~]$</span>
              <span className="text-sky-300 font-bold">{item.command}</span>
            </div>
            <div className="text-slate-300">{item.output}</div>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Input Line */}
      <div className="p-2.5 sm:p-3 bg-slate-950 border-t border-slate-800/90 flex items-center gap-2 dir-ltr">
        <span className="text-emerald-400 font-mono font-semibold text-xs shrink-0">[user@fedora ~]$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="تایپ دستور (مثال: sudo dnf install vlc)..."
          className="flex-1 bg-transparent font-mono text-xs text-sky-200 focus:outline-none placeholder:text-slate-600 min-w-0"
        />
        <button
          onClick={() => handleExecuteCommand(inputVal)}
          disabled={!inputVal.trim()}
          className="px-3 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-30 text-white rounded-lg text-xs flex items-center gap-1.5 transition-colors touch-target shrink-0 font-medium"
        >
          <CornerDownLeft className="w-4 h-4" />
          <span className="hidden sm:inline">اجرا</span>
        </button>
      </div>
    </div>
  );
};
