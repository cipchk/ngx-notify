import {
  NgModule,
  ModuleWithProviders,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotifyPushService } from './components/push.service';
import { NotifyComponent } from './components/notify.component';
import { NotifyHolderComponent } from './components/notify-holder.component';
import { NotifyService } from './components/notify.service';
import { NotifyOptions } from './components/notify.types';
import { NotifyServiceConfig } from './components/notify.service.config';

@NgModule({
  imports: [CommonModule],
  declarations: [NotifyHolderComponent, NotifyComponent],
  providers: [NotifyService, NotifyPushService],
  entryComponents: [NotifyHolderComponent, NotifyComponent],
})
export class NotifyModule {
  static forRoot(config?: NotifyServiceConfig): ModuleWithProviders {
    return {
      ngModule: NotifyModule,
      providers: [{ provide: NotifyServiceConfig, useValue: config }],
    };
  }
}
