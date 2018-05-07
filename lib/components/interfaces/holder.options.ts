import { EventEmitter } from '@angular/core';

export interface HolderOptions {
  /**
   * 位置，默认：`[ 'right', 'bottom' ]`
   */
  position?: ['right' | 'left', 'top' | 'bottom'];

  /**
   * 偏移值，默认：`[20, 20]`
   */
  offset?: [number, number];

  /**
   * z-index 值，默认：`1031`
   */
  zIndex?: number;

  /**
   * 最多显示数量，当超过时强制移除最旧的通知，默认：`8`
   */
  maxStack?: number;

  /**
   * 最小宽度，默认：`300`
   */
  minWidth?: number;

  /**
   * 最大宽度，默认：`300`
   */
  maxWidth?: number;

  /**
   * 是否从底部开始显示，默认：`true`
   */
  lastOnBottom?: boolean;

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
