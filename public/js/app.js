'use strict';
class MicroscopeColumn {
  constructor(divId){
    if (document.getElementById(divId) === null){
      throw new Error('ERROR: Couldn\'t find the provided div ' + divId);
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

      this.sceneHeight = this.window.height() - 35;

      this.delta = -0.1;

      this.init();
      this.animate();
      this.drawScene();
    }
  }

  init(){
    this.initTitle();
    
    this.renderer = new THREE.WebGLRenderer({alpha: true, antialias: false});
    this.renderer.setSize(this.window.width(), this.sceneHeight);
    this.renderer.domElement.id = 'threeCanvas';

    this.window.append(this.renderer.domElement);

    this.controls = new THREE.TrackballControls(this.camera, document.getElementById('threeCanvas'));

    this.camera.position.z = 80;
    this.camera.position.y = 0;
    this.camera.position.x = 40;

    this.controls.target = new THREE.Vector3(0, this.columnHeight / 4, 0);
    this.initLights();
    this.initColumn();
    this.initBackground();
    this.controls.addEventListener('change', this.render);
    // this.initPositionChecker();
  }

  initTitle(){
    this.titleSpace = $('<div>w</div>');
    this.titleSpace.css('background', '#00cbcc');
    this.titleSpace.css('color', '#00cbcc');
    this.titleSpace.css('font-size', '0.5em');
    this.title = $('<div>Overall Column</div>');
    this.title.css('padding-top', '0.25em');
    this.title.css('padding-left', '1em');
    this.title.css('padding-bottom', '0.25em');

    this.title.css('background', '#18ffff');
    this.title.css('font-family', 'Roboto,Noto,sans-serif');
    this.title.css('box-shadow', '30px, 30px, 3px, white');
    this.window.append(this.titleSpace);
    this.window.append(this.title);
  }

  initLights(){
    let xVal = -5;
    let yVal = -20;
    let zVal = 10;

    // let keyLight = new THREE.DirectionalLight(new THREE.Color('hsl(0, 100%, 100%)'), 1);
    this.keyLight = new THREE.SpotLight(new THREE.Color('hsl(0, 100%, 100%)'), 5, 20);
    this.keyLight.position.set(0, -0.1, 10);
    this.keyLight.target.position.set = (0,-10,0);
    this.keyLight.angle = 0.2;
    this.keyLight.penumbra = 1;
    this.keyLight.decay = 2;


    this.pointLight = new THREE.PointLight('#ffd7b8', 0.5);

    this.pointLight.position.y = -10;
    this.pointLight.position.z = 10;

    let fillLight = new THREE.DirectionalLight(new THREE.Color('hsl(285, 100%, 100%)'), 1);
    fillLight.position.set(xVal, yVal, zVal).normalize();
    fillLight.target.position.set(0,0,0);
    
    let backLight = new THREE.DirectionalLight(new THREE.Color('hsl(58, 100%, 100%)'), 1);
    backLight.position.set(0,0,50);
    
    let topLight = new THREE.DirectionalLight(new THREE.Color('hsl(338, 100%, 100%)'), 1);
    topLight.position.set(0, 10, 0).normalize();


    let keyHelper = new THREE.SpotLightHelper(this.keyLight);
    let pointHelper = new THREE.PointLightHelper(this.pointLight);

    // this.scene.add(keyHelper);
    // this.scene.add(pointHelper);
    this.scene.add(this.keyLight);
    this.scene.add(this.keyLight.target);
    this.scene.add(this.pointLight);
  }


  initPositionChecker(){
    let sphereGeo = new THREE.SphereGeometry(.01, 10, 10);
    let sphereMat = new THREE.MeshBasicMaterial({color: 0xff0000});

    this.sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    this.sphereMesh.position.y = -0.6;
    this.sphereMesh.position.z = 6;
    this.scene.add(this.  sphereMesh);
  }

  initBackground(){
    let manager = new THREE.LoadingManager();
    let loader = new THREE.TextureLoader(manager);

    let backgroundTexture;

    loader.load('./public/img/columnbackground.png', function(texture){
      backgroundTexture = texture;
    });

    manager.onLoad = function(){
      this.scene.background = backgroundTexture;

      this.render();
    };
    manager.onLoad = manager.onLoad.bind(this);
  }

