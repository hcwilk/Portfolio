import * as THREE from 'three';
import { TextGeometry } from 'three/src/geometries/TextGeometry';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';
import { isMobile } from '../utils/isMobile';

async function createTextMesh() {
    return new Promise((resolve, reject) => {
        const ttfLoader = new TTFLoader();
        ttfLoader.load('/fonts/SFNSText-SemiBold.ttf', function (buffer) {
            const font = new THREE.FontLoader().parse(buffer);

            const lines = ["Cole", "Wilkinson"];
            const group = new THREE.Group();

            lines.forEach((line, index) => {
                const textGeometry = new TextGeometry(line, {
                    font: font,
                    size: isMobile() ? 3 : 6,
                    height: 1.2,
                });

                const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
                const textMesh = new THREE.Mesh(textGeometry, textMaterial);

                // Vertical offset
                textMesh.position.y = -index * 7;

                textGeometry.computeBoundingBox();
                textGeometry.center();

                group.add(textMesh);
            });

            group.position.y = (lines.length - 1) * 3.5; // Adjust to vertically center the group of lines
            group.name = `name`;
            group.userData = { URL: '#about' };
            resolve(group);
        }, undefined, function (error) {
            console.error(error);
            reject(error);
        });
    });
}

export { createTextMesh };
