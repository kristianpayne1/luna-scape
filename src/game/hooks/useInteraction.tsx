import { createContext, ReactNode, useContext, useRef } from "react";
import { Interactable, InteractionEvent } from "../types/interaction";
import { Object3D } from "three";

type InteractionContextType = {
    add: (interactable: Interactable) => void;
    remove: (object: Object3D) => void;
    getObjects: () => Object3D[];
    getInteractable: (object: Object3D) => Interactable | undefined;
};

const InteractionContext = createContext<InteractionContextType | null>(null);

export function InteractionProvider({ children }: { children: ReactNode }) {
    const interactables = useRef<Interactable[]>([]);

    const interactionContextValue: InteractionContextType = {
        add: (interactable) => interactables.current.push(interactable),
        remove: (object) =>
            (interactables.current = interactables.current.filter(
                (i) => i.object.uuid !== object.uuid,
            )),
        getObjects: () => interactables.current.map((i) => i.object),
        getInteractable: (object: Object3D) =>
            interactables.current.find((i) => i.object.uuid === object.uuid),
    };

    return (
        <InteractionContext.Provider value={interactionContextValue}>
            {children}
        </InteractionContext.Provider>
    );
}

export default function useInteraction() {
    const context = useContext(InteractionContext);
    if (!context)
        throw new Error(
            "useInteraction must be used within <InteractionProvider>",
        );
    return context;
}
