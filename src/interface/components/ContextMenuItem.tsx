import { Action } from "../../types/game";
import { DropdownMenu } from "radix-ui";
import { useGameContextMenu } from "../hooks/useGameContextMenu";
import "../styles/contextmenuitem.css";

export default function ContextMenuItem({ verb, target, handler }: Action) {
    const { hideMenu } = useGameContextMenu();

    return (
        <DropdownMenu.Item
            className="GameContextMenuItem"
            onClick={() => {
                handler();
                hideMenu();
            }}
        >
            {verb + " " + target}
        </DropdownMenu.Item>
    );
}
