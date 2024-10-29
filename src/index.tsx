import * as React from 'react';
import { render } from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import { Maps } from './pages/map';
import { Todofuken } from './pages/todofuken';
import { locationList } from './pages/tenki';
import { Ichiran } from './pages/ichiran';
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
  const [showIchiran, setShowIchiran] = useState<boolean>(false);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  const handlePrefectureSelect = (name: string) => {
    if (name === 'ichiran') {
      setShowIchiran(true);
      setSelectedPrefecture(null);
    } else {
      setSelectedPrefecture(name);
      setShowIchiran(false);
      const selectedLocation = locationList.find((location) => location.jpName === name);
      if (selectedLocation) {
        setLocation({ ...selectedLocation, enName: selectedLocation.enName });
      }
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
      {!selectedPrefecture && !showIchiran && <Maps onSelectPrefecture={handlePrefectureSelect} favorites={favorites} />}
      {selectedPrefecture && !showIchiran && (
        <Todofuken
          prefecture={{ ...location, enName: location.enName }}
          addFavorite={addFavorite}
          removeFavorite={removeFavorite}
          favorites={favorites}
          handleClick={handlePrefectureSelect}
        />
      )}
      {showIchiran && (
        <Ichiran
          favorites={favorites.map(fav => {
            const [jpName, enName] = fav.split(' ');
            return { enName, jpName, lat: 35.754, lon: 139.853 }; // 仮の緯度経度を使用
          })}
        />
      )}
    </>
  );
};

render(<App />, document.getElementById('app'));
