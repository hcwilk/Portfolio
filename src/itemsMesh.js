
import * as THREE from 'three';
import { TextGeometry } from 'three/src/geometries/TextGeometry';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry.js';


const positions = [
    { x: -20, y: -15, z: 0, URL: 'https://www.linkedin.com/in/harrison-cole-wilkinson-528310191/', image: 'images/linked.png' },
    { x: 0, y: -23, z: 0, URL: "/files/Cole_Wilkinson_Resume.pdf", image: 'images/resume.png' },
    { x: 20, y: -15, z: 0, URL: "#contact", image: 'images/mail.png' },
    { x: 20, y: 10, z: 0 },
    { x: -20, y: 10, z: 0 },
    { x: 0, y: 18, z: 0 }
];

async function createItemMesh() {
    return new Promise((resolve, reject) => {
        const bigGroup = new THREE.Group();
        for (let i = 0; i < positions.length; i++) {

            const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
            const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
            const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);

            const group = new THREE.Group();

            group.add(sphereMesh);

            const textureLoader = new THREE.TextureLoader();
            const decalTexture = textureLoader.load(positions[i].image);

            const decalMaterial = new THREE.MeshPhongMaterial({
                map: decalTexture,
                transparent: true,
                depthTest: true,
                depthWrite: false,
                polygonOffset: true,
                polygonOffsetFactor: -4,
            });

            // Decal size and position
            const decalSize = new THREE.Vector3(7, 7, 7);
            const decalPosition = new THREE.Vector3(0, 0, 5); // Front of the sphere
            const decalRotation = new THREE.Euler();

            const decalGeometry = new DecalGeometry(sphereMesh, decalPosition, decalRotation, decalSize);
            const decalMesh = new THREE.Mesh(decalGeometry, decalMaterial);
            group.add(decalMesh);
            group.position.set(positions[i].x, positions[i].y, positions[i].z);
            group.name = `item-${i}`;
            group.userData = { URL: positions[i].URL };
            if (i == 1) {
                group.userData.isResume = true;
            }
            bigGroup.add(group);
        }
        resolve(bigGroup);

    }, undefined, function (error) {
        console.error(error);
        reject(error);
    });
}

export { createItemMesh };
