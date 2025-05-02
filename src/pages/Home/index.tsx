import { Play } from "@phosphor-icons/react";
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";

export function Home(){
    return(
        <HomeContainer>
            <form action="#">
                <FormContainer>
                    <label htmlFor="task">
                        Vou trabalhar em
                    </label>
                    <TaskInput id="task" type="text" placeholder="dê um nome para seu projeto"/>
                    <label htmlFor="minutesAmount">
                        durante
                    </label>
                    <MinutesAmountInput id="minutesAmount" type="number" placeholder="00"/>
                    <span>
                        minutos
                    </span>
                </FormContainer>
            
                <CountDownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountDownContainer>
                <StartCountdownButton type="submit" disabled>
                    <Play size={24} />
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}