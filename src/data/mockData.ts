// EchoMind — Mock Data Layer
// All data centralized here for easy maintenance

export interface OptimizeVersion {
  key: string;
  label: string;
  color: string;
  bgColor: string;
  text: string;
  reason: string;
}

export interface AnalysisDimension {
  name: string;
  score: number;
  max: number;
  label: string;
  desc: string;
  level: '优秀' | '良好' | '需提升' | '重点关注';
}

export interface PersonalityTag {
  name: string;
  type: 'positive' | 'negative' | 'neutral';
  description: string;
  strength: number;
}

export interface GrowthTask {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: '简单' | '中等' | '挑战';
  completed: boolean;
}

export interface Milestone {
  day: string;
  title: string;
  description: string;
  type: 'start' | 'achievement' | 'breakthrough' | 'persistence' | 'evolution';
}

// ── Optimize Page ──

export const demoOptimizeInput = {
  scenario: '领导催项目进度',
  target: '领导',
  purpose: '汇报项目进度，争取理解',
  original: '做不完。',
};

export const scenarioOptions = [
  '领导催项目',
  '同事推责',
  '客户无理要求',
  '伴侣抱怨',
  '面试场景',
  '跨部门冲突',
];

export const optimizeVersions: OptimizeVersion[] = [
  {
    key: 'highEQ',
    label: '高情商版',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    text: '领导，关于项目进度，我理解您这边比较着急。目前的情况是部分模块确实遇到了技术难点，我们正在全力攻关。我会每天同步进展，预计下周三前可以完成核心功能交付。您看这样的节奏是否可以接受？',
    reason: '通过肯定对方感受、主动同步进展、给出明确时间节点，既回应了关切又展示了责任心和执行力。',
  },
  {
    key: 'gentle',
    label: '温和版',
    color: 'text-apple-green',
    bgColor: 'bg-apple-green/10',
    text: '领导，您提到的项目进度我记在心上了。目前确实有一些技术难点需要处理，我会尽量协调资源，争取不耽误整体节奏。如果过程中需要支持，我再跟您沟通，可以吗？',
    reason: '采用温和谦逊的语气，将表达中的棱角磨平，通过请示语气和感谢表达降低对方的防御心理。',
  },
  {
    key: 'sincere',
    label: '真诚版',
    color: 'text-apple-orange',
    bgColor: 'bg-apple-orange/10',
    text: '领导，跟您说实话，这个项目目前确实遇到了一些预料之外的技术难点，进度比预期慢了一些。我不想给您虚假的承诺，但我可以向您保证，这是我目前最优先的事项，我会全力以赴。',
    reason: '用真诚坦率的语气建立信任，不回避问题也不夸大承诺，让对方感受到你的责任心和专业性。',
  },
  {
    key: 'humorous',
    label: '幽默版',
    color: 'text-apple-purple',
    bgColor: 'bg-apple-purple/10',
    text: '领导，关于这个项目，我知道您恨不得我有个分身来干活😂 目前确实有几个技术难点在"驯服"中，请再给我一点魔法时间✨ 我保证下周三前给您一个漂亮的交付！',
    reason: '用幽默的方式化解催促带来的压力，表情符号和比喻让沟通氛围更轻松。',
  },
  {
    key: 'structured',
    label: '结构化版',
    color: 'text-apple-teal',
    bgColor: 'bg-apple-teal/10',
    text: '领导，关于项目进度，我想从三个方面汇报：\n1. 当前进展：核心模块已完成70%；\n2. 遇到挑战：接口对接部分出现兼容性问题；\n3. 解决方案：已联系技术专家，预计2天内解决，整体进度可控。',
    reason: '使用结构化表达（第一、第二、第三），让信息传递更清晰高效，展现专业素养。',
  },
];

export const originalAnalysisTags = [
  { label: '情绪含量', value: 78, color: 'bg-apple-red' },
  { label: '共情', value: 25, color: 'bg-apple-green' },
  { label: '逻辑', value: 40, color: 'bg-primary' },
  { label: '攻击性', value: 65, color: 'bg-apple-orange' },
  { label: '讨好倾向', value: 10, color: 'bg-apple-purple' },
  { label: '自信度', value: 70, color: 'bg-apple-teal' },
];

// ── Analysis Page ──

