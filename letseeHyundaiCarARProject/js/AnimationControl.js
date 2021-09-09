
let currentMesh;

let mixer,
    TrunkOpeningMixer,
    TrunkClosingMixer,
    RadarWavesMixer,
    OuterCirculMixer,
    InnerCirculMixer,
    SignalLightsMixer,
    TailgateLightBarMixer,
    InteriorViewLightMixer,
    TrunkIdleMixer,
    OuterInnerCirculMixer;
   
let fadeInNum, fadeOutNum;

/*******************************************************************************
 ****************************** Models Animation *******************************
 ******************************************************************************/

/**
 * Fade in the number of filter.
 */
function fadeInFilterNumber() {
  fadeInNum = requestAnimationFrame(fadeInFilterNumber);

  if (btnFilterNumberOne.material.opacity < 1 ) btnFilterNumberOne.material.opacity += 0.05;
  Promise.delay(() => {
    if (btnFilterNumberTwo.material.opacity < 1 ) btnFilterNumberTwo.material.opacity += 0.05;
  }, 200)
  .delay(() => {
    if (btnFilterNumberThree.material.opacity < 1 ) btnFilterNumberThree.material.opacity += 0.05;
  }, 200)
  .delay(() => {
    mesh.add(btnFilterNumberOne, btnFilterNumberTwo, btnFilterNumberThree);
  }, 200)

}

/**
 * Fade out number of filter
 */
function fadeOutFilterNumber() {
  fadeOutNum = requestAnimationFrame(fadeOutFilterNumber);

  if (btnFilterNumberOne.material.opacity > 0 ) btnFilterNumberOne.material.opacity -= 0.05;
  Promise.delay(() => {
    if (btnFilterNumberTwo.material.opacity > 0 ) btnFilterNumberTwo.material.opacity -= 0.05;
  }, 200)
  .delay(() => {
    if (btnFilterNumberThree.material.opacity > 0 ) btnFilterNumberThree.material.opacity -= 0.05;
  }, 200)
  .delay(() => {
    mesh.remove(btnFilterNumberOne, btnFilterNumberTwo, btnFilterNumberThree);
  }, 300)

}

/**
 * Change model angle to view the multiple corner.
 */
function changeModelAngle() {
  console.info(`CHANGE MODEL ANGLE`);

  if (TWEEN) TWEEN.removeAll();

  let startValue = {
    rotationXValue: mesh.rotation.x,
  };
  let endValue = {
    // zoomValue: 5,
    rotationXValue: Math.PI/180 * 25,
  };

  let tween = new TWEEN.Tween(startValue).to(endValue, 800);

  tween.onUpdate(() => {
    mesh.rotation.x = startValue.rotationXValue;
  });
  tween.onComplete(() => {});

  tween.start();
}

/**
 * Reset model angle.
 */
function resetModelAngle() {
  console.info(`RESET MODEL ANGLE`);

  if (TWEEN) TWEEN.removeAll();

  let startValue = {
    rotationXValue: mesh.rotation.x,
  };
  let endValue = {
    rotationXValue: 0,
  };

  let tween = new TWEEN.Tween(startValue).to(endValue, 800);

  tween.onUpdate(() => {
    mesh.rotation.x = startValue.rotationXValue;
  });
  tween.onComplete(() => {});

  tween.start();
}

/**
 * Proceed animation clips
 * @param clipName
 */
