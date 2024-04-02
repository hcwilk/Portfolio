import * as THREE from 'three';
import { TextGeometry } from 'three/src/geometries/TextGeometry';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';

async function createTextMesh() {
    return new Promise((resolve, reject) => {
        const ttfLoader = new TTFLoader();
        ttfLoader.load('fonts/Atmospheric-rg4aL.ttf', function (buffer) {
            const font = new THREE.FontLoader().parse(buffer);

            // Split your text into lines
            const lines = ["Cole", "Wilkinson"];
            const group = new THREE.Group();

            lines.forEach((line, index) => {
                const textGeometry = new TextGeometry(line, {
                    font: font,
                    size: 5,
                    height: 1.0,
                });

                const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
                const textMesh = new THREE.Mesh(textGeometry, textMaterial);

                // Offset each line vertically
                textMesh.position.y = -index * 7; // Adjust the multiplier for different line heights

                textGeometry.computeBoundingBox();
                textGeometry.center(); // This centers the geometry horizontally

                group.add(textMesh);
            });

            group.position.y = (lines.length - 1) * 3.5; // Adjust to vertically center the group of lines
            resolve(group);
        }, undefined, function (error) {
            console.error(error);
            reject(error);
        });
    });
}

export { createTextMesh };