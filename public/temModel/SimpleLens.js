class SimpleLens{
  constructor(focalLength, startY, width, centerPoint, lensHeight){
    this.focalLength = focalLength;
    this.startY = startY;
    this.width = width;
    this.centerPoint = centerPoint;
    this.lensHeight = lensHeight;

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

    scene.add(this.lensMesh);
  }
  
  drawRays(){
    let rayShape = new THREE.Geometry();


    //hourglass section
    rayShape.vertices.push(new THREE.Vector3(this.width, 0 - this.startY, 0));
    rayShape.vertices.push(new THREE.Vector3(0, -this.lensHeight + this.focalLength - this.startY, 0));
    rayShape.vertices.push(new THREE.Vector3(-this.width, 0 - this.startY, 0));

    rayShape.vertices.push(new THREE.Vector3(0, 0 - this.startY, this.width)); 
    rayShape.vertices.push(new THREE.Vector3(0, -this.lensHeight + this.focalLength - this.startY));
    rayShape.vertices.push(new THREE.Vector3(0, 0 - this.startY, -this.width));

    rayShape.vertices.push(new THREE.Vector3(0, -this.lensHeight + this.focalLength - this.startY)); 
    rayShape.vertices.push(new THREE.Vector3(-this.width, -this.lensHeight - this.startY));
    rayShape.vertices.push(new THREE.Vector3(this.width, -this.lensHeight - this.startY)); 

    rayShape.vertices.push(new THREE.Vector3(-this.width, -this.lensHeight - this.startY));
    rayShape.vertices.push(new THREE.Vector3(0, -this.lensHeight - this.focalLength - this.startY));
    rayShape.vertices.push(new THREE.Vector3(this.width, -this.lensHeight - this.startY));

    rayShape.vertices.push(new THREE.Vector3(0, -this.lensHeight - this.focalLength - this.startY)); 
    rayShape.vertices.push(new THREE.Vector3(-this.width, -this.lensHeight * 2 - this.startY));
    rayShape.vertices.push(new THREE.Vector3(this.width, -this.lensHeight * 2 - this.startY)); 

    rayShape.faces.push(new THREE.Face3(2,3,4));
    rayShape.faces.push(new THREE.Face3(4,3,0));
    rayShape.faces.push(new THREE.Face3(2,5,4));
    rayShape.faces.push(new THREE.Face3(4,5,0));
    // rayShape.faces.push(new THREE.Face3(9,10,11));

    rayShape.computeFaceNormals();
    rayShape.computeVertexNormals();
    this.ray= new THREE.Mesh(rayShape, this.faceMat);

    this.ray.rotation.y = Math.PI / 8;
    scene.add(this.ray);
  }

  draw(){
    this.drawLens();
    this.drawRays();
  }

  getHeight(){
    return this.lensHeight * 2 + this.startY;
  }

  updateFocalLength(newLen){
    scene.remove(this.ray);
    this.ray = null;

    this.focalLength = Number(newLen);
    this.rayShape = null;
    this.draw();
    render();
  }


}