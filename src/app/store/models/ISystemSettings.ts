export interface ICoreSystemSettings {
    siteName: string;
    [key: string]: any;
}

export interface ISiteSystemSettings {
    url: string;
    [key: string]: any;
}

export interface ISystemSettings {
    core: ICoreSystemSettings,
    site: ISiteSystemSettings;
}