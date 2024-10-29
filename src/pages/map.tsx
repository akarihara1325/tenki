import * as React from 'react';
import styled from 'styled-components';

const Header = styled.header`
  font-size: 1.5rem;
  height: 3rem;
  left: 0;
  line-height: 2rem;
  padding: 0.5rem 1rem;
  position: fixed;
  right: 0;
  top: 0;
  background-color: navy;
  color: white;
`;

const Wrapper = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
`;

const Okiniiri = styled.div`
  border-right: 1px solid silver;
  border-top: 1px solid silver;
  bottom: 0;
  font-size: 1rem;
  left: 0;
  padding: 0.5rem;
  position: absolute;
  top: 0;
  width: 20vw;
`;

const MapZone = styled.div`
  border-top: 1px solid silver;
  bottom: 0;
  padding: 1rem;
  position: absolute;
  right: 0;
  top: 0;
  width: 80vw;
`;

const PrefectureLink = styled.a`
  display: block;
  margin: 0.5rem 0;
  color: navy;
  cursor: pointer;
`;

const prefectures = [
  { name: '北海道', href: '#' },
  { name: '青森県', href: '#' },
  { name: '秋田県', href: '#' },
  { name: '岩手県', href: '#' },
  { name: '山形県', href: '#' },
  { name: '宮城県', href: '#' },
  { name: '福島県', href: '#' },
  { name: '群馬県', href: '#' },
  { name: '栃木県', href: '#' },
  { name: '茨城県', href: '#' },
  { name: '埼玉県', href: '#' },
  { name: '東京都', href: '#' },
  { name: '神奈川県', href: '#' },
  { name: '千葉県', href: '#' },
  // 他の都道府県も追加
];

interface MapsProps {
  onSelectPrefecture: (name: string) => void;
  favorites: string[];
}

export const Maps: React.FC<MapsProps> = ({ onSelectPrefecture, favorites }) => {
  const handleClick = (name: string) => {
    onSelectPrefecture(name);
  };

  return (
    <>
      <Header>Tenki</Header>
      <Wrapper>
        <Okiniiri>
          <h2>お気に入り</h2>
          {favorites.map((favorite, index) => (
            <div key={index}>{favorite}</div>
          ))}
          <a onClick={() => handleClick('ichiran')}>一覧</a>
        </Okiniiri>
        <MapZone>
          {prefectures.map((prefecture) => (
            <PrefectureLink
              key={prefecture.name}
              onClick={() => handleClick(prefecture.name)}
            >
              {prefecture.name}
            </PrefectureLink>
          ))}
        </MapZone>
      </Wrapper>
    </>
  );
};
