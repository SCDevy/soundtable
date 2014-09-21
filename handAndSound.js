/********************************************************
	* This is the actual example part where we call grabStrength
	*****************************************************/
	var output = document.getElementById('output'),
		progress = document.getElementById('progress');

	var prev = null;

var sound2color = {
	0: 0x0C37FF,
	1: 0x009CFF,
	2: 0x03FFEF,
	3: 0x8C0BFF,
	4: 0xE80DCA,
	5: 0xFF078B,
	6: 0x0BC4E8,
	7: 0xE301FF,
}

function createWave(which, x, y) {
	playSound(which);
	lightOnClick(x, y, sound2color[which]);
}

function leapPointToWorld(leapPoint, frame)
{
    var normalized = frame.interactionBox.normalizePoint(leapPoint, false);
    //recenter origin
    var normX = Math.max(Math.min(1, normalized[0]), 0) - 0.5;
    var normY = Math.max(Math.min(1, normalized[1]), 0);
    var normZ = Math.max(Math.min(1, normalized[2]), 0) - 0.5;
    //scale
    var scale = 300;
    var scaleX = scale;
    var scaleY = scale;
    var scaleZ = 100;
    var worldX = scaleX * -normX; // our x is opposite their x
    var worldY = scaleY * -normZ;
    var worldZ = scaleZ * -normY;
    return new THREE.Vector3(worldX, worldY, worldZ);
}

	// Set up the controller:
	Leap.loop({enableGestures: true}, function(frame) {
		if(frame.valid) {
			if(frame.hands.length) {
			  	hand = frame.hands[0];
			  	//output.innerHTML = hand.grabStrength.toPrecision(2);
		  		//progress.style.width = hand.grabStrength * 100 + '%';
			}
		}

		if(frame.valid && frame.gestures.length > 0){
		    frame.gestures.forEach(function(gesture){
	        switch (gesture.type){
	          case "circle":
	              console.log("Circle Gesture");
	                playSound(1);
	              break;
	          case "keyTap":
	              console.log("Key Tap Gesture");
	              console.log(gesture.state);
	              	/*
	              	drawParticle(
		              	-gesture.position[0],
		              	-gesture.position[2],
		              	0,
		              	0x0F0FFF
	              	);
	              	*/
              	// document.title=Math.floor(gesture.position[0])+" and "+Math.floor(gesture.position[2]);
              	var pt = leapPointToWorld(gesture.position, frame);

	              console.log(gesture);
	              if (pt.x > 75 && pt.y > 0) { // top-left
	              	createWave(0, pt.x, pt.y);
	              	sendWave(0, pt.x, pt.y);
	              } else if (pt.x > 75 && pt.y < 0){ // bottom-left
	              	createWave(1, pt.x, pt.y);
	              	sendWave(1, pt.x, pt.y);
								} else if (pt.x < 75 && pt.x > 0 && pt.y > 0){ // top-center-left
	              	createWave(2, pt.x, pt.y);
	              	sendWave(2, pt.x, pt.y);
								} else if (pt.x < 75 && pt.x > 0 && pt.y < 0){ // bottom-center-left
	              	createWave(3, pt.x, pt.y);
	              	sendWave(3, pt.x, pt.y);
	              } else if (pt.x < -75 && pt.y > 0) { // top-center-right
	              	createWave(4, pt.x, pt.y);
	              	sendWave(4, pt.x, pt.y);
	              } else if (pt.x < -75 && pt.y < 0) { // bottom-center-right
	              	createWave(5, pt.x, pt.y);
	              	sendWave(5, pt.x, pt.y);
								} else if (pt.x > -75 && pt.x < 0 && pt.y > 0) { // top-right
	              	createWave(6, pt.x, pt.y);
	              	sendWave(6, pt.x, pt.y);
								} else if (pt.x > -75 && pt.x < 0 && pt.y < 0) { // bottom-right
	              	createWave(7, pt.x, pt.y);
	              	sendWave(7, pt.x, pt.y);
								}

	              break;
	          case "screenTap":
	              console.log("Screen Tap Gesture");
	              playSound(2);
	              break;
	          case "swipe":
	              console.log("Swipe Gesture");
	              break;
	        }
	    });
	  }
  });


	/*********************************************************
	* End of the actual example
	****************************************************/


	/*********************************************************
	* The rest of the code is here for visualizing the example. Feel
	* free to remove it to experiment with the API value only
	****************************************************/

	// Adds the rigged hand and playback plugins
	// to a given controller, providing a cool demo.
	visualizeHand = function(controller){
	  // The leap-plugin file included above gives us a number of plugins out of the box
	  // To use a plugins, we call `.use` on the controller with options for the plugin.
	  // See js.leapmotion.com/plugins for more info
	  controller.use('playback', {
		  // This is a compressed JSON file of preprecorded frame data
      //recording: 'grab-bones-7-54fps.json.lz',
		  // How long, in ms, between repeating the recording.
		  timeBetweenLoops: 1000,
		  pauseOnHand: true
	  }).on('riggedHand.meshAdded', function(handMesh, leapHand){
		  handMesh.material.opacity = 1;
	  });

	  var overlay = controller.plugins.playback.player.overlay;
	  overlay.style.right = 0;
	  overlay.style.left = 'auto';
	  overlay.style.top = 'auto';
	  overlay.style.padding = 0;
	  overlay.style.bottom = '13px';
	  overlay.style.width = '180px';


	  controller.use('riggedHand', {
		scale: 1.3,
		boneColors: function (boneMesh, leapHand){
		  if ((boneMesh.name.indexOf('Finger_') == 0) ) {
			return {
			  hue: 0.564,
			  saturation: leapHand.grabStrength,
			  lightness: 0.5
			}
		  }
		}
	  });
	  var camera = controller.plugins.riggedHand.camera;
	  camera.position.set(0,30,25);
	  camera.lookAt(new THREE.Vector3(0,3,0));
	};
	visualizeHand(Leap.loopController);


// 	var controller2 = Leap.loop({enableGestures: true}, function(frame){
//     if(frame.valid && frame.gestures.length > 0){
//     frame.gestures.forEach(function(gesture){
// 		document.title = gesture.type;
//         switch (gesture.type){
//           case "circle":
//               console.log("Circle Gesture");
//               break;
//           case "keyTap":
//               console.log("Key Tap Gesture");
//               console.log(gesture.position);
//               if (gesture.position[0] < 0) {
//                 playSound(0);
//                 document.title = "hello"
//               } else {
//                 playSound(1);
//               }
//               break;
//           case "screenTap":
//               console.log("Screen Tap Gesture");
//               playSound(1);
//               break;
//           case "swipe":
//               console.log("Swipe Gesture");
//               break;
//         }
//     });
//   }
// });
