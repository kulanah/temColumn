import { ColumnComponent } from './ColumnComponent.js';
class Screen extends ColumnComponent{
  constructor(startY, focalLength, radius, scene, title){
    super(startY, radius, scene, title);
    this.focalLength = focalLength;

    this.rayGeo = new THREE.ConeGeometry(this.radius, this.focalLength, 16, 1);
    this.faceMat = new THREE.MeshPhongMaterial({
      color: 0xff69b4, 
      wireframe: false, 
    });
    this.frameMat = new THREE.MeshPhongMaterial({
      color: 0xf4a1c8,
      wireframe: true, 
    });
    this.rayGeo.applyMatrix(new THREE.Matrix4().makeScale(1.5, 1,  0.5));
  }

  drawRays(){
    this.rayMesh = new THREE.Mesh(this.rayGeo, this.faceMat);
    this.rayMesh.position.y = -this.startY - this.focalLength / 2;
    this.scene.add(this.rayMesh);
  }

  drawScreen(){
    this.ringGeo = new THREE.CylinderGeometry(this.radius * 2, this.radius * 2, 0.25, 16, 1, true);
    this.ringMat = new THREE.MeshBasicMaterial({color: 0x00000, side: THREE.DoubleSide});

    this.ringMesh = new THREE.Mesh(this.ringGeo, this.ringMat);
    this.ringMesh.position.y = - this.startY - this.focalLength;

    this.innerringGeo = new THREE.CylinderGeometry(this.radius / 2, this.radius / 2, 0.25, 16, 1, true);
    this.innerringMat = new THREE.MeshBasicMaterial({color: 0x00000, side: THREE.DoubleSide});

    this.innerringMesh = new THREE.Mesh(this.innerringGeo, this.innerringMat);
    this.innerringMesh.position.y = - this.startY - this.focalLength + 0.05;

    this.screenGeo = new THREE.CylinderGeometry(this.radius * 2 - 0.01, this.radius * 2 - 0.01, 0.25, 16);
    this.screenMat = new THREE.MeshBasicMaterial({color: 0xffffff, side: THREE.DoubleSide});

    this.screenMesh = new THREE.Mesh(this.screenGeo, this.screenMat);
    this.screenMesh.position.y = - this.startY - this.focalLength;

    this.scene.add(this.ringMesh);
    this.scene.add(this.screenMesh);
    this.scene.add(this.innerringMesh);
  }
  
  draw(){
    this.drawRays();
    this.drawScreen();
  }
}

export { Screen };