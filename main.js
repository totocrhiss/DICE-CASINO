let domCanvas = document.querySelector("#canvas");
let bouton = document.querySelector("#bouton");
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

window.addEventListener("resize", onResize, false);

function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function init() {
    // scene.background = new THREE.Color("black");
    camera.position.set(0, 5, 3.5);

    camera.lookAt(0, 0, 0);
    scene.fog = new THREE.Fog(0x000000, 0.08);

    renderer.setSize(window.innerWidth, window.innerHeight);
}

let light, light1;

function setLight() {
    light = new THREE.PointLight(0xffffff, 5, 20, 7);
    light.position.set(4.328, 0.954, 2.168);
    light1 = new THREE.PointLight(0xffffff, 5, 20, 10);
    light1.position.set(-0.14, 5.387, 0);
    scene.add(light1, light);
}

// -------------------------------------------------------------

// -------------------------------------------------------------
// GUI pour contrôler les objets et avoir la reference position source
const gui = new dat.GUI();
// GUI pour contrôler les objets et avoir la reference position source

// GSAP Contrôleur d'animation
let tl = gsap.timeline({ paused: true });
// GSAP Contrôleur d'animation

let Mesh;

function loadGLTF() {
    let balloonLoader = new THREE.GLTFLoader();
    balloonLoader.load("model-3d/dice.gltf", (gltf) => {
        Mesh = gltf.scene;
        Mesh.scale.set(1, 1, 1);
        console.log("cube" + Mesh.rotation.y);
        // Mesh.position.y = 0;
        scene.add(Mesh);

        // GUI pour contrôler les objets et avoir la reference position source
        gui.add(Mesh.rotation, "x").min(0).max(9);
        gui.add(Mesh.rotation, "y").min(0).max(9);
        gui.add(Mesh.rotation, "z").min(0).max(9);
    });
}

bouton.addEventListener("click", () => {
    tl.play();

    AnimationOfDiceForPlayer_1();
});

// ***************Animation du dé pour le joueur 1***************
let AnimationOfDiceForPlayer_1 = () => {
    // fonction aléatoire
    // let randomY = gsap.utils.random([90, 180, 270, 360, 450, 540, 630, 720]);
    // let randomY = gsap.utils.random([450, 540, 630, 720, 810, 900, 990, 1080]);
    // let randomX = gsap.utils.random([90, 180, 270, 360, 1170, 1260, 1350, 1440]);
    // let randomX = gsap.utils.random([450, 540, 630, 720]);
    // let randomX = gsap.utils.random([90, 180, 270, 360, 450, 540, 630, 720]);
    // fonction aléatoire
    // let valeur = (randomY + randomX) / 2;
    //  console.log(`degré Y ${degY}`);
    //  console.log(`degré X ${degX}`);

    // console.log(`degré Y ${randomY} + degré X ${randomX} = ${randomY + randomX}/2 = ${valeur} `);
    // console.log(`degré X ${valeur}`);
    // let randomY = gsap.utils.random([810, 900, 990, 1080]);
    let randomY = gsap.utils.random([450, 540, 630, 720, 810, 900, 990, 1080]);
    //  let randomY = gsap.utils.random([450, 540, 630, 720]);
    // let randomX = gsap.utils.random([90, 180, 270, 360]);
    // let randomX = gsap.utils.random([1170, 1260, 1350, 1440]);
    let randomX = gsap.utils.random([90, 180, 270, 360, 1170, 1260, 1350, 1440]);
    // let randomY = gsap.utils.random([990]);
    // let randomX = gsap.utils.random([1170]);
    let degY = (randomY * Math.PI) / 180.0;
    let degX = (randomX * Math.PI) / 180.0;
    gsap.to(Mesh.rotation, { y: degY, x: degX, duration: 1 });
    console.log(`degré Y ${randomY}`);
    console.log(`degré X ${randomX}`);
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
        console.log("numéro °= 6");
    } else {
        console.log("non défini");
    }
};
// ***************Animation du dé pour le joueur 1***************

// ***************retourner la valeur du dé, avec les  axes x et y dans un switch***************
// if (randomY === 90 || randomY === 180) {
//     console.log("ca fonctionne");
// }

// ***************retourner la valeur du dé, avec les  axes x et y dans un switch***************

const animate = () => {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
};

// ***************animation en 2 dimensions GSAP***************
let cr = gsap.timeline({ pause: true });

// suppression de la visibilité du carrer (DIV)
document.querySelector(".carrer").style.display = "none";
// suppression de la visibilité du carrer (DIV)

bouton.addEventListener("click", () => {
    cr.to(".carrer", { rotation: 27, x: 100, duration: 1 });
});

// ***************animation en 2 dimensions GSAP***************

init();
setLight();
loadGLTF();
animate();