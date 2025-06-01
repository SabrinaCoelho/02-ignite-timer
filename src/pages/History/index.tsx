import { useContext } from "react";
import { CyclesContext } from "../../contexts/CyclesContext";
import { HistoryConatiner, HistoryList, Status } from "./styles";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Cycle } from "../../reducers/cycles/reducer";

export function History(){

    const {cycles} = useContext(CyclesContext);
    return(
        <HistoryConatiner>
            <h1>Meu Histórico</h1>
            {/* <pre>
                {JSON.stringify(cycles, null, 2)}
            </pre> */}
            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cycles.map((cycle: Cycle) => {
                                return(
                                    <tr key={cycle.id}>
                                        <td>{cycle.task}</td>
                                        <td>{cycle.minutesAmount} minutos</td>
                                        <td>{formatDistanceToNow(new Date(cycle.startDate), {locale: ptBR, addSuffix: true})}</td>
                                        <td>
                                            {
                                                cycle.finishedDate && (<Status statusColor="green">Concluído</Status>)
                                            }
                                            {
                                                cycle.interruptedDate && (<Status statusColor="red">Interrompido</Status>)
                                            }
                                            {
                                                !cycle.finishedDate && !cycle.interruptedDate && (<Status statusColor="yellow">Em andamento</Status>)
                                            }
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </HistoryList>
        </HistoryConatiner>
    )
}