/* tslint:disable */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { NotifyService, NotifyPushService } from 'ngx-notify';

import { Http, RequestOptions, ResponseContentType, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

@Component({
    selector: 'demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DemoComponent implements OnInit {

    public item: any = {
        type: 'success', 
        title: '这是标题',
        content: '这是内容',
        html: `<div class="notify-title">{title}</div>
<div class="notify-content">{content}</div>
<div class="notify-icon"><img src="//angular.io/resources/images/logos/angular/angular.svg"></div>
        `
    };
    public logs: any[] = [];

    public options: any = {
        progress: true,
        timeout: 1000 * 3,
        pauseOnHover: true,
        clickToClose: true,
        theme: 'default',
        rtl: false,
        className: 'my-notify',
        animate_in: 'notify-fade-in',
        animate_out: 'notify-fade-out',
        onCreate: (item) => {
            this.logs.push(item);
        },
        onDestroy: (item) => {
            this.logs.push(item);
        }
    };

    public setting: any = {
        position: ['right', 'bottom'],
        offset: [ 20, 20 ],
        lastOnBottom: true,
        zIndex: 1031,
        minWidth: 300,
        maxWidth: 300
    };

    constructor(private _ns: NotifyService, private _nps: NotifyPushService) {
    }

    onCreate() {
        let opt = Object.assign({}, this.options);
        if(this.item.type === 'html') {
            this._ns.html(this.item.title, this.item.content, this.item.html, 'success', opt);
            return;
        }
        opt.className = '';
        this._ns[this.item.type](this.item.title, this.item.content, opt);
    }

    onSetting() {
        this._ns.success('操作', '保存成功', { timeout: 2000 });
        this._ns.updateSetting(this.setting);
    }

    onClearAll() {
        this._ns.clear();
    }

    public push: any = {
        title: '这是标题',
        body: '这是内容',
        icon: 'assets/logo.png',
        dir: 'auto',
        renotify: false,
        silent: true,
        sound: 'assets/system-fault.mp3'
    };
    
    onRequestPermission() {
        this._nps.requestPermission();
    }

    onPushCreate() {
        let opt = Object.assign({}, this.push);
        if (opt.renotify === true)
            opt.tag = '1';

        this._nps.create(opt.title, opt).subscribe();
    }

    ngOnInit() {
    }

}
