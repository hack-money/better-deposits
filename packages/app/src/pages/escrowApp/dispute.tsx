import React from "react";
import { Contract } from "@ethersproject/contracts";
import DisputeTable from "../../components/escrowApp/dispute/DisputeTable";

interface Props {
  escrowContract: Contract;
}

const Dispute: React.FC<Props> = ({ escrowContract }) => (
  <DisputeTable escrowContract={escrowContract} />
);

export default Dispute;
