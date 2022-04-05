let domCanvas = document.querySelector("#canvas");
let bouton = document.querySelector("#bouton");
let soundToon = document.querySelectorAll(".audio");
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas: domCanvas,
    alpha: true,
});
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.01,
    500
);

// Initialise les dimensions suivant la taille de l'écran
window.addEventListener("resize", onResize, false);

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
// Initialise les dimensions suivant la taille de l'écran

function init() {
    // scene.background = new THREE.Color("black");

    // Position de la caméra au commencement
    camera.position.set(0, 5, 3.5);
    // Position de la caméra au commencement

    // Initialiser l'objet au centre de la scène en absolu
    camera.lookAt(0, 0, 0);
    scene.fog = new THREE.Fog(0x000000, 0.08);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Initialiser l'objet au centre de la scène en absolu
}

// Mise en place des lumières pour le dé
let light, light1, light2, light3, light4, light5;

function setLight() {
    light = new THREE.PointLight(0xffffff, 5, 20, 8);
    light.position.set(4.328, 0.954, 2.168);
    light1 = new THREE.PointLight(0xffffff, 5, 20, 9);
    light1.position.set(-0.14, 4, 0);
    light2 = new THREE.PointLight(0xffffff, 5, 20, 5);
    light2.position.set(0, -5, 4);
    light3 = new THREE.PointLight(0xffffff, 5, 20, 5);
    light3.position.set(-5, -9, 0);
    light4 = new THREE.PointLight(0xffffff, 5, 20, 5);
    light4.position.set(5, -9, 0);

    scene.add(light4, light3, light2, light1, light);

    // const hl = new THREE.PointLightHelper(light);
    // const hl1 = new THREE.PointLightHelper(light1);
    // const hl2 = new THREE.PointLightHelper(light2);
    // const hl3 = new THREE.PointLightHelper(light3);
    // const hl4 = new THREE.PointLightHelper(light4);

    // scene.add(hl, hl1, hl2, hl3, hl4);
}
// Mise en place des lumières pour le dé

// GUI pour contrôler les objets et avoir la reference position source
// const gui = new dat.GUI();
// GUI pour contrôler les objets et avoir la reference position source

// GSAP Contrôleur d'animation
// let tl = gsap.timeline({ paused: true });
// GSAP Contrôleur d'animation

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove(event) {
    // calculate pointer position in normalized device coordinates
    // (-1 to +1) for both components

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // console.log(pointer.x);

    // update the picking ray with the camera and pointer position
    raycaster.setFromCamera(pointer, camera);

    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length === 1) {
        AnimationOfDiceForPlayer_1();
    } else {
        null;
    }

    // console.log(intersects.length);
}

let Mesh;

function loadGLTF() {
    //  Chargement de l'objet  plateau, et de mis a l'échelle
    let plateau = new THREE.GLTFLoader();
    plateau.load("model-3d/plateau.gltf", (gltf1) => {
        plateauMesh = gltf1.scene;
        plateauMesh.scale.set(0.3, 0.3, 0.3);
        plateauMesh.position.y = -10;
        plateauMesh.rotation.x = -0.3;
        scene.add(plateauMesh);

        // Chargement de l'objet  plateau, et de mis a l'échelle
    });
    //   Chargement de l'objet  dé, et de mis a l'échelle
    let dice = new THREE.GLTFLoader();
    dice.load("model-3d/dice.gltf", (gltf) => {
        Mesh = gltf.scene;
        Mesh.scale.set(0.5, 0.5, 0.5);

        // Mesh.position.y = 0;
        scene.add(Mesh);
        // Chargement de l'objet  dé, et de mis a l'échelle

        // GUI pour contrôler les objets et avoir la reference position source
        // gui.add(Mesh.rotation, "x").min(0).max(9);
        // gui.add(Mesh.rotation, "y").min(0).max(9);
        // gui.add(Mesh.rotation, "z").min(0).max(9);
        // GUI pour contrôler les objets et avoir la reference position source
    });
}

// Action de cliquer sur le dé
// bouton.addEventListener("click", () => {
//     tl.play();

//     AnimationOfDiceForPlayer_1();
// });

// ***************sound effects of the dice***************

// sound effects of the dice (number, time * 3)
// example of code for sound "sound.sound(0, 950, 1, 2100, 2, 3300)"

