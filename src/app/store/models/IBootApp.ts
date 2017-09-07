import {IUserPermission, IUserRole, User} from "./User";
import {ILocale, ITranslationValues} from "./ILang";
import {IItemSelectorConnector} from "./IItemSelector";
import {ISystemSettings} from "./ISystemSettings";

export interface IBootData {
    user: User,
    userModel: string,
    currentLocale: string,
    translations: ITranslationValues,
    locales: {
        [key: string] : ILocale
    },
    Settings: ISystemSettings,
    ItemSelector: {
        connectors: IItemSelectorConnector[]
    },
    ACL: {
        roles: IUserRole[];
        permissions: IUserPermission[];
        Gates: string[],
        maxLevel: number
    }
}