const domCanvas = document.querySelector("#canvas");
const bouton = document.querySelector("#bouton");
const soundToon = document.querySelectorAll(".audio");
const focusPlay = document.querySelector("#focusPlay");
const centre_roulette = document.querySelector(".centre_roulette");
const roulette = document.querySelector(".roulette");
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

// Initializes the dimensions according to the screen size
window.addEventListener("resize", onResize, false);

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
// Initializes the dimensions according to the screen size

const x_500 = window.matchMedia("(min-width: 500px)");

function mediaQuery_Dice_500(x) {
    if (x.matches) {
        camera.position.set(0, 5, 3.5);
    } else {
        camera.position.set(0, 7, 3.5);
    }
}
x_500.addListener(mediaQuery_Dice_500);

function init() {
    // Position of the camera at the beginning
    mediaQuery_Dice_500(x_500); // Fonction d'écoute d'appel au moment de l'exécution
    // camera.position.set(0, 5, 3.5);
    // Position of the camera at the beginning

    // Initialize the object in the center of the scene in absolute
    camera.lookAt(0, 0, 0);
    scene.fog = new THREE.Fog(0x000000, 0.08);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // Initialize the object in the center of the scene in absolute
}

// Setting up the lights for the dice
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
// Setting up the lights for the dice

// GUI to check the objects and have the source position reference
// const gui = new dat.GUI();
// GUI to check the objects and have the source position reference

// GSAP Animation controller
// let tl = gsap.timeline({ paused: true });
// GSAP Animation controller

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

let plateauMesh;
let Mesh;

