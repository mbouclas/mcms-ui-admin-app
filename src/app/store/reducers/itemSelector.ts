import * as itemSelector from '../actions/itemSelector';
import {createFeatureSelector, createSelector} from "@ngrx/store";
import {IItemSelectorConnector} from "../models/IItemSelector";


export interface State {
    connectors: IItemSelectorConnector[]
}

const initialState: State = {
    connectors: []
};

export const getItemSelectorState = createFeatureSelector<State>('itemSelector');

export function reducer(state = initialState, action: itemSelector.Actions): State {
    switch (action.type) {
        case itemSelector.ITEM_SELECTOR_SET: {
            return {
                ...state,
                connectors: action.payload,
            };
        }

        default: return state;
    }
}

export const getConnectors = createSelector(
    getItemSelectorState,
    (state: State) => state.connectors
);


