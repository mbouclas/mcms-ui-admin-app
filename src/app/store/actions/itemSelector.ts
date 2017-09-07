import {Action} from "@ngrx/store";
import {IItemSelectorConnector} from "../models/IItemSelector";


export const ITEM_SELECTOR_SET = '[ITEM_SELECTOR] Set Settings';

export class ItemSelectorSetAction implements Action {
    readonly type = ITEM_SELECTOR_SET;

    constructor(public payload: IItemSelectorConnector[]) {}
}


export type Actions =
    | ItemSelectorSetAction;