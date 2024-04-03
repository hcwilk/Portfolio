import './style.css';
import { createBoxMesh } from './src/meshes/boxMesh';
import { createTextMesh } from './src/meshes/textMesh';
import { createGeneralTextMesh } from './src/meshes/generalTextMesh';
import { scene, camera, renderer, controls, appendRendererToDOM } from './src/sceneSetup';
import * as THREE from 'three';
import { TextGeometry } from 'three/src/geometries/TextGeometry';
import { createCubeMesh } from './src/meshes/dataMesh';

function addStarField() {
    const starsGeometry = new THREE.BufferGeometry();
    const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7 });

    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
        const x = THREE.MathUtils.randFloatSpread(2000);
        const y = THREE.MathUtils.randFloatSpread(2000);
        const z = THREE.MathUtils.randFloatSpread(2000);
        starVertices.push(x, y, z);
    }

    starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const stars = new THREE.Points(starsGeometry, starsMaterial);

    scene.add(stars);
}


let textMesh;
let boxMesh;
// let cubeMesh;
async function init() {
    textMesh = await createTextMesh();
    boxMesh = await createBoxMesh();
    // cubeMesh = await createCubeMesh();

    scene.add(textMesh);
    scene.add(boxMesh);
    // scene.add(cubeMesh);

    // addStarField();
    animate();

}

init();

appendRendererToDOM('threejs-container');


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', onDocumentMouseClick, false);

async function onDocumentMouseClick(event) {
    console.log('Mouse clicked');
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);

    for (let i = 0; i < intersects.length; i++) {
        let object = intersects[i].object;
        console.log('iteration:', i)
        while (object.parent && !object.userData['URL']) {
            console.log('Object without userData:', object);
            object = object.parent;
        }
        console.log('Object with userData:', object);
        if (object.userData) {
            if (object.userData.isResume) {
                const link = document.createElement('a');
                link.href = object.userData['URL'];
                console.log('Resume URL:', object.userData['URL']);
                link.download = 'Cole_Wilkinson_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                console.log('Resume download triggered');
            } else if (object.userData['URL']) {
                window.location.href = object.userData['URL'];
                console.log('Redirecting to URL:', object.userData['URL']);
            }
            break;
        }
    }
}




window.addEventListener('mousemove', onMouseMove, false);

let INTERSECTED;

async function onMouseMove(event) {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    mouse.x = mouseX;
    mouse.y = mouseY;
    const maxRotationAngle = Math.PI / 180 * 20;
    scene.rotation.y = maxRotationAngle * mouseX / 2;
    scene.rotation.x = -1 * maxRotationAngle * mouseY;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(boxMesh.children, true);

    if (intersects.length > 0) {
        const intersectedGroup = intersects[0].object.parent;
        document.body.style.cursor = 'pointer';




        if (INTERSECTED != intersectedGroup) {
            if (INTERSECTED) {
                INTERSECTED.scale.set(1, 1, 1);
                INTERSECTED.rotation.set(0, 0, 0);
                const previousLabel = INTERSECTED.children.find(obj => obj instanceof THREE.Mesh && obj.geometry instanceof TextGeometry);
                if (previousLabel) previousLabel.visible = false;

            }



            INTERSECTED = intersectedGroup;
            const currentLabel = INTERSECTED.children.find(obj => obj instanceof THREE.Mesh && obj.geometry instanceof TextGeometry);
            if (currentLabel) currentLabel.visible = true;

            INTERSECTED.scale.set(1.2, 1.2, 1.2);
            const lookAtPosition = new THREE.Vector3();
            camera.getWorldPosition(lookAtPosition);
            INTERSECTED.lookAt(lookAtPosition);

        }
    } else {
        document.body.style.cursor = 'auto';
        if (INTERSECTED) {

            INTERSECTED.scale.set(1, 1, 1);
            INTERSECTED.rotation.set(0, 0, 0);
            const label = INTERSECTED.children.find(obj => obj instanceof THREE.Mesh && obj.geometry instanceof TextGeometry);
            if (label) label.visible = false;

        }
        INTERSECTED = null;
    }
}




function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();


