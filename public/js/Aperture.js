class Aperture extends ColumnComponent{
  constructor(radius, scene, title, heightPercent, widthPercent, lensHeight, lensRadius, lensStart){
    super(0, radius, scene, title, 0);

    this.heightPercent = heightPercent;
    this.lensStart = lensStart;
    this.lensHeight = lensHeight;
    this.lensRadius = lensRadius;

    this.apertureDepth = this.radius * 2;

    this.baseLens = this.lensRadius;
    
    this.width = 5;
    this.baseApertureWidth = this.radius * 2;

    this.startY = (this.lensHeight * this.heightPercent) + this.lensStart;
    this.endY = this.startY + 0.5;

    this.lensRadius = this.baseLens * this.heightPercent * this.heightPercent;

  }

  draw(){
    this.drawAperture();
  }

  drawAperture(){


    /*

      apertureX = rayWidth + 1/2 apertureWidth



    */
    let appertureMat = new THREE.MeshBasicMaterial({color: 0x5555cc});

    let apertureWidth = this.baseApertureWidth; // TODO:  Minus some value based on 
    let appertureLeft = new THREE.CubeGeometry(apertureWidth, 0.25, this.apertureDepth, 1, 1, 1);

    this.aperture1 = new THREE.Mesh(appertureLeft, appertureMat);
    this.aperture1.position.y = -this.startY;
    this.aperture1.position.x = -this.baseWidth + this.lensRadius;

    this.scene.add(this.aperture1);

    this.aperture2 = new THREE.Mesh(appertureLeft, appertureMat);
    this.aperture2.position.y = -this.startY;
    this.aperture2.position.x = this.lensRadius + this.width / 2;

    this.scene.add(this.aperture2);
  }

  clear(){
    this.scene.remove(this.aperture1);
    this.scene.remove(this.aperture2);
  }


  updateWidth(newWidth){
    // this.clear();
    // this.lensRadius = this.baseLens * (1 - newWidth) / 2;
  }

  getNewRadius(){
    return this.heightPercent;
  }
}