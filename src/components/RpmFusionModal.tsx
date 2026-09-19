import React, { useState } from 'react';
import { X, Sparkles, Copy, Check, Terminal, Play, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface RpmFusionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendToTerminal: (cmd: string) => void;
}

export const RpmFusionModal: React.FC<RpmFusionModalProps> = ({
  isOpen,
  onClose,
  onSendToTerminal,
}) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleCopy = (cmd: string, idx: number) => {
    navigator.clipboard.writeText(cmd);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const steps = [
    {
      title: '۱. فعال‌سازی مخازن مکمل RPM Fusion (Free و Non-Free)',
      desc: 'اضافه کردن مخزن نرم‌افزارهای آزاد و غیرآزاد مورد تایید جامعه فدورا',
      cmd: 'sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm -y'
    },
    {
      title: '۲. نصب پکیج‌های کامل کدک صوتی و تصویری GStreamer و FFmpeg',
      desc: 'پشتیبانی کامل از فرمت‌های MP4, MKV, HEVC، استریم و یوتیوب در فایرفاکس و پلیرها',
      cmd: 'sudo dnf groupupdate multimedia --setop="install_weak_deps=False" --exclude=PackageKit-gstreamer-plugin -y'
    },
    {
      title: '۳. فعال‌سازی شتاب سخت‌افزاری انکود/دیکود ویدیو (VA-API)',
      desc: 'استفاده از کارت گرافیک به جای CPU برای پخش روان ویدیوها و کاهش مصرف باتری',
      cmd: 'sudo dnf install ffmpeg-libs libva libva-utils -y'
    },
    {
      title: '۴. اختیاری: نصب درایور رسمی کارت گرافیک انویدیا (Nvidia akmod)',
      desc: 'کامپایل خودکار درایور انویدیا متناسب با آپدیت‌های کرنل فدورا',
      cmd: 'sudo dnf install akmod-nvidia xorg-x11-drv-nvidia-cuda -y'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-2xl border border-amber-500/40 bg-slate-900 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">راهنمای جامع راه‌اندازی RPM Fusion و کدک‌ها</h3>
              <p className="text-xs text-slate-400">پخش تمام ویدیوها و درایورهای اختصاصی در فدورا لینوکس</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 overflow-y-auto">
          <div className="p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/30 text-xs text-blue-200 leading-relaxed">
            <strong className="text-blue-300 block mb-1">چرا فدورا این پکیج‌ها را پیش‌فرض ندارد؟</strong>
            فدورا به دلیل قوانین پتنت‌های تجاری در آمریکا، کدهای انحصاری مانند فشرده‌سازی ویدیویی H.264 را مستقیماً داخل فایل ISO قرار نمی‌دهد. مخزن RPM Fusion این امکان را برای تمام کاربران سراسر جهان فراهم می‌کند.
          </div>

          <div className="space-y-3">
            {steps.map((step, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
                <div>
                  <h4 className="text-xs font-bold text-slate-200">{step.title}</h4>
                  <p className="text-[11px] text-slate-400">{step.desc}</p>
                </div>

                <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-[#070b12] border border-slate-800/80">
                  <code className="text-[11px] font-mono text-amber-400 dir-ltr text-left overflow-x-auto select-all">
                    {step.cmd}
                  </code>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleCopy(step.cmd, idx)}
                      className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                      title="کپی دستور"
                    >
                      {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => {
                        onSendToTerminal(step.cmd);
                        onClose();
                      }}
                      className="p-1.5 rounded bg-blue-600/30 hover:bg-blue-600 text-blue-300 hover:text-white transition-colors"
                      title="تست در شبیه‌ساز"
                    >
                      <Terminal className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
};
