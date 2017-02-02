var each = function(arr, callback){
  for(var i = 0; i < arr.length; i++){
    callback.call(arr[i], i, arr[i]);
  }
}

var array = [1,2,3,4,5];

each(array, function(index, value){
  console.log(index + ':'+ value);
})
