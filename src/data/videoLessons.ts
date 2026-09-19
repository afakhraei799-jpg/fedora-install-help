import { VideoLesson } from '../types';

export const VIDEO_LESSONS: VideoLesson[] = [
  {
    id: 'lesson-post-install',
    titleFa: 'درس ۰: کارهای ضروری و حیاتی بلافاصله پس از نصب فدورا',
    tool: 'postinstall',
    scenarioId: 'post-install-guide',
    totalDurationSec: 135,
    videoPosterColor: 'from-amber-600/30 to-slate-950',
    overviewFa: 'آموزش گام‌به‌گام اقدامات حیاتی پس از نصب فدورا: چندبرابر کردن سرعت دانلود DNF، فعال‌سازی RPM Fusion، نصب کدک‌های کامل صوتی و تصویری، Flathub و شخصی‌سازی.',
    chapters: [
      {
        id: 'pi1',
        timeSec: 0,
        labelFa: 'مثال ۱: افزایش ۵ برابری سرعت دانلود DNF',
        narrationTextFa: 'بلافاصله پس از نصب فدورا، مهم‌ترین کار افزایش سرعت دانلود بسته‌ها است. با افزودن تنظیمات دانلود ۱۰ رشته‌ای همزمان و انتخاب خودکار سریع‌ترین سرور آینه، سرعت آپدیت‌ها و نصب برنامه‌ها چندین برابر می‌شود.',
        activeTerminalCommand: 'echo -e "max_parallel_downloads=10\\nfastestmirror=True\\ndefaultyes=True" | sudo tee -a /etc/dnf/dnf.conf',
        simulatedOutput: `max_parallel_downloads=10
fastestmirror=True
defaultyes=True
[OK] DNF configuration updated. Parallel downloads & fastest mirror active.`,
        badgeText: 'اقدام اول: سرعت دانلود',
        highlightCard: {
          title: 'افزایش چشمگیر سرعت',
          description: 'تنظیم max_parallel_downloads=10 باعث می‌شود DNF به جای دانلود تک‌به‌تک پکیج‌ها، ۱۰ پکیج را همزمان دانلود کند.',
          type: 'success'
        }
      },
      {
        id: 'pi2',
        timeSec: 45,
        labelFa: 'مثال ۲: فعال‌سازی مخازن RPM Fusion و کدک‌های چندرسانه‌ای',
        narrationTextFa: 'برای اینکه مرورگر فایرفاکس و ویدیوپلیرها بتوانند ویدیوهای MP4، H.264، یوتیوب و موزیک‌های AAC را پخش کنند، مخازن RPM Fusion را ثبت کرده و FFmpeg کامل را جایگزین نسخه محدود فدورا می‌کنیم.',
        activeTerminalCommand: 'sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm -y && sudo dnf swap ffmpeg-free ffmpeg --allowerasing -y',
        simulatedOutput: `Installing: rpmfusion-free-release, rpmfusion-nonfree-release
Importing GPG keys: RPM Fusion (Fedora 41)
Swapping ffmpeg-free -> ffmpeg x86_64 (full proprietary codecs)
Complete! All media codecs and hardware video acceleration enabled.`,
        badgeText: 'اقدام دوم: کدک‌ها و ویدیو',
        highlightCard: {
          title: 'حل مشکل صفحه سیاه ویدیوها',
          description: 'دیگر با خطای عدم پشتیبانی از کدک در توییتر، یوتیوب یا فایل‌های فیلم مواجه نخواهید شد.',
          type: 'terminal'
        }
      },
      {
        id: 'pi3',
        timeSec: 90,
        labelFa: 'مثال ۳: فعال‌سازی Flathub کامل و ابزارهای شخصی‌سازی و فونت فارسی',
        narrationTextFa: 'در گام سوم، مخزن جامع Flathub را بدون فیلتر به فلت‌پک اضافه می‌کنیم تا به هزاران نرم‌افزار دسترسی داشته باشیم، سپس ابزار GNOME Tweaks، دکمه‌های پنجره و فونت فارسی وزیرمتن را فعال می‌کنیم.',
        activeTerminalCommand: 'flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo && sudo dnf install gnome-tweaks -y && gsettings set org.gnome.desktop.wm.preferences button-layout ":minimize,maximize,close"',
        simulatedOutput: `Remote 'flathub' added successfully.
Installing: gnome-tweaks, gnome-extensions-app
Button layout updated: Minimize, Maximize, Close buttons active.
System ready for daily and professional use!`,
        badgeText: 'اقدام سوم: Flathub و ظاهر',
        highlightCard: {
          title: 'دسکتاپ کامل و آماده کار',
          description: 'سیستم‌عامل فدورای شما اکنون از نظر سرعت، پخش مالتی‌مدیا، دسترسی به برنامه‌ها و زیبایی دسکتاپ در کامل‌ترین حالت ممکن قرار دارد.',
          type: 'success'
        }
      }
    ]
  },
  {
    id: 'lesson-dnf',
    titleFa: 'درس ۱: مدیریت بسته‌ها با DNF و DNF5 در فدورا',
    tool: 'dnf',
    scenarioId: 'dnf-official',
    totalDurationSec: 120,
    videoPosterColor: 'from-blue-600/30 to-indigo-950',
    overviewFa: 'در این درس ویدیویی با معماری DNF، بازنویسی نسل جدید DNF5 در فدورا ۴۱، دستورات جستجو، نصب باینری و تاریخچه تراکنش‌ها آشنا می‌شوید.',
    chapters: [
      {
        id: 'c1',
        timeSec: 0,
        labelFa: 'مقدمه و معماری DNF در فدورا',
        narrationTextFa: 'به آموزش مدیریت بسته‌ها در لینوکس فدورا خوش آمدید. مدیر بسته DNF مخفف Dandified YUM ابزار هسته‌ای فدورا برای مدیریت پکیج‌های RPM است. در نسخه‌های اخیر فدورا، DNF5 با بازنویسی کامل به زبان C++ سرعتی چندین برابر بالاتر یافته است.',
        badgeText: 'معرفی DNF',
        highlightCard: {
          title: 'مدیر بسته DNF چیست؟',
          description: 'ابزار پیش‌فرض برای دریافت بسته‌های رسمی تایید شده توسط تیم مهندسی ردهت و فدورا با بررسی خودکار امضای دیجیتال GPG.',
          type: 'info'
        }
      },
      {
        id: 'c2',
        timeSec: 25,
        labelFa: 'جستجوی بسته و بررسی اطلاعات',
        narrationTextFa: 'قبل از هر نصب، بسته را با دستور dnf search جستجو می‌کنیم تا نام دقیق و بسته‌های وابسته را پیدا کنیم. سپس با dnf info جزئیات نسخه و حجم پکیج را می‌بینیم.',
        activeTerminalCommand: 'dnf search vlc',
        simulatedOutput: `Updating and loading repositories:
Fedora 41 - x86_64                                100% |  28 kB/s | 4.8 kB |  00m00s
========================= Matched: vlc =========================
vlc.x86_64 : The cross-platform open-source multimedia player
vlc-core.x86_64 : VLC media player core libraries and plugins`,
        badgeText: 'جستجو بدون نیاز به Sudo',
        highlightCard: {
          title: 'نکته مهم',
          description: 'دستورات جستجو (search) و بررسی اطلاعات (info) نیازی به دسترسی مدیر (sudo) ندارند.',
          type: 'terminal'
        }
      },
      {
        id: 'c3',
        timeSec: 50,
        labelFa: 'اجرای دستور نصب و حل وابستگی‌ها',
        narrationTextFa: 'اکنون با دستور sudo dnf install بسته vlc را نصب می‌کنیم. مشاهده می‌کنید که DNF درخت وابستگی‌ها را محاسبه کرده و تمام کتابخانه‌های پیشنیاز را به صورت یک تراکنش امن آماده دانلود می‌کند.',
        activeTerminalCommand: 'sudo dnf install vlc -y',
        simulatedOutput: `Resolving dependencies:
Installing:
 vlc                               x86_64   3.0.21-4.fc41       fedora        1.8 M
Installing dependencies:
 vlc-core                          x86_64   3.0.21-4.fc41       fedora        9.2 M
Downloading Packages...
[1/2] vlc.rpm                    100% [====================] 1.8 MB
[2/2] vlc-core.rpm               100% [====================] 9.2 MB
Running transaction check...
Running transaction test...
Complete!`,
        badgeText: 'تراکنش امن DNF',
        highlightCard: {
          title: 'موفقیت‌آمیز',
          description: 'نرم‌افزار با تمام کتابخانه‌ها بدون خطای Missing Dependency روی سیستم‌عامل نصب شد.',
          type: 'success'
        }
      },
      {
        id: 'c4',
        timeSec: 85,
        labelFa: 'قابلیت بی‌نظیر: تاریخچه و بازگردانی (Undo)',
        narrationTextFa: 'یکی از شگفت‌انگیزترین قابلیت‌های DNF، تاریخچه تراکنش‌ها است. با دستور dnf history می‌توانید فهرست تغییرات را ببینید و اگر پکیجی اشتباهی نصب شد، با dnf history undo کل عملیات را دقیقاً مثل روز اول لغو کنید.',
        activeTerminalCommand: 'dnf history',
        simulatedOutput: `ID     | Command line                 | Date and time    | Action(s)      | Altered
-------------------------------------------------------------------------------
    12 | install vlc -y               | 2026-09-19 14:02 | Install        |    3   
    11 | upgrade                      | 2026-09-18 10:15 | Upgrade        |   45 EE
    10 | install git htop             | 2026-09-15 16:30 | Install        |    2`,
        badgeText: 'مدیریت حرفه‌ای سابقه',
        highlightCard: {
          title: 'دستور نجات‌بخش undo',
          description: 'برای برگرداندن تراکنش شماره ۱۲ کافی است بنویسید: sudo dnf history undo 12',
          type: 'info'
        }
      },
      {
        id: 'c5',
        timeSec: 105,
        labelFa: 'بررسی نسخه و اتمام آموزش',
        narrationTextFa: 'برای اطمینان از سلامت نصب، دستور vlc --version را اجرا می‌کنیم. بسته آماده اجراست و آیکون آن نیز به منوی دسکتاپ اضافه شده است.',
        activeTerminalCommand: 'vlc --version',
        simulatedOutput: `VLC media player 3.0.21 Vetinari (revision 3.0.21-0-gdd7a900e47)
VLC version 3.0.21 Vetinari (3.0.21-0-gdd7a900e47)
Compiled by mockbuild on buildvm-x86-06.iad2.fedoraproject.org`,
        badgeText: 'تایید نهایی',
        highlightCard: {
          title: 'پایان درس ۱',
          description: 'شما اصول اساسی کار با DNF را آموختید. در درس بعدی به سراغ دنیای سندباکس و Flatpak خواهیم رفت.',
          type: 'success'
        }
      }
    ]
  },
  {
    id: 'lesson-flatpak',
    titleFa: 'درس ۲: انقلابی در پکیج‌های دسکتاپ با Flatpak و Flathub',
    tool: 'flatpak',
    scenarioId: 'flatpak-flathub',
    totalDurationSec: 110,
    videoPosterColor: 'from-emerald-600/30 to-teal-950',
    overviewFa: 'یادگیری معماری سندباکس فلت‌پک، اضافه کردن مخزن عظیم Flathub، نصب برنامه‌هایی چون Spotify و Discord و تنظیم دسترسی‌ها با Flatseal.',
    chapters: [
      {
        id: 'f1',
        timeSec: 0,
        labelFa: 'چرا فلت‌پک آینده لینوکس است؟',
        narrationTextFa: 'فلت‌پک یا Flatpak روش مدرن توزیع نرم‌افزار برای لینوکس است. برخلاف DNF که نرم‌افزار مستقیماً در فولدرهای ریشه سیستم قرار می‌گیرد، فلت‌پک نرم‌افزارها را در یک محیط ایزوله یا Sandbox اجرا می‌کند تا هیچ آسیبی به پایداری سیستم نزنند.',
        badgeText: 'مفهوم Sandbox',
        highlightCard: {
          title: 'مزیت ایزوله‌سازی',
          description: 'اگر برنامه‌ای کرش کند یا آسیب‌پذیری داشته باشد، دسترسی به اطلاعات شخصی و فایل‌های ریشه سیستم نخواهد داشت.',
          type: 'info'
        }
      },
      {
        id: 'f2',
        timeSec: 25,
        labelFa: 'افزودن مخزن رسمی Flathub',
        narrationTextFa: 'فدورا به شکل پیش‌فرض از فلت‌پک پشتیبانی می‌کند، اما مخزن جهانی Flathub شامل هزاران نرم‌افزار تجاری و محبوب را باید با این دستور اضافه کنیم.',
        activeTerminalCommand: 'flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo',
        simulatedOutput: `Adding remote 'flathub' from https://dl.flathub.org/repo/flathub.flatpakrepo...
Verifying GPG signatures...
Remote 'flathub' added successfully and ready to use!`,
        badgeText: 'مخزن جهانی',
        highlightCard: {
          title: 'فقط یک‌بار برای همیشه',
          description: 'پس از اجرای این دستور، مخزن فلت‌هاب فعال می‌ماند و حتی در GNOME Software نیز نمایان می‌شود.',
          type: 'success'
        }
      },
      {
        id: 'f3',
        timeSec: 50,
        labelFa: 'جستجو و نصب نرم‌افزار (مثال: اسپاتیفای)',
        narrationTextFa: 'اکنون با یک دستور ساده پکیج Spotify را از فلت‌هاب نصب می‌کنیم. توجه کنید که این دستور نیازی به sudo ندارد و محیط تم دسکتاپ شما کاملاً حفظ می‌شود.',
        activeTerminalCommand: 'flatpak install flathub com.spotify.Client -y',
        simulatedOutput: `Looking for matches…
Installing com.spotify.Client/x86_64/stable from flathub...
Downloading org.freedesktop.Platform runtime layer: 210 MB
Downloading com.spotify.Client: 48 MB
Installing desktop launcher and mime icons...
Installation complete.`,
        badgeText: 'نصب بدون روت',
        highlightCard: {
          title: 'نکته حرفه‌ای',
          description: 'همیشه دستورات flatpak را بدون sudo اجرا کنید تا تم تاریک/روشن و تنظیمات شخصی شما بدون نقص لود شوند.',
          type: 'warning'
        }
      },
      {
        id: 'f4',
        timeSec: 80,
        labelFa: 'مدیریت دسترسی‌ها با ابزار فوق‌العاده Flatseal',
        narrationTextFa: 'برنامه‌های فلت‌پک در سندباکس هستند، اما اگر خواستید به برنامه‌ای اجازه دسترسی به پوشه خاص یا میکروفن بدهید، نرم‌افزار Flatseal بهترین دستیار شماست.',
        activeTerminalCommand: 'flatpak install flathub com.github.tchx84.Flatseal -y',
        simulatedOutput: `Looking for matches…
Installing com.github.tchx84.Flatseal/x86_64/stable from flathub...
Installation complete. Launch Flatseal to inspect permissions!`,
        badgeText: 'حفظ حریم خصوصی',
        highlightCard: {
          title: 'Flatseal چیست؟',
          description: 'یک پنل گرافیکی برای روشن یا خاموش کردن دسترسی برنامه‌ها به دوربین، میکروفون، شبکه و فایل‌ها.',
          type: 'info'
        }
      }
    ]
  },
  {
    id: 'lesson-rpmfusion',
    titleFa: 'درس ۳: فعال‌سازی RPM Fusion برای کدک‌ها و انویدیا',
    tool: 'rpmfusion',
    scenarioId: 'rpm-fusion',
    totalDurationSec: 90,
    videoPosterColor: 'from-amber-600/30 to-rose-950',
    overviewFa: 'آموزش گام‌به‌گام فعال‌سازی مخازن مکمل RPM Fusion Free و Non-Free برای پشتیبانی کامل از فیلم‌های MP4، کدک‌های تصویری و درایور کارت گرافیک Nvidia.',
    chapters: [
      {
        id: 'rf1',
        timeSec: 0,
        labelFa: 'چرا فدورا کدک‌های تصویری ندارد؟',
        narrationTextFa: 'پروژه فدورا متعلق به آمریکا است و طبق قوانین پتنت نرم‌افزاری، اجازه توزیع رسمی برخی کدک‌های تجاری مانند H.264 و MP3 را ندارد. برای حل این مشکل، جامعه فدورا مخزن RPM Fusion را نگهداری می‌کند.',
        badgeText: 'مفهوم لایسنس',
        highlightCard: {
          title: 'مخازن رسمی همکار',
          description: 'بسته‌های RPM Fusion توسط معتمدین پروژه فدورا تست می‌شوند و با آپدیت‌های سیستمی شما ۱۰۰٪ هماهنگ هستند.',
          type: 'info'
        }
      },
      {
        id: 'rf2',
        timeSec: 25,
        labelFa: 'فعال‌سازی مخازن Free و Non-Free',
        narrationTextFa: 'با دستور زیر، پکیج‌های کانفیگ هر دو بخش آزاد (Free) و غیرآزاد (Non-Free) را در سیستم فدورا ثبت و فعال می‌کنیم.',
        activeTerminalCommand: 'sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm -y',
        simulatedOutput: `Running transaction check...
Installing: rpmfusion-free-release-41-1.noarch
Installing: rpmfusion-nonfree-release-41-1.noarch
Importing RPM Fusion signing keys...
Complete!`,
        badgeText: 'ثبت مخزن',
        highlightCard: {
          title: 'تشخیص خودکار نسخه',
          description: 'دستور (rpm -E %fedora)$ شماره نسخه توزیع فدورای شما را به صورت خودکار جایگذاری می‌کند.',
          type: 'terminal'
        }
      },
      {
        id: 'rf3',
        timeSec: 55,
        labelFa: 'نصب بسته‌های کدک تصویری GStreamer و FFmpeg',
        narrationTextFa: 'حالا گروه مالتی‌مدیا را آپدیت می‌کنیم تا بسته‌های ffmpeg و پلاگین‌های صوتی/تصویری نصب شده و هیچ مشکلی در پخش ویدیو یا استریم نداشته باشید.',
        activeTerminalCommand: 'sudo dnf groupupdate multimedia --setop="install_weak_deps=False" --exclude=PackageKit-gstreamer-plugin -y',
        simulatedOutput: `Installing:
 ffmpeg                        x86_64   7.0.2-2.fc41    rpmfusion-free
 gstreamer1-plugins-ugly       x86_64   1.24.8-1.fc41   rpmfusion-free
 gstreamer1-plugins-bad-free   x86_64   1.24.8-1.fc41   rpmfusion-free
Complete! All media codecs are now functional.`,
        badgeText: 'کدک‌های کامل',
        highlightCard: {
          title: 'نتیجه کار',
          description: 'مرورگر فایرفاکس و ویدیو پلیرهای سیستم اکنون قادر به پخش هر فرمتی در اینترنت هستند.',
          type: 'success'
        }
      }
    ]
  },
  {
    id: 'lesson-rpm-direct',
    titleFa: 'درس ۴: نصب مستقیم فایل‌های RPM دانلود شده (مانند کروم و VS Code)',
    tool: 'rpm',
    scenarioId: 'rpm-direct',
    totalDurationSec: 85,
    videoPosterColor: 'from-purple-600/30 to-violet-950',
    overviewFa: 'بررسی تفاوت بزرگ و حیاتی میان دستور dnf و دستور سنتی rpm -i، بررسی امضای GPG و نصب تمیز گوگل کروم.',
    chapters: [
      {
        id: 'rd1',
        timeSec: 0,
        labelFa: 'اشتباه رایج: هرگز از rpm -i استفاده نکنید!',
        narrationTextFa: 'بسیاری از کاربران بعد از دانلود فایل rpm دستور sudo rpm -i file.rpm را اجرا می‌کنند و با خطای گم شدن وابستگی‌ها روبرو می‌شوند. در فدورا همیشه باید از sudo dnf install ./file.rpm استفاده کنید تا DNF خودکار پیش‌نیازها را از اینترنت دانلود کند.',
        badgeText: 'نکته طلایی لینوکس',
        highlightCard: {
          title: 'چرا DNF برنده است؟',
          description: 'دستور rpm خام توانایی دانلود آنلاین پکیج‌های وابسته را ندارد اما DNF هوشمندانه همه را حل می‌کند.',
          type: 'warning'
        }
      },
      {
        id: 'rd2',
        timeSec: 30,
        labelFa: 'نصب عملیاتی پکیج محلی کروم با DNF',
        narrationTextFa: 'علامت نقطه اسلش ./ به سیستم می‌گوید که فایل در همین پوشه فعلی قرار دارد و نیازی به جستجو در سرور نیست.',
        activeTerminalCommand: 'sudo dnf install ./google-chrome-stable_current_x86_64.rpm -y',
        simulatedOutput: `Examining ./google-chrome-stable_current_x86_64.rpm:
Resolving dependencies...
Dependencies resolved.
Installing:
 google-chrome-stable   x86_64   130.0.6723.69-1    @commandline
Importing Google GPG signing key automatically...
Complete!`,
        badgeText: 'نصب خودکار کلید GPG',
        highlightCard: {
          title: 'آپدیت اتوماتیک',
          description: 'بسته گوگل کروم پس از نصب، مخزن رسمی گوگل را در /etc/yum.repos.d ذخیره می‌کند تا در آپدیت‌های آینده با dnf upgrade بروز شود.',
          type: 'success'
        }
      }
    ]
  },
  {
    id: 'lesson-local-file',
    titleFa: 'درس ۵: سناریوی ۱ - آموزش نصب انواع فایل‌های موجود در کامپیوتر',
    tool: 'localfile',
    scenarioId: 'local-offline-file',
    totalDurationSec: 110,
    videoPosterColor: 'from-sky-600/30 to-blue-950',
    overviewFa: 'آموزش گام‌به‌گام نصب فایلی که در پوشه دانلودها یا روی هارد کامپیوتر دارید: شامل فایل‌های .rpm با حل وابستگی، فایل‌های پرتابل .AppImage، باندل‌های .flatpak و آرشیوهای .tar.gz.',
    chapters: [
      {
        id: 'lf1',
        timeSec: 0,
        labelFa: 'بررسی فایل‌های موجود در پوشه دانلودها',
        narrationTextFa: 'در این سناریو، شما فایل نصبی را از قبل روی کامپیوتر یا لپ‌تاپ خود دارید. ابتدا با دستور ls محتویات پوشه دانلودها را می‌بینیم تا نوع پسوند فایل مشخص شود.',
        activeTerminalCommand: 'cd ~/Downloads && ls -lh',
        simulatedOutput: `-rw-r--r--. 1 user user 106M Sep 19 14:00 google-chrome.rpm
-rwxr-xr-x. 1 user user 234M Sep 19 14:05 Krita.AppImage
-rw-r--r--. 1 user user  48M Sep 19 14:10 telegram.tar.gz`,
        badgeText: 'تشخیص فرمت فایل',
        highlightCard: {
          title: 'سناریوی فایل محلی',
          description: 'نوع پسوند فایل تعیین می‌کند که آیا با dnf، با chmod +x یا با tar باید اقدام به نصب و اجرا کنید.',
          type: 'info'
        }
      },
      {
        id: 'lf2',
        timeSec: 30,
        labelFa: 'نصب فایل محلی .rpm با DNF',
        narrationTextFa: 'اگر فایل پسوند دات آر‌پی‌ام دارد، هرگز از دستور قدیمی rpm استفاده نکنید. با sudo dnf install و علامت نقطه اسلش قبل از نام فایل، نصب را انجام دهید تا همه پیش‌نیازها به طور خودکار حل شوند.',
        activeTerminalCommand: 'sudo dnf install ./google-chrome.rpm -y',
        simulatedOutput: `Examining ./google-chrome.rpm:
Resolving dependencies:
Dependencies resolved.
Installing: google-chrome-stable x86_64
Complete! پکیج محلی با موفقیت نصب شد.`,
        badgeText: 'نکته حیاتی ./',
        highlightCard: {
          title: 'چرا علامت ./ الزامی است؟',
          description: 'نقطه اسلش به فدورا می‌گوید فایل روی همین هارد دیسک است و نباید دنبال پکیجی با این نام در اینترنت بگردد.',
          type: 'terminal'
        }
      },
      {
        id: 'lf3',
        timeSec: 65,
        labelFa: 'اجرای فایل پرتابل .AppImage بدون نیاز به نصب',
        narrationTextFa: 'اگر فایل AppImage است، نیازی به نصب یا پسورد روت ندارد. فقط با دستور chmod +x دسترسی اجرا را فعال کرده و بلافاصله اجرا می‌کنیم.',
        activeTerminalCommand: 'chmod +x ./Krita.AppImage && ./Krita.AppImage',
        simulatedOutput: `Permissions updated: Executable flag set.
Launching Krita UI from local AppImage...
Ready! برنامه بدون نیاز به دسترسی ادمین اجرا شد.`,
        badgeText: 'پرتابل و سریع',
        highlightCard: {
          title: 'روش گرافیکی AppImage',
          description: 'روی فایل راست کلیک کرده، به Properties بروید و تیک Allow executing file as program را بزنید تا با دابل کلیک باز شود.',
          type: 'success'
        }
      },
      {
        id: 'lf4',
        timeSec: 90,
        labelFa: 'مثال ۳: استخراج آرشیو فشرده باینری (تلگرام دسکتاپ tar.xz)',
        narrationTextFa: 'برای فایل‌های فشرده tar.gz یا tar.xz موجود در سیستم مثل تلگرام دسکتاپ، ابتدا با دستور tar -xf آن را استخراج می‌کنیم و فایل باینری را در مسیر ~/.local/bin قرار می‌دهیم تا بدون نیاز به sudo از هر جای سیستم قابل اجرا باشد.',
        activeTerminalCommand: 'tar -xf ./tsetup.tar.xz && mkdir -p ~/.local/bin && cp Telegram/Telegram ~/.local/bin/telegram-desktop',
        simulatedOutput: `Extracting ./tsetup.tar.xz...
Created: Telegram/Telegram (binary executable)
Copied to ~/.local/bin/telegram-desktop
Ready! Type 'telegram-desktop' or search in app launcher.`,
        badgeText: 'استخراج باینری محلی',
        highlightCard: {
          title: 'مسیر استاندارد کاربر',
          description: 'پوشه ~/.local/bin در متغیر PATH لینوکس فدورا قرار دارد و بدون دستکاری فایل‌های ریشه برنامه را اجرا می‌کند.',
          type: 'terminal'
        }
      }
    ]
  },
  {
    id: 'lesson-github-install',
    titleFa: 'درس ۶: سناریوی ۲ - آموزش نصب از روی آدرس و ریپازیتوری گیت‌هاب',
    tool: 'github',
    scenarioId: 'github-install-url',
    totalDurationSec: 115,
    videoPosterColor: 'from-violet-600/30 to-purple-950',
    overviewFa: 'آموزش کامل نصب نرم‌افزار با داشتن لینک گیت‌هاب: شامل ترفند شاهکار DNF برای نصب مستقیم آدرس وب پکیج، دانلود Releases با curl و کلون و ساخت سورس کد.',
    chapters: [
      {
        id: 'gh1',
        timeSec: 0,
        labelFa: 'مثال ۱: ترفند شاهکار: نصب مستقیم فایل rpm گیت‌هاب با DNF',
        narrationTextFa: 'اگر آدرس لینک دانلود فایل rpm در صفحه Releases گیت‌هاب را دارید، نیازی به دانلود دستی با مرورگر نیست! فدورا اجازه می‌دهد آدرس مستقیم گیت‌هاب را به دستور dnf بدهید تا خودش فایل را دانلود، وابستگی‌هایش را چک و مستقیماً نصب کند.',
        activeTerminalCommand: 'sudo dnf install https://github.com/fastfetch-cli/fastfetch/releases/download/2.30.1/fastfetch-linux-amd64.rpm -y',
        simulatedOutput: `Downloading https://github.com/fastfetch-cli/fastfetch/releases/download/2.30.1/fastfetch-linux-amd64.rpm...
Examining downloaded package: fastfetch-2.30.1.x86_64
Resolving dependencies...
Installing: fastfetch x86_64
Complete! نرم‌افزار مستقیماً از لینک گیت‌هاب نصب شد.`,
        badgeText: 'نصب مستقیم URL',
        highlightCard: {
          title: 'قابلیت بی‌نظیر DNF',
          description: 'دیگر نیازی به باز کردن مرورگر و ذخیره فایل در پوشه دانلودها نیست؛ لینک گیت‌هاب را کپی کنید و به DNF بدهید.',
          type: 'success'
        }
      },
      {
        id: 'gh2',
        timeSec: 40,
        labelFa: 'مثال ۲: دانلود فایل‌های Releases با ابزار curl (مانند Obsidian AppImage)',
        narrationTextFa: 'برای دانلود فایل‌های باینری یا AppImage از گیت‌هاب در ترمینال، از curl با فلگ LO استفاده می‌کنیم تا ریدایرکت‌های سرور گیت‌هاب به درستی دنبال شوند.',
        activeTerminalCommand: 'curl -LO https://github.com/obsidianmd/obsidian-releases/releases/download/v1.7.4/Obsidian-1.7.4.AppImage && chmod +x Obsidian-1.7.4.AppImage',
        simulatedOutput: `  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
100 115M   100 115M     0     0  14.2M      0  0:00:08  0:00:08 --:--:-- 15.1M
File Obsidian-1.7.4.AppImage downloaded and executable permission set.`,
        badgeText: 'دنبال کردن ریدایرکت',
        highlightCard: {
          title: 'چرا پرچم -L در curl ضروری است؟',
          description: 'گیت‌هاب فایل‌های Releases را به سرور CDN خود ریدایرکت می‌کند؛ بدون -L یک فایل خطای HTML دانلود می‌شود!',
          type: 'warning'
        }
      },
      {
        id: 'gh3',
        timeSec: 80,
        labelFa: 'مثال ۳: آدرس مخزن سورس‌کد: git clone و کامپایل ابزار با CMake',
        narrationTextFa: 'اگر آدرس صفحه اصلی پروژه در گیت‌هاب را دارید، ابتدا با git clone مخزن را دریافت کرده و با ابزارهای استاندارد CMake و کامپایلر موازی فدورا آن را می‌سازیم.',
        activeTerminalCommand: 'git clone https://github.com/fastfetch-cli/fastfetch.git && cd fastfetch && mkdir build && cd build && cmake .. && make -j$(nproc)',
        simulatedOutput: `Cloning into 'fastfetch'...
Configuring done
Generating done
[100%] Built target fastfetch successfully.
Binary generated: ./fastfetch`,
        badgeText: 'بیلد از سورس',
        highlightCard: {
          title: 'ابزارهای مورد نیاز',
          description: 'قبل از کلون، دستور sudo dnf groupinstall "Development Tools" را اجرا کنید تا کامپایلرها آماده باشند.',
          type: 'terminal'
        }
      }
    ]
  }
];
