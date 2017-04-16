import { NotifyPushService } from './push.service';
import { NotifyComponent } from './notify.component';
import { NotifyHolderComponent } from './notify-holder.component';
import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders, ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';

import { NotifyService } from './notify.service';
import { NotifyOptions } from './notify.types';
import { NotifyServiceConfig } from './notify.service.config';

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
