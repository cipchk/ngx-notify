import { NgModule, ModuleWithProviders, ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotifyPushService } from './components/push.service';
import { NotifyComponent } from './components/notify.component';
import { NotifyHolderComponent } from './components/notify-holder.component';
import { NotifyService } from './components/notify.service';
import { NotifyOptions } from './components/notify.types';
import { NotifyServiceConfig } from './components/notify.service.config';

export * from './components/interfaces/icons';
export * from './components/interfaces/notify-event.type';
export * from './components/interfaces/notify.type';
export * from './components/interfaces/options.type';
export * from './components/interfaces/holder.options';
export * from './components/interfaces/push.type';
export * from './components/notify.types';
export * from './components/notify-holder.component';
export * from './components/notify.component';
export * from './components/notify.service.config';
export * from './components/notify.service';
export * from './components/push.service';
export * from './components/notify.module';

/**
 * 通知服务工厂
 */
export function notifyServiceFactory(resolver: ComponentFactoryResolver, applicationRef: ApplicationRef, injector: Injector, config: NotifyOptions) {
    return new NotifyService(resolver, applicationRef, injector, config);
}

@NgModule({
    imports: [CommonModule],
    declarations: [NotifyHolderComponent, NotifyComponent],
    providers: [NotifyService, NotifyPushService],
    entryComponents: [NotifyHolderComponent, NotifyComponent]
})
export class NotifyModule {
    static forRoot(config: NotifyServiceConfig): ModuleWithProviders {
        return {
            ngModule: NotifyModule,
            providers: [
                { provide: NotifyServiceConfig, useValue: config },
                {
                    provide: NotifyService,
                    useFactory: notifyServiceFactory,
                    deps: [ComponentFactoryResolver, ApplicationRef, Injector, NotifyServiceConfig]
                }
            ]
        };
    }
}

