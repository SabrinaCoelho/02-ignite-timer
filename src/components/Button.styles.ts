import styled from "styled-components";

export type ButtonVariant = "primary" | "secondary" | "danger" | "success";

interface ButtonContainerprops{
    variant: ButtonVariant
}

/* const buttonVariants = {
    primary: "purple",
    secondary: "orange",
    danger: "red",
    success: "green"
} */

export const ButtonContainer = styled.button<ButtonContainerprops>`
    width: 160px;
    height: 40px;

    background-color: ${props => props.theme["green-500"]};
`