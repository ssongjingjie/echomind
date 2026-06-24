import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles, MessageCircle, Heart, Target, Brain,
  ChevronRight, TrendingUp, Zap, Clock, ArrowRight,
  BarChart3, User
} from 'lucide-react';
import { todayInsights, homeStats, coreFeatures } from '../data/mockData';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function HomePage() {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl gradient-hero p-8 lg:p-12 text-white"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-apple-purple/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-xs font-medium mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            AI 人格成长教练
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-3 leading-tight">
            成为更好的自己，<br />
            <span className="bg-gradient-to-r from-primary to-apple-teal bg-clip-text text-transparent">
              从每一次表达开始
            </span>
          </h1>
          <p className="text-white/60 text-sm lg:text-base max-w-md mb-8 leading-relaxed">
            EchoMind 不只优化你的话术，更通过长期记忆陪伴你持续成长——从"过去的我"到"更好的我"。
          </p>
          <Link
            to="/optimize"
            className="inline-flex items-center gap-2 apple-btn px-6 py-3 text-sm"
          >
            开始优化
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.section>

      {/* Today Insights */}
      <motion.section variants={container} initial="hidden" animate="show">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-ink">今日洞察</h2>
          <span className="text-xs text-ink-secondary">基于最近沟通分析</span>
        </div>
        <div className="space-y-3">
          {todayInsights.map((insight, i) => (
            <motion.div
              key={i}
              variants={item}
              className={`apple-card p-4 flex items-start gap-3 ${
                insight.type === 'positive' ? 'border-l-4 border-l-apple-green' : 'border-l-4 border-l-apple-orange'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                insight.type === 'positive' ? 'bg-apple-green/10' : 'bg-apple-orange/10'
              }`}>
                {insight.type === 'positive' ? (
                  <TrendingUp className="w-4 h-4 text-apple-green" />
                ) : (
                  <Zap className="w-4 h-4 text-apple-orange" />
                )}
              </div>
              <div>
                <p className="text-sm font-medium text-ink">{insight.title}</p>
                <p className="text-xs text-ink-secondary mt-0.5">{insight.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Stats Grid */}
      <motion.section variants={container} initial="hidden" animate="show">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {homeStats.map((stat, i) => (
            <motion.div key={i} variants={item} className="apple-card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-ink-secondary">{stat.label}</span>
                <span className="text-[10px] font-medium text-apple-green bg-apple-green/10 px-1.5 py-0.5 rounded">
                  +{stat.change}
                </span>
              </div>
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Core Features */}
      <motion.section variants={container} initial="hidden" animate="show">
        <h2 className="text-lg font-semibold text-ink mb-4">核心功能</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {coreFeatures.map((feature, i) => {
            const icons: Record<string, React.ElementType> = { Sparkles, BarChart3, User, Target, TrendingUp };
            const Icon = icons[feature.icon] || Sparkles;
            return (
              <motion.div key={i} variants={item}>
                <Link
                  to={feature.path}
                  className="apple-card p-5 block group hover:shadow-card-hover transition-all"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-3`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-ink mb-1">{feature.title}</h3>
                  <p className="text-xs text-ink-secondary leading-relaxed">{feature.desc}</p>
                  <div className="flex items-center gap-1 mt-3 text-primary text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    进入 <ChevronRight className="w-3 h-3" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Demo Path */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="apple-card p-6"
      >
        <h2 className="text-lg font-semibold text-ink mb-4">演示路径</h2>
        <div className="flex flex-wrap items-center gap-2 text-sm">
          {['输入场景与原话', '高情商回复生成', '表达特征分析', '人格画像生成', '成长建议', '成长仪表盘'].map((step, i) => (
            <span key={i} className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-lg bg-surface text-ink-secondary text-xs font-medium">
                {step}
              </span>
              {i < 5 && <ArrowRight className="w-3 h-3 text-ink-tertiary" />}
            </span>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
