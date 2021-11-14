import './App.scss';
import Road from './Road'
import GameOverProvider from './GameOverProvider'

function App() {
  return (
    <div className="App">
        <GameOverProvider>
            <Road />
        </GameOverProvider>
    </div>
  );
}

export default App;
