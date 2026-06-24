import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, User, Heart, Brain, Shield, MessageCircle, Zap,
  ChevronDown, ChevronUp, TrendingUp
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { personalityType, personalityTags, personalityTrend, growthDirections } from '../data/mockData';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const tagTypeStyles: Record<string, { bg: string; text: string; border: string }> = {
  positive: { bg: 'bg-apple-green/10', text: 'text-apple-green', border: 'border-apple-green/20' },
  negative: { bg: 'bg-apple-orange/10', text: 'text-apple-orange', border: 'border-apple-orange/20' },
  neutral: { bg: 'bg-ink-tertiary/10', text: 'text-ink-secondary', border: 'border-rule' },
};

export default function PersonalityPage() {
  const [expandedTag, setExpandedTag] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-ink mb-1">人格画像</h1>
        <p className="text-sm text-ink-secondary">基于长期记忆构建的专属人格标签</p>
      </motion.div>

      {/* Personality Type Card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="apple-card p-6 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
        <div className="relative flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-apple-purple flex items-center justify-center shrink-0">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-ink mb-1">{personalityType.title}</h2>
            <p className="text-sm text-ink-secondary">{personalityType.subtitle}</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-24 h-2 bg-surface rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-apple-purple rounded-full" style={{ width: `${personalityType.score}%` }} />
              </div>
              <span className="text-xs font-semibold text-primary">{personalityType.score}分</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tags */}
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
        <h3 className="text-sm font-semibold text-ink px-1">人格标签</h3>
        {personalityTags.map((tag) => {
          const styles = tagTypeStyles[tag.type];
          const isExpanded = expandedTag === tag.name;
          return (
            <motion.div key={tag.name} variants={item} className={`apple-card overflow-hidden border ${styles.border}`}>
              <button
                onClick={() => setExpandedTag(isExpanded ? null : tag.name)}
                className={`w-full flex items-center justify-between p-4 hover:bg-surface/30 transition-colors ${styles.bg}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-semibold ${styles.text}`}>{tag.name}</span>
                  <span className="text-xs text-ink-secondary">强度 {tag.strength}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 bg-white/50 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${styles.text.replace('text-', 'bg-')}`} style={{ width: `${tag.strength}%` }} />
                  </div>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-ink-secondary" /> : <ChevronDown className="w-4 h-4 text-ink-secondary" />}
                </div>
              </button>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  className="px-4 pb-4"
                >
                  <p className="text-sm text-ink-secondary leading-relaxed">{tag.description}</p>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </motion.div>

      {/* Trend Chart */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="apple-card p-5"
      >
        <h3 className="text-sm font-semibold text-ink mb-4">人格特质趋势（6个月）</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={personalityTrend}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#86868b' }} />
            <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#86868b' }} />
            <Tooltip
              contentStyle={{
                background: 'rgba(255,255,255,0.9)',
                backdropFilter: 'blur(12px)',
                border: '1px solid #d2d2d7',
                borderRadius: '12px',
                fontSize: '12px',
              }}
            />
            <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '11px' }} />
            <Line type="monotone" dataKey="共情" stroke="#0a84ff" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="逻辑" stroke="#34c759" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="自信" stroke="#ff9500" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="温和" stroke="#af52de" strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="边界" stroke="#5ac8fa" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Growth Directions */}
      <motion.div variants={container} initial="hidden" animate="show">
        <h3 className="text-sm font-semibold text-ink mb-3 px-1">成长方向</h3>
        <div className="space-y-3">
          {growthDirections.map((dir, i) => (
            <motion.div key={dir.name} variants={item} className="apple-card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-ink">{dir.name}</span>
                <span className="text-xs text-ink-secondary">{dir.current} / {dir.target}</span>
              </div>
              <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(dir.current / dir.target) * 100}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: dir.color }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Next */}
      <div className="text-center pt-2">
        <Link to="/growth" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-light transition-colors">
          查看成长建议 <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
