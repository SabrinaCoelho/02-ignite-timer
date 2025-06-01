import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/default'
import { GlobalStyle } from './styles/global'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { CyclesContextPorvider } from './contexts/CyclesContext'
// import { Home } from './Home'

export function App() {
  /* return(<Home/>) */
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter basename="/02-ignite-timer/" >
        <CyclesContextPorvider>
          <Router />
        </CyclesContextPorvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}
