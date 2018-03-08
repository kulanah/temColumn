class column{
  constructor(height ){
    this.components = new Array();
    this.height = height;
    //radius top, radius bottom, height, radial segments, height segments, open ended, theta start, theta length
    this.cMaterial = new THREE.CylinderGeometry(10, 10, this.height, 20, 1, true, 1.5, 3);
    this.cGeometry = new THREE.MeshPhongMaterial({
    // this.cGeometry = new THREE.MeshBasicMaterial({
      side:  THREE.DoubleSide, 
      wireframe: false, 
      color: 0xaaaaaa
    });


    this.width = 2.5; 

    this.lineMaterial = new THREE.LineBasicMaterial({color: 0xff0000});
    this.lineGeometry = new THREE.Geometry();

    // this.cGeometry = new THREE.MeshBasicMaterial({
    //   side:  THREE.DoubleSide, 
    //   color: 0xaaaaaa,
    // });
    this.cMesh = new THREE.Mesh(this.cMaterial, this.cGeometry);

    this.cMesh.position.y = this.height / 2;

    this.init = this.init.bind(this);
  }

  addLens(focal, startY){
    let newComp = new simpleComponent(focal, startY, this.width, 0);
    this.components.push(newComp);
    this.drawLenses();
  }

  drawLenses(){
    this.components[0].createLens();
  }

  drawColumn(){
    scene.add(this.cMesh);

    this.lineGeometry.vertices.push(new THREE.Vector3(0,0,0));
    this.lineGeometry.vertices.push(new THREE.Vector3(0,-45 ,0));

    this.line = new THREE.Line(this.lineGeometry, this.lineMaterial);

    scene.add(this.line);
  }


  init(){
    this.drawColumn();
  }

}