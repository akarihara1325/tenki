import * as React from 'react';
import styled from 'styled-components';
import { App } from './tenki'

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


interface TodofukenProps {
    prefecture: {
      jpName: string;
      lat: number;
      lon: number;
    };
  }
  
  export const Todofuken: React.FC<TodofukenProps> = ({ prefecture }) => {
    return (
      <>
        <Header>Tenki</Header>
        <Wrapper>
          <Okiniiri>お気に入り</Okiniiri>
          <MapZone>
            <App location={prefecture} />
          </MapZone>
        </Wrapper>
      </>
    );
  };
  