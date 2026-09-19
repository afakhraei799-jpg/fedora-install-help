import { InstallationScenario, CheatSheetCommand, DecisionNode } from '../types';

export const SCENARIOS: InstallationScenario[] = [
  {
    id: 'dnf-official',
    titleFa: 'مدیر بسته پیش‌فرض فدورا (DNF / DNF5)',
    titleEn: 'Fedora Official Repositories (DNF / DNF5)',
    category: 'core',
    tool: 'dnf',
    iconName: 'Package',
    badge: 'روش اصلی و رسمی',
    summary: 'استانداردترین و پایدارترین روش نصب بسته‌های نرم‌افزاری بومی (RPM) از سرورها و مخازن رسمی فدورا.',
    realWorldAppExample: 'نصب VLC Media Player، ابزار Git، مرورگر Firefox، پایتون و ابزارهای سیستمی',
    whyUseThis: 'تمام بسته‌ها توسط تیم مهندسی ردهت و فدورا بررسی، کامپایل و تست امنیت شده‌اند و بالاترین سازگاری و سرعت اجرا را با هسته لینوکس دارند.',
    pros: [
      'یکپارچگی ۱۰۰٪ با سیستم‌عامل و هسته لینوکس',
      'مدیریت هوشمند و خودکار وابستگی‌ها (Dependencies)',
      'سرعت فوق‌العاده با بازنویسی DNF5 به زبان C++ در فدورا ۴۱ و جدیدتر',
      'مصرف حداقل فضای ذخیره‌سازی به دلیل اشتراک‌گذاری کتابخانه‌ها'
    ],
    cons: [
      'برنامه‌ها مستقیماً در دایرکتوری‌های سیستمی نصب می‌شوند (ایزوله در سندباکس نیستند)',
      'گاهی برخی نرم‌افزارهای تجاری یا غیررایگان در مخزن رسمی موجود نیستند'
    ],
    securityLevel: 'امن (مخزن رسمی فدورا)',
    isolationLevel: 'محلی و بومی در کل سیستم',
    steps: [
      {
        stepNumber: 1,
        title: 'جستجوی بسته در مخازن فدورا',
        description: 'ابتدا نام دقیق یا بخشی از نام پکیج مورد نظر را جستجو کنید تا از موجود بودن آن مطمئن شوید.',
        command: 'dnf search vlc',
        terminalOutputSimulation: `Updating and loading repositories:
Fedora 41 - x86_64                                100% |  28 kB/s | 4.8 kB |  00m00s
========================= Matched: vlc =========================
vlc.x86_64 : The cross-platform open-source multimedia player
vlc-core.x86_64 : VLC media player core libraries and plugins
python3-vlc.noarch : Python bindings for the VLC media player`,
        explanationTip: 'دستور search بدون نیاز به دسترسی sudo اجرا می‌شود.'
      },
      {
        stepNumber: 2,
        title: 'بررسی اطلاعات و نسخه نرم‌افزار',
        description: 'مشاهده اطلاعات تکمیلی مثل نسخه، حجم دانلود و مجوز قبل از شروع نصب.',
        command: 'dnf info vlc',
        terminalOutputSimulation: `Name         : vlc
Version      : 3.0.21
Release      : 4.fc41
Architecture : x86_64
Size         : 1.8 M
Source       : vlc-3.0.21-4.fc41.src.rpm
Repository   : fedora
Summary      : The cross-platform open-source multimedia player
License      : GPL-2.0-or-later AND LGPL-2.1-or-later`,
        explanationTip: 'می‌توانید حجم دقیق دانلود و لایسنس نرم‌افزار را بررسی کنید.'
      },
      {
        stepNumber: 3,
        title: 'اجرای دستور نصب با دسترسی مدیر (sudo)',
        description: 'دستور نصب را اجرا کرده و در صورت درخواست تایید، کلید y را فشار دهید.',
        command: 'sudo dnf install vlc -y',
        terminalOutputSimulation: `[sudo] password for user: ********
Resolving dependencies:
Installing:
 vlc                               x86_64   3.0.21-4.fc41       fedora        1.8 M
Installing dependencies:
 vlc-core                          x86_64   3.0.21-4.fc41       fedora        9.2 M
 libdvdcss                         x86_64   1.4.3-5.fc41        fedora        78 k

Transaction Summary:
Installing: 3 Packages
Total size: 11.1 MB
Downloading Packages...
[1/3] vlc-3.0.21-4.fc41.x86_64.rpm               100% |  12 MB/s | 1.8 MB |  00m00s
[2/3] vlc-core-3.0.21-4.fc41.x86_64.rpm          100% |  18 MB/s | 9.2 MB |  00m00s
Running transaction check...
Running transaction test...
Complete!`,
        explanationTip: 'پارامتر y- باعث تایید خودکار سوالات حین دانلود و نصب پکیج‌ها می‌شود.'
      }
    ],
    verificationCommand: 'vlc --version',
    removalCommand: 'sudo dnf remove vlc',
    commonPitfalls: [
      'استفاده اشتباه از dnf به جای sudo dnf برای عملیات نصب یا حذف',
      'فراموش کردن بازگردانی تراکنش با dnf history undo در صورت بروز اشتباه در نصب پکیج‌های ناخواسته'
    ],
    examplesList: [
      {
        appName: 'مثال ۱: پلیر چندرسانه‌ای قدرتمند VLC Media Player',
        command: 'sudo dnf install vlc -y',
        description: 'محبوب‌ترین مدیاپلیر متن‌باز در جهان برای پخش انواع فرمت‌های ویدیویی و صوتی با عملکرد پایدار بومی.'
      },
      {
        appName: 'مثال ۲: ابزار نمایش اطلاعات سیستم Fastfetch',
        command: 'sudo dnf install fastfetch -y',
        description: 'ابزار سبک و فوق‌العاده سریع خط فرمان برای چاپ مشخصات سخت‌افزار و اطلاعات توزیع فدورا در ترمینال.'
      },
      {
        appName: 'مثال ۳: سیستم کنترل نسخه گیت (Git)',
        command: 'sudo dnf install git -y',
        description: 'ابزار ضروری تمام برنامه‌نویسان و توسعه‌دهندگان لینوکس برای مدیریت مخازن کد و مشارکت در پروژه‌ها.'
      }
    ]
  },
  {
    id: 'flatpak-flathub',
    titleFa: 'فلت‌پک و فلت‌هاب (Flatpak & Flathub)',
    titleEn: 'Flatpak & Flathub Universal Sandboxed Apps',
    category: 'sandboxed',
    tool: 'flatpak',
    iconName: 'ShieldCheck',
    badge: 'بهترین برای برنامه‌های دسکتاپ',
    summary: 'نرم‌افزارهای جهان‌شمول و ایزوله که روی تمام توزیع‌های لینوکس یکسان کار می‌کنند و محیط ایزوله امنیتی دارند.',
    realWorldAppExample: 'اسپاتیفای (Spotify)، دیسکورد (Discord)، تلگرام، استیم (Steam)، OBS Studio',
    whyUseThis: 'توسعه‌دهندگان نرم‌افزارهای معروفی چون تلگرام، موزیلا، دیسکورد و استیم مستقیماً پکیج Flathub را نگهداری و آپدیت می‌کنند، بنابراین جدیدترین امکانات را بدون وابستگی به نسخه فدورا دریافت می‌کنید.',
    pros: [
      'ایزوله‌سازی امنیتی بالا با Sandbox و مدیریت دسترسی‌ها (با Flatseal)',
      'همیشه جدیدترین نسخه نرم‌افزار بدون صبر کردن برای آپدیت مخزن سیستم‌عامل',
      'هیچ خطری برای پایداری پکیج‌های پایه‌ای سیستم‌عامل ندارد',
      'نصب برای تک‌کاربره بدون نیاز به دسترسی ریشه (sudo) هم امکان‌پذیر است'
    ],
    cons: [
      'حجم دانلود اولیه به دلیل دانلود Runtimes (محیط‌های اجرایی مستقل GNOME/KDE) بیشتر است',
      'برای دسترسی به فایل‌های خارج از خانه یا دوربین/میکروفن نیاز به اعطای دسترسی دارد'
    ],
    securityLevel: 'خیلی امن (Sandboxed)',
    isolationLevel: 'ایزوله در سندباکس',
    steps: [
      {
        stepNumber: 1,
        title: 'فعال‌سازی مخزن رسمی فلت‌هاب (Flathub)',
        description: 'فدورا به طور پیش‌فرض Flatpak را نصب دارد اما مخزن جامع Flathub باید اضافه شود.',
        command: 'flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo',
        terminalOutputSimulation: `Adding remote 'flathub' from https://dl.flathub.org/repo/flathub.flatpakrepo...
Remote 'flathub' added successfully.`,
        explanationTip: 'این دستور فقط یک‌بار برای کل سیستم نیاز است و دسترسی به بیش از ۲۵۰۰ نرم‌افزار را فراهم می‌کند.'
      },
      {
        stepNumber: 2,
        title: 'جستجوی نرم‌افزار در Flathub',
        description: 'جستجوی نرم‌افزار برای یافتن Application ID منحصر‌به‌فرد (مانند com.spotify.Client).',
        command: 'flatpak search spotify',
        terminalOutputSimulation: `Name      Description                         Application ID      Version   Branch Remotes
Spotify   Online music streaming service     com.spotify.Client  1.2.31    stable flathub
Spot      Native Spotify client for GNOME     dev.alextren.Spot   0.4.0     stable flathub`,
        explanationTip: 'شناسه Application ID معمولاً به شکل نام دامنه معکوس است.'
      },
      {
        stepNumber: 3,
        title: 'نصب برنامه با یک دستور ساده',
        description: 'نصب برنامه به سادگی و بدون خطر خراب شدن پکیج‌های دیگر سیستم.',
        command: 'flatpak install flathub com.spotify.Client -y',
        terminalOutputSimulation: `Looking for matches…
Required runtime for com.spotify.Client/x86_64/stable (runtime/org.freedesktop.Platform/x86_64/23.08) found in remote flathub
Do you want to install it? [Y/n]: Y

        ID                                  Branch        Op        Remote       Download
 1. [✓] org.freedesktop.Platform.GL.default 23.08         i         flathub      145.2 MB / 145.2 MB
 2. [✓] org.freedesktop.Platform            23.08         i         flathub      210.4 MB / 212.1 MB
 3. [✓] com.spotify.Client                  stable        i         flathub       48.6 MB / 48.6 MB

Installation complete.`,
        explanationTip: 'لایه Runtime دانلود شده بین تمام برنامه‌های هم‌نسل به اشتراک گذاشته می‌شود.'
      },
      {
        stepNumber: 4,
        title: 'مدیریت اختیاری دسترسی‌ها با Flatseal',
        description: 'نرم‌افزار رایگان Flatseal اجازه می‌دهد دسترسی به دوربین، میکروفن، پوشه‌ها و شبکه را به صورت گرافیکی قطع یا وصل کنید.',
        command: 'flatpak install flathub com.github.tchx84.Flatseal -y',
        terminalOutputSimulation: `Installing Flatseal...
Flatseal allows you to review and modify basic and advanced permissions of all your Flatpaks.
Installation complete.`,
        explanationTip: 'با Flatseal امنیت سیستم شما دوچندان خواهد شد.'
      }
    ],
    verificationCommand: 'flatpak run com.spotify.Client',
    removalCommand: 'flatpak uninstall com.spotify.Client',
    commonPitfalls: [
      'اجرا کردن دستورات فلت‌پک با sudo که منجر به نصب در مسیر ریشه و ناهماهنگی تم دسکتاپ می‌شود (همیشه بدون sudo اجرا کنید)',
      'عدم نمایش برنامه در لانچر به دلیل ری‌استارت نکردن سشن پس از اولین نصب فلت‌پک'
    ],
    examplesList: [
      {
        appName: 'مثال ۱: سرویس استریم آنلاین موسیقی Spotify',
        command: 'flatpak install flathub com.spotify.Client -y',
        description: 'کلاینت رسمی و کامل اسپاتیفای با محیط کاملاً ایزوله سندباکس و بدون دخالت در پکیج‌های فدورا.'
      },
      {
        appName: 'مثال ۲: پیام‌رسان و چت صوتی گیمینگ Discord',
        command: 'flatpak install flathub com.discordapp.Discord -y',
        description: 'نسخه رسمی دیسکورد با اشتراک‌گذاری تصویر نمایشگر و هماهنگی کامل با ساب‌سیستم PipeWire فدورا.'
      },
      {
        appName: 'مثال ۳: ویرایشگر کد و محیط توسعه Visual Studio Code',
        command: 'flatpak install flathub com.visualstudio.code -y',
        description: 'محیط محبوب برنامه‌نویسی با مدیریت تمیز اکستنشن‌ها و عدم تداخل با پکیج‌های پایتون و نودجی‌اس سیستم.'
      }
    ]
  },
  {
    id: 'rpm-fusion',
    titleFa: 'مخازن کمکی RPM Fusion (کدک‌های چندرسانه‌ای و انویدیا)',
    titleEn: 'RPM Fusion Repositories (Codecs, Nvidia & Proprietary)',
    category: 'core',
    tool: 'rpmfusion',
    iconName: 'Layers',
    badge: 'ضروری برای کاربران چندرسانه‌ای و گیمینگ',
    summary: 'مخازن مکملی که نرم‌افزارها، کدک‌های تصویری انحصاری و درایورهای گرافیکی که به دلایل حقوقی در فدورا نیستند را اضافه می‌کند.',
    realWorldAppExample: 'پخش فیلم‌های H.264 / HEVC / MP4 در فدورا، درایور اختصاصی کارت گرافیک Nvidia، استیم و OBS با انکودر سخت‌افزاری NVENC',
    whyUseThis: 'پروژه فدورا به قوانین سخت‌گیرانه متن‌باز و پتنت‌های آمریکا وفادار است؛ بنابراین کدک‌های پتنت‌دار صوتی/تصویری را خود به خود توزیع نمی‌کند. فعال‌سازی RPM Fusion این کمبود را کاملاً برطرف می‌کند.',
    pros: [
      'امکان پخش ۱۰۰٪ تمام فرمت‌های ویدیویی، صوتی و استریم در مرورگرها و مدیاپلیرها',
      'نصب بسیار پایدار درایورهای Nvidia هماهنگ با کرنل‌های فدورا (akmod)',
      'تضمین کیفیت توسط اعضای جامعه رسمی فدورا و ردهت'
    ],
    cons: [
      'نیاز به فعال‌سازی دستی در یک مرحله اولیه پس از نصب سیستم‌عامل'
    ],
    securityLevel: 'امن (مخزن رسمی فدورا)',
    isolationLevel: 'محلی و بومی در کل سیستم',
    steps: [
      {
        stepNumber: 1,
        title: 'فعال‌سازی مخازن Free و Non-Free',
        description: 'دانلود و فعال‌سازی کلید و مخزن RPM Fusion با یک دستور رسمی.',
        command: 'sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm -y',
        terminalOutputSimulation: `Downloading rpmfusion-free-release...
Downloading rpmfusion-nonfree-release...
Running transaction check...
Installing: rpmfusion-free-release
Installing: rpmfusion-nonfree-release
Complete!`,
        explanationTip: 'این دستور به طور خودکار نسخه مناسب فدورای سیستم شما را تشخیص می‌دهد.'
      },
      {
        stepNumber: 2,
        title: 'نصب بسته‌های کدک چندرسانه‌ای GStreamer',
        description: 'فعال‌سازی کدک‌های کامل صوتی و تصویری برای GNOME Videos، مرورگرها و پلیرها.',
        command: 'sudo dnf groupupdate multimedia --setop="install_weak_deps=False" --exclude=PackageKit-gstreamer-plugin -y',
        terminalOutputSimulation: `Upgrading and resolving multimedia group dependencies:
Installing:
 gstreamer1-plugins-ugly
 gstreamer1-plugins-bad-freeworld
 gstreamer1-libav
 ffmpeg
Complete! All proprietary media codecs are now installed.`,
        explanationTip: 'این دستور تمامی کدک‌های لازم برای پخش فیلم‌های MP4, MKV, HEVC و استریم یوتیوب را اضافه می‌کند.'
      },
      {
        stepNumber: 3,
        title: 'اختیاری: نصب درایور انویدیا (Nvidia GPU Driver)',
        description: 'درایور رسمی Nvidia با ماژول خودکار akmod که با هر آپدیت کرنل خود را مجدداً کامپایل می‌کند.',
        command: 'sudo dnf install akmod-nvidia xorg-x11-drv-nvidia-cuda -y',
        terminalOutputSimulation: `Installing: akmod-nvidia
Installing: xorg-x11-drv-nvidia-cuda
Building kernel module for current kernel...
Nvidia driver compiled and registered into system boot.`,
        explanationTip: 'پس از اتمام، سیستم را ری‌استارت کنید تا درایور فعال شود.'
      }
    ],
    verificationCommand: 'dnf repolist | grep rpmfusion',
    removalCommand: 'sudo dnf remove rpmfusion-free-release rpmfusion-nonfree-release',
    commonPitfalls: [
      'ریستارت کردن خیلی سریع سیستم در حین کامپایل akmod درایور انویدیا (حدود ۳ تا ۵ دقیقه صبر کنید تا ماژول کامل ساخته شود)',
      'نصب اشتباه درایور از سایت انویدیا با فایل run. به جای استفاده از مخزن رسمی RPM Fusion'
    ],
    examplesList: [
      {
        appName: 'مثال ۱: نصب کدک‌های کامل چندرسانه‌ای FFmpeg',
        command: 'sudo dnf swap ffmpeg-free ffmpeg --allowerasing -y',
        description: 'جایگزینی نسخه محدود FFmpeg با نسخه فول بدون محدودیت پتنت جهت پخش تمام ویدیوها.'
      },
      {
        appName: 'مثال ۲: کلاینت رسمی استیم گیمینگ (Steam)',
        command: 'sudo dnf install steam -y',
        description: 'نصب پلتفرم استیم برای اجرای بازی‌های لینوکسی و ویندوزی (با لایه سازگاری Proton).'
      },
      {
        appName: 'مثال ۳: درایور رسمی گرافیک انویدیا با ماژول akmod',
        command: 'sudo dnf install akmod-nvidia xorg-x11-drv-nvidia-cuda -y',
        description: 'نصب درایور رسمی گرافیک با قابلیت بازسازی خودکار در هر آپدیت کرنل لینوکس فدورا.'
      }
    ]
  },
  {
    id: 'rpm-direct',
    titleFa: 'نصب دستی فایل‌های RPM دانلود شده (Direct .RPM)',
    titleEn: 'Direct RPM Package Installation',
    category: 'third-party',
    tool: 'rpm',
    iconName: 'FileDown',
    badge: 'روش نرم‌افزارهای تجاری',
    summary: 'دانلود مستقیم پکیج با فرمت .rpm از وب‌سایت‌های سازنده و نصب محلی با dnf.',
    realWorldAppExample: 'مرورگر گوگل کروم (Google Chrome)، نرم‌افزار VS Code، زوم (Zoom)، داکر دسکتاپ',
    whyUseThis: 'بسیاری از شرکت‌ها مثل Google و Microsoft نسخه لینوکس خود را به صورت پکیج دانلودی RPM روی سایت رسمی‌شان قرار می‌دهند.',
    pros: [
      'دسترسی به پکیج‌های رسمی ارائه‌شده توسط شرکت‌های بزرگ',
      'اضافه شدن خودکار مخزن آپدیت نرم‌افزار به فدورا در اکثر پکیج‌ها (مانند کروم و VS Code)'
    ],
    cons: [
      'نیاز به دانلود دستی فایل اولیه از اینترنت',
      'خطرات امنیتی در صورت دانلود از سایت‌های غیرمعتبر'
    ],
    securityLevel: 'متوسط (وابسته به سازنده)',
    isolationLevel: 'محلی و بومی در کل سیستم',
    steps: [
      {
        stepNumber: 1,
        title: 'دانلود فایل RPM از سایت رسمی سازنده',
        description: 'دانلود فایل rpm مورد نظر به عنوان مثال پکیج مرورگر گوگل کروم.',
        command: 'curl -O https://dl.google.com/linux/direct/google-chrome-stable_current_x86_64.rpm',
        terminalOutputSimulation: `  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100  106M  100  106M    0     0  14.2M      0  0:00:07  0:00:07 --:--:-- 15.6M
Successfully saved as google-chrome-stable_current_x86_64.rpm`,
        explanationTip: 'همیشه از وب‌سایت‌های رسمی و دارای گواهی معتبر دانلود نمایید.'
      },
      {
        stepNumber: 2,
        title: 'نصب فایل محلی با دستور dnf (نکته حیاتی!)',
        description: 'هرگز از rpm -i استفاده نکنید! همیشه با sudo dnf install ./file.rpm نصب کنید تا وابستگی‌ها خودکار حل شوند.',
        command: 'sudo dnf install ./google-chrome-stable_current_x86_64.rpm -y',
        terminalOutputSimulation: `Examining ./google-chrome-stable_current_x86_64.rpm: google-chrome-stable-130.0.6723.69-1.x86_64
Marking for installation...
Resolving dependencies:
Dependencies resolved.
Installing:
 google-chrome-stable   x86_64   130.0.6723.69-1    @commandline    340 M
Importing GPG key 0x7FAC5991:
 Userid     : "Google, Inc. Linux Package Signing Key <linux-packages-keymaster@google.com>"
 Fingerprint: 4CCA 1EAF 950C EE4A AB9E  0222 72AC 9363 7FAC 5991
 From       : https://dl.google.com/linux/linux_signing_key.pub
Key imported successfully.
Running transaction...
Complete!`,
        explanationTip: 'علامت ./ به DNF می‌فهماند که فایل در مسیر فعلی پوشه شما قرار دارد.'
      }
    ],
    verificationCommand: 'google-chrome --version',
    removalCommand: 'sudo dnf remove google-chrome-stable',
    commonPitfalls: [
      'استفاده از rpm -i که در صورت کمبود کتابخانه خطای Dependency می‌دهد و نصب را لغو می‌کند',
      'حذف فایل rpm دانلودی قبل از تمام شدن فرآیند نصب'
    ],
    examplesList: [
      {
        appName: 'مثال ۱: مرورگر رسمی گوگل کروم (Google Chrome)',
        command: 'sudo dnf install ./google-chrome-stable_current_x86_64.rpm -y',
        description: 'نصب مرورگر کروم با فعال‌سازی خودکار ریپازیتوری رسمی گوگل جهت دریافت بروزرسانی‌های بعدی.'
      },
      {
        appName: 'مثال ۲: نرم‌افزار جلسات ویدئویی زوم (Zoom Client)',
        command: 'sudo dnf install ./zoom_x86_64.rpm -y',
        description: 'کلاینت لینوکسی زوم به صورت پکیج دانلودی RPM با حل وابستگی‌های Wayland و صوتی.'
      },
      {
        appName: 'مثال ۳: پیام‌رسان سازمانی اسلک (Slack)',
        command: 'sudo dnf install ./slack-4.39.0-0.1.fc21.x86_64.rpm -y',
        description: 'برنامه کاری اسلک دانلود شده مستقیم از وب‌سایت سازنده و اتصال به لانچر فدورا.'
      }
    ]
  },
  {
    id: 'fedora-copr',
    titleFa: 'مخازن جامعه کاربری فدورا (Fedora Copr)',
    titleEn: 'Fedora Copr (Community Projects Repository)',
    category: 'advanced',
    tool: 'copr',
    iconName: 'Users',
    badge: 'معادل PPA اوبونتو برای فدورا',
    summary: 'سامانه ساخت خودکار پکیج‌های بیلدشده توسط توسعه‌دهندگان مستقل و جامعه کاربری فدورا.',
    realWorldAppExample: 'نصب جدیدترین نسخه‌های آزمایشی Neovim Nightly، فونت‌های سفارشی، کرنل‌های گیمینگ و ابزارهای توسعه خاص',
    whyUseThis: 'وقتی نرم‌افزاری در مخازن اصلی فدورا نیست یا نسخه خیلی جدیدتر از آن را می‌خواهید، توسعه‌دهندگان آن را در Copr قرار می‌دهند.',
    pros: [
      'دسترسی به هزاران پروژه خاص، پچ‌های نرم‌افزاری و آخرین نسخه‌های نرم‌افزارها',
      'فعال‌سازی بسیار آسان با یک دستور اختصاصی dnf copr'
    ],
    cons: [
      'مخازن Copr توسط فدورا یا ردهت رسماً بررسی امنیتی و تست سازگاری کامل نمی‌شوند',
      'مسئولیت سلامت پکیج با توسعه‌دهنده شخصی آن است'
    ],
    securityLevel: 'متوسط (وابسته به سازنده)',
    isolationLevel: 'محلی و بومی در کل سیستم',
    steps: [
      {
        stepNumber: 1,
        title: 'فعال‌سازی مخزن Copr مورد نظر',
        description: 'مخزن توسعه‌دهنده مورد اعتماد خود را به سیستم معرفی کنید.',
        command: 'sudo dnf copr enable agriffis/neovim-nightly -y',
        terminalOutputSimulation: `Enabling a Copr repository. Please note that this repository is not part
of the Fedora distribution, and may contain packages not reviewed by Fedora.
Do you really want to enable copr.fedorainfracloud.org/agriffis/neovim-nightly? [y/N]: y
Repository successfully enabled.`,
        explanationTip: 'همیشه قبل از تایید، صفحه پروژه در copr.fedorainfracloud.org را مطالعه کنید.'
      },
      {
        stepNumber: 2,
        title: 'نصب بسته از مخزن جدید',
        description: 'اکنون برنامه درست مانند مخزن رسمی با دستور ساده dnf قابل نصب است.',
        command: 'sudo dnf install neovim -y',
        terminalOutputSimulation: `Installing:
 neovim        x86_64    0.11.0-dev      copr:copr.fedorainfracloud.org:agriffis:neovim-nightly
Complete! Latest Neovim Nightly successfully installed.`,
        explanationTip: 'پکیج‌های مخازن Copr در دستور dnf upgrade نیز خودکار بروز خواهند شد.'
      }
    ],
    verificationCommand: 'nvim --version',
    removalCommand: 'sudo dnf remove neovim && sudo dnf copr disable agriffis/neovim-nightly',
    commonPitfalls: [
      'فعال کردن تعداد زیادی مخازن Copr ناشناخته که ممکن است با پکیج‌های اصلی سیستم تداخل پیدا کنند',
      'فراموش کردن غیرفعال کردن مخزن بعد از تست نرم‌افزار'
    ],
    examplesList: [
      {
        appName: 'مثال ۱: آخرین نسخه توسعه نئوویم (Neovim Nightly)',
        command: 'sudo dnf copr enable agriffis/neovim-nightly -y && sudo dnf install neovim -y',
        description: 'دریافت نسخه پیش‌نمایش ۰.۱۱ نئوویم با جدیدترین قابلیت‌های موتور اسکریپت‌نویسی Lua.'
      },
      {
        appName: 'مثال ۲: ابزار مانیتورینگ منابع سیستمی btop',
        command: 'sudo dnf copr enable atim/btop -y && sudo dnf install btop -y',
        description: 'داشبورد مدرن ترمینال برای مشاهده لحظه‌ای مصرف پردازنده، گرافیک، رم و شبکه.'
      },
      {
        appName: 'مثال ۳: شبیه‌ساز ترمینال مبتنی بر GPU با نام Alacritty',
        command: 'sudo dnf copr enable pschindl/alacritty -y && sudo dnf install alacritty -y',
        description: 'ترمینال فوق‌العاده سریع با شتاب‌دهنده گرافیکی اپن‌جی‌ال برای محیط کاری فدورا.'
      }
    ]
  },
  {
    id: 'appimage',
    titleFa: 'برنامه‌های پرتابل و بدون نصب (AppImage)',
    titleEn: 'AppImage Standalone Portable Executables',
    category: 'sandboxed',
    tool: 'appimage',
    iconName: 'PlaySquare',
    badge: 'پرتابل بدون نیاز به نصب یا دسترسی ریشه',
    summary: 'یک فایل مستقل اجرایی که تمام کتابخانه‌ها و فایل‌های لازم را درون خود فشرده دارد و بدون هیچ نصبی اجرا می‌شود.',
    realWorldAppExample: 'نرم‌افزار طراحی دیجیتال Krita، ویرایشگر Cursor AI، ابزار Ultimaker Cura، شبیه‌سازها',
    whyUseThis: 'نیازی به هیچ تغییری در سیستم‌عامل ندارد، برای اجرا نیازی به رمز عبور sudo ندارد و می‌توانید آن را روی فلش‌مموری همیشه همراه داشته باشید.',
    pros: [
      'کاملاً مستقل و بدون نیاز به نصب یا تغییر در فایل‌های سیستمی',
      'امکان داشتن همزمان چندین نسخه مختلف از یک نرم‌افزار',
      'حذف بسیار آسان: فقط با پاک کردن فایل AppImage!'
    ],
    cons: [
      'به صورت خودکار آیکون آن در منوی برنامه‌های لینوکس اضافه نمی‌شود (مگر با استفاده از ابزار AppImageLauncher)',
      'سیستم بروزرسانی مرکزی ندارد و باید فایل جدید دستی دانلود شود'
    ],
    securityLevel: 'خیلی امن (Sandboxed)',
    isolationLevel: 'پرتابل مجزا',
    steps: [
      {
        stepNumber: 1,
        title: 'دانلود فایل AppImage',
        description: 'دانلود فایل اجرایی نرم‌افزار از سایت رسمی.',
        command: 'wget -O Krita.AppImage https://download.kde.org/stable/krita/5.2.2/krita-5.2.2-x86_64.appimage',
        terminalOutputSimulation: `Resolving download.kde.org... done.
Connecting to download.kde.org... connected.
HTTP request sent, awaiting response... 200 OK
Length: 245389020 (234M) [application/x-executable]
Saving to: ‘Krita.AppImage’
100%[======================================>] 234M  18.4MB/s   in 14s
‘Krita.AppImage’ saved.`,
        explanationTip: 'می‌توانید فایل را در پوشه دلخواه مثلاً ~/Applications ذخیره کنید.'
      },
      {
        stepNumber: 2,
        title: 'اعطای مجوز اجرایی (Executable Permission)',
        description: 'در لینوکس به دلایل امنیتی فایل دانلودی اجازه اجرا ندارد مگر مجوز +x به آن بدهید.',
        command: 'chmod +x Krita.AppImage',
        terminalOutputSimulation: `Permission set: -rwxr-xr-x (Executable flag enabled)`,
        explanationTip: 'این کار از طریق راست‌کلیک روی فایل، Properties و تیک Allow executing file as program نیز شدنی است.'
      },
      {
        stepNumber: 3,
        title: 'اجرای نرم‌افزار',
        description: 'اجرای مستقیم بدون نیاز به دسترسی ادمین.',
        command: './Krita.AppImage',
        terminalOutputSimulation: `Mounting AppImage to /tmp/.mount_KritaXXXXXX...
Launching Krita UI Application...
Krita started successfully.`,
        explanationTip: 'برای یکپارچگی خودکار با منوی استارت فدورا، می‌توانید ابزار AppImageLauncher را نصب کنید.'
      }
    ],
    verificationCommand: 'ls -l Krita.AppImage',
    removalCommand: 'rm -f Krita.AppImage',
    commonPitfalls: [
      'فراموش کردن دستور chmod +x که منجر به ارور "Permission denied" می‌شود',
      'گم کردن مسیر فایل در صورت جابجایی ناخواسته'
    ],
    examplesList: [
      {
        appName: 'مثال ۱: استودیوی طراحی و نقاشی دیجیتال Krita',
        command: 'chmod +x Krita.AppImage && ./Krita.AppImage',
        description: 'اجرای مستقل و سریع کریتا بدون تداخل با پکیج‌های گرافیکی یا کتابخانه‌های Qt سیستم.'
      },
      {
        appName: 'مثال ۲: نرم‌افزار اسلایسر چاپ سه‌بعدی Ultimaker Cura',
        command: 'chmod +x Ultimaker-Cura.AppImage && ./Ultimaker-Cura.AppImage',
        description: 'اسلایسر قدرتمند فایل‌های 3D با پکیجینگ مستقل از نسخه‌های پایتون فدورا.'
      },
      {
        appName: 'مثال ۳: محیط یادداشت‌برداری دانش‌محور Obsidian',
        command: 'chmod +x Obsidian.AppImage && ./Obsidian.AppImage',
        description: 'اجرای بدون نصب کلاینت ابسیدین با قابلیت نگهداری فایل روی درایو رمزنگاری‌شده یا فلش.'
      }
    ]
  },
  {
    id: 'snap-packages',
    titleFa: 'بسته‌های اسنپ در فدورا (Snap / Snapcraft)',
    titleEn: 'Snap Packages on Fedora (snapd)',
    category: 'sandboxed',
    tool: 'snap',
    iconName: 'Box',
    badge: 'بسته فراگیر کانونیکال',
    summary: 'پلتفرم پکیج‌های فراگیر تحت حمایت شرکت Canonical (توسعه‌دهنده اوبونتو) با قابلیت اجرا در فدورا.',
    realWorldAppExample: 'نصب نرم‌افزارهای انحصاری مثل JetBrains IDEs، اسلک (Slack)، مایکروسافت Teams، بیت‌واردن',
    whyUseThis: 'وقتی نرم‌افزاری نسخه Flatpak یا RPM رسمی ندارد، اما سازنده پکیج رسمی در Snap Store منتشر کرده است.',
    pros: [
      'بروزرسانی کاملاً خودکار در پس‌زمینه',
      'ایزوله‌سازی اپلیکیشن و کانفینمنت امنیتی با SELinux/AppArmor'
    ],
    cons: [
      'به صورت پیش‌فرض در فدورا نصب نیست و نیاز به نصب snapd دارد',
      'سرعت اجرای اولیه ممکن است کمی کندتر از نسخه بومی RPM باشد',
      'فلسفه ساختار اسنپ به دلیل سرور مرکزی با سیاست‌های فدورا متفاوت است'
    ],
    securityLevel: 'خیلی امن (Sandboxed)',
    isolationLevel: 'ایزوله در سندباکس',
    steps: [
      {
        stepNumber: 1,
        title: 'نصب سرویس snapd در فدورا',
        description: 'نصب سرویس مدیریت پکیج‌های اسنپ از طریق مخزن رسمی فدورا.',
        command: 'sudo dnf install snapd -y',
        terminalOutputSimulation: `Installing:
 snapd         x86_64    2.63-1.fc41    fedora     17 M
Dependencies resolved.
Complete!`,
        explanationTip: 'سرویس snapd سبک است و سریعاً نصب می‌شود.'
      },
      {
        stepNumber: 2,
        title: 'ایجاد پیوند سیمبلیک /snap (مرحله اجباری در فدورا)',
        description: 'اسنپ برای پشتیبانی از فرمت Classic به مسیر /snap نیاز دارد.',
        command: 'sudo ln -s /var/lib/snapd/snap /snap',
        terminalOutputSimulation: `Created symbolic link: /snap -> /var/lib/snapd/snap`,
        explanationTip: 'این کار یک‌بار برای همیشه انجام می‌شود.'
      },
      {
        stepNumber: 3,
        title: 'نصب نرم‌افزار مورد نظر با snap',
        description: 'نصب برنامه به سادگی و بدون دخالت در بسته‌های اصلی فدورا.',
        command: 'sudo snap install code --classic',
        terminalOutputSimulation: `code 1.95.2 from Visual Studio Code (vscode✓) installed
Channel: stable
Classic confinement enabled`,
        explanationTip: 'کلید classic-- برای ابزارهای برنامه‌نویسی که نیاز به دسترسی فایل‌های توسعه دارند الزامی است.'
      }
    ],
    verificationCommand: 'snap list',
    removalCommand: 'sudo snap remove code',
    commonPitfalls: [
      'فراموش کردن سیمبلیک لینک /snap که باعث ارور در نصب بسته‌های classic می‌شود',
      'ری‌استارت نکردن سشن کاربر که باعث عدم نمایش آیکون برنامه در منوی دسکتاپ می‌شود'
    ],
    examplesList: [
      {
        appName: 'مثال ۱: ویرایشگر Visual Studio Code با دسترسی کلاسیک',
        command: 'sudo snap install code --classic',
        description: 'نصب نسخه اسنپ با سوییچ classic جهت دسترسی کامل به فایل‌های سیستم برای کدنویسی.'
      },
      {
        appName: 'مثال ۲: نرم‌افزار مدیریت پسورد Bitwarden',
        command: 'sudo snap install bitwarden',
        description: 'نصب گاوصندوق رمز عبور بیت‌واردن با بروزرسانی خودکار در پس‌زمینه.'
      },
      {
        appName: 'مثال ۳: پلتفرم تست و توسعه وب‌سرویس Postman',
        command: 'sudo snap install postman',
        description: 'ابزار طراحی و تست APIها با ایزولاسیون کامل و بدون اختلال در بسته‌های فدورا.'
      }
    ]
  },
  {
    id: 'gui-software-center',
    titleFa: 'مرکز نرم‌افزار گرافیکی (GNOME Software / KDE Discover)',
    titleEn: 'Graphical Software Center (Zero Terminal)',
    category: 'core',
    tool: 'gui',
    iconName: 'LayoutGrid',
    badge: 'روش بدون نیاز به کدنویسی (GUI)',
    summary: 'نصب آسان با یک کلیک از طریق رابط گرافیکی فروشگاه نرم‌افزار فدورا بدون نیاز به باز کردن ترمینال.',
    realWorldAppExample: 'نصب انواع ابزارهای روزمره، مرورگرها، بازی‌ها و ابزارهای سیستم برای کاربران تازه‌کار',
    whyUseThis: 'ساده‌ترین و کاربرپسندترین روش برای کسانی که علاقه‌ای به محیط ترمینال و خط فرمان ندارند.',
    pros: [
      'محیط بصری زیبا به همراه تصاویر، امتیاز کاربران و توضیحات به زبان فارسی/انگلیسی',
      'یکپارچگی و ترکیب هوشمند نتایج مخازن RPM فدورا و Flathub در یک پنجره',
      'امکان سوئیچ آسان بین نسخه فلت‌پک و نسخه RPM از طریق منوی کشویی منبع (Source)'
    ],
    cons: [
      'عدم نمایش جزئیات فنی دقیق هنگام بروز خطاهای احتمالی در مقایسه با ترمینال',
      'مصرف حافظه رم بیشتر هنگام اسکن مخازن'
    ],
    securityLevel: 'امن (مخزن رسمی فدورا)',
    isolationLevel: 'محلی و بومی در کل سیستم',
    steps: [
      {
        stepNumber: 1,
        title: 'باز کردن نرم‌افزار Software در فدورا',
        description: 'کلید Super (ویندوز) را فشار دهید و کلمه Software را تایپ کرده و باز کنید.',
        command: '# گام بدون ترمینال: اجرای مستقیم از منوی اپلیکیشن‌های گنوم',
        terminalOutputSimulation: `Opening GNOME Software Center (gnome-software)...
Refreshing metadata from Fedora repositories and Flathub catalog...`,
        explanationTip: 'صفحه اول دسته‌بندی‌های پیشنهادی، بازی‌ها و انتخاب سردبیران را نشان می‌دهد.'
      },
      {
        stepNumber: 2,
        title: 'جستجو و انتخاب منبع نصب (RPM در مقابل Flatpak)',
        description: 'برنامه را جستجو کنید؛ در گوشه بالا سمت راست دکمه‌ای به نام Source وجود دارد که می‌توانید مشخص کنید برنامه به صورت پکیج بومی فدورا یا فلت‌پک نصب شود.',
        command: '# انتخاب Source در صفحه برنامه',
        terminalOutputSimulation: `Source Options:
[●] Flathub (Flatpak) - Sandboxed, Latest features
[ ] Fedora Linux (RPM) - System native, Minimal overhead`,
        explanationTip: 'برای برنامه‌های گرافیکی مدرن ترجیحاً Flathub را انتخاب کنید.'
      },
      {
        stepNumber: 3,
        title: 'کلیک روی دکمه نصب (Install)',
        description: 'فقط دکمه آبی رنگ Install را کلیک کنید و در صورت درخواست سیستم، رمز عبور ورود را وارد کنید.',
        command: '# کلیک روی Install',
        terminalOutputSimulation: `Downloading and installing in background...
Progress: [====================] 100%
App installed and ready to open!`,
        explanationTip: 'پس از اتمام، دکمه به Open تغییر وضعیت می‌دهد.'
      }
    ],
    verificationCommand: 'بررسی در منوی برنامه‌ها و اجرای آن',
    removalCommand: 'کلیک بر روی دکمه سطل زباله / Uninstall در همان صفحه برنامه در Software Center',
    commonPitfalls: [
      'عدم نمایش برنامه‌های غیررایگان اگر مخازن Third-party در تنظیمات فعال نشده باشد',
      'کندی یا لود نشدن در صورت قطع بودن اینترنت حین رفرش اولیه'
    ],
    examplesList: [
      {
        appName: 'مثال ۱: نرم‌افزار طراحی برداری Inkscape',
        command: '# جستجوی Inkscape در نرم‌افزار Software و کلیک روی دکمه Install',
        description: 'نرم‌افزار حرفه‌ای گرافیک برداری متن‌باز با امکان انتخاب نسخه Flathub یا RPM فدورا.'
      },
      {
        appName: 'مثال ۲: ویرایشگر صدا Audacity',
        command: '# جستجوی Audacity در نرم‌افزار Software و کلیک روی دکمه Install',
        description: 'نصب سریع ابزار ضبط و ادیت صوت همراه با پلاگین‌های صوتی از طریق فروشگاه گرافیکی.'
      },
      {
        appName: 'مثال ۳: ماشین حساب همه‌کاره Qalculate!',
        command: '# جستجوی Qalculate در فروشگاه و کلیک روی دکمه Install',
        description: 'قدرتمندترین ماشین حساب علمی و محاسباتی لینوکس با رابط کاربری غنی.'
      }
    ]
  },
  {
    id: 'source-compilation',
    titleFa: 'کامپایل و ساخت مستقیم از سورس کد (Build from Source)',
    titleEn: 'Compiling from Source Code (CMake / Make)',
    category: 'advanced',
    tool: 'source',
    iconName: 'Terminal',
    badge: 'روش حرفه‌ای و توسعه‌دهندگان',
    summary: 'دانلود کد منبع از گیت‌هاب/گیت‌لب، تنظیم پیش‌نیازها و کامپایل بهینه باینری متناسب با پردازنده شما.',
    realWorldAppExample: 'نصب جدیدترین پروژه‌های تحقیقاتی، ابزارهای تخصصی سیستم، درایورهای اختصاصی و پچ‌های بهینه‌سازی',
    whyUseThis: 'وقتی نرم‌افزار هیچ پکیج از پیش ساخته‌شده‌ای برای فدورا ندارد، یا می‌خواهید با پرچم‌های بهینه‌سازی اختصاصی پردازنده (مانند march=native-) حداکثر کارایی را استخراج کنید.',
    pros: [
      'دسترسی به آخرین خط کدهای کامیت شده پروژه در گیت‌هاب قبل از انتشار رسمی',
      'امکان تغییر در کدهای منبع، فعال یا غیرفعال کردن ماژول‌های اختصاصی',
      'بهترین عملکرد اجرایی روی پردازنده اختصاصی شما'
    ],
    cons: [
      'پیچیده‌ترین روش که نیازمند حل دستی بسته‌های پیش‌نیاز توسعه (devel) است',
      'مدیریت بروزرسانی خودکار ندارد و حذف آن نیاز به ساخت مجدد یا ابزار checkinstall دارد'
    ],
    securityLevel: 'نیازمند دقت (دسترسی ریشه)',
    isolationLevel: 'محلی و بومی در کل سیستم',
    steps: [
      {
        stepNumber: 1,
        title: 'نصب ابزارهای پایه بیلد و کامپایل در فدورا',
        description: 'نصب گروه پکیج‌های کامپایلر C/C++، ابزار make، cmake، gcc و ابزارهای هسته‌ای فدورا.',
        command: 'sudo dnf groupinstall "Development Tools" "C Development Tools and Libraries" -y',
        terminalOutputSimulation: `Installing group Development Tools:
 gcc                           x86_64   14.2.1-1.fc41
 g++                           x86_64   14.2.1-1.fc41
 make                          x86_64   4.4.1-3.fc41
 cmake                         x86_64   3.30.3-1.fc41
 automake, autoconf, git       x86_64   ...
Complete! Build environment ready.`,
        explanationTip: 'این ابزارها برای هر نوع کامپایل نرم‌افزاری در فدورا ضروری هستند.'
      },
      {
        stepNumber: 2,
        title: 'کلون کردن کد منبع از گیت‌هاب',
        description: 'دانلود سورس کد پروژه مورد نظر با دستور git clone.',
        command: 'git clone https://github.com/fastfetch-cli/fastfetch.git && cd fastfetch',
        terminalOutputSimulation: `Cloning into 'fastfetch'...
remote: Enumerating objects: 38400, done.
remote: Counting objects: 100% (4200/4200), done.
Receiving objects: 100% (38400/38400), 12.8 MiB | 9.4 MiB/s, done.
Switched to directory: ./fastfetch`,
        explanationTip: 'همیشه فایل README.md یا INSTALL پروژه را برای بررسی نیازمندی‌ها بخوانید.'
      },
      {
        stepNumber: 3,
        title: 'پیکربندی و کامپایل پروژه با CMake',
        description: 'ایجاد دایرکتوری build و شروع فرآیند کامپایل موازی با تمام هسته‌های CPU.',
        command: 'mkdir build && cd build && cmake .. && make -j$(nproc)',
        terminalOutputSimulation: `-- The C compiler identification is GNU 14.2.1
-- Detecting C compiler ABI info - done
-- Check for working C compiler: /usr/bin/cc - works
-- Configuring done
-- Generating done
[ 12%] Building C object src/CMakeFiles/fastfetch.dir/fastfetch.c.o
[ 48%] Building C object src/CMakeFiles/fastfetch.dir/detection/os.c.o
[ 85%] Building C object src/CMakeFiles/fastfetch.dir/modules/cpu.c.o
[100%] Linking C executable fastfetch
[100%] Built target fastfetch successfully.`,
        explanationTip: 'دستور nproc$(j-) باعث می‌شود کامپایل با تمام هسته‌های پردازنده شما به سرعت انجام شود.'
      },
      {
        stepNumber: 4,
        title: 'نصب باینری نهایی در سیستم',
        description: 'کپی کردن باینری و کتابخانه‌ها به مسیر /usr/local/bin.',
        command: 'sudo make install',
        terminalOutputSimulation: `Install the project...
-- Install configuration: "Release"
-- Installing: /usr/local/bin/fastfetch
-- Installing: /usr/local/share/man/man1/fastfetch.1
Complete! Executable placed in /usr/local/bin.`,
        explanationTip: 'فایل‌های نصب دستی همیشه در مسیر /usr/local قرار می‌گیرند تا با پکیج‌های رسمی dnf تداخل نکنند.'
      }
    ],
    verificationCommand: 'fastfetch',
    removalCommand: 'sudo make uninstall (از درون همان پوشه build) یا sudo rm -f /usr/local/bin/fastfetch',
    commonPitfalls: [
      'فراموش کردن بسته‌های -devel پیش‌نیاز که باعث ارور header not found در cmake می‌شود',
      'حذف پوشه سورس قبل از اینکه بعداً بتوانید make uninstall انجام دهید'
    ],
    examplesList: [
      {
        appName: 'مثال ۱: کامپایل ابزار Fastfetch با ابزار مدرن CMake',
        command: 'git clone https://github.com/fastfetch-cli/fastfetch.git && cd fastfetch && mkdir build && cd build && cmake .. && make -j$(nproc) && sudo make install',
        description: 'بیلد موازی کدهای سی با بهینه‌سازی اختصاصی پردازنده و نصب مستقیم در /usr/local/bin.'
      },
      {
        appName: 'مثال ۲: کامپایل داشبورد مانیتورینگ منابع btop با Makefile',
        command: 'git clone https://github.com/aristocratos/btop.git && cd btop && make && sudo make install',
        description: 'ساخت باینری سی‌پلاس‌پلاس btop بدون نیاز به پکیج‌های خارجی و بهره‌مندی از آخرین کامیت‌ها.'
      },
      {
        appName: 'مثال ۳: کامپایل ویرایشگر متنی Micro Editor با زبان Go',
        command: 'git clone https://github.com/zyedidia/micro.git && cd micro && make build && sudo mv micro /usr/local/bin/',
        description: 'بیلد ویرایشگر سبک و ترمینالی مایکرو با پشتیبانی کامل از کلیدهای میانبر استاندارد.'
      }
    ]
  },
  {
    id: 'local-offline-file',
    titleFa: 'سناریو ۱: فایل نصب در کامپیوتر یا لپ‌تاپ موجود است',
    titleEn: 'Installing Local Application Files (.rpm, .AppImage, .flatpak, .tar.gz)',
    category: 'third-party',
    tool: 'localfile',
    iconName: 'HardDrive',
    badge: 'سناریوی ویژه ۱: فایل روی هارد',
    summary: 'راهنمای جامع نصب و اجرای فایلی که از قبل در پوشه دانلودها، روی هارد دیسک یا فلش‌مموری شما قرار دارد بر اساس نوع پسوند فایل.',
    realWorldAppExample: 'نصب فایلهای محلی مثل google-chrome.rpm، پکیج Krita.AppImage، آرشیو tsetup.tar.gz تلگرام، اسکریپت‌های .sh',
    whyUseThis: 'وقتی فایل نصبی را از قبل دارید و نمی‌خواهید دوباره اینترنت مصرف کنید یا می‌خواهید روی سیستم آفلاین نصب انجام دهید.',
    pros: [
      'نصب فوری بدون نیاز به دانلود مجدد فایل حجیم نصبی',
      'پوشش هر دو روش خط فرمان حرفه‌ای و کلیک گرافیکی بدون ترمینال',
      'حل خودکار وابستگی‌های سیستمی توسط DNF در پکیج‌های RPM'
    ],
    cons: [
      'در فایل‌های rpm در صورت کمبود پکیج پیش‌نیاز در سیستم ممکن است اتصال موقت برای واکشی وابستگی‌ها نیاز باشد'
    ],
    securityLevel: 'متوسط (وابسته به سازنده)',
    isolationLevel: 'محلی و بومی در کل سیستم',
    steps: [
      {
        stepNumber: 1,
        title: 'بررسی پسوند فایل موجود در کامپیوتر',
        description: 'ابتدا وارد پوشه محل فایل (مثلاً دانلودها) شوید و نوع پسوند آن را مشخص کنید.',
        command: 'cd ~/Downloads && ls -lh',
        terminalOutputSimulation: `-rw-r--r--. 1 user user 106M Sep 19 14:00 google-chrome.rpm
-rwxr-xr-x. 1 user user 234M Sep 19 14:05 Krita.AppImage
-rw-r--r--. 1 user user  48M Sep 19 14:10 telegram.tar.gz`,
        explanationTip: 'دستور ls -lh حجم و نام فایل‌های پوشه را با خوانایی بالا نمایش می‌دهد.'
      },
      {
        stepNumber: 2,
        title: 'اگر فایل پسوند .rpm دارد: نصب استاندارد با DNF',
        description: 'علامت ./ الزامی است تا DNF متوجه شود فایل در مسیر محلی است و در اینترنت دنبال آن نگردد.',
        command: 'sudo dnf install ./google-chrome.rpm -y',
        terminalOutputSimulation: `Examining ./google-chrome.rpm:
Marking for installation...
Resolving dependencies:
Dependencies resolved.
Installing: google-chrome-stable x86_64
Complete! نرم‌افزار محلی با حل خودکار وابستگی‌ها نصب شد.`,
        explanationTip: 'هرگز از rpm -i استفاده نکنید چون وابستگی‌ها را حل نمی‌کند، همیشه با dnf نصب کنید.'
      },
      {
        stepNumber: 3,
        title: 'اگر فایل پسوند .AppImage دارد: مجوز اجرا و باز کردن فوری',
        description: 'فایل‌های AppImage نیازی به نصب ندارند! فقط مجوز اجرایی داده و مستقیماً باز کنید.',
        command: 'chmod +x ./Krita.AppImage && ./Krita.AppImage',
        terminalOutputSimulation: `Permissions updated: +x (Executable)
Launching portable AppImage...
Application loaded without root permissions!`,
        explanationTip: 'همچنین با راست‌کلیک، Properties و زدن تیک Allow executing as program می‌توانید با دابل کلیک باز کنید.'
      },
      {
        stepNumber: 4,
        title: 'اگر فایل فشرده باینری (.tar.gz) است',
        description: 'فایل را استخراج کرده و به پوشه برنامه‌های کاربر محلی منتقل کنید.',
        command: 'tar -xvf telegram.tar.gz && mkdir -p ~/.local/bin && cp Telegram ~/.local/bin/',
        terminalOutputSimulation: `Extracting: Telegram
Copied executable to ~/.local/bin/Telegram.`,
        explanationTip: 'مسیر ~/.local/bin به طور پیش‌فرض در متغیر PATH فدورا قرار دارد و برنامه از همه‌جا قابل اجراست.'
      }
    ],
    verificationCommand: 'which google-chrome || ls -l ~/.local/bin',
    removalCommand: 'sudo dnf remove <package-name> یا حذف فایل AppImage با دستور rm',
    commonPitfalls: [
      'جا انداختن نقطه اسلش ./ قبل از نام فایل محلی در دستور dnf install',
      'استفاده از دستور منسوخ rpm -i به جای dnf install',
      'فراموش کردن مجوز chmod +x برای فایلهای AppImage یا فایلهای نصاب sh.'
    ],
    examplesList: [
      {
        appName: 'مثال ۱: نصب فایل آفلاین .rpm با DNF',
        command: 'sudo dnf install ./google-chrome-stable_current_x86_64.rpm -y',
        description: 'نصب بسته RPM موجود در پوشه Downloads با حل خودکار کتابخانه‌های محلی و سیستمی فدورا.'
      },
      {
        appName: 'مثال ۲: اجرای فایل پرتابل .AppImage بدون نصب',
        command: 'chmod +x ./Krita-5.2.2-x86_64.appimage && ./Krita-5.2.2-x86_64.appimage',
        description: 'اعطای پرچم مجوز اجرایی به فایل کریتا و راه‌اندازی فوری بدون نیاز به دسترسی کاربر ریشه.'
      },
      {
        appName: 'مثال ۳: استخراج و راه‌اندازی باینری .tar.xz تلگرام دسکتاپ',
        command: 'tar -xf ./tsetup.tar.xz && mkdir -p ~/.local/bin && cp Telegram/Telegram ~/.local/bin/',
        description: 'اکسترکت فایل فشرده باینری و قرار دادن آن در مسیر پیش‌فرض اجرایی کاربر بدون نیاز به روت.'
      }
    ]
  },
  {
    id: 'github-install-url',
    titleFa: 'سناریو ۲: نصب از طریق آدرس فایل در گیت‌هاب (GitHub)',
    titleEn: 'Installing Directly from GitHub URL or Repository',
    category: 'advanced',
    tool: 'github',
    iconName: 'GitBranch',
    badge: 'سناریوی ویژه ۲: آدرس گیت‌هاب',
    summary: 'چگونگی نصب نرم‌افزار زمانی که آدرس گیت‌هاب آن را دارید؛ شامل ترفند نصب مستقیم لینک RPM در DNF، دریافت Releaseها و کلون ریپازیتوری.',
    realWorldAppExample: 'نصب ابزار Fastfetch، کلاینت GitHub Desktop، نرم‌افزارهای مدرن Rust/Go و پروژه‌های متن‌باز',
    whyUseThis: 'توسعه‌دهندگان در گیت‌هاب آخرین نسخه‌ها را در قالب فایل‌های ریلیز یا سورس‌کد می‌گذارند و با فدورا به راحتی قابل نصب است.',
    pros: [
      'ترفند شاهکار فدورا: ارسال مستقیم آدرس اینترنتی فایل RPM گیت‌هاب به DNF بدون دانلود دستی!',
      'دسترسی سریع به جدیدترین آپدیت‌ها پیش از ورود به مخازن اصلی',
      'پشتیبانی از دانلود انواع فایل‌های باینری و سورس کد'
    ],
    cons: [
      'نیازمند اینترنت پایدار و گاهی نصب بسته‌های گروه کامپایلر در صورت بیلد از سورس'
    ],
    securityLevel: 'متوسط (وابسته به سازنده)',
    isolationLevel: 'محلی و بومی در کل سیستم',
    steps: [
      {
        stepNumber: 1,
        title: 'روش اول: نصب مستقیم لینک فایل .rpm از ریلیزهای گیت‌هاب با DNF',
        description: 'آدرس لینک دانلود پکیج .rpm در بخش Releases گیت‌هاب را کپی کرده و مستقیماً به DNF بدهید.',
        command: 'sudo dnf install https://github.com/fastfetch-cli/fastfetch/releases/download/2.30.1/fastfetch-linux-amd64.rpm -y',
        terminalOutputSimulation: `Downloading https://github.com/fastfetch-cli/fastfetch/releases/download/2.30.1/fastfetch-linux-amd64.rpm...
Examining downloaded package: fastfetch-2.30.1.x86_64
Resolving dependencies...
Dependencies resolved.
Installing: fastfetch x86_64
Complete! نرم‌افزار مستقیماً از لینک گیت‌هاب بدون دانلود دستی نصب شد.`,
        explanationTip: 'فدورا به صورت خودکار فایل را در کش موقت دانلود کرده، وابستگی‌ها را حل و نصب می‌کند.'
      },
      {
        stepNumber: 2,
        title: 'روش دوم: دانلود مستقیم فایل باینری/AppImage ریلیز با curl',
        description: 'با دستور curl و پرچم L (برای ریدایرکت‌های گیت‌هاب) فایل را دانلود و مجوز اجرا دهید.',
        command: 'curl -LO https://github.com/user/repo/releases/download/v1.0/app.AppImage && chmod +x app.AppImage',
        terminalOutputSimulation: `  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
100 45.2M  100 45.2M    0     0  12.4M      0  0:00:03  0:00:03 --:--:-- 13.1M
File downloaded and executable permission set.`,
        explanationTip: 'پرچم LO- حیاتی است تا ریدایرکت امنیتی گیت‌هاب دنبال شده و نام فایل حفظ شود.'
      },
      {
        stepNumber: 3,
        title: 'روش سوم: اگر آدرس ریپازیتوری سورس کد است (git clone)',
        description: 'مخزن پروژه را کلون کنید و با ابزارهای استاندارد فدورا کامپایل نمایید.',
        command: 'git clone https://github.com/fastfetch-cli/fastfetch.git && cd fastfetch && mkdir build && cd build && cmake .. && make -j$(nproc)',
        terminalOutputSimulation: `Cloning into 'fastfetch'...
Configuring with CMake...
Compiling objects with $(nproc) threads...
[100%] Built target fastfetch successfully.
Binary ready to run or install via: sudo make install`,
        explanationTip: 'برای نصب ابزارهای بیلد قبل از شروع از دستور sudo dnf groupinstall "Development Tools" استفاده کنید.'
      }
    ],
    verificationCommand: 'fastfetch --version || which app-name',
    removalCommand: 'sudo dnf remove fastfetch یا rm -f app.AppImage',
    commonPitfalls: [
      'کپی کردن لینک صفحه HTML گیت‌هاب به جای لینک دانلود مستقیم فایل باینری در بخش Releases',
      'دانلود با curl بدون سوییچ -L که باعث ذخیره شدن فایل HTML خطای ۳۰۲ به جای فایل اصلی می‌شود',
      'عدم بررسی فایل README.md پروژه گیت‌هاب برای اطلاع از پیش‌نیازهای بیلد'
    ],
    examplesList: [
      {
        appName: 'مثال ۱: نصب مستقیم لینک فایل .rpm ریلیز گیت‌هاب با DNF',
        command: 'sudo dnf install https://github.com/fastfetch-cli/fastfetch/releases/download/2.30.1/fastfetch-linux-amd64.rpm -y',
        description: 'دریافت، بررسی هش، حل وابستگی‌ها و نصب پکیج مستقیماً از URL بخش Releases گیت‌هاب بدون دانلود دستی.'
      },
      {
        appName: 'مثال ۲: دانلود فایل باینری/AppImage با curl و پرچم -LO',
        command: 'curl -LO https://github.com/obsidianmd/obsidian-releases/releases/download/v1.7.7/Obsidian-1.7.7.AppImage && chmod +x Obsidian-1.7.7.AppImage',
        description: 'دانلود ریلیز باینری با رعایت ریدایرکت‌های CDN گیت‌هاب و فعال‌سازی فوری دسترسی اجرایی.'
      },
      {
        appName: 'مثال ۳: کلون سورس پروژه و ساخت با CMake',
        command: 'git clone https://github.com/fastfetch-cli/fastfetch.git && cd fastfetch && mkdir build && cd build && cmake .. && make -j$(nproc)',
        description: 'دریافت کامل آخرین کدهای سورس از مخزن گیت‌هاب و کامپایل بهینه باینری متناسب با سخت‌افزار.'
      }
    ]
  }
];

