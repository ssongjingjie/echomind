import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, BarChart3, TrendingUp, Heart, Brain,
  Shield, MessageCircle, Zap
} from 'lucide-react';
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell
} from 'recharts';
import { analysisDimensions, analysisSummary } from '../data/mockData';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const levelColors: Record<string, string> = {
  '优秀': 'text-apple-green',
  '良好': 'text-primary',
  '需提升': 'text-apple-orange',
  '重点关注': 'text-apple-red',
};

const levelBgColors: Record<string, string> = {
  '优秀': 'bg-apple-green/10',
  '良好': 'bg-primary/10',
  '需提升': 'bg-apple-orange/10',
  '重点关注': 'bg-apple-red/10',
};

const barColors = ['#0a84ff', '#34c759', '#ff9500', '#ff3b30', '#af52de', '#5ac8fa'];

export default function AnalysisPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const trendData = analysisDimensions.map(d => ({
    name: d.name,
    score: d.score,
    fill: barColors[analysisDimensions.indexOf(d) % barColors.length],
  }));

  const radarData = analysisDimensions.map(d => ({
    subject: d.name,
    A: d.score,
    fullMark: 100,
  }));

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-ink mb-1">能力分析</h1>
        <p className="text-sm text-ink-secondary">六维雷达图深度解析你的沟通特征</p>
      </motion.div>

      {/* Radar Chart */}
      <motion.div
        variants={item}
        initial="hidden"
        animate="show"
        className="apple-card p-5 lg:p-6"
      >
        <h3 className="text-sm font-semibold text-ink mb-4">沟通六维雷达</h3>
        {mounted && (
          <ResponsiveContainer width="100%" height={320}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#d2d2d7" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: '#86868b' }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10, fill: '#c7c7cc' }} />
              <Radar
                name="当前得分"
                dataKey="A"
                stroke="#0a84ff"
                fill="#0a84ff"
                fillOpacity={0.15}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        )}
      </motion.div>

      {/* Bar Chart */}
      <motion.div
        variants={item}
        initial="hidden"
        animate="show"
        className="apple-card p-5 lg:p-6"
      >
        <h3 className="text-sm font-semibold text-ink mb-4">维度得分对比</h3>
        {mounted && (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={trendData} layout="vertical" margin={{ left: 20, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#86868b' }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fill: '#1d1d1f' }} width={70} />
              <Tooltip
                contentStyle={{
                  background: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid #d2d2d7',
                  borderRadius: '12px',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey="score" radius={[0, 8, 8, 0]} barSize={20}>
                {trendData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </motion.div>

      {/* Dimension Cards */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {analysisDimensions.map((dim, i) => (
          <motion.div key={dim.name} variants={item} className="apple-card p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-ink">{dim.name}</span>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${levelColors[dim.level]} ${levelBgColors[dim.level]}`}>
                {dim.level}
              </span>
            </div>
            <div className="flex items-end gap-2 mb-2">
              <span className="text-2xl font-bold text-ink">{dim.score}</span>
              <span className="text-xs text-ink-secondary mb-1">/ 100</span>
            </div>
            <div className="w-full h-2 bg-surface rounded-full overflow-hidden mb-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${dim.score}%` }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="h-full rounded-full"
                style={{ backgroundColor: barColors[i] }}
              />
            </div>
            <p className="text-xs text-ink-secondary leading-relaxed">{dim.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="apple-card p-5 border-l-4 border-l-primary"
      >
        <h3 className="text-sm font-semibold text-ink mb-2">核心发现</h3>
        <p className="text-sm text-ink-secondary leading-relaxed">{analysisSummary}</p>
      </motion.div>

      {/* Next */}
      <div className="text-center pt-2">
        <Link to="/personality" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-light transition-colors">
          查看人格画像 <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
