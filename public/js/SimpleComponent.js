class SimpleComponent{
  constructor(f, y, lH, lW){
    this.focalLength = -f;
    this.yOffset = -y;
    this.lensHeight = -lH + -y;
    this.lensWidth = lW;
    this.wireframe = true;
  }

  drawLens(){
    this.lensShape = new THREE.SphereGeometry(.5, 16, 12);
    this.lensShape.applyMatrix(new THREE.Matrix4().makeScale(this.lensWidth * 1.5, 0.5, this.lensWidth * 1.25));
    // this.lensShape.applyMatrix(new THREE.Matrix4().makeScale(this.lensWidth * 1.5, 0.5, this.lensWidth * 1.25));

    this.lensMat = new THREE.MeshBasicMaterial({color: 0xa5f2f3, wireframe: false});

    this.lensMesh = new THREE.Mesh(this.lensShape, this.lensMat);
    this.lensMesh.position.y = this.lensHeight;

    scene.add(this.lensMesh);
  }

  drawTetrahedrons(){
    let coneRadius = 1;
    let radialSegments = 4; 
    let tetraMat = new THREE.MeshBasicMaterial({color: 0xffff00, wireframe: this.wireframe, transparent: false, opacity: 0.2});
    let cubeMat = new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe: this.wireframe});

    let tetraShape1 = new THREE.ConeGeometry(coneRadius, 3, radialSegments);
    // tetraShape.applyMatrix(new THREE.Matrix4().makeScale())

    let tetra1 = new THREE.Mesh(tetraShape1, tetraMat);
    tetra1.rotation.z = Math.PI;
    tetra1.position.y = -1.3;

    let tetraShape2 = new THREE.ConeGeometry(coneRadius, 3, radialSegments);  
    let tetra2 = new THREE.Mesh(tetraShape2, tetraMat);
    // tetra1.rotation.z
    tetra2.position.y = -4.7;


    let tetraShape3 = new THREE.ConeGeometry(2, 6, radialSegments);
    let tetra3 = new THREE.Mesh(tetraShape3, tetraMat);
    tetra3.position.y = -3.5;
    tetra3.position.x = -.35;

    tetra3.rotation.z = 3.6;

    scene.add(tetra3);


    let tetra3cube = new THREE.BoxGeometry(6,5,4);

    let cube3 = new THREE.Mesh(tetra3cube, cubeMat);
    cube3.position.x = -4;
    cube3.position.y = -.5;

    scene.add(cube3)

    let tetra3BSP = new ThreeBSP(tetra3);
    let cube3BSP = new ThreeBSP(cube3);

    let sub3BSP = tetra3BSP.subtract(cube3BSP);
    // let result3 = sub3BSP.toMesh(new THREE.MeshBasicMaterial({color: 0xffff00, wireframe: this.wireframe, opacity: 0.2, transparent: true}));


    let tetraShape4 = new THREE.ConeGeometry(coneRadius, 5, radialSegments);
    let tetra4 = new THREE.Mesh(tetraShape4, tetraMat);
    tetra4.position.y = -3.95;
    tetra4.position.x = .1;

    tetra4.rotation.z = -3.6;


    let tetra4cube = new THREE.BoxGeometry(3,2,2);

    let cube4 = new THREE.Mesh(tetra3cube, cubeMat);
    cube4.position.x = 1.2
    cube4.position.y = -2;

    let tetra4BSP = new ThreeBSP(tetra4);
    let cube4BSP = new ThreeBSP(cube4);

    let sub4BSP = tetra4BSP.subtract(cube4BSP);
    let result4 = sub4BSP.toMesh(new THREE.MeshBasicMaterial({color: 0xffff00, wireframe: this.wireframe, opacity: 0.2, transparent: true}));


    let tetraShape5 = new THREE.ConeGeometry(coneRadius, 5, radialSegments);
    let tetra5 = new THREE.Mesh(tetraShape5, tetraMat);
    tetra5.position.y = -1.92;
    tetra5.position.x = -.5;

    tetra5.rotation.z = -.6;


    let tetra5cube = new THREE.BoxGeometry(3,2,2);

    let cube5 = new THREE.Mesh(tetra5cube, cubeMat);
    cube5.position.x = 1.2
    cube5.position.y = -2;

    let tetra5BSP = new ThreeBSP(tetra4);
    let cube5BSP = new ThreeBSP(cube4);

    let sub5BSP = tetra5BSP.subtract(cube4BSP);
    let result5 = sub5BSP.toMesh(new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe: this.wireframe}));

    scene.add(tetra1);  
    scene.add(tetra2);
    // scene.add(tetra3);
    // scene.add(cube3);
    // scene.add(tetra4);
    // scene.add(cube4);
    // scene.add(result3);
    // scene.add(result4);
  }

  drawLines(){
    this.rayShape = new THREE.Geometry();
    this.rayMat = new THREE.LineBasicMaterial({color: 0xff0000, linewidth: 10});

    this.rayShape.vertices.push(new THREE.Vector3(0,0,0));
    this.rayShape.vertices.push(new THREE.Vector3(10,0,0));
    this.rayShape.vertices.push(new THREE.Vector3(0,10,0));
    this.rayShape.vertices.push(new THREE.Vector3(0,0,10));

    this.rayLine = new THREE.Line(this.rayShape, this.rayMat);

    scene.add(this.rayLine);
  }


  draw(){
    this.drawLens();
    this.drawTetrahedrons();
    // this.drawRays();
  }
}