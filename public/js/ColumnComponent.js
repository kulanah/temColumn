class ColumnComponent{
  constructor(startY, width, scene, title, endY){

    this.startY = startY;
    this.width = width;
    this.scene = scene;
    this.title = title;
    this.endY = endY;
  }


  getStartY(){
    return this.startY;
  }

  getMiddle(){
    return (this.startY + this.endY) / 2;
  }

  getEndY(){
    throw new Error('Must implement get end method, ColumnComponent is an abstract base class');
  }

  getTitle(){
    return this.title;
  }

  draw(){
    throw new Error('Must implement draw method, ColumnComponent is an abstract base class');
  }
  
}