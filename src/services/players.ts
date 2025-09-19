
export async function getPlayers(params?: { name?: string; team?: string; position?: string }) {
  const searchParams = new URLSearchParams();
  
  if (params?.name) searchParams.set('name', params.name);
  if (params?.team) searchParams.set('team', params.team);
  if (params?.position) searchParams.set('position', params.position);

  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(`${apiUrl}/player?${searchParams}`);
  if (!response.ok) throw new Error('Failed to fetch players');
  return response.json();
}

export async function getGoalkeepers(params?: { name?: string; team?: string }) {
  const searchParams = new URLSearchParams();
  
  if (params?.name) searchParams.set('name', params.name);
  if (params?.team) searchParams.set('team', params.team);

  const apiUrl = import.meta.env.VITE_API_URL;
  const response = await fetch(`${apiUrl}/goalkeeper?${searchParams}`);
  if (!response.ok) throw new Error('Failed to fetch goalkeepers');
  return response.json();
}