function proceedAnimation(clipName, _is3Dview) {

  console.warn(`proceedAnimation`, _is3Dview);

  let clip, action;
  
  switch (clipName) {
    case 'TrunkOpening':
      TrunkOpeningMixer = new THREE.AnimationMixer(mesh);
      clip = mesh.animations[0];
      action = TrunkOpeningMixer.clipAction( clip );
      action.setDuration(1.2);
      action.clampWhenFinished = true;
      action.loop = THREE.LoopOnce;
      action.play();
      isAnimationPlaying = true;

      TrunkOpeningMixer.addEventListener('finished', () => {
        isAnimationPlaying = false;
        if (!_is3Dview) {
          // Add buttons
          mesh.add(btnCloseTrunk);
          mesh.add(btnOpenVideo4_1, btnOpenVideo4_2);
        }
      });
      break;
    case 'TrunkClosing':
      TrunkClosingMixer = new THREE.AnimationMixer(mesh);
      clip = mesh.animations[1];
      action = TrunkClosingMixer.clipAction( clip );
      action.setDuration(1.2);
      action.clampWhenFinished = true;
      action.loop = THREE.LoopOnce;
      action.play();
      isAnimationPlaying = true;

      TrunkClosingMixer.addEventListener('finished', () => {
        isAnimationPlaying = false;
        if (!_is3Dview) {
          // Add buttons
          mesh.add(btnOpenTrunk); 
          activateBtn(3)
          mesh.remove(btnOpenVideo4_1, btnOpenVideo4_2);
        }
      });
      break;
    case 'RadarWaves':
      RadarWavesMixer = new THREE.AnimationMixer(mesh);
      clip = mesh.animations[2];
      action = RadarWavesMixer.clipAction( clip );
      action.setDuration(1.2);
      action.clampWhenFinished = true;
      action.loop = THREE.LoopRepeat;
      action.play();

      isAnimationPlaying = true;
      RadarWavesMixer.addEventListener('finished', () => {
        isAnimationPlaying = false;
        if (!_is3Dview) {
          // Add buttons
          //mesh.add(btnOpenFilter, btnUV, btnFoldingShelf, btnMultiCorner, btnLargeBasket);
        }
      });
      break;
    case 'OuterCircul':
      OuterCirculMixer = new THREE.AnimationMixer(mesh);
      clip = mesh.animations[3];
      action = OuterCirculMixer.clipAction( clip );
      action.setDuration(1.2);
      action.clampWhenFinished = true;
      action.loop = THREE.LoopOnce;
      action.play();

      isAnimationPlaying = true;
      OuterCirculMixer.addEventListener('finished', () => {
        isAnimationPlaying = false;
        if (!_is3Dview) {
          // Add buttons
          //mesh.add(btnOpenFilter, btnUV, btnFoldingShelf, btnMultiCorner, btnLargeBasket);
        }
      });
      break;
    case 'InnerCircul':
      InnerCirculMixer = new THREE.AnimationMixer(mesh);
      clip = mesh.animations[4];
      action = InnerCirculMixer.clipAction( clip );
      action.setDuration(1.2);
      action.clampWhenFinished = true;
      action.loop = THREE.LoopOnce;
      action.play();

      isAnimationPlaying = true;
      InnerCirculMixer.addEventListener('finished', () => {
        isAnimationPlaying = false;
        if (!_is3Dview) {
          // Add buttons
          //mesh.add(btnOpenFilter, btnUV, btnFoldingShelf, btnMultiCorner, btnLargeBasket);
        }
      });
      break;
    case 'SignalLights':
      SignalLightsMixer = new THREE.AnimationMixer(mesh);
      clip = mesh.animations[5];
      action = SignalLightsMixer.clipAction( clip );
      action.setDuration(1.2);
      action.clampWhenFinished = true;
      action.loop = THREE.LoopOnce;
      action.play();

      isAnimationPlaying = true;
      SignalLightsMixer.addEventListener('finished', () => {
        isAnimationPlaying = false;
        if (!_is3Dview) {
          // Add buttons
          mesh.add(btnOpenVideo1_1 , btnOpenVideo1_2, btnOpenVideo1_3, btnOpenVideo1_4, btnOpenVideo2_1, btnOpenVideo2_2, btnOpenVideo2_3,
            btnOpenVideo2_4, btnOpenVideo2_5, btnOpenVideo2_6, btnOpenVideo3_1, btnOpenVideo3_2, btnOpenVideo3_3, btnOpenVideo3_4, btnOpenVideo3_5, btnCloseTrunk);
        }
      });
      break;
    case 'TailgateLightBar':
      TailgateLightBarMixer = new THREE.AnimationMixer(mesh);
      clip = mesh.animations[6];
      action = TailgateLightBarMixer.clipAction( clip );
      action.setDuration(1.2);
      action.clampWhenFinished = true;
      action.loop = THREE.LoopOnce;
      action.play();

      isAnimationPlaying = true;
      TailgateLightBarMixer.addEventListener('finished', () => {
        isAnimationPlaying = false;
        if (!_is3Dview) {
          // Add buttons
          //mesh.add(btnOpenFilter, btnUV, btnFoldingShelf, btnMultiCorner, btnLargeBasket);
        }
      });
      break;
    case 'InteriorViewLight':
      InteriorViewLightMixer = new THREE.AnimationMixer(mesh);
      clip = mesh.animations[7];
      action = InteriorViewLightMixer.clipAction( clip );
      action.setDuration(1.2);
      action.clampWhenFinished = true;
      action.loop = THREE.LoopOnce;
      action.play();

      isAnimationPlaying = true;
      InteriorViewLightMixer.addEventListener('finished', () => {
        isAnimationPlaying = false;
        if (!_is3Dview) {
          // Add buttons
          //mesh.add(btnOpenFilter, btnUV, btnFoldingShelf, btnMultiCorner, btnLargeBasket);
        }
      });
      break;
    case 'TrunkIdle':
      TrunkIdleMixer = new THREE.AnimationMixer(mesh);
      clip = mesh.animations[8];
      action = TrunkIdleMixer.clipAction( clip );
      action.setDuration(1.2);
      action.clampWhenFinished = true;
      action.loop = THREE.LoopOnce;
      action.play();

      isAnimationPlaying = true;
      TrunkIdleMixer.addEventListener('fi`nished', () => {
        isAnimationPlaying = false;
        if (!_is3Dview) {
          // Add buttons
          //mesh.add(btnOpenFilter, btnUV, btnFoldingShelf, btnMultiCorner, btnLargeBasket);
        }
      });
      break;
    case 'OuterInnerCircul':
      OuterInnerCirculMixer = new THREE.AnimationMixer(mesh);
      clip = mesh.animations[9];
      action = OuterInnerCirculMixer.clipAction( clip );
      action.setDuration(1.2);
      action.clampWhenFinished = true;
      action.loop = THREE.LoopOnce;
      action.play();

      isAnimationPlaying = true;
      OuterInnerCirculMixer.addEventListener('finished', () => {
        isAnimationPlaying = false;
        if (!_is3Dview) {
          // Add buttons
          //mesh.add(btnOpenFilter, btnUV, btnFoldingShelf, btnMultiCorner, btnLargeBasket);
        }
      });
      break;
  }

  return true;
}

