import { defaultIcons } from './interfaces/icons';
import { NotifyEvent } from './interfaces/notify-event.type';
import { HolderOptions } from './interfaces/holder.options';
import { Notify } from './interfaces/notify.type';
import { Component, OnInit, ViewEncapsulation, OnDestroy, EventEmitter } from '@angular/core';
import { NotifyComponent } from './notify.component';
import { NotifyOptions } from './notify.types';
import { Subscription } from "rxjs/Subscription";
import { NotifyService } from "./notify.service";

@Component({
    selector: 'notify-holder',
    template: `
    <div class="notifies" 
        [ngStyle]="styles"
        [ngClass]="options.position"
        [class]="options.className">
        <notify
            *ngFor="let n of notifies; let i = index"
            [item]="n"></notify>
    </div>
  `,
    styles: [`
    .notifies{position:fixed}
` ],
    encapsulation: ViewEncapsulation.None
})
export class NotifyHolderComponent implements OnInit, OnDestroy {

    public notifies: Notify[] = [];
    public options: HolderOptions;
    public styles: any = {};

    private listener: Subscription;

    constructor(private _service: NotifyService) {
        this.listener = this._service.getChangeEmitter().subscribe(item => {
            switch (item.command) {
                case 'clear':
                    this.notifies = [];
                    break;
                case 'remove':
                    this.remove(item.id!);
                    break;
                case 'set':
                    if (item.add)
                        this.add(item.notify!);
                    else
                        this.defaultBehavior(item);
                    break;
                case 'options':
                    this.options = Object.assign({
                        lastOnBottom: true,
                        minWidth: 300,
                        maxWidth: 300,
                        maxStack: 8,
                        position: ['right', 'bottom'],
                        offset: [20, 20],
                        zIndex: 1031
                    }, item.holderOptions!);
                    this.styles = {
                        'z-index': this.options.zIndex,
                        'min-width.px': this.options.minWidth,
                        'max-width.px': this.options.maxWidth
                    };
                    this.styles[this.options.position[0] + '.px'] = this.options.offset[0];
                    this.styles[this.options.position[1] + '.px'] = this.options.offset[1];
                    break;
                default:
                    this.defaultBehavior(item);
                    break;
            }
        });
    }

    ngOnInit() {
    }

    private defaultBehavior(value: NotifyEvent) {
        this.notifies.splice(this.notifies.indexOf(value.notify), 1);

        if (value.notify.onDestroy || this.options.onDestroy) {
            const emitItem = this.getEmit(value.notify, false);
            if (value.notify.onDestroy)
                value.notify.onDestroy(emitItem);

            if (this.options.onDestroy)
                this.options.onDestroy(emitItem);
        }
    }

    private getEmit(notify: Notify, to: boolean) {
        let res: Notify = {
            createdOn: notify.createdOn,
            id: notify.id,
            type: notify.type,
            icon: notify.icon,
            title: notify.title,
            content: notify.content,
            html: notify.html
        };
        if (!to) res.destroyedOn = new Date();
        return res;
    }

    private remove(id: string) {
        let index = 0,
            item: Notify = null,
            allow = false;

        this.notifies.forEach((notify, idx) => {
            if (notify.id === id) {
                index = idx;
                allow = true;
                item = notify;
            }
        });

        if (allow) {
            this.notifies.splice(index, 1);
        }
    }

    private add(item: Notify) {
        item = Object.assign({
            type: 'success',
            timeout: 1000 * 3,
            pauseOnHover: true,
            progress: false,
            clickToClose: true,
            theme: 'default',
            animate_in: 'notify-fade-in',
            animate_out: 'notify-fade-out',
            createdOn: new Date()
        }, item);

        if (!item.html) {
            switch (item.theme) {
                case 'bootstrap':
                    item.html = `<div class="alert alert-{bstype}" role="alert">
                        <strong>{title}</strong> {content}
                    </div>`;
                    break;
                default:
                    item.html = `<div class="notify-title">{title}</div><div class="notify-content">{content}</div><div class="notify-icon">{icon}</div>`;
                    break;
            }
        }

        if (this.options.lastOnBottom) {
            if (this.notifies.length >= this.options.maxStack)
                this.notifies.splice(0, 1);
            this.notifies.push(item);
        } else {
            if (this.notifies.length >= this.options.maxStack)
                this.notifies.splice(this.notifies.length - 1, 1);

            this.notifies.splice(0, 0, item);
        }

        if (item.onCreate || this.options.onCreate) {
            const emitItem = this.getEmit(item, true);
            if (item.onCreate)
                item.onCreate(emitItem);

            if (this.options.onCreate)
                this.options.onCreate(emitItem);
        }

    }

    ngOnDestroy(): void {
        if (this.listener)
            this.listener.unsubscribe();
    }

}
