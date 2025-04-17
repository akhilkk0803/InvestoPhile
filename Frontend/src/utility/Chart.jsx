import * as React from "react";
import { useState, useEffect } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";

// Assuming the goal data has this structure
// goal.allocation = { stock: 30, fixedDeposit: 25, gold: 20, govt_bond: 15, mutualFund: 10 }

const size = {
  width: 600,
  height: 200,
};

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 20,
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function PieChartWithCenterLabel({ goal }) {
  const [allocation, setAllocation] = useState([]);

  useEffect(() => {
    const { stock, fixedDeposit, gold, govt_bond, mutualFund } =
      goal.allocation;
    const allocationData = [
      { value: stock, label: "Stock" },
      { value: fixedDeposit, label: "Fixed Deposit" },
      { value: gold, label: "Gold" },
      { value: govt_bond, label: "Govt Bond" },
      { value: mutualFund, label: "Mutual Fund" },
    ];

    setAllocation(allocationData);
  }, [goal]);

  return (
    <NavLink to={"/goal/" + goal._id} state={{ goal }}>
      <PieChart series={[{ data: allocation, innerRadius: 80 }]} {...size}>
        <PieCenterLabel>{goal.goalName}</PieCenterLabel>
      </PieChart>
    </NavLink>
  );
}
