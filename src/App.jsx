import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home';
import Navbar from './Navbar';
import Trending from './Trending';
import MostPopular from './MostPopular';
import About from './About';
import MovieDetails from './MovieDetails';

function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/most-popular" element={<MostPopular />} />
        <Route path="/about" element={<About />} />
        <Route path="/movie/:id" element={<MovieDetails />}/>
        <Route path="/tv/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
    <br />
    <hr />
      {/* Footer */}
      <footer className="footer">
        <p className="footer-text">
          🎥 Movie recommendations powered by TMDB. Built with ❤️ using React.js.
        </p>
      </footer>
    </div>
  );
}

export default App;
