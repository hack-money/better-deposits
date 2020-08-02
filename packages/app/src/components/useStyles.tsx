import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[600],
    },
    secondary: {
      main: blue[500],
    },
    background: {
      default: grey[50],
    },
  },
});

const sectionUpperPadding = 7;
const sectionLowerPadding = 7;
export const useStyles = makeStyles(() => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(8, 0, 15),
  },
  heroButtons: {
    marginTop: theme.spacing(2),
    paddingRight: theme.spacing(5),
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
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3, 2),
  },
  featureSection: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 7),
  },
  bottomSection: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 7),
  },
  getStarted: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(sectionUpperPadding, 0, sectionLowerPadding),
  },
  navBar: {
    backgroundColor: blue[600],
  },
  button: {
    backgroundColor: theme.palette.primary.main,
  },
  howItWorks: {
    padding: theme.spacing(sectionUpperPadding, 0, sectionLowerPadding),
    width: '100%',
  },
}));
