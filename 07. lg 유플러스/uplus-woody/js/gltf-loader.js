
let toystory,
    mesh,
    mixer;

let clock = new THREE.Clock();
let mainURL = 'https://intra.letsee.io/3D-model/gltf/';

const loadingManager = new THREE.LoadingManager();
loadingManager.onProgress = (item, loaded, total) => console.log(item, loaded, total);

/**
 * Initialize 3D world
 */
function initWorld() {

  initScene();
  proceedModel();
}

/**
 * Initialize Scene
 */
function initScene() {

  // 1. Add lights
  let ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
  ambientLight.position.set(0, 0, 0);
  scene.add(ambientLight);

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
  renderer.outputEncoding          = THREE.sRGBEncoding;
  renderer.physicallyCorrectLights = true;
  renderer.setPixelRatio( window.devicePixelRatio );

}

/**
 * Proceed model.
 */
function proceedModel() {
  letsee.addTarget('https://d-developer.letsee.io/api-tm/target-manager/target-uid/60ed0b01821c70ad32ca98b2').then(entity => {
    toystory = entity;

    // 1. Load model
    loadModel()
    .then(model => {
      console.warn(`Model ${model.name} loaded completed!`);

      // 2.Add mesh into entity
      toystory.add(model);

      // 3. Add entity to scene
      scene.add(toystory);

      if (model) {
        //  Do something
        toystory.matrixAutoUpdate = false;
        toystory.position.z = -250;
        toystory.visible = true;
        toystory.updateMatrix();
      }
    });

    /**
     * For model load in not tracking status.
     */
    letsee.onTrackEnd((te) => {
      // const temp = {
      //   // elements: [0.9996717718958484, 0.0062402214640219465, -0.02484769829772193, 0, -0.0025224514927073274, 0.9891437930727777, 0.14692921378699628, 0, 0.02549481737690216, -0.14681831037604906, 0.988834868936791, 0, -10.489514205452574, -2.8702186425177274, -300.4471307995897, 1],
      //   elements: [0.9996717718958484, 0.0062402214640219465, -0.02484769829772193, 0, -0.0025224514927073274, 0.9891437930727777, 0.14692921378699628, 0, 0.02549481737690216, -0.14681831037604906, 0.988834868936791, 0, -10.489514205452574, 30.5702186425177274, -250.4471307995897, 1],
      //   isMatrix4: true,
      // };
      //
      // toystory.matrixAutoUpdate = false;
      // toystory.applyMatrix4(temp);
      // toystory.updateMatrix();
      // toystory.visible = true;
      //
      // mesh.scale.setScalar(400);
      // mesh.position.set(0, -100, 50);

      toystory.matrixAutoUpdate = false;
      toystory.position.z = -250;
      toystory.visible = true;
      toystory.updateMatrix();

    });

    // Render all
    renderAll().then(() => {});
  });
}

/**
 * Render the whole thing.
 * @returns {Promise<void>}
 */
const renderAll = async function() {
  requestAnimationFrame(renderAll);

  let d = clock.getDelta();
  if ( mixer ) mixer.update(d);

  camera = letsee.threeRenderer().getDeviceCamera();
  await letsee.threeRenderer().update();
  stats.update();

  renderer.render(scene, camera);
};

/**
 * Load glTF model.
 */
function loadModel() {
  return new Promise((resolve) => {

    let gltfLoader = new THREE.GLTFLoader();
    gltfLoader.load( mainURL + 'woody/scene.gltf' , function(gltf) {

      if (gltf.animations.length) {
        mixer = new THREE.AnimationMixer( gltf.scene );
        let action = mixer.clipAction( gltf.animations[ 0 ] );
        action.play();
      }

      gltf.scene.scale.setScalar(2.5);
      gltf.scene.rotation.y = -120;
      gltf.scene.position.set(0, -70, 10);
      gltf.scene.name = 'Woody';

      resolve(gltf.scene);
    }, onProgress, onError);
  })
}

/**
 * Show the progress of loading model
 * @param xhr
 */
function onProgress(xhr) {
  if (xhr.lengthComputable) {
    const percentComplete = xhr.loaded / xhr.total * 100;
    console.warn(Math.round(percentComplete) + '%');
  }
}

/**
 * Show error if loading error.
 * @param e
 */
function onError(e) {
  console.error(e);
}
