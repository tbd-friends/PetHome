import React from "react";
import { IAnimalSummary } from "../../../../../../utils/pethome.api";

interface PetsListItemProps {
    animal: IAnimalSummary;
}

export const AnimalDetail: React.FC<PetsListItemProps> = ({ animal }) => {
    return (
        <div>
            <div><label>Species</label>{animal.species}</div>
            <div><label>Color</label>{animal.color}</div>
            <div><label>Breed</label>{animal.breed}</div>
            <div><label>Gender</label>{animal.gender}</div>
            <div><label>Weight</label>{animal.weight}</div>
            <div><label>Tag</label>{animal.tag}</div>
            <div><label>circumstances</label>{animal.circumstances}</div>
            <div><label>Is Vet Required</label>{JSON.stringify(animal.vetRequired)}</div>
        </div>
    );
};
