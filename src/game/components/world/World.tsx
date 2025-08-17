import ChunkRenderer from "./ChunkRenderer";
import tutorialMap from "../../maps/tutorial.json";
import useLoadChunk from "../../hooks/useLoadChunk";

export default function World() {
    const chunk = useLoadChunk(tutorialMap);
    return (
        <>
            <ambientLight intensity={3} />
            <ChunkRenderer chunk={chunk} />
        </>
    );
}
