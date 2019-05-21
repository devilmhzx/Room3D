// 参考自: https://codepen.io/Zultan/pen/LOWJpB
let THREE = window.THREE
let TweenMax = window.TweenMax

var Colors = {
	red:0xCA3C38,
	white:0xd8d0d1,
	grey:0xb5b5b5,
	darkGrey: 0x707070,
};

class Robot {
  constructor() {
    this.mesh = new THREE.Object3D();
    var redMat = new THREE.MeshPhongMaterial({color:Colors.red, flatShading:true});
    var whiteMat = new THREE.MeshPhongMaterial({color:Colors.white, flatShading:true});
    var greyMat = new THREE.MeshPhongMaterial({color:Colors.grey, flatShading:true});
    var darkGreyMat = new THREE.MeshPhongMaterial({color:Colors.darkGrey, flatShading:true});
    // Create the Head
    var geomHead = new THREE.BoxGeometry(75,50,50,1,1,1);
    var head = new THREE.Mesh(geomHead, redMat);

    head.castShadow = true;
    head.receiveShadow = true;

    // Create the Eyes
    var geomEye = new THREE.CylinderBufferGeometry(15, 10, 10, 8 );
    geomEye.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
    var eyeL = new THREE.Mesh(geomEye, whiteMat);
    eyeL.position.set(15,0,25);
    eyeL.castShadow = true;
    eyeL.receiveShadow = true;


    // Clone Eye
    var eyeR = eyeL.clone();
    eyeL.position.x = -eyeR.position.x;


    this.eyes = new THREE.Object3D();
    this.eyes.add(eyeL,eyeR);
    head.add(this.eyes);

    // Add Antennna
    var geomAntennaBase = new THREE.CylinderBufferGeometry(5, 10, 5, 6 );
    var antennaBase = new THREE.Mesh(geomAntennaBase, redMat);
    antennaBase.position.set(0,27,0);
    antennaBase.castShadow = true;
    antennaBase.receiveShadow = true;
    head.add(antennaBase);

    var geomAntennaRod = new THREE.CylinderBufferGeometry(1, 5, 20, 6 );
    var antennaRod = new THREE.Mesh(geomAntennaRod, redMat);
    antennaRod.position.set(0,10,0);
    antennaRod.castShadow = true;
    antennaRod.receiveShadow = true;
    antennaBase.add(antennaRod);

    var geomAntennaTop = new THREE.SphereBufferGeometry( 6, 8, 8 );
    var antennaTop = new THREE.Mesh(geomAntennaTop, whiteMat);
    antennaTop.position.set(0,20,0);
    antennaTop.castShadow = true;
    antennaTop.receiveShadow = true;
    antennaBase.add(antennaTop);

    antennaBase.scale.set(0.8, 0.8, 0.8);

    // Create Jaw
    var geomJaw = new THREE.BoxGeometry(85,10,60,1,1,1);
    this.jaw = new THREE.Mesh(geomJaw, redMat);
    this.jaw.castShadow = true;
    this.jaw.receiveShadow = true;
    this.jaw.position.set(0,-40, 0);
    this.jaw.rotation.x =  Math.PI * 0.05;
    this.mesh.add(this.jaw);

    //Create Jaw Vertical
    var geomJawV = new THREE.BoxGeometry(85,25,10,1,1,1);
    var jawV = new THREE.Mesh(geomJawV, redMat);
    jawV.receiveShadow = true;
    jawV.position.set(0, 17.5,-25);
    this.jaw.add(jawV);

    //Create Teeth
    var geomTeeth = new THREE.BoxGeometry(75,5,5,1,1,1);
    var teeth = new THREE.Mesh(geomTeeth, whiteMat);
    teeth.castShadow = true;
    teeth.receiveShadow = true;
    teeth.position.set(0, 5 ,20);
    this.jaw.add(teeth);

    var geomTeethBack = new THREE.BoxGeometry(5,5,30,1,1,1);
    var teethBackL = new THREE.Mesh(geomTeethBack, whiteMat);
    teethBackL.castShadow = true;
    teethBackL.receiveShadow = true;
    teethBackL.position.set(35, 5, 5);
    this.jaw.add(teethBackL);

    var teethBackR = teethBackL.clone();
    teethBackL.position.x = -teethBackR.position.x;
    this.jaw.add(teethBackR);	

    //Creat Jaw Bolts
    var geomJawBolt = new THREE.CylinderBufferGeometry(10, 10, 10, 8 );
    geomJawBolt.applyMatrix(new THREE.Matrix4().makeRotationZ(-Math.PI/2));
    var jawBoltL = new THREE.Mesh(geomJawBolt, redMat);
    jawBoltL.position.set(-40,25,-25);
    jawBoltL.castShadow = true;
    jawBoltL.receiveShadow = true;
    this.jaw.add(jawBoltL);

    //Clone the Jaw
    var jawBoltR = jawBoltL.clone();
    jawBoltL.position.x = -jawBoltR.position.x;
    this.jaw.add(jawBoltR);

    //Add the Jaw
    head.add(this.jaw);
    
    //Add the Head
    this.headCont = new THREE.Object3D();
    this.headCont.add(head);
    this.mesh.add(this.headCont);


    //Create the Torso
    var geomTorso = new THREE.BoxGeometry(65,60,50,1,1,1);
    var torso = new THREE.Mesh(geomTorso, redMat);
    torso.castShadow = true;
    torso.receiveShadow = true;
    geomTorso.vertices[3].x+=10;
    geomTorso.vertices[2].x+=10;
    geomTorso.vertices[7].x-=10;
    geomTorso.vertices[6].x-=10;

    geomTorso.vertices[3].z-=5;
    geomTorso.vertices[2].z+=5;
    geomTorso.vertices[7].z+=5;
    geomTorso.vertices[6].z-=5;


    var geomButton = new THREE.BoxGeometry(5,5,2.5);
    var button = new THREE.Mesh(geomButton, greyMat);
    button.position.set(20,10,28);
    button.castShadow = true;
    button.receiveShadow = true;
    torso.add(button);

    var geomButtonWide = new THREE.BoxGeometry(5,10,2.5);
    var buttonWide = new THREE.Mesh(geomButtonWide, greyMat);
    buttonWide.position.set(10,10,28);
    buttonWide.castShadow = true;
    buttonWide.receiveShadow = true;
    torso.add(buttonWide);


    var geomnDial = new THREE.CylinderBufferGeometry(10, 10, 4, 8 );
    var dial = new THREE.Mesh(geomnDial, darkGreyMat);	
    dial.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
    dial.position.set(-15,10,27);
    dial.castShadow = true;
    dial.receiveShadow = true;
    torso.add(dial);


    //Create the LowerTorso
    var geomTorsoLower = new THREE.BoxGeometry(20,12,60,1,1,2);
    var torsoLowerL = new THREE.Mesh(geomTorsoLower, redMat);
    torsoLowerL.position.set(25,-36,0);
    geomTorsoLower.vertices[4].y-=10;	
    geomTorsoLower.vertices[10].y-=10;
    torsoLowerL.castShadow = true;
    torsoLowerL.receiveShadow = true;
    torso.add(torsoLowerL);

    var torsoLowerR = torsoLowerL.clone();
    torsoLowerL.position.x = -torsoLowerR.position.x;
    torso.add(torsoLowerR);

    var torsoLowerM = torsoLowerL.clone();
    torsoLowerM.position.x=0;
    torsoLowerM.position.y=-33.5;
    torsoLowerM.scale.set(1,1.2,1.1);
    torso.add(torsoLowerM);

    // Create the Neck
    var geomNeck = new THREE.CylinderBufferGeometry(10, 15, 12, 6);
    var neck = new THREE.Mesh(geomNeck, redMat);
    neck.castShadow = true;
    neck.position.y = 35;
    neck.receiveShadow = true;
    torso.add(neck);


    // Create JetPack

    var geomFuelBox = new THREE.BoxBufferGeometry(45, 30, 10 );
    var fuelBox = new THREE.Mesh(geomFuelBox, redMat);
    fuelBox.position.set(0,0,-30);
    fuelBox.castShadow = true;
    fuelBox.receiveShadow = true;
    torso.add(fuelBox);

    var geomFuel = new THREE.CylinderBufferGeometry(15, 15, 60, 8 );
    var fuel = new THREE.Mesh(geomFuel, greyMat);
    fuel.position.set(20,0,-50);
    fuel.castShadow = true;
    fuel.receiveShadow = true;
    torso.add(fuel);

    var geomFuelTop = new THREE.SphereGeometry( 15, 8, 8 );
    var fuelTop = new THREE.Mesh(geomFuelTop, whiteMat);
    fuelTop.position.set(0,30,0);
    fuelTop.castShadow = true;
    fuelTop.receiveShadow = true;
    fuel.add(fuelTop);

    var geomFuelBot = new THREE.CylinderBufferGeometry(15, 20, 10, 8 );
    var fuelBot = new THREE.Mesh(geomFuelBot, darkGreyMat);
    fuelBot.position.set(0,-30,0);
    fuelBot.castShadow = true;
    fuelBot.receiveShadow = true;
    fuel.add(fuelBot);


    var fuelR = fuel.clone();
    fuel.position.x = -fuelR.position.x;
    torso.add(fuelR);
    fuel.rotation.x = Math.PI/30;
    fuelR.rotation.x = Math.PI/30;
    this.mesh.add(torso);



    // Create Arms - need better anchor poitns

    this.armLeft = new THREE.Object3D();

    var geomArm = new THREE.BoxGeometry(10,40,10);
    var armUpperL = new THREE.Mesh(geomArm, redMat);
    armUpperL.rotateZ = Math.PI/8;
    armUpperL.castShadow = true;
    armUpperL.position.set(55,0,0);
    armUpperL.receiveShadow = true;
    armUpperL.rotation.z =	Math.PI/3;
    armUpperL.rotation.y =	-Math.PI/4;
    this.armLeft.add(armUpperL);

    var armLowerL = armUpperL.clone();
    //armUpperL.position.y = -armLowerL.position.y;
    armLowerL.position.set(70,-22,35);
    armLowerL.rotation.y =	-Math.PI/2;
    this.armLeft.add(armLowerL);	

    // Creat Hands
    var geomHand = new THREE.BoxGeometry(30,30,10);
    var handL = new THREE.Mesh(geomHand, redMat);
    handL.castShadow = true;
    handL.position.set(0,-20,0);
    handL.receiveShadow = true;
    armLowerL.add(handL);

    this.mesh.add(this.armLeft);	

    this.armRight = this.armLeft.clone();
    this.armRight.position.y = 25;	
    this.armRight.rotation.y = Math.PI;
    this.armRight.rotation.x = Math.PI;

    this.mesh.add(this.armRight);	

    // Create Legs - Needs better Anchor Points

    var geomLeg = new THREE.BoxGeometry(10,40,10);
    var legL = new THREE.Mesh(geomLeg, redMat);
    legL.castShadow = true;
    legL.position.set(25,-72,10);
    legL.receiveShadow = true;

    var legLowerL = legL.clone();
    legLowerL.position.set(0,-35,-15);
    legLowerL.rotation.x =	Math.PI/3.5;
    legL.add(legLowerL);

    // Creat Feet
    var geomFeet = new THREE.BoxGeometry(30,10,40);
    var feet = new THREE.Mesh(geomFeet, redMat);
    feet.castShadow = true;
    feet.position.set(0,-20,10);
    feet.receiveShadow = true;
    legLowerL.add(feet);	

    this.legLCont = new THREE.Object3D();
    this.legLCont.add(legL);
    this.mesh.add(this.legLCont);

    var legR = legL.clone();
    legR.position.x = -25;
    legR.rotation.x = -Math.PI/10;

    this.legRCont = new THREE.Object3D();
    this.legRCont.add(legR);
    this.mesh.add(this.legRCont);
    
    //Position Body Parts
    head.scale.set(1.2, 1.2, 1.2);
    head.position.y = 100;
    torso.position.y = 0;
  }

