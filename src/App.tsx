import { Container, TextField, Typography, Box } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import SearchIcon from "@mui/icons-material/Search"
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
          padding: "95px 95px",
          backgroundColor: "#0A222D",
          width: "100%",
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
        <Box
          sx={{
            width: "447px",
            paddingTop: "51px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <SearchIcon fontSize="large" htmlColor="#00DFDD"></SearchIcon>
          <TextField
            id="standard-basic"
            label=""
            variant="standard"
            placeholder="Search User"
            color="secondary"
            fullWidth
          />
        </Box>
        <TableCustom />
      </Container>
    </ThemeProvider>
  )
}

export default App