function loadGLTF() {
    // Loading the tray object and scaling
    const plateau = new THREE.GLTFLoader();
    plateau.load("model-3d/plateau.gltf", (gltf1) => {
        plateauMesh = gltf1.scene;
        plateauMesh.scale.set(0.3, 0.3, 0.3);
        plateauMesh.position.y = -10;
        plateauMesh.rotation.x = -0.3;
        scene.add(plateauMesh);
    });
    // Loading the tray object and scaling

    // Loading the dice object and scaling
    const dice = new THREE.GLTFLoader();
    dice.load("model-3d/dice.glb", (gltf) => {
        Mesh = gltf.scene;
        Mesh.scale.set(0.5, 0.5, 0.5);

        scene.add(Mesh);
        // Loading the dice object and scaling

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
// numéro 7: le son du gagnant - number 7: the sound of the winner
// numéro 8: Whoosh            - number 8: Whoosh
// numéro 9: bouton clic       - number 9: button click

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

// Instantiate the sound
// const sound = new Sound();
// Instantiate the sound

// playlist
// numéro 0: le lancer de dé   - number 0: the roll of dice
// numéro 1: le ressort        - number 1: the spring
// numéro 2: le looser         - number 2: the looser
// numéro 3: la petite cloche  - number 3: the little bell
// numéro 4: l'armement        - number 4: the armament
// numéro 5: le relâchement    - number 5: the release
// numéro 6: le roulement      - number 6: the roller
// numéro 7: le son du gagnant - number 7: the sound of the winner
// numéro 8: Whoosh            - number 8: Whoosh
// numéro 9: bouton clic       - number 9: button click

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

// Action click on the dice
window.addEventListener("click", onPointerMove);
// Action click on the dice

// *******variable declaration*******
initPL1();
initPL2();
let number = [0];
let totalNumberPl1 = 0;
let totalNumberPl2 = 0;
// *******variable declaration*******

const AnimationOfDiceForPlayer = () => {
    // random function
    const randomY = gsap.utils.random([450, 540, 630, 720, 810, 900, 990, 1080]);
    const randomX = gsap.utils.random([
        90, 180, 270, 360, 1170, 1260, 1350, 1440,
    ]);
    // random function

    // Convert degrees to radians
    const degY = (randomY * Math.PI) / 180.0;
    const degX = (randomX * Math.PI) / 180.0;
    // Convert degrees to radians

    // dice animation
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
    // dice animation

    // Check the x and y value of the dice
    // console.log(`degré Y ${randomY}`);
    // console.log(`degré X ${randomX}`);
    // Check the x and y value of the dice

    // Instantiate the sound
    const sound = new Sound();
    // Instantiate the sound

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
        }, 2500);
    } else if (switched == 2) {
        setTimeout(() => {
            valuePL2.innerText = number.reduce(addsUpPoints);
            switchPlayer();
        }, 2500);
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

// ***************dice animation 3D (THREE.JS)***************
const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};
// ***************dice animation 3D (THREE.JS)***************

//************************************************************

// ***************2D animation***************

//////// WINNER ////////
function winner() {
    if (totalPl1 >= 100) {
        number = 100;
        setTimeout(() => {
            animationWinnerOn();
        }, 4000);
    } else if (totalPl2 >= 100) {
        number = 100;

        setTimeout(() => {
            animationWinnerOn();
        }, 4000);
    }
}

let name_winner;

function animation_Name_Winner() {
    if (totalPl1 >= 100) {
        document.querySelector(
            ".name_winner"
        ).innerText = `WINNER  ${namePlayer1.toUpperCase()}  WINNER`;
    } else if (totalPl2 >= 100) {
        document.querySelector(
            ".name_winner"
        ).innerText = `WINNER  ${namePlayer2.toUpperCase()}  WINNER`;
    }
}

function stopFocus() {
    if (totalPl1 >= 100 || totalPl2 >= 100) {
        null;
    } else if (totalPl1 < 100 && switched == 2) {
        focusPL2();
    } else if (totalPl2 < 100 && switched == 1) {
        focusPL1();
    }
}

function animationWinnerOff() {
    function visible() {
        // Instantiate the Style
        const css1 = new StyleCss();
        const css2 = new StyleCss();
        // Instantiate the Style

        css1.css(
            ".hidden1",
            "opacity: 0;transition: 0s;visibility: visible",
            0,
            "opacity: 1;transition: 2s",
            200
        );
        css2.css(
            ".hidden2",
            "opacity: 0;transition: 0s;visibility: visible",
            0,
            "opacity: 1;transition: 2s",
            200
        );
    }
    visible();

    // Instantiate the StyleCss
    const css1 = new StyleCss();
    const css3 = new StyleCss();
    // Instantiate the StyleCss

    css3.css(".name_winner", "opacity: 0;transition: 2s", 200);
    css1.css(
        ".boxRoulette",
        "transform: scale(1) translate(0vw, 0vh);transition:all 1s",
        200
    );
}

function animationWinnerOn() {
    function hidden() {
        // Instantiate the Style
        const css1 = new StyleCss();
        const css2 = new StyleCss();
        // Instantiate the Style

        css1.css(
            ".hidden1",
            "opacity: 0;transition: 2s",
            0,
            "opacity: 0;transition: 0s;visibility: hidden",
            2000
        );
        css2.css(
            ".hidden2",
            "opacity: 0;transition: 2s",
            0,
            "opacity: 0;transition: 0s;visibility: hidden",
            2000
        );
    }
    hidden();
    animation_Name_Winner();
    // Instantiate the sound
    const sound = new Sound();
    // Instantiate the sound

    sound.sound(7, 0);

    // Instantiate the StyleCss
    const css1 = new StyleCss();
    const css2 = new StyleCss();
    const css3 = new StyleCss();
    // Instantiate the StyleCss

    css1.css(
        ".boxRoulette",
        "transform: scale(1.3) translate(39.5vw, -20vh);transition:all 1s",
        2200
    );
    css2.css(
        ".centre_roulette",
        "transform: rotate(10turn); transition: transform 10s cubic-bezier(0,-0.02,.04,1);",
        3300,
        "transform: rotate(7turn); transition: transform 10s cubic-bezier(.35,.37,0,1.01);",
        15300,
        "transform: rotate(9turn); transition: transform 20s cubic-bezier(.35,.37,0,1.01);",
        28300
    );

    css3.css(".name_winner", "opacity: 1;transition: 2s", 2200);
}
//////// WINNER ////////

//************************************************************

// ***************2D animation***************

const x_1000 = window.matchMedia("(min-width: 1000px)");

function mediaQuery_Focus_1000() {
    if (x_1000.matches && switched == 2) {
        return "transform: translateX(55.5vw) scale(0.8);border-radius: 2em;transition: all 2s;";
    } else if (x_1000.matches && switched == 1) {
        return "transform: translateX(0vw) scale(0.8);border-radius: 2em;transition: all 2s;";
    } else if (!x_1000.match && switched == 2) {
        return "transform: translateX(55.5vw);border-radius: 2em;transition: all 2s;";
    } else if (!x_1000.match && switched == 1) {
        return "transform: translateX(0vw);border-radius: 2em;transition: all 2s;";
    }
}

x_1000.addListener(mediaQuery_Focus_1000);

const focusCss = () => {
    // Instantiate the StyleCss
    const css = new StyleCss();
    // Instantiate the StyleCss

    css.css(
        "#focusPlay",
        "transform: translateX(33vw) scale(1.2);border-radius: 2em;transition: 2s",
        500,
        mediaQuery_Focus_1000(x_1000),
        1500
    );
};

function focusPL1() {
    focusCss();
}

function focusPL2() {
    focusCss();
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
                stopFocus();
            }
            break;
        default:
            if (number == 0 && switched == 2) {
                switched = 1;
                focusPL1();
                stopFocus();
            }
    }
}

