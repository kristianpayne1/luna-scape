import { Tile } from "../../types/world";
import { TILE_COLORS } from "../../constants";

export default function TileMesh({
    tile,
    position,
}: {
    tile: Tile;
    position: [number, number, number];
}) {
    return (
        <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1, 1]} />
            <meshStandardMaterial color={TILE_COLORS[tile.type]} />
        </mesh>
    );
}
