import Field from "./Field"
import Select from "./Select"
import { useState, useEffect, useRef } from "react";
import PlayerFinder from "./PlayerFinder";
import SearchByTeam from "./SearchByTeam";
import SearchByName from "./SearchByName";
import PlayerStats from "./PlayerStats";
import type { Team } from "./types/Team";
import type { Player } from "./types/Player";



export default function Template() {
    const [selectedSearchByTeam, setSelectedSearchByTeam] = useState(false);
    const [selectedSearchByName, setSelectedSearchByName] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [player, setPlayer] = useState<Player| null>(null);
    const [playerInfo, setPlayerInfo] = useState<Player | null>(null);
    const [team, setTeam] = useState<Team | null>(null);
    const [position,setPosition] = useState<string|null>(null);
    const [clean, setClean] = useState(false);
    const [startSearch, setStartSearch] = useState(false);
    const playerFinderRef = useRef<HTMLDivElement>(null);
    const fieldRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (startSearch && playerFinderRef.current) {
            playerFinderRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [startSearch]);

    useEffect(() => {
        if (player && fieldRef.current) {
            fieldRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [player]);


  return(
    
    <div className="flex flex-col md:grid  md:grid-rows-1 md:grid-cols-4  place-items-center md:min-h-[82vh] md:max-h-[82vh] bg-gray-100">
        <div className="bg-[#FAFAFA] size-full flex flex-col items-center md:border-b-3 border-t-3 border-[#FF4B44] p-4 md:col-span-1 md:row-span-1 h-full w-full">
            <Select
                options={["4-3-3", "3-5-2", "4-4-2", "5-3-2","4-2-3-1"]}
                onSelect={setSelectedOption}
                buttonClassName="bg-[#FF4B44] mt-4"
                menuClassName="w-full bg-[#FF4B44]"
                optionClassName="text-lg"
            />
            <h2 className="text-[#00000A] text-center mt-4">
                To view a player's information, hover over a position or use the search panel
            </h2>
            
            <PlayerStats playerInfo={playerInfo} />
            <button>
                <p onClick={() => setClean(true)} className=" text-white text-center my-4 bg-[#FF4B44] p-2 px-8 rounded hover:bg-[#CC3C36] active:bg-[#FF4B44] cursor-pointer">
                    Clean Field
                </p>
            </button>
        </div>
        <div 
            ref={fieldRef}
            className={`bg-[#EAEAEA] md:border-t-3 md:border-b-3  border-[#FF4B44] size-full row-span-10 md:row-span-1 md:col-span-2 flex justify-center items-center h-[700px] md:h-full`}
        >
            
            <Field 
                selected={selectedOption} 
                player={player} 
                setPlayer={setPlayer} 
                setSelectedSearchByName={setSelectedSearchByName}
                setTeam={setTeam}
                setPlayerInfo={setPlayerInfo}
                setPosition={setPosition}
                clean={clean}
                setClean={setClean}
                setStartSearch={setStartSearch}
            />
        </div>
        <div ref={playerFinderRef} className="bg-[#FAFAFA] border-t-3 border-b-3 border-[#FF4B44] size-full flex justify-center h-[500px] md:h-full">
            {!(selectedSearchByTeam || selectedSearchByName) && (
                <PlayerFinder 
                    selectedOption={selectedOption} 
                    setSelectedSearchByTeam={setSelectedSearchByTeam}
                    setSelectedSearchByName={setSelectedSearchByName}
                    setStartSearch={setStartSearch}
                    startSearch={startSearch}
                />
            )}
            {selectedSearchByTeam && (
                <SearchByTeam 
                    setSelectedSearchByTeam={setSelectedSearchByTeam}
                    setSelectedSearchByName={setSelectedSearchByName}
                    setTeam={setTeam}
                />
            )}
            {selectedSearchByName && (
                <SearchByName
                    setSelectedSearchByName={setSelectedSearchByName}
                    setPlayer={setPlayer}
                    team={team ? team.name : null}
                    position={position}
                    setPlayerInfo={setPlayerInfo}
                    player={player}
                />  
            )}
            
        </div>
    </div>
  )
}
