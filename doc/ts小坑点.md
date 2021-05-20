[TOC]

# `undefined`与`?`的不同
使用`?`表示此项可以没有，而`undefined`并不能使此项不传
```ts
function foo1(param?:number){};//通过
function foo2(param: number | undefined){};//报错

foo1();//调用
```
