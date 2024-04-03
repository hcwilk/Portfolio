
import * as THREE from 'three';
import { TextGeometry } from 'three/src/geometries/TextGeometry';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';

async function createItemMesh() {
    return new Promise((resolve, reject) => {
        const geometry = new THREE.SphereGeometry(5, 32, 16);

        // light gray hex:
        //  
        const material = new THREE.MeshStandardMaterial({ color: 0xffff00 });
        const sphere = new THREE.Mesh(geometry, material);

        sphere.position.x = 20;
        sphere.position.y = 10;
        resolve(sphere);
    }, undefined, function (error) {
        console.error(error);
        reject(error);
    });
}

export { createItemMesh };
