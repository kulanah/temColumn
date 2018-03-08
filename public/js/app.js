'use strict';

let renderer, scene, camera, controls;

//this sets the column height and gives us a camera offset
let columnHeight = 40;

let init = function(){
  initRenderer();
  initLight();
  initCamera();
  initControls();
  initPointSphere();
}

let initRenderer = function(){
    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.id = 'threejscanvas';
    document.getElementById('viewport').appendChild(renderer.domElement);

    scene = new THREE.Scene();
}

let initLight = function(){
  let keyLight = new THREE.DirectionalLight(0xff0000, 1, 0);
  keyLight.position.set(4,5,1);
  
  let backLight = new THREE.DirectionalLight(0x00ffff,  1, 0);
  backLight.position.set(-7, 3, -5);

  let underLight = new THREE.DirectionalLight(0xffffff, 1, 0);
  underLight.position.set(0,-5,0);

  scene.add(backLight);
  scene.add(keyLight);
  scene.add(underLight);
}

let initCamera = function(){
  camera = new THREE.PerspectiveCamera(
    35,                                       //fov
    window.innerWidth / window.innerHeight,   //aspect ratio  
    0.5,                                      //near plane 
    1000                                      //far plane
  );

  // camera.position.set(0, -columnHeight / 2,80);
  // camera.position.set(0, -columnHeight / 8, 30);
  camera.position.set(5, 10, 35);
  // camera.position.set(0,0,20);
  scene.add(camera);
}

let initControls = function(){
  controls = new THREE.TrackballControls(camera, document.getElementById('threejscanvas'));
  controls.addEventListener('change', render)
  // controls.target.set(0, 19, 29 );
  // controls.target.set(0, -columnHeight / 8, 0);
  // controls.target.set(0, -columnHeight / 2, 0);
}

let render = function(){
  renderer.render(scene, camera);
}

let animate = function(){
  requestAnimationFrame(animate);
  controls.update();
  render();
}

let createShapes = function(){
  let coneGeo = new THREE.ConeGeometry(2, 5, 100, 1);
  let coneMats = new THREE.MeshBasicMaterial({color: 0xff69b4, wireframe: true});

  let cone = new THREE.Mesh(coneGeo, coneMats);
  cone.rotation.z = 0.4

  let coneBSP = new ThreeBSP(cone);


  let cubeGeo = new THREE.BoxGeometry(12,10,10);
  let cubeMats = new THREE.MeshBasicMaterial({color: 0x00ffff, wireframe: true});

  let cube = new THREE.Mesh(cubeGeo, cubeMats);
  cube.position.y -= 5;

  let cubeBSP = new ThreeBSP(cube);

  let subBSP = coneBSP.subtract(cubeBSP);
  let result = subBSP.toMesh(new THREE.MeshBasicMaterial({transparent: false, color: 0xffffff, wireframe: true, wireframeLinejoin: "miter", wireframeLinewidth: 10})); 

  // result.geometry.computeVertexNormals();
  scene.add(result);

  // scene.add(cube);
  // scene.add(cone);
}

let initPointSphere = function(){
  let geo = new THREE.SphereGeometry(.25,.25,1,1);
  let mats = new THREE.MeshBasicMaterial({ wireframe: true, color: 0xffffff});

  let shape = new THREE.Mesh(geo, mats);
  shape.position.x = 4;
  shape.position.y = 4.5;
  shape.position.z = 0;

  scene.add(shape);



  let cGeo = new THREE.ConeGeometry(4,9,9);
  let cShape = new THREE.Mesh(cGeo, mats);

  cShape.rotation.z = 2
  cShape.position.x = 4;
  cShape.position.y = 4.5;
  scene.add(cShape);
}


let temColumn;
let columnInit = function(){

  temColumn = new Column(columnHeight);

  temColumn.addLens(1, 3, 4);

  temColumn.drawColumn();
  temColumn.drawLenses();

}


let initFacing = function(){
  var material = new THREE.MeshBasicMaterial( { color : 0x00cc00 } );

  //create a triangular geometry
  var geometry = new THREE.Geometry();
  geometry.vertices.push( new THREE.Vector3( -5, -5, 0 ) );
  geometry.vertices.push( new THREE.Vector3(  5, -5, 0 ) );
  geometry.vertices.push( new THREE.Vector3(  5,  5, 0 ) );

  //create a new face using vertices 0, 1, 2
  var normal = new THREE.Vector3( 0, 1, 0 ); //optional
  var color = new THREE.Color( 0xffaa00 ); //optional
  var materialIndex = 0; //optional
  var face = new THREE.Face3( 0, 1, 2);

  //add the face to the geometry's faces array
  geometry.faces.push( face );

  //the face normals and vertex normals can be calculated automatically if not supplied above
  geometry.computeFaceNormals();
  geometry.computeVertexNormals();

  scene.add( new THREE.Mesh( geometry, material));
}
init();
// createShapes();
animate();
render();
// columnInit();

// initFacing();
render();
