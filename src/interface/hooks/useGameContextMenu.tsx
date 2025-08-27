import {
    useState,
    useCallback,
    createContext,
    ReactNode,
    useContext,
} from "react";
import { PositionXY } from "../../types/game";
import { createPortal } from "react-dom";

export type Action = {
    target: string;
    verb: string;
    handler: () => void;
};

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
    const [state, setState] = useState<GameContextMenuState>(
        GameContextInitialState,
    );

    const showMenu = useCallback((position: PositionXY, actions: Action[]) => {
        setState({ isOpen: true, position, actions });
    }, []);

    const hideMenu = useCallback(() => {
        setState(() => GameContextInitialState);
    }, []);

    return (
        <GameContextMenuContext.Provider value={{ showMenu, hideMenu }}>
            {children}
            {state.isOpen &&
                createPortal(
                    <div
                        style={{
                            position: "absolute",
                            top: state.position.y,
                            left: state.position.x,
                        }}
                    >
                        {state.actions.map(
                            ({ target, verb, handler }, index) => (
                                <div
                                    key={index}
                                    onClick={() => {
                                        handler();
                                        hideMenu();
                                    }}
                                >
                                    <span>{verb}</span> <span>{target}</span>
                                </div>
                            ),
                        )}
                    </div>,
                    document.body,
                )}
        </GameContextMenuContext.Provider>
    );
}