// playlist
// numéro 0: le lancer de dé   - number 0: the roll of dice
// numéro 1: le ressort        - number 1: the spring
// numéro 2: le looser         - number 2: the looser
// numéro 3: la petite cloche  - number 3: the little bell
// numéro 4: l'armement        - number 4: the armament
// numéro 5: le relâchement    - number 5: the release
// numéro 6: le roulement      - number 6: the roller

class Sound {
    constructor() {
        this.number1 = 0;
        this.time1 = 0;
        this.number2 = 0;
        this.time2 = 0;
        this.number3 = 0;
        this.time3 = 0;
    }

    sound(number1, time1, number2, time2, number3, time3) {
        this.number1 += number1;
        this.time1 += time1;
        this.number2 += number2;
        this.time2 += time2;
        this.number3 += number3;
        this.time3 += time3;

        setTimeout(() => {
            soundToon[this.number1].play();
        }, this.time1);

        if (number2 !== undefined) {
            setTimeout(() => {
                soundToon[this.number2].play();
            }, this.time2);
        } else {
            null;
        }

        if (number3 !== undefined) {
            setTimeout(() => {
                soundToon[this.number3].play();
            }, this.time3);
        } else {}
        null;
    }
}

// // Instancier le son
//  let sound = new Sound();
// // Instancier le son

// playlist
// numéro 0: le lancer de dé   - number 0: the roll of dice
// numéro 1: le ressort        - number 1: the spring
// numéro 2: le looser         - number 2: the looser
// numéro 3: la petite cloche  - number 3: the little bell
// numéro 4: l'armement        - number 4: the armament
// numéro 5: le relâchement    - number 5: the release
// numéro 6: le roulement      - number 6: the roller

// sound effects of the dice (number, time * 3)
// example of code for sound "sound.sound(0, 950, 1, 2100, 2, 3300)"

// ***************sound effects of the dice***************

// Action cliquer sur le dé
window.addEventListener("click", onPointerMove);
// Action cliquer sur le dé

// ***************Animation du dé pour le joueur 1***************
let AnimationOfDiceForPlayer_1 = () => {
    // fonction aléatoire
    let randomY = gsap.utils.random([450, 540, 630, 720, 810, 900, 990, 1080]);
    let randomX = gsap.utils.random([90, 180, 270, 360, 1170, 1260, 1350, 1440]);
    // fonction aléatoire

    // Convertir degrés en radians
    let degY = (randomY * Math.PI) / 180.0;
    let degX = (randomX * Math.PI) / 180.0;
    // Convertir degrés en radians

    // Animation du dé
    gsap.to(Mesh.rotation, { y: degY, x: degX, duration: 2 });
    gsap.to(Mesh.position, {
        duration: 2,
        delay: 0.3,
        ease: "bounce.out",
        y: -10,
    });

    gsap.to(Mesh.position, {
        duration: 1.5,
        delay: 2.5,
        ease: "power4.out",
        y: 0,
    });
    // Animation du dé

    // Contrôler la valeur x et y du dé
    console.log(`degré Y ${randomY}`);
    console.log(`degré X ${randomX}`);
    // Contrôler la valeur x et y du dé

    // Instancier le son
    let sound = new Sound();
    // Instancier le son

    // ***************retourner la valeur du dé, avec les  axes x et y***************
    if (
        (randomY === 450 ||
            randomY === 540 ||
            randomY === 630 ||
            randomY === 720 ||
            randomY === 810 ||
            randomY === 900 ||
            randomY === 990 ||
            randomY === 1080) &&
        (randomX === 360 || randomX === 1440)
    ) {
        sound.sound(0, 950, 1, 2100, 2, 2700);

        console.log("numéro °= 1");
    } else if (
        (randomY === 540 && randomX === 1350) ||
        (randomY === 540 && randomX === 270) ||
        (randomY === 720 && randomX === 1170) ||
        (randomY === 720 && randomX === 90) ||
        (randomY === 900 && randomX === 270) ||
        (randomY === 900 && randomX === 1350) ||
        (randomY === 1080 && randomX === 1170) ||
        (randomY === 1080 && randomX === 90)
    ) {
        sound.sound(0, 950, 1, 2100);
        console.log("numéro °= 2");
    } else if (
        (randomY === 450 && randomX === 1350) ||
        (randomY === 450 && randomX === 270) ||
        (randomY === 630 && randomX === 1170) ||
        (randomY === 630 && randomX === 90) ||
        (randomY === 810 && randomX === 1350) ||
        (randomY === 810 && randomX === 270) ||
        (randomY === 990 && randomX === 1170) ||
        (randomY === 990 && randomX === 90)
    ) {
        sound.sound(0, 950, 1, 2100);
        console.log("numéro °= 3");
    } else if (
        (randomY === 450 && randomX === 1170) ||
        (randomY === 450 && randomX === 90) ||
        (randomY === 630 && randomX === 1350) ||
        (randomY === 630 && randomX === 270) ||
        (randomY === 810 && randomX === 90) ||
        (randomY === 810 && randomX === 1170) ||
        (randomY === 990 && randomX === 1350) ||
        (randomY === 990 && randomX === 270)
    ) {
        sound.sound(0, 950, 1, 2100);
        console.log("numéro °= 4");
    } else if (
        (randomY === 540 && randomX === 1170) ||
        (randomY === 540 && randomX === 90) ||
        (randomY === 720 && randomX === 1350) ||
        (randomY === 720 && randomX === 270) ||
        (randomY === 900 && randomX === 90) ||
        (randomY === 900 && randomX === 1170) ||
        (randomY === 1080 && randomX === 1350) ||
        (randomY === 1080 && randomX === 270)
    ) {
        sound.sound(0, 950, 1, 2100);
        console.log("numéro °= 5");
    } else if (
        (randomY === 450 ||
            randomY === 540 ||
            randomY === 630 ||
            randomY === 720 ||
            randomY === 810 ||
            randomY === 900 ||
            randomY === 990 ||
            randomY === 1080) &&
        (randomX === 180 || randomX === 1260)
    ) {
        sound.sound(0, 950, 1, 2100);
        console.log("numéro °= 6");
    } else {
        console.log("non défini");
    }
    // ***************retourner la valeur du dé, avec les  axes x et y***************
};

