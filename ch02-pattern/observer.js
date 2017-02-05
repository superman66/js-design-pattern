const event = {
  clientList: [],
  on: function (key, fn) {
    if(!this.clientList[key]){
      this.clientList[key] = [];
    }
    this.clientList[key].push(fn);
  },
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
