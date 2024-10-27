import * as React from 'react';
import { render } from 'react-dom';
import { createGlobalStyle } from 'styled-components';
import { Maps } from './pages/map';

const GlobalStyle = createGlobalStyle`
  body * {
    box-sizing: border-box;
  }
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Maps onSelectPrefecture={handlePrefectureSelect} />
    </>
  );
};

const handlePrefectureSelect = (enName: string) => {
  window.location.href = `/todofuken/${enName}`;
};

render(<App />, document.getElementById('app'));
