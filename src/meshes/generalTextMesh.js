
import * as THREE from 'three';
import { TextGeometry } from 'three/src/geometries/TextGeometry';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader.js';

async function createGeneralTextMesh(text) {
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
        textMesh.position.set(0, -10, 0);

        return textMesh;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export { createGeneralTextMesh };
