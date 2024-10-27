import * as React from 'react';
import { useState } from 'react';
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

const Image = styled.img`
  height: auto;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 20%;
`;

const OverlayImage = styled.img<{ visible: boolean }>`
  position: absolute;
  top: 0;
  left: 20%;
  height: auto;
  display: ${props => props.visible ? 'block' : 'none'};
`;

const prefectures = [
  {
    name: '北海道',
    enName:'hokkaido',
    coords: '494,68,495,139,470,168,470,192,509,194,509,177,525,179,549,192,588,179,623,180,623,126,597,128,528,65,528,65',
    shape: 'poly',
    src: './src/images/北海道.png',
    href: '#'
  },
  {
    name: '青森県',
    enName:'aomori',
    coords: '466,209,501,210,502,219,518,219,518,198,548,199,548,230,564,232,565,245,466,244,466,244',
    shape: 'poly',
    src: './src/images/青森県.png',
    href: '#'
  },
  {
    name: '秋田県',
    enName:'akitaken',
    coords: '467,247,512,295',
    shape: 'rect',
    src: './src/images/秋田県.png',
    href: '#'
  },
  {
    name: '岩手県',
    enName:'iwateken',
    coords: '514,248,566,294',
    shape: 'rect',
    src: './src/images/岩手県.png',
    href: '#'
  },
  {
    name: '山形県',
    enName:'yamagataken',
    coords: '465,296,512,343',
    shape: 'rect',
    src: './src/images/山形県.png',
    href: '#'
  },
  {
    name: '宮城県',
    enName:'miyagiken',
    coords: '513,295,558,342',
    shape: 'rect',
    src: './src/images/宮城県.png',
    href: '#'
  },
  {
    name: '福島県',
    enName:'hukusimaken',
    coords: '466,343,559,373',
    shape: 'rect',
    src: './src/images/福島県.png',
    href: '#'
  },
  {
    name: '群馬県',
    enName:'gunmaken',
    coords: '454,373,492,402',
    shape: 'rect',
    src: './src/images/群馬県.png',
    href: '#'
  },
  {
    name: '栃木県',
    enName:'tochigiken',
    coords: '491,374,527,401',
    shape: 'rect',
    src: './src/images/栃木県.png',
    href: '#'
  },
  {
    name: '茨城県',
    enName:'ibarakiken',
    coords: '528,373,567,416',
    shape: 'rect',
    src: './src/images/茨城県.png',
    href: '#'
  },
  {
    name: '埼玉県',
    enName:'saitamaken',
    coords: '454,404,526,419',
    shape: 'rect',
    src: './src/images/埼玉県.png',
    href: '#'
  },
  {
    name: '東京都',
    enName:'tokyoto',
    coords: '455,420,526,437',
    shape: 'rect',
    src: './src/images/東京都.png',
    href: '#'
  },
  {
    name: '神奈川県',
    enName:'kanagawaken',
    coords: '480,439,522,472',
    shape: 'rect',
    src: './src/images/神奈川県.png',
    href: '#'
  },
  {
    name: '千葉県',
    enName:'chiba',
    coords: '528,417,568,470',
    shape: 'rect',
    src: './src/images/千葉県.png',
    href: '#'
  },
  // 他の都道府県も追加
];

interface MapsProps {
  onSelectPrefecture: (enName: string) => void;
}

export const Maps: React.FC<MapsProps> = ({ onSelectPrefecture }) => {
  const [visibleOverlay, setVisibleOverlay] = useState<string | null>(null);
  const [activePrefecture, setActivePrefecture] = useState<string | null>(null);

  const handleMouseEnter = (name: string) => {
    if (activePrefecture !== name) {
      setVisibleOverlay(name);
      setActivePrefecture(name);
    }
  };

  const handleMouseLeave = () => {
    setVisibleOverlay(null);
    setActivePrefecture(null);
  };

  return (
    <>
      <Header>Tenki</Header>
      <Wrapper>
        <Okiniiri>お気に入り</Okiniiri>
        <MapZone>
          <Image src={'./src/images/日本.png'} alt="日本地図" useMap="#image-map" />
          {prefectures.map((prefecture) => (
            <OverlayImage
              key={prefecture.name}
              src={prefecture.src}
              alt={`${prefecture.name}地図`}
              visible={visibleOverlay === prefecture.name}
            />
          ))}
          <map name="image-map">
            {prefectures.map((prefecture) => (
              <area
                key={prefecture.name}
                shape={prefecture.shape}
                coords={prefecture.coords}
                href="#"
                alt={prefecture.name}
                onMouseEnter={() => handleMouseEnter(prefecture.name)}
                onMouseLeave={handleMouseLeave}
                onClick={() => onSelectPrefecture(prefecture.enName)}
              />
            ))}
          </map>
        </MapZone>
      </Wrapper>
    </>
  );
};
