import PlayerIcon from './icons/player';
import TeamIcon from './icons/team';
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";


type Props = {
  selectedOption: string | null;
  setSelectedSearchByTeam: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedSearchByName: React.Dispatch<React.SetStateAction<boolean>>;
  setStartSearch: React.Dispatch<React.SetStateAction<boolean>>;
  startSearch: boolean;
};

export default function PlayerFinder({ selectedOption, setSelectedSearchByTeam, setSelectedSearchByName, setStartSearch, startSearch }: Props) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setStartSearch(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setStartSearch]);

  return (
        <div className="py-8 my-4 mx-8  rounded w-full flex flex-col items-center">
            <h1 className="text-2xl md:text-xl text-[#00000A] mb-4 font-bold">
                {selectedOption ? `Choose a Player by:` : 'Please select a formation'}
            </h1>
            <AnimatePresence>
              {selectedOption && (
                <motion.div key="player-finder"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8 }}
                  className={`
                    flex flex-col items-center gap-2 mt-8                    
                  `}
                >
                  <div 
                      onClick={() => { 
                        console.log(setSelectedSearchByTeam(true)); 
                        setStartSearch(false);}}
                      className="
                      flex flex-col items-center cursor-pointer
                      duration-300 ease-in-out hover:scale-105 active:scale-95"
                  >
                      <TeamIcon className={`text-[#00000A] p-4 size-20 md:size-30 border-[#00000A] border-4 rounded-full  transition delay-150 ${startSearch ? 'animate-pulse border-yellow-500 text-yellow-500' : ''}`} />
                      <h2 className={`w-full text-center text-[#00000A] text-lg md:text-xl font-semibold mt-2 ${startSearch ? 'animate-pulse border-yellow-500 text-yellow-500' : ''}`}>
                          Team
                      </h2>
                  </div>
                  <h2 className="text-[#00000A] text-lg md:text-xl font-semibold my-4">
                      or
                  </h2>
                  <div 
                      onClick={() => { 
                        console.log(setSelectedSearchByName(true)); 
                        setStartSearch(true); }}
                      className="
                      flex flex-col items-center cursor-pointer
                      duration-300 ease-in-out hover:scale-105 active:scale-95"
                  >
                      <PlayerIcon className={`text-[#00000A] p-4 size-20 md:size-30 border-[#00000A] border-4 rounded-full  transition delay-150 ${startSearch ? 'animate-pulse border-yellow-500 text-yellow-500' : ''}`} />
                      <h2 className={`w-full text-center text-[#00000A] text-lg md:text-xl font-semibold mt-2 ${startSearch ? 'animate-pulse border-yellow-500 text-yellow-500' : ''}`}>
                          Name
                      </h2>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
        </div>
    );
}