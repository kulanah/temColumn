class Column{
  constructor(height, scene){
    this.components = new Array();
    this.height = height;
    //radius top, radius bottom, height, radial segments, height segments, open ended, theta start, theta length
    this.cMaterial = new THREE.CylinderGeometry(10, 10, this.height, 20, 1, true, 1.5, 3);
    this.cGeometry = new THREE.MeshPhongMaterial({
    // this.cGeometry = new THREE.MeshBasicMaterial({
      side:  THREE.FrontSide, 
      shadowSide: THREE.BackSide,
      wireframe: false, 
      color: 0xffffff
    });

    this.scene = scene;


    this.width = 2.5; 

    this.lineMaterial = new THREE.LineBasicMaterial({color: 0xff0000, side: THREE.DoubleSide});
    this.lineGeometry = new THREE.Geometry();

    this.cMaterial.computeFaceNormals();
    this.cMaterial.computeVertexNormals();

    this.cMesh = new THREE.Mesh(this.cMaterial, this.cGeometry);

    this.cMesh.position.y = this.height / 2;

    this.init = this.init.bind(this);
  }

  addSimpleLens(focal, lensHeight){
    if (this.components.length == 0){
      let newComp = new SimpleLens(focal, 0, this.width, 0, lensHeight, this.scene);
      this.components.push(newComp);
      // this.drawLenses();
    } else {
      let startY = this.components[this.components.length - 1].getHeight();
      let newComp = new SimpleLens(focal, startY, this.width, 0, lensHeight, this.scene);
      this.components.push(newComp);
      // this.drawLenses();
    }
  }

  addAngledLens(focal, lensHeight, x1, x2){
    if (this.components.length == 0){
      let newComp = new AngledLens(focal, 0, this.width, 0, lensHeight, x1, x2, this.scene);
      this.components.push(newComp);
      // this.drawLenses();
    } else {
      let startY = this.components[this.components.length - 1].getHeight();
      let newComp = new AngledLens(focal, startY, this.width, 0, lensHeight, x1, x2, this.scene);
      this.components.push(newComp);
      // this.drawLenses();
    }
  }

  drawLenses(){
    for (let i = 0; i < this.components.length; ++i){
      this.components[i].draw();
    }
  }

  drawColumn(){
    this.scene.add(this.cMesh);

    this.lineGeometry.vertices.push(new THREE.Vector3(0,0,0));
    this.lineGeometry.vertices.push(new THREE.Vector3(0,-45 ,0));

    this.line = new THREE.Line(this.lineGeometry, this.lineMaterial);

    this.scene.add(this.line);
  }


  init(){
    this.drawColumn();
  }

  updateFocalLength(lensNum, focalLen){
    this.components[lensNum].updateFocalLength(focalLen);
  }

  updateLeftBoundry(lensNum, leftBound){
    this.components[lensNum].updatex1(leftBound);
  }

  updateRightBoundry(lensNum, rightBound){
    this.components[lensNum].updatex2(rightBound);
  }

}