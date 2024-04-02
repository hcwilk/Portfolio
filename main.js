import './style.css';
import * as THREE from 'three';
import { TextGeometry } from 'three/src/geometries/TextGeometry';
import test from "./node_modules/three/examples/fonts/droid/droid_sans_regular.typeface.json"
import { createTextMesh } from './src/textMesh';
import { scene, camera, renderer, controls, appendRendererToDOM } from './src/sceneSetup';


async function init() {
    const textMesh = await createTextMesh();
    scene.add(textMesh);
    animate();
}

init(); // Call the async function

appendRendererToDOM('threejs-container');


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

let intersected = false; // Track if we're currently intersecting the object

function checkIntersection() {
    console.log("checkIntersection")
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects([textMesh]); // Assuming textMesh is in scope
    console.log(intersects)

    if (intersects.length > 0) {
        if (!intersected) {
            // Change color only if it wasn't already changed on a previous check
            textMesh.material.color.set(0xff0000); // Change to desired hover color
            intersected = true;
        }
    } else {
        if (intersected) {
            // Reset color only if it was changed on a previous check
            textMesh.material.color.set(0xffffff); // Change back to original color
            intersected = false;
        }
    }
}


function animate() {
    requestAnimationFrame(animate);

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();


