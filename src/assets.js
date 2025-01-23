import * as THREE from "three";

THREE.ColorManagement.legacyMode = false;

const textureLoader = new THREE.TextureLoader();
const wallTexture = textureLoader.load("/brickNormal.jpeg");
wallTexture.wrapS = THREE.RepeatWrapping;
wallTexture.wrapT = THREE.RepeatWrapping;
wallTexture.repeat.set(15, 15);

const floorTexture = textureLoader.load("/floor.jpeg");

floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(2, 2);

export const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
export const floor1Material = new THREE.MeshStandardMaterial({
  color: "rgb(34, 34, 34)",
  normalMap: floorTexture,
  metalness: 0.7,
  roughness: 0.6,
});

export const floor2Material = new THREE.MeshStandardMaterial({
  color: "rgb(51, 161, 7)",
  metalness: 0,
  roughness: 0,
});
export const obstacleMaterial = new THREE.MeshStandardMaterial({
  color: "rgb(209, 10, 10)",
  metalness: 0,
  roughness: 1,
});
export const wallMaterial = new THREE.MeshStandardMaterial({
  normalMap: wallTexture,
  color: "rgb(78, 34, 17)",
  metalness: 0.8,
  roughness: 0.7,
});

export const movingBlockMaterial = new THREE.MeshStandardMaterial({
  color: "rgb(141, 141, 141)",
  normalMap: floorTexture,
  metalness: 0.8,
  roughness: 0.7,
});
