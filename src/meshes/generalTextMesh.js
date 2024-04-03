
import * as THREE from 'three';
import { TextGeometry } from 'three/src/geometries/TextGeometry';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';

async function createGeneralTextMesh({ text }) {
    return new Promise((resolve, reject) => {
        const ttfLoader = new TTFLoader();
        ttfLoader.load('fonts/Atmospheric-rg4aL.ttf', function (buffer) {
            const font = new THREE.FontLoader().parse(buffer);


            const textGeometry = new TextGeometry(text, {
                font: font,
                size: 2,
                height: 1.0,
            });

            const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
            const textMesh = new THREE.Mesh(textGeometry, textMaterial);

            // Vertical offset
            textMesh.position.y = -10;

            textGeometry.computeBoundingBox();
            textGeometry.center();

            resolve(textMesh);
        }, undefined, function (error) {
            console.error(error);
            reject(error);
        });
    });
}

export { createGeneralTextMesh };
