class Screen extends ColumnComponent{
  constructor(startY, focalLength, width, scene, title){
    super(startY, width, scene, title);
    this.focalLength = focalLength;
  }

  drawRays(){

  }

  drawScreen(){
    this.screenGeo = new THREE.CylinderGeometry(this.width * 2, this.width * 2, 0.25, 8, 1, true);
    this.screenMat = new THREE.MeshBasicMaterial({color: 0xffffff});

    this.screenMesh = new THREE.Mesh(this.screenGeo, this.screenMat);
    this.screenMesh.position.y = - this.startY - this.focalLength;

    this.scene.add(this.screenMesh);

    

  }
  
  draw(){
    this.drawRays();
    this.drawScreen();
  }
}