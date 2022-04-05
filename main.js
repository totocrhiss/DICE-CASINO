const domCanvas = document.querySelector("#canvas");
const bouton = document.querySelector("#bouton");
const soundToon = document.querySelectorAll(".audio");
const focusPlay = document.querySelector("#focusPlay");
const scene = new THREE.Scene();
const initPL1 = () => {
    document.getElementById("valuePL1").innerHTML = 0;
    document.getElementById("startPl1").src = "image/Image.png";
};
const initPL2 = () => {
    document.getElementById("valuePL2").innerHTML = 0;
    document.getElementById("startPl2").src = "image/Image.png";
};
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
        AnimationOfDiceForPlayer();
    } else {
        null;
    }
}

let Mesh;

function loadGLTF() {
    //  Chargement de l'objet  plateau, et de mis a l'échelle
    const plateau = new THREE.GLTFLoader();
    plateau.load("model-3d/plateau.gltf", (gltf1) => {
        plateauMesh = gltf1.scene;
        plateauMesh.scale.set(0.3, 0.3, 0.3);
        plateauMesh.position.y = -10;
        plateauMesh.rotation.x = -0.3;
        scene.add(plateauMesh);
    });
    // Chargement de l'objet  plateau, et de mis a l'échelle

    //   Chargement de l'objet  dé, et de mis a l'échelle
    const dice = new THREE.GLTFLoader();
    dice.load("model-3d/dice.glb", (gltf) => {
        Mesh = gltf.scene;
        Mesh.scale.set(0.5, 0.5, 0.5);

        scene.add(Mesh);
        // Chargement de l'objet  dé, et de mis a l'échelle

        // GUI pour contrôler les objets et avoir la reference position source
        // gui.add(Mesh.rotation, "x").min(0).max(9);
        // gui.add(Mesh.rotation, "y").min(0).max(9);
        // gui.add(Mesh.rotation, "z").min(0).max(9);
        // GUI pour contrôler les objets et avoir la reference position source
    });
}

// -----------Class Creation Section for Javascript-----------

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
//  const sound = new Sound();
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

// to make Css styles with timing
// const css = new StyleCss();
// css.css("#valuePL1","color: red;font-size:8em;transition: all 2s;",2000,"color: blue;font-size:4em;transition: all 2s;",3000,"color: yellow;transition: all 2s;",4000);
// to make Css styles with timing

class StyleCss {
    constructor() {
        this.variable = "";
        this.style1 = "";
        this.time1 = 0;
        this.style2 = "";
        this.time2 = 0;
        this.style3 = "";
        this.time3 = 0;
        this.style4 = "";
        this.time4 = 0;
        this.style5 = "";
        this.time5 = 0;
    }
    css(
        variable,
        style1,
        time1,
        style2,
        time2,
        style3,
        time3,
        style4,
        time4,
        style5,
        time5
    ) {
        this.variable += variable;
        this.style1 += style1;
        this.time1 += time1;
        this.style2 += style2;
        this.time2 += time2;
        this.style3 += style3;
        this.time3 += time3;
        this.style4 += style4;
        this.time4 += time4;
        this.style5 += style5;
        this.time5 += time5;

        setTimeout(() => {
            document.querySelector(this.variable).style.cssText = this.style1;
        }, this.time1);

        if (style2 !== undefined) {
            setTimeout(() => {
                document.querySelector(this.variable).style.cssText = this.style2;
            }, this.time2);
        } else {
            null;
        }

        if (style3 !== undefined) {
            setTimeout(() => {
                document.querySelector(this.variable).style.cssText = this.style3;
            }, this.time3);
        } else {}
        null;
        if (style4 !== undefined) {
            setTimeout(() => {
                document.querySelector(this.variable).style.cssText = this.style4;
            }, this.time4);
        } else {}
        null;
        if (style5 !== undefined) {
            setTimeout(() => {
                document.querySelector(this.variable).style.cssText = this.style5;
            }, this.time5);
        } else {}
        null;
    }
}

