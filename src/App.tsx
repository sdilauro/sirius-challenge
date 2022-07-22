import { Container, Typography } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import "@fontsource/montserrat"
import "./fonts.css"
import TableCustom from "./components/CharactersTable"

const theme = createTheme({
  typography: {
    fontFamily: ["Roboto"].join(","),
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth={false}
        sx={{
          padding: "95px 0px",
          backgroundColor: "#0A222D",
          width: "100%",
          margin: "auto",
        }}
      >
        <Typography
          sx={{
            fontSize: "30px",
            fontWeight: "400",
            lineHeight: "20px",
            color: "#00DFDD",
            width: "100%",
            textAlign: "center",
          }}
        >
          Rick and Morty characters
        </Typography>
        <TableCustom />
      </Container>
    </ThemeProvider>
  )
}

export default App
