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

    this.lensMat = new THREE.MeshPhongMaterial({
      color: 0xff69b4,
      wireframe: true,
      side: THREE.DoubleSide
    });
  }

  drawLens(){
    let lensShape = new THREE.SphereGeometry(.5, 16, 12);
    lensShape.applyMatrix(new THREE.Matrix4().makeScale(this.width * 2.75, 0.5, this.width * 2.5));

    let lensMat = new THREE.MeshBasicMaterial({color: 0xa5f2f3, transparent: false, wireframe: false});

    this.lensMesh = new THREE.Mesh(lensShape, lensMat);
    this.lensMesh.position.y = -this.lensHeight - this.startY;

    this.scene.add(this.lensMesh);
  }


  drawRays(){
    let rayShape = new THREE.CylinderGeometry(this.width, this.radiusBottom, this.height, 8, 1);
    let rayMat = new THREE.MeshPhongMaterial({color: 0xff694b});

    this.rayMesh = new THREE.Mesh(rayShape, rayMat);
    this.rayMesh.position.y = -this.startY - this.lensHeight - (this.height / 2);
    this.scene.add(this.rayMesh);
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
}