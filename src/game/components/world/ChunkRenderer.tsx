import { Chunk } from "../../types/world";
import TileMesh from "./TileMesh";

export default function ChunkRenderer({ chunk }: { chunk: Chunk }) {
    return (
        <>
            {chunk.tiles.map((row, y) =>
                row.map((tile, x) => {
                    return (
                        <TileMesh
                            key={`${x}-${y}`}
                            tile={tile}
                            position={[
                                x - chunk.width / 2,
                                0,
                                y - chunk.height / 2,
                            ]}
                        />
                    );
                }),
            )}
        </>
    );
}
