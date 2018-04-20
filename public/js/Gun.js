'use strict';
import { ColumnComponent } from './ColumnComponent.js';
class Gun extends ColumnComponent{
  constructor(startY, radius, scene, title, endY){
    super(startY, radius, scene, title, endY);
  }

  drawGun(){
    this.gunGeo = new THREE.CylinderGeometry(this.radius * 2, this.radius * 2, this.endY - this.startY, 8, 1);
    this.gunMat = new THREE.MeshPhongMaterial({color: 0xaaaaaa});

    this.gunMesh = new THREE.Mesh(this.gunGeo, this.gunMat);
    this.gunMesh.position.y = this.startY;
    this.scene.add(this.gunMesh);
  }

  getEndY(){
    return this.endY;
  }

  draw(){
    super.draw();
    this.drawGun();
  }
}

export { Gun };