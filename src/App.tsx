
import { useEffect, useState, useCallback } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './styles/global';
import { GameBoard } from './components/GameBoard';
import { ScorePanel } from './components/ScorePanel';
import { ControlButtons } from './components/ControlButtons';
import { GameModal } from './components/GameModal';
import { useGameLogic } from './hooks/useGameLogic';
import { useTouchSwipe } from './hooks/useTouchSwipe';
import { MainMenu } from './components/MainMenu';
import { THEMES, type ThemeType } from './utils/constants';
import { StatusBar, Style } from '@capacitor/status-bar';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: calc(20px + env(safe-area-inset-top, 0px));
  padding-bottom: env(safe-area-inset-bottom, 0px);
  padding-left: env(safe-area-inset-left, 0px);
  padding-right: env(safe-area-inset-right, 0px);
  width: 100%;
  height: 100vh;
  position: relative;
  touch-action: none;
  background-color: ${props => props.theme.background};
  transition: background-color 0.5s ease;
`;

const BackgroundDecor = styled.div`
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  z-index: -1;
  background: ${props => props.theme.background};
`;

const ThemeToggle = styled.button`
  position: absolute;
  top: calc(15px + env(safe-area-inset-top, 0px));
  right: calc(15px + env(safe-area-inset-right, 0px));
  background: ${props => props.theme.gridBackground};
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  z-index: 100;
`;

const HomeButton = styled.button`
  position: absolute;
  top: calc(15px + env(safe-area-inset-top, 0px));
  left: calc(15px + env(safe-area-inset-left, 0px));
  background: transparent;
  font-size: 2rem;
  z-index: 100;
  border: none;
`;

function App() {
  const [gridSize, setGridSize] = useState<number | null>(null);
  const [themeMode, setThemeMode] = useState<ThemeType>('light');

  const {
    tiles,
    score,
    bestScore,
    steps,
    time,
    gameOver,
    won,
    startNewGame,
    move,
    continueGame,
    undo,
    canUndo,
  } = useGameLogic(gridSize || 4);

  const bind = useTouchSwipe(move);

  // Sync StatusBar with Theme
  useEffect(() => {
    const updateStatusBar = async () => {
      try {
        await StatusBar.setBackgroundColor({ color: THEMES[themeMode].background });
        await StatusBar.setStyle({ style: themeMode === 'light' ? Style.Light : Style.Dark });
      } catch (e) {
        // Not on mobile, ignore
      }
    };
    updateStatusBar();
  }, [themeMode]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault();
      }
      if (gameOver) return;
      switch (e.key) {
        case 'ArrowUp': move('UP'); break;
        case 'ArrowDown': move('DOWN'); break;
        case 'ArrowLeft': move('LEFT'); break;
        case 'ArrowRight': move('RIGHT'); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move, gameOver]);

  const toggleTheme = useCallback(() => {
    setThemeMode(prev => {
      if (prev === 'light') return 'dark';
      if (prev === 'dark') return 'cyber';
      if (prev === 'cyber') return 'nature';
      return 'light';
    });
  }, []);

  const currentTheme = { ...THEMES[themeMode], name: themeMode };

  if (!gridSize) {
    return (
      <ThemeProvider theme={currentTheme}>
        <GlobalStyle />
        <MainMenu onSelectDifficulty={setGridSize} themeMode={themeMode} onToggleTheme={toggleTheme} />
      </ThemeProvider>
    );
  }

  const getThemeIcon = () => {
    switch (themeMode) {
      case 'light': return '🌙';
      case 'dark': return '⚡';
      case 'cyber': return '🌿';
      default: return '☀️';
    }
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <AppContainer {...bind()}>
        <BackgroundDecor />
        <HomeButton onClick={() => setGridSize(null)}>🏠</HomeButton>
        <ThemeToggle onClick={toggleTheme}>
          {getThemeIcon()}
        </ThemeToggle>

        <ScorePanel
          score={score}
          bestScore={bestScore}
          steps={steps}
          time={time}
        />

        <GameBoard tiles={tiles} gridSize={gridSize} />

        <ControlButtons
          onNewGame={startNewGame}
          onUndo={undo}
          canUndo={canUndo}
        />

        <GameModal
          won={won}
          gameOver={gameOver}
          onRestart={startNewGame}
          onContinue={continueGame}
        />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;

