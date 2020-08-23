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
  escrow.userA = event.params.userA;
  escrow.userB = event.params.userB;
  escrow.status = 'PRE-ACTIVE';
  escrow.save();
}

export function handleDeposit(event: Deposit): void {
  const id = event.params.escrowId.toHex();
  const escrow = Escrow.load(id)!;

  if (event.params.depositAddress === escrow.userA) {
    escrow.userADeposit = event.params.depositAmount;
  } else if (event.params.depositAddress === escrow.userB) {
    escrow.userBDeposit = event.params.depositAmount;
  }
}

export function handleAgreementStart(event: AgreementStart): void {
  const id = event.params.escrowId.toHex();
  const escrow = Escrow.load(id)!;
  escrow.status = 'STARTED';
}

export function handleAgreementFinish(event: AgreementFinish): void {
  const id = event.params.escrowId.toHex();
  const escrow = Escrow.load(id)!;
  escrow.status = 'STARTED';
}

export function handleDispute(event: Dispute): void {
  const id = event.params.escrowId.toHex();
  const escrow = Escrow.load(id)!;
  escrow.status = 'DISPUTE';
}
