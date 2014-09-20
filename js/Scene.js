  function render(time){
    // update
    // render
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  // renderer
  var renderer = new THREE.WebGLRenderer({alpha: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x111111, true);
  renderer.shadowMapEnabled = false;
  //renderer.shadowMapType    = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);

  // camera
  var camera = new THREE.PerspectiveCamera(
    45, window.innerWidth / window.innerHeight, 1, 10000);

  camera.position.x =  0;
  camera.position.y = -170;
  camera.position.z = -190;
  controls = new THREE.OrbitControls( camera );
  controls.damping = 0.2;

  // scene
  var scene = new THREE.Scene();
  var ambient = new THREE.AmbientLight( 0xFFFFFF );
  ambient.intensity = 0.1;
  scene.add( ambient );

  var mainLight = new THREE.PointLight(0x00FF00);
  mainLight.position.set(camera.position.x + 10,
    camera.position.y + 10, camera.position.z + 10);
  scene.add(mainLight);

  var geometry = new THREE.PlaneGeometry(10000, 10000, 20 );
  var texture = THREE.ImageUtils.loadTexture(
    //'/assets/bitmaps/tile_transparent_red.png',
    '/assets/bitmaps/tile.png',
    null, function() {
    console.log('Success')
  }, function(err) {console.log(err);});
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.x = 256;
  texture.repeat.y = 256;

  var material = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 1.0,
  });
  /*
  material.transparent = true;
  material.blending = THREE.MultiplyBlending;
  material.blendSrc = THREE.OneMinusSrcAlphaFactor;
  material.blendDst = THREE.SrcColorFactor;
  material.blendEquation = THREE.AddEquation;
  */

  var plane = new THREE.Mesh( geometry, material );
  scene.add( plane );
  // start animation
  render(new Date().getTime());

function drawParticle(x, y, z, color) {
  console.log('color', color);
  var sphere = new THREE.Mesh(
    new THREE.SphereGeometry(2, 20, 20),
    new THREE.MeshBasicMaterial()
  );
  sphere.material.color.setHex(color);
  sphere.position.x = x;
  sphere.position.y = y;
  sphere.position.z = z;
  scene.add(sphere);
}

drawParticle(0, 0, 0, 0xFFFFFF);
drawParticle(10, 0, 0, 0xFF0000);
drawParticle(0, 10, 0, 0x00FF00);
drawParticle(0, 0, 10, 0x0000FF);

function spotlightUnder(x, y, color) {
  var underlight = new THREE.SpotLight(
    color || 0x00FF11,
    1.0, // intensity
    0
    //Math.PI/2
  );
  underlight.target.position.set( x, y, 0 );
  underlight.position.set(x, y, -10);
  scene.add(underlight);
  return underlight;
}