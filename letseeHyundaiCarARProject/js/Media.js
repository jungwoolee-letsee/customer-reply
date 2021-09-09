// Videos
let video,
    videoTexture = null,
    videoFilter,
    videoFilterTexture = null;

// Preload the textures
let mat_btnPopupTrigger            = new THREE.TextureLoader().load('assets/img/popup/popup_trigger.png');
let mat_btnPopupTriggerPressed            = new THREE.TextureLoader().load('assets/img/popup/popup_pressed.png');

let mat_btnTrunkOpen            = new THREE.TextureLoader().load('assets/img/popup/popup_trigger.png');
let mat_btnTrunkClose            = new THREE.TextureLoader().load('assets/img/popup/popup_trigger.png');

let x = 0;
let y = 0;
let set1_z = -1.9;
/**
 * Create custom buttons, texts and sound
 */

function createButton(_track) {
  let geo, mat;

  // Button open video for Ice
  mat = _track(new THREE.MeshBasicMaterial({ map: mat_btnPopupTrigger, transparent: true }));
  geo = _track(new THREE.PlaneGeometry(1, 1, 1));
  btnOpenVideo1_1 = _track(new THREE.Mesh(geo, mat));
  btnOpenVideo1_1.name = 'OpenPopup1_1';
  btnOpenVideo1_1.type = 'CustomButton';
  btnOpenVideo1_1.position.set(0.2, 0.86, set1_z,1);
  btnOpenVideo1_1.scale.setScalar(0.15);
  btnOpenVideo1_1.rotation.y = Math.PI/180* 180;

  // Only add main buttons to Mesh as beginning

  btnOpenVideo1_2 = _track(new THREE.Mesh(geo, mat));
  btnOpenVideo1_2.name = 'OpenPopup1_2';
  btnOpenVideo1_2.type = 'CustomButton';
  btnOpenVideo1_2.position.set(0.5, 0.91, set1_z,1);
  btnOpenVideo1_2.scale.setScalar(0.15);
  btnOpenVideo1_2.rotation.y = Math.PI/180* 180;


  btnOpenVideo1_3 = _track(new THREE.Mesh(geo, mat));
  btnOpenVideo1_3.name = 'OpenPopup1_3';
  btnOpenVideo1_3.type = 'CustomButton';
  btnOpenVideo1_3.position.set(-0.6, 0.71, set1_z,1);
  btnOpenVideo1_3.scale.setScalar(0.15);
  btnOpenVideo1_3.rotation.y = Math.PI/180* 180;

  btnOpenVideo1_4 = _track(new THREE.Mesh(geo, mat));
  btnOpenVideo1_4.name = 'OpenPopup1_4';
  btnOpenVideo1_4.type = 'CustomButton';
  btnOpenVideo1_4.position.set(-0.3, 0.51, set1_z,1);
  btnOpenVideo1_4.scale.setScalar(0.15);
  btnOpenVideo1_4.rotation.y = Math.PI/180* 180;

  
  btnOpenVideo2_1 = _track(new THREE.Mesh(geo, mat));
  btnOpenVideo2_1.name = 'OpenPopup2_1';
  btnOpenVideo2_1.type = 'CustomButton';
  btnOpenVideo2_1.position.set(-0.8, 0.88, -0.8,1);
  btnOpenVideo2_1.scale.setScalar(0.15);
  btnOpenVideo2_1.rotation.y = Math.PI/180* 270;

  // Only add main buttons to Mesh as beginning

  btnOpenVideo2_2 = _track(new THREE.Mesh(geo, mat));
  btnOpenVideo2_2.name = 'OpenPopup2_2';
  btnOpenVideo2_2.type = 'CustomButton';
  btnOpenVideo2_2.position.set(-0.8, 1.1, -0.3,1);
  btnOpenVideo2_2.scale.setScalar(0.15);
  btnOpenVideo2_2.rotation.y = Math.PI/180* 270;


  btnOpenVideo2_3 = _track(new THREE.Mesh(geo, mat));
  btnOpenVideo2_3.name = 'OpenPopup2_3';
  btnOpenVideo2_3.type = 'CustomButton';
  btnOpenVideo2_3.position.set(-0.8, 1.15, 0.6,1);
  btnOpenVideo2_3.scale.setScalar(0.15);
  btnOpenVideo2_3.rotation.y = Math.PI/180* 270;

  btnOpenVideo2_4 = _track(new THREE.Mesh(geo, mat));
  btnOpenVideo2_4.name = 'OpenPopup2_4';
  btnOpenVideo2_4.type = 'CustomButton';
  btnOpenVideo2_4.position.set(-0.8, 1.5, 0.9,1);
  btnOpenVideo2_4.scale.setScalar(0.15);
  btnOpenVideo2_4.rotation.y = Math.PI/180* 270;

  btnOpenVideo2_5 = _track(new THREE.Mesh(geo, mat));
  btnOpenVideo2_5.name = 'OpenPopup2_5';
  btnOpenVideo2_5.type = 'CustomButton';
  btnOpenVideo2_5.position.set(-0.8, 1.2, 1.5,1);
  btnOpenVideo2_5.scale.setScalar(0.15);
  btnOpenVideo2_5.rotation.y = Math.PI/180* 270;

  btnOpenVideo2_6 = _track(new THREE.Mesh(geo, mat));
  btnOpenVideo2_6.name = 'OpenPopup2_6';
  btnOpenVideo2_6.type = 'CustomButton';
  btnOpenVideo2_6.position.set(-0.8, 0.42, -1,1);
  btnOpenVideo2_6.scale.setScalar(0.15);
  btnOpenVideo2_6.rotation.y = Math.PI/180* 270;

  btnOpenVideo3_1 = _track(new THREE.Mesh(geo, mat));
  btnOpenVideo3_1.name = 'OpenPopup3_1';
  btnOpenVideo3_1.type = 'CustomButton';
  btnOpenVideo3_1.position.set(0.35, 1.1, 2.18,1);
  btnOpenVideo3_1.scale.setScalar(0.15);
  btnOpenVideo3_1.rotation.y = Math.PI/180* 360;

  // Only add main buttons to Mesh as beginning

  btnOpenVideo3_2 = _track(new THREE.Mesh(geo, mat));
  btnOpenVideo3_2.name = 'OpenPopup3_2';
  btnOpenVideo3_2.type = 'CustomButton';
  btnOpenVideo3_2.position.set(0, 0.5, 2.18,1);
  btnOpenVideo3_2.scale.setScalar(0.15);
  btnOpenVideo3_2.rotation.y = Math.PI/180* 360;


  btnOpenVideo3_3 = _track(new THREE.Mesh(geo, mat));
  btnOpenVideo3_3.name = 'OpenPopup3_3';
  btnOpenVideo3_3.type = 'CustomButton';
  btnOpenVideo3_3.position.set(-0.5, 0.8, 2.18,1);
  btnOpenVideo3_3.scale.setScalar(0.15);
  btnOpenVideo3_3.rotation.y = Math.PI/180* 360;

  btnOpenVideo3_4 = _track(new THREE.Mesh(geo, mat));
  btnOpenVideo3_4.name = 'OpenPopup3_4';
  btnOpenVideo3_4.type = 'CustomButton';
  btnOpenVideo3_4.position.set(0.5, 0.5, 2.18,1);
  btnOpenVideo3_4.scale.setScalar(0.15);
  btnOpenVideo3_4.rotation.y = Math.PI/180* 360;

  btnOpenVideo3_5 = _track(new THREE.Mesh(geo, mat));
  btnOpenVideo3_5.name = 'OpenPopup3_4';
  btnOpenVideo3_5.type = 'CustomButton';
  btnOpenVideo3_5.position.set(-0.05, 1.5, 2.18,1);
  btnOpenVideo3_5.scale.setScalar(0.15);
  btnOpenVideo3_5.rotation.y = Math.PI/180* 360;


  btnOpenVideo4_1 = _track(new THREE.Mesh(geo, mat));
  btnOpenVideo4_1.name = 'OpenPopup4_1';
  btnOpenVideo4_1.type = 'CustomButton';
  btnOpenVideo4_1.position.set(-0.1, 0.9, 2.18,1);
  btnOpenVideo4_1.scale.setScalar(0.15);
  btnOpenVideo4_1.rotation.y = Math.PI/180* 360;

  btnOpenVideo4_2 = _track(new THREE.Mesh(geo, mat));
  btnOpenVideo4_2.name = 'OpenPopup4_2';
  btnOpenVideo4_2.type = 'CustomButton';
  btnOpenVideo4_2.position.set(0, 1.2, 2.18,1);
  btnOpenVideo4_2.scale.setScalar(0.15);
  btnOpenVideo4_2.rotation.y = Math.PI/180* 360;
 
  mat = _track(new THREE.MeshBasicMaterial({ map: mat_btnTrunkOpen, transparent: true }));
  geo = _track(new THREE.PlaneGeometry(1, 1, 1));
  btnOpenTrunk = _track(new THREE.Mesh(geo, mat));
  btnOpenTrunk.name = 'OpenTrunk';
  btnOpenTrunk.type = 'CustomButton';
  btnOpenTrunk.position.set(0, 0.8, 2.18,1);
  btnOpenTrunk.scale.setScalar(0.15);
  btnOpenTrunk.rotation.y = Math.PI/90* 180;

  mat = _track(new THREE.MeshBasicMaterial({ map: mat_btnTrunkClose, transparent: true }));
  geo = _track(new THREE.PlaneGeometry(1, 1, 1));
  btnCloseTrunk = _track(new THREE.Mesh(geo, mat));
  btnCloseTrunk.name = 'CloseTrunk';
  btnCloseTrunk.type = 'CustomButton';
  btnCloseTrunk.position.set(0, 1.8, 2.5,1);
  btnCloseTrunk.scale.setScalar(0.15);

  btnCloseTrunk.rotation.y = Math.PI/90* 180;
  
}

