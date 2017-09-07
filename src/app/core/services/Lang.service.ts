import {Injectable} from "@angular/core";
import {ILocale, ILocales} from "../../store/models/ILang";
import * as fromLang from "../../store/reducers/lang";
import {Store} from "@ngrx/store";
import "rxjs/add/operator/first";
import {find} from 'lodash';
import {Observable} from "rxjs/Observable";

@Injectable()
export class LangService {
    constructor(private store: Store<fromLang.State>){}
    localesToArray(localesObject: ILocales): ILocale[] {
        const localesArray: ILocale[] = [];

        for (const key in localesObject) {
            localesArray.push(localesObject[key]);
        }

        return localesArray;
    }

    /**
     * Sync function, if you want observable just get it from the store
     *
     * @return {string}
     */
    currentLocaleKey(): string {
        let found: string;

        this.store.select(fromLang.getCurrentLocale)
            .first()
            .subscribe((locale) => found = locale);

        return found;
    }

    /**
     * Sync function, if you want observable just get it from the store
     *
     * @return {ILocale}
     */
    currentLocale(): ILocale {
        return this.findLocale(this.currentLocaleKey());
    }

    /**
     * Sync function, if you want observable just get it from the store
     * If no locale key is passed, we return the default
     *
     * @param {string} locale
     * @return {ILocale}
     */
    findLocale(locale?: string): ILocale {
        let found: ILocale;

        if (typeof locale === 'undefined') {
            locale = this.currentLocaleKey();
        }

        this.store.select(fromLang.getLocales)
            .first()
            .subscribe((locales) => found = find(locales, {code: locale}));

        return found;
    }

    /**
     * If no locale key is passed, we return the default
     *
     * @param {string} locale
     * @return {Observable<ILocale>}
     */
    findLocaleAsync(locale?: string): Observable<ILocale> {
        if (typeof locale === 'undefined') {
            locale = this.currentLocaleKey();
        }

        return this.store.select(fromLang.getLocales)
            .map((locales) =>
                find(locales, {code: locale})
            );
    }

    /**
     *
     * @return {Observable<ILocale[]>}
     */
    localesAsync(): Observable<ILocale[]> {
        return this.store.select(fromLang.getLocales);
    }

    /**
     * Sync function
     *
     * @return {ILocale[]}
     */
    locales(): ILocale[] {
        let localesArray: ILocale[] = [];
        this.store.select(fromLang.getLocales)
            .first()
            .subscribe(locales => localesArray = locales);

        return localesArray;
    }
}