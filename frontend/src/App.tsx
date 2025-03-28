import './App.css';
import { Route, Routes } from 'react-router';
import RecentAds from './components/RecentAds';
import Layout from './pages/Layout';
import About from './pages/About';
import AdDetails from './pages/AdDetails';
import NewAdForm from './pages/NewAdForm';
import ModificationAd from './pages/ModificationAd';
import Admin from './pages/Admin';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<RecentAds />} />
        <Route path="about" element={<About />} />
        <Route path="ad/new" element={<NewAdForm />} />
        <Route path="ad/:id" element={<AdDetails />} />
        <Route path="admin" element={<Admin />} />
        <Route path="ad/:id/modification" element={<ModificationAd />} />
      </Route>
    </Routes>
  )
}

export default App;