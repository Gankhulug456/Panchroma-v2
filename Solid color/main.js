// Create the scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.z = 20;

// Create a renderer with transparent background
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight+100);

document.body.appendChild(renderer.domElement);
const canvasContainer = document.getElementById('three-js-canvas-container');
canvasContainer.appendChild(renderer.domElement);
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = canvasContainer.offsetWidth / canvasContainer.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvasContainer.offsetWidth, canvasContainer.offsetHeight);
}


// Adjust renderer DOM element style for overlay
renderer.domElement.style.position = 'absolute';
renderer.domElement.style.top = '0';
renderer.domElement.style.left = '0';
renderer.domElement.style.zIndex = '0';

//Color
const color_1 = new THREE.Color("rgb(255, 117, 71)");
const color_2 = new THREE.Color("rgb(250, 60, 142)");
const color_3 = new THREE.Color("rgb(71, 185, 255)");
const color_4 = new THREE.Color("rgb(147, 84, 255)");
const loader = new THREE.CubeTextureLoader();
const textureCube = loader.load([
  'env/px.png',
  'env/nx.png',
  'env/py.png',
  'env/ny.png',
  'env/pz.png',
  'env/nz.png'
]);

// Create a sphere geometry
const geometry = new THREE.SphereGeometry();

// Use MeshPhongMaterial for reflective properties
const material = new THREE.MeshStandardMaterial({
    //emissive : (247, 80, 2 ),
    color: color_1,
    //emissiveIntensity: 1,
    envMap: textureCube, // Apply the cubemap as an environment map
    //color: (247, 80, 2 ),
    envMapRotation: (0,10,0),
    metalness: 0, // Adjust for desired reflectivity
    roughness: 0.4, // Adjust for desired smoothness

  });
  
  const material_2 = new THREE.MeshStandardMaterial({
    emissive : (247, 80, 2 ),
    color: color_2,
    emissiveIntensity: 0,
    envMap: textureCube, // Apply the cubemap as an environment map
    //color: (247, 80, 2 ),

    metalness: 0, // Adjust for desired reflectivity
    roughness: 0.4, // Adjust for desired smoothness

  });

  const material_3 = new THREE.MeshStandardMaterial({
    emissive : (247, 80, 2 ),
    color: color_3,
    emissiveIntensity: 1,
    envMap: textureCube, // Apply the cubemap as an environment map
    //color: (247, 80, 2 ),

    metalness: 0, // Adjust for desired reflectivity
    roughness: 0.4, // Adjust for desired smoothness

  });
  const material_4 = new THREE.MeshStandardMaterial({
    emissive : (247, 80, 2 ),
    color: color_4,
    emissiveIntensity: 1,
    envMap: textureCube, // Apply the cubemap as an environment map
    //color: (247, 80, 2 ),

    metalness: 0, // Adjust for desired reflectivity
    roughness: 0.4, // Adjust for desired smoothness

  });


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Create a sphere mesh
const spheres = []; // Array to hold our spheres

