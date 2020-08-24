import { Web3Provider } from "@ethersproject/providers";
import React, { useEffect, useState, ReactElement } from "react";
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
import { getOnboard } from "../../web3/getOnboard";
import { BetterDepositFactory, Erc20Factory } from "../../contracts";
import { Erc20 } from "../../contracts/Erc20";
import { BetterDeposit } from "../../contracts/BetterDeposit";

const sidebarLinks: { text: string; icon: ReactElement; route: string }[] = [
  { text: "Dashboard", icon: <DashboardIcon />, route: dashboardRoute },
  { text: "Create", icon: <AccountBalanceIcon />, route: createRoute },
  { text: "Deposit", icon: <PeopleIcon />, route: depositRoute },
  { text: "Withdraw", icon: <PaymentIcon />, route: withdrawRoute },
  { text: "Dispute", icon: <GavelIcon />, route: disputeRoute },
];

const SideBar: React.FC<{ open: boolean }> = ({ open }) => {
  const classes = useStyles();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <Divider />
      <List>
        {sidebarLinks.map(({ text, icon, route }) => (
          <ListItem button to={route} component={Link} key={disputeRoute}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

const EscrowApp: React.FC = () => {
  const classes = useStyles();
  const [open] = React.useState(true);
  const [provider, setProvider] = useState<Web3Provider>();
  const [escrowContract, setEscrowContract] = useState<BetterDeposit>();
  const [erc20Contract, setERC20Contract] = useState<Erc20>();

  useEffect(() => {
    const getUserWallet = async () => {
      const userProvider = await getOnboard();
      setProvider(userProvider);
    };

    getUserWallet();
  }, []);

  useEffect(() => {
    try {
      const contract = provider
        ? BetterDepositFactory.connect(
            escrowContractAddress,
            provider.getSigner(),
          )
        : undefined;
      setEscrowContract(contract);
    } catch (err) {
      console.log(err.message);
    }
  }, [provider]);

  useEffect(() => {
    try {
      const contract = provider
        ? Erc20Factory.connect(linkedERC20Address, provider.getSigner())
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
        <SideBar open={open} />
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
};

export default EscrowApp;
