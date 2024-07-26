import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import PostsList from './features/posts/PostsList';
import NavBar from './components/NavBar';
import AppRoutes from './components/AppRoutes';

function App() {

  return (
    <>
    <Router>
      <div className="app">
        <NavBar />
        <h1>React on Rails Blog</h1>
        <AppRoutes />
      </div>
    </Router>
    </>
  )
}

export default App
