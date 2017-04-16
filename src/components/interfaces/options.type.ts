export interface Options {

    /**
     * 通知类型
     * 
     * @type {string}
     * @default success
     */
    type?: 'success' | 'error' | 'info' | 'alert' | 'bare' | 'html';

    /**
     * ICON
     * 
     * @type {string}
     * @memberOf Options
     */
    icon?: string;

    /**
     * 标题
     * 
     * @type {string}
     */
    title?: string;

    /**
     * 消息内容
     * 
     * @type {string}
     */
    content?: string;

    /**
     * 自定义模板代码，支持 \{type\}、\{icon\}、\{title\}、\{content\} 字符串格式化。
     * 
     * @type {string}
     */
    html?: string;
 
    /**
     * 进入动画（可以使用animate.css），默认系统以淡入
     * 
     * @type string
     */
    animate_in?: string;
 
    /**
     * 离开动画（可以使用animate.css），默认系统以淡出
     * 
     * @type string
     */
    animate_out?: string;

    /**
     * 进度条
     * 
     * @type {boolean}
     * @default false
     */
    progress?: boolean;

    /**
     * 显示时长（单位：毫秒）
     * 
     * @type {number}
     * @default 3000 ms
     */
    timeout?: number;

    /**
     * 悬停时暂停
     * 
     * @type {boolean}
     * @default true
     */
    pauseOnHover?: boolean;

    /**
     * 点击时关闭
     * 
     * @type {boolean}
     * @default true
     */
    clickToClose?: boolean;

    /**
     * 主题类型
     * 
     * @type {('default' | 'bootstrap')}
     * @default 'default'
     */
    theme?: 'default' | 'bootstrap';

    /**
     * 文本方向从右到左
     * 
     * @type {boolean}
     * @default false
     */
    rtl?: boolean;

    /**
     * 自定义类名
     * 
     * @type {string}
     */
    className?: string;

    /**
     * 创建通知的回调
     * 
     * @type {Function}
     */
    onCreate?: Function;

    /**
     * 销毁通知的回调
     * 
     * @type {Function}
     */
    onDestroy?: Function;
}
