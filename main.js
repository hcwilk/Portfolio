import './style.css';
import { createTextMesh } from './src/textMesh';
import { createItemMesh } from './src/itemsMesh';
import { scene, camera, renderer, controls, appendRendererToDOM } from './src/sceneSetup';

import * as THREE from 'three';

const raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

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
    // ... (existing mouse position calculation code)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersecting the picking ray.
    const intersects = raycaster.intersectObjects(scene.children, true);

    console.log(intersects);

    // Check if a sphere was clicked and perform an action
    for (let i = 0; i < intersects.length; i++) {
        let object = intersects[i].object;
        // Traverse up the parent nodes to find the group with userData
        console.log('iteration:', i)
        while (object.parent && !object.userData['URL']) {
            console.log('Object without userData:', object);
            object = object.parent;
        }
        console.log('Object with userData:', object);
        // Check if the group with userData was found
        if (object.userData) {
            if (object.userData.isResume) {
                // If it's the resume sphere, trigger the download
                const link = document.createElement('a');
                link.href = object.userData['URL'];
                console.log('Resume URL:', object.userData['URL']);
                link.download = 'Cole_Wilkinson_Resume.pdf'; // Suggest a filename for download
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                console.log('Resume download triggered');
            } else if (object.userData['URL']) {
                // For other spheres, redirect to the URL
                window.location.href = object.userData['URL'];
                console.log('Redirecting to URL:', object.userData['URL']);
            }
            break; // Stop the loop after processing the clicked sphere
        }
    }
}


// stuff

window.addEventListener('mousemove', onMouseMove, false);

let INTERSECTED;
function onMouseMove(event) {
    // Calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    mouse.x = mouseX;
    mouse.y = mouseY;
    // Set the scene or camera rotation based on the mouse position
    // Here, we're applying a small rotation to the scene. Adjust the factors to control the sensitivity.
    const maxRotationAngle = Math.PI / 180 * 30; // Max rotation of 5 degrees
    scene.rotation.y = maxRotationAngle * mouseX / 2; // Rotate around y-axis based on mouse x-position
    scene.rotation.x = -1 * maxRotationAngle * mouseY; // Rotate around x-axis based on mouse y-position


    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(sphereMesh.children, true);

    if (intersects.length > 0) {
        // Refer to the parent group of the intersected object
        const intersectedGroup = intersects[0].object.parent;

        // Check if the object is not already the one being intersected
        if (INTERSECTED != intersectedGroup) {
            // Restore previous intersection object to its original scale if it exists
            if (INTERSECTED) {
                INTERSECTED.scale.set(1, 1, 1);
                INTERSECTED.rotation.set(0, 0, 0);
            }

            // Store reference to the intersected group
            INTERSECTED = intersectedGroup;

            // Scale up the new intersected group
            INTERSECTED.scale.set(1.2, 1.2, 1.2); // Adjust scale factors to your liking
            const lookAtPosition = new THREE.Vector3();
            camera.getWorldPosition(lookAtPosition);
            INTERSECTED.lookAt(lookAtPosition);

        }
    } else {
        // If there are no intersections and we have an intersected group, restore its scale
        if (INTERSECTED) {
            INTERSECTED.scale.set(1, 1, 1);
            INTERSECTED.rotation.set(0, 0, 0); // Reset rotation if you want
        }


        // Remove the reference to the intersected group
        INTERSECTED = null;
    }



}




function animate() {
    requestAnimationFrame(animate);

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    // sphereMesh.rotation.y += 0.01;

    renderer.render(scene, camera);
}

animate();


