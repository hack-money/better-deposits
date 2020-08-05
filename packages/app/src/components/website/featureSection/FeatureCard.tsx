import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Typography, withStyles, Theme, Container } from '@material-ui/core';
import { Styles } from '@material-ui/core/styles/withStyles';
import { shadeColor } from '../../shadeColor';

const styles: Styles<Theme, {}, 'iconWrapper'> = (theme: any) => ({
  iconWrapper: {
    borderRadius: theme.shape.borderRadius,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1) * 1.5,
  },
});

type FeatureCardProps = {
  classes: any;
  Icon: any;
  color: any;
  headline: string;
  text: string;
};
function FeatureCard(props: FeatureCardProps) {
  const { classes, Icon, color, headline, text } = props;
  return (
    <Fragment>
      <Container
        className={classes.iconWrapper}
        style={{
          color: color,
          backgroundColor: shadeColor(color, 0.5),
          width: '75px',
        }}
      >
        {Icon}
      </Container>
      <Typography variant="h5" paragraph align="center">
        {headline}
      </Typography>

      <Typography variant="body1" color="textSecondary" align="center">
        {text}
      </Typography>
    </Fragment>
  );
}

FeatureCard.propTypes = {
  classes: PropTypes.object.isRequired,
  Icon: PropTypes.element.isRequired,
  color: PropTypes.string.isRequired,
  headline: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default withStyles(styles, { withTheme: true })(FeatureCard);
