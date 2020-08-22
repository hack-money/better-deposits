import React from "react";
import { AppBar, Button, Grid, Toolbar, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { homeRoute, howItWorksRoute, faqRoute } from "../../routes";
import { useStyles } from "../useStyles";

const NavBar: React.FC = () => {
  const classes = useStyles();
  return (
    <div>
      <AppBar position="static" className={classes.navBar}>
        <Toolbar>
          <div
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "30rem",
            }}
          >
            <Typography color="inherit" variant="h4" noWrap>
              Better Deposits
            </Typography>
          </div>
          <Grid justify="flex-end" container>
            <Grid>
              <Button
                color="inherit"
                component={Link}
                to={homeRoute}
                size="large"
              >
                Home
              </Button>
            </Grid>
            <Button
              color="inherit"
              component={Link}
              to={howItWorksRoute}
              size="large"
            >
              How it works
            </Button>
          </Grid>
          <Grid>
            <Button color="inherit" component={Link} to={faqRoute} size="large">
              FAQ
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
