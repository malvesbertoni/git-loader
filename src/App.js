import React, { useState, useEffect } from 'react';

import './styles.css';

export default function App() {
  const [repositories, setRepositories]= useState([]);
  const [username, setUsername] = useState(["malvesbertoni"]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      const data = await response.json();

      setRepositories(data);
    } fetchData()
  }, []);

  useEffect(() => {
    const filtered = repositories.filter(repo => repo.favorite);

    document.title = `You have ${filtered.length} favorite repos`;
  }, [repositories]);

  function handleFavorite(id) {
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? {... repo, favorite: !repo.favorite} : repo
    });

    setRepositories(newRepositories);
  }

  return (
    <div className="main-container">
      <div className="header">
        <h1>GIT LOADER</h1>
        <input type="text" className="input" name="username" placeholder="Type in a github username"
            onChange={e => setUsername(e.target.value)} />
      </div>
      <div className="content-container">
        <p>Showing {username}'s repositories</p>
        <ul>
            {repositories.map(repo => (
              <li key={repo.id}>
                { repo.name }
                { repo.favorite && <span className="favoriteTag"> (FAVORITE!) </span>}
                <button className="favoriteButton" onClick={() => handleFavorite(repo.id)}> Favorite this repo </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}