import {
  Create,
  Deposit,
  AgreementStart,
  AgreementFinish,
  Dispute,
  Withdraw,
  DepositReleaseApproval,
} from '../generated/BetterDeposits/BetterDeposits';
import { Escrow } from '../generated/schema';

export function handleNewEscrow(event: Create): void {
  let escrow = new Escrow(event.params.escrowId.toHex());
  escrow.id = event.params.escrowId.toString();
  escrow.user = event.params.userA;
  escrow.counterParty = event.params.userB;
  escrow.save();
}
