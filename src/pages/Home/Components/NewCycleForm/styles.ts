import { styled } from "styled-components";

export const FormContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    color: ${props => props.theme["gray-100"]};
    font-size: 1.125rem;
    font-weight: bold;
    flex-wrap: wrap;
`;

export const BaseCountdownButton = styled.button`
    width: 100%;
    border: 0;
    padding: 1rem;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;

    gap: 0.5rem;
    font-weight: bold;
    cursor: pointer;

    &:disabled{
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

export const BaseInput = styled.input`
    background: transparent;
    height: 2.5rem;
    border: 0;
    border-bottom: 2px solid ${props => props.theme["gray-500"]};
    font-weight: bold;
/* el. input nao herda o estilo do pai, mas podemos forçar aqui para seja herde com inherit*/
    font-size: 1.125rem;
/* el. input nao herda o estilo do pai, mas podemos forçar aqui para seja herde com inherit*/
    padding: 0 0.5rem;
    color: ${props => props.theme["gray-100"]};

    &::placeholder{
        color: ${props => props.theme["gray-500"]};
    }
    &:focus{
        box-shadow: none;
        border-color: ${props => props.theme["green-500"]};
    }
`;

export const TaskInput = styled(BaseInput)`
    flex: 1;

    &::-webkit-calendar-picker-indicator{
        display: none !important;
    }
`;

export const MinutesAmountInput = styled(BaseInput)`
    width: 4rem;
`;

export const StartCountdownButton = styled(BaseCountdownButton)`
    background: ${props => props.theme["green-500"]};
    color: ${props => props.theme["gray-100"]};

    
    &:not(:disabled):hover{
        background: ${props => props.theme["green-700"]};
    }
`
export const StopCountdownButton = styled(BaseCountdownButton)`
    background: ${props => props.theme["red-500"]};
    color: ${props => props.theme["gray-100"]};

    
    &:not(:disabled):hover{
        background: ${props => props.theme["red-700"]};
    }
`