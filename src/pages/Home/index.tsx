import { Play } from "@phosphor-icons/react";
import { CountDownContainer, FormContainer, HomeContainer, MinutesAmountInput, Separator, StartCountdownButton, TaskInput } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

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

    const {register, handleSubmit, watch, reset} = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues:{
            task: "",
            minutesAmount: 0
        }
    });

    // console.log(handleSubmit)
    function handleCreateNewCycle(data: NewCycleFormData){
        /* data são os dados dos inputs do form */
        console.log(data)
        reset();
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
            <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
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