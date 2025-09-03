export type PositionXY = {
    x: number;
    y: number;
};

export type Action = {
    target: string;
    verb: string;
    handler: () => void;
};