function activateBtn(index)
{
  if (index == 1)
  {
    mesh.add(btnOpenVideo1_1, btnOpenVideo1_2, btnOpenVideo1_3, btnOpenVideo1_4);
    mesh.remove(btnOpenVideo2_1, btnOpenVideo2_2, btnOpenVideo2_3, btnOpenVideo2_4, btnOpenVideo2_5, btnOpenVideo2_6, btnOpenVideo3_1, btnOpenVideo3_2, btnOpenVideo3_3, btnOpenVideo3_4, btnOpenVideo3_5, btnOpenTrunk);
    
  }else if (index ==2)
  {
    mesh.remove(btnOpenVideo1_1, btnOpenVideo1_2, btnOpenVideo1_3, btnOpenVideo1_4,btnOpenVideo3_1,btnOpenVideo3_2,btnOpenVideo3_3,btnOpenVideo3_4,btnOpenVideo3_5, btnOpenTrunk);
    mesh.add(btnOpenVideo2_1, btnOpenVideo2_2, btnOpenVideo2_3, btnOpenVideo2_4, btnOpenVideo2_5, btnOpenVideo2_6);

    
  }else if (index = 3)
  {
    mesh.remove(btnOpenVideo1_1, btnOpenVideo1_2, btnOpenVideo1_3, btnOpenVideo1_4 ,btnOpenVideo2_1 ,btnOpenVideo2_2 ,btnOpenVideo2_3 ,btnOpenVideo2_4 ,btnOpenVideo2_5 ,btnOpenVideo2_6);
    mesh.add(btnOpenVideo3_1, btnOpenVideo3_3 ,btnOpenVideo3_4 , btnOpenTrunk); //2, 5번은 애드하지 않음 (2021/09/07)
    
  }
}
function resetBtn() {
  mesh.remove(btnOpenVideo1_1, btnOpenVideo1_2 ,btnOpenVideo1_3 ,btnOpenVideo1_4 ,btnOpenVideo2_1 ,btnOpenVideo2_2 ,btnOpenVideo2_3 ,btnOpenVideo2_4 ,btnOpenVideo2_5 ,btnOpenVideo2_6 ,btnOpenVideo3_1 ,btnOpenVideo3_2 ,btnOpenVideo3_3 ,btnOpenVideo3_4 ,btnOpenVideo3_5);
  }
  /**
 * Reset main button materials.
 */