  blink() {
    this.eyes.scale.y = 1;
    this.eyes.scale.y = 1;
    TweenMax.to(this.eyes.scale, .07, {
        y: 0, yoyo: true, repeat: 1, onComplete: function() {
           this.isBlinking = false;
        }
    });
  }

  blinkLoop () {
    this.isBlinking = false;
    if ((!this.isBlinking) && (Math.random()>0.99)) {
      this.isBlinking = true;
      this.blink();
    } 
  }

  idleAnimation () {
    //HEAD
    this.headCont.rotation.z = Math.sin(Date.now() * 0.002) * Math.PI * 0.02 ;
    this.headCont.rotation.x = Math.cos(Date.now() * 0.001) * Math.PI * 0.02 ;
    this.headCont.rotation.y = Math.sin(Date.now() * 0.001) * Math.PI * 0.1 ; 
    this.jaw.rotation.x = Math.sin(Date.now() * 0.001) * -Math.PI * 0.07 ; 
    this.jaw.rotation.x = Math.max(-0.02,this.jaw.rotation.x);
    
    //ARMs
    this.armLeft.rotation.x = Math.sin(Date.now() * 0.002) * -Math.PI * 0.1 ;
    this.armRight.rotation.z = Math.sin(Date.now() * 0.001) * -Math.PI * 0.07 ;
    
    //LEFT
    
    this.legRCont.rotation.x = Math.sin(Date.now() * 0.001) * -Math.PI * 0.05 ;
    this.legRCont.rotation.z = Math.sin(Date.now() * 0.001) * -Math.PI * 0.02 ;
    this.legLCont.rotation.x = Math.sin(Date.now() * 0.0015) * Math.PI * 0.02 ;
    this.legLCont.rotation.z = Math.cos(Date.now() * 0.0012) * Math.PI * 0.01;
  
    //Vibration
    this.mesh.position.x = Math.sin(Date.now() * 0.03) * 0.5 ;
    this.mesh.position.y = Math.cos(Date.now() * 0.01) * 1 ;
    //this.mesh.position.z = Math.cos(Date.now() * 0.03) * -1 ;
    
    this.mesh.position.y += Math.sin(Date.now() * 0.001) * 15 ;
  }
}
export default Robot
