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

  getTitle(){
    return this.title;
  }

  getEndY(){
    throw new Error('Must implement get end method, ColumnComponent is an abstract base class');
  }

  addLabel(){
    throw new Error('Must implement add label method, ColumnComponent is an abstract base class');
  }

  draw(){
    throw new Error('Must implement draw method, ColumnComponent is an abstract base class');
  }
  
}