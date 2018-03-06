'use strict';

let renderer, scene, camera, light, controls;

let init = function(){
  initRenderer();
  initLight();
  initCamera();
  initControls();
}

let initRenderer = function(){
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.id = 'threejscanvas';
    document.getElementById('viewport').appendChild(renderer.domElement);

    scene = new THREE.Scene();
}

let initLight = function(){
  light = new THREE.PointLight(0xfffff);
  light.position.set(1,1,1).normalize();
  
  scene.add(light);
}

let initCamera = function(){
  camera = new THREE.PerspectiveCamera(
    35,                                       //fov
    window.innerWidth / window.innerHeight,   //aspect ratio  
    1,                                        //near plane 
    1000                                      //far plane
  );

  camera.position.set(0,0,20);
  scene.add(camera);
}

let initControls = function(){
  controls = new THREE.TrackballControls(camera, document.getElementById('threejscanvas'));
  controls.addEventListener('change', render)
}

let render = function(){
  renderer.render(scene, camera);
}

let animate = function(){
  requestAnimationFrame(animate);
  controls.update();
  render();
}

let createScene = function(){
  let coneGeo = new THREE.ConeGeometry(5, 5, 8, 1);
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
  let result = subBSP.toMesh(new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true}));

  result.geometry.computeVertexNormals();
  scene.add(result);

  // scene.add(cube);
  // scene.add(cone);
}






init();
createScene();
animate();
render();