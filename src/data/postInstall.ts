import { PostInstallTask } from '../types';

export const POST_INSTALL_TASKS: PostInstallTask[] = [
  {
    id: 'speedup-dnf',
    stepNumber: 1,
    titleFa: '۱. بهینه‌سازی و چندبرابر کردن سرعت دانلود DNF / DNF5',
    titleEn: 'Accelerate DNF Download Speed & Mirrors',
    category: 'speed',
    priority: 'ضروری',
    summaryFa: 'به‌طور پیش‌فرض DNF بسته‌ها را یکی‌یکی دانلود می‌کند. با این تنظیم، دانلودها ۱۰ رشته‌ای، همزمان و از نزدیک‌ترین آینه سرور انجام می‌شوند.',
    whyNeededFa: 'سرعت دانلود پیش‌فرض فدورا برای کاربران ایرانی ممکن است کند باشد؛ فعال کردن ۱۰ دانلود همزمان سرعت را تا ۵ برابر افزایش می‌دهد.',
    primaryCommand: 'echo -e "max_parallel_downloads=10\\nfastestmirror=True\\ndefaultyes=True" | sudo tee -a /etc/dnf/dnf.conf',
    verificationCommand: 'cat /etc/dnf/dnf.conf',
    tipsFa: [
      'مقدار max_parallel_downloads=10 باعث دانلود همزمان ۱۰ پکیج می‌شود.',
      'دستور fastestmirror سرورهای آینه را پینگ کرده و سریع‌ترین سرور را انتخاب می‌کند.',
      'دستور defaultyes=True کلید پیش‌فرض تأیید [Y/n] را روی بله می‌گذارد تا نیاز به تایپ دستی مداوم نباشد.'
    ],
    examples: [
      {
        title: 'مثال ۱: فعال‌سازی ۱۰ دانلود موازی در فدورا',
        command: 'echo "max_parallel_downloads=10" | sudo tee -a /etc/dnf/dnf.conf',
        description: 'دانلود موازی چند بسته همزمان به جای دانلود ترتیبی و کند تک‌تک بسته‌ها',
        simulatedOutput: `max_parallel_downloads=10
Configuration updated in /etc/dnf/dnf.conf. Parallel downloads enabled.`
      },
      {
        title: 'مثال ۲: انتخاب خودکار سریع‌ترین آینه سرور (Fastest Mirror)',
        command: 'echo "fastestmirror=True" | sudo tee -a /etc/dnf/dnf.conf',
        description: 'پینگ خودکار نزدیک‌ترین سرور آینه فدورا جهت کاهش تاخیر شبکه',
        simulatedOutput: `fastestmirror=True
Determining fastest mirrors...
* fedora: mirror.cedia.org.ec (Selected)`
      },
      {
        title: 'مثال ۳: بررسی فایل پیکربندی DNF پس از اعمال',
        command: 'grep -E "max_parallel|fastest" /etc/dnf/dnf.conf',
        description: 'تایید ثبت تنظیمات سرعت درون فایل تنظیمات هسته‌ای DNF',
        simulatedOutput: `max_parallel_downloads=10
fastestmirror=True
defaultyes=True`
      }
    ]
  },
  {
    id: 'system-upgrade',
    stepNumber: 2,
    titleFa: '۲. به‌روزرسانی کامل اولیه سیستم و فریمورها',
    titleEn: 'Initial Full System & Firmware Update',
    category: 'speed',
    priority: 'ضروری',
    summaryFa: 'تازه‌سازی کش مخازن و به‌روزرسانی تمام پکیج‌های پیش‌فرض و دریافت وصله‌های امنیتی منتشرشده پس از انتشار ایمیج ISO.',
    whyNeededFa: 'ایمیج ISO فدورا معمولاً چند هفته یا ماه قبل کامپایل شده و بلافاصله پس از نصب باید آپدیت‌های امنیتی دریافت شوند.',
    primaryCommand: 'sudo dnf upgrade --refresh -y && fwupdmgr refresh && fwupdmgr get-updates',
    verificationCommand: 'uname -r && dnf check-update',
    tipsFa: [
      'سوییچ --refresh تضمین می‌کند کش محلی به اجبار با آخرین لیست سرور بروز شود.',
      'ابزار fwupdmgr آپدیت‌های فریمور سخت‌افزار (بایوس مادربورد، تاچ‌پد، وای‌فای) را بررسی می‌کند.',
      'در صورت آپدیت شدن هسته (Kernel)، پس از پایان عملیات سیستم را ری‌استارت کنید.'
    ],
    examples: [
      {
        title: 'مثال ۱: آپدیت اجباری تمام مخازن و سیستم با DNF',
        command: 'sudo dnf upgrade --refresh -y',
        description: 'دریافت آخرین وصله‌های امنیتی و پکیج‌های کرنل لینوکس',
        simulatedOutput: `Refreshing metadata: fedora, updates...
Upgrading: 42 packages.
Kernel updated to 6.11.3-300.fc41.x86_64
Complete!`
      },
      {
        title: 'مثال ۲: بررسی و به‌روزرسانی فریمور سخت‌افزار با fwupd',
        command: 'fwupdmgr refresh && fwupdmgr get-updates',
        description: 'بررسی آپدیت بایوس و کنترلرهای سخت‌افزاری متصل به سیستم',
        simulatedOutput: `Updating lvfs metadata...
Device: Intel ME Firmware [New version 16.1.30 available]
Run 'fwupdmgr update' to apply hardware firmware.`
      },
      {
        title: 'مثال ۳: مشاهده نسخه کرنل فعال و تاریخ انتشار',
        command: 'uname -r -v',
        description: 'بررسی نسخه فعال هسته لینوکس فدورا',
        simulatedOutput: `6.11.3-300.fc41.x86_64 #1 SMP PREEMPT_DYNAMIC Sun Sep 15 13:42:01 UTC 2026`
      }
    ]
  },
  {
    id: 'rpmfusion-enable',
    stepNumber: 3,
    titleFa: '۳. فعال‌سازی مخازن حیاتی RPM Fusion (Free و Non-Free)',
    titleEn: 'Enable RPM Fusion Repositories (Free & Non-Free)',
    category: 'repositories',
    priority: 'بسیار مهم',
    summaryFa: 'مهم‌ترین مخزن جانبی فدورا که شامل کدک‌های چندرسانه‌ای، درایورهای گرافیک انویدیا، Steam و نرم‌افزارهای تجاری است.',
    whyNeededFa: 'فدورا به دلیل تعهد سخت‌گیرانه به نرم‌افزارهای ۱۰۰٪ آزاد، کدک‌های مالکیتی را به طور پیش‌فرض ندارد؛ RPM Fusion این خلا را کاملاً پر می‌کند.',
    primaryCommand: 'sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm -y',
    verificationCommand: 'dnf repolist | grep rpmfusion',
    tipsFa: [
      'مخزن Free شامل نرم‌افزارهای منبع‌بازی است که به علت محدودیت پتنت در آمریکا درون فدورا قرار نگرفته‌اند.',
      'مخزن Non-Free شامل نرم‌افزارهای اختصاصی مانند درایور انویدیا و استیم است.',
      'دستور (rpm -E %fedora)$ به صورت خودکار نسخه فدورای شما را تشخیص می‌دهد.'
    ],
    examples: [
      {
        title: 'مثال ۱: نصب همزمان مخازن آزاد و غیرآزاد RPM Fusion',
        command: 'sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm -y',
        description: 'فعال‌سازی دسترسی به صدها پکیج مالتی‌مدیا و درایورهای سخت‌افزاری',
        simulatedOutput: `Installing:
 rpmfusion-free-release-41-1.noarch
 rpmfusion-nonfree-release-41-1.noarch
Importing GPG signing keys...
Complete! RPM Fusion is now registered.`
      },
      {
        title: 'مثال ۲: فعال‌سازی داده‌های AppStream برای نمایش در نرم‌افزار گنوم',
        command: 'sudo dnf groupupdate core -y',
        description: 'همگام‌سازی اپلیکیشن‌های RPM Fusion با نرم‌افزار گرافیکی GNOME Software',
        simulatedOutput: `Updating AppStream metadata for RPM Fusion...
Metadata generated for 1,420 desktop applications.`
      },
      {
        title: 'مثال ۳: بررسی وضعیت فعال بودن مخازن در فدورا',
        command: 'dnf repolist | grep rpmfusion',
        description: 'اطمینان از فعال بودن مخزن‌های Free و Non-Free',
        simulatedOutput: `rpmfusion-free           RPM Fusion for Fedora 41 - Free
rpmfusion-free-updates   RPM Fusion for Fedora 41 - Free - Updates
rpmfusion-nonfree        RPM Fusion for Fedora 41 - Non-free
rpmfusion-nonfree-updates RPM Fusion for Fedora 41 - Non-free - Updates`
      }
    ]
  },
  {
    id: 'multimedia-codecs',
    stepNumber: 4,
    titleFa: '۴. نصب کامل کدک‌های چندرسانه‌ای صوتی و تصویری (FFmpeg & Codecs)',
    titleEn: 'Install Complete Audio & Video Codecs',
    category: 'codecs',
    priority: 'ضروری',
    summaryFa: 'جایگزینی پکیج محدود ffmpeg-free با نسخه فول FFmpeg و نصب پلاگین‌های ویدیویی GStreamer برای پخش ویدیوهای وب و فرمت‌های MP4، H.264، H.265 و AAC.',
    whyNeededFa: 'بدون این مرحله، ویدیوهای توییتر، یوتیوب، فیلم‌های دانلودی و موزیک‌های AAC در فایرفاکس یا ویدیوپلیرها با صفحه سیاه و خطای فرمت مواجه می‌شوند.',
    primaryCommand: 'sudo dnf swap ffmpeg-free ffmpeg --allowerasing -y && sudo dnf groupupdate multimedia --setop="install_weak_deps=False" --exclude=PackageKit-gstreamer-plugin -y && sudo dnf groupupdate sound-and-video -y',
    verificationCommand: 'ffmpeg -version | head -n 1 && dnf list installed | grep ffmpeg',
    tipsFa: [
      'دستور dnf swap بسته خردشده و محدود پیش‌فرض فدورا را با نسخه اصلی FFmpeg جابجا می‌کند.',
      'سوییچ --allowerasing برای حل تداخل پکیج‌های کتابخانه‌ای قدیمی الزامی است.',
      'دستور groupupdate تمام پلاگین‌های صوتی/تصویری مانند gstreamer1-plugins-ugly را یکجا نصب می‌کند.'
    ],
    examples: [
      {
        title: 'مثال ۱: جابجایی بسته محدود فدورا با FFmpeg کامل',
        command: 'sudo dnf swap ffmpeg-free ffmpeg --allowerasing -y',
        description: 'فعال‌سازی دیکودرهای سخت‌افزاری H.264 و H.265 و فرمت‌های MP4 و MKV',
        simulatedOutput: `Removing: ffmpeg-free (crippled)
Installing: ffmpeg x86_64 7.0.2 (full codecs enabled)
Complete! FFmpeg with full proprietary codec support active.`
      },
      {
        title: 'مثال ۲: نصب پلاگین‌های ویدیویی مرورگر و GStreamer',
        command: 'sudo dnf install gstreamer1-plugins-bad-freeworld gstreamer1-plugins-ugly gstreamer1-vaapi -y',
        description: 'رفع مشکل عدم پخش ویدیو در مرورگر فایرفاکس و پخش‌کننده فیلم پیش‌فرض',
        simulatedOutput: `Installing:
 gstreamer1-plugins-bad-freeworld x86_64
 gstreamer1-plugins-ugly          x86_64
 gstreamer1-vaapi                 x86_64
Complete! Web video playback is fully functional.`
      },
      {
        title: 'مثال ۳: فعال‌سازی شتاب‌دهنده سخت‌افزاری اینتل/AMD (کاهش مصرف باتری)',
        command: 'sudo dnf install intel-media-driver libva-utils -y && vainfo',
        description: 'تست درایور VA-API جهت پردازش ویدیو با کارت گرافیک به جای پردازنده اصلی',
        simulatedOutput: `Trying display: wayland
vaInitialize: VA-API version: 1.22 (libva 2.22.0)
va_openDriver(): Opened /usr/lib64/dri/iHD_drv_video.so
VAProfileH264Main : VAEntrypointVLD (Hardware Accelerated)`
      }
    ]
  },
  {
    id: 'flathub-enable',
    stepNumber: 5,
    titleFa: '۵. فعال‌سازی مخزن کامل Flathub در فلت‌پک',
    titleEn: 'Enable Complete Flathub Repository for Flatpak',
    category: 'repositories',
    priority: 'ضروری',
    summaryFa: 'فدورا به طور پیش‌فرض فقط تعداد معدودی نرم‌افزار را از Flathub فیلتر و ارائه می‌کند؛ این دستور مخزن بدون فیلتر و کامل Flathub را فعال می‌سازد.',
    whyNeededFa: 'دسترسی امن و سندباکس به هزاران برنامه کاربردی مانند تلگرام، اسپاتیفای، دیسکورد، VS Code و OBS Studio بدون دستکاری فایل‌های روت سیستم.',
    primaryCommand: 'flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo',
    verificationCommand: 'flatpak remotes',
    tipsFa: [
      'این کار نرم‌افزارها را در محیط ایزوله سندباکس اجرا می‌کند که امنیت بالاتری نسبت به بسته‌های سنتی دارد.',
      'نرم‌افزارهای فلت‌پک پس از فعال‌سازی این مخزن مستقیماً در نرم‌افزار GNOME Software قابل جستجو می‌شوند.',
      'برای مدیریت مجوزهای فلت‌پک می‌توانید برنامه Flatseal را نصب کنید.'
    ],
    examples: [
      {
        title: 'مثال ۱: ثبت رسمی آدرس مخزن جامع Flathub',
        command: 'flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo',
        description: 'اتصال به ریپازیتوری مرکزی تمام اپلیکیشن‌های دسکتاپ لینوکس',
        simulatedOutput: `Remote 'flathub' added successfully.
Metadata pulled from https://dl.flathub.org/repo/flathub.flatpakrepo`
      },
      {
        title: 'مثال ۲: نصب ابزار مدیریت دسترسی برنامه‌ها (Flatseal)',
        command: 'flatpak install flathub com.github.tchx84.Flatseal -y',
        description: 'مدیریت گرافیکی مجوزهای وبکم، میکروفون، اینترنت و فایل‌ها برای برنامه‌ها',
        simulatedOutput: `Installing: com.github.tchx84.Flatseal/x86_64/stable from flathub
Installation complete.`
      },
      {
        title: 'مثال ۳: مشاهده لیست مخازن فلت‌پک فعال روی سیستم',
        command: 'flatpak remotes',
        description: 'اطمینان از وجود مخزن رسمی flathub در کنار مخزن فدورا',
        simulatedOutput: `Name    Options
fedora  system,oci
flathub system`
      }
    ]
  },
  {
    id: 'gnome-tweaks-fonts',
    stepNumber: 6,
    titleFa: '۶. ابزارهای شخصی‌سازی، فونت استاندارد فارسی و افزونه‌ها',
    titleEn: 'GNOME Tweaks, Vazirmatn Persian Font & Extensions',
    category: 'tweaks',
    priority: 'بسیار مهم',
    summaryFa: 'نصب ابزار GNOME Tweaks، دکمه‌های پنجره (مینیمایز و ماکسیمایز)، ابزار مدیریت افزونه‌ها و نصب فونت فارسی زیبای وزیرمتن.',
    whyNeededFa: 'فدورا به طور پیش‌فرض دکمه Minimize ندارد و فونت پیش‌فرض عربی/فارسی آن برای وبگردی و تایپ چندان چشم‌نواز نیست.',
    primaryCommand: 'sudo dnf install gnome-tweaks gnome-extensions-app -y && gsettings set org.gnome.desktop.wm.preferences button-layout ":minimize,maximize,close"',
    verificationCommand: 'gnome-tweaks --version && gsettings get org.gnome.desktop.wm.preferences button-layout',
    tipsFa: [
      'دستور gsettings دکمه‌های کمینه‌سازی و بیشینه‌سازی پنجره را فوراً فعال می‌کند.',
      'برنامه Extension Manager امکان نصب افزونه‌های Dash to Dock و AppIndicator را بدون نیاز به مرورگر فراهم می‌سازد.',
      'فونت فارسی وزیرمتن (Vazirmatn) خوانایی متون فارسی را در کل سیستم‌عامل فوق‌العاده افزایش می‌دهد.'
    ],
    examples: [
      {
        title: 'مثال ۱: فعال‌سازی دکمه‌های Minimize و Maximize در پنجره‌های فدورا',
        command: 'gsettings set org.gnome.desktop.wm.preferences button-layout ":minimize,maximize,close"',
        description: 'افزودن دکمه‌های کنترل پنجره به سبک استاندارد دسکتاپ',
        simulatedOutput: `Window buttons updated: Minimize, Maximize, Close enabled instantly.`
      },
      {
        title: 'مثال ۲: نصب فونت فارسی استاندارد وزیرمتن (Vazirmatn)',
        command: 'sudo dnf install fira-code-fonts -y && mkdir -p ~/.local/share/fonts && curl -sSL https://raw.githubusercontent.com/rastikerdar/vazirmatn/master/fonts/web/Vazirmatn-Regular.woff2 -o ~/.local/share/fonts/Vazirmatn.woff2 && fc-cache -f -v',
        description: 'بهبود تایپوگرافی فارسی در مرورگر، ترمینال و محیط کاربری فدورا',
        simulatedOutput: `/home/user/.local/share/fonts: caching, new cache contents: 1 fonts
fc-cache: succeeded. Vazirmatn Persian font activated.`
      },
      {
        title: 'مثال ۳: نصب ابزار گرافیکی مدیریت افزونه‌های گنوم',
        command: 'flatpak install flathub com.mattjakeman.ExtensionManager -y',
        description: 'نصب افزونه‌هایی مانند Dash to Dock، Blur my Shell و Tray Icons',
        simulatedOutput: `Installing: com.mattjakeman.ExtensionManager from flathub
Extension Manager installed.`
      }
    ]
  },
  {
    id: 'nvidia-gaming',
    stepNumber: 7,
    titleFa: '۷. درایورهای اختصاصی کارت گرافیک انویدیا و گیمینگ',
    titleEn: 'NVIDIA Drivers (akmod) & Gaming Stack',
    category: 'drivers',
    priority: 'پیشنهادی',
    summaryFa: 'برای دارندگان لپ‌تاپ یا کامپیوتر دارای کارت گرافیک NVIDIA: نصب خودکار ماژول کرنل Akmod و کتابخانه‌های شتاب‌دهنده CUDA و بازی.',
    whyNeededFa: 'درایور پیش‌فرض متن‌باز Nouveau فاقد شتاب گرافیکی سه‌بعدی قوی است و برای کارهای گرافیکی و بازی به درایور رسمی انویدیا نیاز است.',
    primaryCommand: 'sudo dnf install akmod-nvidia xorg-x11-drv-nvidia-cuda xorg-x11-drv-nvidia-cuda-libs -y',
    verificationCommand: 'modinfo -F version nvidia || nvidia-smi',
    tipsFa: [
      'پکیج akmod به طور خودکار با هر آپدیت کرنل، ماژول انویدیا را بازسازی می‌کند تا سیستم در بوت خراب نشود.',
      'پس از نصب، حدود ۵ دقیقه صبر کنید تا پروسه kmods background build تمام شود، سپس سیستم را ری‌استارت کنید.',
      'اگر کارت گرافیک اینتل یا AMD رادئون دارید، نیازی به این مرحله ندارید چون درایور آن‌ها در هسته لینوکس تعبیه شده است.'
    ],
    examples: [
      {
        title: 'مثال ۱: نصب درایور Akmod انویدیا و کتابخانه‌های ۳۲ بیتی بازی',
        command: 'sudo dnf install akmod-nvidia xorg-x11-drv-nvidia-cuda xorg-x11-drv-nvidia-cuda-libs.i686 -y',
        description: 'آماده‌سازی کارت گرافیک برای رندر سه‌بعدی و استیم',
        simulatedOutput: `Installing: akmod-nvidia, xorg-x11-drv-nvidia
Building /var/cache/akmods/nvidia/...
Kernel module compiled successfully for current kernel.`
      },
      {
        title: 'مثال ۲: بررسی کامپایل موفق ماژول کرنل قبل از ری‌استارت',
        command: 'akmods --dry-run',
        description: 'اطمینان از آماده بودن ماژول گرافیکی قبل از خاموش کردن سیستم',
        simulatedOutput: `Checking kmods exist for 6.11.3-300.fc41.x86_64 [  OK  ]
NVIDIA kernel module ready.`
      },
      {
        title: 'مثال ۳: اجرای دستور وضعیت کارت گرافیک و مانیتورینگ دما',
        command: 'nvidia-smi',
        description: 'نمایش مشخصات پردازنده گرافیکی، نسخه درایور و رم ویدیو',
        simulatedOutput: `+-----------------------------------------------------------------------------------------+
| NVIDIA-SMI 560.35.03              Driver Version: 560.35.03      CUDA Version: 12.6     |
| GPU  Name                 Persistence-M | Bus-Id          Disp.A | Volatile Uncorr. ECC |
|   0  NVIDIA GeForce RTX 4060 Laptop GPU | 00000000:01:00.0   Off |                  N/A |
| 45C    P8             12W /  115W |      18MiB /  8188MiB |      0%      Default |`
      }
    ]
  },
  {
    id: 'btrfs-battery-backup',
    stepNumber: 8,
    titleFa: '۸. بهینه‌سازی مصرف باتری لپ‌تاپ و اسنپ‌شات‌های Btrfs',
    titleEn: 'Battery Life Optimization & Btrfs Auto-Snapshots',
    category: 'backup',
    priority: 'پیشنهادی',
    summaryFa: 'بهینه‌سازی مصرف انرژی لپ‌تاپ و تنظیم سیستم بکاپ اسنپ‌شات Btrfs با Snapper برای بازگردانی سیستم در صورت بروز هرگونه مشکل در چند ثانیه.',
    whyNeededFa: 'فدورا به طور پیش‌فرض روی فایل‌سیستم مدرن Btrfs نصب می‌شود که بدون اشغال فضای زیاد می‌تواند قبل از هر آپدیت یک عکس لحظه‌ای از سیستم ذخیره کند.',
    primaryCommand: 'sudo dnf install snapper btrfs-assistant -y',
    verificationCommand: 'btrfs subvolume list / && snapper list-configs',
    tipsFa: [
      'ابزار Btrfs Assistant محیط گرافیکی ساده‌ای برای مشاهده و بازگردانی اسنپ‌شات‌ها فراهم می‌کند.',
      'سرویس power-profiles-daemon به طور پیش‌فرض در فدورا فعال است و با اسلایدر بالای صفحه می‌توانید حالت Power Saver را انتخاب کنید.',
      'با دستور snapper create -d "Before-Update" یک نقطه بازیابی فوری بسازید.'
    ],
    examples: [
      {
        title: 'مثال ۱: نصب ابزار مدیریت اسنپ‌شات فایل‌سیستم Btrfs',
        command: 'sudo dnf install snapper btrfs-assistant -y',
        description: 'راه‌اندازی سیستم اسنپ‌شات خودکار قبل از هر عملیات DNF',
        simulatedOutput: `Installing: snapper, btrfs-assistant
Configuring snapper for root filesystem subvolume...
Complete!`
      },
      {
        title: 'مثال ۲: ایجاد یک اسنپ‌شات فوری دستی قبل از تست نرم‌افزار',
        command: 'sudo snapper create -c root -d "Manual snapshot before testing software"',
        description: 'ذخیره فوری وضعیت سیستم؛ در کمتر از ۱ ثانیه بدون اشغال حجم اضافی',
        simulatedOutput: `Snapshot created with ID: 14 (type: single, cleanup: number)`
      },
      {
        title: 'مثال ۳: تنظیم حالت ذخیره انرژی باتری در لپ‌تاپ',
        command: 'powerprofilesctl set power-saver && powerprofilesctl get',
        description: 'کاهش کلاک CPU برای افزایش طول عمر باتری لپ‌تاپ در مسافرت',
        simulatedOutput: `Profile switched to: power-saver`
      }
    ]
  }
];

