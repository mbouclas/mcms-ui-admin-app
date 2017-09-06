import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotFoundPageComponent } from './containers/not-found-page';
import { LayoutComponent } from './components/layout';

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
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [],
    };
  }
}
