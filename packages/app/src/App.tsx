import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Web3Provider } from "@ethersproject/providers";
import { CssBaseline } from "@material-ui/core";
import Dashboard from "./pages/dashboard";
import Deposit from "./pages/deposit";
import Withdrawal from "./pages/withdraw";
import Dispute from "./pages/dispute";
import Create from "./pages/create";
import NavBar from "./components/NavBar";
import SideBar from "./components/SideBar";

import "./App.css";
import { getOnboard } from "./web3/getOnboard";
import { BetterDeposit } from "./contracts/BetterDeposit";
import { Erc20 } from "./contracts/Erc20";
import { escrowContractAddress, linkedERC20Address } from "./config";
import { BetterDepositFactory, Erc20Factory } from "./contracts";
import {
  withdrawRoute,
  depositRoute,
  createRoute,
  dashboardRoute,
  disputeRoute,
} from "./routes/escrowApp";
import { useStyles } from "./components/useStyles";

function App() {
  const classes = useStyles();
  const [open] = React.useState(true);
  const [provider, setProvider] = useState<Web3Provider>();
  const [escrowContract, setEscrowContract] = useState<BetterDeposit>();
  const [erc20Contract, setERC20Contract] = useState<Erc20>();

  useEffect(() => {
    const getUserWallet = async () => {
      const provider = await getOnboard();
      console.log({ provider });

      setProvider(provider);
    };

    getUserWallet();
  }, []);

  useEffect(() => {
    try {
      const contract = provider
        ? BetterDepositFactory.connect(escrowContractAddress, provider)
        : undefined;
      setEscrowContract(contract);
    } catch (err) {
      console.log(err.message);
    }
  }, [provider]);

  useEffect(() => {
    try {
      const contract = provider
        ? Erc20Factory.connect(linkedERC20Address, provider)
        : undefined;
      setERC20Contract(contract);
    } catch (err) {
      console.log(err.message);
    }
  }, [provider]);

  return (
    <Router>
      <NavBar />
      <div className={classes.root}>
        <CssBaseline />
        <SideBar open={open} />
        <main className={classes.content}>
          <Switch>
            <Route path={dashboardRoute} exact component={Dashboard} />
            <Route path={createRoute} exact>
              <Create escrowContract={escrowContract!} />
            </Route>
            <Route path={depositRoute} exact>
              <Deposit
                escrowContract={escrowContract!}
                linkedERC20Contract={erc20Contract!}
              />
            </Route>
            <Route path={withdrawRoute} exact>
              <Withdrawal escrowContract={escrowContract!} />
            </Route>
            <Route path={disputeRoute} exact>
              <Dispute escrowContract={escrowContract!} />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;
