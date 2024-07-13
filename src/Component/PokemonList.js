import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonCard from './PokemonCard';
import Search from './Search';
import './PokemonList.css';
const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(response => {
        setPokemon(response.data.results);
        setFilteredPokemon(response.data.results);
      });
  }, []);

  useEffect(() => {
    setFilteredPokemon(
      pokemon.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, pokemon]);

  return (
    <div>
      <Search setSearch={setSearch} />
      <div className="pokemon-list">
        {filteredPokemon.map(p => (
          <PokemonCard key={p.name} name={p.name} url={p.url} />
        ))}
      </div>
    </div>
  );
};

export default PokemonList;
