import React from "react";
import { Link } from "react-router-dom";
import { Animal } from "../../../store/Animals/types";

interface AnimalListItemProps {
  animal: Animal;
}

export const AnimalListItem: React.FC<AnimalListItemProps> = ({ animal }) => {
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
      <td>
        <Link to={`/animal/details/${animal.id}`}>Detail</Link>{" "}
        <Link to={`/animal/edit/${animal.id}`}>Edit</Link>
      </td>
    </tr>
  );
};
