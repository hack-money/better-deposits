import {
  Create,
  Deposit,
  AgreementStart,
  AgreementFinish,
  Dispute,
  Withdraw,
  DepositReleaseApproval,
} from '../generated/BetterDeposits/Escrow';
import { Escrow } from '../generated/schema';

export function handleNewEscrow(event: Create): void {
  let escrow = new Escrow(event.params.id.toHex());
  escrow.escrowId = event.params.escrowId;
  escrow.userA = event.params.userA;
  escrow.userB = event.params.userB;
  escrow.save();
}