// ***************2D animation***************

//******The numberPl1 function generates the animation and calls the result figures*****
const numberPl1 = document.getElementById("numberPl1");
const startPl1 = document.getElementById("startPl1");
let totalPl1;

numberPl1.addEventListener("click", () => {
    if (switched == 2 || number == 0) {
        // console.log(null);
        return null;
    } else {
        // Instantiate the sound
        const sound = new Sound();
        // Instantiate the sound

        // numéro 4: l'armement        - number 4: the armament
        // numéro 5: le relâchement    - number 5: the release
        // numéro 6: le roulement      - number 6: the roller
        sound.sound(4, 5, 5, 1150, 6, 3300);

        // cr.to(".carrer", { rotation: 27, x: 100, duration: 1 });
        totalPl1 = totalNumberPl1 + number.reduce(addsUpPoints);
        loadImageNumber(totalPl1);
        winner();

        // 3D Jackpot gif animation created with the blender software
        startPl1.src = "model-3d/JackpotGif_3D_600dpi-min.gif";
        // 3D Jackpot gif animation created with the blender software

        setTimeout(() => {
            numberPl1.setAttribute("style", "z-index: 0;");
            // console.log(number);
        }, 1450);

        setTimeout(() => {
            numberPl1.src = `image/Image ${number}.png`;
            // console.log(number);
        }, 1550);

        setTimeout(() => {
            numberPl1.setAttribute("style", "z-index: 2;");
            totalNumberPl1 = totalPl1;
            number = [0];
            switched = 2;
            initPL1();
            stopFocus();
            animate();
        }, 3500);
    }
});
//******The numberPl1 function generates the animation and calls the result figures*****

//******The numberPl2 function generates the animation and calls the result figures****

let totalPl2;

numberPl2.addEventListener("click", () => {
    if (switched == 1 || number == 0) {
        console.log(null);
        return null;
    } else {
        // Instantiate the sound
        const sound = new Sound();
        // Instantiate the sound

        // numéro 4: l'armement        - number 4: the armament
        // numéro 5: le relâchement    - number 5: the release
        // numéro 6: le roulement      - number 6: the roller
        sound.sound(4, 5, 5, 1150, 6, 3300);

        totalPl2 = totalNumberPl2 + number.reduce(addsUpPoints);
        loadImageNumber(totalPl2);
        winner();
        // 3D Jackpot gif animation created with the blender software
        startPl2.src = "model-3d/JackpotGif_3D_600dpi-min.gif";
        // 3D Jackpot gif animation created with the blender software

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
            stopFocus();
            animate();
        }, 3500);
    }
});
//******The numberPl2 function generates the animation and calls the result figures*****

// Playing the game rules

function_rule_modal();
document.querySelector("#rule").addEventListener("click", () => {
    // Instantiate the sound
    const sound1 = new Sound();
    // Instantiate the sound
    sound1.sound(8, 800);

    const css1 = new StyleCss();
    const css2 = new StyleCss();

    css1.css(
        ".fixed_rule",
        "visibility: visible;transform: translateY(100vh);transition: transform 1.8s;",
        500
    );
    css2.css(".rule-game-modal", "visibility: visible;", 10);

    window.removeEventListener("click", onPointerMove);
});
// Playing the game rules

