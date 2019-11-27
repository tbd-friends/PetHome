import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core";
import { usePets } from "../../../hooks/pets/usePets";
import { getAnimalAction } from "../../../store/petHome/usePetHomeAction";
import { IAnimalSummary } from "../../../../../utils/pethome.api";
import { AnimalDetail } from "./components/animalDetail";
import { RouteChildrenProps } from "react-router";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1
        }
    })
);

export const DetailPage: React.FC<RouteChildrenProps<any>> = ({ match }) => {
    const { state, dispatch } = usePets();
    const classes = useStyles();
    const id = match !== null ? match.params.id : 'bob';

    const [animal, setAnimal] = React.useState<IAnimalSummary | undefined>();

    React.useEffect(() => {
        const animals = state.animals.data.filter((f: IAnimalSummary) => f.id === id);

        if (animals.length === 0 || animals === null) {
            getAnimalAction(dispatch, id);
        } else {
            setAnimal(animals[0]);
        }
    }, [state, dispatch]);

    return (
        <div className={classes.root}>
            <h1>Detail</h1>
            {state.animals.loading ? (
                "Loading..."
            ) : (
                    animal ? <AnimalDetail animal={animal} /> : null
                )}
        </div>
    );
};
