import { useQuery } from '@tanstack/react-query';

async function fetchHealth() {
  // We use a relative path, which will be proxied to the backend by the ingress.
  const res = await fetch('/api/health');
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
}

export function ApiHealth() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['apiHealth'],
    queryFn: fetchHealth,
  });

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-lg font-bold">API Health Check</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {data && (
        <pre className="p-2 mt-2 bg-gray-100 rounded">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      )}
    </div>
  );
}
