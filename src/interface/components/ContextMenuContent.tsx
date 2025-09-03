import { DropdownMenu } from "radix-ui";
import { CSSProperties } from "react";
import { Action } from "../../types/game";
import ContextMenuItem from "./ContextMenuItem";
import "../styles/contextmenucontent.css";

export default function ContextMenuContent({
    style,
    actions,
}: {
    style: CSSProperties;
    actions: Action[];
}) {
    return (
        <DropdownMenu.Content className="GameContextMenuContent" style={style}>
            {actions.map(({ verb, target, handler }) => (
                <ContextMenuItem
                    verb={verb}
                    target={target}
                    handler={handler}
                />
            ))}
        </DropdownMenu.Content>
    );
}
