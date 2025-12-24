
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 500px;
  padding: 0 10px;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  color: ${props => props.theme.textDark};
  margin: 0;
  font-weight: 800;
  line-height: 1;
  text-shadow: 2px 2px 0px rgba(0,0,0,0.1);
  font-family: 'Comic Sans MS', 'Nunito', sans-serif;
`;

const ScoreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
`;

const Scores = styled.div`
  display: flex;
  gap: 8px;
`;

const ScoreBox = styled.div`
  background-color: ${props => props.theme.gridBackground};
  padding: 5px 10px;
  border-radius: 6px;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 70px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const Label = styled.div`
  font-size: 0.7rem;
  text-transform: uppercase;
  color: #eee4da;
  font-weight: bold;
  opacity: 0.8;
`;

const Value = styled.div`
  font-size: 1.2rem;
  font-weight: 800;
`;

const Stats = styled.div`
  display: flex;
  gap: 15px;
  color: ${props => props.theme.textDark};
  font-weight: bold;
  font-size: 0.9rem;
  opacity: 0.9;
`;

interface ScorePanelProps {
  score: number;
  bestScore: number;
  steps: number;
  time: number;
}

export const ScorePanel: React.FC<ScorePanelProps> = ({ score, bestScore, steps, time }) => {
  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Container>
      <Title>2048</Title>
      <ScoreWrapper>
        <Scores>
          <ScoreBox>
            <Label>Score</Label>
            <Value>{score}</Value>
          </ScoreBox>
          <ScoreBox>
            <Label>Best</Label>
            <Value>{bestScore}</Value>
          </ScoreBox>
        </Scores>
        <Stats>
          <span>Steps: {steps}</span>
          <span>Time: {formatTime(time)}</span>
        </Stats>
      </ScoreWrapper>
    </Container>
  );
};
