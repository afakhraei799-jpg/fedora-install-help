import { TroubleshootingIssue } from '../types';

export const FEDORA_SELF_HEAL_SCRIPT = `# ==========================================================
# 🛠️ اسکریپت خودکار عیب‌یابی و ترمیم سلامت فدورا (Fedora Self-Heal)
# این اسکریپت دیتابیس قفل‌شده را آزاد، کلیدهای GPG را نوسازی،
# کش‌های ناقص را پاکسازی و پکیج‌های شکسته را ترمیم می‌کند.
# ==========================================================
set -e
echo "🔍 [1/6] آزادسازی قفل دیتابیس DNF و متوقف‌سازی پروسه‌های مزاحم..."
sudo killall -9 packagekitd 2>/dev/null || true

echo "🧹 [2/6] پاکسازی متادیتا و کش‌های معیوب پکیج‌منیجر..."
sudo dnf clean all

echo "🔑 [3/6] واردسازی و نوسازی تمام کلیدهای امنیتی GPG فدورا و RPM Fusion..."
sudo rpm --import /etc/pki/rpm-gpg/RPM-GPG-KEY-fedora-$(rpm -E %fedora)-primary
sudo rpm --import https://rpmfusion.org/keys 2>/dev/null || true

echo "🔄 [4/6] بازسازی و ری‌ایندکس دیتابیس RPM (rpmdb)..."
sudo rpm --rebuilddb

echo "📦 [5/6] ترمیم وابستگی‌ها و همگام‌سازی نسخه‌ها با مخازن رسمی (distro-sync)..."
sudo dnf distro-sync --allowerasing -y

echo "✨ [6/6] حذف پکیج‌های یتیم و کش‌های سرگردان..."
sudo dnf autoremove -y

echo "✅ سیستم با موفقیت عیب‌یابی، نوسازی و ترمیم شد!"
`;

