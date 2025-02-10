import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('/assets/background.jpg', () => {
    texture.minFilter = THREE.LinearFilter;
});

const geometry = new THREE.PlaneGeometry(5, 3);
const material = new THREE.MeshBasicMaterial({ map: texture });
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];
const rectangles = [];
for (let i = 0; i < 6; i++) {
    const rectGeometry = new THREE.PlaneGeometry(2.5, 1.5);
    const edges = new THREE.EdgesGeometry(rectGeometry);
    const rectMaterial = new THREE.LineBasicMaterial({ color: colors[i] });
    const rect = new THREE.LineSegments(edges, rectMaterial);
    rect.position.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 0.5 - 0.25);
    scene.add(rect);
    rectangles.push({ mesh: rect, scaleDirection: 1 });
}

camera.position.z = 5;

const nameDiv = document.createElement('div');
nameDiv.style.position = 'absolute';
nameDiv.style.top = '45%';
nameDiv.style.left = '50%';
nameDiv.style.transform = 'translate(-50%, -50%)';
nameDiv.style.fontSize = '3em';
nameDiv.style.fontWeight = 'bold';
nameDiv.style.color = 'white';
nameDiv.style.textShadow = '2px 2px 10px rgba(0, 0, 0, 0.8)';
nameDiv.innerText = 'Keita Aoki';
document.body.appendChild(nameDiv);

const titleDiv = document.createElement('div');
titleDiv.style.position = 'absolute';
titleDiv.style.top = '50%';
titleDiv.style.left = '50%';
titleDiv.style.transform = 'translate(-50%, -50%)';
titleDiv.style.fontSize = '1em';
titleDiv.style.color = 'white';
titleDiv.innerHTML = 'Software Engineer<br><span style="font-size: 1em;">Contact: akkt222@gmail.com</span>';
document.body.appendChild(titleDiv);

const aboutLink = document.createElement('a');
aboutLink.href = '#';
aboutLink.style.position = 'absolute';
aboutLink.style.top = '10px';
aboutLink.style.right = '20px';
aboutLink.style.fontSize = '1.2em';
aboutLink.style.color = 'white';
aboutLink.style.textDecoration = 'none';
aboutLink.innerText = 'About Me';
document.body.appendChild(aboutLink);

const modal = document.createElement('div');
modal.style.position = 'fixed';
modal.style.top = '50%';
modal.style.left = '50%';
modal.style.transform = 'translate(-50%, -50%)';
modal.style.width = '60%';
modal.style.height = '60%';
modal.style.padding = '20px';
modal.style.background = 'rgba(0, 0, 0, 0.9)';
modal.style.color = 'white';
modal.style.display = 'none';
modal.style.overflowY = 'auto';
modal.style.borderRadius = '10px';
modal.style.boxShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
document.body.appendChild(modal);

const closeModal = document.createElement('span');
closeModal.innerText = '×';
closeModal.style.position = 'absolute';
closeModal.style.top = '10px';
closeModal.style.right = '20px';
closeModal.style.fontSize = '1.5em';
closeModal.style.cursor = 'pointer';
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});
modal.appendChild(closeModal);

const modalContent = document.createElement('div');
modal.appendChild(modalContent);

aboutLink.addEventListener('click', () => {
    fetch('https://raw.githubusercontent.com/akkt222/resume/refs/heads/main/README.md')
        .then(response => response.text())
        .then(text => {
            modalContent.innerHTML = window.marked.parse(text);
            modal.style.display = 'block';
        });
});

function animate() {
    requestAnimationFrame(animate);

    rectangles.forEach(obj => {
        obj.mesh.scale.x += 0.01 * obj.scaleDirection;
        obj.mesh.scale.y += 0.01 * obj.scaleDirection;

        if (obj.mesh.scale.x > 1.5 || obj.mesh.scale.x < 0.5) {
            obj.scaleDirection *= -1;
        }
    });

    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
