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
// let tl = gsap.timeline();
tl = gsap.timeline({ paused: true });
// GSAP Contrôleur d'animation

let Mesh;

function loadGLTF() {
    let balloonLoader = new THREE.GLTFLoader();
    balloonLoader.load("model-3d/DE3.gltf", (gltf) => {
        Mesh = gltf.scene;
        Mesh.scale.set(1, 1, 1);
        Mesh.position.y = 0;
        scene.add(Mesh);

        // GUI pour contrôler les objets et avoir la reference position source
        gui.add(Mesh.rotation, "x").min(0).max(9);
        gui.add(Mesh.rotation, "y").min(0).max(9);
        gui.add(Mesh.rotation, "z").min(0).max(9);

        tl.to(Mesh.rotation, { y: 4.7, duration: 1 });
        tl.to(Mesh.scale, { x: 0.5, y: 0.5, z: 0.5, duration: 1 }, "-=1");
        tl.to(Mesh.position, { x: 0.5 });
        tl.to(Mesh.rotation, { y: 4.1, duration: 1 });
        tl.to(Mesh.scale, { x: 0.55, x: 0.55, z: 0.55, duration: 1 }, "-=1");
        //  retour
        tl.to(Mesh.rotation, { y: 0, duration: 1 });
        tl.to(Mesh.position, { x: 0 });
        tl.to(Mesh.scale, { x: 1, y: 1, z: 1, duration: 1 }, "-=1");

        // Play() pour animer juste après le chargement
        // ce qui permet de metre une pause en cours d'animation sur un click par exemple !
        // tl.play();
    });
}
bouton.onclick = function() {
    // Restart() pour animer à chaque click
    tl.restart();

    // Play() pour animer qu'une seule fois
    // tl.play();

    // Pause()  Maitre en pause pendant une animation
    // tl.pause()
};

const animate = () => {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
};

let teste = $(".carrer");

const animateCube = () => {
    $("#bouton").click(function() {
        teste
            .delay(500)
            .velocity({ backgroundColor: "#2b37e2" })
            .velocity({ translateX: 200 })
            .velocity({ translateY: 200 })
            .velocity({ translateX: -50 })
            .velocity({ translateY: -50 })
            .velocity({ backgroundColor: "#40e22b" })
            .velocity({ rotateZ: "+=90" });
    });
};

animateCube();

init();
setLight();
loadGLTF();
animate();