export const MASTER_POST_INSTALL_SCRIPT = `#!/usr/bin/env bash
# اسکریپت جامع و خودکار راه‌اندازی پس از نصب لینوکس فدورا
# Fedora Linux Post-Installation Master Setup Script
set -e

echo "🚀 شروع پیکربندی سریع فدورا لینوکس..."

# ۱. افزایش سرعت دانلود DNF
echo "⚡ ۱/۶. بهینه‌سازی سرعت دانلود DNF..."
sudo tee -a /etc/dnf/dnf.conf > /dev/null <<EOT
max_parallel_downloads=10
fastestmirror=True
defaultyes=True
EOT

# ۲. فعال‌سازی مخازن RPM Fusion
echo "📦 ۲/۶. فعال‌سازی مخازن RPM Fusion (Free & Non-Free)..."
sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm \\
  https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm -y

# ۳. نصب بسته کامل کدک‌های چندرسانه‌ای
echo "🎬 ۳/۶. نصب کامل کدک‌های صوتی و تصویری FFmpeg..."
sudo dnf swap ffmpeg-free ffmpeg --allowerasing -y
sudo dnf groupupdate multimedia --setop="install_weak_deps=False" --exclude=PackageKit-gstreamer-plugin -y
sudo dnf groupupdate sound-and-video -y

# ۴. فعال‌سازی کامل مخزن Flathub
echo "🌐 ۴/۶. فعال‌سازی مخزن Flathub در فلت‌پک..."
flatpak remote-add --if-not-exists flathub https://dl.flathub.org/repo/flathub.flatpakrepo

# ۵. ابزارهای شخصی‌سازی و دکمه‌های پنجره
echo "🎨 ۵/۶. نصب GNOME Tweaks و فعال‌سازی دکمه‌های Minimize/Maximize..."
sudo dnf install gnome-tweaks gnome-extensions-app -y
gsettings set org.gnome.desktop.wm.preferences button-layout ":minimize,maximize,close"

# ۶. به‌روزرسانی نهایی سیستم
echo "🔄 ۶/۶. به‌روزرسانی سیستم..."
sudo dnf upgrade --refresh -y

echo "✅ پیکربندی با موفقیت به پایان رسید! لطفاً یک‌بار سیستم را ری‌استارت فرمایید."
`;
