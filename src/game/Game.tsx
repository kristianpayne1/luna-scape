import { Canvas } from "@react-three/fiber";
import { AudioListenerProvider } from "./hooks/useAudioListener";
import { OrbitControls } from "@react-three/drei";
import World from "./components/world";
import Pointer from "./components/controls/Pointer";
import { InteractionProvider } from "./hooks/useInteraction";

export default function Game() {
    return (
        <AudioListenerProvider>
            <InteractionProvider>
                <Canvas camera={{ position: [0, 3, 0] }}>
                    <OrbitControls enablePan={false} />
                    <World />
                    <Pointer />
                </Canvas>
            </InteractionProvider>
        </AudioListenerProvider>
    );
}