function resetButtonMaterials() {

  console.warn(`resetButtonMaterials`);

  btnOpenVideo.material = new THREE.MeshBasicMaterial({ map: mat_btnWater });
  btnOpenVideo.name = 'OpenPopup';
}

/**
 * Change the material for button click.
 * @param buttonName
 */
function resetBtnMetrial() {
  let changeMat;
  changeMat = new THREE.MeshBasicMaterial({ map: mat_btnPopupTrigger, transparent: true });

  btnOpenVideo1_1.material = changeMat;
  btnOpenVideo1_2.material = changeMat;
  btnOpenVideo1_3.material = changeMat;
  btnOpenVideo1_4.material = changeMat;
  btnOpenVideo2_1.material = changeMat;
  btnOpenVideo1_2.material = changeMat;
  btnOpenVideo2_3.material = changeMat;
  btnOpenVideo2_4.material = changeMat;
  btnOpenVideo2_5.material = changeMat;
  btnOpenVideo2_6.material = changeMat;
  btnOpenVideo3_1.material = changeMat;
  btnOpenVideo3_2.material = changeMat;
  btnOpenVideo3_3.material = changeMat;
  btnOpenVideo3_4.material = changeMat;
  btnOpenVideo3_5.material = changeMat;


}

function toogleButton(buttonName) {

  let changeMat;
  changeMat = new THREE.MeshBasicMaterial({ map: mat_btnPopupTriggerPressed });

  switch (buttonName) {
    case 'OpenPopup1_1': btnOpenVideo1_1.material = changeMat;break;
    case 'OpenPopup1_2': btnOpenVideo1_2.material = changeMat;break;
    case 'OpenPopup1_3': btnOpenVideo1_3.material = changeMat;break;
    case 'OpenPopup1_4': btnOpenVideo1_4.material = changeMat;break;
    case 'OpenPopup2_1': btnOpenVideo2_1.material = changeMat;break;
    case 'OpenPopup2_2': btnOpenVideo2_2.material = changeMat;break;
    case 'OpenPopup2_3': btnOpenVideo2_3.material = changeMat;break;
    case 'OpenPopup2_4': btnOpenVideo2_4.material = changeMat;break;
    case 'OpenPopup2_5': btnOpenVideo2_5.material = changeMat;break;
    case 'OpenPopup2_6': btnOpenVideo2_6.material = changeMat;break;
    case 'OpenPopup3_1': btnOpenVideo3_1.material = changeMat;break;
    case 'OpenPopup3_2': btnOpenVideo3_2.material = changeMat;break;
    case 'OpenPopup3_3': btnOpenVideo3_3.material = changeMat;break;
    case 'OpenPopup3_4': btnOpenVideo3_4.material = changeMat;break;
    case 'OpenPopup3_5': btnOpenVideo3_5.material = changeMat;break;
    case 'OpenTrunk': 
      TrunkOpeningAnimation();
    
    break;
    case 'CloseTrunk': 
    TrunkClosingAnimation();
    case 'OpenPopup':
     //btnOpenVideo.material = changeMat;
      //btnOpenVideo1_1.name = 'CloseWater';

      btnOpenVideo1_1.material = changeMat;

      //mesh.remove(btnKnockOn, btnOpenRightDoor);
      // show plus button
      //mesh.add(btnIcePlus);

      break;
    case 'CloseWater':
      changeMat = new THREE.MeshBasicMaterial({ map: mat_btnWater });
      btnOpenVideo.material = changeMat;
      btnOpenVideo.name = 'OpenWater';
      break;
  }

}
