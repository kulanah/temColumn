class Gun extends ColumnComponent{
  constructor(width, scene, title){
    super(0.8, width, scene, title);
    this.height = 3;
    this.geometry = new THREE.ConeGeometry(this.width, this.height, 4, 1);
    this.material = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      // wireframe: true,
      side: THREE.DoubleSide
    });
  }

  drawGun(){
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    // this.geometry.makeTranslation({x: 1, y: 1, z: 0.6});
    this.geometry.applyMatrix(new THREE.Matrix4().makeScale(1, 1, 0.6));
    
    this.mesh.position.y = this.startY;
    this.scene.add(this.mesh);

  }

  getStartY(){
    return this.startY - 0.1;
  }

  draw(){
    this.drawGun();

  }
}