
// 3D
let scene,
    camera,
    renderer;
let toystory,
    mesh,
    transparentMesh,
    linearMesh;

let carModelGlb, carModelUsdz;

let carModelNoAniGlb = 'assets/model/Hyundai_Basic_v04_noAnim.glb';
let carModelNoAniUsdz = 'assets/model/Hyundai_Basic_v04_noAnim.usdz';

// Ray
let mouse = new THREE.Vector2();
let INTERSECTED,
    raycaster;

// Sounds
let clickSound                = new Audio('assets/audio/click.mp3');

// Add ResourceTracker
const resMgr = new ResourceTracker();
let track = resMgr.track.bind(resMgr);

let topTabFlag = 'exterior'; // 'exterior' | 'inside' | 'cooling'
let idTubeAnim;

const clock = new THREE.Clock();
let circle, circumference;

let fps = 30;
let fpsInterval = 1000 / fps;
let now = null;
let then = Date.now();
let elapsed = null;

/**
 * Initialize world.
 */
function initWorld() {
  console.warn(`THREE.REVISION: ${THREE.REVISION}`);
  
  initScene();
  loadModels();
}

/**
 * Initialize Scene.
 */
function initScene() {

  // 1. Add lights
  /*let ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  ambientLight.position.set(0, 0, 0);
  scene.add(ambientLight);*/

  let dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
  dirLight.position.set(-0.5, 0.5, 0.866);
  dirLight.castShadow = false;
  dirLight.shadow.mapSize = new THREE.Vector2(512, 512);
  scene.add(dirLight);

  let pmremGenerator = new THREE.PMREMGenerator( renderer );
  pmremGenerator.compileEquirectangularShader();

  // 2. Set background for scene as image
  new THREE.RGBELoader()
  .setDataType( THREE.UnsignedByteType )
  .setPath( './assets/textures/' )
  .load( 'royal_esplanade_1k.hdr', function ( texture ) {

    let envMap = pmremGenerator.fromEquirectangular( texture ).texture;

    // scene.background = envMap;
    scene.environment = envMap;

    texture.dispose();
    pmremGenerator.dispose();

  });

  // 3. Set light effects for renderer
  renderer.toneMappingExposure     = 1;
  renderer.toneMapping             = 0;
  renderer.gammaFactor             = 2;
  renderer.outputEncoding          = THREE.sRGBEncoding;
  renderer.physicallyCorrectLights = true;
  // renderer.setPixelRatio( window.devicePixelRatio );

  // Set actual size in memory (scaled to account for extra pixel density).
  let scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
  // renderer.domElement.width = Math.floor(renderer.domElement.width * scale);
  // renderer.domElement.height = Math.floor(renderer.domElement.height * scale);
  
  // Normalize coordinate system to use css pixels.
  // let ctx = renderer.domElement.getContext('2d');
  // ctx.scale(scale, scale);

  // 4. Raycaster
  raycaster = new THREE.Raycaster();

  var clickEvent = (function() {
    if ('ontouchstart' in document.documentElement === true) {
      return 'touchstart';
    } else {
      return 'click';
    }
  })();

  document.addEventListener(clickEvent, onDocumentTouchStart, false);
}

function rotateScene() {

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );

  //setCanvasDimensions(renderer.document, window.innerWidth, window.innerHeight);
}

/**
 * 1. Load whole model of fridge and other objects.
 * 2. Make animation clips.
 * 3. Add model into Entity.
 */
function loadModels() {
  letsee.addTarget('https://developer.letsee.io/api-tm/target-manager/target-uid/6051a0fa040a2b444321a597').then(entity => {
    toystory = entity;

    // 1. Load car
    loadCarModel(track)
    .then(model => {
      console.warn('car model loaded completed!');
      mesh = model;

      // 2.Add mesh into entity
      toystory.add(mesh);

      // 3. Add entity to scene
      scene.add(toystory);

      if (mesh) {
        createButton(track);
      }
    });

    // Render all
    renderAll().then(() => {
      rotateAndScale();
    });
  });
}

