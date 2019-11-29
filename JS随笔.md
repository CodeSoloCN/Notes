## arguments
### argumrnts只存在于function定义的函数中
### 使用arguments可模拟函数重载
### 一个坑
```js
let len = 10;
function fn() {
	console.info(this.len)
}
fn();  // undefined
let Person = {
	len: 5,
	say: function() {
		fn();  // undefined
		arguments.len = 20;
		arguments[0]();  // 20
	}
}
Person.say(fn);
Person.len // 5
```
arguments是个类数组，`arguments.len = 20`只是在arguments上定义了一个名为len的属性，`arguments[0]();`相当于arguments对象调用的自己的fn方法
## URI的解码与编码
 ```js
 decodeURIComponent("https://www.baidu.com/s?ie=utf-8&wd=%E4%BD%A0%E5%A5%BD") // "https://www.baidu.com/s?ie=utf-8&wd=你好"
 decodeURIComponent("https://www.baidu.com/s?ie=utf-8&wd=你好") // "https://www.baidu.com/s?ie=utf-8&wd=%E4%BD%A0%E5%A5%BD"
 ```
 ## 锚点
 1. 由id定位
 ```html
 <div id="anchor">...</div>
 <a href="#anchor">跳转到id为anchor的元素</a>
 ```
 
 2. 由a的name定位
 ```html
 <a iname="anchor">...</a>
 <a href="#anchor">跳转到id为anchor的元素</a>
 ```