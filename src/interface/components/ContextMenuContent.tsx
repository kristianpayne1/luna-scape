import { DropdownMenu } from "radix-ui";
import { CSSProperties } from "react";
import { Action } from "../../types/game";
import { useGameContextMenu } from "../hooks/useGameContextMenu";
import "../../styles/contextmenucontent.css";

export default function ContextMenuContent({
    style,
    actions,
}: {
    style: CSSProperties;
    actions: Action[];
}) {
    const { hideMenu } = useGameContextMenu();
    return (
        <DropdownMenu.Content className="GameContextMenuContent" style={style}>
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
    );
}
