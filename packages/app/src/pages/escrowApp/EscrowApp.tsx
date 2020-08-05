import React from 'react';
import Dashboard from '../../components/escrowApp/dashboard';
import { getUserWallet } from '../../web3/getUserWallet';

export default function EscrowApp() {
  // show all data for a user on the dashboard. Query deployed smart contracts to retrieve this
  // and then show it
  // need provider, need user to login, need to get data for the user, need to find the list of all user's escrowIds
  const wallet = getUserWallet();

  async function initialiseWallet() {
    await wallet.walletSelect();
    await wallet.walletCheck();
  }

  return (
    <React.Fragment>
      <button onClick={initialiseWallet}>Login</button>
      <Dashboard></Dashboard>
    </React.Fragment>
  );
}
