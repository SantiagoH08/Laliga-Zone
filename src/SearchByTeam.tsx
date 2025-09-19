import { useEffect, useState } from "react";
import { getTeams } from "./services/team";
import type { Team } from "./types/Team";




type Props = {
    setSelectedSearchByTeam: React.Dispatch<React.SetStateAction<boolean>>;
    setTeam: React.Dispatch<React.SetStateAction<Team | null>>;
    setSelectedSearchByName: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SearchByTeam({ setSelectedSearchByTeam, setTeam, setSelectedSearchByName }: Props) {
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    useEffect(() => {
    getTeams(search ? { team: search } : undefined)
      .then(setTeams)
      .catch(console.error)
      .finally(() => setLoading(false));
      
    }, [search]);
    return (
        <div className="w-full flex flex-col items-center justify-center bg-red-600">
            {!loading?
                <input
                    type="text"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Search team..."
                    className="my-4 p-2 rounded w-3/4 text-center"
                />
                :
                null
            }
            <div id ='teams-list'
                className={`
                    overflow-y-scroll py-8 my-4 mx-8 custom-scrollbar
                    bg-red-800 rounded  h-full w-[95%]
                    ${teams.length > 0 ?'grid grid-cols-2 gap-4' : 'flex flex-col items-center justify-center ' }
                     `}>
                {loading ? (
                
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-purple-500"></div>
                
                ) : teams.length === 0 ? (
                    <p>No teams found</p>
                ) : (
                    teams.slice().sort((a, b) => a.name.localeCompare(b.name)).map(team => (
                        <div key={team.id}
                            onClick={() => {
                                setSelectedSearchByTeam(false)
                                setSelectedSearchByName(true)
                                setTeam(team)
                            }} 
                            className="flex flex-col items-center gap-2 p-2 duration-300 ease-in-out hover:scale-115 active:scale-95 cursor-pointer">
                            <img src={team.logoUrl} alt={`${team.name} logo`} className="w-8 h-8 object-contain" />
                            <span className="text-white text-center ">{team.name}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
