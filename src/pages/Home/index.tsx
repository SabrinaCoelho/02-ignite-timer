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
                    <TaskInput id="task" list="task-sugestions" type="text" placeholder="dê um nome para seu projeto"/>
                    <datalist id="task-sugestions">
                        <option value="projeto 1" />
                        <option value="projeto 2" />
                        <option value="projeto 3" />
                    </datalist>
                    <label htmlFor="minutesAmount">
                        durante
                    </label>
                    <MinutesAmountInput 
                        step={5}
                        id="minutesAmount"
                        type="number" 
                        placeholder="00"
                        min={5}
                        max={60}
                    />
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