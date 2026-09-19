export type PackageTool =
  | 'dnf'
  | 'flatpak'
  | 'rpm'
  | 'copr'
  | 'appimage'
  | 'snap'
  | 'gui'
  | 'source'
  | 'rpmfusion'
  | 'localfile'
  | 'github'
  | 'postinstall';

export interface PostInstallExample {
  title: string;
  command: string;
  description: string;
  simulatedOutput?: string;
}

export interface PostInstallTask {
  id: string;
  stepNumber: number;
  titleFa: string;
  titleEn: string;
  category: 'speed' | 'codecs' | 'repositories' | 'tweaks' | 'drivers' | 'backup';
  priority: 'ضروری' | 'بسیار مهم' | 'پیشنهادی' | 'اختیاری';
  summaryFa: string;
  whyNeededFa: string;
  primaryCommand: string;
  verificationCommand?: string;
  tipsFa: string[];
  examples: PostInstallExample[];
}

export interface StepGuide {
  stepNumber: number;
  title: string;
  description: string;
  command?: string;
  terminalOutputSimulation?: string;
  explanationTip?: string;
  warningNotice?: string;
}

export interface InstallationScenario {
  id: string;
  titleFa: string;
  titleEn: string;
  category: 'core' | 'sandboxed' | 'third-party' | 'advanced';
  tool: PackageTool;
  iconName: string;
  badge: string;
  summary: string;
  realWorldAppExample: string;
  whyUseThis: string;
  pros: string[];
  cons: string[];
  securityLevel: 'خیلی امن (Sandboxed)' | 'امن (مخزن رسمی فدورا)' | 'متوسط (وابسته به سازنده)' | 'نیازمند دقت (دسترسی ریشه)';
  isolationLevel: 'ایزوله در سندباکس' | 'محلی و بومی در کل سیستم' | 'پرتابل مجزا' | 'محیط کانتینری';
  steps: StepGuide[];
  verificationCommand: string;
  removalCommand: string;
  commonPitfalls: string[];
  examplesList?: {
    appName: string;
    command: string;
    description: string;
  }[];
}

export interface VideoChapter {
  id: string;
  timeSec: number;
  labelFa: string;
  narrationTextFa: string;
  activeTerminalCommand?: string;
  simulatedOutput?: string;
  badgeText?: string;
  highlightCard?: {
    title: string;
    description: string;
    type: 'info' | 'success' | 'warning' | 'terminal';
  };
}

export interface VideoLesson {
  id: string;
  titleFa: string;
  tool: PackageTool;
  scenarioId: string;
  totalDurationSec: number;
  videoPosterColor: string;
  overviewFa: string;
  chapters: VideoChapter[];
}

export interface CheatSheetCommand {
  tool: PackageTool;
  actionName: string;
  command: string;
  descriptionFa: string;
  notesFa?: string;
}

export interface DecisionNode {
  id: string;
  questionFa: string;
  subtitleFa: string;
  options: {
    textFa: string;
    hintFa: string;
    nextId?: string;
    recommendedScenarioId?: string;
    recommendedTool?: PackageTool;
    reasonFa?: string;
  }[];
}

export interface TroubleshootingExample {
  title: string;
  scenarioText: string;
  fixCommand: string;
  simulatedOutput?: string;
}

export interface TroubleshootingIssue {
  id: string;
  category: 'dependency' | 'gpg' | 'lock' | 'network' | 'execution' | 'driver';
  severity: 'بحرانی' | 'متوسط' | 'هشدار';
  titleFa: string;
  errorSignFa: string;
  sampleErrorMessage: string;
  causeFa: string;
  quickSolutionCommand: string;
  stepsFa: {
    title: string;
    description: string;
    command?: string;
  }[];
  examples: TroubleshootingExample[];
  preventionTipFa: string;
}
