
//let mainURL = '';
let mainURL = '';

const loadingManager = new THREE.LoadingManager();
loadingManager.onProgress = (item, loaded, total) => console.log(item, loaded, total);

// DRACO
let dracoLoader = new THREE.DRACOLoader();
dracoLoader.setDecoderPath( 'js/draco/' );
// Optional: Pre-fetch Draco WASM/JS module.
dracoLoader.preload();

/**
 * Show the progress of loading model
 * @param xhr
 */
function onProgress(xhr) {
  if (xhr.lengthComputable) {
    const percentComplete = xhr.loaded / xhr.total * 100;
    // console.warn(Math.round(percentComplete) + '%');
    if(document.getElementById('percent'))
      document.getElementById('percent').innerText = Math.round(percentComplete) + '%';

    setProgress(Math.round(percentComplete));

    if (Math.round(percentComplete) === 100) {
      setTimeout(() => {

        if(document.getElementById('percent'))
        {
          document.getElementById('hint').style.display = 'none';
        }
        
      }, 1000);
    }
  }
}

/**
 * Show error if loading error.
 * @param e
 */
function onError(e) {
  console.error(e);
}

/**
 * 1. Load whole model of fridge and other objects.
 * 2. Make animation clips.
 * 3. Add model into Entity.
 */
function loadCarModel(_track) {
  return new Promise((resolve) => {

    // Instantiate a gltfLoader
    let gltfLoader = new THREE.GLTFLoader();
    gltfLoader.setDRACOLoader( dracoLoader );

    // Hyundai_exterior
    // Space
    // lg_dios_non_shelf
    gltfLoader.load( carModelGlb , function(gltf) {

      //console.log(gltf);
      let root = _track(gltf.scene);

      gltf.scene.visible = true;
      gltf.scene.tag = 'exterior';
      gltf.scene.name = 'Hyundai_exterior_v01';
      gltf.scene.scale.setScalar(1);
      gltf.scene.position.set(0, 0, 0);
      gltf.scene.rotation.y = Math.PI/180 * 120;
      
      // Create custom animation clips
      if (gltf.animations.length > 0) {
        console.log(gltf.animations);
        gltf.scene.animations = gltf.animations;
      } else console.warn(`Model [${gltf.scene.name}] does not have animation.`);

      transparentMesh = _track(gltf.scene.clone());
      // transparentMesh.remove(transparentMesh.children[8]);
      transparentMesh.name = 'ClonedMesh';

      // Create custom animation clips
      (gltf.animations.length > 0) ? gltf.scene.originAnims = gltf.animations : '';

      resolve(root);

    }, onProgress, onError);
  })

}