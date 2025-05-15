import { createContext, useContext, useState } from "react";

//Boa Pratica:
//o nome do contexto DEVE ter sentido com o que será guardado no contexto
const CyclesContext = createContext({} as any);//Valor inicial desse contexto

function NewCycleForm(){
    const {activeCycle, setActiveCycle} = useContext(CyclesContext);
    return(
        <h1>
            NewCycleForm: {activeCycle}
            <button
                onClick={() => {
                    setActiveCycle(5)
                }}
            >
                Alterar
            </button>
        </h1>
    );
}

function Countdown(){
    const {activeCycle} = useContext(CyclesContext);
    
    return(
        <h1>Countdown: {activeCycle} </h1>
    )
}

export function Home() {
    const [activeCycle, setActiveCycle] = useState(0);

    return(
        <CyclesContext.Provider value={{activeCycle, setActiveCycle}}>
            {/* Acima colocamos todos os valores que queremos compartilhar */}
            <NewCycleForm/>
            <Countdown/>
        </CyclesContext.Provider>
    )
}