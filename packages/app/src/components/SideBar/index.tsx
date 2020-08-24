import React, { ReactElement } from "react";
import { Link } from "react-router-dom";
import {
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
import { useStyles } from "../useStyles";

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

export default SideBar;
