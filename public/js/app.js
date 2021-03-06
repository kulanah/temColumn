'use strict';

import { Column } from './Column.js';
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


      this.open = true;
      this.delta = -0.2;

      this.init();
      this.animate();
      this.drawScene();

      this.toggleValve();
    }
  }

  init(){
    this.initTitle();
    
    this.renderer = new THREE.WebGLRenderer({alpha: true, antialias: false});
    this.renderer.setSize(this.window.width(), this.sceneHeight);
    this.renderer.domElement.id = 'threeCanvas';

    this.window.append(this.renderer.domElement);

    this.controls = new THREE.TrackballControls(this.camera, document.getElementById('threeCanvas'));

    this.camera.position.z = 130;
    this.camera.position.y = -15;
    this.camera.position.x = 0;

    this.controls.target = new THREE.Vector3(0, -15, 0);
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
    this.keyLight = new THREE.SpotLight(new THREE.Color(0,100,0), 5, 20);
    this.keyLight.position.set(0, -0.1, 18);
    this.keyLight.target.position.set = (0,-10,0);
    this.keyLight.angle = 0.2;
    this.keyLight.penumbra = 1;
    this.keyLight.decay = 2;
    this.keyLight.scale.x = 4;
    this.keyLight.scale.z = 5;


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


    // let keyHelper = new THREE.SpotLightHelper(this.keyLight);
    // let pointHelper = new THREE.PointLightHelper(this.pointLight);

    // this.scene.add(keyHelper);
    // this.scene.add(pointHelper);
    this.scene.add(this.keyLight);
    this.scene.add(this.keyLight.target);
    this.scene.add(this.pointLight);
  }


  initPositionChecker(){
    let sphereGeo = new THREE.SphereGeometry(0.1, 10, 10);
    let sphereMat = new THREE.MeshBasicMaterial({color: 0xff0000});

    this.sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    this.sphereMesh.position.y = -6.45;
    this.sphereMesh.position.z = 0;
    this.sphereMesh.position.x = 1.25;
    this.scene.add(this.sphereMesh);
  }

  initBackground(){
    let manager = new THREE.LoadingManager();
    let loader = new THREE.TextureLoader(manager);

    let backgroundTexture;

    if (!this.open){
      loader.load('./public/img/columnbackgroundclosed.png', function(texture){
        backgroundTexture = texture;
      });
    } else {
      loader.load('./public/img/columnbackgroundopen.png', function(texture){
        backgroundTexture = texture;
      });
    }

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
    if (this.keyLight.position.y < -35){
      this.keyLight.position.y = 4;
    } 

    this.scene.remove(this.keyLight);
    this.scene.remove(this.keyLight.target);
    let x = this.keyLight.position.x;
    let y = this.keyLight.position.y = this.keyLight.position.y + this.delta;
    let z = this.keyLight.position.z;
    this.keyLight.position.set(x, y, z);
    this.keyLight.target.position.y = y - 2 ;
    this.scene.add(this.keyLight);
    this.scene.add(this.keyLight.target);

    this.render();
  }

  createLenses(){
    //TODO pull this out to public API and create public access ot this section
    //0
    this.microscope.addGun('Electron Gun');

    //1
    this.microscope.addExtractorBeam('Electron Extractor');
    
    //1.0
    this.microscope.addLabel(1, 1, 0.2);
    
    //1.1
    this.microscope.addLabel(1, 1, 0.4);
    
    //2
    this.microscope.addSimpleLens(1.2, 4, 'Condensor Lens 1');
    
    //2.0
    this.microscope.addAperture(2, 0.5, 1.0, 'Condensor 1 Aperture');
    
    //2.1
    this.microscope.addLabel(2, 2, 0.15);
    
    //2.2
    this.microscope.addLabel(2, 2, 0.3);
    
    //3
    this.microscope.addSimpleLens(1.2, 2, 'Condensor Lens 2');
    
    //3.0
    this.microscope.addAperture(3, 0.01, 1.0, 'Condesor 2 Aperture');

    //3.1
    this.microscope.addLabel(3, 2, 0.9);

    //4
    this.microscope.addSimpleLens(0.5, 2, 'Minicondensor Lens');

    //4.0
    this.microscope.addLabel(4, 2, 0.1);

    //4.1
    this.microscope.addLabel(4, 2, 0.3);

    //5
    this.microscope.addCylinderLens(1, 1, 'EDX Detector', 1);

    //6
    this.microscope.addSpecimen('Specimen');

    //7
    this.microscope.addLowerObjectiveLens(1, 1, 'Lower Objective Lens');
    
    //8
    this.microscope.addOverhangLens(2, 2, 0.75, 'Diffraction Lens');
    
    //8.0
    this.microscope.addLabel(8, 2, 0.1);
    
    //8.1
    this.microscope.addLabel(8, 2, 0.2);
    
    //8.2
    this.microscope.addLabel(8, 2, 0.3);
    
    //8.3
    this.microscope.addLabel(8, 2, 0.4);
    
    //9
    this.microscope.addAngledLens(0.5, 0.5, -2, -1, 'Fifth Lens');
    
    //10
    this.microscope.addAngledLens(0.5, 0.5, -2, -1, 'Fifth Lens');
    
    //11
    this.microscope.addAngledLens(3, 1, -2, -1, 'Fifth Lens');
    
    //12
    this.microscope.addScreen(2, 'Screen');

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
    this.microscope.updateBotRadius(lensNum, newRadPercent);
    this.render();
  }

  updateAperture(lensNum, newWidthPercent){
    this.microscope.updateAperture(lensNum, newWidthPercent);
    this.render();
  }

  focusColumn(lensNum){
    let newTitle;
    if (lensNum == -1){
      this.camera.position.z = 130;
      this.camera.position.y = -15;
      this.camera.position.x = 0;
      this.controls.target = new THREE.Vector3(0, -15, 0);
      newTitle = 'Overall Column';

    } else {
      let newCameraY = - this.microscope.focusColumn(lensNum);
      newTitle = this.microscope.getTitle(lensNum);
      this.camera.position.z = 40;
      this.camera.position.x = 0;
      this.camera.position.y = newCameraY;

      this.controls.target.y = newCameraY;
      this.controls.target.x = 0;
    }
    this.title.text(newTitle);
    this.render();
  }

  toggleValve(){
    this.open = !this.open;
    this.initBackground();
    this.microscope.toggleValve();
  }
}

export {MicroscopeColumn};