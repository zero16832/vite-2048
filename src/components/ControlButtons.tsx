
import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ButtonWrapper = styled(motion.button)`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  
  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

const ButtonLabel = styled.span`
  color: ${props => props.theme.textDark};
  font-weight: bold;
  font-size: 0.9rem;
  opacity: 0.8;
`;

interface ControlButtonsProps {
    onNewGame: () => void;
    onUndo: () => void;
    canUndo: boolean;
}

export const ControlButtons: React.FC<ControlButtonsProps> = ({ onNewGame, onUndo, canUndo }) => {
    return (
        <Container>
            <ButtonWrapper
                onClick={onUndo}
                disabled={!canUndo}
                whileHover={canUndo ? { scale: 1.1 } : {}}
                whileTap={canUndo ? { scale: 0.95 } : {}}
            >
                <svg width="60" height="60" viewBox="0 0 60 60">
                    <circle cx="30" cy="30" r="28" fill="#f59563" />
                    <path
                        d="M 35 20 L 25 30 L 35 40"
                        fill="none"
                        stroke="white"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M 25 30 L 40 30"
                        fill="none"
                        stroke="white"
                        strokeWidth="4"
                        strokeLinecap="round"
                    />
                </svg>
                <ButtonLabel>Undo</ButtonLabel>
            </ButtonWrapper>

            <ButtonWrapper
                onClick={onNewGame}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <svg width="60" height="60" viewBox="0 0 60 60">
                    <circle cx="30" cy="30" r="28" fill="#8f7a66" />
                    <path
                        d="M 30 15 A 15 15 0 1 0 45 30"
                        fill="none"
                        stroke="white"
                        strokeWidth="4"
                        strokeLinecap="round"
                    />
                    <path
                        d="M 45 25 L 45 30 L 50 30"
                        fill="none"
                        stroke="white"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
                <ButtonLabel>New Game</ButtonLabel>
            </ButtonWrapper>
        </Container>
    );
};
