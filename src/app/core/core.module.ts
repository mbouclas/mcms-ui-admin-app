import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NotFoundPageComponent} from './containers/not-found-page';
import {LayoutComponent} from './components/layout';
import {LangService} from "./services/Lang.service";
import {ItemSelectorService} from "./services/itemSelector.service";

export const COMPONENTS = [
    NotFoundPageComponent,
    LayoutComponent,
    // NavItemComponent,
    // SidenavComponent,
    // ToolbarComponent,
];

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: COMPONENTS,
    exports: COMPONENTS,
    providers: [LangService, ItemSelectorService]
})
export class CoreModule {
    static forRoot() {
        return {
            ngModule: CoreModule,
            providers: [],
        };
    }
}