export const TROUBLESHOOTING_ISSUES: TroubleshootingIssue[] = [
  {
    id: 'dependency-conflict',
    category: 'dependency',
    severity: 'بحرانی',
    titleFa: 'خطای وابستگی‌های متضاد و ناقص (Conflicting Requests & Missing Dependencies)',
    errorSignFa: 'پیام Problem: conflicting requests یا package requires X, but none can be installed',
    sampleErrorMessage: `Error: 
 Problem: problem with installed package ffmpeg-free-6.1.1-4.fc41.x86_64
  - package ffmpeg-6.1.1-14.fc41.x86_64 from rpmfusion-free conflicts with ffmpeg-free provided by ffmpeg-free-6.1.1-4.fc41.x86_64
  - conflicting requests
  - nothing provides libavcodec.so.60()(64bit) needed by app-1.0.x86_64`,
    causeFa: 'فدورا به دلیل سخت‌گیری در حفظ پایداری سیستم، اگر پکیجی بخواهد کتابخانه‌ای را جایگزین کند که توسط برنامه دیگری استفاده می‌شود یا با نسخه فعلی تداخل دارد، تراکنش را متوقف می‌کند. به عنوان مثال، پکیج متن‌باز ffmpeg-free به صورت پیش‌فرض نصب است و هنگام نصب نسخه کامل ffmpeg بدون سوییچ --allowerasing خطا رخ می‌دهد.',
    quickSolutionCommand: 'sudo dnf swap ffmpeg-free ffmpeg --allowerasing -y',
    stepsFa: [
      {
        title: 'استفاده از فلگ جایگزینی هوشمند (--allowerasing)',
        description: 'این پرچم به DNF اجازه می‌دهد پکیج‌های تداخلی یا ناقص موجود را با نسخه سازگارتر جایگزین و پاکسازی کند.',
        command: 'sudo dnf install <package-name> --allowerasing -y'
      },
      {
        title: 'همگام‌سازی کامل پکیج‌ها با مخازن (distro-sync)',
        description: 'اگر پکیج‌هایی ناقص مانده باشند یا از آپدیت ناموفق قبلی باقی مانده باشند، تمام پکیج‌ها به نسخه‌های پایدار مخزن همگام می‌شوند.',
        command: 'sudo dnf distro-sync --allowerasing -y'
      },
      {
        title: 'حذف پکیج‌های یتیم و بدون استفاده (autoremove)',
        description: 'کتابخانه‌هایی که پیش‌تر به عنوان وابستگی نصب شده و اکنون هیچ برنامه‌ای به آن‌ها نیاز ندارد پاکسازی می‌شوند.',
        command: 'sudo dnf autoremove -y'
      }
    ],
    examples: [
      {
        title: 'مثال ۱: خطای تداخل ffmpeg-free با پکیج مالتی‌مدیا کامل',
        scenarioText: 'هنگام نصب کدک‌ها یا نرم‌افزارهای مالتی‌مدیا مانند OBS Studio یا VLC، فدورا خطای تداخل با ffmpeg-free می‌دهد.',
        fixCommand: 'sudo dnf swap ffmpeg-free ffmpeg --allowerasing -y',
        simulatedOutput: `Upgrading and resolving dependencies...
Package ffmpeg-free.x86_64 will be replaced by ffmpeg.x86_64 from rpmfusion-free
Dependencies resolved.
Complete! تداخل با موفقیت برطرف شد و کدک‌های کامل فعال شدند.`
      },
      {
        title: 'مثال ۲: پیدا کردن برنامه‌های با وابستگی‌های ارضانشده',
        scenarioText: 'بررسی اینکه کدام پکیج‌های سیستم شما کتابخانه یا وابستگی ناقص دارند با دستور repoquery.',
        fixCommand: 'sudo dnf repoquery --unsatisfied',
        simulatedOutput: `Checking installed packages for unsatisfied dependencies...
All dependencies are satisfied. (هیچ وابستگی ناقصی در سیستم یافت نشد)`
      },
      {
        title: 'مثال ۳: نصب بسته‌های ناقص با دانلود و حل همزمان کتابخانه‌ها',
        scenarioText: 'زمانی که یک فایل RPM محلی نیاز به کتابخانه‌های متعدد از مخازن دارد.',
        fixCommand: 'sudo dnf install ./app-installer.rpm --allowerasing -y',
        simulatedOutput: `Resolving missing dependencies from fedora, updates, rpmfusion...
Installing 4 dependent libraries: [libvpx, libx265, lame-libs, x264-libs]
Complete! نرم‌افزار بدون خطای کمبود کتابخانه نصب شد.`
      }
    ],
    preventionTipFa: 'همیشه بسته‌های RPM محلی را با "sudo dnf install ./file.rpm" نصب کنید نه دستور قدیمی "rpm -i"، زیرا DNF به صورت خودکار تمام وابستگی‌های اینترنتی را دانلود می‌کند.'
  },
  {
    id: 'gpg-key-error',
    category: 'gpg',
    severity: 'بحرانی',
    titleFa: 'خطای عدم تایید کلید GPG و امضای دیجیتال (GPG Check FAILED)',
    errorSignFa: 'پیام Public key for ... is not installed یا GPG verification failed',
    sampleErrorMessage: `warning: /var/cache/dnf/updates-1234/packages/libvlc.rpm: Header V4 RSA/SHA256 Signature, key ID 12345678: NOKEY
Fedora 41 - x86_64 - Updates
GPG key at file:///etc/pki/rpm-gpg/RPM-GPG-KEY-fedora-41-primary (0x12345678) is already installed
The GPG keys listed for the "Fedora 41" repository are already installed but they are not correct for this package.
Failing package is: libvlc-3.0.21-1.fc41.x86_64
GPG Check FAILED`,
    causeFa: 'فدورا برای امنیت کاربر، هر پکیجی را قبل از نصب با کلید رمزنگاری GPG سازنده مطابقت می‌دهد. اگر کلید یک مخزن هنوز وارد دیتابیس RPM نشده باشد، یا پس از ارتقای نسخه فدورا کلیدهای قدیمی منقضی شده باشند، یا ساعت سیستم دقیق نباشد، این خطا رخ می‌دهد.',
    quickSolutionCommand: 'sudo rpm --import /etc/pki/rpm-gpg/RPM-GPG-KEY-fedora-$(rpm -E %fedora)-primary && sudo dnf clean all',
    stepsFa: [
      {
        title: 'تنظیم دقیق ساعت و تاریخ سیستم (NTP)',
        description: 'اگر تاریخ سیستم اشتباه باشد، کلیدهای امنیتی GPG به عنوان نامعتبر یا منقضی شناخته می‌شوند.',
        command: 'sudo timedatectl set-ntp true'
      },
      {
        title: 'واردسازی دستی کلیدهای رسمی فدورا',
        description: 'کلیدهای اصلی توزیع فدورا به دیتابیس بسته‌ها تزریق می‌شوند.',
        command: 'sudo rpm --import /etc/pki/rpm-gpg/RPM-GPG-KEY-fedora-41-primary'
      },
      {
        title: 'پاکسازی کش قدیمی و بارگذاری مجدد متادیتا',
        description: 'کش متادیتای قدیمی که کلیدهای نامعتبر را نگه داشته پاکسازی و بازخوانی می‌شود.',
        command: 'sudo dnf clean all && sudo dnf makecache --refresh'
      }
    ],
    examples: [
      {
        title: 'مثال ۱: نصب کلیدهای مخازن RPM Fusion',
        scenarioText: 'هنگام اضافه کردن RPM Fusion اگر کلید عمومی وارد نشده باشد و DNF متوقف شود.',
        fixCommand: 'sudo rpm --import https://rpmfusion.org/keys && sudo dnf makecache',
        simulatedOutput: `Downloading RPM Fusion public keys...
Importing key ID: RPM-GPG-KEY-rpmfusion-free-fedora-41 (OK)
Importing key ID: RPM-GPG-KEY-rpmfusion-nonfree-fedora-41 (OK)
Metadata cache created successfully.`
      },
      {
        title: 'مثال ۲: نوسازی کلیدهای رسمی گوگل کروم یا VS Code',
        scenarioText: 'رفع خطای کلید مخازن برنامه‌های اختصاصی مانند گوگل کروم یا مایکروسافت.',
        fixCommand: 'sudo rpm --import https://dl.google.com/linux/linux_signing_key.pub',
        simulatedOutput: `Importing Google Linux Package Signing Key...
Key imported into RPM database. GPG check will now pass.`
      },
      {
        title: 'مثال ۳: پرش موقت از چک GPG فقط برای یک پکیج تایید شده محلی',
        scenarioText: 'در شرایط خاص که از سلامت پکیج محلی مطمئن هستید اما سازنده کلید عمومی را منتشر نکرده است.',
        fixCommand: 'sudo dnf install ./custom-tool.rpm --nogpgcheck -y',
        simulatedOutput: `Skipping GPG verification (--nogpgcheck enabled).
Installing custom-tool.x86_64...
Complete! پکیج بدون توقف روی امضای دیجیتال نصب گردید.`
      }
    ],
    preventionTipFa: 'هیچ‌گاه گزینه gpgcheck=0 را به صورت دائمی در فایل‌های مخزن /etc/yum.repos.d/ قرار ندهید؛ فقط در صورت ضرورت موقت از فلگ --nogpgcheck استفاده کنید.'
  },
  {
    id: 'dnf-db-locked',
    category: 'lock',
    severity: 'متوسط',
    titleFa: 'خطای قفل بودن دیتابیس DNF (Waiting for process with pid / rpmdb locked)',
    errorSignFa: 'پیام Waiting for process with pid XXXX یا Error: Waiting for lock on /var/lib/dnf',
    sampleErrorMessage: `Waiting for process with pid 4512 to finish.
Another app is currently holding the rpmdb lock; waiting for it to exit...
  User    : root
  Program : packagekitd
  Pid     : 4512`,
    causeFa: 'در هر لحظه فقط یک برنامه مجاز است دیتابیس پکیج‌های لینوکس را تغییر دهد. معمولاً فروشگاه نرم‌افزار GNOME Software یا سرویس PackageKit در پس‌زمینه در حال بررسی خودکار بروزرسانی‌ها هستند، یا ترمینال قبلی قبل از اتمام نصب به طور ناگهانی بسته شده است.',
    quickSolutionCommand: 'sudo killall -9 packagekitd && sudo dnf clean all',
    stepsFa: [
      {
        title: 'پیدا کردن شناسه پردازش قفل‌کننده (PID)',
        description: 'مشاهده برنامه‌ای که فایل دیتابیس RPM را باز نگه داشته است.',
        command: 'sudo fuser /var/lib/rpm/rpmdb.sqlite 2>/dev/null || ps aux | grep dnf'
      },
      {
        title: 'خاتمه دادن امن به پروسه متوقف شده',
        description: 'متوقف ساختن دیمون PackageKit که اغلب در پس‌زمینه مشغول است.',
        command: 'sudo killall packagekitd'
      },
      {
        title: 'حذف فایل‌های قفل موقت (در صورت کرش سیستم)',
        description: 'تنها اگر هیچ پردازشی فعال نبود و هنوز خطای قفل دریافت می‌کردید.',
        command: 'sudo rm -f /var/lib/dnf/*.lock'
      }
    ],
    examples: [
      {
        title: 'مثال ۱: بستن فوری PackageKit پس‌زمینه',
        scenarioText: 'ترمینال برای دقایق طولانی روی متن Waiting for packagekitd منتظر می‌ماند.',
        fixCommand: 'sudo systemctl stop packagekit.service',
        simulatedOutput: `PackageKit service stopped. Lock released immediately.
DNF is now free to execute commands.`
      },
      {
        title: 'مثال ۲: بازسازی دیتابیس آسیب‌دیده RPM در صورت قطعی ناگهانی برق',
        scenarioText: 'اگر در وسط نصب سیستم خاموش شده و دیتابیس خراب شده باشد.',
        fixCommand: 'sudo rpm --rebuilddb',
        simulatedOutput: `Rebuilding /var/lib/rpm database...
B-Tree indexes rebuilt successfully.
Zero corruptions detected.`
      },
      {
        title: 'مثال ۳: آزادسازی یکجای تمام قفل‌های DNF',
        scenarioText: 'دستور سریع برای خاتمه پروسه‌ها و آماده‌سازی ترمینال برای کار.',
        fixCommand: 'sudo killall -9 packagekitd 2>/dev/null || true; sudo dnf upgrade --refresh -y',
        simulatedOutput: `Lock released. Updating repositories...
Upgrades running cleanly.`
      }
    ],
    preventionTipFa: 'هنگام اجرای دستورات dnf در ترمینال، از باز کردن همزمان نرم‌افزار "Software" گنوم و کلیک روی دکمه‌های دانلود خودداری کنید تا قفل دیتابیس پیش نیاید.'
  },
  {
    id: 'repo-timeout',
    category: 'network',
    severity: 'متوسط',
    titleFa: 'خطای تایم‌اوت مخازن و آینه‌های فدورا (Repository Timeout & Network Errors)',
    errorSignFa: 'پیام Failed to download metadata for repo 또는 Curl error (28): Timeout',
    sampleErrorMessage: `Errors during downloading metadata for repository 'fedora':
  - Curl error (28): Timeout was reached for https://mirrors.fedoraproject.org/... [Connection timed out after 30000 milliseconds]
Error: Failed to download metadata for repo 'fedora': Cannot prepare internal mirrorlist: Curl error (28)`,
    causeFa: 'به دلیل اختلالات اینترنت، فیلترینگ یا تاخیر آینه‌های رسمی خارج از کشور، DNF نمی‌تواند لیست آدرس‌های فعال را از سرور مرکزی mirrorlist دریافت کند.',
    quickSolutionCommand: 'sudo dnf clean all && sudo dnf makecache --refresh',
    stepsFa: [
      {
        title: 'پاکسازی کش آینه‌های متوقف‌شده',
        description: 'کش آدرس‌های آینه‌های قدیمی پاک شده و مجدداً از سریع‌ترین سرور فراخوانی می‌شود.',
        command: 'sudo dnf clean all'
      },
      {
        title: 'افزایش تایم‌اوت و فعال‌سازی سریع‌ترین آینه‌ها',
        description: 'اضافه کردن fastestmirror=True به تنظیمات DNF برای انتخاب خودکار نزدیک‌ترین سرور.',
        command: 'echo "fastestmirror=True" | sudo tee -a /etc/dnf/dnf.conf'
      },
      {
        title: 'تنظیم DNS پایدار برای حل دامنه‌ها',
        description: 'بررسی حل صحیح نام‌های دامنه فدورا.',
        command: 'resolvectl status'
      }
    ],
    examples: [
      {
        title: 'مثال ۱: رفرش اجباری متادیتای تمام مخازن',
        scenarioText: 'دستور پایه‌ای برای حل خطای متادیتا که در ۹۰٪ مواقع مشکل را حل می‌کند.',
        fixCommand: 'sudo dnf makecache --refresh',
        simulatedOutput: `Fedora 41 - x86_64                                100% | 4.8 MB/s |  29 MB | 00m06s
Fedora 41 - Updates                               100% | 5.2 MB/s |  22 MB | 00m04s
Metadata cache created successfully.`
      },
      {
        title: 'مثال ۲: دور زدن موقت یک مخزن معیوب برای نصب پکیج‌های دیگر',
        scenarioText: 'اگر فقط یک مخزن فرعی (مانند یک Copr خاص) دچار قطعی شده باشد.',
        fixCommand: 'sudo dnf install vlc --disablerepo="*broken-repo*" -y',
        simulatedOutput: `Temporarily disabling problematic repo...
Resolving dependencies from official mirrors...
Complete! پکیج بدون معطلی نصب شد.`
      },
      {
        title: 'مثال ۳: تست اتصال اینترنت به مخازن فدورا',
        scenarioText: 'بررسی اینکه آیا سرورهای فدورا در دسترس شبکه شما هستند.',
        fixCommand: 'curl -I https://mirrors.fedoraproject.org',
        simulatedOutput: `HTTP/2 200 
server: nginx
date: Sat, 19 Sep 2026 14:15:00 GMT
Content-Type: text/html (Connection healthy)`
      }
    ],
    preventionTipFa: 'در فایل /etc/dnf/dnf.conf مقادیر max_parallel_downloads=10 و countme=false را قرار دهید تا سرعت لود بهینه‌تر شود.'
  },
  {
    id: 'appimage-fuse',
    category: 'execution',
    severity: 'هشدار',
    titleFa: 'خطای اجرای فایلهای AppImage یا ارور libfuse.so.2 (FUSE Library Missing)',
    errorSignFa: 'پیام dlopen(): error loading libfuse.so.2 یا Permission denied',
    sampleErrorMessage: `dlopen(): error loading libfuse.so.2: cannot open shared object file: No such file or directory
AppImages require FUSE to run. You might need to install fuse2 on your system.`,
    causeFa: 'در فدورا نسخه ۴۰ و ۴۱، کتابخانه قدیمی FUSE 2 به دلیل مسائل امنیتی به طور پیش‌فرض نصب نیست و توزیع از FUSE 3 استفاده می‌کند. برخی برنامه‌های قدیمی AppImage به کتابخانه libfuse.so.2 نیاز دارند.',
    quickSolutionCommand: 'sudo dnf install fuse-libs -y',
    stepsFa: [
      {
        title: 'اعطای مجوز اجرایی به فایل (chmod +x)',
        description: 'فایل‌های دانلودی در لینوکس به طور پیش‌فرض مجوز اجرایی ندارند.',
        command: 'chmod +x ./Application.AppImage'
      },
      {
        title: 'نصب کتابخانه سازگاری FUSE در فدورا',
        description: 'نصب بسته fuse-libs که فایل libfuse.so.2 را به سیستم اضافه می‌کند.',
        command: 'sudo dnf install fuse-libs -y'
      },
      {
        title: 'اجرای AppImage با حالت استخراج موقت (بدون نیاز به FUSE)',
        description: 'اگر دسترسی روت برای نصب پکیج ندارید، می‌توانید با فلگ --appimage-extract-and-run آن را باز کنید.',
        command: './Application.AppImage --appimage-extract-and-run'
      }
    ],
    examples: [
      {
        title: 'مثال ۱: رفع خطای فقدان libfuse با نصب کتابخانه سازگار',
        scenarioText: 'برنامه AppImage بلافاصله پس از کلیک بسته می‌شود یا ارور FUSE می‌دهد.',
        fixCommand: 'sudo dnf install fuse-libs -y',
        simulatedOutput: `Installing: fuse-libs.x86_64 (Compatibility FUSE 2.x layer)
Installed: fuse-libs-2.9.9-19.fc41.x86_64
Complete! اکنون تمامی نرم‌افزارهای AppImage بدون خطا اجرا می‌شوند.`
      },
      {
        title: 'مثال ۲: اعطای مجوز دسترسی کامل اجرایی به فایل',
        scenarioText: 'ارور Permission denied در ترمینال هنگام تلاش برای اجرای فایل.',
        fixCommand: 'chmod u+x ./Obsidian.AppImage && ./Obsidian.AppImage',
        simulatedOutput: `Permissions set: -rwxr-xr-x
Launching Obsidian AppImage successfully under Wayland...`
      },
      {
        title: 'مثال ۳: استخراج محتویات AppImage به یک پوشه دائمی',
        scenarioText: 'در صورتی که بخواهید فایل باینری را از داخل پکیج استخراج و مستقیماً استفاده کنید.',
        fixCommand: './Application.AppImage --appimage-extract',
        simulatedOutput: `Extracting AppImage contents to ./squashfs-root...
Extraction complete. You can run: ./squashfs-root/AppRun`
      }
    ],
    preventionTipFa: 'پس از دانلود هر فایل AppImage، روی آن در فایل‌منیجر راست‌کلیک کرده، Properties را باز کنید و گزینه "Allow executing file as program" را روشن نمایید.'
  },
  {
    id: 'nvidia-akmod',
    category: 'driver',
    severity: 'متوسط',
    titleFa: 'خطای کامپایل ماژول گرافیک انویدیا پس از آپدیت کرنل (Akmod Build Failure)',
    errorSignFa: 'پیام NVIDIA kernel module missing یا ریورت خودکار به درایور Nouveau',
    sampleErrorMessage: `NVIDIA: Kernel module not found for kernel 6.11.4-301.fc41.x86_64.
Falling back to nouveau display driver.
GPU Acceleration disabled.`,
    causeFa: 'در فدورا، درایور اختصاصی انویدیا از طریق سیستم akmods در هر آپدیت کرنل به صورت ماژول بومی کامپایل می‌شود. اگر سیستم دقیقاً پس از دستور dnf upgrade و قبل از اتمام بیلد در پس‌زمینه ریستارت شود، ماژول نصفه‌کاره باقی می‌ماند.',
    quickSolutionCommand: 'sudo akmods --force && sudo dracut --force',
    stepsFa: [
      {
        title: 'کامپایل مجدد اجباری تمام ماژول‌های کرنل',
        description: 'دستور akmods تمام درایورهای مربوط به کرنل‌های فعال را مجدداً بازسازی می‌کند.',
        command: 'sudo akmods --force'
      },
      {
        title: 'بازسازی فایل Initramfs برای راه‌اندازی اولیه کرنل',
        description: 'اطمینان از بارگذاری ماژول انویدیا در ابتدای بوت سیستم‌عامل.',
        command: 'sudo dracut --force'
      },
      {
        title: 'بررسی وضعیت لود شدن درایور انویدیا',
        description: 'چک کردن خروجی دستور modinfo یا nvidia-smi.',
        command: 'modinfo -F version nvidia'
      }
    ],
    examples: [
      {
        title: 'مثال ۱: بیلد اجباری و مشاهده لاگ کامپایل akmod',
        scenarioText: 'وقتی صفحه نمایش بعد از آپدیت به ۶۰ هرتز محدود شده یا کارت انویدیا شناسایی نمی‌شود.',
        fixCommand: 'sudo akmods --force',
        simulatedOutput: `Checking kmods exist for 6.11.4-301.fc41.x86_64 [  OK  ]
Building and installing nvidia-kmod            [  OK  ]
Done! ماژول با موفقیت کامپایل شد. با یک ریستارت فعال خواهد شد.`
      },
      {
        title: 'مثال ۲: بررسی خروجی کارت گرافیک با ابزار nvidia-smi',
        scenarioText: 'اطمینان از فعال بودن شتاب‌دهنده سخت‌افزاری و هسته‌های CUDA.',
        fixCommand: 'nvidia-smi',
        simulatedOutput: `+-----------------------------------------------------------------------------+
| NVIDIA-SMI 565.57.01              Driver Version: 565.57.01   CUDA: 12.7   |
| GPU  Name        Persistence-M | Bus-Id          Disp.A | Volatile Uncorr. ECC |
|   0  NVIDIA GeForce RTX ... On | 00000000:01:00.0   On |                  N/A |
+-----------------------------------------------------------------------------+`
      },
      {
        title: 'مثال ۳: قفل موقت روی کرنل پایدار قبلی از منوی گراب',
        scenarioText: 'اگر جدیدترین کرنل فدورا هنوز توسط انویدیا پشتیبانی نشده باشد.',
        fixCommand: 'sudo grubby --info=ALL | grep -E "index|title"',
        simulatedOutput: `index=0 title="Fedora Linux (6.11.4) 41 (Workstation Edition)"
index=1 title="Fedora Linux (6.10.12) 41 (Workstation Edition)"
Tip: با انتخاب index=1 در بوت سیستم با کرنل سازگار قبلی بالا می‌آید.`
      }
    ],
    preventionTipFa: 'پس از آپدیت کرنل یا درایور انویدیا با DNF، حداقل ۳ تا ۵ دقیقه صبر کنید و مصرف CPU را در ابزار btop بررسی کنید تا فرآیند پس‌زمینه akmods کاملاً به پایان برسد.'
  }
];
