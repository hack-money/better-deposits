import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Technology from './pages/Technology';
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
      </Switch>
      <BottomSection />
    </Router>
  );
}

export default App;
