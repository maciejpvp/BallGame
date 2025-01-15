import * as THREE from "three";

THREE.ColorManagement.legacyMode = false;

export const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
export const floor1Material = new THREE.MeshStandardMaterial({
  color: "rgb(34, 34, 34)",
  metalness: 0,
  roughness: 0,
});
export const floor2Material = new THREE.MeshStandardMaterial({
  color: "rgb(8, 73, 19)",
  metalness: 0,
  roughness: 0,
});
export const obstacleMaterial = new THREE.MeshStandardMaterial({
  color: "rgb(230, 8, 26)",
  metalness: 0,
  roughness: 1,
});
export const wallMaterial = new THREE.MeshStandardMaterial({
  color: "rgb(53, 37, 37)",
  metalness: 0,
  roughness: 0,
});

export const movingBlockMaterial = new THREE.MeshStandardMaterial({
  color: "rgb(141, 141, 141)",
  metalness: 0,
  roughness: 0,
});
