
import React from 'react';
import { motion } from 'framer-motion';

interface ParticleProps {
    color: string;
}

export const ParticleExplosion: React.FC<ParticleProps> = ({ color }) => {
    // Generate random particles
    const particles = Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * 360;
        const distance = Math.random() * 40 + 30; // Distance to travel
        const x = Math.cos((angle * Math.PI) / 180) * distance;
        const y = Math.sin((angle * Math.PI) / 180) * distance;

        return { id: i, x, y };
    });

    return (
        <div style={{ position: 'absolute', top: '50%', left: '50%', width: 0, height: 0, overflow: 'visible', pointerEvents: 'none', zIndex: 20 }}>
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{ x: p.x, y: p.y, opacity: 0, scale: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    style={{
                        position: 'absolute',
                        width: '8px',
                        height: '8px',
                        backgroundColor: color,
                        borderRadius: '50%',
                        boxShadow: `0 0 4px ${color}`
                    }}
                />
            ))}
        </div>
    );
};
