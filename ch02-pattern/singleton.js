function Singleton(name){
  this.name = name;
  this.instance = null;
}

Singleton.getInstance = function(name){
  if(!this.instance){
    this.instance = new Singleton(name);
  }
  return this.instance;
}

var instance1 = Singleton.getInstance('a');
var instance2 = Singleton.getInstance('b');
console.log(instance1);
console.log(instance2);
