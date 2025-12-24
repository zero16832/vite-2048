
import { v4 as uuidv4 } from 'uuid';

export type Tile = {
    id: string;
    x: number;
    y: number;
    value: number;
    isNew?: boolean;
    isMerged?: boolean;
};

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export const getEmptyCells = (tiles: Tile[], gridSize: number) => {
    const cells: { x: number; y: number }[] = [];
    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            if (!tiles.some((t) => t.x === x && t.y === y)) {
                cells.push({ x, y });
            }
        }
    }
    return cells;
};

export const createRandomTile = (tiles: Tile[], gridSize: number): Tile | null => {
    const emptyCells = getEmptyCells(tiles, gridSize);
    if (emptyCells.length === 0) return null;
    const { x, y } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    return {
        id: uuidv4(),
        x,
        y,
        value: Math.random() < 0.9 ? 2 : 4,
        isNew: true,
    };
};

export const moveTiles = (
    tiles: Tile[],
    direction: Direction,
    gridSize: number
): { tiles: Tile[]; score: number; moved: boolean } => {
    // Reset flags
    const newTiles = tiles.map((t) => ({ ...t, isNew: false, isMerged: false }));
    let score = 0; // Score gained in this move
    let moved = false;

    const vector = { x: 0, y: 0 };
    if (direction === 'LEFT') vector.x = -1;
    if (direction === 'RIGHT') vector.x = 1;
    if (direction === 'UP') vector.y = -1;
    if (direction === 'DOWN') vector.y = 1;

    const nextTiles: Tile[] = [];

    for (let i = 0; i < gridSize; i++) {
        // Process each row or column
        const isVertical = vector.y !== 0;
        const lineTiles = newTiles.filter((t) => (isVertical ? t.x === i : t.y === i));

        // Sort based on direction to process tiles from the "target" side first
        if (isVertical) {
            lineTiles.sort((a, b) => (vector.y === 1 ? b.y - a.y : a.y - b.y));
        } else {
            lineTiles.sort((a, b) => (vector.x === 1 ? b.x - a.x : a.x - b.x));
        }

        const stack: Tile[] = [];

        for (const tile of lineTiles) {
            if (stack.length > 0) {
                const last = stack[stack.length - 1];
                // Check merge condition: same value, not already merged this turn
                if (last.value === tile.value && !last.isMerged) {
                    // Merge!
                    last.value *= 2;
                    last.isMerged = true;
                    score += last.value;
                    moved = true;
                    // 'tile' is discarded (merged into 'last')
                } else {
                    stack.push(tile);
                }
            } else {
                stack.push(tile);
            }
        }

        // Assign new positions
        for (let j = 0; j < stack.length; j++) {
            const t = stack[j];
            let newX = t.x;
            let newY = t.y;

            // Position logic: 0 is 'farthest' in the direction of movement
            // e.g. Left: index 0 is x=0. Right: index 0 is x=3.
            if (vector.x === -1) newX = j;
            if (vector.x === 1) newX = gridSize - 1 - j;
            if (vector.y === -1) newY = j;
            if (vector.y === 1) newY = gridSize - 1 - j;

            if (t.x !== newX || t.y !== newY) {
                moved = true;
                t.x = newX;
                t.y = newY;
            }
            nextTiles.push(t);
        }
    }

    return { tiles: nextTiles, score, moved };
};

export const checkIsGameOver = (tiles: Tile[], gridSize: number) => {
    if (getEmptyCells(tiles, gridSize).length > 0) return false;

    for (let x = 0; x < gridSize; x++) {
        for (let y = 0; y < gridSize; y++) {
            const tile = tiles.find((t) => t.x === x && t.y === y);
            if (!tile) continue;

            const neighbors = [
                tiles.find((t) => t.x === x + 1 && t.y === y),
                tiles.find((t) => t.x === x && t.y === y + 1),
            ];

            if (neighbors.some((n) => n && n.value === tile.value)) return false;
        }
    }
    return true;
};

export const hasWon = (tiles: Tile[]) => {
    return tiles.some(t => t.value === 2048);
}
