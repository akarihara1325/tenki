import * as React from 'react'
import styled from 'styled-components'
import map from './images/日本.png'

const Header = styled.header`
  font-size: 1.5rem;
  height: 2rem;
  left: 0;
  line-height: 2rem;
  padding: 0.5rem 1rem;
  position: fixed;
  right: 0;
  top: 0;
`

const Wrapper = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 3rem;
`

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
`

const MapZone = styled.div`
  border-top: 1px solid silver;
  bottom: 0;
  padding: 1rem;
  position: relative;
  right: 0;
  top: 0;
  width: 80vw;
  &:hover .overlay {
    opacity: 1;
  }
`

const Image = styled.img`
  width: 50%;
  height: auto;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 40%;
`

const OverlayMap = styled.img`
  width: 50%;
  height: auto;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 40%;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
`

export const Maps: React.FC = () => {
  return (
    <>
      <Header>
        Tenki
      </Header>
      <Wrapper>
        <Okiniiri>お気に入り</Okiniiri>
        <MapZone>
        <Image src="./src/images/日本.png" alt="日本地図" />
        <OverlayMap className="overlay" src="./src/images/北海道.png" alt="北海道" />
        </MapZone>
      </Wrapper>
    </>
  )
}