'use strict';
class ColumnComponent{
  constructor(startY, radius, scene, title, endY){

    this.startY = startY;
    this.radius = radius;
    this.scene = scene;
    this.title = title;
    this.endY = endY;

    this.labels = new Array();
  }

  addLabel(size, percentage){
    let height = (Number(this.endY - this.startY));
    height *= percentage;
    let yPos = height + this.startY;

    this.labels.push(new Label(this.radius * 1.5 , 0.25 * size, this.scene, yPos));
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
    let i = this.labels.length - 1;
    while(i >= 0){
      this.labels[i].draw();
      --i;
    }
  }

  clear(){
    let i = this.labels.length;
    while(i > 0){
      this.labels[i - 1].clear();
      --i;
    }
  }
}