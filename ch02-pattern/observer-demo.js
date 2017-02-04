var observer = {};
observer.clientList = [];

observer.listen = function(key, fn) {
  if(!this.clientList[key]){  // 如果还没有订阅此类信息，则为此类信息创建缓存列表
    this.clientList[key] = [];
  }
  this.clientList[key].push(fn);
}

observer.publish = function() {
    var key = Array.prototype.shift.call(arguments),
        fns = this.clientList[key];
    if(!fns || fns.length === 0){
      return false;
    }
    for (var i = 0,fn;  fn = fns[i++];) {
      fn.apply(this, arguments);
    }
}


observer.listen('A',function (name) { // 增加一个订阅者
  console.log(name + 'receive');
})

observer.listen('B', function (name) { // 增加一个订阅者
  console.log(name + 'receive');
})

observer.publish('A','superman1');
observer.publish('B', 'superman2');
