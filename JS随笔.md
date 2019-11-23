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