import { motion } from 'framer-motion';
import {
  TrendingUp, MessageCircle, Calendar, Award,
  Star, Circle, CheckCircle2, Sparkles
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend
} from 'recharts';
import { reportOverview, eqTrendData, dimensionChangeData, milestones } from '../data/mockData';

const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

const milestoneIcons: Record<string, React.ElementType> = {
  start: Circle,
  breakthrough: Sparkles,
  achievement: Award,
  persistence: Calendar,
  evolution: Star,
};

const milestoneColors: Record<string, string> = {
  start: 'bg-ink-tertiary',
  breakthrough: 'bg-primary',
  achievement: 'bg-apple-green',
  persistence: 'bg-apple-orange',
  evolution: 'bg-apple-purple',
};

export default function ReportPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-ink mb-1">成长报告</h1>
        <p className="text-sm text-ink-secondary">你的沟通能力成长轨迹与里程碑</p>
      </motion.div>

      {/* Overview Cards */}
      <motion.div variants={container} initial="hidden" animate="show" className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: '总沟通次数', value: reportOverview.totalCommunications, icon: MessageCircle, color: 'text-primary' },
          { label: '平均情商分', value: reportOverview.avgEQScore, icon: TrendingUp, color: 'text-apple-green' },
          { label: '训练天数', value: reportOverview.trainingDays, icon: Calendar, color: 'text-apple-orange' },
          { label: '成长率', value: reportOverview.growthRate, icon: Award, color: 'text-apple-purple' },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={i} variants={item} className="apple-card p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon className={`w-4 h-4 ${stat.color}`} />
                <span className="text-xs text-ink-secondary">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold text-ink">{stat.value}</div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* EQ Trend Area Chart */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="apple-card p-5"
      >
        <h3 className="text-sm font-semibold text-ink mb-4">情商趋势（6个月）</h3>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={eqTrendData}>
            <defs>
              <linearGradient id="eqGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0a84ff" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#0a84ff" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="commGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34c759" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#34c759" stopOpacity={0} />
              </linearGradient>
            </defs>
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
            <Area type="monotone" dataKey="情商评分" stroke="#0a84ff" fill="url(#eqGradient)" strokeWidth={2} />
            <Area type="monotone" dataKey="沟通能力" stroke="#34c759" fill="url(#commGradient)" strokeWidth={2} />
            <Area type="monotone" dataKey="情绪稳定" stroke="#5ac8fa" fill="transparent" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Dimension Change Line Chart */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="apple-card p-5"
      >
        <h3 className="text-sm font-semibold text-ink mb-4">人格维度变化</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={dimensionChangeData}>
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

      {/* Milestones */}
      <motion.div variants={container} initial="hidden" animate="show">
        <h3 className="text-sm font-semibold text-ink mb-4 px-1">成长里程碑</h3>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-apple-green to-apple-purple" />
          <div className="space-y-4">
            {milestones.map((ms, i) => {
              const Icon = milestoneIcons[ms.type];
              return (
                <motion.div key={i} variants={item} className="relative flex items-start gap-4 pl-1">
                  <div className={`w-7 h-7 rounded-full ${milestoneColors[ms.type]} flex items-center justify-center shrink-0 z-10`}>
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  <div className="apple-card p-4 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-primary">{ms.day}</span>
                      <span className="text-xs font-medium text-ink">{ms.title}</span>
                    </div>
                    <p className="text-xs text-ink-secondary leading-relaxed">{ms.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
