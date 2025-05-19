import { HandPalm, Play } from "@phosphor-icons/react";
import {HomeContainer } from "./styles";
import { useContext } from "react";
import { NewCycleForm } from "./Components/NewCycleForm";
import { StartCountdownButton, StopCountdownButton } from "./Components/NewCycleForm/styles";
import { Countdown } from "./Components/Countdown";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { CyclesContext } from "../../contexts/CyclesContexts";

//zod.object -> estou validando um objeto
const newCycleFormValidationSchema = z.object({
    task: z.string().min(1, "Informe a tarefa"),
    minutesAmount: z.number()
                    .min(5, "O ciclo precisa ser de no mínimo 5 minutos.")
                    .max(60, "O ciclo precisa ser de no máximo 60 minutos.")
});

// interface NewCycleFormData{
//     task: string;
//     minutesAmount: number;
// }

type NewCycleFormData = Zod.infer<typeof newCycleFormValidationSchema>;

export function Home(){
    const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext);
    //
    // useEffect(() => {
    //     fetch("https://api.github.com/users/sabrinacoelho/repos")
    //     .then(resp => resp.json())
    //     .then(data => {
    //         console.log(data)
    //         const x = data.map((item: any) => item.full_name)
    //         console.log(x)
    //     })
    // });
    //

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues:{
            task: "",
            minutesAmount: 0,

        }
    });
    
    const { handleSubmit, watch, reset} = newCycleForm;

    const isSubmitDisabled = watch("task");

    function handleCreateNewCycle(data: NewCycleFormData){
        createNewCycle(data);
        reset();
    }
   
    return(
        <HomeContainer>
            <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
                
                <FormProvider {...newCycleForm}>
                    <NewCycleForm/>
                </FormProvider>
                <Countdown />
                {
                    activeCycle ? (
                        <StopCountdownButton type="button" onClick={interruptCurrentCycle}>
                            <HandPalm size={24} />
                            Interromper
                        </StopCountdownButton>
                    ): (
                        <StartCountdownButton type="submit" disabled={!isSubmitDisabled}>
                            <Play size={24} />
                            Começar
                        </StartCountdownButton>
                    )
                }
            </form>
        </HomeContainer>
    )
}