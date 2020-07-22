import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import lightBlue from '@material-ui/core/colors/lightBlue';
import grey from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[700],
    },
    secondary: {
      main: blue[500],
    },
    background: {
      default: grey[100],
    },
  },
});

export const useStyles = makeStyles(() => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(8, 0, 15),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
  featureSection: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 7),
  },
  bottomSection: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 7),
  },
  productHowItWorks: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 7),
  },
  navBar: {
    backgroundColor: theme.palette.primary.main,
  },
  button: {
    backgroundColor: theme.palette.primary.main,
  },
}));
