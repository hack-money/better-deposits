import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Technology from './pages/HowItWorks';
import FAQ from './pages/FAQ';
import BottomSection from './components/bottomSection';
import NavBar from './components/NavBar';
import { homeRoute, howItWorksRoute, faqRoute } from './routes';
import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path={homeRoute} exact component={Home} />
        <Route path={howItWorksRoute} exact component={Technology} />
        <Route path={faqRoute} exact component={FAQ} />
      </Switch>
      <BottomSection />
    </Router>
  );
}

export default App;
