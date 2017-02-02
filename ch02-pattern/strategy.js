var strategies = {
  A: function(salary){
    return salary * 2;
  },
  B: function(salary){
    return salary * 3;
  },
  C: function(salary){
    return salary * 4;
  },
}

var calculateBonus = function(stratege, salary){
  return strategies[stratege](salary);
}
