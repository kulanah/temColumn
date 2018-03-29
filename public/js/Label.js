'use strict';
class Label{
  constructor(xPos, width, scene, startY){
    this.scene = scene;

    this.labelGeom = new THREE.CubeGeometry(width, width / 2, width, 1, 1 ,1);
    this.labelMaterial = new THREE.MeshBasicMaterial({color: 0xffc000, wireframe: true});

    this.label1 = new THREE.Mesh(this.labelGeom, this.labelMaterial);
    this.label1.position.y = -startY;
    this.label1.position.x = xPos;

    this.label2 = new THREE.Mesh(this.labelGeom, this.labelMaterial);
    this.label2.position.y = -startY;
    this.label2.position.x = -xPos;
  }

  draw(){
    this.scene.add(this.label1);
    this.scene.add(this.label2);
  }

  clear(){
    this.scene.remove(this.label1);
    this.scene.remove(this.label2);
  }






}