import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Inicializar escena, cámara y renderizador
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bulbCanvas'), alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 0); // Fondo transparente

// Agregar luz ambiental y una luz puntual
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffcc, 1, 100);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Cargar el modelo de bombilla en formato GLB/GLTF
const loader = new GLTFLoader();
loader.load('/models/bombilla.glb', (gltf) => {
    const bulb = gltf.scene;
    bulb.scale.set(3, 3, 3); // Ajusta el tamaño de la bombilla
    bulb.position.set(0, 0, 0);    // Centra el modelo en la escena
    scene.add(bulb);

    // Animación para rotar la bombilla
    function animate() {
        requestAnimationFrame(animate);
        bulb.rotation.y += 0.01; // Gira la bombilla en el eje Y
        renderer.render(scene, camera);
    }
    animate();
}, undefined, (error) => {
    console.error('Error al cargar el modelo:', error);
});

// Posicionar la cámara
camera.position.z = 5; // Alejar un poco la cámara para ver el modelo

// Ajustar tamaño de la ventana al cambiar el tamaño del navegador
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});
