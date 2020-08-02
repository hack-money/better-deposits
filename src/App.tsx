import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Technology from './pages/HowItWorks';
import FAQ from './pages/FAQ';
import Questionnaire from './pages/Questionnaire';
import AppLanding from './pages/AppLanding';
import BottomSection from './components/bottomSection';
import NavBar from './components/NavBar';
import {
  homeRoute,
  howItWorksRoute,
  faqRoute,
  questionnaireRoute,
  appRoute,
} from './routes';
import './App.css';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path={homeRoute} exact component={Home} />
        <Route path={howItWorksRoute} exact component={Technology} />
        <Route path={faqRoute} exact component={FAQ} />
        <Route path={questionnaireRoute} exact component={Questionnaire} />
        <Route path={appRoute} exact component={AppLanding} />
      </Switch>
      <BottomSection />
    </Router>
  );
}

export default App;
