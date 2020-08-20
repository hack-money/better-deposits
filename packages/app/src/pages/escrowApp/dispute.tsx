import React from "react";
import { Contract } from "@ethersproject/contracts";
import DisputeTable from "../../components/escrowApp/dispute/DisputeTable";

interface DisputeProps {
  escrowContract: Contract;
}

export default function Dispute({ escrowContract }: DisputeProps) {
  return (
    <React.Fragment>
      <DisputeTable escrowContract={escrowContract} />
    </React.Fragment>
  );
}
