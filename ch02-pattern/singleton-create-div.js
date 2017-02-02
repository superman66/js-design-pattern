const createDiv = {
  Created:false,
  init: function(target){
    if(!Created){
      target.appendChild(createDiv.create());
      this.Created = false;
    }
  },
  create: function(text){
    let div = document.createElement('div');
    div.innnerHtml = text;
    return div;
  }
}
