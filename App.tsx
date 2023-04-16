import { Canvas, MeshProps, useFrame } from "@react-three/fiber/native"
import useControls from "r3f-native-orbitcontrols"
import { useRef, useState } from "react"
import { View } from "react-native"

export default function App() {
  const [OrbitControls, events] = useControls()

  return (
    <View style={{ flex: 1 }} {...events}>
      <Canvas>
        <OrbitControls
          minDistance={5}
          maxDistance={10}
          enablePan={false}
        />

        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1, 0, 0]} />
        <Box position={[1, 0, 0]} />
      </Canvas>
    </View>
  )
}

function Box(props: MeshProps) {
  const mesh = useRef<MeshProps>()

  const [active, setActive] = useState(false)

  useFrame((_, delta) => mesh.current.rotation.x += delta)

  return (
    <mesh
      {...props}
      ref={mesh}
      onClick={() => setActive((active) => !active)}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={active ? "hotpink" : "orange"} />
    </mesh>
  )
}
