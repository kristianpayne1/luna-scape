import { Canvas } from "@react-three/fiber";
import { AudioListenerProvider } from "./hooks/useAudioListener";
import { OrbitControls } from "@react-three/drei";
import { World } from "./components/world";

export default function Game() {
    return (
        <AudioListenerProvider>
            <Canvas camera={{ position: [0, 3, 0] }}>
                <ambientLight intensity={3} />
                <OrbitControls enablePan={false} />
                <World />
            </Canvas>
        </AudioListenerProvider>
    );
}
