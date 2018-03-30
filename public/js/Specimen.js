
'use strict';
class Specimen extends ColumnComponent{
  constructor(startY, width, scene, title){
    super(startY, width, scene, title);
  }

  drawScreen(){
    let specimenGeo = new THREE.BoxGeometry(this.width, 0.25, this.width);
    let specimenMat = new THREE.MeshPhongMaterial({color: 0x00ffb4});

    this.specimen = new THREE.Mesh(specimenGeo, specimenMat);
    this.specimen.position.y = this.startY + 1;

    this.scene.add(this.specimen);

  }


  draw(){
    super.draw();
    this.drawScreen();

  }

  clear(){
    super.clear();
  }
}