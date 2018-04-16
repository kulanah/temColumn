class Aperture extends ColumnComponent{
  constructor(radius, scene, title, heightPercent, widthPercent, lensHeight, lensRadius, lensStart){
    super(0, radius, scene, title, 0);

    this.heightPercent = heightPercent;
    this.widthPercent = widthPercent;
    this.lensStart = lensStart;
    this.lensHeight = lensHeight;
    this.lensRadius = lensRadius;
    this.apertureDepth = radius * 1.75;

    this.baseLensRadius = this.lensRadius;
    
    this.baseApertureWidth = this.radius * 2;

    this.startY = (this.lensHeight * this.heightPercent) //+ lensStart;
    this.endY = this.startY + 0.5;

    this.lensRadius = this.baseLensRadius * this.heightPercent * this.widthPercent;
  }

  draw(){
    this.drawAperture();
  }

  drawAperture(){
    let appertureMat = new THREE.MeshBasicMaterial({color: 0x5555cc});

    let apertureWidth = this.baseApertureWidth; 
    let appertureGeo = new THREE.CubeGeometry(apertureWidth, 0.25, this.apertureDepth, 1, 1, 1);

    this.aperture1 = new THREE.Mesh(appertureGeo, appertureMat);
    this.aperture1.position.y = -this.startY - this.lensStart;
    this.aperture1.position.x = -this.lensRadius * 1.8  - (0.5 * this.baseApertureWidth);

    this.scene.add(this.aperture1);

    this.aperture2 = new THREE.Mesh(appertureGeo, appertureMat);
    this.aperture2.position.y = -this.startY - this.lensStart;
    this.aperture2.position.x = this.lensRadius * 1.8 + (0.5 * this.baseApertureWidth);

    this.scene.add(this.aperture2);
  }

  clear(){
    this.scene.remove(this.aperture1);
    this.scene.remove(this.aperture2);
  }


  updateWidth(newWidth){
    this.clear();
    this.widthPercent = newWidth;
    this.lensRadius = this.baseLensRadius * this.heightPercent * this.widthPercent;
    if (newWidth === 0){
      return true;
    }
  }
}