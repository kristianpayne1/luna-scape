import { Game } from "./game";
import { GameContextMenuProvider } from "./interface/hooks/useGameContextMenu";

export default function App() {
    return (
        <GameContextMenuProvider>
            <Game />
        </GameContextMenuProvider>
    );
}
