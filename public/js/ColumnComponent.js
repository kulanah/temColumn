class ColumnComponent{
  constructor(startY, width, scene, title){

    this.startY = startY;
    this.width = width;
    this.scene = scene;
    this.title = title;
  }


  getStartY(){
    return this.startY;
  }

  draw(){
    throw new Error('Must implement draw method, ColumnComponent is an abstract base class');
  }
  
}