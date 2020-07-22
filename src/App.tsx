import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Technology from './pages/Technology';
import FAQ from './pages/FAQ';
import BottomSection from './components/bottomSection';
import NavBar from './components/NavBar';
import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/technology" exact component={Technology} />
        <Route path="/faq" exact component={FAQ} />
      </Switch>
      <BottomSection />
    </Router>
  );
}

export default App;
