import React from "react";
import { AppBar, Button, Grid, Toolbar, Typography } from "@material-ui/core";
import { faqRoute } from "../../routes";
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
              <Button color="inherit" href={faqRoute} size="large">
                FAQ
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
