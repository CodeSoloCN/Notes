# JavaScript高级程序设计
## BOM
### window 对象
window代表浏览器实例，即是JS访问浏览器窗口的接口，又是ECMAScript规定的Global对象，因此再任何地方都能访问到window的方法
#### 全局作用域
var全局变量会成为window的属性，let不会。全局变量不可以通过delete删除，而定义在window上的属性可以。
```js
var a = 1 // 通过var定义的变量会成为window的属性
let b = 2 // 而通let定义的不会
function fn1(){
    console.log('fnc')
}
window.a1 = 1
window.fn2 = function(){
    console.log('fnc2')
}

delete window.a // 无法删除
delete window.b
delete window.a1 // 可以删除
delete window.fn1 // 无法删除
delete window.fn2 // 可以删除
```
#### 窗口位置
window上的screenTop和screenlTeft，在chrome中表示浏览器窗口距离屏幕左上边缘的位置，而在IE中表示实际页面距离的位置。  
moveBy(x,y)和moveTo(x,y)进行移动
#### 窗口大小
innerHeight和innerWidth,表页面宽高，outerHeight和outerWidth表示浏览器窗口宽高，在chrome中相同仅仅表示视口宽高。  
使用Element.clientWidth和Element.clientHeight（Element即document.documentElement，为html标签）亦可检测。  
resizeBy(x,y)和resizeTo(x,y)可调整大小
#### 打开窗口
`window.open()`可以打开窗口，可以接受4个参数，window.open(String URL,String 窗口目标,String 特性字符串,Boolean 是否在历史记录中代替当前页)，通常只需要一个参数，第四个参数只在不打开新窗口的时候使用。  
- 窗口目标："_self","_parent","_top","_blank","窗口名或Fram名",若此参数不满足以上种字符串，则弹出串口，弹出的窗口由特性字符串配置
- 特性字符串："height:1000,fullscreen:no,toolbar:no"等
window.open()会返回打开窗口的引用，可通过该引用操作新窗口:
```js
var baiduWin = window.open("https://www.baidu.com","window","height:1000,width:1000")
baiduWin.resizeTo(500,500)
baiduWin.moveTo(500,500)
console.log(baidu.closed) // false
baiduWin.close() // 关闭页面
console.log(baidu.closed) // true
console.log(baiduWin.opener == window) // true
baiduWin.opener = null // 关闭新页面与当前页面的联系
```
**注意：** 弹出窗口通常会被拦截，若是被浏览器此时window.open()会返回null，若是被其他插件，会报错，因此使用后常检测，并放在try catch中。
#### `setTimeout`(超时调用)和`setInteral`(间歇调用)
均接受两个参数，第一个参数可以为字符串（类似eval()，不推荐使用）或者函数，第二个为Number,代表毫秒数。  
由于JavaScript是单线程解释器，所以**经过设定毫秒数后函数不一定会执行**。第二个毫秒数只是告诉JavaScript**经过多长时间后将其添加到任务队列中，若任务队列为空则会立即执行**  
返回值为间歇调用或者超时调用的ID，利用`clearTimeout(ID)`可以消除调用。  
在开发环境下，可以用`setTimeout`代替`setInterval`:
```js
var num = 0
var max = 10
function consoleNumber() {
    console.log(num)
    num++
    if (num < max) {
        setTimeout(consoleNumber, 500)
    } else {
        console.log("done")
    }
}
setTimeout(consoleNumber, 500)
```


