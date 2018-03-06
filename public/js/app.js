'use strict';

let renderer, scene, camera, light;

let init = function(){
    initRenderer();
    initLight();
    initCamera();
}

let initRenderer = function(){
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.id = 'threejscanvas';
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
    window.innerWidht / window.innerHeight,   //aspect ratio  
    1,                                        //near plane 
    1000                                      //far plane
  );

  camera.position.set(5, 5, 20);
  scene.add(camera);
}
