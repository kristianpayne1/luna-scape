export type TileType = "floor" | "wall";

export interface RawTile {
    type: string;
    walkable?: boolean;
}

export interface RawChunk {
    id: string;
    width: number;
    height: number;
    tiles: RawTile[][];
}

export interface Tile extends RawTile {
    type: TileType;
    walkable: boolean;
}

export interface Chunk extends RawChunk {
    tiles: Tile[][];
}
