'use strict';
class CylinderLens extends SimpleLens{
  //use radius as top radius
  constructor(focalLength, startY, lensHeight, radius, scene, title, radiusBottom){
    super(focalLength, startY, radius, 0, lensHeight, scene, title);
    this.radiusBottom = radiusBottom;
    this.endY = this.startY + this.focalLength + this.lensHeight;
    this.height = this.endY - this.startY;

  }

  drawRays(){

    let topRay = new THREE.Geometry();
    
    //0
    topRay.vertices.push(new THREE.Vector3(0, -this.startY, 0));
    //1
    topRay.vertices.push(new THREE.Vector3(0, -this.lensHeight - this.startY, this.radius));
    //2
    topRay.vertices.push(new THREE.Vector3(-this.radius, -this.lensHeight - this.startY, 0));
    //3
    topRay.vertices.push(new THREE.Vector3(this.radius, -this.lensHeight - this.startY, 0));
    //4
    topRay.vertices.push(new THREE.Vector3(0,-this.lensHeight - this.startY, -this.radius));

    topRay.faces.push(new THREE.Face3(0,2,1));
    topRay.faces.push(new THREE.Face3(0,1,3));
    topRay.faces.push(new THREE.Face3(0,4,2));
    topRay.faces.push(new THREE.Face3(0,3,4));

    topRay.computeFaceNormals();
    topRay.computeVertexNormals();
    this.topRay = new THREE.Mesh(topRay, this.faceMat);

    let rayShape = new THREE.CylinderGeometry(this.radius, this.radiusBottom, this.height, 8, 1);

    this.rayMesh = new THREE.Mesh(rayShape, this.faceMat);
    this.wireMesh = new THREE.Mesh(rayShape, this.frameMat);
    this.topWireMesh = new THREE.Mesh(topRay, this.frameMat);

    this.rayMesh.position.y = -this.startY - this.lensHeight - (this.height / 2);
    this.wireMesh.position.y = this.rayMesh.position.y;

    this.scene.add(this.rayMesh);
    this.scene.add(this.wireMesh);
    this.scene.add(this.topWireMesh);
    this.scene.add(this.topRay);
  }


  draw(){
    super.draw();
  }

  clear(){
    super.clear();

    this.scene.remove(this.rayMesh);
    this.scene.remove(this.wireMesh);
    this.scene.remove(this.topWireMesh);
    this.scene.remove(this.topRay);
    this.scene.remove(this.lensMesh);
  }

  updateBotRadius(newRadPercent){
    this.radiusBottom = this.radius * newRadPercent;
    this.clear();
    this.draw();
  }

  getEndY(){
    return this.lensHeight + this.height + this.startY;
  }
}