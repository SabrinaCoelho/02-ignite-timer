import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/default'
import { GlobalStyle } from './styles/global'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'
import { CyclesContextPorvider } from './contexts/CyclesContexts'
// import { Home } from './Home'

export function App() {
  /* return(<Home/>) */
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextPorvider>
          <Router />
        </CyclesContextPorvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}
