import React from "react";
import { IAnimalSummary } from "../../../../../../utils/pethome.api";

interface PetsListItemProps {
  animal: IAnimalSummary;
}

export const PetsListItem: React.FC<PetsListItemProps> = ({ animal }) => {
  return (
    <tr>
      <td>{animal.species}</td>
      <td>{animal.color}</td>
      <td>{animal.breed}</td>
      <td>{animal.gender}</td>
      <td>{animal.weight}</td>
      <td>{animal.tag}</td>
      <td>{animal.circumstances}</td>
      <td>{JSON.stringify(animal.vetRequired)}</td>
    </tr>
  );
};
