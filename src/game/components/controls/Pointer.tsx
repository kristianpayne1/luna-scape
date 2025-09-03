import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import useInteraction from "../../hooks/useInteraction";
import { useGameContextMenu } from "../../../interface/hooks/useGameContextMenu";
import { Raycaster, Vector2 } from "three";

export default function Pointer() {
    const { camera, gl } = useThree();
    const raycaster = useRef(new Raycaster());
    const mouse = useRef(new Vector2());

    const { getObjects, getInteractable } = useInteraction();
    const { showMenu, hideMenu } = useGameContextMenu();

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

        function onMouseMove(event: MouseEvent) {
            hideMenu();
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
        }

        function onRightClick(event: MouseEvent) {
            event.preventDefault();
            const result = castRay(event);
            if (result) {
                const { interactable, hit } = result;
                showMenu(
                    { x: event.clientX, y: event.clientY },
                    interactable.actions.map((a) => ({
                        ...a,
                        handler: () =>
                            a.handler({
                                position: hit.point,
                                object: hit.object,
                                userData: hit.object.userData,
                            }),
                    })),
                );
            } else {
                hideMenu();
            }
        }

        gl.domElement.addEventListener("click", onLeftClick);
        gl.domElement.addEventListener("contextmenu", onRightClick);
        gl.domElement.addEventListener("mousemove", onMouseMove);
        return () => {
            gl.domElement.removeEventListener("click", onLeftClick);
            gl.domElement.removeEventListener("contextmenu", onRightClick);
            gl.domElement.removeEventListener("mousemove", onMouseMove);
        };
    }, [camera, gl, getObjects, getInteractable]);

    return null;
}
