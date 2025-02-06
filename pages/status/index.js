import useSWR from "swr";

async function fetchAPI() {
  const response = await fetch("/api/v1/status");
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return (
    <div>
      <p>Última atualização {updatedAtText}</p>
      <Dependencies />
    </div>
  );
}

function Dependencies() {
  const { data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  console.log(data);

  return (
    <div>
      {data && data.dependencies && (
        <>
          <h2>Banco de Dados</h2>
          <ul>
            <li>
              Numero máximo de conexões:{" "}
              {data.dependencies.database.max_connections}
            </li>
            <li>Versão: {data.dependencies.database.version}</li>
            <li>
              Coneções abertas: {data.dependencies.database.opened_connections}
            </li>
          </ul>
        </>
      )}
    </div>
  );
}
