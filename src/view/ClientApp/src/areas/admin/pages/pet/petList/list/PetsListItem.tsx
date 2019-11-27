import React from "react";
import { IAnimalSummary } from "../../../../../../utils/pethome.api";
import { RouteChildrenProps } from "react-router";
import { Link } from "react-router-dom";

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
      <td><Link to={`/admin/pets/detail/${animal.id}`}>Detail</Link></td>
      {/*{() => this.props.navigation.navigate(`/admin/pets/detail/${animal.id}`)}*/}
      {/* <td><a href={`/admin/pets/detail/${animal.id}`}>Detail</a></td> */}
      {/* <td><a onClick={() => navigation.navigate(`/admin/pets/detail/${animal.id}`)}>Detail</a></td> */}
    </tr>
  );
};