export const CHEAT_SHEET_COMMANDS: CheatSheetCommand[] = [
  // DNF
  { tool: 'dnf', actionName: 'نصب نرم‌افزار', command: 'sudo dnf install <package-name>', descriptionFa: 'نصب بسته جدید به همراه تمام وابستگی‌های لازم' },
  { tool: 'dnf', actionName: 'جستجوی نرم‌افزار', command: 'dnf search <keyword>', descriptionFa: 'جستجو در نام و توضیحات تمام مخازن فعال' },
  { tool: 'dnf', actionName: 'حذف نرم‌افزار', command: 'sudo dnf remove <package-name>', descriptionFa: 'حذف بسته مشخص شده از سیستم' },
  { tool: 'dnf', actionName: 'بروزرسانی تمام سیستم', command: 'sudo dnf upgrade --refresh', descriptionFa: 'بروزرسانی کش مخازن و ارتقای تمام پکیج‌های فدورا' },
  { tool: 'dnf', actionName: 'بررسی تاریخچه تغییرات', command: 'dnf history', descriptionFa: 'مشاهده لیست تمام عملیات‌های نصب و حذف انجام شده' },
  { tool: 'dnf', actionName: 'بازگردانی یک عملیات (Undo)', command: 'sudo dnf history undo <ID>', descriptionFa: 'برگرداندن تغییرات یک تراکنش خاص در صورت بروز مشکل' },
  { tool: 'dnf', actionName: 'پاکسازی کش سیستم', command: 'sudo dnf clean all', descriptionFa: 'آزاد کردن فضای دیسک با پاک کردن کش فایل‌های دانلودی' },

  // Flatpak
  { tool: 'flatpak', actionName: 'افزودن مخزن فلت‌هاب', command: 'flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo', descriptionFa: 'اضافه کردن مخزن بزرگ Flathub به فدورا' },
  { tool: 'flatpak', actionName: 'جستجو در فلت‌هاب', command: 'flatpak search <app-name>', descriptionFa: 'جستجوی نرم‌افزار برای پیدا کردن App ID' },
  { tool: 'flatpak', actionName: 'نصب برنامه فلت‌پک', command: 'flatpak install flathub <app-id>', descriptionFa: 'نصب ایزوله برنامه (مثلاً com.spotify.Client)' },
  { tool: 'flatpak', actionName: 'اجرای برنامه از ترمینال', command: 'flatpak run <app-id>', descriptionFa: 'اجرای نرم‌افزار فلت‌پک از محیط ترمینال' },
  { tool: 'flatpak', actionName: 'بروزرسانی تمام فلت‌پک‌ها', command: 'flatpak update', descriptionFa: 'بروزرسانی خودکار تمام برنامه‌ها و رانتایم‌های نصب شده' },
  { tool: 'flatpak', actionName: 'حذف داده‌های اضافه و بلااستفاده', command: 'flatpak uninstall --unused', descriptionFa: 'پاک کردن رانتایم‌های قدیمی که دیگر هیچ برنامه‌ای از آن‌ها استفاده نمی‌کند' },

  // RPM
  { tool: 'rpm', actionName: 'نصب صحیح فایل rpm دانلود شده', command: 'sudo dnf install ./<filename>.rpm', descriptionFa: 'حل هوشمند وابستگی‌ها به هنگام نصب فایل محلی' },

  // Copr
  { tool: 'copr', actionName: 'فعال‌سازی مخزن کامیونیتی', command: 'sudo dnf copr enable <author>/<repo>', descriptionFa: 'فعال کردن مخزن بیلد دلخواه از Copr' },
  { tool: 'copr', actionName: 'غیرفعال‌سازی مخزن Copr', command: 'sudo dnf copr disable <author>/<repo>', descriptionFa: 'قطع اتصال مخزن Copr پس از استفاده' },

  // AppImage
  { tool: 'appimage', actionName: 'اجرایی کردن فایل پرتابل', command: 'chmod +x <filename>.AppImage', descriptionFa: 'اعطای دسترسی اجرا به فایل بدون نیاز به روت' },
  { tool: 'appimage', actionName: 'اجرای فایل پرتابل', command: './<filename>.AppImage', descriptionFa: 'اجرای مستقیم نرم‌افزار پرتابل' },

  // Snap
  { tool: 'snap', actionName: 'نصب سرویس اسنپ', command: 'sudo dnf install snapd && sudo ln -s /var/lib/snapd/snap /snap', descriptionFa: 'پیکربندی اولیه سرویس اسنپ روی فدورا' },
  { tool: 'snap', actionName: 'نصب برنامه اسنپ', command: 'sudo snap install <package> --classic', descriptionFa: 'نصب پکیج با دسترسی کلاسیک' },

  // Local File (.rpm, .AppImage, .tar.gz, .flatpak)
  { tool: 'localfile', actionName: 'نصب فایل محلی .rpm با DNF', command: 'sudo dnf install ./<filename>.rpm', descriptionFa: 'نصب بسته RPM موجود روی کامپیوتر با حل هوشمند وابستگی‌ها' },
  { tool: 'localfile', actionName: 'اجرای فایل محلی .AppImage', command: 'chmod +x <filename>.AppImage && ./<filename>.AppImage', descriptionFa: 'دادن مجوز اجرا و اجرای بدون نصب برنامه پرتابل' },
  { tool: 'localfile', actionName: 'نصب باندل آفلاین .flatpak', command: 'flatpak install ./<filename>.flatpak', descriptionFa: 'نصب فایل پکیج فلت‌پک ذخیره‌شده روی سیستم' },
  { tool: 'localfile', actionName: 'استخراج آرشیو باینری .tar.gz', command: 'tar -xvf <archive>.tar.gz', descriptionFa: 'استخراج برنامه باینری یا سورس محلی' },

  // GitHub URL & Releases
  { tool: 'github', actionName: 'نصب مستقیم لینک RPM از گیت‌هاب', command: 'sudo dnf install https://github.com/<user>/<repo>/releases/download/<tag>/<file>.rpm', descriptionFa: 'نصب مستقیم آدرس پکیج ریلیز گیت‌هاب بدون نیاز به دانلود دستی' },
  { tool: 'github', actionName: 'دانلود فایل باینری/AppImage از گیت‌هاب', command: 'curl -LO https://github.com/<user>/<repo>/releases/download/<tag>/<file>', descriptionFa: 'دریافت فایل باینری از گیت‌هاب با دنبال کردن ریدایرکت‌های امنیتی' },
  { tool: 'github', actionName: 'کلون سورس کد از گیت‌هاب', command: 'git clone https://github.com/<user>/<repo>.git && cd <repo>', descriptionFa: 'دریافت کل مخزن کد من پروژه برای کامپایل یا مطالعه' },
  { tool: 'github', actionName: 'دانلود ریلیز با GitHub CLI', command: 'gh release download --repo <user>/<repo> -p "*.rpm"', descriptionFa: 'دریافت خودکار ریلیزها با ابزار رسمی gh فدورا' }
];

