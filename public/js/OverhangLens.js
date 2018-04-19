class OverhangLens extends SimpleLens{
  constructor(focalLength, startY, radius, centerPoint, lensHeight, scene, title, delta, xStart){
    super(focalLength, startY, radius, centerPoint, lensHeight, scene, title);

    this.delta = delta;

    this.leftX = -radius - delta;
    this.rightX = radius + delta;

    this.x1 = -xStart;
    this.x2 = xStart;
  }


  getEndY(){
    return this.startY + this.lensHeight + this.focalLength;
  }


  drawRays(){
    let rayShape = new THREE.Geometry();
    
    //0
    rayShape.vertices.push(new THREE.Vector3(this.x1, -this.startY, 0));
    //1 
    rayShape.vertices.push(new THREE.Vector3(this.x1, -this.startY - this.lensHeight, 0));
    //2 
    rayShape.vertices.push(new THREE.Vector3(0, -this.startY - this.lensHeight, this.depth));
    //3 
    rayShape.vertices.push(new THREE.Vector3(this.radius + this.delta, -this.startY - this.lensHeight, 0));

    //4 
    rayShape.vertices.push(new THREE.Vector3(this.x2, -this.startY, 0));
    //5 
    rayShape.vertices.push(new THREE.Vector3(-this.radius - this.delta, -this.startY - this.lensHeight, 0));
    //6 
    rayShape.vertices.push(new THREE.Vector3(this.x2, -this.startY - this.lensHeight, 0));

    //7 
    rayShape.vertices.push(new THREE.Vector3(0, -this.startY, 0));
    //8 
    rayShape.vertices.push(new THREE.Vector3(-this.radius - this.delta / 2, -this.startY - this.lensHeight, 0));
    //9
    rayShape.vertices.push(new THREE.Vector3(this.radius + this.delta / 2, -this.startY - this.lensHeight, 0));

    //left 
    rayShape.faces.push(new THREE.Face3(0, 1, 2));
    rayShape.faces.push(new THREE.Face3(0, 2, 3));

    //right
    rayShape.faces.push(new THREE.Face3(2, 4, 5));
    rayShape.faces.push(new THREE.Face3(4, 2, 6));

    //middle
    rayShape.faces.push(new THREE.Face3(2, 7, 8));
    rayShape.faces.push(new THREE.Face3(7, 2, 9));

    //back/under sides
    rayShape.faces.push(new THREE.Face3(1, 0, 3));
    rayShape.faces.push(new THREE.Face3(4, 6, 5));
    rayShape.faces.push(new THREE.Face3(9, 8, 7));
    rayShape.faces.push(new THREE.Face3(5, 3, 2));

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


  clear(){
    this.scene.remove(this.bottomRay);
    this.scene.remove(this.bottomWire);

    this.scene.remove(this.ray);
    this.scene.remove(this.wire);
  }

}