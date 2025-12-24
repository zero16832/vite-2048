
import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: rgba(255, 255, 255, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  z-index: 200;
  backdrop-filter: blur(8px);
`;

const Message = styled(motion.h2)`
  font-size: 4rem;
  font-weight: 800;
  color: #776e65;
  margin: 0 0 30px 0;
  text-align: center;
  font-family: 'Comic Sans MS', 'Nunito', sans-serif;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
`;

const ActionButton = styled(motion.button)`
  padding: 15px 40px;
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  background-color: #8f7a66;
  border-radius: 50px;
  border: none;
  cursor: pointer;
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
  
  &:hover {
    box-shadow: 0 15px 25px rgba(0,0,0,0.2);
  }
`;

interface GameModalProps {
    won: boolean;
    gameOver: boolean;
    onRestart: () => void;
    onContinue: () => void;
}

export const GameModal: React.FC<GameModalProps> = ({ won, gameOver, onRestart, onContinue }) => {
    if (!won && !gameOver) return null;

    return (
        <AnimatePresence>
            {(won || gameOver) && (
                <Overlay
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    {won && (
                        <>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', bounce: 0.5 }}
                            >
                                <svg width="200" height="200" viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
                                    <text x="50" y="50" fontSize="80" textAnchor="middle" dominantBaseline="middle">🏆</text>
                                    {/* Sparkles */}
                                    <motion.circle cx="20" cy="20" r="5" fill="#ffd700" animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1 }} />
                                    <motion.circle cx="80" cy="20" r="5" fill="#ffd700" animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.5 }} />
                                </svg>
                            </motion.div>

                            <Message
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                            >
                                You Win!
                            </Message>

                            <ButtonGroup>
                                <ActionButton
                                    onClick={onContinue}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{ backgroundColor: '#f1c40f' }} // Gold
                                >
                                    Continue
                                </ActionButton>
                                <ActionButton
                                    onClick={onRestart}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Restart
                                </ActionButton>
                            </ButtonGroup>
                        </>
                    )}

                    {gameOver && (
                        <>
                            <motion.div
                                initial={{ rotate: -10, scale: 0.8 }}
                                animate={{ rotate: 10, scale: 1 }}
                                transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2 }}
                            >
                                <svg width="150" height="150" viewBox="0 0 100 100">
                                    <text x="50" y="60" fontSize="80" textAnchor="middle">🥺</text>
                                </svg>
                            </motion.div>

                            <Message
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                            >
                                Game Over
                            </Message>

                            <ActionButton
                                onClick={onRestart}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Try Again
                            </ActionButton>
                        </>
                    )}
                </Overlay>
            )}
        </AnimatePresence>
    );
};
