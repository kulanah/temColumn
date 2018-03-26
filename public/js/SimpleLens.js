class SimpleLens extends ColumnComponent{
  constructor(focalLength, startY, width, centerPoint, lensHeight, scene, title){
    super(startY, width, scene, title);
    this.focalLength = focalLength;
    this.depth = width * .6;
    this.centerPoint = centerPoint;
    this.lensHeight = lensHeight;

    this.faceMat = new THREE.MeshPhongMaterial({
      color: 0xff69b4, 
      wireframe: false, 
      side: THREE.DoubleSide});
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
    rayShape.vertices.push(new THREE.Vector3(0, -this.startY, -this.depth));

    //2
    rayShape.vertices.push(new THREE.Vector3(0, -this.lensHeight - this.startY, this.depth, 0));
    //3
    rayShape.vertices.push(new THREE.Vector3(-this.width, -this.lensHeight - this.startY, 0));
    //4
    rayShape.vertices.push(new THREE.Vector3(this.width, -this.lensHeight - this.startY, 0));
    //5
    rayShape.vertices.push(new THREE.Vector3(0,-this.lensHeight - this.startY, -this.depth));
    //6
    rayShape.vertices.push(new THREE.Vector3(0,-this.lensHeight - this.startY -this.focalLength, 0));

    //7
    rayShape.vertices.push(new THREE.Vector3(-this.width, -2 * this.lensHeight - this.startY, 0));
    //8
    rayShape.vertices.push(new THREE.Vector3(0, -2 * this.lensHeight - this.startY, this.depth));
    //9
    rayShape.vertices.push(new THREE.Vector3(this.width, -2 * this.lensHeight - this.startY, 0));

    rayShape.faces.push(new THREE.Face3(0,2,3));
    rayShape.faces.push(new THREE.Face3(0,2,4));
    rayShape.faces.push(new THREE.Face3(0,3,5));
    rayShape.faces.push(new THREE.Face3(6,5,3));
    rayShape.faces.push(new THREE.Face3(6,2,3));
    rayShape.faces.push(new THREE.Face3(6,4,2));
    rayShape.faces.push(new THREE.Face3(6,5,4));

    rayShape.computeFaceNormals();
    rayShape.computeVertexNormals();
    this.ray= new THREE.Mesh(rayShape, this.faceMat);

    // this.ray.rotation.y = Math.PI / 8;
    this.scene.add(this.ray);
  }

  drawLabel(){
    this.labelGeo = new THREE.CubeGeometry(0.5, 0.4, 0.5, 1, 1, 1);
    this.labelMat = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: true});

    this.labelBox1 = new THREE.Mesh(this.labelGeo, this.labelMat);

    this.labelBox1.position.x = this.width;
    this.labelBox1.position.y = - this.startY - (this.lensHeight / 2);

    this.scene.add(this.labelBox1);

    this.labelBox2 = new THREE.Mesh(this.labelGeo, this.labelMat);

    this.labelBox2.position.x = -this.width;
    this.labelBox2.position.y = - this.startY - (this.lensHeight / 2);

    this.scene.add(this.labelBox2);
  }

  draw(){
    this.drawLens();
    this.drawRays();
    this.drawLabel();
  }

  getMiddle(){
    return this.lensHeight + this.startY;
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