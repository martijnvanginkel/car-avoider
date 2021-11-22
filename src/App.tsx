import './App.scss';
import Road from './Road'
import GameOverProvider from './GameOverProvider'
import GameOverModal from './GameOverModal'

function App() {
    return (
        <div className="App">
            <GameOverProvider>
                <Road />
                <GameOverModal />
            </GameOverProvider>
        </div>
    )
}

export default App;