// to make Css styles with timing
// const css = new StyleCss();
// css.css("#valuePL1","color: red;font-size:8em;transition: all 2s;",2000,"color: blue;font-size:4em;transition: all 2s;",3000,"color: yellow;transition: all 2s;",4000);
// to make Css styles with timing

// -----------Class Creation Section for Javascript-----------

// Action cliquer sur le dé
window.addEventListener("click", onPointerMove);
// Action cliquer sur le dé

// ***************Animation du dé***************

// *******Déclaration des variables*******
initPL1();
initPL2();
let number = [0];
let totalNumberPl1 = 0;
let totalNumberPl2 = 0;
// *******Déclaration des variables*******

const AnimationOfDiceForPlayer = () => {
    // fonction aléatoire
    const randomY = gsap.utils.random([450, 540, 630, 720, 810, 900, 990, 1080]);
    const randomX = gsap.utils.random([
        90, 180, 270, 360, 1170, 1260, 1350, 1440,
    ]);
    // fonction aléatoire

    // Convertir degrés en radians
    const degY = (randomY * Math.PI) / 180.0;
    const degX = (randomX * Math.PI) / 180.0;
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
    // console.log(`degré Y ${randomY}`);
    // console.log(`degré X ${randomX}`);
    // Contrôler la valeur x et y du dé

    // Instancier le son
    const sound = new Sound();
    // Instancier le son

    // ***************return the value of the dice, with the x and y axes***************
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

        number.push(1);

        // console.log("number °= 1");
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

        number.push(2);

        // console.log("number °= 2");
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

        number.push(3);

        // console.log("number °= 3");
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

        number.push(4);

        // console.log("number °= 4");
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

        number.push(5);

        // console.log("number °= 5");
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

        number.push(6);

        // console.log("number °= 6");
    } else {
        // console.log("undefined");
    }
    // ***************return the value of the dice, with the x and y axes***************

    const valuePL2 = document.querySelector("#valuePL2");
    const valuePL1 = document.querySelector("#valuePL1");

    // returns the sum add

    if (switched == 1) {
        setTimeout(() => {
            valuePL1.innerText = number.reduce(addsUpPoints);
            switchPlayer();
        }, 1600);
    } else if (switched == 2) {
        setTimeout(() => {
            valuePL2.innerText = number.reduce(addsUpPoints);
            switchPlayer();
        }, 1600);
    }
};

// returns the sum add

function addsUpPoints(total, num) {
    if (num !== 1) {
        return total + num;
    } else {
        number = [0];
        return 0;
    }
}

// ***************Animation du dé***************
const animate = () => {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
};
// ***************Animation du dé***************

//************************************************************
//////// PLAYERS ARRAY ////////
let player1 = {
    name: "",
    globalScore: 0,
    roundScore: 0,
};

let player2 = {
    name: "",
    globalScore: 0,
    roundScore: 0,
};
//////// PLAYERS ARRAY ////////

//************************************************************

// ***************animation en 2 dimensions***************

function focusPL1() {
    // Instancier le StyleCss
    const css = new StyleCss();
    // Instancier le StyleCss

    css.css(
        "#focusPlay",
        "transform: translateX(33vw) scale(1.2);border-radius: 2em;transition: 2s",
        500,
        "transform: translateX(0vw);border-radius: 7em;transition: all 2s;",
        1500
    );
}

function focusPL2() {
    // Instancier le StyleCss
    const css = new StyleCss();
    // Instancier le StyleCss
    css.css(
        "#focusPlay",
        "transform: translateX(33vw) scale(1.2);border-radius: 2em; transition: 2s",
        500,
        "transform: translateX(65.6vw);border-radius: 7em;transition: all 2s;",
        1500
    );
}

function loadImageNumber(value) {
    if (value < 10) {
        return (number = "00" + value);
    } else if (value > 9 && value < 100) {
        return (number = "0" + value);
    } else {
        return (number = "" + value);
    }
}

let switched = 1;
console.log(switched);

