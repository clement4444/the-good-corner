import './App.css';
import { Route, Routes } from 'react-router';
import RecentAds from './components/RecentAds';
import Layout from './pages/Layout';
import About from './components/About';
import AdDetails from './components/AdDetails';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<RecentAds />} />
        <Route path="about" element={<About />} />
        <Route path="ad/:id" element={<AdDetails />} />
      </Route>
    </Routes>
  )
}

export default App;