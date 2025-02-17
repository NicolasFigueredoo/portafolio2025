import { useEffect, useRef } from "react";
import * as THREE from "three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const FbxViewer = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<THREE.Object3D | null>(null); // Reference to the model

  useEffect(() => {
    if (!mountRef.current) return;

    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // 1:1 aspect ratio
    camera.position.set(0, 1, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(800, 800); // Adjust canvas size
    renderer.setClearColor(0x000000, 0); // Transparent background
    mountRef.current.appendChild(renderer.domElement);

    // Add lights
    const light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Load FBX model
    const loader = new FBXLoader();
    loader.load("/Case.fbx", (object) => {  // Updated model path
      object.scale.set(0.01, 0.01, 0.01); // Adjust model scale
      modelRef.current = object; // Save reference to the model
      scene.add(object);
    });

    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.5;
    controls.zoomSpeed = 1;
    controls.enableZoom = true;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Auto-rotate the model
      if (modelRef.current) {
        modelRef.current.rotation.y += 0.005; // Adjust rotation speed
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup function
    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      controls.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="w-[600px] h-[600px] bg-transparent mx-auto"
    />
  );
};

export default FbxViewer;
