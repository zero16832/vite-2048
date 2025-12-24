
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const MenuContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: ${props => props.theme.menuBackground};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
`;

const GlassPanel = styled(motion.div)`
  background: ${props => props.theme.panelBackground};
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 40px;
  border-radius: 30px;
  text-align: center;
  box-shadow: 0 15px 35px rgba(0,0,0,0.2);
  max-width: 90%;
  z-index: 10;
`;

const Title = styled(motion.h1)`
  font-size: 5rem;
  font-weight: 900;
  margin: 0;
  color: white;
  text-shadow: 4px 4px 15px rgba(0,0,0,0.3);
  font-family: 'Comic Sans MS', 'Nunito', sans-serif;
`;

const Subtitle = styled.p`
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.2rem;
  margin-bottom: 30px;
`;

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;

  @media (min-width: 600px) {
    grid-template-columns: repeat(3, 1fr);
    max-width: 600px;
  }
`;

const DifficultyCard = styled(motion.div) <{ color: string }>`
  background: ${p => p.color};
  padding: 20px;
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  color: #776e65;
  min-height: 120px;
`;

const CardLabel = styled.span`
  font-size: 1.1rem;
  font-weight: 800;
  margin-top: 10px;
`;

const FloatingShape = styled(motion.div) <{ top: string; left: string; size: string; delay: number }>`
  position: absolute;
  top: ${p => p.top};
  left: ${p => p.left};
  width: ${p => p.size};
  height: ${p => p.size};
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: ${float} ${p => p.delay + 5}s ease-in-out infinite;
  animation-delay: ${p => p.delay}s;
  z-index: 1;
`;

const ThemeButton = styled.button`
  position: absolute;
  top: calc(20px + env(safe-area-inset-top, 0px));
  right: calc(20px + env(safe-area-inset-right, 0px));
  background: rgba(255,255,255,0.2);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 1.5rem;
  cursor: pointer;
  color: white;
  backdrop-filter: blur(10px);
  z-index: 100;
`;

interface MainMenuProps {
  onSelectDifficulty: (size: number | null) => void;
  themeMode: string;
  onToggleTheme: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({ onSelectDifficulty, themeMode, onToggleTheme }) => {
  const getThemeIcon = () => {
    switch (themeMode) {
      case 'light': return '🌙';
      case 'dark': return '⚡';
      case 'cyber': return '🌿';
      default: return '☀️';
    }
  };

  return (
    <MenuContainer>
      <ThemeButton onClick={onToggleTheme}>
        {getThemeIcon()}
      </ThemeButton>

      <FloatingShape top="10%" left="10%" size="100px" delay={0} />
      <FloatingShape top="70%" left="80%" size="150px" delay={2} />
      <FloatingShape top="40%" left="20%" size="80px" delay={1} />
      <FloatingShape top="80%" left="15%" size="120px" delay={3} />

      <GlassPanel
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', duration: 0.8 }}
      >
        <Title
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        >
          2048
        </Title>
        <Subtitle>Choose your Challenge</Subtitle>

        <ButtonGrid>
          <DifficultyCard
            color="#FFD1DC"
            onClick={() => onSelectDifficulty(4)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 4 }}>
              {Array.from({ length: 4 }).map((_, i) => <div key={i} style={{ width: 14, height: 14, background: 'white', borderRadius: 2, opacity: 0.8 }} />)}
            </div>
            <CardLabel>Classic</CardLabel>
          </DifficultyCard>

          <DifficultyCard
            color="#FFFAC8"
            onClick={() => onSelectDifficulty(8)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
              {Array.from({ length: 9 }).map((_, i) => <div key={i} style={{ width: 10, height: 10, background: 'white', borderRadius: 2, opacity: 0.8 }} />)}
            </div>
            <CardLabel>Large</CardLabel>
          </DifficultyCard>

          <DifficultyCard
            color="#E2F0CB"
            onClick={() => onSelectDifficulty(16)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
              {Array.from({ length: 16 }).map((_, i) => <div key={i} style={{ width: 8, height: 8, background: 'white', borderRadius: 1, opacity: 0.8 }} />)}
            </div>
            <CardLabel>Huge</CardLabel>
          </DifficultyCard>
        </ButtonGrid>
      </GlassPanel>
    </MenuContainer>
  );
};
