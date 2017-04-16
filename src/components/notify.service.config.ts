import { Options } from './interfaces/options.type';
import { HolderOptions } from './interfaces/holder.options';

export class NotifyServiceConfig {
    /**
     * 容器
     * 
     * @type {HTMLElement}
     * @default `document.body`
     */
    container?: HTMLElement = null;

    options?: HolderOptions;

    notify?: Options;
}
