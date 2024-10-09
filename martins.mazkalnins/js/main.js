//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

//Create a Three.JS Scene
const scene = new THREE.Scene();
//create a new camera with positions and angles
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10);




//Keep the 3D object on a global variable so we can access it later
let object;

//OrbitControls allow the camera to move around the scene
let controls;

//Set which object to render
let objToRender = 'ecco';

//Instantiate a loader for the .gltf file
const loader = new GLTFLoader();

//Load the file
loader.load(
  `models/${objToRender}/scene.gltf`,
  function (gltf) {
    //If the file is loaded, add it to the scene
    object = gltf.scene;
    scene.add(object);

    object.position.y -= 0.58;
  }
);

//Instantiate a new renderer and set its size
const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true allows for the transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

//Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);

//Set how far the camera will be from the 3D model
camera.position.z = objToRender === "ecco" ? 1.1 : 100;

//Add lights to the scene, so we can actually see the 3D model
const topLight = new THREE.DirectionalLight(0xffffff, 10); // (color, intensity)
const topLight2 = new THREE.DirectionalLight(0xffffff, 10);
topLight.position.set(500, 500, 500) //top-left-ish
topLight2.position.set(-500, 500, -500)
topLight.castShadow = true;
topLight2.castShadow = true;
scene.add(topLight);
scene.add(topLight2);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "ecco" ? 5 : 1);
scene.add(ambientLight);

//This adds controls to the camera, so we can rotate / zoom it with the mouse
if (objToRender === "ecco") {
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // Smooth movement when the user interacts
  controls.autoRotate = true;    // Enable auto-rotation
  controls.autoRotateSpeed = 2;  // Set the rotation speed
  controls.enableZoom = false; 
}

let mouseDown = false;
let mouseMoved = false;

//Render the scene
function animate() {
  requestAnimationFrame(animate);
  
  // Only rotate when the user is not interacting (no mouse movement and not holding the mouse down)
  if (controls && mouseDown && mouseMoved) {
    if (object) {
      object.rotation.y += 0.01; // Rotate around z-axis
    }
  }

  // Update controls and render the scene
  if (controls) controls.update();
  renderer.render(scene, camera);
}




//Start the 3D rendering
animate();