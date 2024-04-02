import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TextGeometry } from 'three/src/geometries/TextGeometry';
import test from "./node_modules/three/examples/fonts/droid/droid_sans_regular.typeface.json"
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';



// Header fade in
document.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    if (scrollPosition > 250) {
        header.style.opacity = 1;
    } else {
        header.style.opacity = 0;
    }
});


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


const ttfLoader = new TTFLoader();
console.log(ttfLoader)
ttfLoader.load('./fonts/Atmospheric-rg4aL.ttf', function (buffer) {
    const json = new THREE.FontLoader().parse(buffer); // This line may be incorrect if it doesn't parse to Three.js font JSON format
    console.log('json stuff here', json)
    const textGeometry = new TextGeometry("Cole Wilkinson", {
        font: json,
        size: 5,
        height: 1.0
    });

    textGeometry.center();

    const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const textMesh = new THREE.Mesh(textGeometry, textMaterial);
    textMesh.position.y = 0; // Adjust as needed
    textMesh.position.x = 0; // Adjust as needed
    scene.add(textMesh);
}, undefined, function (error) {
    console.log('here')
    console.error(error);
});

camera.position.z = 50;



const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;

// Use the ID of the div where you want to put the Three.js canvas
const threejsContainer = document.getElementById('threejs-container');
threejsContainer.appendChild(renderer.domElement);


window.addEventListener('mousemove', onMouseMove, false);

function onMouseMove(event) {
    // Calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    // Set the scene or camera rotation based on the mouse position
    // Here, we're applying a small rotation to the scene. Adjust the factors to control the sensitivity.
    const maxRotationAngle = Math.PI / 180 * 50; // Max rotation of 5 degrees
    scene.rotation.y = maxRotationAngle * mouseX / 2; // Rotate around y-axis based on mouse x-position
    scene.rotation.x = -1 * maxRotationAngle * mouseY; // Rotate around x-axis based on mouse y-position
}


function animate() {
    requestAnimationFrame(animate);

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();


