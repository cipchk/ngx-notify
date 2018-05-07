import {
  Injectable,
  Optional,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  EmbeddedViewRef,
  EventEmitter,
} from '@angular/core';
import { Subject } from 'rxjs';

import { HolderOptions } from './interfaces/holder.options';
import { Notify } from './interfaces/notify.type';
import { Options } from './interfaces/options.type';
import { NotifyEvent } from './interfaces/notify-event.type';
import { Icons, defaultIcons } from './interfaces/icons';
import { NotifyServiceConfig } from './notify.service.config';
import { NotifyComponent } from './notify.component';
import { NotifyHolderComponent } from './notify-holder.component';

@Injectable()
export class NotifyService {
  private emitter: Subject<NotifyEvent> = new Subject<NotifyEvent>();
  private icons: Icons = defaultIcons;

  private notifyHolderComponent: NotifyHolderComponent;

  private container: HTMLElement;

  constructor(
    private resolver: ComponentFactoryResolver,
    private applicationRef: ApplicationRef,
    private injector: Injector,
    @Optional() private config: NotifyServiceConfig,
  ) {
    if (config) {
      this.container = config.container;
    }
  }

  set(notify: Notify, to: boolean = true) {
    if (!this.notifyHolderComponent) {
      this.notifyHolderComponent = this.createNotifyHolder();
      this.updateSetting({});
    }

    if (to) {
      notify = Object.assign({}, this.config.notify, notify);
      notify.id = notify.id
        ? notify.id
        : Math.random()
            .toString(36)
            .substring(3);
      notify.click = new EventEmitter<{}>();
    }

    this.emitter.next({ command: 'set', notify: notify, add: to });
    return notify;
  }

  updateSetting(options: HolderOptions) {
    this.emitter.next({
      command: 'options',
      holderOptions: Object.assign({}, this.config.options, options),
    });
  }

  private createNotifyHolder(): NotifyHolderComponent {
    const factory = this.resolver.resolveComponentFactory(
        NotifyHolderComponent,
      ),
      ref = factory.create(this.injector),
      rootNode = (ref.hostView as EmbeddedViewRef<any>)
        .rootNodes[0] as HTMLElement;

    if (!this.container) {
      this.container = document.body;
    }

    this.applicationRef.attachView(ref.hostView);
    ref.onDestroy(() => {
      this.applicationRef.detachView(ref.hostView);
    });

    this.container.appendChild(rootNode);
    return ref.instance;
  }

  getChangeEmitter() {
    return this.emitter;
  }

  success(title: string, content?: string, override?: Options) {
    return this.set(
      Object.assign({}, override, {
        title: title,
        content: content || '',
        type: 'success',
        icon: this.icons.success,
      }),
    );
  }

  error(title: string, content?: string, override?: Options) {
    return this.set(
      Object.assign({}, override, {
        title: title,
        content: content || '',
        type: 'error',
        icon: this.icons.error,
      }),
    );
  }

  alert(title: string, content?: string, override?: Options) {
    return this.set(
      Object.assign({}, override, {
        title: title,
        content: content || '',
        type: 'alert',
        icon: this.icons.alert,
      }),
    );
  }

  info(title: string, content?: string, override?: Options) {
    return this.set(
      Object.assign({}, override, {
        title: title,
        content: content || '',
        type: 'info',
        icon: this.icons.info,
      }),
    );
  }

  bare(title: string, content: string, type: string, override?: Options) {
    return this.set(
      Object.assign({}, override, {
        title: title,
        content: content || '',
        type: type,
      }),
    );
  }

  html(
    title: string,
    content: string,
    html: string,
    type?: string,
    override?: Options,
  ) {
    return this.set(
      Object.assign({}, override, {
        title: title,
        content: content || '',
        html: html,
        type: type,
      }),
    );
  }

  remove(id: string) {
    this.emitter.next({ command: 'remove', id: id });
  }

  clear() {
    this.emitter.next({ command: 'clear' });
  }
}
