import React from "react";
import DisputeTable from "../../components/escrowApp/dispute/DisputeTable";
import { BetterDeposit } from "../../contracts/BetterDeposit";

interface Props {
  escrowContract: BetterDeposit;
}

const Dispute: React.FC<Props> = ({ escrowContract }) => (
  <DisputeTable escrowContract={escrowContract} />
);

export default Dispute;
