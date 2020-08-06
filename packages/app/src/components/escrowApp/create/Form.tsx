import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
  },
}));

export default function InputAdornments() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const handleChange = (prop: any) => (event: any) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  // TODO: format better, stop text entererd in one box being entered in all
  // make a submit button, which will send all data off to smart contract
  return (
    <div className={classes.root}>
      <FormControl fullWidth className={classes.margin}>
        <InputLabel htmlFor="standard-adornment-amount">
          Deposit amount
        </InputLabel>
        <Input
          id="standard-adornment-amount"
          value={values.amount}
          onChange={handleChange('amount')}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </FormControl>
      <FormControl fullWidth className={classes.margin}>
        <InputLabel htmlFor="standard-adornment-amount">
          Counterparty Ethereum address
        </InputLabel>
        <Input
          id="standard-adornment-amount"
          value={values.amount}
          onChange={handleChange('amount')}
          startAdornment={<InputAdornment position="start"></InputAdornment>}
        />
      </FormControl>
      <FormControl fullWidth className={classes.margin}>
        <InputLabel htmlFor="standard-adornment-amount">
          Deposit required of counterparty
        </InputLabel>
        <Input
          id="standard-adornment-amount"
          value={values.amount}
          onChange={handleChange('amount')}
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
        />
      </FormControl>
      <FormControl fullWidth className={classes.margin}>
        <InputLabel htmlFor="standard-adornment-amount">
          Locked time period
        </InputLabel>
        <Input
          id="standard-adornment-amount"
          value={values.amount}
          onChange={handleChange('amount')}
          startAdornment={<InputAdornment position="start"></InputAdornment>}
        />
      </FormControl>
    </div>
  );
}