// ***************Animation du dé pour le joueur 1***************

const animate = () => {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
};

// ***************animation en 2 dimensions GSAP***************
let cr = gsap.timeline();

let numberPl1 = document.getElementById("numberPl1");
let startPl1 = document.getElementById("startPl1");
let number = 0;

function loadImageNumber(value) {
    if (value < 10) {
        return (number = "00" + value);
    } else if (value > 9 && value < 100) {
        return (number = "0" + value);
    } else {
        return (number = "" + value);
    }
}

// console.log(loadImageNumber(45));

//******La fonction numberPl1 engendre l'animation et appelle les chiffres du résultat*****
numberPl1.addEventListener("click", () => {
    let sound1 = new Sound();
    let sound2 = new Sound();

    // cr.to(".carrer", { rotation: 27, x: 100, duration: 1 });

    // // recherche un chiffre aléatoire de 0 à 100
    // loadImageNumber(Math.floor(Math.random() * 101));
    // // recherche un chiffre aléatoire de 0 à 100

    // numéro 4: l'armement        - number 4: the armament
    // numéro 5: le relâchement    - number 5: the release
    // numéro 6: le roulement      - number 6: the roller

    startPl1.src = "model-3d/Animation chiffres.webp";
    sound1.sound(4, 170, 5, 1450);
    sound2.sound(6, 4000);
    // console.log(sound2);

    setTimeout(() => {
        numberPl1.setAttribute("style", "z-index: 0;");
    }, 1600);

    setTimeout(() => {
        numberPl1.src = `image/Image ${number}.png`;
        console.log(numberPl1);
        console.log(number);
        // numberPl1.src = "image/Image 001.png";
        numberPl1.setAttribute("style", "z-index: 2;");
        // animFix.setAttribute("src", "image/Image 005.png");
        // animFix.setAttribute("style", "background-color:red;");
        //  total1.style.backgroundImage = "url('')";
        // total1.style.backgroundImage = "url('image/Image 005.png')";
    }, 4400);
});
//******La fonction numberPl1 engendre l'animation et appelle les chiffres du résultat*****

// ***************animation en 2 dimensions GSAP***************

init();
setLight();
loadGLTF();
animate();