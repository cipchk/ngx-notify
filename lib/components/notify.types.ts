import { EventEmitter } from '@angular/core';

/**
 * 配置项
 */
export interface NotifyOptions {
  /**
   * 类型，默认：`success`
   */
  type?: string;

  /**
   * 指定icon值
   */
  icon?: string;
  /**
   * 标题
   */
  title?: string;
  /**
   * 通知内容
   */
  content?: string;

  /**
   * 位置，默认：`top-right`
   */
  position?: string;

  /**
   * 偏移值，默认：`{ x: 20, y: 20 }`
   */
  offset?: { x: number; y: number };

  /**
   * z-index 值，默认：`1031`
   */
  z_index?: number;

  /**
   * 进度条，默认：`false`
   */
  progress?: boolean;

  /**
   * 链接地址，当存在时，点击进行跳转
   */
  url?: string;

  /**
   * 链接目标
   */
  target?: string;

  /**
   * 自定义模板代码，支持类似 C# String.format 字符串格式化。
   * - `{0}` 类型
   * - `{1}` 标题
   * - `{2}` 内容
   */
  template?: string;

  /**
   * 显示时回调
   */
  onShow?: Function;

  /**
   * 关闭时回调
   */
  onClosed?: Function;

  click?: EventEmitter<{}>;
}
