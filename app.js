let scene, camera, renderer, raycaster, mouse, mesh, light;

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor("#e5e5e5");
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  const geometry = new THREE.SphereGeometry( 1, 20, 20 );
  const material = new THREE.MeshLambertMaterial({ color: 0xffff00 });
  // const mesh = new THREE.Mesh(geometry, material);

  // scene.add(mesh);

  for (let i = 0; i < 15; i++) {
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 10;
    mesh.position.y = (Math.random() - 0.5) * 10;
    mesh.position.z = (Math.random() - 0.5) * 10;
    scene.add(mesh);
  }

  light = new THREE.PointLight( 0xff0000, 1, 1000 );
  light.position.set( 50, 50, 50 );
  scene.add( light );

  // light = new THREE.PointLight(0xFFFFFF, 2, 1000)
  //       light.position.set(0,0,25);
  //       scene.add(light);
}

function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;

  camera.updateProjectionMatrix();
}

function animate() {
  requestAnimationFrame(animate);
  
  renderer.render(scene, camera);
}

function onMouseMove(event) {
  event.preventDefault();

  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects(scene.children, true);
  for (let i = 0; i < intersects.length; i++) {
    tl = new TimelineMax();
    // tl.to(intersects[i].object.scale, 2, { x: 2, ease: Expo.easeOut });
        tl.to(intersects[i].object.scale, 0.5, { x: 0.5, ease: Expo.easeOut });
        console.log(intersects[i].object);

    // tl.to(intersects[i].object.scale, 0.5, { x: 0.5, ease: Expo.easeOut });
    // tl.to(intersects[i].object.position, 0.5, {
    //   x: 0.5,
    //   ease: Expo.easeOut
    // });
    // tl.to(
    //   intersects[i].object.rotation,
    //   0.5,
    //   { y: Math.PI * 0.5, ease: Expo.easeOut },
    //   "=-1.5"
    // );
  }
}

init();
animate();

window.addEventListener("resize", onWindowResize);
window.addEventListener("click", onMouseMove);
