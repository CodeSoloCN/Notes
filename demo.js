// var a = 1
// let b = 2
// function fn1(){
//     console.log('fnc')
// }
// window.a1 = 1
// window.fn2 = function(){
//     console.log('fnc2')
// }

// delete window.a
// delete window.b
// delete window.a1
// delete window.fn1
// delete window.fn2

// let obj = {
//     name: "obj",
//     fn: ()=>{
//         console.log(arguments)
//     }
// }
// obj.fn()


// console.log("window.innerHeight:",window.innerHeight)
// console.log("window.innerWidth:", window.innerWidth)
// console.log("document.documentElement.clientHeight:", document.documentElement.clientHeight)
// console.log("document.documentElement.clientWidth:", document.documentElement.clientWidth)
// console.log(document.documentElement)
// let baiduWin =  window.open("https://www.baidu.com", "window", "height:1000,width:1000")
// console.log(baiduWin.closed)
// baiduWin.close()
// console.log(baiduWin.closed)
// console.log(location == window.location)
// var num = 0
// var max = 10
// function consoleNumber() {
//     console.log(num)
//     num++
//     if (num < max) {
//         setTimeout(consoleNumber, 500)
//     } else {
//         console.log("done")
//     }
// }
// setInterval(function(){num++;console.log(num)},500)
// // setTimeout(consoleNumber, 500)
// confirm("???")
// prompt("123","456")

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
console.log(getQueryStringArgs())
window.location.assign("https://www.demooo.com/map")
