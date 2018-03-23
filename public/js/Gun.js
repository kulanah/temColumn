class Gun extends ColumnComponent{
  constructor(width, scene, title){
    super(0.8, width, scene, title);
    this.height = 3;
    this.geometry = new THREE.ConeGeometry(this.width, this.height, 5, 1);
    this.material = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      // wireframe: true,
      side: THREE.DoubleSide
    });
  }

  drawGun(){
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.y = this.startY;
    this.scene.add(this.mesh);

  }

  draw(){
    this.drawGun();

  }
}