class ColumnComponent{
  constructor(startY, width, scene, title, endY){

    this.startY = startY;
    this.width = width;
    this.scene = scene;
    this.title = title;
    this.endY = endY;

    this.labels = new Array();
  }

  addLabel(percentage){
    let middle = (this.endY - this.startY / 2);
    middle *= percentage;
    let yPos = middle + this.startY;

    this.labels.push(new Label(this.width, 0.25, this.scene, yPos));
  }


  getStartY(){
    return this.startY;
  }

  getMiddle(){
    return (this.startY + this.endY) / 2;
  }

  getTitle(){
    return this.title;
  }

  getEndY(){
    throw new Error('Must implement get end method, ColumnComponent is an abstract base class');
  }


  draw(){
    for (label in this.labels){
      this.scene.add(label);
    }
  }

  clear(){
    for (label in this.labels){
      this.scene.remove(label);
    }
  }
  
}