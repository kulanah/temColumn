class SimpleComponent{
  constructor(){

  }
  // constructor(f, y, lH){
  //   this.focalLength = f;
  //   this.yOffset = y;
  //   this.lensHeight = lH + y;
  // }

  drawLens(){
    this.lensShape = new THREE.SphereGeometry(4, 16, 12);
    this.lensShape.applyMatrix(new THREE.Matrix4().makeScale(1, 0.5, 3));
    this.lensMat = new THREE.MeshBasicMaterial({color: 0x00000, wireframe: true});

    this.lensMesh = new THREE.Mesh(this.lensShape, this.lensMat);

    scene.add(this.lensMesh);
  }


  draw(){
    this.drawLens();
  }


}