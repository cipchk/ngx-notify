import { Component, OnDestroy, Input, ViewEncapsulation, OnInit, NgZone } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Notify } from './interfaces/notify.type';
import { NotifyService } from './notify.service';

@Component({
    selector: 'notify',
    template: `
    <div class="notify"
        (click)="onClick($event)"
        [ngClass]="classes" 
        [class]="animate"
        (mouseenter)="onEnter()"
        (mouseleave)="onLeave()">
        <div [innerHTML]="html"></div>
        <div class="notify-progress" *ngIf="item.progress">
            <span [ngStyle]="{'width': progressWidth + '%'}"></span>
        </div>
    </div>`,
    styles: [`
.notify{width:100%;box-sizing:border-box;position:relative;margin-bottom:10px;color:#fff;cursor:pointer;transition:all 0.5s}.notify-theme-default{padding:10px 20px}.notify-theme-default.notify-alert{background:#ffdb5b}.notify-theme-default.notify-alert .notify-progress span{background:#edc242}.notify-theme-default.notify-success{background:#8BC34A}.notify-theme-default.notify-success .notify-progress span{background:#689F38}.notify-theme-default.notify-error{background:#F44336}.notify-theme-default.notify-error .notify-progress span{background:#D32F2F}.notify-theme-default.notify-info{background:#03A9F4}.notify-theme-default.notify-info .notify-progress span{background:#0288D1}.notify-theme-bootstrap.notify-alert .notify-progress span{background:#edc242}.notify-theme-bootstrap.notify-success .notify-progress span{background:#689F38}.notify-theme-bootstrap.notify-error .notify-progress span{background:#D32F2F}.notify-theme-bootstrap.notify-info .notify-progress span{background:#0288D1}.notify-title{margin:0;padding:0;line-height:30px;font-size:16px;font-weight:bold}.notify-content{margin:0;font-size:14px;padding:0 50px 0 0;line-height:20px}.notify-icon{position:absolute;box-sizing:border-box;top:0;right:0;height:100%;max-width:70px;width:100%}.notify-icon svg{width:100%;height:100%;padding:10px;fill:#fff}.notify-icon>*{max-width:70px}.notify-progress{position:absolute;top:0;left:0;width:100%;height:5px}.notify-progress span{float:left;height:100%}.notify-rtl{direction:rtl}.notify-rtl .notify-content{padding:0 0 0 50px}.notify-rtl .notify-icon{left:0;right:auto}.notify-fade-in{animation-duration:1s;animation-fill-mode:both;-webkit-animation-name:fadeIn;animation-name:fadeIn}.notify-fade-out{animation-duration:1s;animation-fill-mode:both;-webkit-animation-name:fadeOut;animation-name:fadeOut}@-webkit-keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@keyframes fadeIn{0%{opacity:0}100%{opacity:1}}@-webkit-keyframes fadeOut{0%{opacity:1}100%{opacity:0}}@keyframes fadeOut{0%{opacity:1}100%{opacity:0}}
`],
    encapsulation: ViewEncapsulation.None
})
export class NotifyComponent implements OnInit, OnDestroy {

    @Input() public item: Notify;
    public html: SafeHtml;
    public animate: string;
    public classes: any = {};

    constructor(private sanitizer: DomSanitizer, private zone: NgZone, private notifyService: NotifyService) { }

    ngOnInit(): void {

        switch (this.item.theme) {
            case 'bootstrap': 
                switch (this.item.type) {
                    case 'alert':
                        this.item.bstype = 'warning';
                        break;
                    case 'error':
                        this.item.bstype = 'danger';
                        break;
                    default:
                        this.item.bstype = this.item.type;
                        break;
                }
                break;
        }

        this.html = this.sanitizer.bypassSecurityTrustHtml(this.item.html.replace(/\{([a-z]+)\}/g, (full, key) => {
            return this.item[key] || '';
        }));

        this.classes['notify-theme-' + this.item.theme] = true;
        this.classes['notify-' + this.item.type] = true;

        if (this.item.rtl === true)
            this.classes['notify-rtl'] = true;

        if (this.item.animate_in) {
            this.classes['animated'] = true;
            this.classes[this.item.animate_in] = true;
        }

        if (this.item.className) {
            this.classes[this.item.className] = true;
        }

        if (this.item.timeout > 0)
            this.startTimeout();
    }

    private stopTime = false;
    private timer: any;
    private steps: number;
    private speed: number;
    private start: any;
    private count = 0;
    private diff: any;
    private startTimeout() {
        this.steps = this.item.timeout / 10;
        this.speed = this.item.timeout / this.steps;
        this.start = new Date().getTime();
        this.zone.runOutsideAngular(() => this.timer = setTimeout(this.instance, this.speed));
    }

    public progressWidth = 0;
    private instance = () => {
        this.zone.runOutsideAngular(() => {
            this.zone.run(() => this.diff = (new Date().getTime() - this.start) - (this.count * this.speed));

            if (this.count++ >= this.steps) {
                this.zone.run(() => {
                    this.remove();
                });
            } else if (!this.stopTime) {
                if (this.item.progress) 
                    this.zone.run(() => this.progressWidth += 100 / this.steps);

                this.timer = setTimeout(this.instance, (this.speed - this.diff));
            }
        });
    };

    onEnter(): void {
        if (this.item.pauseOnHover) {
            this.stopTime = true;
        }
    }

    onLeave(): void {
        if (this.item.pauseOnHover) {
            this.stopTime = false;
            setTimeout(this.instance, (this.speed - this.diff));
        }
    }

    onClick($e: MouseEvent): void {
        this.item.click!.emit($e);

        if (this.item.clickToClose) {
            this.remove();
        }
    }

    private remove() {
        if (this.item.animate_out) {
            this.classes[this.item.animate_in] = false;
            this.classes[this.item.animate_out] = true;
            this.zone.runOutsideAngular(() => {
                setTimeout(() => {
                    this.zone.run(() => this.notifyService.set(this.item, false))
                }, 500);
            })
        } else {
            this.notifyService.set(this.item, false);
        }
    }

    ngOnDestroy(): void {
        clearTimeout(this.timer);
    }


}
