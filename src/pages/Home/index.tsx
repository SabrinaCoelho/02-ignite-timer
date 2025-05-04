import { Play } from "@phosphor-icons/react";
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function Home(){

    const {
        register, handleSubmit, watch
    } = useForm()
    
    function handleCreateNewCycle(data: any){
        /* data são os dados dos inputs do form */
        console.log(data)
    }

    const isSubmitDisabled = watch("task");
    /* 
    O que é esse register?!
    function register(nomeDoCampo: string){
        return{
            onChange: () => void,
            onBlur: () => void,
            onFocus: () => void
        }
    }
    
    */
    
    return(
        <HomeContainer>
            <form action="#" onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormContainer>
                    <label htmlFor="task">
                        Vou trabalhar em
                    </label>
                    <TaskInput 
                        id="task"
                        list="task-sugestions"
                        type="text"
                        placeholder="dê um nome para seu projeto"
                        {...register("task")}/*param -> nome do input */
                    />
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
                        {...register("minutesAmount", {valueAsNumber: true})}
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
                <StartCountdownButton type="submit" disabled={!isSubmitDisabled}>
                    <Play size={24} />
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    )
}