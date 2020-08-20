import { Web3Provider } from "@ethersproject/providers";
import { Contract } from "@ethersproject/contracts";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import {
  CssBaseline,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import {
  AccountBalance as AccountBalanceIcon,
  Dashboard as DashboardIcon,
  Gavel as GavelIcon,
  Payment as PaymentIcon,
  People as PeopleIcon,
} from "@material-ui/icons";
import clsx from "clsx";

import {
  dashboardRoute,
  createRoute,
  depositRoute,
  withdrawRoute,
  disputeRoute,
} from "../../routes/escrowApp";
import Dashboard from "./dashboard";
import Deposit from "./deposit";
import Withdrawal from "./withdraw";
import Dispute from "./dispute";
import Create from "./create";
import { useStyles } from "../../components/escrowApp/useStyles";
import { escrowContractAddress, linkedERC20Address } from "../../config";
import { getEscrowContract, getERC20Contract } from "../../contracts";
import { getOnboard } from "../../web3/getOnboard";

const mainListItems = (
  <div>
    <ListItem button to={dashboardRoute} component={Link}>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button to={createRoute} component={Link}>
      <ListItemIcon>
        <AccountBalanceIcon />
      </ListItemIcon>
      <ListItemText primary="Create" />
    </ListItem>
    <ListItem button to={depositRoute} component={Link}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Deposit" />
    </ListItem>
    <ListItem button to={withdrawRoute} component={Link}>
      <ListItemIcon>
        <PaymentIcon />
      </ListItemIcon>
      <ListItemText primary="Withdraw" />
    </ListItem>
    <ListItem button to={disputeRoute} component={Link}>
      <ListItemIcon>
        <GavelIcon />
      </ListItemIcon>
      <ListItemText primary="Dispute" />
    </ListItem>
  </div>
);

export default function EscrowApp() {
  const classes = useStyles();
  const [open] = React.useState(true);
  const [provider, setProvider] = useState<Web3Provider>();
  const [escrowContract, setEscrowContract] = useState<Contract>();
  const [erc20Contract, setERC20Contract] = useState<Contract>();

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
        ? getEscrowContract(provider, escrowContractAddress)
        : undefined;
      setEscrowContract(contract);
    } catch (err) {
      console.log(err.message);
    }
  }, [provider]);

  useEffect(() => {
    try {
      const contract = provider
        ? getERC20Contract(provider, linkedERC20Address)
        : undefined;
      setERC20Contract(contract);
    } catch (err) {
      console.log(err.message);
    }
  }, [provider]);

  return (
    <div className={classes.root}>
      <Router>
        <CssBaseline />
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <Divider />
          <List>{mainListItems}</List>
          <Divider />
        </Drawer>
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
      </Router>
    </div>
  );
}
