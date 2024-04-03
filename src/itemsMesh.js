
import * as THREE from 'three';
import { TextGeometry } from 'three/src/geometries/TextGeometry';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry.js';


async function createItemMesh() {
    return new Promise((resolve, reject) => {
        const sphereGeometry = new THREE.SphereGeometry(5, 32, 32);
        const sphereMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
        const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);

        const group = new THREE.Group();

        group.add(sphereMesh);

        const textureLoader = new THREE.TextureLoader();
        const decalTexture = textureLoader.load('images/linked.png');

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
        group.position.set(20, 10, 0)
        resolve(group);

    }, undefined, function (error) {
        console.error(error);
        reject(error);
    });
}

export { createItemMesh };
