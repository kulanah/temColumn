class component {
  constructor(originSide, height, centerPoint, y, focalLength){
    this.originSide = originSide;
    this.height = height;
    this.centerPoint = centerPoint;
    this.y = y;
    this.focalLength = focalLength;

    this.shape = new THREE.Geometry();

    if (this.originSide === 'left'){
      this.xOffset = 0;
      this.oppSide = centerPoint * 2;
    } else {
      this.oppSide = 0;
      this.xOffset = centerPoint * 2;
    }

    this.material = new THREE.LineBasicMaterial({color: 0xff37d8});
  }


  createLens(){
    console.log('x: ' + this.xOffset);
    console.log('y: ' + this.y);
    //TODO: create lens stuff
    this.shape.vertices.push(new THREE.Vector3(10,15));
    this.shape.vertices.push(new THREE.Vector3(-10,15));
    // this.shape.vertices.push(new THREE.Vector3(0,0));
    this.shape.vertices.push(new THREE.Vector3(10,0));
    this.shape.vertices.push(new THREE.Vector3(10,15));

    this.shape.faces.push(new THREE.Face3(0,1,2));

    // this.shape.vertices.push(new THREE.Vector3(-10,0,10));
    let x = this.xOffset;
    let y = this.y;


    this.line = new THREE.Line(this.shape, this.material);
  }

  drawLens(scene){
    this.createLens();
    scene.add(this.line);
  }
}