for (let i = 0; i < 1; i++) { // Create 5 spheres
  const geometry = new THREE.SphereGeometry(3, 32, 32); // Smaller spheres
  const sphere = new THREE.Mesh(geometry, material_4);
  sphere.position.x = 10; 
  sphere.position.y = -1.8;
  sphere.originalPosition = { x: sphere.position.x, y: sphere.position.y, z: 0};
  spheres.push(sphere);
  scene.add(sphere);
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

function onMouseMove(event) {
  // Calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
}

window.addEventListener('mousemove', onMouseMove, false);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

const geometry_torus = new THREE.TorusGeometry( 1.3, 0.6, 16, 100 ); 
const material_torus = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
const torus = new THREE.Mesh( geometry_torus, material ); 
torus.rotation.x = 70
torus.rotation.y = -50
torus.rotation.z = 50

torus.position.x = 3; 
torus.position.y = 1;
torus.originalPosition = { x: torus.position.x, y: torus.position.y, z: 0};
scene.add( torus );

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const capsule_geo = new THREE.CapsuleGeometry( 1, 1, 4, 8 ); 

const material_cap = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 

const capsule = new THREE.Mesh( capsule_geo, material_3 ); 
capsule.position.x = 5; 
capsule.position.y = -4;
capsule.rotation.z = -50
capsule.originalPosition = { x: capsule.position.x, y: capsule.position.y, z: 0};

scene.add( capsule );
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const geometry_cone = new THREE.ConeGeometry( 1.5, 3.5, 32 ); 
const material_cone = new THREE.MeshBasicMaterial( {color: 0xffff00} );
const cone = new THREE.Mesh(geometry_cone, material_2 ); 
cone.position.x = 8; 
cone.position.y = 4;
cone.rotation.z = 50
cone.rotation.y = 15
cone.originalPosition = { x: cone.position.x, y: cone.position.y, z: 0};

scene.add( cone );

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
const geometry_circle = new THREE.CircleGeometry( 1.5, 32 ); 
const material_circle = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
const circle = new THREE.Mesh( geometry_circle, material ); 
circle.position.x = 6; 
circle.position.y = 0;

circle.rotation.x = 1
circle.originalPosition = { x: circle.position.x, y: circle.position.y, z: 0};
circle.rotation.x = 0.5
circle.rotation.y = 1
scene.add( circle );

 /////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Add a directional light to create reflections
const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // White light
directionalLight.position.set(1, 1, 1); // Adjust position as needed
scene.add(directionalLight);

// Optionally, add an ambient light for more uniform lighting
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////


function animate() {
    requestAnimationFrame(animate);
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(spheres);
    const intersects_cap = raycaster.intersectObject(capsule);
    const intersects_torus = raycaster.intersectObject(torus);
    const intersects_cone = raycaster.intersectObject(cone);
    const intersects_circle = raycaster.intersectObject(circle);

    spheres.forEach((sphere) => {
        let isIntersecting = intersects.find(intersect => intersect.object === sphere);
        if (isIntersecting) {
            // Calculate direction vector from sphere to cursor
            let direction = new THREE.Vector3().subVectors(sphere.position, isIntersecting.point).normalize();
            // Apply movement in X and Y only
            sphere.position.x += direction.x * 0.1; // Increase multiplier if needed
            sphere.position.y += direction.y * 0.1;
        } else {
            // Lerp back to original position
            let targetPosition = new THREE.Vector3(sphere.originalPosition.x, sphere.originalPosition.y, sphere.position.z);
            sphere.position.lerp(targetPosition, 0.005); // Adjust lerp factor if needed for smoother movement
        }
    });
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    let isIntersecting = intersects_cap.find(intersect => intersect.object === capsule);
    if (isIntersecting) {
        // Calculate direction vector from sphere to cursor
        let direction = new THREE.Vector3().subVectors(capsule.position, isIntersecting.point).normalize();
        // Apply movement in X and Y only
        capsule.position.x += direction.x * 0.1; // Increase multiplier if needed
        capsule.position.y += direction.y * 0.1;
    } else {
        // Lerp back to original position
        let targetPosition = new THREE.Vector3(capsule.originalPosition.x, capsule.originalPosition.y, capsule.position.z);
        capsule.position.lerp(targetPosition, 0.005); // Adjust lerp factor if needed for smoother movement
    }
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    let isIntersecting_torus = intersects_torus.find(intersect => intersect.object === torus);
    if (isIntersecting_torus) {
        // Calculate direction vector from sphere to cursor
        let direction = new THREE.Vector3().subVectors(torus.position, isIntersecting_torus.point).normalize();
        // Apply movement in X and Y only
        torus.position.x += direction.x * 0.1; // Increase multiplier if needed
        torus.position.y += direction.y * 0.1;
    } else {
        // Lerp back to original position
        let targetPosition = new THREE.Vector3(torus.originalPosition.x, torus.originalPosition.y, torus.position.z);
        torus.position.lerp(targetPosition, 0.005); // Adjust lerp factor if needed for smoother movement
    }
    let isIntersecting_cone = intersects_cone.find(intersect => intersect.object === cone);
    if (isIntersecting_cone) {
        // Calculate direction vector from sphere to cursor
        let direction = new THREE.Vector3().subVectors(cone.position, isIntersecting_cone.point).normalize();
        // Apply movement in X and Y only
        cone.position.x += direction.x * 0.1; // Increase multiplier if needed
        cone.position.y += direction.y * 0.1;
    } else {
        // Lerp back to original position
        let targetPosition = new THREE.Vector3(cone.originalPosition.x, cone.originalPosition.y, cone.position.z);
        cone.position.lerp(targetPosition, 0.005); // Adjust lerp factor if needed for smoother movement
    }

    let isIntersecting_circle = intersects_circle.find(intersect => intersect.object === circle);
    if (isIntersecting_circle) {
        // Calculate direction vector from sphere to cursor
        let direction = new THREE.Vector3().subVectors(circle.position, isIntersecting_circle.point).normalize();
        // Apply movement in X and Y only
        circle.position.x += direction.x * 0.1; // Increase multiplier if needed
        circle.position.y += direction.y * 0.1;
    } else {
        // Lerp back to original position
        let targetPosition = new THREE.Vector3(circle.originalPosition.x, circle.originalPosition.y, circle.position.z);
        circle.position.lerp(targetPosition, 0.005); // Adjust lerp factor if needed for smoother movement
    }


    renderer.render(scene, camera);
}

animate();


// Make it responsive
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
