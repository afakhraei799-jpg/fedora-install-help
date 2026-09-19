import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  FastForward, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  Terminal, 
  CheckCircle2, 
  Info, 
  AlertTriangle, 
  Copy, 
  Check, 
  ListOrdered,
  ChevronRight,
  ChevronLeft,
  Sparkles
} from 'lucide-react';
import { VIDEO_LESSONS } from '../data/videoLessons';
import { VideoChapter } from '../types';

interface InteractiveVideoPlayerProps {
  voiceEnabled: boolean;
  onSendToTerminal: (cmd: string) => void;
  onSelectScenario: (scenarioId: string) => void;
}

export const InteractiveVideoPlayer: React.FC<InteractiveVideoPlayerProps> = ({
  voiceEnabled,
  onSendToTerminal,
  onSelectScenario,
}) => {
  const [selectedLessonIndex, setSelectedLessonIndex] = useState<number>(0);
  const currentLesson = VIDEO_LESSONS[selectedLessonIndex] || VIDEO_LESSONS[0];

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [showSubtitles, setShowSubtitles] = useState<boolean>(true);
  const [copiedCmd, setCopiedCmd] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [typedText, setTypedText] = useState<string>('');

  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Determine active chapter based on currentTimeSec
  const currentChapterIndex = useMemo(() => {
    let index = 0;
    for (let i = 0; i < currentLesson.chapters.length; i++) {
      if (currentTimeSec >= currentLesson.chapters[i].timeSec) {
        index = i;
      }
    }
    return index;
  }, [currentTimeSec, currentLesson]);

  const activeChapter: VideoChapter = currentLesson.chapters[currentChapterIndex] || currentLesson.chapters[0];

  // Auto-typing animation for terminal command when chapter changes
  useEffect(() => {
    if (!activeChapter.activeTerminalCommand) {
      setTypedText('');
      return;
    }

    const command = activeChapter.activeTerminalCommand;
    let charIdx = 0;
    setTypedText('');

    const typingInterval = setInterval(() => {
      charIdx++;
      setTypedText(command.slice(0, charIdx));
      if (charIdx >= command.length) {
        clearInterval(typingInterval);
      }
    }, 35 / playbackRate);

    return () => clearInterval(typingInterval);
  }, [activeChapter.id, playbackRate]);

  // Speech synthesis narrator
  useEffect(() => {
    if (!voiceEnabled || !isPlaying) {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
      return;
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(activeChapter.narrationTextFa);
      utterance.lang = 'fa-IR';
      utterance.rate = playbackRate;
      window.speechSynthesis.speak(utterance);
    }

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [activeChapter.id, isPlaying, voiceEnabled, playbackRate]);

  // Playback ticker
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTimeSec((prev) => {
          if (prev >= currentLesson.totalDurationSec) {
            setIsPlaying(false);
            return currentLesson.totalDurationSec;
          }
          return prev + 1;
        });
      }, 1000 / playbackRate);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackRate, currentLesson.totalDurationSec]);

  const togglePlay = () => {
    if (currentTimeSec >= currentLesson.totalDurationSec) {
      setCurrentTimeSec(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (seconds: number) => {
    setCurrentTimeSec(Math.min(Math.max(0, seconds), currentLesson.totalDurationSec));
  };

  const handleNextChapter = () => {
    if (currentChapterIndex < currentLesson.chapters.length - 1) {
      setCurrentTimeSec(currentLesson.chapters[currentChapterIndex + 1].timeSec);
    }
  };

  const handlePrevChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentTimeSec(currentLesson.chapters[currentChapterIndex - 1].timeSec);
    } else {
      setCurrentTimeSec(0);
    }
  };

  const handleCopyCommand = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div id="interactive-video-section" className="space-y-6">
      {/* Lesson Selector Badges */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400">انتخاب دوره ویدیویی:</span>
        </div>
        <div className="flex overflow-x-auto sm:flex-wrap items-center gap-1.5 w-full sm:w-auto pb-1 sm:pb-0 no-scrollbar">
          {VIDEO_LESSONS.map((lesson, idx) => (
            <button
              key={lesson.id}
              onClick={() => {
                setSelectedLessonIndex(idx);
                setCurrentTimeSec(0);
                setIsPlaying(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all touch-target flex items-center justify-center ${
                selectedLessonIndex === idx
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              {lesson.titleFa.split(':')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Video Frame Container */}
      <div 
        ref={containerRef}
        className="relative overflow-hidden rounded-2xl border border-slate-700/80 bg-gradient-to-b from-slate-900 to-slate-950 shadow-2xl"
      >
        {/* Top Video Overlay Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between px-3.5 sm:px-4 py-2.5 bg-slate-950/80 border-b border-slate-800/80 backdrop-blur-md z-10 text-xs gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shrink-0" />
            <span className="font-bold text-white tracking-wide text-xs sm:text-sm">{currentLesson.titleFa}</span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="text-blue-400 font-mono text-[11px] bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
              {activeChapter.labelFa}
            </span>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => onSelectScenario(currentLesson.scenarioId)}
              className="text-[11px] font-medium text-slate-300 hover:text-white bg-slate-800/80 px-2.5 py-1.5 rounded-lg border border-slate-700 flex items-center gap-1 transition-colors touch-target"
            >
              <ListOrdered className="w-3.5 h-3.5 text-blue-400" />
              <span>مشاهده سناریوی کامل این درس</span>
            </button>
          </div>
        </div>

        {/* Video Canvas / Split Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px] p-3.5 sm:p-6 gap-5 sm:gap-6 relative">
          
          {/* Left Stage: Visual Slide & Spoken Narration (Persian) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              {/* Badge */}
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Sparkles className="w-3.5 h-3.5" />
                  {activeChapter.badgeText || 'توضیحات زنده'}
                </span>
                <span className="text-xs text-slate-400">
                  بخش {currentChapterIndex + 1} از {currentLesson.chapters.length}
                </span>
              </div>

              {/* Chapter Title */}
              <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                {activeChapter.labelFa}
              </h3>

              {/* Spoken Narration Display with Subtitles */}
              <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-200 text-sm sm:text-base leading-relaxed relative shadow-inner">
                <p className="text-slate-100 font-medium">
                  {activeChapter.narrationTextFa}
                </p>
                {voiceEnabled && isPlaying && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-emerald-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>گوینده صوتی در حال تشریح مرحله...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Highlighted Architecture / Concept Card */}
            {activeChapter.highlightCard && (
              <div className={`p-3.5 rounded-xl border transition-all ${
                activeChapter.highlightCard.type === 'success'
                  ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                  : activeChapter.highlightCard.type === 'warning'
                  ? 'bg-amber-950/40 border-amber-500/30 text-amber-300'
                  : activeChapter.highlightCard.type === 'terminal'
                  ? 'bg-sky-950/40 border-sky-500/30 text-sky-300'
                  : 'bg-blue-950/40 border-blue-500/30 text-blue-300'
              }`}>
                <div className="flex items-start gap-2.5">
                  {activeChapter.highlightCard.type === 'success' && <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400 mt-0.5" />}
                  {activeChapter.highlightCard.type === 'warning' && <AlertTriangle className="w-5 h-5 shrink-0 text-amber-400 mt-0.5" />}
                  {activeChapter.highlightCard.type === 'terminal' && <Terminal className="w-5 h-5 shrink-0 text-sky-400 mt-0.5" />}
                  {activeChapter.highlightCard.type === 'info' && <Info className="w-5 h-5 shrink-0 text-blue-400 mt-0.5" />}
                  <div>
                    <h4 className="font-bold text-xs sm:text-sm text-white">{activeChapter.highlightCard.title}</h4>
                    <p className="text-xs mt-1 text-slate-300 leading-normal">{activeChapter.highlightCard.description}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Stage: Synchronized Interactive Terminal Display */}
          <div className="lg:col-span-6 flex flex-col h-full rounded-xl overflow-hidden border border-slate-800 bg-[#0c1017] shadow-xl">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-3.5 py-2 bg-slate-900/90 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
                <span className="text-[11px] font-mono text-slate-400 ml-2">fedora-terminal (screencast)</span>
              </div>

              {activeChapter.activeTerminalCommand && (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopyCommand(activeChapter.activeTerminalCommand!)}
                    className="p-1 rounded text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 text-xs flex items-center gap-1 transition-colors"
                    title="کپی دستور"
                  >
                    {copiedCmd ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span className="text-[10px] hidden sm:inline">{copiedCmd ? 'کپی شد' : 'کپی'}</span>
                  </button>
                  <button
                    onClick={() => onSendToTerminal(activeChapter.activeTerminalCommand!)}
                    className="px-2 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-medium flex items-center gap-1 transition-colors shadow-sm"
                  >
                    <Terminal className="w-3 h-3" />
                    <span>تست زنده در شبیه‌ساز</span>
                  </button>
                </div>
              )}
            </div>

            {/* Terminal Content Screen */}
            <div className="p-4 font-mono text-xs text-left dir-ltr flex-1 overflow-y-auto space-y-3 bg-[#080c14] select-text">
              <div className="text-slate-500 text-[11px]">
                # Fedora Linux 41 Workstation (X86_64) - Interactive Session
              </div>

              {activeChapter.activeTerminalCommand ? (
                <>
                  <div className="flex items-center gap-2 text-slate-200">
                    <span className="text-emerald-400 font-semibold">[user@fedora ~]$</span>
                    <span className="text-sky-300 font-semibold">{typedText}</span>
                    <span className="w-2 h-4 bg-sky-400 animate-pulse inline-block" />
                  </div>

                  {activeChapter.simulatedOutput && (
                    <pre className="text-slate-300 text-[11px] whitespace-pre-wrap leading-relaxed font-mono bg-slate-950/60 p-3 rounded-lg border border-slate-800/60">
                      {activeChapter.simulatedOutput}
                    </pre>
                  )}
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                  <Terminal className="w-8 h-8 mb-2 text-slate-600 opacity-60" />
                  <p className="text-xs">در این بخش دستور ترمینالی اجرا نمی‌شود و توضیحات مفهومی است.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Video Scrubber & Playback Controls Bar */}
        <div className="px-4 py-3 bg-slate-950/95 border-t border-slate-800 space-y-2 select-none">
          {/* Timeline Bar with chapter ticks */}
          <div className="relative group">
            <input
              type="range"
              min="0"
              max={currentLesson.totalDurationSec}
              value={currentTimeSec}
              onChange={(e) => handleSeek(Number(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 focus:outline-none"
            />
            {/* Chapter marker ticks */}
            <div className="absolute top-0 left-0 w-full h-1.5 pointer-events-none flex items-center">
              {currentLesson.chapters.map((ch) => {
                const percent = (ch.timeSec / currentLesson.totalDurationSec) * 100;
                return (
                  <div
                    key={ch.id}
                    style={{ left: `${percent}%` }}
                    className="absolute w-1 h-2.5 bg-slate-600/70 -translate-x-1/2 rounded"
                    title={ch.labelFa}
                  />
                );
              })}
            </div>
          </div>

          {/* Controls row */}
          <div className="flex flex-wrap items-center justify-between text-xs text-slate-300 gap-2 pt-1">
            {/* Left controls: Play/Pause, Rewind, Forward, Time */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                id="btn-video-play-pause"
                onClick={togglePlay}
                className="w-9 h-9 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-transform active:scale-95 shadow-md shadow-blue-500/20 touch-target"
                title={isPlaying ? 'توقف موقت' : 'پخش ویدیو'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
              </button>

              <button
                onClick={handlePrevChapter}
                disabled={currentChapterIndex === 0}
                className="p-2 rounded-lg hover:bg-slate-800 text-slate-300 disabled:opacity-30 touch-target flex items-center justify-center"
                title="بخش قبلی"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleNextChapter}
                disabled={currentChapterIndex === currentLesson.chapters.length - 1}
                className="p-2 rounded-lg hover:bg-slate-800 text-slate-300 disabled:opacity-30 touch-target flex items-center justify-center"
                title="بخش بعدی"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="font-mono text-[11px] text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                {formatTime(currentTimeSec)} / {formatTime(currentLesson.totalDurationSec)}
              </span>
            </div>

            {/* Middle: Chapter Navigation List Pills (visible on laptop/desktop) */}
            <div className="hidden xl:flex items-center gap-1.5 overflow-x-auto max-w-md py-1 no-scrollbar">
              {currentLesson.chapters.map((ch, idx) => (
                <button
                  key={ch.id}
                  onClick={() => setCurrentTimeSec(ch.timeSec)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] whitespace-nowrap transition-colors ${
                    currentChapterIndex === idx
                      ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40 font-semibold'
                      : 'bg-slate-900 hover:bg-slate-800 text-slate-400'
                  }`}
                >
                  {idx + 1}. {ch.labelFa}
                </button>
              ))}
            </div>

            {/* Right controls: Speed, Subtitles, Fullscreen */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              {/* Speed dropdown */}
              <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5 text-[11px]">
                {[0.75, 1, 1.25, 1.5].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setPlaybackRate(rate)}
                    className={`px-2 py-1 rounded-lg transition-colors ${
                      playbackRate === rate ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {rate}x
                  </button>
                ))}
              </div>

              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 touch-target flex items-center justify-center"
                title={isFullscreen ? 'خروج از تمام صفحه' : 'تمام صفحه'}
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
