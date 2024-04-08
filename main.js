import './style.css';
import './src/styles/footer.css'
import './src/styles/work.css'
import './src/styles/carousel.css'
import { createBoxMesh } from './src/meshes/boxMesh';
import { createTextMesh } from './src/meshes/textMesh';
import { createGeneralTextMesh } from './src/meshes/generalTextMesh';
import { scene, camera, renderer, appendRendererToDOM } from './src/sceneSetup';
import * as THREE from 'three';
import { TextGeometry } from 'three/src/geometries/TextGeometry';
import { isMobile } from './src/utils/isMobile';


// const buttons = document.querySelectorAll("[data-carousel-button]")

// buttons.forEach(button => {
//     button.addEventListener("click", () => {
//         const offset = button.dataset.carouselButton === "next" ? 1 : -1
//         const slides = button
//             .closest("[data-carousel]")
//             .querySelector("[data-slides]")

//         const activeSlide = slides.querySelector("[data-active]")
//         let newIndex = [...slides.children].indexOf(activeSlide) + offset
//         if (newIndex < 0) newIndex = slides.children.length - 1
//         if (newIndex >= slides.children.length) newIndex = 0

//         slides.children[newIndex].dataset.active = true
//         delete activeSlide.dataset.active
//     })
// })

// const galleryContainer = document.querySelector('.gallery-container');
// const galleryControlsContainer = document.querySelector('.gallery-controls');
// const galleryControls = ['previous', 'next'];

// const galleryItems = document.querySelectorAll('.gallery-item');

// class Carousel {

//     constructor(container, items, controls) {
//         this.carouselContainer = container;
//         this.carouselControls = controls;
//         this.carouselArray = [...items];

//     }

//     updateGallery() {
//         this.carouselArray.forEach(el => {
//             el.classList.remove('gallery-item-1');
//             el.classList.remove('gallery-item-2');
//             el.classList.remove('gallery-item-3');
//             el.classList.remove('gallery-item-4');
//             el.classList.remove('gallery-item-5');
//         });


//         this.carouselArray.slice(0, 5).forEach((item, index) => {
//             item.classList.add(`gallery-item-${index + 1}`);
//         })
//     }
//     setCurrentState(direction) {
//         console.log(direction);

//         if (direction.className === 'gallery-controls-previous') {
//             console.log('previous');
//             this.carouselArray.unshift(this.carouselArray.pop());
//         } else {
//             console.log('next');
//             this.carouselArray.push(this.carouselArray.shift());
//         }
//         this.updateGallery();
//     }

//     userControls() {
//         const trigger = [...galleryControlsContainer.childNodes]
//         trigger.forEach(control => {
//             control.addEventListener('click', (e) => {
//                 e.preventDefault();
//                 this.setCurrentState(control);
//             })
//         })
//     }
// }

// const test = new Carousel(galleryContainer, galleryItems, galleryControls);

// test.userControls();

const titles = document.querySelectorAll(' .company-title');




let textMesh;
let boxMesh;
async function init() {
    textMesh = await createTextMesh();
    boxMesh = await createBoxMesh();

    scene.add(textMesh);
    scene.add(boxMesh);
    titles.forEach(title => {
        title.addEventListener('click', () => {
            const workList = title.nextElementSibling;

            if (workList.classList.contains('active')) {
                workList.style.height = null;
                workList.classList.remove('active');

                // let bot = title.parentElement.querySelector('.testtest')
                // bot.classList.remove('testtest-bottom');
                // bot.style.top = '12px';

                if (!isMobile()) {
                    let bot = title.parentElement.querySelector('.solid-background')
                    bot.classList.remove('solid-background-bottom');
                    bot.style.top = '12px';
                }

                // let child = bot.querySelector('.gallery');
                // child.style.display = 'none';
            } else {
                const prevHeight = workList.clientHeight;
                workList.classList.add('active');
                const fullHeight = workList.clientHeight;
                workList.style.height = prevHeight + 'px';
                workList.offsetHeight; // Force reflow
                workList.style.height = (fullHeight + 5) + 'px';

                // let bot = title.parentElement.querySelector('.testtest')
                // bot.classList.add('testtest-bottom');
                // bot.style.top = (fullHeight + 70) + 'px';

                if (!isMobile()) {
                    let bot = title.parentElement.querySelector('.solid-background')
                    bot.classList.add('solid-background-bottom');
                    bot.style.top = (fullHeight + 65) + 'px';
                }

                let child = bot.querySelector('.gallery');
                child.style.display = 'flex';
            }
        })
    })
    // ...




    // addStarField();
    animate();

}

init();

appendRendererToDOM('threejs-container');


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener('click', onPointerDown, false);
window.addEventListener('touchend', onPointerDown, false);


async function onPointerDown(event) {
    let clientX, clientY;

    if (event.changedTouches) {
        if (event.type === "touchend") {
            clientX = event.changedTouches[0].clientX;
            clientY = event.changedTouches[0].clientY;
        } else {
            event.preventDefault();
        }
    } else {
        clientX = event.clientX;
        clientY = event.clientY;
    }

    mouse.x = ((clientX + window.scrollX) / window.innerWidth) * 2 - 1;
    mouse.y = -((clientY + window.scrollY) / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);


    for (let i = 0; i < intersects.length; i++) {
        let object = intersects[i].object;
        while (object.parent && !object.userData['URL']) {
            object = object.parent;
        }
        if (object.userData) {
            if (object.userData.isResume) {
                const resumeURL = object.userData['URL'];
                window.open(resumeURL, '_blank'); // Opens the resume URL in a new tab
            } else if (object.userData['URL']) {
                window.location.href = object.userData['URL'];
            }
        }

    }
}




window.addEventListener('mousemove', onMouseMove, false);

let INTERSECTED;

async function onMouseMove(event) {
    if (isMobile()) return;
    const mouseX = ((event.clientX + window.scrollX) / window.innerWidth) * 2 - 1;
    const mouseY = -((event.clientY + window.scrollY) / window.innerHeight) * 2 + 1;


    mouse.x = mouseX;
    mouse.y = mouseY;
    // if mouse y is off screen,return 
    if (mouse.y > 1 || mouse.y < -1) {
        document.body.style.cursor = 'auto';
        if (INTERSECTED) {

            INTERSECTED.scale.set(1, 1, 1);
            INTERSECTED.rotation.set(0, 0, 0);
            const label = INTERSECTED.children.find(obj => obj instanceof THREE.Mesh && obj.geometry instanceof TextGeometry);
            if (label) label.visible = false;

        }
        INTERSECTED = null;
        return;
    }


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

