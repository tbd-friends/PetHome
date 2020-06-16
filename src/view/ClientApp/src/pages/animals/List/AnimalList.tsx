import React from "react";
import { AnimalListItem } from "./AnimalListItem";
import { Animal } from "../../../store/Animals/types";

interface AnimalListProps {
  animals: Animal[];
}

const renderAnimals = (animals: Animal[]) =>
  animals.map(animal => <AnimalListItem key={animal.id} animal={animal} />);

export const AnimalList: React.FC<AnimalListProps> = ({ animals }) => {
  return animals && animals.length > 0 ? (
    <table>
      <thead>
        <tr>
          <td>Species</td>
          <td>Color</td>
          <td>Breed</td>
          <td>Gender</td>
          <td>Weight</td>
          <td>Tag</td>
          <td>Circumstances</td>
          <td>Vet Required</td>
          <td>Actions</td>
        </tr>
      </thead>
      <tbody>{renderAnimals(animals)}</tbody>
    </table>
  ) : (
    <span>No Animals in system</span>
  );
};
