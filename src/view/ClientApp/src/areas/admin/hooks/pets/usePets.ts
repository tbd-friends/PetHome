import React from "react";
import { PetHomeContext } from "../../store/contexts/PetHomeContext";
import { IPetHomeContext } from "../../store/contexts/types";

export const usePets = (): IPetHomeContext => {
    const petHomeContext = React.useContext(PetHomeContext);
    return petHomeContext;
};
