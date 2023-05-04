import * as THREE from 'three';
import { ARButton} from 'three/addons/webxr/ARButton.js';

let camera, scene, renderer;
let controller;

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

    const geometry = new THREE.CylinderGeometry(0, 0.05, 0.2, 32).rotateX(Math.PI / 2);

    controller = renderer.xr.getController(0);
    controller.addEventListener('select', () => {
        const material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random() } );
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(0, 0, -0.3).applyMatrix4(controller.matrixWorld);
        mesh.quaternion.setFromRotationMatrix(controller.matrixWorld);
        scene.add(mesh)
    });
    scene.add(controller);

    scene.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

function animate(){
    renderer.setAnimationLoop(() => renderer.render(scene, camera));
}