import { Chunk, TileType } from "../types/world";
import { TILE_WALKABLE } from "../constants";

type RawTile = {
    type: string;
    walkable?: boolean;
};

type RawChunk = {
    id: string;
    width: number;
    height: number;
    tiles: RawTile[][];
};

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
