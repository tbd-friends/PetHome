import React from "react";
import { IAnimalSummary } from "../../../../../../utils/pethome.api";
import { PetsListItem } from "./PetsListItem";

interface PetsListProps {
  animals: IAnimalSummary[];
}

const renderAnimals = (animals: IAnimalSummary[]) => {
  return animals.map(animal => {
    return <PetsListItem key={animal.id} animal={animal} />;
  });
};

export const PetsList: React.FC<PetsListProps> = ({ animals }) => {
  return (
    <table>
      <thead>
        <td>Species</td>
        <td>Color</td>
        <td>Breed</td>
        <td>Gender</td>
        <td>Weight</td>
        <td>Tag</td>
        <td>Circumstances</td>
        <td>Vet Required</td>
      </thead>
      <tbody>{renderAnimals(animals)}</tbody>
    </table>
  );
};