  initColumn(){
    this.microscope = new Column(this.columnHeight, this.scene);
    this.createLenses();
  }

  render(){ 
    this.renderer.render(this.scene, this.camera);
  }

  drawScene(){
    this.microscope.init();
    this.render();
  }

  animate(){
    requestAnimationFrame(this.animate);
    this.controls.update();

    this.moveLight();
  }

  moveLight(){ 
    if (this.keyLight.position.y < -28){
      this.keyLight.position.y = 4;
      // this.delta = 0.1;
    } else if (this.keyLight.position.y > 1){
      this.delta = -0.1;
    }

    // console.log(this.keyLight.position.y);
    this.scene.remove(this.keyLight);
    this.scene.remove(this.keyLight.target);
    let x = this.keyLight.position.x;
    let y = this.keyLight.position.y = this.keyLight.position.y + this.delta;
    let z = this.keyLight.position.z;
    this.keyLight.position.set(x, y, z);
    this.keyLight.target.position.y = y - 2 ;
    this.scene.add(this.keyLight);
    this.scene.add(this.keyLight.target);

    // this.sphereMesh.position.y = y;
    this.render();
  }

  createLenses(){
    //TODO pull this out to public API and create public access ot this section
    // this.microscope.addSimpleLens(2, 5, 'Second Lens');
    // this.microscope.addSimpleLens(2, 5, 'Third Lens');
    this.microscope.addGun('Electron Gun');
    this.microscope.addExtractorBeam('Electron Extractor');
    this.microscope.addLabel(1, 1, 0.2);
    this.microscope.addLabel(1, 1, 0.4);
    this.microscope.addSimpleLens(1.2, 4, 'Condensor Lens 1');
    this.microscope.addLabel(2, 2, 0.15);
    this.microscope.addLabel(2, 2, 0.3);
    this.microscope.addSimpleLens(1.2, 2, 'Condensor Lens 2');
    this.microscope.addLabel(3, 2, 0.9);
    this.microscope.addSimpleLens(0.5, 2, 'Minicondensor Lens');
    this.microscope.addLabel(4, 2, 0.1);
    this.microscope.addLabel(4, 2, 0.3);
    this.microscope.addCylinderLens(1, 1, 'EDX Detector', 1);
    this.microscope.addScreen('Specimen');
    this.microscope.addLowerObjectiveLens(2, 3, 'Lower Objective Lens');
    this.microscope.addOverhangLens(1, 3, 0.75, 'Diffraction Lens');
    this.microscope.addLabel(8, 2, 0.1);
    this.microscope.addLabel(8, 2, 0.2);
    this.microscope.addLabel(8, 2, 0.3);
    this.microscope.addLabel(8, 2, 0.4);
    this.microscope.addAngledLens(1, 1, -2, -1, 'Fifth Lens');
    this.microscope.addAngledLens(1, 1, -2, -1, 'Fifth Lens');
    this.microscope.addAngledLens(1, 1, -2, -1, 'Fifth Lens');

    this.microscope.draw(); 
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

  updateBotRadius(lensNum, newRadPercent){
    this.microscope.updateBotRadius(lensNum, newRadPercent)
    this.render();
  }

  focusColumn(lensNum){
    let newTitle;
    if (lensNum == -1){
      this.camera.position.z = 80;
      this.camera.position.y = 0;
      this.camera.position.x = 40;
      this.controls.target = new THREE.Vector3(0, this.columnHeight / 4, 0);
      newTitle = 'Overall Column';

    } else {
      let newCameraY = - this.microscope.focusColumn(lensNum);
      newTitle = this.microscope.getTitle(lensNum);
      this.camera.position.z = 40;
      this.camera.position.x = 40;
      this.camera.position.y = newCameraY;

      this.controls.target.y = newCameraY;
      this.controls.target.x = 0;
    }
    this.title.text(newTitle);
    this.render();
  }

}