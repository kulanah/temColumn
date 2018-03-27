class CylinderLens extends ColumnComponent{
  //use width as top radius
  constructor(focalLength, startY, lensHeight, width, scene, title, radiusBottom){
    super(startY, width, scene, title, endY);
    this.focalLength = focalLength;
    this.radiusBottom = radiusBottom;
    this.lensHeight = lensHeight;
    this.endY = this.startY + this.focalLength + this.lensHeight;

    this.lensMat = new THREE.MeshPhongMaterial({
      color: 0xff69b4,
      wireframe: true,
      side: THREE.DoubleSide
    });
  }


}