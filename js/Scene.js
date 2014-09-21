  function render(time){
    // update
    // render
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  // renderer
  var renderer = new THREE.WebGLRenderer({alpha: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xFFFFFF, true);
  document.body.appendChild(renderer.domElement);

  // camera
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);

  camera.position.x =  0;
  camera.position.y = -150;
  camera.position.z = -100;
  camera.lookAt(new THREE.Vector3(0,0,0));
  var controls = new THREE.OrbitControls( camera );
  //controls.damping = 0.2;

  // scene
  var scene = new THREE.Scene();
  var ambient = new THREE.AmbientLight( 0x333333 );
  scene.add( ambient );
  
  render(new Date().getTime());


  // start animation

function drawParticle(x, y, z, color) {
  var sphere = new THREE.Mesh(
    new THREE.BoxGeometry(5, 5, 11),
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

function lightOnClick(x, y, color) {
  return placeLight(x, y, -10, color);
}

function placeLight(x, y, z, color) {
  console.log('place light', x, y, z, color, ' woo!');
  var pointLight = new THREE.PointLight(color, 1.0, 300);
  pointLight.position.set(x, y, z);
  scene.add(pointLight);
  scene.add(new THREE.PointLightHelper(pointLight, 1));
  plane.material.needsUpdate = true;
  return pointLight;
}


  var texture = THREE.ImageUtils.loadTexture(
    //'/assets/bitmaps/tile_transparent_red.png',
    '/assets/bitmaps/tile.png',
    null, function() {
    console.log('Success')
  }, function(err) {console.log(err);});
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.x = 40;
  texture.repeat.y = 40;
var plane = new THREE.Mesh(
  new THREE.PlaneGeometry(300, 300),
  new THREE.MeshPhongMaterial({side: THREE.DoubleSide, map: texture})
);

plane.material.color.setHex(0xFFFFF);
scene.add(plane);