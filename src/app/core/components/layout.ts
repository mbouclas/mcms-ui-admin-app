import {Component} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {LangService} from "../services/Lang.service";
import {ILocale} from "../../store/models/ILang";
import {IItemSelectorConnector} from "../../store/models/IItemSelector";
import {ItemSelectorService} from "../services/itemSelector.service";



@Component({
  template: `
   <div class="container">
       -- {{ currentLocale$ | async | json }} ---
       <div *ngIf="itemSelectors$ | async; let connectors">
           <h2>Available connectors</h2>
           <ul>
               <li *ngFor="let connector of connectors">
                   <a href="" (click)="selectConnector($event, connector)"> {{ connector.name }}</a>
               </li>
           </ul>
       </div>

       <div *ngIf="selectedConnector$ | async; let connector">
           <h2>Selected connector</h2>
           {{connector.name}} is a {{connector.type}} connector
       </div>
   </div>
  `,

})
export class LayoutComponent {

    currentLocale$: Observable<ILocale>;
    itemSelectors$: Observable<IItemSelectorConnector[]>;
    selectedConnector$: Observable<IItemSelectorConnector>;

    constructor( private langService: LangService, private itemSelectorService: ItemSelectorService) {

        this.currentLocale$ = this.langService.findLocaleAsync();
        this.itemSelectors$ = this.itemSelectorService.get();

        setTimeout(() => {
            // console.log(this.langService.currentLocale());
            console.log(this.langService.locales());
            console.log(this.itemSelectorService.getSync());

        }, 1000);
    }

    selectConnector(event, connector: IItemSelectorConnector) {
        event.preventDefault();
        this.selectedConnector$ = this.itemSelectorService.find(connector.name);
    }

}
