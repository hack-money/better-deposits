import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(
  id: any,
  start: any,
  end: any,
  party: any,
  value: any,
  status: any
) {
  return { id, start, end, party, value, status };
}

const rows = [
  createData(
    0,
    '7th February, 2020',
    '8th February 2021',
    'Housing agency A',
    '£1100',
    'active'
  ),
  createData(
    1,
    '14th May, 2020',
    '14th May, 2021',
    'Housing Agency B',
    '£750',
    'active'
  ),
  createData(
    2,
    '2nd July, 2020',
    '8th July, 2020',
    'Travel agency',
    '£125',
    'inactive'
  ),
];

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Orders() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Deposit overview</Title>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Start date</TableCell>
            <TableCell>End date</TableCell>
            <TableCell>Party</TableCell>
            <TableCell>Value</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.start}</TableCell>
              <TableCell>{row.end}</TableCell>
              <TableCell>{row.party}</TableCell>
              <TableCell>{row.value}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