export const DECISION_TREE: DecisionNode[] = [
  {
    id: 'start',
    questionFa: 'چه نوع برنامه‌ای را می‌خواهید روی فدورا نصب کنید؟',
    subtitleFa: 'با پاسخ به این چند سوال کوتاه، بهترین و پایدارترین روش نصب متناسب با نرم‌افزار شما پیشنهاد داده می‌شود.',
    options: [
      {
        textFa: 'یک برنامه گرافیکی روزمره دسکتاپ (مانند اسپاتیفای، دیسکورد، تلگرام یا مرورگر)',
        hintFa: 'برنامه‌های کاربری عمومی با پنجره گرافیکی',
        nextId: 'desktop-type'
      },
      {
        textFa: 'یک ابزار سیستمی، کتابخانه یا ابزار خط فرمان (CLI مانند Git, Python, Docker, Htop)',
        hintFa: 'ابزارهایی که با سیستم و کرنل سر و کار دارند',
        recommendedTool: 'dnf',
        recommendedScenarioId: 'dnf-official',
        reasonFa: 'برای ابزارهای خط فرمان و سرویس‌های سیستمی، مدیر بسته DNF مخازن رسمی فدورا بیشترین هماهنگی، سرعت و کارایی بدون سرریز حافظه را فراهم می‌کند.'
      },
      {
        textFa: 'کدک‌های چندرسانه‌ای یا درایور گرافیک اختصاصی Nvidia',
        hintFa: 'پخش فایل‌های ویدیویی، گیمینگ، استیم',
        recommendedTool: 'rpmfusion',
        recommendedScenarioId: 'rpm-fusion',
        reasonFa: 'فدورا به طور پیش‌فرض کدک‌های تصویری انحصاری و درایور انویدیا را ندارد و باید یک‌بار مخازن مکمل RPM Fusion را فعال کنید.'
      },
      {
        textFa: 'یک برنامه پرتابل که نمی‌خواهم در سیستم نصب شود یا نیاز به رمز عبور روت ندارد',
        hintFa: 'فایل مستقل اجرایی',
        recommendedTool: 'appimage',
        recommendedScenarioId: 'appimage',
        reasonFa: 'فرمت AppImage بدون نیاز به روت اجرا می‌شود و هیچ اثری در فایل‌های ریشه سیستم‌عامل نمی‌گذارد.'
      },
      {
        textFa: 'فایل نصب نرم‌افزار از قبل در کامپیوتر یا لپ‌تاپ من موجود است (.rpm، .AppImage، .flatpak یا .tar.gz)',
        hintFa: 'سناریوی ویژه ۱: فایل روی هارد، دانلودها یا فلش مموری است',
        recommendedTool: 'localfile',
        recommendedScenarioId: 'local-offline-file',
        reasonFa: 'با دستور sudo dnf install ./file.rpm یا chmod +x برای AppImage می‌توانید فایل موجود در سیستم را بدون مصرف مجدد ترافیک نصب و اجرا کنید.'
      },
      {
        textFa: 'آدرس فایل یا مخزن نرم‌افزار در گیت‌هاب (GitHub) را دارم',
        hintFa: 'سناریوی ویژه ۲: لینک مستقیم ریلیز یا ریپازیتوری سورس کد',
        recommendedTool: 'github',
        recommendedScenarioId: 'github-install-url',
        reasonFa: 'فدورا قابلیت کم‌نظیری دارد که می‌توانید آدرس مستقیم پکیج rpm در گیت‌هاب را به sudo dnf install بدهید تا بدون دانلود دستی نصب شود، یا با git clone سورس را دریافت کنید.'
      }
    ]
  },
  {
    id: 'desktop-type',
    questionFa: 'آیا این نرم‌افزار اختصاصی/توسعه‌دهنده تجاری است یا ابزار رسمی گنوم/فدورا؟',
    subtitleFa: 'تفکیک بین نرم‌افزارهای مالکیتی (Proprietary) و نرم‌افزارهای پیش‌فرض محیط دسکتاپ',
    options: [
      {
        textFa: 'نرم‌افزار معروفی چون Spotify, Discord, Telegram, Steam, Obsidian, VS Code',
        hintFa: 'سندباکس فلت‌پک توصیه اول است',
        recommendedTool: 'flatpak',
        recommendedScenarioId: 'flatpak-flathub',
        reasonFa: 'بهترین انتخاب برای برنامه‌های معروف Flatpak از مخزن Flathub است؛ زیرا توسط توسعه‌دهندگان مستقیماً تست و آپدیت می‌شود و در محیط امن سندباکس اجرا می‌گردد.'
      },
      {
        textFa: 'فقط یک فایل .rpm از سایت شرکت سازنده (مثل Google Chrome یا Zoom) دانلود کرده‌ام',
        hintFa: 'فایل آماده دانلودی روی سیستم موجود است',
        recommendedTool: 'rpm',
        recommendedScenarioId: 'rpm-direct',
        reasonFa: 'با دستور "sudo dnf install ./file.rpm" می‌توانید پکیج را با حل اتوماتیک تمام پیش‌نیازها به بهترین شکل نصب کنید.'
      },
      {
        textFa: 'نرم‌افزار خیلی جدید یا نسخه‌ای خاص است که در مخازن عادی نیست اما سازنده مخزن Copr دارد',
        hintFa: 'مخزن توسعه‌دهندگان جامعه کاربری فدورا',
        recommendedTool: 'copr',
        recommendedScenarioId: 'fedora-copr',
        reasonFa: 'مخزن Copr معادل PPA است و با "sudo dnf copr enable" به سرعت قابل استفاده است.'
      }
    ]
  }
];
