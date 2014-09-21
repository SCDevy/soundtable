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

  var cameraPositionAnim = {
    x: 0,
    y: -242.69,
    z: -230
  };

  camera.position.x =  0;
  camera.position.y = -242.69;
  camera.position.z = 0;
  camera.lookAt(new THREE.Vector3(0,0,0));
  //var controls = new THREE.OrbitControls( camera );
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
  'assets/bitmaps/hextiles.png',
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
    opacity: 0.5
  })
);

var theFUCKINGBackground = new THREE.Mesh(
  new THREE.CylinderGeometry(250, 250, 500, 32),
  new THREE.MeshBasicMaterial({
    map: THREE.ImageUtils.loadTexture('assets/bitmaps/stars.png')
  })
);
theFUCKINGBackground.scale.y = -1;
theFUCKINGBackground.rotation.x = -Math.PI / 2;

scene.add(theFUCKINGBackground);


var started = false;
var pusherChannel = null;
function connectPusher() {
  var pusher = new Pusher('9f2cde4bf9c16af5d034', {authEndpoint: 'pusher/auth.php'});
  var channel = pusher.subscribe('presence-SoundTable');

  // SEND
  channel.bind('pusher:subscription_succeeded', function() {
    channel.bind('pusher:member_added', function() {alertLog('Someone has joined');});
    channel.bind('pusher:member_removed', function() {alertLog('Someone has left');});
    channel.bind('client-sendWave', function(data) {
      createWave(data.which, data.x, data.y);
    });
  });
  pusherChannel = channel;
}

function sendWave(which, x, y) {
  pusherChannel.trigger("client-sendWave", {which: which, x: x, y: y});
}

function alertLog(msg) {
  alertify.log(msg);
  console.log(msg);
}

function fadeIntro(element) {
    var op = 0.6;  // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            element.style.display = 'none';
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
    }, 50);
}

function startAnimation() {
  var period = 100 * 1000;
  var rotateBg = new TWEEN.Tween({y: 0})
    .to({y: 2 * Math.PI}, period)
    .repeat(Infinity)
    .onUpdate(function() {
      theFUCKINGBackground.rotation.y = this.y;
    });
  rotateBg.start();

  var moveInBoard = new TWEEN.Tween({y: -230})
    .to({y: 0}, 1500)
    .easing(TWEEN.Easing.Exponential.In)
    .onUpdate(function() {
      plane.position.y = this.y;
    })
    .onComplete(function() {
      plane.position.y = 0;
    })
    .start();
  var origin = new THREE.Vector3(0,0,0);
  var positionCamera = new TWEEN.Tween({z: 0})
    .to({z: cameraPositionAnim.z}, 1500)
    .easing(TWEEN.Easing.Cubic.InOut)
    .onUpdate(function() {
      camera.position.z = this.z;
      camera.lookAt(origin);
    })
    .onComplete(function() {
      camera.position.z = cameraPositionAnim.z;
    })
    .start()
}

function start() {
  if (started) {
    return
  }
  started = true;

  document.getElementById("notification").innerHTML = "You are connecting to <img src='assets/bitmaps/logo.png' alt='SoundTable' class='n-logo'>";

  connectPusher();

  setTimeout(function() {
    fadeIntro(document.getElementById("intro"));
    startAnimation();
    playChord([2,4,5]);
  }, 2000 );
}

plane.material.color.setHex(0xFFFFF);
plane.position.y = -10000;
scene.add(plane);

function resizeThree() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
}

window.addEventListener('resize', resizeThree);

var pointCloudGeom = new THREE.Geometry();
var NUM_PARTICLES =  1500;
for (var i = 0; i < NUM_PARTICLES; i++) {
  var vertex = new THREE.Vector3();
  vertex.x = (Math.random() - 0.5) * 50;
  vertex.y = (Math.random() - 0.5) * 250;
  vertex.z = -(Math.random()) * 100;
  pointCloudGeom.vertices.push(vertex);
}

var pointCloud = new THREE.PointCloud(
  pointCloudGeom,
  new THREE.PointCloudMaterial( { size: 2 } )
);
var pointCloudOffScreenPos = {
  x: -400,
  y: 0,
  z: 0,
};
pointCloud.position.x = pointCloudOffScreenPos.x;
pointCloud.position.y = pointCloudOffScreenPos.y;
pointCloud.position.z = pointCloudOffScreenPos.z;
scene.add(pointCloud);

var pointCloudStart = {
  x: -300,
  y: 50,
  z: 0,
};

var pointCloudEnd = {
  x: 300,
  y: 50,
  z: 0,
}

var pointCloudRunning = false;
function runPointClouds() {
  if (pointCloudRunning || !started) {
    return;
  }
  pointCloudRunning = true;
  console.log(pointCloudStart);
  var movePointCloud = new TWEEN.Tween({x: pointCloudStart.x})
    .to({x: pointCloudEnd.x}, 2000)
    .easing(TWEEN.Easing.Cubic.InOut)
    .onUpdate(function() {
      pointCloud.position.x = this.x;
      // manipulate the points
      for (var i = 0; i < pointCloud.geometry.vertices.length; i++) {
        var vertex = pointCloud.geometry.vertices[i];
        if (Math.random() < 0.1) {
          continue;
        }
        vertex.x = Math.max(-50, Math.min(50, vertex.x + Math.random() - 0.5));
        vertex.y = Math.max(-50, Math.min(250, vertex.y + Math.random() - 0.5));
        vertex.z = Math.max(-100, Math.min(0, vertex.z + Math.random() - 0.5));
      }
      pointCloud.geometry.verticesNeedUpdate = true;
    })
    .onComplete(function() {
      pointCloudRunning = false;
      pointCloud.position.x = pointCloudOffScreenPos.x;
      pointCloud.position.y = pointCloudOffScreenPos.y;
      pointCloud.position.z = pointCloudOffScreenPos.z;
    });
  movePointCloud.start();
  playChord([6, 8, 9]);
}
