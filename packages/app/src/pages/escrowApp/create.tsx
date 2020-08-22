import React from "react";
import { Contract } from "@ethersproject/contracts";
import CreateTable from "../../components/escrowApp/create/CreateTable";

interface Props {
  escrowContract: Contract;
}

const Create: React.FC<Props> = ({ escrowContract }) => (
  <CreateTable escrowContract={escrowContract} />
);

export default Create;
