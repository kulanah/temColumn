'use strict';
class Column{
  constructor(height, scene){
    this.components = new Array();
    this.height = height;
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


  addSimpleLens(focal, lensHeight, title){
    let newComp = new SimpleLens(focal, this.getStartY(), this.width, 0, lensHeight, this.scene, title);
    this.components.push(newComp);
  }


  addAngledLens(focal, lensHeight, x1, x2, title){
    let newComp = new AngledLens(focal, this.getStartY(), this.width, 0, lensHeight, x1, x2, this.scene, title);
    this.components.push(newComp);
  }


  addCylinderLens(focal, lensHeight, title, radiusPercentage){
    let radiusBot = this.width * radiusPercentage;
    let newComp = new CylinderLens(
      focal, 
      this.getStartY(), 
      lensHeight, 
      this.width, 
      this.scene, 
      title, 
      radiusBot
    );
    this.components.push(newComp);
  }

  getStartY(){
    let startY = 0;
    if (this.components.length != 0){
      startY = this.components[this.components.length - 1].getEndY();
    } 

    return startY;
  }

  addExtractorBeam(title){
    let startY = 0;
    if (this.components.length != 0){
      startY = this.components[this.components.length - 1].getEndY();
    } 
    let baseExtractorBeam = new ExtractorBeam(this.width / 4, this.scene, title, startY);
    this.components.push(baseExtractorBeam);
  }



  addGun(title){
    //Placeholder options:
    let startY = -0.2;
    let width = 0.5;
    let endY = 0.4;
    let gun = new Gun(startY, width,this.scene, title, endY)
    this.components.push(gun);
  }


  addLabel(lensNum, size, percentage){
    if (this.components[lensNum]){
      this.components[lensNum].addLabel(size, percentage);
    } else {
      throw new Error ('The component you\'re trying to add a label for doesn\'t exist');
    }
  }


  draw(){
    for (let i = 0; i < this.components.length; ++i){
      this.components[i].draw();
    }
  }


  focusColumn(lensNum){
    return this.components[lensNum].getMiddle();
  }


  getTitle(lensNum){
    return this.components[lensNum].getTitle();
  }


  init(){
    // this.drawColumn();
  }


  updateFocalLength(lensNum, focalLen){
    this.components[lensNum].updateFocalLength(focalLen);
    if (this.components[lensNum + 1]){
      this.components[lensNum + 1].updateStartY(this.components[lensNum].getEndY());
    }
  }


  updateLeftBoundry(lensNum, leftBound){
    this.components[lensNum].updatex1(leftBound);
  }


  updateRightBoundry(lensNum, rightBound){
    this.components[lensNum].updatex2(rightBound);
  }

  updateBotRadius(lensNum, newRadiusPercentage){
    this.components[lensNum].updateBotRadius(newRadiusPercentage);
  }
}