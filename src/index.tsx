import * as React from 'react';
import { render } from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import { Maps } from './pages/map';
import { Todofuken } from './pages/todofuken';
import { locationList } from './pages/tenki';
import { useState, useEffect } from 'react';

const GlobalStyle = createGlobalStyle`
  body * {
    box-sizing: border-box;
  }
`;

const App: React.FC = () => {
  const [selectedPrefecture, setSelectedPrefecture] = useState<string | null>(null);
  const [location, setLocation] = useState(locationList[0]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const handlePrefectureSelect = (name: string) => {
    setSelectedPrefecture(name);
    const selectedLocation = locationList.find((location) => location.jpName === name);
    if (selectedLocation) {
      setLocation({ ...selectedLocation, enName: selectedLocation.enName });
    }
  };
  

  const addFavorite = (favorite: string) => {
    const updatedFavorites = [...favorites, favorite];
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const removeFavorite = (favorite: string) => {
    const updatedFavorites = favorites.filter(item => item !== favorite);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  return (
    <>
      <GlobalStyle />
      {!selectedPrefecture && <Maps onSelectPrefecture={handlePrefectureSelect} favorites={favorites} />}
      {selectedPrefecture && (
        <Todofuken
          prefecture={{ ...location, enName: location.enName }}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
          favorites={favorites}
        />
      )}
    </>
  );
};

render(<App />, document.getElementById('app'));