export const analysisDimensions: AnalysisDimension[] = [
  { name: '情绪感知', score: 78, max: 100, label: 'emotion', desc: '能够敏锐捕捉和表达自身及他人情绪', level: '良好' },
  { name: '共情能力', score: 52, max: 100, label: 'empathy', desc: '理解他人处境并做出恰当回应的能力', level: '需提升' },
  { name: '逻辑表达', score: 68, max: 100, label: 'logic', desc: '表达条理清晰、结构分明的能力', level: '良好' },
  { name: '温和程度', score: 35, max: 100, label: 'gentleness', desc: '表达方式是否让人感到舒适', level: '重点关注' },
  { name: '自信表达', score: 72, max: 100, label: 'confidence', desc: '表达时是否坚定、有底气', level: '良好' },
  { name: '边界感', score: 45, max: 100, label: 'boundary', desc: '能否在沟通中维护自身边界', level: '需提升' },
];

export const radarData = analysisDimensions.map(d => ({
  subject: d.name,
  A: d.score,
  fullMark: 100,
}));

export const analysisSummary = '你的沟通风格偏向「直接型」，情绪感知和自信表达较强，但共情能力和温和程度有待提升。建议在日常沟通中多关注对方感受，适当软化语气，同时加强结构化表达训练。';

// ── Personality Page ──

export const personalityType = {
  title: '高共情型沟通者',
  subtitle: '共情能力突出，善于理解他人',
  score: 82,
};

export const personalityTags: PersonalityTag[] = [
  {
    name: '冲突回避型',
    type: 'neutral',
    description: '倾向于避免直接冲突，可能压抑真实想法',
    strength: 72,
  },
  {
    name: '高共情型',
    type: 'positive',
    description: '擅长理解他人感受，表达温暖有温度',
    strength: 85,
  },
  {
    name: '讨好倾向型',
    type: 'negative',
    description: '过度关注他人评价，容易牺牲自身需求',
    strength: 68,
  },
  {
    name: '逻辑表达型',
    type: 'positive',
    description: '表达条理清晰，善于用数据支撑观点',
    strength: 76,
  },
  {
    name: '温和协作型',
    type: 'positive',
    description: '沟通风格温和，善于团队协作',
    strength: 80,
  },
];

export const personalityTrend = [
  { month: '1月', 共情: 45, 逻辑: 60, 自信: 55, 温和: 40, 边界: 30 },
  { month: '2月', 共情: 50, 逻辑: 62, 自信: 58, 温和: 42, 边界: 32 },
  { month: '3月', 共情: 55, 逻辑: 64, 自信: 60, 温和: 45, 边界: 35 },
  { month: '4月', 共情: 62, 逻辑: 65, 自信: 63, 温和: 48, 边界: 38 },
  { month: '5月', 共情: 70, 逻辑: 66, 自信: 68, 温和: 50, 边界: 40 },
  { month: '6月', 共情: 78, 逻辑: 68, 自信: 72, 温和: 52, 边界: 45 },
];

export const growthDirections = [
  { name: '减少讨好', current: 68, target: 40, color: '#ff9500' },
  { name: '提升自信', current: 72, target: 85, color: '#0a84ff' },
  { name: '增强逻辑', current: 68, target: 80, color: '#34c759' },
];

// ── Growth Page ──

export const dailySuggestions = [
  { id: 'd1', title: '尝试在对话中先肯定对方，再提出自己的观点', category: '共情表达', difficulty: '简单' as const, completed: false },
  { id: 'd2', title: '减少使用"但是"，改用"同时"进行转折', category: '语言优化', difficulty: '简单' as const, completed: true },
  { id: 'd3', title: '多使用开放式问题引导对话深入', category: '沟通技巧', difficulty: '中等' as const, completed: false },
];

export const weeklyGoals = [
  { id: 'w1', title: '本周完成3次沟通优化练习', category: '训练任务', difficulty: '中等' as const, completed: false },
  { id: 'w2', title: '在至少一次对话中主动使用缓冲表达', category: '实战应用', difficulty: '挑战' as const, completed: false },
  { id: 'w3', title: '记录一次自己的沟通场景并复盘', category: '自我觉察', difficulty: '简单' as const, completed: true },
];

