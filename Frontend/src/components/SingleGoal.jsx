import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const SingleGoal = () => {
  const { goalid } = useParams();
  useEffect(() => {
    
  }, [goalid]);
  return <div>{goalid}</div>;
};

export default SingleGoal;
