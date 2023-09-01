import {
    OrbitControls,
  } from "@react-three/drei";
import earthMap from '../assets/earthmap.jpg'
import { Canvas, useLoader} from "@react-three/fiber";
import { TextureLoader } from 'three/src/loaders/TextureLoader'

function Globe() {
    const colorMap = useLoader(TextureLoader, earthMap)
   
    return (
        <Canvas style={{height:'150px', width:'200px'}}>
            <ambientLight intensity={1} />
            <pointLight position={[3, 3, 3]} />
            <pointLight position={[0, 0, 0]} />
            <pointLight position={[-3, -3, 2]} />
            <OrbitControls/>
            <mesh>
                <sphereGeometry args={[3, 50, 50]} />
                <meshStandardMaterial map={colorMap} />
            </mesh>
        </Canvas>
    );
}

export default Globe