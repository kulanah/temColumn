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

  camera.position.set(0, -columnHeight / 2,80);
  scene.add(camera);
}

let initControls = function(){
  controls = new THREE.TrackballControls(camera, document.getElementById('threejscanvas'));
  controls.addEventListener('change', render)
  controls.target.set(0, -columnHeight / 2, 0);
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
  let mats = new THREE.MeshBasicMaterial({color: 0xffffff});

  let shape = new THREE.Mesh(geo, mats);
  shape.position.x = 0;
  shape.position.y = 0;
  shape.position.z = 0;

  scene.add(shape);
}


let columnInit = function(){
  let temColumn;
  window.temColumn = temColumn;

  temColumn = new Column(columnHeight);

  temColumn.addLens(1);

  temColumn.drawColumn();
  temColumn.drawLenses();

}


init();
// createShapes();
animate();
render();
columnInit();
