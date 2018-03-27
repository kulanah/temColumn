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

    this.camera.position.z = 200;
    this.camera.position.y = 0;
    this.camera.position.x = 0;

    this.controls.target = new THREE.Vector3(0, this.columnHeight / 2, 0);
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
    this.scene.add(topLight);
  }


  initPositionChecker(){
    let sphereGeo = new THREE.SphereGeometry(0.1, 10, 10);
    let sphereMat = new THREE.MeshBasicMaterial({color: 0xffffff});

    let sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    sphereMesh.position.y = -0.6;
    sphereMesh.position.z = 6;
    this.scene.add(sphereMesh);
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
  }

  createLenses(){
    //TODO pull this out to public API and create public access ot this section
    // this.microscope.addSimpleLens(2, 5, 'Second Lens');
    // this.microscope.addSimpleLens(2, 5, 'Third Lens');
    this.microscope.addGun('Electron Gun');
    this.microscope.addLabel(0, 0.2);
    this.microscope.addLabel(0, 0.4);
    this.microscope.addExtractorBeam('Electron Extractor');
    this.microscope.addSimpleLens(1.2, 4, 'Simple Lens');
    this.microscope.addSimpleLens(1.2, 2, 'Simple Lens');
    this.microscope.addSimpleLens(1.2, 2, 'Simple Lens');
    this.microscope.addSimpleLens(1.2, 2, 'Simple Lens');
    // this.microscope.addAngledLens(2, 3, -2, -1, 'Fifth Lens');
    // this.microscope.addSimpleLens(1.2, 3, 'Simple Lens');
    // this.microscope.addAngledLens(2, 3, -2, -1, 'Fifth Lens');

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

  focusColumn(lensNum){
    let newCameraY = - this.microscope.focusColumn(lensNum);
    let newTitle = this.microscope.getTitle(lensNum);
    this.camera.position.z = 50;
    this.camera.position.x = 0;
    this.camera.position.y = newCameraY;

    this.controls.target.y = newCameraY;
    this.controls.target.x = 0;
    this.title.text(newTitle);
    this.render();
  }

}