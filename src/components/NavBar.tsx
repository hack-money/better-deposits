import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default function NavBar() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography color="inherit" variant="h5" noWrap>
            Better Deposits
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
