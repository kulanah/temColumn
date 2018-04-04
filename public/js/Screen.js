class Screen extends ColumnComponent{
  constructor(startY, focalLength, width, scene, title){
    super(startY, width, scene, title);
    this.focalLength = focalLength;
  }

  drawRays(){

  }

  drawScreen(){
    this.ringGeo = new THREE.CylinderGeometry(this.width * 2, this.width * 2, 0.25, 16, 1, true);
    this.ringMat = new THREE.MeshBasicMaterial({color: 0x00000, side: THREE.DoubleSide});

    this.ringMesh = new THREE.Mesh(this.ringGeo, this.ringMat);
    this.ringMesh.position.y = - this.startY - this.focalLength;

    this.innerringGeo = new THREE.CylinderGeometry(this.width / 2, this.width / 2, 0.25, 16, 1, true);
    this.innerringMat = new THREE.MeshBasicMaterial({color: 0x00000, side: THREE.DoubleSide});

    this.innerringMesh = new THREE.Mesh(this.innerringGeo, this.innerringMat);
    this.innerringMesh.position.y = - this.startY - this.focalLength + 0.05;

    this.screenGeo = new THREE.CylinderGeometry(this.width * 2 - 0.01, this.width * 2 - 0.01, 0.25, 16);
    this.screenMat = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide});

    this.screenMesh = new THREE.Mesh(this.screenGeo, this.screenMat);
    this.screenMesh.position.y = - this.startY - this.focalLength;

    this.scene.add(this.ringMesh);
    this.scene.add(this.screenMesh);
    this.scene.add(this.innerringMesh);

    

  }
  
  draw(){
    this.drawRays();
    this.drawScreen();
  }
}