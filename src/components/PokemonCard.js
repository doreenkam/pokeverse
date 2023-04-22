import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';

function PokemonCard({ url, name }) {
  const [sprites, setSprites] = useState({});
  const [abilities, setAbilities] = useState([]);

  useEffect(() => {
    const fetchPokemon = async (url) => {
      try {
        const res = await fetch(url);
        const data = await res.json();
        setSprites(data.sprites);
        setAbilities(data.abilities);
      } catch (err) {
        console.log('error', error);
      }
    };
    fetchPokemon(url);
  }, []);

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img src={sprites.front_default} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text as="div">
          <ul>
            {abilities.map((item, index) => (
              <li key={index}>{item.ability.name}</li>
            ))}
          </ul>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export { PokemonCard };
