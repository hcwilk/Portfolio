
import * as THREE from 'three';
import { TextGeometry } from 'three/src/geometries/TextGeometry';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry.js';
import { positions } from '../data/orbs';

async function createSphereLabel(text) {
    const ttfLoader = new TTFLoader();

    try {
        const buffer = await ttfLoader.loadAsync('fonts/Atmospheric-rg4aL.ttf');
        const font = new THREE.FontLoader().parse(buffer);

        const textGeo = new TextGeometry(text, {
            font: font,
            size: 1,
            height: 0.1,
        });

        const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const textMesh = new THREE.Mesh(textGeo, textMaterial);
        textMesh.visible = false;
        textMesh.position.set(5.2, 0, 0);

        return textMesh;
    } catch (error) {
        console.error(error);
        throw error;
    }
}



async function createSphereMesh() {
    return new Promise(async (resolve, reject) => {
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


            const label = await createSphereLabel(positions[i].label); // Replace with your actual text
            group.add(label);

            bigGroup.add(group);
        }
        resolve(bigGroup);

    }, undefined, function (error) {
        console.error(error);
        reject(error);
    });
}

export { createSphereMesh };
