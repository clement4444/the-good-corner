import './App.css';
import Header from './components/Header';
import RecentAds from './components/RecentAds';

const App = () => {

  return (
    <body>
      <main className="main-content">
        <Header />
        <RecentAds />
      </main>
    </body>
  )
}

export default App;