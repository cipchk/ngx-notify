# ngx-notify
一个无须依赖HTML模板、极简Angular通知组件。

[![NPM version](https://img.shields.io/npm/v/ngx-notify.svg)](https://www.npmjs.com/package/ngx-notify)
[![Build Status](https://travis-ci.org/cipchk/ngx-notify.svg?branch=master)](https://travis-ci.org/cipchk/ngx-notify)

通知组件优秀的非常多，但多数都是需要依赖组件模板，这一点让我很蛋疼，特别是你想做一些（例如：通用处理HTTP操作时）通过操作时，这时就懵逼不&……%￥，于是就有了这个轮子！

## Installation instructions

Install `ngx-notify` from `npm`

```
npm install ngx-notify --save
```

Import the `NotifyModule` in to your root `AppModule`.

```
import { NotifyModule } from 'ngx-notify';

@NgModule({
    imports: [
        BrowserModule,
        NotifyModule.forRoot({
            options: { },
            notify: {
                progress: true
            }
        })
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

## Usage & Demo

- [Live Demo](https://cipchk.github.io/ngx-notify/)
- [Stackblitz](https://stackblitz.com/edit/ngx-notify)

# Troubleshooting

Please follow this guidelines when reporting bugs and feature requests:

1. Use [GitHub Issues](https://github.com/cipchk/ngx-notify/issues) board to report bugs and feature requests (not our email address)
2. Please **always** write steps to reproduce the error. That way we can focus on fixing the bug, not scratching our heads trying to reproduce it.

Thanks for understanding!

## More

更多说明见：[中文版](https://github.com/cipchk/ngx-notify/blob/master/README-CN.md)

### License

The MIT License (see the [LICENSE](https://github.com/cipchk/ngx-notify/blob/master/LICENSE) file for the full text)
