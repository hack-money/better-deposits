import React from 'react';
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
import clsx from 'clsx';
import {
  overviewRoute,
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

const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AccountBalanceIcon />
      </ListItemIcon>
      <ListItemText primary="Create" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Deposit" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PaymentIcon />
      </ListItemIcon>
      <ListItemText primary="Settle" />
    </ListItem>
    <ListItem button>
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

  return (
    <div className={classes.root}>
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
      <Router>
        <Switch>
          <Route path={overviewRoute} exact component={Dashboard} />
          <Route path={createRoute} exact component={Create} />
          <Route path={depositRoute} exact component={Deposit} />
          <Route path={withdrawRoute} exact component={Withdrawal} />
          <Route path={disputeRoute} exact component={Dispute} />
        </Switch>
      </Router>
      );
    </div>
  );
}
