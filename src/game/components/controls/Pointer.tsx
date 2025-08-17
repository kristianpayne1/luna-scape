import { useEffect, useRef, useState } from "react";
import { useThree } from "@react-three/fiber";
import useInteraction from "../../hooks/useInteraction";
import { Raycaster, Vector2 } from "three";
import { InteractableAction } from "../../types/interaction";

export default function Pointer() {
    const { camera, gl } = useThree();
    const raycaster = useRef(new Raycaster());
    const mouse = useRef(new Vector2());
    const [contextMenu, setContextMenu] = useState<{
        x: number;
        y: number;
        actions: InteractableAction[];
    } | null>(null);

    const { getObjects, getInteractable } = useInteraction();

    useEffect(() => {
        function castRay(event: MouseEvent) {
            mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
            raycaster.current.setFromCamera(mouse.current, camera);

            const intersects = raycaster.current.intersectObjects(
                getObjects(),
                true,
            );

            if (!intersects.length) return null;
            const hit = intersects[0];
            const interactable = getInteractable(hit.object);

            if (!interactable) return null;
            return { interactable, hit };
        }

        function onLeftClick(event: MouseEvent) {
            const result = castRay(event);
            if (result) {
                // Run the first (default) action
                const { interactable, hit } = result;
                interactable.actions[0]?.handler({
                    position: hit.point,
                    object: hit.object,
                    userData: hit.object.userData,
                });
            }
            setContextMenu(null);
        }

        function onRightClick(event: MouseEvent) {
            event.preventDefault();
            const result = castRay(event);
            if (result) {
                const { interactable, hit } = result;
                setContextMenu({
                    x: event.clientX,
                    y: event.clientY,
                    actions: interactable.actions.map((a) => ({
                        ...a,
                        handler: () =>
                            a.handler({
                                position: hit.point,
                                object: hit.object,
                                userData: hit.object.userData,
                            }),
                    })),
                });
            } else {
                setContextMenu(null);
            }
        }

        gl.domElement.addEventListener("click", onLeftClick);
        gl.domElement.addEventListener("contextmenu", onRightClick);
        return () => {
            gl.domElement.removeEventListener("click", onLeftClick);
            gl.domElement.removeEventListener("contextmenu", onRightClick);
        };
    }, [camera, gl, getObjects, getInteractable]);

    return null;
}
