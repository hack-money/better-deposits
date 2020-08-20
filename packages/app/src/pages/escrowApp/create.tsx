import React from "react";
import { Contract } from "@ethersproject/contracts";
import CreateTable from "../../components/escrowApp/create/CreateTable";

interface CreateProps {
  escrowContract: Contract;
}

export default function Create({ escrowContract }: CreateProps) {
  return (
    <React.Fragment>
      <CreateTable escrowContract={escrowContract} />
    </React.Fragment>
  );
}
