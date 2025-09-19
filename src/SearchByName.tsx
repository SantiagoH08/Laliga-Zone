import { useEffect,useState } from "react";
import { getPlayers,getGoalkeepers } from "./services/players";
import type { Player } from "./types/Player";


type Props = {
    setSelectedSearchByName: React.Dispatch<React.SetStateAction<boolean>>;
    setPlayer: React.Dispatch<React.SetStateAction<Player | null>>;
    setPlayerInfo: React.Dispatch<React.SetStateAction<Player | null>>;
    team: string | null;
    position: string | null;
    player: Player | null;
}

export default function SearchByName({  setPlayer, team, position, setPlayerInfo, player}: Props){

    const [loading, setLoading] = useState(true);
    const [searchName, setSearchName] = useState("");
    const [players, setPlayers] = useState<Player[]>([]);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [goalkeepers, setGoalkeepers] = useState<Player[]>([]);

    useEffect(() => {
        getGoalkeepers()
            .then(data => {
                setGoalkeepers(data);
            }    
        ).catch(console.error);
    }, []); 

    useEffect(() => {
        const params: {name?: string; team?: string; position?: string} = {};
        if(searchName) params.name = searchName;
        if(team) params.team = team;
        if(position) params.position = position;
        setPlayer(null);
        getPlayers(Object.keys(params).length ? params : undefined)
          .then(setPlayers)
          .catch(console.error)
          .finally(() => setLoading(false));
        setSelectedId(null);
          
        }, [searchName, team, position, setPlayer]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setSelectedId(null);
                setPlayer(null);
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [setPlayer]);

    return(
        <div className="w-full h-full flex flex-col items-center justify-center bg-red-600">
            {!loading?
                <input
                    type="text"
                    value={searchName}
                    onChange={e => setSearchName(e.target.value)}
                    placeholder="Search Name..."
                    className="my-4 p-2 rounded w-3/4 text-center"
                />
                :
                null
            }
            {!loading?
                players.length === 0 ?(
                    <div className="w-[95%] h-full mb-2 flex items-center justify-center bg-gray-300 rounded-xl">
                        <p>No players found</p>
                    </div>
                ) : (
                    <div className="w-[95%] h-full mb-2 overflow-y-scroll custom-scrollbar bg-gray-300 rounded-xl">
                        <table className="w-full bg-white rounded">
                            <thead className="sticky h-3 top-0 bg-black z-10">
                                <tr>
                                    <th className="text-left p-2 text-white">Name</th>
                                    <th className="text-left p-2 text-white text-center">Team</th>
                                    <th className="text-left p-2 text-white text-center">Position</th>
                                </tr>
                            </thead>
                            <tbody className="h-full divide-y divide-gray-700">
                                {players.slice().sort((a, b) => a.name.localeCompare(b.name)).map(p => (
                                    <tr key={p.id}
                                        onClick={() => {
                                            
                                            setSelectedId(p.id);
                                            if (p.position === 'GK') {
                                                const gk = goalkeepers.find(g => g.id === p.id);
                                                setPlayerInfo(gk || p);
                                                setPlayer(gk || p);
                                            } else {
                                                setPlayer(p);
                                                setPlayerInfo(p);
                                            }
                                        }}
                                        onMouseEnter={() => {
                                            if (player === null) {
                                                if (p.position === 'GK') {
                                                    const gk = goalkeepers.find(g => g.id === p.id);
                                                    setPlayerInfo(gk || p);
                                                } else {
                                                    setPlayerInfo(p);
                                                }
                                            }
                                        }}
                                        onMouseLeave={() => {
                                            if (!player) setPlayerInfo(null);
                                        }}
                                        className={`
                                            h-15 divide-x divide-gray-700 
                                            ${selectedId === p.id ? "bg-red-700" : "hover:bg-red-700"}
                                            cursor-pointer 
                                            active:bg-red-500`}
                                        >
                                        <td className="p-2 text-black">{p.name}</td>
                                        <td className="p-2 text-black text-center">{p.team}</td>
                                        <td className="p-2 text-black text-center">{p.position}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-500"></div>
                )
            }
        </div>
    )

}