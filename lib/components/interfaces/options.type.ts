export interface Options {
  /**
   * 通知类型，默认：`success`
   */
  type?: 'success' | 'error' | 'info' | 'alert' | 'bare' | 'html';

  /**
   * ICON
   */
  icon?: string;

  /**
   * 标题
   */
  title?: string;

  /**
   * 消息内容
   */
  content?: string;

  /**
   * 自定义模板代码，支持 \{type\}、\{icon\}、\{title\}、\{content\} 字符串格式化。
   */
  html?: string;

  /**
   * 进入动画（可以使用animate.css），默认系统以淡入
   */
  animate_in?: string;

  /**
   * 离开动画（可以使用animate.css），默认系统以淡出
   */
  animate_out?: string;

  /**
   * 进度条，默认：`false`
   */
  progress?: boolean;

  /**
   * 显示时长（单位：毫秒），默认：`3000`
   */
  timeout?: number;

  /**
   * 悬停时暂停，默认：`true`
   */
  pauseOnHover?: boolean;

  /**
   * 点击时关闭，默认：`true`
   */
  clickToClose?: boolean;

  /**
   * 主题类型，默认：`default`
   */
  theme?: 'default' | 'bootstrap';

  /**
   * 文本方向从右到左，默认：`false`
   */
  rtl?: boolean;

  /**
   * 自定义类名
   */
  className?: string;

  /**
   * 创建通知的回调
   */
  onCreate?: Function;

  /**
   * 销毁通知的回调
   */
  onDestroy?: Function;
}
