import {ISimpleObject} from "./ISimpleObject";

export interface IConnectorFilter {
    key: string;
    label: string;
    type?: string;
    values?: any[];
    "default"?: boolean
}

export interface IConnectorSection {
    name: string;
    filterService: string;
    filterMethod: string;
    settings: ISimpleObject;
    filters: IConnectorFilter[];
    titleField: string;
    slug_pattern?: string;
}

export interface IConnector {
    model: string;
    sections: {};
    settings: ISimpleObject;
    order: number;
}
export interface IItemSelectorConnector {
    name: string;
    connector: IConnector,
    order: number,
    type: string
}
