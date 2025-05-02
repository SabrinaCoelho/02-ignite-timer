import styled from "styled-components";

export const HeaderContainer = styled.header`
    display: flex;
    align-items: center;
    justify-content: space-between;

    nav{
        display: flex;
        gap: 0.5rem;
    }
    a{
        height: 3rem;
        width: 3rem;
        display: flex;

        justify-content: center;
        align-items: center;

        color: ${props => props.theme["gray-100"]};

        border-top: solid transparent;
        border-bottom: solid transparent;

        &:hover{
            border-bottom: solid ${props => props.theme["green-500"]};
        }
        &.active{
            color: ${props => props.theme["green-500"]};
        }
    }
`