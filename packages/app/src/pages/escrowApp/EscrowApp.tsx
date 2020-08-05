import { Web3Provider } from '@ethersproject/providers';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import PeopleIcon from '@material-ui/icons/People';
import PaymentIcon from '@material-ui/icons/Payment';
import GavelIcon from '@material-ui/icons/Gavel';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import {
  dashboardRoute,
  createRoute,
  depositRoute,
  withdrawRoute,
  disputeRoute,
} from '../../routes/escrowApp';
import Dashboard from './dashboard';
import Deposit from './deposit';
import Withdrawal from './withdraw';
import Dispute from './dispute';
import Create from './create';
import { useStyles } from '../../components/escrowApp/useStyles';
import { betterDepositAddress } from '../../config';

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

  useEffect(() => {
    async function connectMetamask() {
      if (typeof window.ethereum === undefined) {
        throw new Error('Please install Metamask');
      } else if (!provider) {
        await window.ethereum.enable();
        setProvider(new Web3Provider(window.ethereum));
      }
    }
    connectMetamask();
  });

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
            <Create
              provider={provider!}
              betterDepositAddress={betterDepositAddress}
            />
          </Route>
          <Route path={depositRoute} exact component={Deposit} />
          <Route path={withdrawRoute} exact component={Withdrawal} />
          <Route path={disputeRoute} exact component={Dispute} />
        </Switch>
      </Router>
      );
    </div>
  );
}
