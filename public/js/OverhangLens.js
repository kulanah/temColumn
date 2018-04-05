class OverhangLens extends SimpleLens{
  constructor(focalLength, startY, radius, centerPoint, lensHeight, scene, title, delta, xStart){
    super(focalLength, startY, radius, centerPoint, lensHeight, scene, title);

    this.delta = delta;

    this.leftX = -radius - delta;
    this.rightX = radius + delta;

    this.x1 = -xStart;
    this.x2 = xStart;

    this.setCrossLinePoints();

  }

  setCrossLinePoints(){
    let rise = this.lensHeight;
    let slope = Math.abs(rise) / (this.radius * 2 + this.delta); 
    let focal = slope * this.radius;

    let sideHeight = slope * 2 * this.radius;

    this.sideHeight = sideHeight;
    this.topMid = focal;
  }

  getEndY(){
    return this.startY + this.lensHeight + this.focalLength;
  }


  drawRays(){
    let rayShape = new THREE.Geometry();
    
    //0
    rayShape.vertices.push(new THREE.Vector3(this.x1, -this.startY, 0));
    //1
    rayShape.vertices.push(new THREE.Vector3(this.x2, -this.startY, 0));
    //2
    rayShape.vertices.push(new THREE.Vector3(0, -this.startY - this.topMid, 0));
    //3
    rayShape.vertices.push(new THREE.Vector3(0, -this.startY - (this.lensHeight + this.topMid) / 2, this.depth));
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
    //13
    rayShape.vertices.push(new THREE.Vector3(this.x1, -this.startY - this.lensHeight, this.depth / 4));
    //14
    rayShape.vertices.push(new THREE.Vector3(this.x1, -this.startY - this.lensHeight, this.depth / 4));
    //15
    rayShape.vertices.push(new THREE.Vector3(this.x2, -this.startY - this.lensHeight, this.depth / 4));
    //16
    rayShape.vertices.push(new THREE.Vector3(this.x2, -this.startY - this.lensHeight, this.depth / 4));


    //left front
    rayShape.faces.push(new THREE.Face3(0, 3, 2));
    rayShape.faces.push(new THREE.Face3(0, 4, 3));
    rayShape.faces.push(new THREE.Face3(4, 6, 7));
    rayShape.faces.push(new THREE.Face3(4, 7, 3));

    rayShape.faces.push(new THREE.Face3(4, 5, 14));
    rayShape.faces.push(new THREE.Face3(4, 5, 13));
    rayShape.faces.push(new THREE.Face3(6, 4, 14));
    rayShape.faces.push(new THREE.Face3(4, 6, 13));

    //left back
    rayShape.faces.push(new THREE.Face3(0, 2, 11));
    rayShape.faces.push(new THREE.Face3(7, 11, 2));
    rayShape.faces.push(new THREE.Face3(11, 7, 6));
    rayShape.faces.push(new THREE.Face3(11, 4, 0));
    rayShape.faces.push(new THREE.Face3(11, 5, 4));
    rayShape.faces.push(new THREE.Face3(11, 6, 5));

    //right front
    rayShape.faces.push(new THREE.Face3(1, 2, 3));
    rayShape.faces.push(new THREE.Face3(8, 1, 3));
    rayShape.faces.push(new THREE.Face3(7, 8, 3));
    rayShape.faces.push(new THREE.Face3(7, 9, 8));

    rayShape.faces.push(new THREE.Face3(8, 10, 15));
    rayShape.faces.push(new THREE.Face3(8, 16, 10));
    rayShape.faces.push(new THREE.Face3(8, 9, 15));
    rayShape.faces.push(new THREE.Face3(9, 6, 16));

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

    let bottomRay = new THREE.Geometry();

    //0
    bottomRay.vertices.push(new THREE.Vector3(this.leftX, -this.startY - this.lensHeight, 0));
    //1
    bottomRay.vertices.push(new THREE.Vector3(this.x1, -this.startY - this.lensHeight, 0));
    //2
    bottomRay.vertices.push(new THREE.Vector3(this.x2, -this.startY - this.lensHeight, 0));
    //3
    bottomRay.vertices.push(new THREE.Vector3(this.rightX, -this.startY - this.lensHeight, 0));
    //4
    bottomRay.vertices.push(new THREE.Vector3(0,-this.startY -this.lensHeight - this.focalLength, 0));
    //5
    bottomRay.vertices.push(new THREE.Vector3(this.x1, -this.startY - this.lensHeight, this.depth / 4));
    //6
    bottomRay.vertices.push(new THREE.Vector3(this.x2, -this.startY - this.lensHeight, this.depth / 4));

    bottomRay.faces.push(new THREE.Face3(0, 1, 4));
    bottomRay.faces.push(new THREE.Face3(5, 0, 4));
    bottomRay.faces.push(new THREE.Face3(4, 1, 5));

    bottomRay.faces.push(new THREE.Face3(2, 3, 4));
    bottomRay.faces.push(new THREE.Face3(3, 6, 4));
    bottomRay.faces.push(new THREE.Face3(4, 6, 2));

    bottomRay.computeFaceNormals();
    bottomRay.computeVertexNormals();

    this.bottomRay = new THREE.Mesh(bottomRay, this.faceMat);
    this.bottomWire = new THREE.Mesh(bottomRay, this.frameMat);

    this.scene.add(this.bottomRay);
    this.scene.add(this.bottomWire);

  }


}