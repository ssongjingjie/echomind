import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import OptimizePage from './pages/OptimizePage';
import AnalysisPage from './pages/AnalysisPage';
import PersonalityPage from './pages/PersonalityPage';
import GrowthPage from './pages/GrowthPage';
import ReportPage from './pages/ReportPage';

function App() {
  return (
    <BrowserRouter basename="/echomind">
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/optimize" element={<OptimizePage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/personality" element={<PersonalityPage />} />
          <Route path="/growth" element={<GrowthPage />} />
          <Route path="/report" element={<ReportPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
