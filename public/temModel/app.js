let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, 0.1, 1500);
let controls;
let renderer;
let columnHeight = -45;

let init = function(){
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.id = 'threeCanvas';
  document.body.appendChild(renderer.domElement);

  controls = new THREE.TrackballControls(camera, document.getElementById('threeCanvas'));
  controls.addEventListener('change', render);


  let xVal = -3;
  // camera.positon.set(0,0,0);
  // camera.positon.set(new THREE.Vector3(0,0,0));
  camera.position.x = 0;
  camera.position.z = 200;
  camera.position.y = 0;
  camera.position.x = xVal;

  controls.target = new THREE.Vector3(xVal, columnHeight / 2, 0);
  initLights();

  createLenses();

};


let initLights = function() {
  let xVal = 0;
  let yVal = 0;
  let zVal = -140;

  let geo = new THREE.SphereGeometry(.25, 3, 3);
  let mat = new THREE.MeshBasicMaterial({wireframe: true, color: 0xff69b4});
  let sphere = new THREE.Mesh(geo, mat);
  sphere.position.x = 0;
  sphere.position.y = -45;
  sphere.position.z = 0;

  scene.add(sphere);

  // let keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(0, 100%, 100%)'), 1);
  let keyLight = new THREE.PointLight(new THREE.Color('hsl(0, 100%, 100%)'), 1.4);
  keyLight.position.set(xVal, yVal, zVal);
  // keyLight.target.position.set = (0,-10,0);
  
  let fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(285, 100%, 100%)'), 1);
  fillLight.position.set(-10, 0, 5);
  
  let backLight = new THREE.DirectionalLight(new THREE.Color('hsl(58, 100%, 100%)'), 1);
  backLight.position.set(0,0,50);
  
  let topLight = new THREE.DirectionalLight(new THREE.Color('hsl(338, 100%, 100%)'), 1);
  topLight.position.set(0, 10, 0).normalize();

  scene.add(keyLight);
  // scene.add(backLight);
};

let render = function(){
  renderer.render(scene, camera);
};

let drawScene = function(){
  temColumn.init();
  render();
};

let animate = function(){
  requestAnimationFrame(animate);
  controls.update();
};

let createLenses = function(){
  temColumn.addLens(1.2, 8);
  temColumn.addLens(2, 5);
  temColumn.addLens(2, 5);

  temColumn.drawLenses(); 


};


let temColumn = new column(columnHeight);


let draggables = [];

for (let i = 0; i < draggables.length; ++i){
  $('#' + draggables[i]).draggable({
    addClasses: true,
    // cancel: 'map, iframe',
    // iframeFix: true,
    cursor: 'move'
  });
}

$('.hidden').hide();


init();
animate();
drawScene();