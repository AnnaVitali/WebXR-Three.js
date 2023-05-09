import * as THREE from 'three';
import { ARButton} from 'three/addons/webxr/ARButton.js';

let camera, scene, renderer;
let cube;

init();
animate()
function init(){
    const container = document.createElement('div');
    document.body.appendChild(container);

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(60, window.innerWidth  / window.innerHeight, 0.01, 20);

    const light = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1);
    light.position.set(0.5, 1, 0.25);
    scene.add(light);

    //Set-up the renderer
    renderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.xr.enabled = true;
    container.appendChild(renderer.domElement);

    document.body.appendChild(ARButton.createButton(renderer));

    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const materials = [
        new THREE.MeshPhysicalMaterial({ color: 0xff0000}),
        new THREE.MeshPhysicalMaterial({ color: 0x00ff00}),
        new THREE.MeshPhysicalMaterial({ color: 0x0000ff}),
        new THREE.MeshPhysicalMaterial({ color: 0xffff00}),
        new THREE.MeshPhysicalMaterial({ color: 0x00ffff}),
        new THREE.MeshPhysicalMaterial({ color: 0xff00ff})
    ];
    cube = new THREE.Mesh(geometry, materials);

    scene.add(cube)
    cube.position.set(0, 0, -0.5);

    scene.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

function animate(){
    renderer.setAnimationLoop(() => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01
        renderer.render(scene, camera)
    });
}