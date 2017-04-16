# ngx-notify
一个无须依赖HTML模板、极简Angular通知组件。

[![NPM version](https://img.shields.io/npm/v/ngx-notify.svg)](https://www.npmjs.com/package/ngx-notify)
[![Build Status](https://travis-ci.org/cipchk/ngx-notify.svg?branch=master)](https://travis-ci.org/cipchk/ngx-notify)

通知组件优秀的非常多，但多数都是需要依赖组件模板，这一点让我很蛋疼，特别是你想做一些（例如：通用处理HTTP操作时）通过操作时，这时就懵逼不&……%￥，于是就有了这个轮子！

## 示例

[在线示例](https://cipchk.github.io/ngx-notify/)

## 安装

```
npm install ngx-notify --save
```

添加 `NotifyModule` 模块到项目中：

```
import { NotifyModule } from 'ngx-notify';

@NgModule({
    imports: [BrowserModule, NotifyModule.forRoot({

    })],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

**全局选项**

`NotifyModule.forRoot` 有三个参数来指定通用全局配置。

| 名称    | 类型           | 默认值  | 描述 |
| ------- |:-------------:| -----:| -----:|
| container | HTMLElement | `document.body` | 通知组件容器 |
| options | HolderOptions |  | 通知容器组件配置项，见[HolderOptions](#holder-options) |
| notify | Options |  | 通知组件配置项，见[Options](#options) |

## 使用方法

通知的创建都是以 `NotifyService` 来驱动的，所以需要先将期注入到组件类中。

```
constructor(private notifyService: NotifyService) {}
```

创建一个类型为 `success` 的通知：

```
this.notifyService.success('title', 'content');
```

当然，你可以随时为某个通知覆盖默认[Options](#options)配置项。

```
// 10秒后关闭
this.notifyService.success('title', 'content', { timeout: 1000 * 10 });
```

## HolderOptions

| 名称    | 类型           | 默认值  | 描述 |
| ------- |:-------------:| -----:| -----:|
| position | Array | `[ 'right', 'bottom' ]` | 容器位置，包括值：`[ 'right' | 'left', 'top' | 'bottom']` |
| offset | Array | `[ 20, 20 ]` | 容器偏移值 |
| zIndex | number | 1031 | CSS `z-index` 值 |
| minWidth | number | 300 | CSS `min-width` 值 |
| maxWidth | number | 300 | CSS `max-width` 值 |
| maxStack | number | 8 | 最多显示数量，当超过时强制移除最旧的通知 |
| lastOnBottom | boolean | true | 是否从底部开始显示 |
| className | string |  | 自定义类名 |
| onCreate | Function |  | 创建通知的回调 |
| onDestroy | Function |  | 销毁通知的回调 |


## Options

| 名称    | 类型           | 默认值  | 描述 |
| ------- |:-------------:| -----:| -----:|
| type | string | success | 组件类型，取值范围：`'success' | 'error' | 'info' | 'alert' | 'bare' | 'html'` |
| icon | string | success | 图标样式，未指定默认会根据type自动切换，HTML格式，例如：`<img/>`、`<i class="iconfont"></i>`、`<svg/>` 等。 |
| title | string |  | 标题 |
| content | string |  | 内容 |
| theme | string | default | 主题，取值范围：`'default' | 'bootstrap'`。 |
| html | string |  | 自定义模板代码，支持 \{type\}、\{icon\}、\{title\}、\{content\} 字符串格式化。 |
| animate_in | string |  | 进入动画（可以使用animate.css），默认系统以淡入 |
| animate_out | string |  | 离开动画（可以使用animate.css），默认系统以淡出 |
| progress | boolean | false | 是否显示进度条 |
| timeout | boolean | 3000 | 显示时长（单位：毫秒） |
| pauseOnHover | boolean | true | 悬停时暂停 |
| clickToClose | boolean | true | 点击时关闭 |
| rtl | boolean | false | 文本方向从右到左 |
| className | string |  | 自定义类名 |
| onCreate | Function |  | 创建通知的回调 |
| onDestroy | Function |  | 销毁通知的回调 |

## Theme 主题

如果你需要使用 `bootstrap` （支持V3、V4）的话，需要引入 `bootstrap.css`，例如：

```
this.notifyService.success('title', 'content', { 
    theme: 'bootstrap'
});
```

或者，也可以自定义模板。

```
this.notifyService.success('title', 'content', { 
    className: 'my-notify',
    html: `<div class="notify-title">{title}</div>
<div class="notify-content">{content}</div>
<div class="notify-icon"><img src="//angular.io/resources/images/logos/angular/angular.svg"></div>
    `
});
```

自定义模板可以使用[Options](#options)中所有属性值，以 `{title}` 中括号来表示标题值。

**建议** 自定义模板时和 `className` 一起使用！

## Animate 动画效果

默认淡入淡出效果是由CSS实现，如果需要获得更多动画效果，可以引入`Animate.css`，例如：

```
this.notifyService.success('title', 'content', { 
    animate_in: 'fadeInLeft', 
    animate_out: 'fadeInRight' 
});
```

# Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/cipchk/ngx-notify/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

### License

The MIT License (see the [LICENSE](https://github.com/cipchk/ngx-notify/blob/master/LICENSE) file for the full text)