function switchPlayer() {
    switch (switched) {
        case 1:
            if (number == 0 && switched == 1) {
                switched = 2;
                focusPL2();
            }
            break;
        default:
            if (number == 0 && switched == 2) {
                switched = 1;
                focusPL1();
            }
    }
}
// roulette animation

let moveRoulette = document.querySelector(".centre_roulette");

moveRoulette.addEventListener("click", roulette_animation);

function roulette_animation() {
    css1 = new StyleCss();
    css2 = new StyleCss();

    css1.css(
        ".roulette",
        "transform: scale(1.5) translate(30vw, -25vh);transition:all 1s",
        200
    );
    css2.css(
        ".centre_roulette",
        "transform: scale(1.5) translate(30vw, -25vh);transition:all 1s",
        200,
        "transform: scale(1.5) translate(30vw, -25vh) rotate(10turn); transition: transform 10s cubic-bezier(0,-0.02,.04,1);",
        1300
    );
}
// roulette animation

//******La fonction numberPl1 engendre l'animation et appelle les chiffres du résultat*****
const numberPl1 = document.getElementById("numberPl1");
const startPl1 = document.getElementById("startPl1");
let totalPl1;

numberPl1.addEventListener("click", () => {
    if (switched == 2 || number == 0) {
        console.log(null);
        return null;
    } else {
        // Instancier le son
        const sound = new Sound();
        // Instancier le son

        // numéro 4: l'armement        - number 4: the armament
        // numéro 5: le relâchement    - number 5: the release
        // numéro 6: le roulement      - number 6: the roller
        sound.sound(4, 5, 5, 1150, 6, 3300);

        // cr.to(".carrer", { rotation: 27, x: 100, duration: 1 });
        totalPl1 = totalNumberPl1 + number.reduce(addsUpPoints);
        loadImageNumber(totalPl1);

        // animation du gif Jackpot en 3D crée avec blender
        startPl1.src = "model-3d/JackpotGif_3D_600dpi-min.gif";
        // animation du gif Jackpot en 3D crée avec blender

        setTimeout(() => {
            numberPl1.setAttribute("style", "z-index: 0;");
        }, 1450);

        setTimeout(() => {
            numberPl1.src = `image/Image ${number}.png`;
        }, 1550);

        setTimeout(() => {
            numberPl1.setAttribute("style", "z-index: 2;");
            totalNumberPl1 = totalPl1;
            number = [0];
            switched = 2;
            initPL1();
            focusPL2();
            animate();
        }, 3500);
    }
});
//******La fonction numberPl1 engendre l'animation et appelle les chiffres du résultat*****

//******La fonction numberPl2 engendre l'animation et appelle les chiffres du résultat****const

let totalPl2;

numberPl2.addEventListener("click", () => {
    if (switched == 1 || number == 0) {
        console.log(null);
        return null;
    } else {
        // Instancier le son
        const sound = new Sound();
        // Instancier le son

        // numéro 4: l'armement        - number 4: the armament
        // numéro 5: le relâchement    - number 5: the release
        // numéro 6: le roulement      - number 6: the roller
        sound.sound(4, 5, 5, 1150, 6, 3300);

        totalPl2 = totalNumberPl2 + number.reduce(addsUpPoints);
        loadImageNumber(totalPl2);

        // animation du gif Jackpot en 3D crée avec blender
        startPl2.src = "model-3d/JackpotGif_3D_600dpi-min.gif";
        // animation du gif Jackpot en 3D crée avec blender

        setTimeout(() => {
            numberPl2.setAttribute("style", "z-index: 0;");
        }, 1450);

        setTimeout(() => {
            numberPl2.src = `image/Image ${number}.png`;
        }, 1550);

        setTimeout(() => {
            numberPl2.setAttribute("style", "z-index: 2;");
            totalNumberPl2 = totalPl2;
            number = [0];
            switched = 1;
            initPL2();
            focusPL1();
            animate();
        }, 3500);
    }
});
//******La fonction numberPl2 engendre l'animation et appelle les chiffres du résultat*****

// ***************animation en 2 dimensions***************

init();
setLight();
loadGLTF();
animate();