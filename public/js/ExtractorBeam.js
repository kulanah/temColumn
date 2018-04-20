'use strict';
import { ColumnComponent } from './ColumnComponent.js';
class ExtractorBeam extends ColumnComponent{
  constructor(radius, scene, title, startY){
    let height = 1.5;
    super(startY, radius, scene, title, startY + height);
    this.half = height / 2;
    this.height = height;
    this.depth = this.radius * 0.6;
    this.ExtractorBeamMaterial = new THREE.MeshPhongMaterial({
      color: 0xff0000,
      side: THREE.FrontSide
    });

    this.beamMaterial = new THREE.MeshPhongMaterial({
      color: 0xff69b4
    });
  }

  drawExtractorBeam(){
    let ExtractorBeamBeam = new THREE.Geometry();

    //0
    ExtractorBeamBeam.vertices.push(new THREE.Vector3(0, -this.startY, 0));
    //1
    ExtractorBeamBeam.vertices.push(new THREE.Vector3(-this.radius, -this.startY - this.half, 0));
    //2
    ExtractorBeamBeam.vertices.push(new THREE.Vector3(0, -this.startY - this.half, this.depth));
    //3
    ExtractorBeamBeam.vertices.push(new THREE.Vector3(this.radius, -this.startY - this.half, 0));
    //4
    ExtractorBeamBeam.vertices.push(new THREE.Vector3(0, -this.startY - this.half, -this.depth));
    //5
    ExtractorBeamBeam.vertices.push(new THREE.Vector3(0, -this.endY, 0));

    
    ExtractorBeamBeam.faces.push(new THREE.Face3(0,1,2));
    ExtractorBeamBeam.faces.push(new THREE.Face3(0,2,3));
    ExtractorBeamBeam.faces.push(new THREE.Face3(0,4,1));
    ExtractorBeamBeam.faces.push(new THREE.Face3(0,3,4));
    ExtractorBeamBeam.faces.push(new THREE.Face3(2,1,5));
    ExtractorBeamBeam.faces.push(new THREE.Face3(2,5,3));
    ExtractorBeamBeam.faces.push(new THREE.Face3(3,5,4));
    ExtractorBeamBeam.faces.push(new THREE.Face3(5,1,4));

    ExtractorBeamBeam.computeFaceNormals();
    ExtractorBeamBeam.computeVertexNormals();

    this.ExtractorBeam = new THREE.Mesh(ExtractorBeamBeam, this.ExtractorBeamMaterial);
    this.scene.add(this.ExtractorBeam);
    


    //OLD DRAW FUNC WITH SHAPES
    // this.mesh = new THREE.Mesh(this.geometry, this.material);
    // // this.geometry.makeTranslation({x: 1, y: 1, z: 0.6});
    // this.geometry.applyMatrix(new THREE.Matrix4().makeScale(1, 1, 0.6));
    
    // this.mesh.position.y = this.startY;
    // this.scene.add(this.mesh);

  }

  getStartY(){
    return (this.startY - this.height);
  }

  getEndY(){
    return this.endY;
  }

  draw(){
    super.draw();
    this.drawExtractorBeam();
  }
  
}
export { ExtractorBeam };
