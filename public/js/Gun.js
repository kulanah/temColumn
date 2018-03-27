class Gun extends ColumnComponent{
  constructor(startY, width, scene, title, endY){
    super(startY, width, scene, title, endY);
  }

  drawGun(){
    this.gunGeo = new THREE.CylinderGeometry(this.width, this.width, this.endY - this.startY, 8, 1);
    this.gunMat = new THREE.MeshPhongMaterial({color: 0xaaaaaa});

    this.gunMesh = new THREE.Mesh(this.gunGeo, this.gunMat);
    this.gunMesh.position.y = this.startY;
    this.scene.add(this.gunMesh);
  }

  getEndY(){
    return this.endY;
  }

  draw(){
    this.drawGun();
  }
}