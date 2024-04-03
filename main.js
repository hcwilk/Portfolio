import './style.css';
import { createTextMesh } from './src/textMesh';
import { createItemMesh } from './src/itemsMesh';
import { scene, camera, renderer, controls, appendRendererToDOM } from './src/sceneSetup';

import * as THREE from 'three';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let textMesh; // Declare the textMesh variable in the global scope
let sphereMesh; // Declare the sphereMesh variable in the global scope
async function init() {
    textMesh = await createTextMesh();
    sphereMesh = await createItemMesh();

    scene.add(textMesh);
    scene.add(sphereMesh);
    animate();
}

init(); // Call the async function

appendRendererToDOM('threejs-container');

// stuff

window.addEventListener('click', onDocumentMouseClick, false);

function onDocumentMouseClick(event) {
    console.log('Mouse clicked');
    // Calculate mouse position in normalized device coordinates (-1 to +1) for both components
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersecting the picking ray. Assume your text mesh is in an array of clickable objects.
    const intersects = raycaster.intersectObjects([textMesh, itemMesh], true);

    console.log(intersects);

    // Check if the text mesh was clicked and perform an action
    for (let i = 0; i < intersects.length; i++) {
        if (intersects[i].object === textMesh) { // Assuming textMesh is in the scope
            // Perform action if the textMesh is clicked
            console.log('Text mesh was clicked');
            // You can call any function here, such as opening a link, or displaying information
        }
    }
}

// stuff

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
    // sphereMesh.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();