// end of playing the game rule
document.querySelector(".btn").addEventListener("click", () => {
    // Instantiate the sound
    const sound2 = new Sound();
    // Instantiate the sound
    sound2.sound(9, 0);

    const css3 = new StyleCss();
    const css4 = new StyleCss();

    css3.css(
        ".fixed_rule",
        "visibility: visible;transform: translateY(-100vh);transition: transform 1.8s;",
        500,
        "visibility: hidden;",
        2000
    );
    css4.css(".rule-game-modal", "visibility: hidden;", 2500);
    window.addEventListener("click", onPointerMove);
});
// end of playing the game rule

// initialize player names
let name1, name2, namePlayer1, namePlayer2;

name_play_start();
const start = document.querySelector(".button");
start.addEventListener("click", (event) => {
    namePlayer1 = document.querySelector("#player_name1").value;
    namePlayer2 = document.querySelector("#player_name2").value;
    name1 = document.querySelector(".name1");
    name2 = document.querySelector(".name2");

    const css = new StyleCss();
    if (namePlayer1.length > 10 || namePlayer2.length > 10) {
        document.querySelector(".alert1").innerText = "10 lettres maximum !";

        css.css(
            ".alert1",
            "opacity: 1;transition: opacity 2s;color: red;font-size: max(2vw, 20px);",
            100,
            "opacity: 0;transition: opacity 2s;color: red;font-size: max(2vw, 20px);",
            3000
        );

        setTimeout(() => {
            document.querySelector(".alert1").innerText = "";
        }, 3500);

        event.preventDefault();
    } else if (namePlayer1.length == 0 && namePlayer2.length == 0) {
        namePlayer1 = `PLAYER 1`;
        namePlayer2 = `PLAYER 2`;
        name1.innerText = namePlayer1;
        name2.innerText = namePlayer2;
        playStart2();
    } else if (namePlayer1.length == 0 && namePlayer2.length >= 1) {
        name2.innerText = namePlayer2.toUpperCase();
        namePlayer1 = `PLAYER 1`;
        name1.innerText = namePlayer1;
        playStart2();
    } else if (namePlayer1.length >= 1 && namePlayer2.length == 0) {
        name1.innerText = namePlayer1.toUpperCase();
        namePlayer2 = `PLAYER 2`;
        name2.innerText = namePlayer2;
        playStart2();
    } else {
        name1.innerText = namePlayer1.toUpperCase();
        name2.innerText = namePlayer2.toUpperCase();
        playStart2();
    }
});

function playStart1() {
    // Instantiate the sound
    const sound = new Sound();
    // Instantiate the sound
    sound.sound(8, 1400);

    const css1 = new StyleCss();
    const css2 = new StyleCss();

    css1.css(".new-game-modal", "visibility: visible;", 10);
    css2.css(
        ".fixed",
        "visibility: visible;transform: translateY(15vh);transition: transform 1.8s;",
        500
    );
    window.removeEventListener("click", onPointerMove);
}

function playStart2() {
    // Instantiate the sound
    const sound = new Sound();
    // Instantiate the sound
    sound.sound(3, 0);

    const css1 = new StyleCss();
    const css2 = new StyleCss();
    const css3 = new StyleCss();

    css1.css(
        ".fixed",
        "visibility: visible;transform: translateY(-100vh);transition: transform 1.8s;",
        500,
        "visibility: hidden;transform: translateY(-100vh);",
        2000
    );
    css2.css(".new-game-modal", "visibility: hidden;", 2000);
    css3.css("#canvas", "opacity: 1;transition: opacity 6s;", 800);
    setTimeout(() => {
        animate();
        window.addEventListener("click", onPointerMove);
    }, 1000);
}
// initialize player names

// REPLAY---------------------------------
document.querySelector("#replay").addEventListener("click", () => {
    soundToon[7].pause();
    soundToon[7].currentTime = 0;
    animationWinnerOff();
    initPL1();
    initPL2();
    number = [0];
    totalNumberPl1 = 0;
    totalNumberPl2 = 0;
    name1.innerText = "";
    name2.innerText = "";
    numberPl1.src = `image/Image 000.png`;
    numberPl2.src = `image/Image 000.png`;
    switched = 1;
    focusPL1();
    playStart1();
});

playStart1();
init();
setLight();
loadGLTF();