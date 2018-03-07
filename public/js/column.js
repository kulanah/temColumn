class Column{
  constructor(columnHeight, lensWidth){
    this.components = new Array();
    this.columnHeight = columnHeight;
    this.lensOffset = 0;
    this.lensWidth = lensWidth;


  }

  drawColumn(){
    //radiusTop, radiusBottom, height, radialSegments, heightSegments, openEnded, thetaStart, thetaLength
    this.shape = new THREE.CylinderGeometry(5, 5, this.columnHeight, 8, 1, true, 1.6, Math.PI);
    this.mats = new THREE.MeshBasicMaterial({color: 0xff69b4, side: THREE.DoubleSide  });

    this.mesh = new THREE.Mesh(this.shape, this.mats);
    this.mesh.position.y = -this.columnHeight / 2;

    scene.add(this.mesh);
  }
  
  addLens(focalLength){
    this.components.push(new SimpleComponent());
  }

  drawLenses(){
    for (let i = 0; i < this.components.length; ++i){
      this.components[i].draw();
    }
  }
};
