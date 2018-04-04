class OverhangLens extends SimpleLens{
  constructor(focalLength, startY, width, centerPoint, lensHeight, scene, title, delta){
    super(0, startY, width, centerPoint, lensHeight, scene, title);

    this.delta = delta;

    this.leftX = -width - delta;
    this.rightX = width + delta;

    this.x1 = -width;
    this.x2 = width;

    this.setCrossLinePoints();

  }

  setCrossLinePoints(){
    let rise = this.lensHeight;
    let slope = Math.abs(rise) / (this.width * 2 + this.delta); 
    let focal = slope * this.width;

    let sideHeight = slope * 2 * this.width;

    this.sideHeight = sideHeight;
    this.focalLength = focal;
  }

  drawLens(){
    this.lensShape = new THREE.SphereGeometry(.5, 16, 12);
    this.lensShape.applyMatrix(new THREE.Matrix4().makeScale(this.width * 2.75, 0.5, this.width * 2.5));
    // this.lensShape.applyMatrix(new THREE.Matrix4().makeScale(this.lensWidth * 1.5, 0.5, this.lensWidth * 1.25));

    this.lensMat = new THREE.MeshBasicMaterial({color: 0xa5f2f3, transparent: true, opacity: 0.7, wireframe: false});

    this.lensMesh = new THREE.Mesh(this.lensShape, this.lensMat);
    this.lensMesh.position.y = -this.lensHeight * 1.025 - this.startY;

    this.scene.add(this.lensMesh);
  }

  getEndY(){
    return this.startY + this.lensHeight;
  }


  drawRays(){
    let rayShape = new THREE.Geometry();
    
    //0
    rayShape.vertices.push(new THREE.Vector3(this.x1, -this.startY, 0));
    //1
    rayShape.vertices.push(new THREE.Vector3(this.x2, -this.startY, 0));
    //2
    rayShape.vertices.push(new THREE.Vector3(0, -this.startY - this.focalLength, 0));
    //3
    rayShape.vertices.push(new THREE.Vector3(0, -this.startY - (this.lensHeight + this.focalLength) / 2, this.depth));
    //4
    rayShape.vertices.push(new THREE.Vector3(this.x1, -this.startY - this.sideHeight, this.depth / 2));
    //5
    rayShape.vertices.push(new THREE.Vector3(this.leftX, -this.startY - this.lensHeight, 0));
    //6
    rayShape.vertices.push(new THREE.Vector3(this.x1, -this.startY - this.lensHeight, 0));
    //7
    rayShape.vertices.push(new THREE.Vector3(0, -this.startY - this.lensHeight, 0));
    //8
    rayShape.vertices.push(new THREE.Vector3(this.x2, -this.startY - this.sideHeight, this.depth / 2));
    //9
    rayShape.vertices.push(new THREE.Vector3(this.x2, -this.startY - this.lensHeight, 0));
    //10
    rayShape.vertices.push(new THREE.Vector3(this.rightX, -this.startY - this.lensHeight, 0));
    //11
    rayShape.vertices.push(new THREE.Vector3(this.x1, -this.startY - this.sideHeight, 0));
    //12
    rayShape.vertices.push(new THREE.Vector3(this.x2, -this.startY - this.sideHeight, 0));


    //left front
    rayShape.faces.push(new THREE.Face3(0, 3, 2));
    rayShape.faces.push(new THREE.Face3(0, 4, 3));
    rayShape.faces.push(new THREE.Face3(4, 5, 6));
    rayShape.faces.push(new THREE.Face3(4, 6, 7));
    rayShape.faces.push(new THREE.Face3(4, 7, 3));

    //left back
    rayShape.faces.push(new THREE.Face3(0, 2, 11));
    rayShape.faces.push(new THREE.Face3(7, 11, 2));
    rayShape.faces.push(new THREE.Face3(11, 7, 6));
    rayShape.faces.push(new THREE.Face3(11, 4, 0));
    rayShape.faces.push(new THREE.Face3(11, 5, 4));
    rayShape.faces.push(new THREE.Face3(11, 6, 5));

    // //right front
    rayShape.faces.push(new THREE.Face3(1, 2, 3));
    rayShape.faces.push(new THREE.Face3(8, 1, 3));
    rayShape.faces.push(new THREE.Face3(7, 8, 3));
    rayShape.faces.push(new THREE.Face3(7, 9, 8));
    rayShape.faces.push(new THREE.Face3(10, 8, 9));

    //right back
    rayShape.faces.push(new THREE.Face3(2, 1, 12));
    rayShape.faces.push(new THREE.Face3(2, 12, 7));
    rayShape.faces.push(new THREE.Face3(12, 9, 7));
    rayShape.faces.push(new THREE.Face3(12, 1, 8));
    rayShape.faces.push(new THREE.Face3(10, 12, 8));
    rayShape.faces.push(new THREE.Face3(10, 9, 12));


    rayShape.computeFaceNormals();
    rayShape.computeVertexNormals();

    this.ray = new THREE.Mesh(rayShape, this.faceMat);
    this.wire = new THREE.Mesh(rayShape, this.frameMat);

    this.scene.add(this.ray);
    this.scene.add(this.wire);
  }


}