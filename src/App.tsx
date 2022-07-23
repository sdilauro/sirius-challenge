import { Box, Container, Typography } from "@mui/material"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import "@fontsource/montserrat"
import "./fonts.css"
import MaterialTable from "./components/MaterialTable"
import Image from "./components/Img"

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
          padding: "60px 0px",
          backgroundColor: "#0A222D",
          width: "100%",
          margin: "auto",
          minHeight: "100vh",
        }}
      >
        <Box
          sx={{
            display: "flex",
            direction: "row",
            alignItems: "end",
            width: "87.5%",
            margin: "auto",
          }}
        >
          <Typography
            sx={{
              fontSize: "40px",
              fontWeight: "400",
              lineHeight: "20px",
              color: "#00DFDD",
              width: "100%",
              textAlign: "center",
              flex: "1",
              marginBottom: "20px",
              fontFamily: "Montserrat",
            }}
          >
            Rick and Morty characters
          </Typography>
          <Image />
        </Box>
        <MaterialTable />
      </Container>
    </ThemeProvider>
  )
}

export default App
