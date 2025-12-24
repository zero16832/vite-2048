
import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { motion } from 'framer-motion';
import type { Tile } from '../utils/gameHelpers';
import { getTileStyle } from '../utils/constants';
import type { ThemeType } from '../utils/constants';
import { ParticleExplosion } from './ParticleExplosion';

interface BlockProps {
    tile: Tile;
    cellSize: number;
    gap: number;
}

const Wrapper = styled(motion.div) <{ size: number }>`
  position: absolute;
  width: ${(p) => p.size}px;
  height: ${(p) => p.size}px;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const breathAnimation = {
    scale: [1, 1.05, 1],
    boxShadow: [
        '0px 0px 5px rgba(255,255,255,0.1)',
        '0px 0px 20px rgba(255,255,255,0.4)',
        '0px 0px 5px rgba(255,255,255,0.1)',
    ],
};

export const Block: React.FC<BlockProps> = ({ tile, cellSize, gap }) => {
    const themeContext = useContext(ThemeContext);
    const currentThemeName = (themeContext as any)?.name || 'light';

    const style = getTileStyle(tile.value, currentThemeName as ThemeType);
    const x = tile.x * (cellSize + gap) + gap;
    const y = tile.y * (cellSize + gap) + gap;

    const getFontSize = (val: number) => {
        const s = val.toString();
        if (s.length <= 2) return 50;
        if (s.length === 3) return 40;
        if (s.length === 4) return 32;
        if (s.length === 5) return 26;
        return 22;
    };
    const svgFontSize = getFontSize(tile.value);

    return (
        <Wrapper
            size={cellSize}
            initial={tile.isNew ? { x, y, scale: 0, opacity: 0 } : { x, y }}
            animate={{
                scale: 1,
                opacity: 1,
                x,
                y,
                ...(tile.value >= 1024 ? breathAnimation : {})
            }}
            transition={
                tile.value >= 1024
                    ? {
                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                        boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                        x: { type: 'spring', stiffness: 300, damping: 30 },
                        y: { type: 'spring', stiffness: 300, damping: 30 }
                    }
                    : { type: 'spring', stiffness: 300, damping: 30 }
            }
        >
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 100 100"
                style={{ filter: 'drop-shadow(0px 2px 3px rgba(0,0,0,0.15))', overflow: 'visible' }}
            >
                <defs>
                    <linearGradient id={`grad-${tile.value}`} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: style.bg.startsWith('linear') ? '#8EC5FC' : style.bg, stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: style.bg.startsWith('linear') ? '#E0C3FC' : style.bg, stopOpacity: 1 }} />
                    </linearGradient>
                </defs>

                <rect
                    x="2"
                    y="2"
                    width="96"
                    height="96"
                    rx="12"
                    fill={style.bg.startsWith('linear') ? `url(#grad-${tile.value})` : style.bg}
                />

                <path
                    d="M 15 25 Q 30 15 85 15"
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                />

                <text
                    x="50"
                    y="54"
                    dominantBaseline="middle"
                    textAnchor="middle"
                    fill={style.color}
                    fontSize={svgFontSize}
                    fontWeight="900"
                    fontFamily="'Nunito', sans-serif"
                    style={{ pointerEvents: 'none' }}
                >
                    {tile.value}
                </text>
            </svg>

            {tile.isMerged && <ParticleExplosion color={style.color === '#f9f6f2' ? '#fff' : style.color} />}
        </Wrapper>
    );
};
