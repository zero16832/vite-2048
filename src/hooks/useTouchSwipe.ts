
import { useDrag } from '@use-gesture/react';
import type { Direction } from '../utils/gameHelpers';

export const useTouchSwipe = (onSwipe: (dir: Direction) => void) => {
    // We return the bind function to be spread on the container
    return useDrag(
        ({ movement: [mx, my], last, canceled }) => {
            if (last && !canceled) {
                const threshold = 30; // Min distance in px

                if (Math.abs(mx) > Math.abs(my)) {
                    // Horizontal
                    if (Math.abs(mx) > threshold) {
                        if (mx < 0) onSwipe('LEFT');
                        else onSwipe('RIGHT');
                    }
                } else {
                    // Vertical
                    if (Math.abs(my) > threshold) {
                        if (my < 0) onSwipe('UP');
                        else onSwipe('DOWN');
                    }
                }
            }
        },
        {
            filterTaps: true,
        }
    );
};
