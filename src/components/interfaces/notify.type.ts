import { Options } from './options.type';
import { EventEmitter } from '@angular/core';

export interface Notify extends Options {
    id?: string;

    createdOn?: Date;

    destroyedOn?: Date;

    click?: EventEmitter<{}>;

    [index: string]: any;
}
