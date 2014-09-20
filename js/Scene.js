(function() {
  function render(time){
    // update
    // render
    renderer.render(scene, camera);
    console.log('Camera position', camera.position);
    // request new frame
    //requestAnimationFrame(render);
  }

  // renderer
  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor('0xff0000');
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // camera
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);

  camera.position.x = -2.2255566278918946;
  camera.position.y = -486.6494503521805;
  camera.position.z = 114.74911489629282;
  controls = new THREE.OrbitControls( camera );
  controls.damping = 0.2;
  controls.addEventListener( 'change', render );

  // scene
  var scene = new THREE.Scene();

  var geometry = new THREE.PlaneGeometry(10000, 10000, 20 );
  var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
  var plane = new THREE.Mesh( geometry, material );
  scene.add( plane );
  // start animation
  render(new Date().getTime());
})();
