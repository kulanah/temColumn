class simpleComponent{
  constructor(focalLength, startY, width, centerPoint, lensHeight){
    this.focalLength = focalLength;
    this.startY = startY;
    this.width = width;
    this.centerPoint = centerPoint;
    this.lensHeight = lensHeight;

    this.faceMat = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide, transparent: true, opacity: 0.5});


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
    this.rayshape = new THREE.Geometry();


    //hourglass section
    this.rayshape.vertices.push(new THREE.Vector3(this.width, 0 - this.startY)); 
    this.rayshape.vertices.push(new THREE.Vector3(0, -this.lensHeight + this.focalLength - this.startY));
    this.rayshape.vertices.push(new THREE.Vector3(-this.width, 0 - this.startY));

    this.rayshape.vertices.push(new THREE.Vector3(0, -this.lensHeight + this.focalLength - this.startY)); 
    this.rayshape.vertices.push(new THREE.Vector3(-this.width, -this.lensHeight - this.startY));
    this.rayshape.vertices.push(new THREE.Vector3(this.width, -this.lensHeight - this.startY)); 

    this.rayshape.vertices.push(new THREE.Vector3(-this.width, -this.lensHeight - this.startY));
    this.rayshape.vertices.push(new THREE.Vector3(0, -this.lensHeight - this.focalLength - this.startY));
    this.rayshape.vertices.push(new THREE.Vector3(this.width, -this.lensHeight - this.startY));

    this.rayshape.vertices.push(new THREE.Vector3(0, -this.lensHeight - this.focalLength - this.startY)); 
    this.rayshape.vertices.push(new THREE.Vector3(-this.width, -this.lensHeight * 2 - this.startY));
    this.rayshape.vertices.push(new THREE.Vector3(this.width, -this.lensHeight * 2 - this.startY)); 

    this.rayshape.faces.push(new THREE.Face3(0,1,2));
    this.rayshape.faces.push(new THREE.Face3(3,4,5));
    this.rayshape.faces.push(new THREE.Face3(6,7,8));
    this.rayshape.faces.push(new THREE.Face3(9,10,11));

    console.log(this.rayshape);
    console.log(this.lensHeight);

    this.ray= new THREE.Mesh(this.rayshape, this.faceMat);
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
    this.rayshape = null;
    this.draw();
    render();
  }


}