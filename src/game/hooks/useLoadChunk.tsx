import { RawChunk, Chunk, TileType } from "../types/world";
import { TILE_WALKABLE } from "../constants";

export default function useLoadChunk(raw: RawChunk): Chunk {
    return {
        ...raw,
        tiles: raw.tiles.map((row) =>
            row.map((tile) => {
                const type = tile.type as TileType;
                return {
                    type,
                    walkable:
                        tile.walkable !== undefined
                            ? tile.walkable
                            : TILE_WALKABLE[type],
                };
            }),
        ),
    };
}
