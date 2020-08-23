import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/website/Home";
import Technology from "./pages/website/HowItWorks";
import FAQ from "./pages/website/FAQ";
import Questionnaire from "./pages/website/Questionnaire";
import BottomSection from "./components/website/bottomSection";
import NavBar from "./components/website/NavBar";
import {
  homeRoute,
  howItWorksRoute,
  faqRoute,
  questionnaireRoute,
  appRoute,
} from "./routes";
import "./App.css";
import AppLanding from "./pages/escrowApp/EscrowApp";

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
