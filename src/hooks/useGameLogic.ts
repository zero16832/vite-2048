
import { useState, useEffect, useCallback, useRef } from 'react';
import { createRandomTile, moveTiles, checkIsGameOver, hasWon } from '../utils/gameHelpers';
import type { Tile, Direction } from '../utils/gameHelpers';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

const STORAGE_KEY = '2048-game-state';
const BEST_SCORE_KEY = '2048-best-score';

export const useGameLogic = (gridSize: number) => {
    const [tiles, setTiles] = useState<Tile[]>([]);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);
    const [hasContinued, setHasContinued] = useState(false);
    const [history, setHistory] = useState<{ tiles: Tile[]; score: number; steps: number } | null>(null);

    // New Stats
    const [steps, setSteps] = useState(0);
    const [time, setTime] = useState(0);
    const timerRef = useRef<number | null>(null);

    // Initialize
    useEffect(() => {
        const sizeKey = `${BEST_SCORE_KEY}-${gridSize}`;
        const savedBest = localStorage.getItem(sizeKey);
        if (savedBest) {
            setBestScore(parseInt(savedBest, 10));
        } else {
            setBestScore(0);
        }

        const currentStateKey = `${STORAGE_KEY}-${gridSize}`;
        const stored = localStorage.getItem(currentStateKey);
        if (stored) {
            try {
                const data = JSON.parse(stored);
                setTiles(data.tiles || []);
                setScore(data.score || 0);
                setSteps(data.steps || 0);
                setTime(data.time || 0);
                setGameOver(data.gameOver || false);
                setWon(data.won || false);
                setHasContinued(data.hasContinued || false);
                if (data.tiles && data.tiles.length === 0) {
                    startNewGame();
                }
            } catch (e) {
                startNewGame();
            }
        } else {
            startNewGame();
        }
    }, [gridSize]);

    // Timer Logic
    useEffect(() => {
        if (!gameOver && !won && gridSize) {
            timerRef.current = window.setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000);
        } else {
            if (timerRef.current) clearInterval(timerRef.current);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [gameOver, won, gridSize]);

    // Persistence
    useEffect(() => {
        const currentStateKey = `${STORAGE_KEY}-${gridSize}`;
        const sizeKey = `${BEST_SCORE_KEY}-${gridSize}`;

        if (tiles.length > 0 || gameOver) {
            localStorage.setItem(
                currentStateKey,
                JSON.stringify({ tiles, score, steps, time, gameOver, won, hasContinued })
            );
        }
        if (score > bestScore) {
            setBestScore(score);
            localStorage.setItem(sizeKey, score.toString());
        }
    }, [tiles, score, steps, time, gameOver, won, hasContinued, bestScore, gridSize]);

    const startNewGame = useCallback(() => {
        let initialTiles: Tile[] = [];
        const t1 = createRandomTile([], gridSize);
        if (t1) initialTiles.push(t1);
        const t2 = createRandomTile(initialTiles, gridSize);
        if (t2) initialTiles.push(t2);

        setTiles(initialTiles);
        setScore(0);
        setSteps(0);
        setTime(0);
        setGameOver(false);
        setWon(false);
        setHasContinued(false);
        setHistory(null);
    }, [gridSize]);

    const move = useCallback(
        async (direction: Direction) => {
            if (gameOver || (won && !hasContinued)) return;

            const previousState = {
                tiles: JSON.parse(JSON.stringify(tiles)),
                score,
                steps
            };

            const { tiles: nextTiles, score: addedScore, moved } = moveTiles(tiles, direction, gridSize);

            if (moved) {
                // Haptic Feedback for move
                await Haptics.impact({ style: ImpactStyle.Light });

                const newTile = createRandomTile(nextTiles, gridSize);
                if (newTile) {
                    nextTiles.push(newTile);
                }

                setHistory(previousState);
                setTiles(nextTiles);
                setScore((prev) => prev + addedScore);
                setSteps((prev) => prev + 1);

                if (addedScore > 0) {
                    // Heavier haptic for merge
                    await Haptics.impact({ style: ImpactStyle.Medium });
                }

                if (hasWon(nextTiles) && !won && !hasContinued) {
                    setWon(true);
                }

                if (checkIsGameOver(nextTiles, gridSize)) {
                    setGameOver(true);
                }
            }
        },
        [tiles, gameOver, won, hasContinued, score, steps, gridSize]
    );

    const undo = useCallback(() => {
        if (history) {
            setTiles(history.tiles);
            setScore(history.score);
            setSteps(history.steps);
            setHistory(null);
            setGameOver(false);
        }
    }, [history]);

    const continueGame = useCallback(() => {
        setHasContinued(true);
        setWon(false);
    }, []);

    return {
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
        canUndo: !!history,
    };
};
