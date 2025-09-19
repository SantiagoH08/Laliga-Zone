export async function getTeams(params?: { team?: string }) {
  const searchParams = new URLSearchParams();
  if (params?.team) searchParams.append("team", params.team);

  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(`${apiUrl}/team?${searchParams}`);
  if (!response.ok) throw new Error('Failed to fetch teams');
  console.log(response);
  return response.json();
}