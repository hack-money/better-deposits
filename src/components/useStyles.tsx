import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
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
  howWorksSection: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 15),
  },
  featureSection: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 15),
  },
  bottomSection: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 15),
  },
  productHowItWorks: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 15),
  },
}));
