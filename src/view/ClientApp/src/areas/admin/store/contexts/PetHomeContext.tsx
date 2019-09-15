import React, { useReducer } from "react";
import { IPetHomeContext, IPetHomeState } from './types';
import { petHomeReducer } from '../reducers/petHomeReducer';
import { applyPetHomeMiddleware } from '../petHome/applyPetHomeMiddleware';
import { usePetHomeAction } from '../petHome/usePetHomeAction';

const initialState: IPetHomeState = {
    animals: {
        loading: false,
        data: [],
        errors: []
    }
};

export const PetHomeContext = React.createContext<IPetHomeContext>({
    pethomeState: initialState,
    actions: {
        animals: {
            registerAnimal: (animal: any) => { }
        }
    }
});

export const PetHomeProvider: React.FC = ({
    children
}) => {
    const [pethomeState, dispatchEx] = useReducer(petHomeReducer, initialState);
    const dispatch = applyPetHomeMiddleware(dispatchEx);

    const actions = usePetHomeAction(dispatch);

    return (
        <PetHomeContext.Provider value={{ pethomeState, dispatch, actions }}>
            {children}
        </PetHomeContext.Provider>
    );
};
