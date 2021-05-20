[TOC]

# 变量类型可能为空
```ts
type Nullable<T> = T | null;

const age:Nullable<number> = 1;
```

# 涉及`window`相关属性访问或赋值会报错【TS2339】
报错如下：`TypeScript error: Property 'X' does not exist on type 'Window'`

解决方案：
```ts
declare global {
    interface Window {
        FB:any;
    }
}

//声明全局之后就可以正常访问和赋值了
const FB = window.FB;
```

[详细方案](https://stackoverflow.com/questions/56457935/typescript-error-property-x-does-not-exist-on-type-window)

# 访问对象属性时可能未定义
报错：`'TS2532: Object is possibly 'undefined'?`

解决方案：使用`?`访问符【TS3.7之后可以使用】

[详细方案](https://stackoverflow.com/questions/54884488/how-can-i-solve-the-error-ts2532-object-is-possibly-undefined)
