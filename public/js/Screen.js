
'use strict';
class Screen extends ColumnComponent{
  constructor(startY, width, scene, title){
    super(startY, width, scene, title);
  }

  drawScreen(){
    let screenGeo = new THREE.BoxGeometry(this.width, 0.25, this.width);
    let screenMat = new THREE.MeshPhongMaterial({color: 0x00ffb4});

    this.screen = new THREE.Mesh(screenGeo, screenMat);
    this.screen.position.y = this.startY + 1;

    this.scene.add(this.screen);

  }


  draw(){
    super.draw();
    drawScreen();

  }

  clear(){
    super.clear();
  }
}