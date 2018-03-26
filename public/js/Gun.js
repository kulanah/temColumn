class Gun extends ColumnComponent{
  constructor(width, scene, title){
    let height = 3;
    super(0.8, width, scene, title, height * 2);
    this.height = height;
    this.depth = this.width * 0.6;
    this.gunMaterial = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      side: THREE.FrontSide
    });

    this.beamMaterial = new THREE.MeshPhongMaterial({
      color: 0xff69b4
    });
  }

  drawGun(){
    let gunBeam = new THREE.Geometry();

    //0
    gunBeam.vertices.push(new THREE.Vector3(0, this.startY, 0));
    //1
    gunBeam.vertices.push(new THREE.Vector3(-this.width, this.startY - this.height, 0));
    //2
    gunBeam.vertices.push(new THREE.Vector3(0, this.startY - this.height, this.depth));
    //3
    gunBeam.vertices.push(new THREE.Vector3(this.width, this.startY - this.height, 0));
    //4
    gunBeam.vertices.push(new THREE.Vector3(0, this.startY - this.height, -this.depth));
    //5
    gunBeam.vertices.push(new THREE.Vector3(0, -this.endY, 0));

    
    gunBeam.faces.push(new THREE.Face3(0,1,2));
    gunBeam.faces.push(new THREE.Face3(0,2,3));
    gunBeam.faces.push(new THREE.Face3(0,4,1));
    gunBeam.faces.push(new THREE.Face3(0,3,4));
    gunBeam.faces.push(new THREE.Face3(2,1,5));
    gunBeam.faces.push(new THREE.Face3(2,5,3));
    gunBeam.faces.push(new THREE.Face3(3,5,4));
    gunBeam.faces.push(new THREE.Face3(5,1,4));

    gunBeam.computeFaceNormals();
    gunBeam.computeVertexNormals();

    this.gun = new THREE.Mesh(gunBeam, this.gunMaterial);
    this.scene.add(this.gun);
    


    //OLD DRAW FUNC WITH SHAPES
    // this.mesh = new THREE.Mesh(this.geometry, this.material);
    // // this.geometry.makeTranslation({x: 1, y: 1, z: 0.6});
    // this.geometry.applyMatrix(new THREE.Matrix4().makeScale(1, 1, 0.6));
    
    // this.mesh.position.y = this.startY;
    // this.scene.add(this.mesh);

  }

  getStartY(){
    return -(this.startY - this.height);
  }

  getEndY(){
    return this.endY;
  }

  draw(){
    this.drawGun();

  }
}