'use strict';
class AngledLens extends SimpleLens{
  constructor(focalLength, startY, radius, centerPoint, lensHeight, x1, x2, scene, title){
    super(focalLength, startY, radius, centerPoint, lensHeight, scene, title);

    this.scene = scene;
    this.x1 = x1;
    this.x2 = x2;
  }
  drawRays(){
    let rayShape1 = new THREE.Geometry();
    let newMid = (Number(this.x1) + Number(this.x2)) / 2;


    //0
    rayShape1.vertices.push(new THREE.Vector3(0, - this.startY, 0));
    //1
    rayShape1.vertices.push(new THREE.Vector3(newMid, -this.lensHeight - this.startY, this.depth));
    //2
    rayShape1.vertices.push(new THREE.Vector3(this.x1, -this.lensHeight - this.startY, 0));
    //3
    rayShape1.vertices.push(new THREE.Vector3(this.x2, -this.lensHeight - this.startY, 0));
    //4
    rayShape1.vertices.push(new THREE.Vector3(newMid, -this.lensHeight - this.startY, -this.depth));
    //5
    rayShape1.vertices.push(new THREE.Vector3(0, -this.lensHeight - this.startY -this.focalLength, 0));

    rayShape1.faces.push(new THREE.Face3(1,0,2));
    rayShape1.faces.push(new THREE.Face3(0,1,3));
    rayShape1.faces.push(new THREE.Face3(2,0,4));
    rayShape1.faces.push(new THREE.Face3(4,0,3));
    rayShape1.faces.push(new THREE.Face3(4,3,5));
    rayShape1.faces.push(new THREE.Face3(4,5,2));
    rayShape1.faces.push(new THREE.Face3(5,1,2));
    rayShape1.faces.push(new THREE.Face3(5,3,1));


    rayShape1.computeFaceNormals();
    rayShape1.computeVertexNormals();


    let rayShape2 = new THREE.Geometry();
    //0
    rayShape2.vertices.push(new THREE.Vector3(0, - this.startY, 0));
    //1
    rayShape2.vertices.push(new THREE.Vector3(-newMid , -this.lensHeight - this.startY, this.depth));
    //2
    rayShape2.vertices.push(new THREE.Vector3(-this.x1, -this.lensHeight - this.startY, 0));
    //3
    rayShape2.vertices.push(new THREE.Vector3(-this.x2, -this.lensHeight - this.startY, 0));
    //4
    rayShape2.vertices.push(new THREE.Vector3(-newMid,-this.lensHeight - this.startY, -this.depth));
    //5
    rayShape2.vertices.push(new THREE.Vector3(0, -this.lensHeight - this.startY -this.focalLength,0));


    rayShape2.faces.push(new THREE.Face3(0,1,2));
    rayShape2.faces.push(new THREE.Face3(1,0,3));
    rayShape2.faces.push(new THREE.Face3(0,2,4));
    rayShape2.faces.push(new THREE.Face3(0,4,3));
    rayShape2.faces.push(new THREE.Face3(3,4,5));
    rayShape2.faces.push(new THREE.Face3(5,4,2));
    rayShape2.faces.push(new THREE.Face3(1,5,2));
    rayShape2.faces.push(new THREE.Face3(3,5,1));

    rayShape2.computeFaceNormals();
    rayShape2.computeVertexNormals();

    this.ray= new THREE.Mesh(rayShape1, this.faceMat);
    this.ray2 = new THREE.Mesh(rayShape2, this.faceMat);
    this.wire1 = new THREE.Mesh(rayShape1, this.frameMat);
    this.wire2 = new THREE.Mesh(rayShape2, this.frameMat);

    // this.ray.rotation.y = Math.PI / 8;
    this.scene.add(this.ray);
    this.scene.add(this.ray2);
    this.scene.add(this.wire1);
    this.scene.add(this.wire2);
  }

  updatex1(newWidth){
    this.clearScene();

    this.x1 = newWidth;
    this.rayShape1 = null;
    this.drawRays();
  }

  updatex2(newWidth){
    this.clearScene();

    this.x2 = newWidth;
    this.rayShape1 = null;
    this.drawRays();
  }

  updateFocalLength(newLen){
    this.clearScene();

    super.updateFocalLength(newLen);
  }

  clearScene(){
    this.scene.remove(this.ray);
    this.ray = null;

    this.scene.remove(this.ray2);
    this.ray2 = null;
  }

  updateStartY(newStart){
    this.clearScene();
    let startDiff = this.startY - newStart;
    this.startY = newStart;
    this.lensHeight += startDiff;
    this.draw();
  }
  getEndY(){
    return this.startY + this.lensHeight + this.focalLength;
  }
}