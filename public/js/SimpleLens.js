class SimpleLens{
  constructor(focalLength, startY, width, centerPoint, lensHeight, scene){
    this.focalLength = focalLength;
    this.startY = startY;
    this.width = width;
    this.centerPoint = centerPoint;
    this.lensHeight = lensHeight;
    this.scene = scene;

    this.faceMat = new THREE.MeshLambertMaterial({
      color: 0xff69b4, 
      wireframe: false, 
      side: THREE.DoubleSide, 
      transparent: true, 
      opacity: 0.5});
  }

  drawLens(){
    this.lensShape = new THREE.SphereGeometry(.5, 16, 12);
    this.lensShape.applyMatrix(new THREE.Matrix4().makeScale(this.width * 2.75, 0.5, this.width * 2.5));
    // this.lensShape.applyMatrix(new THREE.Matrix4().makeScale(this.lensWidth * 1.5, 0.5, this.lensWidth * 1.25));

    this.lensMat = new THREE.MeshBasicMaterial({color: 0xa5f2f3, wireframe: false});

    this.lensMesh = new THREE.Mesh(this.lensShape, this.lensMat);
    this.lensMesh.position.y = -this.lensHeight - this.startY;

    this.scene.add(this.lensMesh);
  }
  
  drawRays(){
    let rayShape = new THREE.Geometry();


    //hourglass section
    //0
    rayShape.vertices.push(new THREE.Vector3(this.width, 0 - this.startY, 0));
    //1
    rayShape.vertices.push(new THREE.Vector3(-this.width, 0 - this.startY, 0));

    //2
    rayShape.vertices.push(new THREE.Vector3(0, 0 - this.startY, this.width)); 
    //3
    rayShape.vertices.push(new THREE.Vector3(0, -this.lensHeight + this.focalLength - this.startY));
    //4
    rayShape.vertices.push(new THREE.Vector3(0, 0 - this.startY, -this.width));

    //5
    rayShape.vertices.push(new THREE.Vector3(0, -this.lensHeight - this.startY,this.width));
    //6
    rayShape.vertices.push(new THREE.Vector3(-this.width, -this.lensHeight - this.startY, 0));
    //7
    rayShape.vertices.push(new THREE.Vector3(this.width, -this.lensHeight - this.startY, 0));
    //8
    rayShape.vertices.push(new THREE.Vector3(0,-this.lensHeight - this.startY,-this.width));
    //9
    rayShape.vertices.push(new THREE.Vector3(0,-this.lensHeight - this.startY -this.focalLength,0));

    //10
    rayShape.vertices.push(new THREE.Vector3(-this.width, -2 * this.lensHeight - this.startY, 0));
    //11
    rayShape.vertices.push(new THREE.Vector3(0, -2 * this.lensHeight - this.startY, this.width));
    //12
    rayShape.vertices.push(new THREE.Vector3(this.width, -2 * this.lensHeight - this.startY,0));




    rayShape.faces.push(new THREE.Face3(1,2,3));
    rayShape.faces.push(new THREE.Face3(3,2,0));
    rayShape.faces.push(new THREE.Face3(1,4,3));
    rayShape.faces.push(new THREE.Face3(3,4,0));
    rayShape.faces.push(new THREE.Face3(3,5,6));
    rayShape.faces.push(new THREE.Face3(3,5,7));
    rayShape.faces.push(new THREE.Face3(3,6,8));
    rayShape.faces.push(new THREE.Face3(9,8,6));
    rayShape.faces.push(new THREE.Face3(9,5,6));
    rayShape.faces.push(new THREE.Face3(9,7,5));
    rayShape.faces.push(new THREE.Face3(9,8,7));

    rayShape.faces.push(new THREE.Face3(9,10,11));
    rayShape.faces.push(new THREE.Face3(9,11,12));
    rayShape.faces.push(new THREE.Face3(9,10,11));

    rayShape.computeFaceNormals();
    rayShape.computeVertexNormals();
    this.ray= new THREE.Mesh(rayShape, this.faceMat);

    // this.ray.rotation.y = Math.PI / 8;
    this.scene.add(this.ray);
  }

  draw(){
    this.drawLens();
    this.drawRays();
  }

  getMiddle(){
    return this.lensHeight + this.startY;
  }


  getStartY(){
    return this.lensHeight * 2 + this.startY;
  }

  updateFocalLength(newLen){
    this.scene.remove(this.ray);
    this.ray = null;

    this.focalLength = Number(newLen);
    this.rayShape = null;
    this.draw();
  }


}