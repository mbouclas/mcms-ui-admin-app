import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mcms-not-found-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>Not found</div>
  `,
})
export class NotFoundPageComponent {}
