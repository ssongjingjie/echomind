import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Check, Clock, Target, Flame, Calendar,
  Shield, MessageCircle, Brain, Zap, ChevronRight, Heart
} from 'lucide-react';
import { dailySuggestions, weeklyGoals, monthlyDirections } from '../data/mockData';

type TabKey = 'daily' | 'weekly' | 'monthly';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } };

const difficultyStyles: Record<string, { bg: string; text: string }> = {
  '简单': { bg: 'bg-apple-green/10', text: 'text-apple-green' },
  '中等': { bg: 'bg-apple-orange/10', text: 'text-apple-orange' },
  '挑战': { bg: 'bg-apple-red/10', text: 'text-apple-red' },
};

const categoryIcons: Record<string, React.ElementType> = {
  '边界感': Shield,
  '自信表达': MessageCircle,
  '减少过度解释': Brain,
  '冲突管理': Zap,
  '人格成长': Target,
  '共情表达': Heart,
  '语言优化': MessageCircle,
  '沟通技巧': Brain,
  '训练任务': Target,
  '实战应用': Zap,
  '自我觉察': Brain,
  '逻辑表达': Brain,
};

export default function GrowthPage() {
  const [activeTab, setActiveTab] = useState<TabKey>('daily');
  const [tasks, setTasks] = useState({
    daily: dailySuggestions.map(t => ({ ...t })),
    weekly: weeklyGoals.map(t => ({ ...t })),
    monthly: monthlyDirections.map(t => ({ ...t })),
  });

  const toggleTask = (tab: TabKey, id: string) => {
    setTasks(prev => ({
      ...prev,
      [tab]: prev[tab].map(t => t.id === id ? { ...t, completed: !t.completed } : t),
    }));
  };

  const currentTasks = tasks[activeTab];
  const completedCount = currentTasks.filter(t => t.completed).length;
  const progress = Math.round((completedCount / currentTasks.length) * 100);

  const tabs: { key: TabKey; label: string; icon: React.ElementType }[] = [
    { key: 'daily', label: '每日建议', icon: Calendar },
    { key: 'weekly', label: '本周目标', icon: Target },
    { key: 'monthly', label: '本月方向', icon: Flame },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-ink mb-1">成长建议</h1>
        <p className="text-sm text-ink-secondary">每日建议、本周目标、本月方向，陪你持续成长</p>
      </motion.div>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="apple-card p-5"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-apple-orange" />
            <span className="text-sm font-semibold text-ink">成长进度</span>
          </div>
          <span className="text-sm font-bold text-primary">{progress}%</span>
        </div>
        <div className="w-full h-3 bg-surface rounded-full overflow-hidden mb-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6 }}
            className="h-full bg-gradient-to-r from-primary to-apple-purple rounded-full"
          />
        </div>
        <div className="flex items-center justify-between text-xs text-ink-secondary">
          <span>已完成 {completedCount} / {currentTasks.length}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            连续训练 18 天
          </span>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="flex gap-2"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white text-ink-secondary hover:bg-surface border border-rule'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </motion.div>

      {/* Task List */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-3"
        >
          {currentTasks.map((task) => {
            const CatIcon = categoryIcons[task.category] || Target;
            const diffStyle = difficultyStyles[task.difficulty];
            return (
              <motion.div
                key={task.id}
                variants={item}
                className={`apple-card p-4 flex items-start gap-3 transition-all ${
                  task.completed ? 'opacity-60' : ''
                }`}
              >
                <button
                  onClick={() => toggleTask(activeTab, task.id)}
                  className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                    task.completed
                      ? 'bg-apple-green text-white'
                      : 'bg-surface border border-rule hover:border-primary'
                  }`}
                >
                  {task.completed && <Check className="w-4 h-4" />}
                </button>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium leading-relaxed ${task.completed ? 'line-through text-ink-tertiary' : 'text-ink'}`}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="apple-tag bg-surface text-ink-secondary text-[10px]">
                      <CatIcon className="w-3 h-3 mr-1" />
                      {task.category}
                    </span>
                    <span className={`apple-tag ${diffStyle.bg} ${diffStyle.text} text-[10px]`}>
                      {task.difficulty}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Next */}
      <div className="text-center pt-2">
        <Link to="/report" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-light transition-colors">
          查看成长报告 <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
