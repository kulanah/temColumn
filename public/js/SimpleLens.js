'use strict';
class SimpleLens extends ColumnComponent{
  constructor(focalLength, startY, radius, centerPoint, lensHeight, scene, title){
    super(startY, radius, scene, title);
    this.focalLength = focalLength;
    this.depth = radius * .6;
    this.centerPoint = centerPoint;
    this.lensHeight = lensHeight;
    this.endY = this.startY + this.focalLength + this.lensHeight;


    this.baseRadius = radius;

    this.apertures = [];

    this.faceMat = new THREE.MeshPhongMaterial({
      color: 0xff69b4, 
      wireframe: false, 
    });
    this.frameMat = new THREE.MeshPhongMaterial({
      color: 0xf4a1c8,
      wireframe: true, 
    });

    this.lensMat = new THREE.MeshBasicMaterial({color: 0xffff00, transparent: true, opacity: 0.7, wireframe: false});
  }


  drawLens(){
    this.lensShape = new THREE.SphereGeometry(2, 16, 12);
    this.lensShape.applyMatrix(new THREE.Matrix4().makeScale(3, 0.1, 1.25));


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
    rayShape.vertices.push(new THREE.Vector3(-this.radius, -this.lensHeight - this.startY, 0));
    //3
    rayShape.vertices.push(new THREE.Vector3(this.radius, -this.lensHeight - this.startY, 0));
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
    this.ray = new THREE.Mesh(rayShape, this.faceMat);
    this.wire = new THREE.Mesh(rayShape, this.frameMat);

    this.scene.add(this.ray);
    this.scene.add(this.wire);

    return false;
  }

  drawRaysWithApertures(){
    let rayShape = new THREE.Geometry();

    rayShape.vertices.push(new THREE.Vector3(0, -this.startY, 0));
    rayShape.vertices.push(new THREE.Vector3(0, -this.startY - this.apertures[0].startY, this.depth));
    rayShape.vertices.push(new THREE.Vector3(-this.baseRadius, -this.startY - this.apertures[0].startY, 0));
    rayShape.vertices.push(new THREE.Vector3(this.baseRadius, -this.startY - this.apertures[0].startY, 0));
    rayShape.vertices.push(new THREE.Vector3(-this.radius, -this.startY - this.apertures[0].startY, 0));
    rayShape.vertices.push(new THREE.Vector3(this.radius, -this.startY - this.apertures[0].startY, 0));
    rayShape.vertices.push(new THREE.Vector3(0, -this.startY - this.lensHeight, 0));

    rayShape.faces.push(new THREE.Face3(0, 2, 1));
    rayShape.faces.push(new THREE.Face3(0, 1, 3));
    if (this.radius !== 0){
      rayShape.faces.push(new THREE.Face3(4, 6, 1));
      rayShape.faces.push(new THREE.Face3(6, 5, 1));
    }

    rayShape.computeFaceNormals();
    rayShape.computeVertexNormals();
    this.ray = new THREE.Mesh(rayShape, this.faceMat);
    this.wire = new THREE.Mesh(rayShape, this.frameMat);

    this.scene.add(this.ray);
    this.scene.add(this.wire);


    if (this.radius === 0){
      return true;
    }
    return false;
  }


  addAperture(height, width, title){
    this.apertures.push(new Aperture(this.radius, this.scene, title, height, width, this.lensHeight, this.radius, this.startY));
    this.radius = this.baseRadius * width; 
  }


  updateAperture(newPercent){
    this.apertures[0].updateWidth(newPercent);
    this.radius = this.baseRadius * newPercent;
    this.clear();
  }


  draw(){
    super.draw();
    this.drawLens();
    if (this.apertures[0]){
      for (let aperture in this.apertures){
        this.apertures[aperture].draw();
      }
      return this.drawRaysWithApertures();
    } else {
      return this.drawRays();
    }
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
    this.scene.remove(this.wire);
    this.ray = null;
  }


  updateFocalLength(newLen){
    this.clear();

    this.focalLength = Number(newLen);
    this.rayShape = null;
    this.draw();
  }
}