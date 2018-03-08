class simpleComponent{
  constructor(focalLength, startY, width, centerPoint){
    this.focalLength = focalLength;
    this.startY = startY;
    this.width = width;
    this.centerPoint = centerPoint;



  }
  createLens(){
    this.lensCurve = new THREE.EllipseCurve(0, -this.focalLength * 2, 5, .5, 0, 2 * Math.PI);
    this.points = this.lensCurve.getPoints(50);

    this.lensShape = new THREE.Geometry().setFromPoints(this.points);
    this.lensMaterial = new THREE.LineBasicMaterial({color: 0x2222ff});

    this.ellipses = new THREE.Line(this.lensShape, this.lensMaterial);
    scene.add(this.ellipses);

    this.rayshape = new THREE.Geometry();
    this.raymaterial = new THREE.LineBasicMaterial({color: 0x00ff00, linewidth: 4});

    //hourglass section
    this.rayshape.vertices.push(new THREE.Vector3(this.width, 0 + this.startY));
    this.rayshape.vertices.push(new THREE.Vector3(0, -this.focalLength * 2 + this.startY));
    this.rayshape.vertices.push(new THREE.Vector3(-this.width, -this.focalLength * 4 + this.startY));
    this.rayshape.vertices.push(new THREE.Vector3(this.width, -this.focalLength * 4 + this.startY));
    this.rayshape.vertices.push(new THREE.Vector3(-this.width, 0 + this.startY));
    this.rayshape.vertices.push(new THREE.Vector3(this.width, 0 + this.startY));
    this.rayshape.vertices.push(new THREE.Vector3(0, -this.focalLength * 2 + this.startY));

    this.rayshape.vertices.push(new THREE.Vector3(this.width, -this.focalLength * 2 + this.startY));
    this.rayshape.vertices.push(new THREE.Vector3(-this.width, -this.focalLength * 4 + this.startY));
    this.rayshape.vertices.push(new THREE.Vector3(this.width, -this.focalLength * 4 + this.startY));
    this.rayshape.vertices.push(new THREE.Vector3(-this.width, -this.focalLength * 2 + this.startY));
    this.rayshape.vertices.push(new THREE.Vector3(this.width, -this.focalLength * 2 + this.startY));
    this.rayshape.vertices.push(new THREE.Vector3(-this.width, 0 + this.startY));
    this.rayshape.vertices.push(new THREE.Vector3(this.width, 0 + this.startY));
    this.rayshape.vertices.push(new THREE.Vector3(-this.width, -this.focalLength * 2 + this.startY));



    this.ray= new THREE.Line(this.rayshape, this.raymaterial);
    scene.add(this.ray);

  }

  updateFocalLength(newLen){
    scene.remove(this.ray);
    scene.remove(this.ellipses);
    this.ray = null;
    this.ellipses = null;

    this.focalLength = newLen;
    this.rayshape = null;
    this.raymaterial = null;
    this.createLens();
    render();
  }


}