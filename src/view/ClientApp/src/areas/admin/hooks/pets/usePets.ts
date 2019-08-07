import React from "react";
import { PetHomeContext } from "../../store/contexts/PetHomeContext";
import { PetHomeActions } from "../../store/reducers/types";

export const usePets = () => {
  const [petHomeContext, dispatch] = React.useContext(PetHomeContext);
  return [petHomeContext, {}];
};
