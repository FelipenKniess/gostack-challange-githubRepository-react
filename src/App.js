import React, {useEffect, useState} from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositores] = useState([]);

  useEffect(() => {
    api.get('/repositories').then((response) => {
      setRepositores(response.data);
    })
  }, [])
  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: "Desafio t",
      url: "https://github.com/FelipenKniess/gostack-challange-githubRepository",
      techs: [
        "nodejs",
        "viewjs"
      ]
    })

    const newRepository = response.data;
    setRepositores([...repositories, newRepository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    console.log(repositories);
    setRepositores(repositories.filter(
      repository => repository.id !== id)
    )
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(response => (
          <li key={response.id}>
              {response.title}

              <button onClick={() => handleRemoveRepository(response.id)}>
                Remover
              </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;