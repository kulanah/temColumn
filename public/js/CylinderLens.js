'use strict';
class CylinderLens extends ColumnComponent{
  //use width as top radius
  constructor(focalLength, startY, lensHeight, width, scene, title, radiusBottom){
    super(startY, width, scene, title);
    this.focalLength = focalLength;
    this.radiusBottom = radiusBottom;
    this.lensHeight = lensHeight;
    this.endY = this.startY + this.focalLength + this.lensHeight;
    this.height = this.endY - this.startY;


    this.rayMat = new THREE.MeshPhongMaterial({color: 0xff69b4});
  }

  drawLens(){
    let lensShape = new THREE.SphereGeometry(.5, 16, 12);
    lensShape.applyMatrix(new THREE.Matrix4().makeScale(this.width * 2.75, 0.5, this.width * 2.5));

    let lensMat = new THREE.MeshBasicMaterial({color: 0xa5f2f3, transparent: true, opacity: 0.7, wireframe: false});

    this.lensMesh = new THREE.Mesh(lensShape, lensMat);
    this.lensMesh.position.y = -this.lensHeight - this.startY;

    this.scene.add(this.lensMesh);
  }


  drawRays(){

    let topRay = new THREE.Geometry();
    
    //0
    topRay.vertices.push(new THREE.Vector3(0, -this.startY, 0));
    //1
    topRay.vertices.push(new THREE.Vector3(0, -this.lensHeight - this.startY, this.width));
    //2
    topRay.vertices.push(new THREE.Vector3(-this.width, -this.lensHeight - this.startY, 0));
    //3
    topRay.vertices.push(new THREE.Vector3(this.width, -this.lensHeight - this.startY, 0));
    //4
    topRay.vertices.push(new THREE.Vector3(0,-this.lensHeight - this.startY, -this.width));

    topRay.faces.push(new THREE.Face3(0,2,1));
    topRay.faces.push(new THREE.Face3(0,1,3));
    topRay.faces.push(new THREE.Face3(0,4,2));
    topRay.faces.push(new THREE.Face3(0,3,4));

    topRay.computeFaceNormals();
    topRay.computeVertexNormals();
    this.topRay = new THREE.Mesh(topRay, this.rayMat);

    let rayShape = new THREE.CylinderGeometry(this.width, this.radiusBottom, this.height, 8, 1);

    this.rayMesh = new THREE.Mesh(rayShape, this.rayMat);
    this.rayMesh.position.y = -this.startY - this.lensHeight - (this.height / 2);
    this.scene.add(this.rayMesh);
    this.scene.add(this.topRay);
  }


  draw(){
    super.draw();
    this.drawLens();
    this.drawRays();
  }

  clear(){
    super.clear();

    this.scene.remove(this.rayMesh);
    this.scene.remove(this.lensMesh);
  }

  updateBotRadius(newRadPercent){
    this.radiusBottom = this.width * newRadPercent;
    this.clear();
    this.draw();
  }

  getEndY(){
    return this.lensHeight + this.height + this.startY;
  }
}