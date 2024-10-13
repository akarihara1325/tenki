import * as React from 'react'
import { render } from 'react-dom'
import styled from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import { Maps } from './pages/map'

const GlobalStyle = createGlobalStyle`
body * {
  box-sizing: border-box;
}
`

const Main = (
<>
  <GlobalStyle />
  <Maps />
</>
)

render(Main, document.getElementById('app'))