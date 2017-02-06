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