export const monthlyDirections = [
  { id: 'm1', title: '建立清晰的个人边界，学会温和而坚定地说"不"', category: '边界感', difficulty: '挑战' as const, completed: false },
  { id: 'm2', title: '在表达观点时减少过度解释，提升简洁度', category: '自信表达', difficulty: '中等' as const, completed: false },
  { id: 'm3', title: '每周至少进行一次结构化表达练习', category: '逻辑表达', difficulty: '中等' as const, completed: false },
];

// ── Report Page ──

export const reportOverview = {
  totalCommunications: 24,
  avgEQScore: 78,
  trainingDays: 18,
  growthRate: '+23%',
};

export const eqTrendData = [
  { month: '1月', 情商评分: 55, 沟通能力: 52, 情绪稳定: 48 },
  { month: '2月', 情商评分: 58, 沟通能力: 55, 情绪稳定: 50 },
  { month: '3月', 情商评分: 62, 沟通能力: 58, 情绪稳定: 53 },
  { month: '4月', 情商评分: 68, 沟通能力: 63, 情绪稳定: 58 },
  { month: '5月', 情商评分: 73, 沟通能力: 68, 情绪稳定: 62 },
  { month: '6月', 情商评分: 78, 沟通能力: 74, 情绪稳定: 68 },
];

export const dimensionChangeData = [
  { month: '1月', 共情: 45, 逻辑: 60, 自信: 55, 温和: 40, 边界: 30 },
  { month: '2月', 共情: 50, 逻辑: 62, 自信: 58, 温和: 42, 边界: 32 },
  { month: '3月', 共情: 55, 逻辑: 64, 自信: 60, 温和: 45, 边界: 35 },
  { month: '4月', 共情: 62, 逻辑: 65, 自信: 63, 温和: 48, 边界: 38 },
  { month: '5月', 共情: 70, 逻辑: 66, 自信: 68, 温和: 50, 边界: 40 },
  { month: '6月', 共情: 78, 逻辑: 68, 自信: 72, 温和: 52, 边界: 45 },
];

export const milestones: Milestone[] = [
  { day: '第1天', title: '起点', description: '加入 EchoMind，开始沟通成长之旅', type: 'start' },
  { day: '第7天', title: '首次突破', description: '完成首次沟通分析，发现共情待提升', type: 'breakthrough' },
  { day: '第14天', title: '持续成长', description: '共情指数提升15%，获得「高共情型」标签', type: 'achievement' },
  { day: '第21天', title: '习惯养成', description: '攻击性指数降低至20以下，沟通更温和', type: 'persistence' },
  { day: '第30天', title: '人格进化', description: '完成全部训练任务，人格画像稳定更新', type: 'evolution' },
];

// ── Home Page ──

export const todayInsights = [
  { title: '你的共情能力本周提升 12%', desc: '在客户沟通场景中表现尤为突出', type: 'positive' },
  { title: '边界感仍有提升空间', desc: '建议在跨部门协作中更坚定地表达立场', type: 'warning' },
  { title: '情绪稳定性持续向好', desc: '连续5天情绪指数保持在70分以上', type: 'positive' },
];

export const homeStats = [
  { label: '情商评分', value: 78, change: '+5', color: 'text-primary', icon: 'Brain' },
  { label: '沟通能力', value: 74, change: '+3', color: 'text-apple-green', icon: 'MessageCircle' },
  { label: '情绪稳定', value: 68, change: '+8', color: 'text-apple-teal', icon: 'Heart' },
  { label: '训练次数', value: 24, change: '+2', color: 'text-apple-orange', icon: 'Target' },
];

export const coreFeatures = [
  { title: '话术优化', desc: 'AI 生成高情商、温和、真诚、幽默多版本表达', icon: 'Sparkles', path: '/optimize', color: 'from-primary to-primary-light' },
  { title: '能力分析', desc: '六维雷达图深度解析你的沟通特征', icon: 'BarChart3', path: '/analysis', color: 'from-apple-green to-apple-teal' },
  { title: '人格画像', desc: '基于长期记忆构建专属人格标签', icon: 'User', path: '/personality', color: 'from-apple-purple to-primary' },
  { title: '成长建议', desc: '每日建议、本周目标、训练任务', icon: 'Target', path: '/growth', color: 'from-apple-orange to-apple-red' },
  { title: '成长报告', desc: '趋势图表 + 里程碑时间线', icon: 'TrendingUp', path: '/report', color: 'from-apple-teal to-apple-green' },
];
