import { TileType } from "./types/world";

export const TILE_WALKABLE: Record<TileType, boolean> = {
    floor: true,
    wall: false,
};

export const TILE_COLORS: Record<TileType, string> = {
    floor: "#555",
    wall: "#222",
};
