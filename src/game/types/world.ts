export type TileType = "floor" | "wall";

export interface Tile {
    type: TileType;
    walkable: boolean;
}

export interface Chunk {
    id: string;
    width: number;
    height: number;
    tiles: Tile[][];
}
