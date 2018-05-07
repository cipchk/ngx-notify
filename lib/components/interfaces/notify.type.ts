import { EventEmitter } from '@angular/core';
import { Options } from './options.type';

export interface Notify extends Options {
  id?: string;

  createdOn?: Date;

  destroyedOn?: Date;

  click?: EventEmitter<{}>;

  [index: string]: any;
}
