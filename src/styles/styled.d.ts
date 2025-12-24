
import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        background: string;
        gridBackground: string;
        gridEmptyCell: string;
        textDark: string;
        textLight: string;
        menuBackground: string;
        panelBackground: string;
    }
}
