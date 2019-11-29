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
#### 系统对话框
对话框与html没有关系，外观由浏览器，或者操作系统决定。打开的对话框是同步和模态（不能点击）的，也就是说显示对话框时代码会停止运行。
- `alert()`:提示，接受一个字符串参数。
- `confirm()`:确认，接受一个字符串参数，返回值为boolean。
- `prompt()`:输入，接受两个字符串参数，第一个是提示信息，第二个是输入框默认值
- `find()|print()`:显示查找框和打印框，非标准。
### location 对象
location对象既是window的属性，亦是document的属性，即`window.location == document.location`。  
location对象保存着当前文档的有关信息，还将URL解析为<a id="location">独立的片段</a>，并提供了一些导航功能。
- hash：返回URL中的hash，如"#section1"
- host：返回服务器名称和端口号（如果有）
- hostname：返回服务器名称，无端口号
- href：返回完整的URL，和`location.toString()`相同
- pathname：返回URL中的目录和文件名
- port：返回端口号，若不存在返回空字符串
- protocol：返回使用的协议
- search：返回URL查询字符，即问号传参的字符串，若不存在返回空字符串
#### 获取查询字符串参数
```js
function getQueryStringArgs(){
    const qs = (location.search.length>0 ? location.search.substring(1) : "")
    const args = {}
    let items = qs.length ? qs.split("&") : [],
        item = null,
        name = null,
        value = null
    const len = items.length
    for(let i = 0;i<len;i++){
        item = items[i].split("=")
        name = decodeURIComponent(item[0]) // 解码URI
        value = decodeURIComponent(item[1])
        if(name.length){
            args[name] = value
        }
    }
    return args
}
```
#### 位置操作
- 传递新的URL在浏览器中生成历史记录，三者使用效果相同，后两者也会调用assign方法，最常用的是`location.href`。
    - `location.assign(URL)`
    - `window.location = URL`
    - `location.href = URL`
- 部分改变URL，仅会改变部分ULR，生成历史记录，其中除了hash之外，均会重新加载页面，均为location的属性。
    - 同对[location的URL解析](#location)，如`location.hash = "#section1"`
- 不生成浏览历史记录的方法：`location.replace(URL)`
- 页面重新加载
```js
location.reload() // 重新加载，有可能使用缓存
location.reload(true) // 真·从服务器重新加载
```
reload()调用后，其之后的代码可能不执行，也可能执行，主要取决于网络延迟和系统资源等，所以建议把其放在代码最后一行。
### navigator 对象
储存着浏览器信息，包括版本插件等。
### screen 对象
浏览器窗口外，显示器信息，如显示器像素`screen.width screen.height`
### history 对象
每个浏览器窗口，乃至每个框架都有自己的history对象，保存着该窗口的浏览记录。出于安全考虑，浏览记录对开发者不可见，但仍可进行一些操作。
- history.go()：参数为一个数字或者字符串，整数表示向前n页，负数表示向后n页，字符串表示跳转到历史中包含该字符串中的第一个网页（就近原则）。
```js
history.go(-1) // 后退一页
history.go(1) // 前进一页
history.go("baidu.com")
```
- history.back() history.forward()：两个简写方法，分别模仿浏览器的前进后退。
- history.length：保存着历史记录的**总条数**，Internet Explorer和Opera从0开始，而Firefox、Chrome和Safari从1开始。可通过判断其值确认当前页面是否为第一个打开的页面
