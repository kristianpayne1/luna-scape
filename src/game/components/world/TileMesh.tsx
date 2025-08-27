import { Tile } from "../../types/world";
import { TILE_COLORS } from "../../constants";
import { useEffect, useRef } from "react";
import useInteraction from "../../hooks/useInteraction";

export default function TileMesh({
    tile,
    position,
}: {
    tile: Tile;
    position: [number, number, number];
}) {
    const ref = useRef(null!);
    const { add, remove } = useInteraction();

    useEffect(() => {
        if (!ref.current) return;

        add({
            object: ref.current,
            onClick: console.log,
            actions: [{ verb: "Walk", target: "here", handler: console.log }],
        });

        return () => remove(ref.current);
    }, []);

    return (
        <mesh ref={ref} position={position} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1, 1]} />
            <meshStandardMaterial color={TILE_COLORS[tile.type]} />
        </mesh>
    );
}
