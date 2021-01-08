import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  
  const [Repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  },[]);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Repositório ${Date.now()}`,
      url: "www.teste.com",
      techs: ["NodeJS", "ReactJS", "ReactNative"]
    });

    const repository = response.data;

    setRepositories([...Repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const newRepositories = Repositories.filter(
      repository => repository.id !== id
    );
    
    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {Repositories.map(Repository => (
          <li key={Repository.id}>
            {Repository.title}
            <button onClick={() => handleRemoveRepository(Repository.id)}>
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
