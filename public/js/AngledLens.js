class AngledLens extends SimpleLens{
  constructor(focalLength, startY, width, centerPoint, lensHeight, x1, x2, scene){
    super(focalLength, startY, width, centerPoint, lensHeight);

    this.scene = scene;
    this.x1 = x1;
    this.x2 = x2;
  }
  drawRays(){
    let rayShape = new THREE.Geometry();
    let newMid = (Number(this.x1) + Number(this.x2)) / 2;

    //hourglass section
    //0
    rayShape.vertices.push(new THREE.Vector3(this.width, 0 - this.startY, 0));
    //1
    rayShape.vertices.push(new THREE.Vector3(-this.width, 0 - this.startY, 0));

    //2
    rayShape.vertices.push(new THREE.Vector3(0, 0 - this.startY, this.width)); 
    //3
    rayShape.vertices.push(new THREE.Vector3(0, -this.lensHeight + this.focalLength - this.startY));
    //4
    rayShape.vertices.push(new THREE.Vector3(0, 0 - this.startY, -this.width));

    //5
    rayShape.vertices.push(new THREE.Vector3(newMid , -this.lensHeight - this.startY,this.width));
    //6
    rayShape.vertices.push(new THREE.Vector3(this.x1, -this.lensHeight - this.startY, 0));
    //7
    rayShape.vertices.push(new THREE.Vector3(this.x2, -this.lensHeight - this.startY, 0));
    //8
    rayShape.vertices.push(new THREE.Vector3(newMid,-this.lensHeight - this.startY,-this.width));
    //9
    rayShape.vertices.push(new THREE.Vector3(0,-this.lensHeight - this.startY -this.focalLength,0));

    //10
    rayShape.vertices.push(new THREE.Vector3(-this.width, -2 * this.lensHeight - this.startY, 0));
    //11
    rayShape.vertices.push(new THREE.Vector3(0, -2 * this.lensHeight - this.startY, this.width));
    //12
    rayShape.vertices.push(new THREE.Vector3(this.width, -2 * this.lensHeight - this.startY,0));




    rayShape.faces.push(new THREE.Face3(1,2,3));
    rayShape.faces.push(new THREE.Face3(3,2,0));
    rayShape.faces.push(new THREE.Face3(1,4,3));
    rayShape.faces.push(new THREE.Face3(3,4,0));
    rayShape.faces.push(new THREE.Face3(3,5,6));
    rayShape.faces.push(new THREE.Face3(3,5,7));
    rayShape.faces.push(new THREE.Face3(3,6,8));
    rayShape.faces.push(new THREE.Face3(9,8,6));
    rayShape.faces.push(new THREE.Face3(9,5,6));
    rayShape.faces.push(new THREE.Face3(9,7,5));
    rayShape.faces.push(new THREE.Face3(9,8,7));

    rayShape.faces.push(new THREE.Face3(9,10,11));
    rayShape.faces.push(new THREE.Face3(9,11,12));
    rayShape.faces.push(new THREE.Face3(9,10,11));

    rayShape.computeFaceNormals();
    rayShape.computeVertexNormals();
    this.ray= new THREE.Mesh(rayShape, this.faceMat);

    // this.ray.rotation.y = Math.PI / 8;
    this.scene.add(this.ray);
  }

  updatex1(newWidth){
    this.scene.remove(this.ray);
    this.ray = null;

    this.x1 = newWidth;
    this.rayShape = null;
    this.drawRays();
  }

  updatex2(newWidth){
    this.scene.remove(this.ray);
    this.ray = null;

    this.x2 = newWidth;
    this.rayShape = null;
    this.drawRays();
  }
}