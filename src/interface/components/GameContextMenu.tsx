import { DropdownMenu } from "radix-ui";
import { PositionXY } from "../../types/game";
import { Action } from "../../types/game";
import ContextMenuContent from "./ContextMenuContent";

export default function GameContextMenu({
    open,
    position,
    actions,
}: {
    open: boolean;
    position: PositionXY;
    actions: Action[];
}) {
    return (
        <DropdownMenu.Root open={open}>
            <DropdownMenu.Portal>
                <ContextMenuContent
                    style={{
                        position: "absolute",
                        top: position.y - 2,
                        left: position.x - 2,
                        zIndex: 10000,
                    }}
                    actions={actions}
                />
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
}
