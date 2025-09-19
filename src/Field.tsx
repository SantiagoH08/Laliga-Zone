import type { Player } from "./types/Player";
import type { Team } from "./types/Team";
import { useRef, useEffect, useState,useMemo } from "react";


type FieldProps = {
  selected: string | null;
  player: Player | null;
  setPlayerInfo: React.Dispatch<React.SetStateAction<Player | null>>;
  setPlayer: React.Dispatch<React.SetStateAction<Player | null>>;
  setSelectedSearchByName: React.Dispatch<React.SetStateAction<boolean>>;
  setTeam: React.Dispatch<React.SetStateAction<Team | null>>;
  setPosition: React.Dispatch<React.SetStateAction<string|null>>;
  clean : boolean
  setClean: React.Dispatch<React.SetStateAction<boolean>>;
  setStartSearch: React.Dispatch<React.SetStateAction<boolean>>;
}
type Position = { x: number; y: number, pos: string, };


export default function Field({ selected, player, setPlayer,setPlayerInfo, setSelectedSearchByName, setTeam,setPosition,clean,setClean,setStartSearch }: FieldProps) {
    
    const [assignedPlayers, setAssignedPlayers] = useState<{ [key: number]: Player | null }>({});
    const fieldRef = useRef<HTMLDivElement>(null);
    const [pos, setPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const position = player ? player.position.split(",") : null;
    const [holdInformation, setHoldInformation] = useState<boolean>(false);
    const [activeIdx, setActiveIdx] = useState<number | null>(null);
    const [pendingPlayer, setPendingPlayer] = useState<Player | null>(null);
    const [isPendingPosition, setIsPendingPosition] = useState(false);

    const formations = useMemo<{ [key: string]: Position[] }>(() => ({
        "4-3-3": [
            { x: 0, y: pos.y / 2 - (0.1 * pos.y), pos: "GK" },
            { x: pos.x / 2 - (0.1 * pos.x), y: pos.y / 2 - (0.35 * pos.y), pos: "DF" },
            { x: -pos.x / 2 + (0.1 * pos.x), y: pos.y / 2 - (0.35 * pos.y), pos: "DF" },
            { x: -pos.x / 2 + (0.3 * pos.x), y: pos.y / 2 - (0.25 * pos.y), pos: "DF" },
            { x: pos.x / 2 - (0.3 * pos.x), y: pos.y / 2 - (0.25 * pos.y), pos: "DF" },
            { x: 0, y: 0.05 * pos.y, pos: "MF" },
            { x: -pos.x / 2 + (0.1 * pos.x), y: -pos.y / 2 + (0.15 * pos.y), pos: "FW" },
            { x: 0.25 * pos.x, y: -0.15 * pos.y, pos: "MF" },
            { x: 0, y: -pos.y / 2 + (0.1 * pos.y), pos: "FW" },
            { x: -0.25 * pos.x, y: -0.15 * pos.y, pos: "MF" },
            { x: pos.x / 2 - (0.1 * pos.x), y: -pos.y / 2 + (0.15 * pos.y), pos: "FW" },
        ],
        "3-5-2": [
            { x: 0, y: pos.y / 2 - (0.1 * pos.y), pos: "GK" },
            { x: pos.x / 2 - (0.2 * pos.x), y: pos.y / 2 - (0.25 * pos.y), pos: "DF" },
            { x: -pos.x / 2 + (0.1 * pos.x), y: -pos.y / 2 + (0.35 * pos.y), pos: "MF" },
            { x: -pos.x / 2 + (0.2 * pos.x), y: pos.y / 2 - (0.25 * pos.y), pos: "DF" },
            { x: 0, y: pos.y / 2 - (0.25 * pos.y), pos: "DF" },
            { x: -pos.x / 2 * 0.25, y: 0.05 * pos.y, pos: "MF" },
            { x: -pos.x / 2 * 0.25, y: -pos.y / 2 + (0.1 * pos.y), pos: "FW" },
            { x: pos.x / 2 * 0.25, y: 0.05 * pos.y, pos: "MF" },
            { x: pos.x / 2 * 0.25, y: -pos.y / 2 + (0.1 * pos.y), pos: "FW" },
            { x: 0, y: -0.15 * pos.y, pos: "MF" },
            { x: pos.x / 2 - (0.1 * pos.x), y: -pos.y / 2 + (0.35 * pos.y), pos: "MF" },
        ],
        "4-4-2": [
            { x: 0, y: pos.y / 2 - (0.1 * pos.y), pos: "GK" },
            { x: pos.x / 2 - (0.1 * pos.x), y: pos.y / 2 - (0.35 * pos.y), pos: "DF" },
            { x: -pos.x / 2 + (0.1 * pos.x), y: pos.y / 2 - (0.35 * pos.y), pos: "DF" },
            { x: -pos.x / 2 + (0.3 * pos.x), y: pos.y / 2 - (0.25 * pos.y), pos: "DF" },
            { x: pos.x / 2 - (0.3 * pos.x), y: pos.y / 2 - (0.25 * pos.y), pos: "DF" },
            { x: -pos.x / 2 * 0.25, y: 0.05 * pos.y, pos: "MF" },
            { x: -pos.x / 2 * 0.25, y: -pos.y / 2 + (0.1 * pos.y), pos: "FW" },
            { x: pos.x / 2 * 0.25, y: 0.05 * pos.y, pos: "MF" },
            { x: pos.x / 2 * 0.25, y: -pos.y / 2 + (0.1 * pos.y), pos: "FW" },
            { x: -pos.x / 2 + (0.1 * pos.x), y: -pos.y / 2 + (0.35 * pos.y), pos: "MF" },
            { x: pos.x / 2 - (0.1 * pos.x), y: -pos.y / 2 + (0.35 * pos.y), pos: "MF" },
        ],
        "5-3-2": [
            { x: 0, y: pos.y / 2 - (0.1 * pos.y), pos: "GK" },
            { x: pos.x / 2 - (0.1 * pos.x), y: pos.y / 2 - (0.35 * pos.y), pos: "DF" },
            { x: -pos.x / 2 + (0.1 * pos.x), y: pos.y / 2 - (0.35 * pos.y), pos: "DF" },
            { x: -pos.x / 2 * 0.45, y: pos.y / 2 - (0.25 * pos.y), pos: "DF" },
            { x: pos.x / 2 * 0.45, y: pos.y / 2 - (0.25 * pos.y), pos: "DF" },
            { x: 0, y: pos.y / 2 - (0.25 * pos.y), pos: "DF" },
            { x: -pos.x / 2 * 0.25, y: -pos.y / 2 + (0.1 * pos.y), pos: "FW" },
            { x: 0, y: 0.05 * pos.y, pos: "MF" },
            { x: pos.x / 2 * 0.25, y: -pos.y / 2 + (0.1 * pos.y), pos: "FW" },
            { x: -0.25 * pos.x, y: -0.15 * pos.y, pos: "MF" },
            { x: 0.25 * pos.x, y: -0.15 * pos.y, pos: "MF" },
        ],
        "4-2-3-1": [
            { x: 0, y: pos.y / 2 - (0.1 * pos.y), pos: "GK" },
            { x: pos.x / 2 - (0.1 * pos.x), y: pos.y / 2 - (0.35 * pos.y), pos: "DF" },
            { x: -pos.x / 2 + (0.1 * pos.x), y: pos.y / 2 - (0.35 * pos.y), pos: "DF" },
            { x: -pos.x / 2 + (0.3 * pos.x), y: pos.y / 2 - (0.25 * pos.y), pos: "DF" },
            { x: pos.x / 2 - (0.3 * pos.x), y: pos.y / 2 - (0.25 * pos.y), pos: "DF" },
            { x: -pos.x / 2 * 0.25, y: 0.05 * pos.y, pos: "MF" },
            { x: -pos.x / 2 + (0.1 * pos.x), y: -pos.y / 2 + (0.3 * pos.y), pos: "FW" },
            { x: pos.x / 2 * 0.25, y: 0.05 * pos.y, pos: "MF" },
            { x: 0, y: -pos.y / 2 + (0.1 * pos.y), pos: "FW" },
            { x: 0, y: -0.15 * pos.y, pos: "MF" },
            { x: pos.x / 2 - (0.1 * pos.x), y: -pos.y / 2 + (0.3 * pos.y), pos: "FW" },
        ],
    }), [pos]);

    
    useEffect(() => {
        if (clean) {
            setAssignedPlayers({});
            setIsPendingPosition(false);
            setActiveIdx(null);
            setPlayer(null);
            setPendingPlayer(null);
            setHoldInformation(false);
            setPosition(null);
            setSelectedSearchByName(false);
            setTeam(null);
            setPlayerInfo(null);
            setClean(false);
        }
    }, [clean, setClean, setIsPendingPosition, setActiveIdx, setPlayer, setPendingPlayer, setHoldInformation, setPosition, setSelectedSearchByName, setTeam, setPlayerInfo]);
        // Cancelar proceso con Escape solo si player es diferente de null
    useEffect(() => {
        

        const cleanData = () => {
            setIsPendingPosition(false);
            setActiveIdx(null);
            setPlayer(null);
            setPendingPlayer(null);
            setHoldInformation(false);
            setPosition(null);
            setSelectedSearchByName(false);
            setTeam(null);
        };        

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                cleanData();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [setPlayer,setPlayerInfo,setSelectedSearchByName,setTeam,setPosition]);
    


    // Asignar jugador cuando primero se selecciona la posición y luego el jugador
    useEffect(() => {
        if (player && activeIdx !== null) {
            
            if (assignedPlayers[activeIdx]?.id === player.id) return;
            const isValidPosition = 
                selected &&
                formations[selected][activeIdx].pos &&
                position &&
                position.includes(formations[selected][activeIdx].pos)&&
                !assignedPlayers[activeIdx];
            if(isValidPosition){
                setAssignedPlayers(prev => {
                    const updated = { ...prev };
                    // Si el jugador ya está en otra posición, lo quitas
                    const prevIdx = Object.entries(prev).find(([, p]) => p && p.id === player.id)?.[0];
                    if (prevIdx !== undefined) {
                        const numIdx = Number(prevIdx);
                        if (!isNaN(numIdx)) {
                            updated[numIdx] = null;
                        }
                    }
                    updated[activeIdx] = player;
                    return updated;
                });
                setPosition(null)
                setPlayerInfo(player);
                setPlayer(null);
                setSelectedSearchByName(false);
                setTeam(null);
                setHoldInformation(true);
                setActiveIdx(null);
            } // Opcional: limpiar la selección de posición después de asignar
            
            else{
                console.log('hola XS')
            }
            console.log(activeIdx)
        }
        else if(pendingPlayer){
            setPlayer(pendingPlayer);
        }
        
        
        
    }, [player, activeIdx,setPlayer,setPlayerInfo,setSelectedSearchByName,setTeam,pendingPlayer,formations,position,selected,setPosition,assignedPlayers]);

    


    useEffect(() => {
        function handleResize() {
            if (fieldRef.current) {
                const rect = fieldRef.current.getBoundingClientRect();
                setPos({ x: rect.width, y: rect.height });
            }
        }
        window.addEventListener("resize", handleResize);
        // Llama una vez para asegurar el tamaño inicial
        handleResize();
        
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        setAssignedPlayers(prev => {
            if (!selected) return {};
            const updated: { [key: number]: Player | null } = {};
            const positions = formations[selected];

            positions.forEach((posObj, idx) => {
                const player = prev[idx];
                if (
                    player &&
                    player.position.split(",").map(p => p.trim()).includes(posObj.pos)
                ) {
                    updated[idx] = player;// El jugador sí puede estar en esa posición
                }else {
                    updated[idx] = null;// El jugador no corresponde, se borra
                }
            });
            return updated;
        });
    }, [selected,formations]);

    

  return (
    <div id="Field" ref={fieldRef} className="h-[85%] w-[85%] flex relative items-center justify-center bg-[#239943] md:w-[60vh] md:h-[80vh] rounded-3xl ">
      {Array.from({ length: 11 }).map((_, idx) => {

        const isValidPosition = 
            selected && 
            formations[selected][idx].pos && 
            position && 
            position.includes(formations[selected][idx].pos)&&
            !assignedPlayers[idx];
        const borderClass = 
            isValidPosition? (activeIdx === idx ? 'animate-pulse border-4 border-green-500' : 'animate-pulse border-4 border-blue-500') : activeIdx === idx ? 'border-4 border-yellow-500' : 'border-4 border-red-300';
        return (
                <div
                    key={idx}
                    onMouseEnter={() => {
                        if (assignedPlayers[idx]!==null && player==null) {
                            setPlayerInfo(assignedPlayers[idx]);
                            console.log("Assigned Player:", assignedPlayers[idx]);
                        }
                    }}
                    onMouseLeave={() => {
                        if (assignedPlayers[idx]!==null && player==null && !holdInformation) {
                            setPlayerInfo(null);
                        }                        
                    }}
                    onClick={() => {
                        if(selected && assignedPlayers[idx]){
                            setPosition(formations[selected][idx].pos)
                            console.log('hola jeje')
                        }
                        if (player && isValidPosition) {
                            
                            if(assignedPlayers[idx]?.id === player.id) {
                                setPosition(null);
                                setPendingPlayer(null);
                                setHoldInformation(true);
                                setPlayerInfo(player);
                                setPlayer(null);
                                setSelectedSearchByName(false)
                                setTeam(null);
                                setActiveIdx(null);
                                return
                            }
                            
                            const prevIdx = Object.entries(assignedPlayers)
                             .find(([, p]) => p && p.id === player.id)?.[0];
                            setAssignedPlayers(prev => {
                                const updated = { ...prev };
                                if (prevIdx !== undefined) {
                                    const numIdx = Number(prevIdx);
                                    if (!isNaN(numIdx)){
                                        updated[numIdx] = null;
                                    }
                                }
                                setActiveIdx(null);
                                updated[idx] = player;
                                return updated;
                            });
                            setIsPendingPosition(false);
                            setPosition(null);
                            setPendingPlayer(null);
                            setHoldInformation(true);
                            setPlayerInfo(player);
                            setPlayer(null);
                            setSelectedSearchByName(false)
                            setTeam(null);
                        }
                        if(assignedPlayers[idx] && !isPendingPosition){
                            
                            setActiveIdx(idx);
                            setPendingPlayer(assignedPlayers[idx]);                            
                            setHoldInformation(false);
                            setIsPendingPosition(true);
                        }
                        else { 
                            if(selected && !player && !activeIdx ){
                                setActiveIdx(idx)
                                setPendingPlayer(null)
                                setPosition(formations[selected][idx].pos)
                                setStartSearch(true);
                            }
                        }
                        console.log(isPendingPosition)
                        console.log(activeIdx)
                    }}
                    
                    className={`absolute w-12 h-12 md:w-16 md:h-16 bg-[#1f1b1b] rounded-full 
                                transition-transform duration-500 flex items-center 
                                justify-center text-white text-xs md:text-xl font-bold
                                ${borderClass }
                                transition duration-150 ease-in-out
                                hover:scale-105 active:scale-95
                                cursor-pointer
                               `}
                    style={{
                        transform: selected
                            ? `translate(${formations[selected][idx].x}px, ${formations[selected][idx].y}px)`
                            : "translate(0, 0)",
                    }}
                >
                    {selected
                        ? assignedPlayers[idx]
                            ? (() => {
                                const name = assignedPlayers[idx].name;
                                const parts = name.split(" ");
                                if (parts.length > 1) {
                                    return parts[0][0].toUpperCase() + parts[1][0].toUpperCase();
                                } else {
                                    return name.slice(0, 2);
                                }
                            })()
                            : formations[selected][idx].pos
                        : ""}
                </div>
            )})}
        </div>
    );
}
