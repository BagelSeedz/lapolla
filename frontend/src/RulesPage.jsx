import React from "react";

class RulesPage extends React.Component {
    render() {
        return (
            <div className="center">
                <div className="rules">
                    <h1>WORLD CUP 2026 – GROUP STAGE POLLA (POOL)</h1>
                    <h2>Official Rules & Regulations</h2>
                    <h1>⸻</h1>
                    <Rule title="1. Entry & Participation">
                        {`
                            Entry fee: $20 per entry
                            Administrative fee: $2 per entry (covers printing and management costs)
                            Maximum of two (2) entries per person
                            No refunds will be issued after the submission deadline
                            An entry is only considered valid once:

                            Payment is completed, and a full set of predictions is submitted
                        `}
                    </Rule>
                    <h1>⸻</h1>
                    <Rule title="2. Match Coverage">
                        {`
                            This pool covers only all group stage matches of the FIFA World Cup 2026
                            All entries must be complete and clearly written
                            Any missing, unclear, or illegible predictions will receive 0 points for those matches
                        `}
                    </Rule>
                    <h1>⸻</h1>
                    <Rule title="3. Submission Deadline">
                        {`
                            All entries must be submitted on or before June 8 (end of day)
                            Participants may submit entries earlier if desired
                            Completed prediction packages will be distributed between June 9 and June 10
                            No late entries will be accepted under any circumstances
                        `}
                    </Rule>
                    <h1>⸻</h1>
                    <Rule title="4. Finality of Entries">
                        {`
                            Once submitted and included in the distributed packages, all predictions are final
                            No changes, edits, or corrections are allowed after submission
                        `}
                    </Rule>
                    <h1>⸻</h1>
                    <Rule title="5. Submission Format">
                        {`
                            Predictions must be written on the official form
                            All scores must be clearly legible
                            Example: a “7” must be clearly distinguishable from a “1”
                            Any unclear or ambiguous number will be considered invalid and scored as 0 points
                        `}
                    </Rule>
                    <h1>⸻</h1>
                    <Rule title="6. Official Results Source">
                        {`
                            All official match results will be based exclusively on the final scores published on the official FIFA website
                        `}
                    </Rule>
                    <h1>⸻</h1>
                    <Rule title="7. Scoring System">
                        {`
                            For each match:

                            3 points – Exact score prediction
                            1 point – Correct match outcome (correct winner or correctly predicted draw, but wrong score)
                            0 points – Incorrect outcome
                        `}
                    </Rule>
                    <h1>⸻</h1>
                    <Rule title="8. Score Updates & Communication">
                        {`
                            Official scores and participant standings will be updated daily, reflecting matches played the previous day
                            Updates will be shared via email to all participants (official communication channel)
                            An optional WhatsApp group may be created for informal updates and participant interaction
                        `}
                    </Rule>
                    <h1>⸻</h1>
                    <Rule title="9. Determination of Winner">
                        {`
                            Total points are calculated as the sum of all points earned across all group stage matches
                            The participant with the highest total points at the end of the group stage is the winner
                            In case of a tie, the prize will be divided equally among tied participants
                        `}
                    </Rule>
                    <h1>⸻</h1>
                    <Rule title="10. Prize Distribution">
                        {`
                            Winner(s) will receive the entire prize pool
                            Prize distribution will take place on July 8
                            Payment will be made in cash (or agreed electronic method if necessary)
                            Distribution will occur in the presence of at least one witness
                        `}
                    </Rule>
                    <h1>⸻</h1>
                    <Rule title="11. Payment Methods">
                        {`
                            Accepted payment methods:
                            Cash
                            Zelle
                            Venmo
                            Payment must be completed on or before the submission deadline
                        `}
                    </Rule>
                    <h1>⸻</h1>
                    <Rule title="12. Disputes & Resolution">
                        {`
                            These rules serve as the primary reference for all decisions
                            In case of dispute, the organizer will review the situation
                            If necessary, a neutral participant witness may assist in arbitration
                            All decisions are final and binding
                        `}
                    </Rule>
                    <h1>⸻</h1>
                    <Rule title="13. Integrity & Official Records">
                        {`
                            The organizer will retain a master copy of all submitted entries
                            All distributed copies are for transparency; however, in case of discrepancy, the organizer’s master copy will be considered the official version
                        `}
                    </Rule>
                    <h1>⸻</h1>
                    <p>By participating, all entrants agree to abide by these rules in full.</p>
                </div>
                <div className="rules">
                    <h1>COPA MUNDIAL 2026 – POLLA FASE DE GRUPOS</h1>
                    <h2>Reglas y Condiciones Oficiales</h2>
                    <h1>⸻</h1>
                    <Rule title="1. Inscripción y Participación">
                        {`
                            Costo de inscripción: $20 por entrada
                            Cargo administrativo: $2 por entrada (cubre costos de impresión y gestión)
                            Máximo de dos (2) entradas por persona
                            No se realizarán reembolsos después de la fecha límite de entrega
                            Una entrada será válida únicamente cuando:
                                Pago haya sido completado y el formulario completo de predicciones haya sido entregado
                        `}
                    </Rule>
                    <h1>⸻</h1>
                    <Rule title="2. Cobertura de Partidos">
                        {`
                            Esta polla cubre únicamente todos los partidos de la fase de grupos de la FIFA World Cup 2026
                            Todas las entradas deben estar completas y claramente escritas
                            Cualquier predicción faltante, poco clara o ilegible recibirá 0 puntos para ese partido
                        `}
                    </Rule>
                    <h1>⸻</h1>
                    <Rule title="3. Fecha Límite de Entrega">
                        {`
                            Todas las entradas deben ser entregadas a más tardar el 8 de junio (fin del día)
                            Los participantes pueden entregar sus predicciones antes si lo desean
                            Los paquetes con todas las predicciones serán distribuidos entre el 9 y 10 de junio
                            No se aceptarán entregas tardías bajo ninguna circunstancia
                        `}
                    </Rule>
                    <h1>⸻</h1>
                    <Rule title="4. Carácter Final de las Entradas">
                        {`
                            Una vez entregadas e incluidas en los paquetes distribuidos, todas las predicciones son finales
                            No se permiten cambios, ediciones ni correcciones después de la entrega
                        `}
                    </Rule>
                    <h1>⸻</h1>
                    <Rule title="5. Formato de Entrega">
                        {`
                            Las predicciones deben ser escritas en el formulario oficial
                            Todos los resultados deben ser claramente legibles
                            Ejemplo: un “7” debe distinguirse claramente de un “1”
                            Cualquier número poco claro o ambiguo será considerado inválido y recibirá 0 puntos
                        `}
                    </Rule>
                    <h1>⸻</h1>
                    <Rule title="6. Fuente Oficial de Resultados">
                        {`
                        Todos los resultados oficiales se basarán exclusivamente en los marcadores finales publicados en el sitio web oficial de FIFA
                        `}
                    </Rule>
                    <h1>⸻</h1>
                    <Rule title="7. Sistema de Puntuación">
                        {`
                            Para cada partido:

                            3 puntos – Marcador exacto
                            1 punto – Resultado correcto (ganador correcto o empate correctamente predicho, pero marcador incorrecto)
                            0 puntos – Resultado incorrecto
                        `}
                    </Rule>
                    <h1>⸻</h1>
                    <Rule title="8. Actualización de Resultados y Comunicación">
                        {`
                            Los resultados oficiales y la tabla de posiciones se actualizarán diariamente, reflejando los partidos del día anterior
                            Las actualizaciones se enviarán por correo electrónico a todos los participantes (canal oficial)
                            Se podrá crear un grupo opcional de WhatsApp para interacción y actualizaciones informales
                        `}
                    </Rule>
                    <h1>⸻</h1>
                    <Rule title="9. Determinación del Ganador">
                        {`
                            El total de puntos se calcula como la suma de todos los puntos obtenidos en los partidos de la fase de grupos
                            El participante con el mayor número de puntos al final de la fase de grupos será el ganador
                            En caso de empate, el premio será dividido equitativamente entre los participantes empatados
                        `}
                    </Rule>
                    <h1>⸻</h1>
                    <Rule title="10. Entrega de Premios">
                        {`
                            El/los ganador(es) recibirán el total del premio acumulado
                            La entrega del premio se realizará el 8 de julio
                            El pago se realizará en efectivo (o método electrónico acordado si es necesario)
                            La entrega se realizará en presencia de al menos un testigo
                        `}
                    </Rule>
                    <h1>⸻</h1>
                    <Rule title="11. Métodos de Pago">
                        {`
                            Métodos aceptados:
                            Efectivo
                            Zelle
                            Venmo
                            El pago debe realizarse antes o en la fecha límite de entrega
                        `}
                    </Rule>
                    <h1>⸻</h1>
                    <Rule title="12. Disputas y Resolución">
                        {`
                            Estas reglas serán la referencia principal para cualquier decisión
                            En caso de disputa, el organizador evaluará la situación
                            De ser necesario, un participante neutral podrá actuar como testigo en la resolución
                            Todas las decisiones serán finales y vinculantes
                        `}
                    </Rule>
                    <h1>⸻</h1>
                    <Rule title="13. Integridad y Registros Oficiales">
                        {`
                            El organizador conservará una copia maestra de todas las entradas
                            Las copias distribuidas son para transparencia; sin embargo, en caso de discrepancia, la copia maestra del organizador será la versión oficial
                        `}
                    </Rule>
                    <h1>⸻</h1>
                    <p>Al participar, todos los participantes aceptan cumplir con estas reglas en su totalidad.</p>
                </div>
            </div>
        );
    }
}

class Rule extends React.Component {
    render() {
        return (
            <>
                <h3>{this.props.title}</h3>
                <div style={{ whiteSpace: "pre-line" }}>
                    {this.props.children}
                </div>
            </>
        );
    }
}

export default RulesPage;