/**
 * Render all.
 * @returns {Promise<void>}
 */
const renderAll = async function() {
  requestAnimationFrame(renderAll);

  TWEEN.update();

  now = Date.now();
  elapsed = now - then;

  /*window.camera = letsee.threeRenderer().getDeviceCamera();
  renderer.render(scene, window.camera);*/
  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    
    window.camera = letsee.threeRenderer().getDeviceCamera();

    let delta = clock.getDelta();
    
    if (TrunkOpeningMixer) TrunkOpeningMixer.update(delta);
    if (TrunkClosingMixer) TrunkClosingMixer.update(delta);
    if (RadarWavesMixer) RadarWavesMixer.update(delta);
    if (OuterCirculMixer) OuterCirculMixer.update(delta);
    if (InnerCirculMixer) InnerCirculMixer.update(delta);
    if (SignalLightsMixer) SignalLightsMixer.update(delta);
    if (TailgateLightBarMixer) TailgateLightBarMixer.update(delta);
    if (InteriorViewLightMixer) InteriorViewLightMixer.update(delta);
    if (TrunkIdleMixer) TrunkIdleMixer.update(delta);
    if (OuterInnerCirculMixer) OuterInnerCirculMixer.update(delta);

    await letsee.threeRenderer().update();
    renderer.render(scene, window.camera);
  }

  // await letsee.threeRenderer().update();
};

/**
 * Reset model as original coordinates.
 */
function resetAfterScale() {
  //console.warn(`RESET SCALE.`);
  clickSound.play().then(() => {});

  // Reset model coordinates
  mesh.position.set(0, 0, 50);
  mesh.rotation.set(0, 0, 0);
  //mesh.scale.setScalar(400);
}

/**
 * Get touch coordinates when user touch on screen.
 * @param event
 */
function onDocumentTouchStart(event) {
  event.preventDefault();

  console.log(event);
  
  if('ontouchstart' in document.documentElement === true) {
    const scaled = letsee.threeRenderer().getEffectiveSize();
    let x = +(event.changedTouches[0].pageX / scaled.effectiveWidth) * 2 - 1;
    let y = -(event.changedTouches[0].pageY / scaled.effectiveHeight) * 2 + 1;
  
    mouse.x = x ; // /window.devicePixelRatio;
    mouse.y = y ; // /window.devicePixelRatio;
  } else {
    const scaled = letsee.threeRenderer().getEffectiveSize();
    mouse.x = (event.clientX / scaled.effectiveWidth) * 2 - 1;
    mouse.y = -(event.clientY / scaled.effectiveHeight) * 2 + 1;
  }
  
  findIntersectionAndButtonHandler();
}

function findIntersectionAndButtonHandler() {
  raycaster.setFromCamera(mouse, window.camera);
  
  if (mesh !== undefined) {
    const intersects = raycaster.intersectObjects(mesh.children, true);

    //console.log(intersects);
    if (intersects.length > 0) {
      const filtered = intersects.filter(
          s => {
            return s.object.type === 'CustomButton';
          },
      );

      if (filtered[0]) {
        INTERSECTED = filtered[0].object;
        toogleButton(INTERSECTED.name);
        clickSound.play().then(() => {});
        switch (INTERSECTED.name) {
          case 'OpenPopup1_1':
            //console.warn(`CLICK!`);

            if (carNumber == 1)
            {
              onPopup(0);
            }
            else
            {
              onPopup(1);
            }

            break;
            case 'OpenPopup1_2': onPopup(2); break;
            case 'OpenPopup1_3': onPopup2(); break;
            case 'OpenPopup1_4': 
            if (carNumber == 1)
            {
              onPopup(3);
            }
            else
            {
              onPopup(4);
            }
            
            break;
            case 'OpenPopup2_1': onPopup(5); break;
            case 'OpenPopup2_2': onPopup(6); break;
            case 'OpenPopup2_3': onPopup(7); break;
            case 'OpenPopup2_4': onPopup(8); break;
            case 'OpenPopup2_5': onPopup(9); break;
            case 'OpenPopup2_6': 
            if (carNumber == 1)
            {
              onPopup(10);
            }
            else
            {
              onPopup(11);
            }
            break;
            case 'OpenPopup3_1': onPopup(12); break;
            case 'OpenPopup3_2': onPopup(13); break;
            case 'OpenPopup3_3': onPopup(14); break;
            case 'OpenPopup3_4': onPopup(15); break;
            case 'OpenPopup3_5': onPopup(16); break;
            case 'OpenPopup4_1': onPopup(17); break;
            case 'OpenPopup4_2': onPopup(18); break;
          case 'CloseWater':
            
            // 5. Zoom camera
            /*setTimeout(() => {
              zoomOutCameraForVideo();
            }, 100);*/

            // Resume tracking

            break;
        }
      }
    }
  }
}

