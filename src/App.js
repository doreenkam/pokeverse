import React, { useEffect, useState } from 'react';
import { Navigation } from './components/Navigation';
import { PokemonCard } from './components/PokemonCard';
import InputGroup from 'react-bootstrap/InputGroup';
import { Container, Form, Row, Col } from 'react-bootstrap';

const LIMIT = 10;
const pokeApi = `https://pokeapi.co/api/v2/pokemon/?limit=${LIMIT}`;

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const getPokemonList = async () => {
      try {
        const res = await fetch(pokeApi);
        const data = await res.json();
        setPokemonList(data.results);
      } catch (error) {
        console.log('error', error);
      }
    };
    getPokemonList();
  }, []);

  return (
    <div data-testid="app">
      <Navigation />{' '}
      <Container>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Pokemon's Name"
            aria-label="Pokemon's Name"
            aria-describedby="Pokemon's Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </InputGroup>
        <h1>Pokemon should appear here</h1>

        <Row>
          {!searchQuery
            ? pokemonList.map((pokemon, index) => (
                <Col style={{ marginBottom: '12px' }}>
                  <PokemonCard
                    key={index}
                    name={pokemon.name}
                    url={pokemon.url}
                  />
                </Col>
              ))
            : pokemonList.map(
                (pokemon, index) =>
                  pokemon.name === searchQuery && (
                    <PokemonCard
                      key={index}
                      name={pokemon.name}
                      url={pokemon.url}
                    />
                  )
              )}
        </Row>
      </Container>
    </div>
  );
}

export { App };
