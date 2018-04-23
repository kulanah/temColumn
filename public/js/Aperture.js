
import { ColumnComponent } from './ColumnComponent.js';
class Aperture extends ColumnComponent{
  constructor(radius, scene, title, heightPercent, widthPercent, lensHeight, lensStart, focalLength){
    super(0, radius, scene, title, 0);

    this.heightPercent = heightPercent;
    this.widthPercent = widthPercent;
    this.lensStart = lensStart;
    this.lensHeight = lensHeight;
    this.lensRadius = radius;
    this.focalLength = focalLength;
    this.apertureDepth = radius * 1.3;

    this.baseLensRadius = this.lensRadius;
    
    this.baseApertureWidth = this.radius * 1.75;

    this.startY = (this.focalLength * this.heightPercent) + this.lensStart + this.lensHeight;
    this.endY = this.startY + 0.5;


    console.log('baseLensRad: ' + this.baseLensRadius);
    console.log('heightPercent: ' + this.heightPercent);
    console.log('widthPercent: ' + this.widthPercent);
    // console.log('lensStart: ' + this.lensStart);
    this.lensRadius = this.baseLensRadius * (1 - this.heightPercent) * this.widthPercent;
  }

  draw(){
    this.drawAperture();
  }

  drawAperture(){
    let appertureMat = new THREE.MeshBasicMaterial({color: 0x5555cc});

    let apertureWidth = this.baseApertureWidth; 
    let appertureGeo = new THREE.CubeGeometry(apertureWidth, 0.1, this.apertureDepth, 1, 1, 1);

    this.aperture1 = new THREE.Mesh(appertureGeo, appertureMat);
    this.aperture1.position.y = -this.startY;
    // console.log('lensRadius: ' +  this.lensRadius);
    this.aperture1.position.x = -this.lensRadius * 1.05  - (0.5 * this.baseApertureWidth);

    this.scene.add(this.aperture1);

    this.aperture2 = new THREE.Mesh(appertureGeo, appertureMat);
    this.aperture2.position.y = -this.startY;
    this.aperture2.position.x = this.lensRadius * 1.05 + (0.5 * this.baseApertureWidth);

    this.scene.add(this.aperture2);
  }

  clear(){
    this.scene.remove(this.aperture1);
    this.aperture1 = null;
    this.scene.remove(this.aperture2);
    this.aperture2 = null;
  }


  updateWidth(newWidth){
    this.clear();
    this.widthPercent = newWidth;
    this.lensRadius = this.baseLensRadius * (1 - this.heightPercent) * this.widthPercent;
    if (newWidth === 0){
      return true;
    }
  }

  getWidth(){
    return this.widthPercent;
  }
}

export { Aperture };