import React from 'react';
import { makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

type InfoCardProps = {
  title: string;
};

export default function InfoCard(props: InfoCardProps) {
  const classes = useStyles();
  const { title } = props;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h4" component="h2">
          {title}
        </Typography>
        <Typography variant="body1" component="p">
          Main text
        </Typography>
      </CardContent>
      <CardContent></CardContent>
    </Card>
  );
}
