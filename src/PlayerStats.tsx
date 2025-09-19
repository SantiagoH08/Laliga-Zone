import type { Player } from "./types/Player";

type Props = {
    playerInfo: Player | null;
};


export default function PlayerStats({ playerInfo }: Props) {
    return (
        <div className="text-[#00000A]">
            {playerInfo ? (
                <div className="text-center">
                    {Object.entries(playerInfo)
                        .filter(([key]) => key !== 'id')
                        .map(([key, value]) => (
                            <p key={key} className="mb-1">
                                <strong>{key}:</strong> {String(value)}
                            </p>
                        ))}
                </div>
            ) : ""}
        </div>
    )
}