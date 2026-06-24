import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, MessageSquareMore, BarChart3, User, Target, TrendingUp,
  Brain
} from 'lucide-react';

const navItems = [
  { path: '/', label: '首页', icon: Sparkles },
  { path: '/optimize', label: '话术优化', icon: MessageSquareMore },
  { path: '/analysis', label: '能力分析', icon: BarChart3 },
  { path: '/personality', label: '人格画像', icon: User },
  { path: '/growth', label: '成长建议', icon: Target },
  { path: '/report', label: '成长报告', icon: TrendingUp },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  // GitHub Pages SPA redirect handler
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get('redirect');
    if (redirect) {
      navigate(redirect, { replace: true });
    }
  }, [navigate]);

  return (
    <div className="min-h-full flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 fixed left-0 top-0 h-screen bg-white/80 backdrop-blur-xl border-r border-rule z-40">
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 h-16 border-b border-rule shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-apple-purple flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-base font-semibold text-ink leading-tight">EchoMind</h1>
            <p className="text-[10px] text-ink-secondary font-medium tracking-wide">AI人格成长教练</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-ink-secondary hover:bg-black/5 hover:text-ink'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Bottom Card */}
        <div className="px-4 pb-4">
          <div className="apple-card p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-ink-secondary">情商成长值</span>
              <span className="text-xs font-semibold text-primary">78/100</span>
            </div>
            <div className="w-full h-2 bg-surface rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-apple-purple rounded-full" style={{ width: '78%' }} />
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 pb-20 lg:pb-0">
        {/* Top Header */}
        <header className="sticky top-0 z-30 glass">
          <div className="flex items-center justify-between h-14 px-4 lg:px-8">
            <div className="flex items-center gap-2 lg:hidden">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-apple-purple flex items-center justify-center">
                <Brain className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-semibold text-ink">EchoMind</span>
            </div>
            <div className="hidden lg:block" />
            <div className="flex items-center gap-3">
              <span className="text-xs text-ink-secondary hidden sm:inline">成为更好的自己，从每一次表达开始</span>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-apple-purple/20 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="px-4 lg:px-8 py-6 max-w-5xl mx-auto"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Tab Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-rule safe-area-bottom">
        <div className="flex items-center justify-around h-14">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg transition-colors min-w-0 ${
                  isActive ? 'text-primary' : 'text-ink-tertiary'
                }`}
              >
                <Icon className="w-5 h-5 mb-0.5" />
                <span className="text-[10px] font-medium leading-none truncate">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
