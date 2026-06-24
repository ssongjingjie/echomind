import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Sparkles, ChevronDown, ChevronUp, Copy, Check,
  ArrowRight, Loader2, Heart, MessageCircle, Smile, Lightbulb, FileText
} from 'lucide-react';
import {
  demoOptimizeInput, scenarioOptions, optimizeVersions, originalAnalysisTags
} from '../data/mockData';

export default function OptimizePage() {
  const [scenario, setScenario] = useState(demoOptimizeInput.scenario);
  const [target, setTarget] = useState(demoOptimizeInput.target);
  const [purpose, setPurpose] = useState(demoOptimizeInput.purpose);
  const [original, setOriginal] = useState(demoOptimizeInput.original);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [expandedKey, setExpandedKey] = useState<string | null>('highEQ');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleOptimize = () => {
    if (!original.trim()) return;
    setIsLoading(true);
    setShowResults(false);
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
    }, 1500);
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const versionIcons: Record<string, React.ElementType> = {
    highEQ: Heart, gentle: Sparkles, sincere: MessageCircle, humorous: Smile, structured: Lightbulb,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-ink mb-1">话术优化</h1>
        <p className="text-sm text-ink-secondary">输入沟通场景，AI 为你生成多版本高情商表达</p>
      </motion.div>

      {/* Form */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="apple-card p-5 lg:p-6"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-ink-secondary mb-1.5">沟通场景</label>
              <select
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                className="apple-input w-full"
              >
                {scenarioOptions.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-ink-secondary mb-1.5">沟通对象</label>
              <input
                type="text"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="如：领导、客户、伴侣..."
                className="apple-input w-full"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-ink-secondary mb-1.5">沟通目的</label>
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="本次沟通想要达到什么效果？"
              className="apple-input w-full"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-ink-secondary mb-1.5">原始表达</label>
            <textarea
              value={original}
              onChange={(e) => setOriginal(e.target.value)}
              placeholder="输入你想说的话..."
              rows={3}
              className="apple-input w-full resize-none"
            />
          </div>
          <button
            onClick={handleOptimize}
            disabled={isLoading || !original.trim()}
            className="apple-btn w-full py-3 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                AI 优化中...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" />
                开始优化
              </span>
            )}
          </button>
        </div>
      </motion.div>

      {/* Loading */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="apple-card p-12 flex flex-col items-center justify-center"
          >
            <div className="flex items-center gap-2 mb-4">
              {[0, 0.15, 0.3].map((d, i) => (
                <span
                  key={i}
                  className="w-3 h-3 rounded-full bg-primary"
                  style={{ animation: 'pulse-dot 1.2s ease-in-out infinite', animationDelay: `${d}s` }}
                />
              ))}
            </div>
            <p className="text-sm text-ink-secondary">AI 正在分析你的表达风格...</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            {/* Original Analysis */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="apple-card p-5"
            >
              <h3 className="text-sm font-semibold text-ink mb-3">原话分析</h3>
              <div className="flex flex-wrap gap-2">
                {originalAnalysisTags.map((tag) => (
                  <div key={tag.label} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface">
                    <span className="text-xs text-ink-secondary">{tag.label}</span>
                    <div className="w-16 h-1.5 bg-rule rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${tag.color}`} style={{ width: `${tag.value}%` }} />
                    </div>
                    <span className="text-xs font-medium text-ink">{tag.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Optimized Versions */}
            <h3 className="text-sm font-semibold text-ink px-1">优化版本</h3>
            {optimizeVersions.map((version, i) => {
              const Icon = versionIcons[version.key] || Sparkles;
              const isExpanded = expandedKey === version.key;
              return (
                <motion.div
                  key={version.key}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="apple-card overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedKey(isExpanded ? null : version.key)}
                    className="w-full flex items-center justify-between p-5 hover:bg-surface/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl ${version.bgColor} flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${version.color}`} />
                      </div>
                      <span className="text-sm font-semibold text-ink">{version.label}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopy(version.text, version.key);
                        }}
                        className="p-1.5 rounded-lg hover:bg-surface transition-colors"
                      >
                        {copiedKey === version.key ? (
                          <Check className="w-4 h-4 text-apple-green" />
                        ) : (
                          <Copy className="w-4 h-4 text-ink-secondary" />
                        )}
                      </button>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-ink-secondary" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-ink-secondary" />
                      )}
                    </div>
                  </button>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 space-y-3">
                          <p className="text-[15px] text-ink leading-relaxed whitespace-pre-line">{version.text}</p>
                          <div className="bg-surface rounded-xl p-4">
                            <p className="text-xs text-ink-secondary leading-relaxed">
                              <span className="font-medium text-ink">优化原因：</span>
                              {version.reason}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}

            {/* Next Step */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-center pt-2"
            >
              <Link
                to="/analysis"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-light transition-colors"
              >
                查看沟通能力分析
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
