import React from "react";
import { newContextComponents } from "@drizzle/react-components";
import logo from "../logo.png";

const { AccountData, ContractData, ContractForm } = newContextComponents;

export default ({ drizzle, drizzleState }) => {
  // destructure drizzle and drizzleState from props
  return (
      <div className="section">
        <h2>Test</h2>
        <p>
          <strong>Stored Value: </strong>
          <ContractData
            drizzle={drizzle}
            drizzleState={drizzleState}
            contract="Raffle"
            method="countToRInfos"
            methodArgs = "0"
          />
        </p>
        <ContractForm drizzle={drizzle} contract="Raffle" method="getWinner" />
      </div>
  );
};
