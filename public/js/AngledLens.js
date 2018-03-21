class AngledLens extends SimpleLens{
  constructor(focalLength, startY, width, centerPoint, lensHeight, x1, x2, scene, title){
    super(focalLength, startY, width, centerPoint, lensHeight, scene, title);

    this.scene = scene;
    this.x1 = x1;
    this.x2 = x2;
  }
  drawRays(){
    let rayShape1 = new THREE.Geometry();
    let newMid = (Number(this.x1) + Number(this.x2)) / 2;

    //0
    rayShape1.vertices.push(new THREE.Vector3(this.width, 0 - this.startY, 0));
    //1
    rayShape1.vertices.push(new THREE.Vector3(-this.width, 0 - this.startY, 0));

    //2
    rayShape1.vertices.push(new THREE.Vector3(0, 0 - this.startY, this.width)); 
    //3
    rayShape1.vertices.push(new THREE.Vector3(0, -this.lensHeight + this.focalLength - this.startY));
    //4
    rayShape1.vertices.push(new THREE.Vector3(0, 0 - this.startY, -this.width));

    //5
    rayShape1.vertices.push(new THREE.Vector3(newMid , -this.lensHeight - this.startY,this.width));
    //6
    rayShape1.vertices.push(new THREE.Vector3(this.x1, -this.lensHeight - this.startY, 0));
    //7
    rayShape1.vertices.push(new THREE.Vector3(this.x2, -this.lensHeight - this.startY, 0));
    //8
    rayShape1.vertices.push(new THREE.Vector3(newMid,-this.lensHeight - this.startY,-this.width));
    //9
    rayShape1.vertices.push(new THREE.Vector3(0,-this.lensHeight - this.startY -this.focalLength,0));

    //10
    rayShape1.vertices.push(new THREE.Vector3(-this.width, -2 * this.lensHeight - this.startY, 0));
    //11
    rayShape1.vertices.push(new THREE.Vector3(0, -2 * this.lensHeight - this.startY, this.width));
    //12
    rayShape1.vertices.push(new THREE.Vector3(this.width, -2 * this.lensHeight - this.startY,0));




    rayShape1.faces.push(new THREE.Face3(1,2,3));
    rayShape1.faces.push(new THREE.Face3(3,2,0));
    rayShape1.faces.push(new THREE.Face3(1,4,3));
    rayShape1.faces.push(new THREE.Face3(3,4,0));
    rayShape1.faces.push(new THREE.Face3(3,5,6));
    rayShape1.faces.push(new THREE.Face3(3,5,7));
    rayShape1.faces.push(new THREE.Face3(3,6,8));
    rayShape1.faces.push(new THREE.Face3(9,8,6));
    rayShape1.faces.push(new THREE.Face3(9,5,6));
    rayShape1.faces.push(new THREE.Face3(9,7,5));
    rayShape1.faces.push(new THREE.Face3(9,8,7));

    rayShape1.faces.push(new THREE.Face3(9,10,11));
    rayShape1.faces.push(new THREE.Face3(9,11,12));
    rayShape1.faces.push(new THREE.Face3(9,10,11));

    rayShape1.computeFaceNormals();
    rayShape1.computeVertexNormals();


    let rayShape2 = new THREE.Geometry();
    //0
    rayShape2.vertices.push(new THREE.Vector3(0, -this.lensHeight + this.focalLength - this.startY));
    //1
    rayShape2.vertices.push(new THREE.Vector3(0, 0 - this.startY, -this.width));

    //2
    rayShape2.vertices.push(new THREE.Vector3(-newMid , -this.lensHeight - this.startY,this.width));
    //3
    rayShape2.vertices.push(new THREE.Vector3(-this.x1, -this.lensHeight - this.startY, 0));
    //4
    rayShape2.vertices.push(new THREE.Vector3(-this.x2, -this.lensHeight - this.startY, 0));
    //5
    rayShape2.vertices.push(new THREE.Vector3(-newMid,-this.lensHeight - this.startY,-this.width));
    //6
    rayShape2.vertices.push(new THREE.Vector3(0,-this.lensHeight - this.startY -this.focalLength,0));


    rayShape2.faces.push(new THREE.Face3(0,2,3));
    rayShape2.faces.push(new THREE.Face3(0,2,4));
    rayShape2.faces.push(new THREE.Face3(0,3,5));
    rayShape2.faces.push(new THREE.Face3(6,5,3));
    rayShape2.faces.push(new THREE.Face3(6,2,3));
    rayShape2.faces.push(new THREE.Face3(6,4,2));
    rayShape2.faces.push(new THREE.Face3(6,5,4));

    rayShape2.computeFaceNormals();
    rayShape2.computeVertexNormals();

    this.ray2 = new THREE.Mesh(rayShape2, this.faceMat);


    this.ray= new THREE.Mesh(rayShape1, this.faceMat);

    // this.ray.rotation.y = Math.PI / 8;
    this.scene.add(this.ray);
    this.scene.add(this.ray2);
  }

  updatex1(newWidth){
    this.scene.remove(this.ray);
    this.ray = null;

    this.scene.remove(this.ray2);
    this.ray2 = null;

    this.x1 = newWidth;
    this.rayShape1 = null;
    this.drawRays();
  }

  updatex2(newWidth){
    this.scene.remove(this.ray);
    this.ray = null;

    this.scene.remove(this.ray2);
    this.ray2 = null;

    this.x2 = newWidth;
    this.rayShape1 = null;
    this.drawRays();
  }
}