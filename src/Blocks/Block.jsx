import { RigidBody } from "@react-three/rapier";
import { boxGeometry, floor1Material, floor2Material } from "../assets";

export const Block = ({ position = [0, 0, 0], type = "start", children }) => {
  return (
    <group position={position}>
      {type === "start" && (
        <mesh
          position-y={-0.1}
          receiveShadow
          geometry={boxGeometry}
          material={
            type === "start"
              ? floor1Material
              : type === "trap"
              ? floor2Material
              : null
          }
          scale={[4, 0.2, 4]}
        />
      )}

      {children ? children : null}
    </group>
  );
};
