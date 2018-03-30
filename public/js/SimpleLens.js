'use strict';
class SimpleLens extends ColumnComponent{
  constructor(focalLength, startY, width, centerPoint, lensHeight, scene, title){
    super(startY, width, scene, title);
    this.focalLength = focalLength;
    this.depth = width * .6;
    this.centerPoint = centerPoint;
    this.lensHeight = lensHeight;
    this.endY = this.startY + this.focalLength + this.lensHeight;

    this.faceMat = new THREE.MeshPhongMaterial({
      color: 0xff69b4, 
      wireframe: false, 
    });
  }

  drawLens(){
    this.lensShape = new THREE.SphereGeometry(.5, 16, 12);
    this.lensShape.applyMatrix(new THREE.Matrix4().makeScale(this.width * 2.75, 0.5, this.width * 2.5));
    // this.lensShape.applyMatrix(new THREE.Matrix4().makeScale(this.lensWidth * 1.5, 0.5, this.lensWidth * 1.25));

    this.lensMat = new THREE.MeshBasicMaterial({color: 0xa5f2f3, transparent: false, wireframe: false});

    this.lensMesh = new THREE.Mesh(this.lensShape, this.lensMat);
    this.lensMesh.position.y = -this.lensHeight - this.startY;

    this.scene.add(this.lensMesh);
  }
  
  drawRays(){
    let rayShape = new THREE.Geometry();


    //0
    rayShape.vertices.push(new THREE.Vector3(0, -this.startY, 0));
    //1
    rayShape.vertices.push(new THREE.Vector3(0, -this.lensHeight - this.startY, this.depth, 0));
    //2
    rayShape.vertices.push(new THREE.Vector3(-this.width, -this.lensHeight - this.startY, 0));
    //3
    rayShape.vertices.push(new THREE.Vector3(this.width, -this.lensHeight - this.startY, 0));
    //4
    rayShape.vertices.push(new THREE.Vector3(0,-this.lensHeight - this.startY, -this.depth));
    //5
    rayShape.vertices.push(new THREE.Vector3(0,-this.lensHeight - this.startY -this.focalLength, 0));


    rayShape.faces.push(new THREE.Face3(0,2,1));
    rayShape.faces.push(new THREE.Face3(0,1,3));
    rayShape.faces.push(new THREE.Face3(0,4,2));
    rayShape.faces.push(new THREE.Face3(0,3,4));
    rayShape.faces.push(new THREE.Face3(5,2,4));
    rayShape.faces.push(new THREE.Face3(5,1,2));
    rayShape.faces.push(new THREE.Face3(5,3,1));
    rayShape.faces.push(new THREE.Face3(5,4,3));

    rayShape.computeFaceNormals();
    rayShape.computeVertexNormals();
    this.ray= new THREE.Mesh(rayShape, this.faceMat);

    // this.ray.rotation.y = Math.PI / 8;
    this.scene.add(this.ray);
  }

  draw(){
    super.draw();
    this.drawLens();
    this.drawRays();
  }

  getEndY(){
    return this.startY + this.lensHeight + this.focalLength;
  }

  updateStartY(newStart){
    this.clear();
    let startDiff = this.startY - newStart;
    this.startY = newStart;
    this.lensHeight += startDiff;
    this.draw();
  }

  clear(){
    super.clear();
    this.scene.remove(this.labelBox1);
    this.scene.remove(this.labelBox2);

    this.scene.remove(this.ray);
    this.ray = null;
  }

  updateFocalLength(newLen){
    this.clear();

    this.focalLength = Number(newLen);
    this.rayShape = null;
    this.draw();
  }

}