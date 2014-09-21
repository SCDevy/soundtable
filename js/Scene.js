  function render(time){
    // update
    // render
    TWEEN.update();
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
  camera.position.y = -242.69;
  camera.position.z = -230;
  camera.lookAt(new THREE.Vector3(0,0,0));
  var controls = new THREE.OrbitControls( camera );
  //controls.damping = 0.2;

  // scene
  var scene = new THREE.Scene();
  var ambient = new THREE.AmbientLight( 0x777777);
  ambient.intensity = 0.2;
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

/*
drawParticle(0, 0, 0, 0xFFFFFF);
drawParticle(10, 0, 0, 0xFF0000);
drawParticle(0, 10, 0, 0x00FF00);
drawParticle(0, 0, 10, 0x0000FF);
*/

function lightOnClick(x, y, color) {
  return placeLight(x, y, -10, color);
}

function placeLight(x, y, z, color) {
  console.log('place light', x, y, z, color, ' woo!');
  var pointLight = new THREE.PointLight(color, 1.0, 80000);
  pointLight.position.set(x, y, z);
  scene.add(pointLight);
  plane.material.needsUpdate = true;
  var duration = 3250 + (Math.random() - 0.5) * 500;
  var endIntensity = 2.0 + Math.random() * 2;
  var tweenUp = new TWEEN.Tween({intensity: 1.0})
    .to({intensity: endIntensity}, duration)
    .easing(TWEEN.Easing.Exponential.InOut)
    .onUpdate(function() {
      pointLight.intensity = this.intensity;
    });
  var tweenOut = new TWEEN.Tween({intensity: endIntensity})
    .to({intensity: 0.0}, 1000)
    .easing(TWEEN.Easing.Exponential.Out)
    .onUpdate(function(){
      pointLight.intensity = this.intensity;
    })
    .onComplete(function() {
      scene.remove(pointLight);
    });
  tweenUp.chain(tweenOut);
  tweenUp.start();
  return pointLight;
}


var texture = THREE.ImageUtils.loadTexture(
  '/assets/bitmaps/hextiles.png',
  null, function() {
  console.log('Success')
}, function(err) {console.log(err);});
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.x = 3;
texture.repeat.y = 3;
var plane = new THREE.Mesh(
  new THREE.PlaneGeometry(300, 300), // DO NOT FUCKING CHANGE 300 x 300
  new THREE.MeshPhongMaterial({
    side: THREE.DoubleSide,
    map: texture,
    transparent: true,
    opacity: 0.3
  })
);

var theFUCKINGBackground = new THREE.Mesh(
  new THREE.CylinderGeometry(250, 250, 500, 32),
  new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('/assets/bitmaps/stars.png')
  })
);
theFUCKINGBackground.scale.y = -1;
theFUCKINGBackground.rotation.x = -Math.PI / 2;
scene.add(theFUCKINGBackground);
var period = 100 * 1000;
var rotateBg = new TWEEN.Tween({y: 0})
  .to({y: 2 * Math.PI}, period)
  .repeat(Infinity)
  .onUpdate(function() {
    theFUCKINGBackground.rotation.y = this.y;
  });
rotateBg.start();

plane.material.color.setHex(0xFFFFF);
scene.add(plane);
