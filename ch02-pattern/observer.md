# 观察者模式
又称发布-订阅者模式。是现在流行的MVVM框架中最常用的模式之一。它定义对象间的一种一对多的订阅关系。当一个对象的状态发生改变时，所有依赖它的对象都会得到通知。
在JavaScript中，一般用事件模式来代替传统的发布-订阅者模式，包括DOM事件和自定义事件。

发布订阅者的流程
* 定义好发布者；
* 给发布者添加一个缓存函数，用于存放回调函数以便通知订阅者；
* 当状态发生改变时，发布者会遍历这个缓存列表，依次触发里面存放的订阅者回调函数。
## 观察者模式的优点
* 带来时间上的解耦
* 对象之间的解耦

## 缺点
虽然观察者应用广泛，但是也有其缺点。
1、因为创建订阅者本身是需要消耗一定的时间和内存，而且当你订阅了一个消息后，有可能最后该消息都未发生。但是这个订阅者确会始终存在内存中。
2、虽然观察者模式较少了对象之间特别是模块之间的解耦，但是如果过度使用的话，对象和对象之间的联系也将被深埋其中，会导致程序难以追踪维护和理解。想想Angular1.x中的事件订阅，就能明白这个弊端了。当你使用过多的事件订阅时，你的程序就变得难以追踪。
也正是由于这个弊端，出现了Vuex 和 Redux之类的状态管理。引入状态管理能让你在大型项目中更好得管理和维护状态。
一个通用的发布订阅者代码:
```javascript
const event = {
  clientList: [],
  // 订阅
  on: function (key, fn) {
    if(!this.clientList[key]){
      this.clientList[key] = [];
    }
    this.clientList[key].push(fn);
  },
  remove(key, fn){
    var fns = this.clientList[key];

    if(!fns){ // 没有订阅
      return false;
    }
    if(!fn){  // 没有传入具体的回调函数，则取消所有
      fns && (fns.length == 0);
    }
    else{
      for (var i = fns.length-1; i >= 0; i--) {
        var _fn = fns[i];
        if(_fn === fn){
          fns.splice(i, 1);
        }
      }
    }

  }
  // 广播
  broadcast:function(){
    var key = Array.prototype.shift.call(arguments),
      fns = this.clientList[key];
    if(!fns || fns.length === 0){
      return false;
    }
    for (var i = 0,fn;  fn = fns[i++];) {
      fn.apply(this, arguments);
    }
  }
}

const installEvent = function(target){
  for(let i in event){
    target[i] = event[i];
  }
}

var observer = {};
installEvent(observer);

observer.on('a', function(data){
  console.log('2');
})
observer.broadcast('a', 'this is broadcast');

```
