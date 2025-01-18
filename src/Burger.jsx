import { useGLTF } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useEffect } from "react";
// import * as THREE from "three";

export const Burger = (props) => {
  const model = useGLTF("./hamburger.glb");

  // useEffect(() => {
  //   return () => model.dispose(); // Dispose model on unmount
  // }, [model]);

  model.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });

  return (
    <RigidBody type="fixed" colliders={false} position-y={0.2}>
      <CuboidCollider args={[0.91, 0.54, 0.91]} position={[0, 0.6, 0]} />
      <primitive object={model.scene} {...props} />;
    </RigidBody>
  );
};