function TrunkOpeningAnimation() {
  console.warn(`TrunkOpeningAnimation`);
  if (mixer) mixer.stopAllAction();

  if (TWEEN) TWEEN.removeAll();

  resetBtn();
  mesh.remove(btnOpenTrunk);

  proceedAnimation('TrunkOpening');
}

function TrunkClosingAnimation() {
  console.warn(`TrunkClosing`);
  if (mixer) mixer.stopAllAction();

  if (TWEEN) TWEEN.removeAll();

  mesh.remove(btnCloseTrunk);

  proceedAnimation('TrunkClosing');
}

function RadarWavesAnimation() {
  console.warn(`RadarWaves`);
  if (mixer) mixer.stopAllAction();

  if (TWEEN) TWEEN.removeAll();

  proceedAnimation('RadarWaves');
}

function OuterCirculAnimation() {
  console.warn(`OuterCircul`);
  if (mixer) mixer.stopAllAction();

  if (TWEEN) TWEEN.removeAll();

  proceedAnimation('OuterCircul');
}

function InnerCirculAnimationClip() {
  console.warn(`InnerCircul`);
  if (mixer) mixer.stopAllAction();

  if (TWEEN) TWEEN.removeAll();

  proceedAnimation('InnerCircul');
}

function SignalLightsAnimationClip() {
  console.warn(`SignalLights`);
  if (mixer) mixer.stopAllAction();

  if (TWEEN) TWEEN.removeAll();

  resetBtn();

  proceedAnimation('SignalLights');
}

function TailgateLightBarAnimationClip() {
  console.warn(`TailgateLightBar`);
  if (mixer) mixer.stopAllAction();

  if (TWEEN) TWEEN.removeAll();

  proceedAnimation('TailgateLightBar');
}

function InteriorViewLightAnimationClip() {
  console.warn(`InteriorViewLight`);
  if (mixer) mixer.stopAllAction();

  if (TWEEN) TWEEN.removeAll();

  proceedAnimation('InteriorViewLight');
}

function TrunkIdleAnimationClip() {
  console.warn(`TrunkIdle`);
  if (mixer) mixer.stopAllAction();

  if (TWEEN) TWEEN.removeAll();

  proceedAnimation('TrunkIdle');
}

function OuterInnerCirculAnimationClip() {
  console.warn(`OuterInnerCircul`);
  if (mixer) mixer.stopAllAction();

  if (TWEEN) TWEEN.removeAll();

  proceedAnimation('OuterInnerCircul');
}

/*******************************************************************************
 ****************************** TWEEN.js Animation *****************************
 ******************************************************************************/

/**
 * Make model bigger when open video for Ice.
 */
