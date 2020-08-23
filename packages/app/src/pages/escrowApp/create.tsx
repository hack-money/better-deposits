import React from "react";
import CreateTable from "../../components/escrowApp/create/CreateTable";
import { BetterDeposit } from "../../contracts/BetterDeposit";

interface Props {
  escrowContract: BetterDeposit;
}

const Create: React.FC<Props> = ({ escrowContract }) => (
  <CreateTable escrowContract={escrowContract} />
);

export default Create;
