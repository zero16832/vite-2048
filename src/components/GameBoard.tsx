
import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import type { Tile } from '../utils/gameHelpers';
import { Block } from './Block';


const BoardContainer = styled.div<{ size: number }>`
  position: relative;
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
  background-color: ${props => props.theme.gridBackground};
  border-radius: 12px;
  touch-action: none;
  user-select: none;
  cursor: grab;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  margin-top: 20px;
  transition: background-color 0.3s ease;
  
  &:active {
    cursor: grabbing;
  }
`;

const GridBackground = styled.div<{ gap: number; gridSize: number; size: number }>`
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  padding: ${(p) => p.gap}px;
  box-sizing: border-box;

  // Use CSS background to render the grid pattern
  background-image: ${props => {
    const cellSize = (props.size - (props.gridSize + 1) * props.gap) / props.gridSize;
    const totalSize = cellSize + props.gap;
    const bgCell = props.theme.gridEmptyCell.replace('#', '%23');
    // SVG pattern for cell background
    return `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${totalSize}' height='${totalSize}'%3E%3Crect x='0' y='0' width='${cellSize}' height='${cellSize}' rx='8' ry='8' fill='${bgCell}'/%3E%3C/svg%3E")`;
  }};
  background-size: ${props => {
    const cellSize = (props.size - (props.gridSize + 1) * props.gap) / props.gridSize;
    return `${cellSize + props.gap}px ${cellSize + props.gap}px`;
  }};
  background-position: ${props => `${props.gap}px ${props.gap}px`};
  background-repeat: repeat;
`;

interface GameBoardProps {
  tiles: Tile[];
  gridSize: number;
}

export const GameBoard: React.FC<GameBoardProps> = ({ tiles, gridSize }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [boardSize, setBoardSize] = useState(320);

  useEffect(() => {
    const handleResize = () => {
      // Logic for responsiveness: 
      // Mobile: width - padding. Desktop: fixed max.
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      const width = Math.min(screenWidth - 40, 500);
      const height = screenHeight - 250; // space for header

      const size = Math.min(width, height, 500);
      setBoardSize(Math.floor(size));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const GAP = Math.max(2, boardSize / (gridSize * 10 + 10)); // Responsive gap - smaller for denser grids
  const totalGap = (gridSize + 1) * GAP;
  const cellSize = (boardSize - totalGap) / gridSize;

  return (
    <BoardContainer size={boardSize} ref={containerRef}>
      <GridBackground gap={GAP} gridSize={gridSize} size={boardSize} />

      {tiles.map((tile) => (
        <Block
          key={tile.id}
          tile={tile}
          cellSize={cellSize}
          gap={GAP}
        />
      ))}
    </BoardContainer>
  );
};
