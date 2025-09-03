import { DropdownMenu } from "radix-ui";
import { PositionXY } from "../../types/game";
import { Action } from "../../types/game";
import "../../styles/gamecontextmenu.css";
import { useGameContextMenu } from "../hooks/useGameContextMenu";

export default function GameContextMenu({
    open,
    position,
    actions,
}: {
    open: boolean;
    position: PositionXY;
    actions: Action[];
}) {
    const { hideMenu } = useGameContextMenu();
    return (
        <DropdownMenu.Root open={open}>
            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    className="GameContextMenuContent"
                    style={{
                        position: "absolute",
                        top: position.y - 2,
                        left: position.x - 2,
                        zIndex: 10000,
                    }}
                >
                    {actions.map(({ verb, target, handler }) => (
                        <DropdownMenu.Item
                            className="GameContextMenuItem"
                            onClick={() => {
                                handler();
                                hideMenu();
                            }}
                        >
                            {verb + " " + target}
                        </DropdownMenu.Item>
                    ))}
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
}