function zoomInCameraForInside(_track) {

  console.info('zoomInCameraForInside');

  if (TWEEN) TWEEN.removeAll();

  let startValue = {
    rotationValueX: mesh.rotation.x,
    rotationValueY: mesh.rotation.y,
    cameraRotationValue: camera.rotation.y,
    objectPositionX: mesh.position.x,
    objectPositionY: mesh.position.y,
    objectZoomValue: mesh.scale.x,
  };

  let endValue = {
    rotationValueX: Math.PI/180 * 20,
    rotationValueY: Math.PI/180 * 0,
    cameraRotationValue: Math.PI / 180 * -20,
    objectPositionX: 0,
    objectPositionY: -7,
    objectZoomValue: 7
  };

  let tween = new TWEEN.Tween(startValue).to(endValue, 1000);

  tween.onUpdate(() => {
    mesh.scale.setScalar(startValue.objectZoomValue);
    mesh.position.x = startValue.objectPositionX;
    mesh.position.y = startValue.objectPositionY;
    mesh.rotation.x = startValue.rotationValueX;
    mesh.rotation.y = startValue.rotationValueY;
    //camera.rotation.y = startValue.rotationValue;
    //camera.updateProjectionMatrix();
  });
  tween.onComplete(() => {
    //내장 버튼 활성화 
  });

  tween.start();
}

function zoomOutCameraForInside() {
  console.info('zoomOutCameraForInside');

  if (TWEEN) TWEEN.removeAll();

  let startValue = {
    rotationValueX: mesh.rotation.x,
    rotationValueY: mesh.rotation.y,
    cameraRotationValue: camera.rotation.y,
    objectPositionX: mesh.position.x,
    objectPositionY: mesh.position.y,
    objectZoomValue: mesh.scale.x,
  };
  let endValue = {
    rotationValueX: Math.PI/180 * 0,
    rotationValueY: Math.PI/180 * 120,
    cameraRotationValue: 0,
    objectPositionX: 0,
    objectPositionY: 0,
    objectZoomValue: 1,
  };
  let tween = new TWEEN.Tween(startValue).to(endValue, 1000);

  tween.onUpdate(function() {
    mesh.scale.setScalar(startValue.objectZoomValue);
    mesh.position.x = startValue.objectPositionX;
    mesh.position.y = startValue.objectPositionY;
    mesh.rotation.x = startValue.rotationValueX;
    mesh.rotation.y = startValue.rotationValueY;
    //camera.rotation.y = startValue.rotationValue;
    camera.updateProjectionMatrix();
  });
  tween.onComplete(() => {

    //내장 버튼 비활성화
  });

  tween.start();
}

/**
 * Rotate and Scale model using Hammer.
 */
function rotateAndScale() {
  console.warn(`ROTATE AND SCALE`);

  // Play click sound
  //clickSound.play().then(() => {});

  // Active Hammer
  let myElement = document.getElementById('container');
  myElement.style.display = 'block';

  let mc = new Hammer(myElement);
  mc.get('pinch').set({enable: true});
  mc.get('pan').set({enable: true, direction: Hammer.DIRECTION_ALL, velocity: 0.000000001, threshold: 0});


  // Scale object, 2 fingers
  mc.on('pinch', (ev) => {
    //console.error(`Scale`);
    //mesh.scale.setScalar(ev.scale * 400);
  });

  // Rotate object left/right, 1 finger
  let lastDeltaX = 0;
  mc.on('panright panleft', function(ev) {
    const { deltaX } = ev;
    
    const ratateY = deltaX - lastDeltaX;
    mesh.rotation.y = mesh.rotation.y + ratateY * 0.005;

    lastDeltaX = deltaX;

    if (mesh.rotation.y >= -0.5 && mesh.rotation.y < 0.5)
    {
      activateBtn(3);
    }
    else if (mesh.rotation.y >= 0.5 && mesh.rotation.y < 2.25)
    {
      activateBtn(2);
    }
    else if (mesh.rotation.y > 2.25 && mesh.rotation.y < 4)
    {
      activateBtn(1);
    }
    else
    {
      resetBtn();
    }
  });

  let lastDeltaY = 0;
  
  mc.on('pandown panup', function(ev) {
    const { deltaY } = ev;
    
    const ratateX = deltaY - lastDeltaY;
    mesh.rotation.x = mesh.rotation.x + ratateX * 0.005;

    lastDeltaY = deltaY;
  });

  

  mc.on('panend', function(ev) {
    lastDeltaX = 0;
    lastDeltaY = 0;
  })
}
