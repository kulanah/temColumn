
'use strict';
class Specimen extends ColumnComponent{
  constructor(startY, width, scene, title){
    super(startY, width, scene, title);
  }

  drawScreen(){
    let specimenGeo = new THREE.BoxGeometry(this.width * 4, 0.25, this.width * 2);
    let specimenMat = new THREE.MeshPhongMaterial({color: 0xf48c42});
    let frameMat = new THREE.MeshPhongMaterial({color: 0x000000, wireframe: true});

    this.specimen = new THREE.Mesh(specimenGeo, specimenMat);
    this.frameMesh = new THREE.Mesh(specimenGeo, frameMat);
    this.specimen.position.y = -this.startY - 0.15;
    this.specimen.position.x = -1;
    this.frameMesh.position.y = this.specimen.position.y;
    this.frameMesh.position.x = this.specimen.position.x;

    this.scene.add(this.specimen);
    this.scene.add(this.frameMesh);
  }

  getMiddle(){
    return this.startY - 0.25;
  }

  draw(){
    super.draw();
    this.drawScreen();

  }

  clear(){
    super.clear();
  }
}