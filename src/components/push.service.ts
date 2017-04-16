import {
    Injectable, Optional, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef, EventEmitter
} from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Permission, PushNotify } from './interfaces/push.type';

declare const Notification: any;

@Injectable()
export class NotifyPushService {

    permission: Permission;

    constructor() {
        this.permission  = this.isSupported() ? Notification.permission : 'denied';
    }

    requestPermission() {
        if (this.isSupported())
            Notification.requestPermission((status: any) => this.permission = status);
    }

    isSupported() {
        return 'Notification' in window;
    }

    create(title: string, options?: PushNotify): any {

        return new Observable((obs: any) => {

            if (!this.isSupported()) {
                obs.error('不支持');
                obs.complete();
            }

            if (this.permission !== 'granted') {
                obs.error(`用户未授权`);
                obs.complete();
            }

            const n = new Notification(title, options);

            n.onshow = (e: any) => obs.next({notification: n, event: e});
            n.onclick = (e: any) => obs.next({notification: n, event: e});
            n.onerror = (e: any) => obs.error({notification: n, event: e});
            n.onclose = () => obs.complete();
        });
    }

}
