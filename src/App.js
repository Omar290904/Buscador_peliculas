import React, { useState } from 'react';
import './App.css';

function App() {
  const [pelicula, setPelicula] = useState('');
  const [resultado, setResultado] = useState([]);
  const [error, setError] = useState('');

  const buscarPelicula = () => {
    if (pelicula.trim() === '') {
      setError('Por favor, ingresa el nombre de una película.');
      setResultado([]);
      return;
    }

    const API_KEY = 'e6244511622b1395525d933ec1960117';
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(pelicula)}&language=es-ES`;

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.results.length > 0) {
          setResultado(data.results);
          setError('');
        } else {
          setResultado([]);
          setError('❌ Película no encontrada.');
        }
      })
      .catch(() => setError('❌ Error al conectar con la API'));
  };

  return (
    <div className="App">
      <h1>🎬 Buscador de Películas (TMDb) 🎬</h1>
      <input
        type="text"
        placeholder="Ingresa el nombre de la película"
        value={pelicula}
        onChange={(e) => setPelicula(e.target.value)}
      />
      <button onClick={buscarPelicula}>Buscar Pelicula</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="movies">
        {resultado.map((movie) => (
          <div key={movie.id} className="movie">
            <img 
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} 
              alt={movie.title} 
            />
            <h2>{movie.title} ({movie.release_date ? movie.release_date.substring(0, 4) : 'N/A'})</h2>
            <p>{movie.overview}</p>
            <p><strong>Rating:</strong> {movie.vote_average}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
