import { EventEmitter } from '@angular/core';

/**
 * 配置项
 */
export interface NotifyOptions {
    /**
     * 类型
     *
     * @type {string}
     * @default 'success'
     */
    type?: string;

    /**
     * 指定icon值
     *
     * @type {string}
     */
    icon?: string;
    /**
     * 标题
     *
     * @type {string}
     */
    title?: string;
    /**
     * 通知内容
     *
     * @type {string}
     */
    content?: string;

    /**
     * 位置
     *
     * @type {string}
     * @default 'top-right'
     */
    position?: string;

    /**
     * 偏移值
     *
     * @type {{ x: number, y: number }}
     * @default { x: 20, y: 20 }
     */
    offset?: { x: number, y: number };

    /**
     * z-index 值
     *
     * @type {number}
     * @default 1031
     */
    z_index?: number;

    /**
     * 进度条
     *
     * @type {boolean}
     * @default false
     */
    progress?: boolean;

    /**
     * 链接地址，当存在时，点击进行跳转
     *
     * @type {string}
     */
    url?: string;

    /**
     * 链接目标
     *
     * @type {string}
     */
    target?: string;

    /**
     * 自定义模板代码，支持类似 C# String.format 字符串格式化。
     * {0} = type
     * {1} = title
     * {2} = message
     *
     * @type {string}
     */
    template?: string;

    /**
     * 显示时回调
     *
     * @type {Function}
     */
    onShow?: Function;

    /**
     * 关闭时回调
     *
     * @type {Function}
     */
    onClosed?: Function;

    click?: EventEmitter<{}>;
}
