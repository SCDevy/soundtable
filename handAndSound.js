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
	8: 0x03FFEF, // THIS IS MADE UP
	9: 0x0C37FF, // <-- THIS IS MADE UP
};

var soundsRange = [];
for (var i = 0; i < sounds.length; i++) {
	soundsRange.push(i);
}

var samplingDists = {};

for (var i = 0; i < soundsRange.length; i++) {
	samplingDists[i] = getSmoothedTriangleDistrWeights(sounds, i, sounds.length / 3);
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
					for (var i = 0; i < frame.hands.length; i++) {
						hand = frame.hands[i];
						if(hand.grabStrength > 0.9) {
							start();
							break;
						}
					}
			}
		}

		if(!started) {
			return;
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
              	var pt = leapPointToWorld(gesture.position, frame);
              	var soundId = 0;
	              if (pt.x > 75 && pt.y > 0) { // top-left
									soundId = 0;
	              } else if (pt.x > 75 && pt.y < 0){ // bottom-left
									soundId = 1;
								} else if (pt.x < 75 && pt.x > 0 && pt.y > 0){ // top-center-left
									soundId = 2;
								} else if (pt.x < 75 && pt.x > 0 && pt.y < 0){ // bottom-center-left
									soundId = 3;
	              } else if (pt.x < -75 && pt.y > 0) { // top-center-right
									soundId = 4;
	              } else if (pt.x < -75 && pt.y < 0) { // bottom-center-right
									soundId = 5;
								} else if (pt.x > -75 && pt.x < 0 && pt.y > 0) { // top-right
									soundId = 6;
								} else if (pt.x > -75 && pt.x < 0 && pt.y < 0) { // bottom-right
									soundId = 7;
								}
								soundId = sampleFrom(soundsRange, samplingDists[soundId]);
								createWave(soundId, pt.x, pt.y);
								sendWave(soundId, pt.x, pt.y);

	              break;
	          case "screenTap":
	              console.log("Screen Tap Gesture");
	              break;
	          case "swipe":
	          		var swipeDir = gesture.direction;
	          		var renderSpaceSwipeDir = leapPointToWorld(swipeDir, frame);
	          		var moveLeft = renderSpaceSwipeDir.x > 0;
	              runPointClouds(moveLeft);
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