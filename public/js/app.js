class MicroscopeColumn {
  constructor(divId){

    if (document.getElementById(divId) === null){
      console.error('ERROR: Couldn\'t the provided div ' + divId);
    } else {
      this.window = $('#' + divId);
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(15, 1, 0.1, 1500);
      this.controls;
      this.renderer;
      this.columnHeight = -45;

      this.animate = this.animate.bind(this);
      this.init = this.init.bind(this);
      this.render = this.render.bind(this);

      this.init();
      this.animate();
      this.drawScene();
    }
  }

  init(){
    this.renderer = new THREE.WebGLRenderer();
    
    this.renderer.setSize(this.window.width(), this.window.height());
    this.renderer.domElement.id = 'threeCanvas';
    this.window.append(this.renderer.domElement);

    this.controls = new THREE.TrackballControls(this.camera, document.getElementById('threeCanvas'));

    let xVal = -3;
    // camera.positon.set(0,0,0);
    // camera.positon.set(new THREE.Vector3(0,0,0));
    this.camera.position.x = 0;
    this.camera.position.z = 200;
    this.camera.position.y = 0;
    this.camera.position.x = xVal;

    this.controls.target = new THREE.Vector3(xVal, this.columnHeight / 2, 0);
    this.initLights();
    this.initColumn();
    this.controls.addEventListener('change', this.render);
  }

  initLights(){
    let xVal = -5;
    let yVal = -20;
    let zVal = 10;

    let geo = new THREE.SphereGeometry(.25, 3, 3);
    let mat = new THREE.MeshBasicMaterial({wireframe: true, color: 0xff69b4});
    let sphere = new THREE.Mesh(geo, mat);
    sphere.position.x = xVal;
    sphere.position.y = yVal;
    sphere.position.z = zVal;

    this.scene.add(sphere);

    // let keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(0, 100%, 100%)'), 1);
    let keyLight = new THREE.PointLight(new THREE.Color('hsl(0, 100%, 100%)'), 1.4);
    keyLight.position.set(0, 0, -140);
    // keyLight.target.position.set = (0,-10,0);
    
    let fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(285, 100%, 100%)'), 1);
    fillLight.position.set(xVal, yVal, zVal).normalize();
    fillLight.target.position.set(0,-20,0);
    
    let backLight = new THREE.DirectionalLight(new THREE.Color('hsl(58, 100%, 100%)'), 1);
    backLight.position.set(0,0,50);
    
    let topLight = new THREE.DirectionalLight(new THREE.Color('hsl(338, 100%, 100%)'), 1);
    topLight.position.set(0, 10, 0).normalize();

    this.scene.add(fillLight);
    // this.scene.add(keyLight);
    // this.scene.add(backLight);
    // this.scene.add(topLight);
  }

  initColumn(){
    this.microscope = new Column(this.columnHeight, this.scene);
    this.createLenses();
  }

  render(){ 
    // console.trace();
    this.renderer.render(this.scene, this.camera);
  }

  drawScene(){
    this.microscope.init();
    this.render();
  }

  animate(){
    requestAnimationFrame(this.animate);
    this.controls.update();
  }

  createLenses(){
    this.microscope.addSimpleLens(1.2, 8);
    // userColumn.addSimpleLens(2, 5);
    this.microscope.addAngledLens(2, 5, -2, -1);

    this.microscope.drawLenses(); 
  }


  updateFocalLength(lensNum, focalLen){
    this.microscope.updateFocalLength(lensNum, focalLen);
    this.render();
  }

  updateLeftBoundry(lensNum, leftBound){
    this.microscope.updateLeftBoundry(lensNum, leftBound);
    this.render();
  }

  updateRightBoundry(lensNum, rightBound){
    this.microscope.updateRightBoundry(lensNum, rightBound);
    this.render();
  }
}
