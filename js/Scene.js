  function render(time){
    // update
    // render
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  // renderer
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColorHex( 0x000000, 1 );
  renderer.shadowMapEnabled = true;
  renderer.shadowMapType    = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);

  // camera
  var camera = new THREE.PerspectiveCamera(
    45, window.innerWidth / window.innerHeight, 1, 10000);

  camera.position.x =  0.09394262990915547;  
  camera.position.y = -167.41834401363872;
  camera.position.z = -31.82114369287516;
  controls = new THREE.OrbitControls( camera );
  controls.damping = 0.2;
  //controls.addEventListener( 'change', render );

  // scene
  var scene = new THREE.Scene();

  var ambient = new THREE.AmbientLight( 0x222222 );
  scene.add( ambient );

  var spotLight = new THREE.SpotLight( 0xFFFFFF );
  spotLight.target.position.set( 0, 0, 0 );
  spotLight.shadowCameraNear  = 0.01;   
  spotLight.castShadow    = true;
  spotLight.shadowDarkness  = 0.5;
  //spotLight.shadowCameraVisible = true;// shows where light is
  spotLight.position.x = camera.position.x + 10;
  spotLight.position.y = camera.position.y + 10;
  spotLight.position.z = camera.position.z + 10;

  scene.add( spotLight ); 

            
  var geometry = new THREE.PlaneGeometry(10000, 10000, 20 );
  var texture = THREE.ImageUtils.loadTexture('/assets/bitmaps/tile.png', null, function() {
    console.log('Success')
  }, function(err) {console.log(err);});
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.x = 1000;
  texture.repeat.y = 1000;

  var material = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide
  });
  var plane = new THREE.Mesh( geometry, material );
  scene.add( plane );
  // start animation
  render(new Date().getTime());