/**
 * Reset model as original.
 * 1. Stop all audios, except click sound.
 * 2. Reset all buttons.
 * 3. Reset model coordinates and scale.
 * 4. Reset model materials.
 * 5. Remove all videos and stop playing.
 * 6. Reset all animations
 */
function resetModel() {

  console.error(`RESET MODEL!`);

  // 1. Stop all audios except click sound
  

  // 3. Reset model coordinates
  mesh.position.set(0, 0, 50);
  mesh.rotation.set(0, 0, 0);
  mesh.scale.setScalar(400);
  if (transparentMesh) {
    transparentMesh.rotation.set(0, 0, 0);
    transparentMesh.scale.setScalar(400);
  }

  let bottleMat = new THREE.MeshStandardMaterial( {
    color: 0xFFFFFF,
    colorWrite: true,
    emissive: { b: 0, g: 0, r: 0},
    emissiveIntensity: 1,
    transparent: false,
    opacity: 1,
    fog: true,
    metalness: 1,
    roughness:0.2,
    alphaTest:0,
    blendEquation: 100,
    blendDst: 205,
    blendSrc: 204,
    blending: 1,
    bumpScale: 1
  });

  // 6. Reset all animations
  // if (TWEEN) TWEEN.removeAll();

  // 7. Check to stop all previous animations
  cancelAnimationFrame(idTubeAnim);
  nEnd = 0;
  tube.children = [];
  transparentMesh.remove(tube);

}

/**
 * Reset all TTS sounds except Click sound.
 */
function resetAudio() {
}

/**
 * Set model center of screen.
 */
function setModelCenter() {

  console.warn(`setModelCenter`);

  const temp = {
    // elements: [0.9996717718958484, 0.0062402214640219465, -0.02484769829772193, 0, -0.0025224514927073274, 0.9891437930727777, 0.14692921378699628, 0, 0.02549481737690216, -0.14681831037604906, 0.988834868936791, 0, -10.489514205452574, -2.8702186425177274, -300.4471307995897, 1],
    elements: [500, 0, 0, 0, 0, 500, 0, 0, 0, 0, 500, 0, -10.489514205452574, -2.8702186425177274, -300.4471307995897, 1],
    isMatrix4: true,
  }

  toystory.matrixAutoUpdate = false;
  toystory.applyMatrix4(temp);
  toystory.updateMatrix();
  toystory.visible = true;
}

let timer;
window.onload = () => {

  // Loading layout
  if (circle) {
    circle = document.querySelector('circle');
    let radius = circle.r.baseVal.value;
    circumference = radius * 2 * Math.PI;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;
  }
};

/**
 * When screen is turn off => pause the sound.
 */
document.addEventListener('visibilitychange', function(){
  if (document.hidden) {
    //console.error(`Document is hidden`);

    // Pause all audios and reload it to start it again


    setTimeout(function() {
    }, 10);
  }
}, false);

/**
 * Loading layout.
 * @param percent
 */
function setProgress(percent) {
  const offset = circumference - percent / 100 * circumference;
  if (circle) circle.style.strokeDashoffset = offset;
}
