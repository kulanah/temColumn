class OverhangLens extends SimpleLens{
  constructor(focalLength, startY, width, centerPoint, lensHeight, scene, title, delta){
    super(0, startY, width, centerPoint, lensHeight, scene, title);

    this.delta = delta;

    this.leftX = -width - delta;
    this.rightX = width + delta;

    this.x1 = width;
    this.x2 = -width;

    this.setCrossLinePoints();
  }

  setCrossLinePoints(){
    let rise = this.lensHeight - this.startY;
    let slope = Math.abs(rise) / (this.width * 2 + this.delta); 
    let focal = this.x1 + slope * this.width;


    let mid = slope * this.x1 - focal;

    this.midPoint = mid;
    this.focalLength = focal;
  }


  drawRays(){
    let rayShape = new THREE.Geometry();
    
    //0
    rayShape.vertices.push(new THREE.Vector3(this.x1, -this.startY, 0));
    //1
    rayShape.vertices.push(new THREE.Vector3(this.x2, -this.startY, 0));
    //2
    rayShape.vertices.push(new THREE.Vector3(0, -this.startY, 0));
    //3
    rayShape.vertices.push(new THREE.Vector3(0, -this.startY - this.lensHeight / 2, this.depth));
    //4
    rayShape.vertices.push(new THREE.Vector3(this.x1, -this.startY - this.lensHeight / 2, this.depth));

  }


}