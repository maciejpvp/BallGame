import { useGLTF } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
// import * as THREE from "three";

export const Burger = (props) => {
  const model = useGLTF("./hamburger.glb");

  model.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });

  //   const boundingBox = new THREE.Box3().setFromObject(model.scene);

  //   const size = new THREE.Vector3();
  //   boundingBox.getSize(size);

  //   console.log(size.x/2, size.y/2, size.z/2);

  return (
    <RigidBody type="fixed" colliders={false} position-y={0.2}>
      <CuboidCollider args={[0.91, 0.54, 0.91]} position={[0, 0.6, 0]} />
      <primitive object={model.scene} {...props} />;
    </RigidBody>
  );
};
