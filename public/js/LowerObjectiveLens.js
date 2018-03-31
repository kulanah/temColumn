'use strict';
class LowerObjectiveLens extends SimpleLens{
  constructor(focalLength, startY, width, centerPoint, lensHeight, scene, title, innerLeft, innerRight){
    super(focalLength, startY, width, centerPoint, lensHeight, scene, title);

    this.innerLeft = innerLeft;
    this.innerRight = innerRight;

    this.topLeft = - this.width / 0.5;
    this.topRight = this.width / 0.5;

    this.faceMat = new THREE.MeshPhongMaterial({
      color: 0xff69b4,
    });

  }

  drawRays(){
    let rayShape = new THREE.Geometry();


    //0
    rayShape.vertices.push(new THREE.Vector3(-this.width / 2, -this.startY, 0));
    //1
    rayShape.vertices.push(new THREE.Vector3(this.width / 2, -this.startY, 0));
    //2
    rayShape.vertices.push(new THREE.Vector3(0, -this.startY, this.width));

    //3 
    rayShape.vertices.push(new THREE.Vector3(this.innerLeft - this.width, -this.startY - this.focalLength, 0));
    //4 
    rayShape.vertices.push(new THREE.Vector3(this.innerLeft, -this.startY - this.focalLength, 0));
    //5
    rayShape.vertices.push(new THREE.Vector3(this.innerLeft - this.width / 2, -this.startY - this.focalLength, this.width));

    //6 
    rayShape.vertices.push(new THREE.Vector3(this.innerRight, -this.startY - this.focalLength, 0));
    //7 
    rayShape.vertices.push(new THREE.Vector3(this.innerRight + this.width, -this.startY - this.focalLength, 0));
    //8
    rayShape.vertices.push(new THREE.Vector3(this.innerRight + this.width / 2, -this.startY - this.focalLength, this.width));

    //9
    rayShape.vertices.push(new THREE.Vector3(this.innerLeft, -this.startY - this.lensHeight, 0));
    //10
    rayShape.vertices.push(new THREE.Vector3(this.innerRight, -this.startY - this.lensHeight, 0));

    rayShape.faces.push(new THREE.Face3(0, 5, 2));
    rayShape.faces.push(new THREE.Face3(0, 3, 5));
    rayShape.faces.push(new THREE.Face3(0, 1, 3));
    rayShape.faces.push(new THREE.Face3(4, 3, 1));
    rayShape.faces.push(new THREE.Face3(1, 2, 5));
    rayShape.faces.push(new THREE.Face3(1, 5, 4));
    rayShape.faces.push(new THREE.Face3(3, 9, 5));
    rayShape.faces.push(new THREE.Face3(3, 4, 9));
    rayShape.faces.push(new THREE.Face3(4, 5, 9));

    rayShape.faces.push(new THREE.Face3(0, 6, 2));
    rayShape.faces.push(new THREE.Face3(0, 7, 6));
    rayShape.faces.push(new THREE.Face3(0, 1, 7));
    rayShape.faces.push(new THREE.Face3(2, 6, 8));
    rayShape.faces.push(new THREE.Face3(1, 2, 8));
    rayShape.faces.push(new THREE.Face3(1, 8, 7));
    rayShape.faces.push(new THREE.Face3(8, 6, 10));
    rayShape.faces.push(new THREE.Face3(7, 8, 10));
    rayShape.faces.push(new THREE.Face3(6, 7, 10));


    rayShape.computeFaceNormals();
    rayShape.computeVertexNormals();

    this.ray = new THREE.Mesh(rayShape, this.faceMat);
    this.wire = new THREE.Mesh(rayShape, this.frameMat);


    this.scene.add(this.ray);
    this.scene.add(this.wire);

    console.log(this)
  }


  


}