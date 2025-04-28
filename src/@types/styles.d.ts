import "styled-components";
import { defaultTheme } from "../styles/default";

type ThemeType = typeof defaultTheme;
//estamos guardando a tipagem inferida pelo typescript dentro da variavel ThemeType



declare module 'styled-components'{//Estou criando uma tipagem para o modulo styled-components
    export interface DefaultTheme extends ThemeType{}
    //Acima estamos sobrescrevendo a interface DefaultTheme com nosso tipo
}