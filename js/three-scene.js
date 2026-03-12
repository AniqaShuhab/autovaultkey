/**
 * js/three-scene.js
 * Purpose: Three.js particle/floating dot animation for hero background.
 * Runs on DOMContentLoaded. Self-contained.
 */

(function () {
  const canvas = document.getElementById('heroCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, canvas.offsetWidth / canvas.offsetHeight, 0.1, 100);
  camera.position.z = 5;

  // Particles
  const count = 120;
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 14;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    sizes[i] = Math.random() * 3 + 1;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const mat = new THREE.PointsMaterial({
    color: 0x6c63ff,
    size: 0.06,
    transparent: true,
    opacity: 0.5,
    sizeAttenuation: true,
  });

  const particles = new THREE.Points(geo, mat);
  scene.add(particles);

  // Floating rings
  const ringGeo = new THREE.TorusGeometry(2.5, 0.008, 8, 60);
  const ringMat = new THREE.MeshBasicMaterial({ color: 0x4f8ef7, transparent: true, opacity: 0.12 });
  const ring1 = new THREE.Mesh(ringGeo, ringMat);
  ring1.rotation.x = Math.PI / 3;
  scene.add(ring1);

  const ringGeo2 = new THREE.TorusGeometry(3.8, 0.005, 8, 60);
  const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.08 });
  const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
  ring2.rotation.x = Math.PI / 5;
  ring2.rotation.y = Math.PI / 6;
  scene.add(ring2);

  let frame = 0;

  function animate() {
    requestAnimationFrame(animate);
    frame++;
    particles.rotation.y += 0.0008;
    particles.rotation.x += 0.0003;
    ring1.rotation.z += 0.003;
    ring2.rotation.z -= 0.002;
    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', () => {
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  });
})();
