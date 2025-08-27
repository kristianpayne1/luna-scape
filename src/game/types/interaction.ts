import { Object3D, Vector3 } from "three";

export type InteractionEvent = {
    position: Vector3;
    object: Object3D;
    userData?: any;
};

export type Interactable = {
    object: Object3D;
    onClick: (event: InteractionEvent) => void;
    actions: InteractableAction[];
};

export type InteractableAction = {
    target: string;
    verb: string;
    handler: (event: InteractionEvent) => void;
};
