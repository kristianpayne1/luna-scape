import {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useState,
} from "react";
import { PositionXY, Action } from "../../types/game";
import GameContextMenu from "../components/GameContextMenu";

type GameContextMenuState = {
    isOpen: boolean;
    position: PositionXY;
    actions: Action[];
};

type GameContextMenuValue = {
    showMenu: (position: PositionXY, actions: Action[]) => void;
    hideMenu: () => void;
};

const GameContextMenuContext = createContext<GameContextMenuValue | null>(null);

const GameContextInitialState = {
    isOpen: false,
    position: { x: 0, y: 0 },
    actions: [],
};

export function useGameContextMenu() {
    const context = useContext(GameContextMenuContext);
    if (!context)
        throw new Error(
            "useGameContextMenu must be used within GameContextMenuProvider",
        );
    return context;
}

export function GameContextMenuProvider({ children }: { children: ReactNode }) {
    const [{ isOpen, actions, position }, setState] =
        useState<GameContextMenuState>(GameContextInitialState);

    const showMenu = useCallback((position: PositionXY, actions: Action[]) => {
        setState({ isOpen: true, position, actions });
    }, []);

    const hideMenu = useCallback(() => {
        setState(() => GameContextInitialState);
    }, []);

    return (
        <GameContextMenuContext.Provider value={{ showMenu, hideMenu }}>
            {children}
            <GameContextMenu
                open={isOpen}
                position={position}
                actions={actions}
            />
        </GameContextMenuContext.Provider>
    );
}
