

import * as THREE from 'three';
import { TextGeometry } from 'three/src/geometries/TextGeometry';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry.js';
import { positions } from '../data/orbs';


async function createCubeMesh() {
    return new Promise(async (resolve, reject) => {
        // create a box
        const box = new THREE.BoxGeometry(10, 10, 10);
        // create a material, colour or image texture
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        // create a mesh
        const cube = new THREE.Mesh(box, material);

        cube.position.set(0, 0, 0);



        resolve(cube);


    }, undefined, function (error) {
        console.error(error);
        reject(error);
    });
}

export { createCubeMesh };
