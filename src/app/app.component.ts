import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>ngx-notify</h1>
    <p>一个无须依赖HTML模板、极简Angular通知组件。</p>
    <demo></demo>
  `,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
}
