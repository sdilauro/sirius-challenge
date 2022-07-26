import { createTheme, styled, ThemeProvider } from "@mui/material/styles"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import {
  Typography,
  Button,
  Box,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
  CircularProgress,
  Avatar,
  Dialog,
  DialogContent,
} from "@mui/material"
import { Container } from "@mui/system"
import React, { useEffect, useState } from "react"
import { Episode, Character } from "../Interfaces"
import api from "../api"
import preload from "./../preload.jpeg"

interface Props {
  character: Character
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#677378",
    color: "#00DFDD",
    fontFamily: "Montserrat",
    fontSize: "14px",
    lineHeight: "14px",
  },

  [`&.${tableCellClasses.body}`]: {
    fontFamily: "Roboto",
    fontSize: "12px",
    lineHeight: "14px",
    color: "white",
    fontStyle: "normal",
    fontWeight: "400",

    border: 0,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "rgba(10, 34, 45, 0.7)",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}))

const theme = createTheme({
  palette: {
    primary: {
      light: "#00DFDD",
      main: "#00DFDD",
      dark: "#00DFDD",
    },
    secondary: {
      main: "#00DFDD",
    },
  },
})

export const CharacterEpisodes = ({ character }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [episodesList, setEpisodesList] = useState<any[]>([])
  const [episodes, setEpisodes] = useState<string>("")
  const [success, setSuccess] = useState<boolean>(true)
  const [episodesLoaded, setEpisodesLoaded] = useState<boolean>(false)

  useEffect(() => {
    if (episodesLoaded === false) {
      return
    }
    api
      .getEpisodes(episodes)
      .then((json) => {
        setEpisodesList(json)
        setSuccess(true)
      })
      .catch((err) => {
        console.log("Error:", err)
        setSuccess(false)
      })
  }, [episodesLoaded])

  const loadEpisodes = (character: Character) => {
    let episodes: string = ""
    character.episode.forEach((element) => {
      episodes =
        episodes + element.substring(element.lastIndexOf("/") + 1) + ","
    })
    setEpisodes(episodes)
    setEpisodesLoaded(true)
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
    loadEpisodes(character)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <StyledTableCell
      align="right"
      sx={{
        width: "20px",
        padding: "1.25px",
        borderTopRightRadius: "8px",
        borderBottomRightRadius: "8px",
      }}
    >
      <Button
        onClick={handleClick}
        sx={{
          textTransform: "none",
          fontFamily: "Roboto",
          fontSize: "18px",
          lineHeight: "20px",
          color: "white",
          fontStyle: "normal",
          fontWeight: "400",
          textAlign: "left",
        }}
      >
        Episodes
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="md" scroll="body">
        <DialogContent sx={{ p: 0 }}>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              width: "800px",
              maxWidth: "100%",
              height: "auto",
              paddingTop: "40px",
              paddingBottom: "60px",
              backgroundColor: "#0A222D",
            }}
          >
            <ThemeProvider theme={theme}>
              <Box sx={{ width: "90%", margin: "auto", maxWidth: "1315px" }}>
                {success ? (
                  <>
                    <Typography
                      component={"div"}
                      color="#00DFDD"
                      fontFamily={"Montserrat"}
                      sx={{
                        fontSize: "25px",
                        lineHeight: "27px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "end",
                        marginBottom: "15px",
                        justifyContent: "space-between",
                      }}
                    >
                      {character.name} appearances
                      <Avatar
                        alt=""
                        src={character.image}
                        sx={{
                          width: 100,
                          height: 100,
                          marginRight: "15px",
                          backgroundImage: `url(${preload})`,
                          backgroundSize: "100px",
                        }}
                      />
                    </Typography>

                    <TableContainer
                      component={Paper}
                      sx={{
                        paddingTop: "37px",
                        paddingBottom: "37px",
                        width: "100%",
                        margin: "auto",
                        maxHeight: "33vh",
                        borderRadius: "8px",
                        backgroundColor: "rgba(196, 196, 196, 0.5)",
                      }}
                    >
                      <Table
                        sx={{
                          width: "90%",
                          maxWidth: "90%",
                          margin: "auto",
                        }}
                        aria-label="customized table"
                        size="small"
                      >
                        <TableHead
                          sx={{
                            backgroundColor: "transparent",
                          }}
                        >
                          <TableRow>
                            <StyledTableCell
                              component="th"
                              scope="row"
                              align="left"
                            >
                              Episode name
                            </StyledTableCell>
                            <StyledTableCell
                              align="left"
                              sx={{ width: "100px" }}
                            >
                              Code
                            </StyledTableCell>
                            <StyledTableCell align="left">
                              Air Date
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {episodesList.map((episode: Episode) => (
                            <StyledTableRow key={episode.id}>
                              <StyledTableCell
                                align="left"
                                component="th"
                                scope="row"
                                sx={{
                                  borderTopLeftRadius: "8px",
                                  borderBottomLeftRadius: "8px",
                                }}
                              >
                                {episode.name}
                              </StyledTableCell>
                              <StyledTableCell
                                align="left"
                                component="th"
                                scope="row"
                              >
                                {episode.episode}
                              </StyledTableCell>
                              <StyledTableCell
                                align="left"
                                component="th"
                                scope="row"
                                sx={{
                                  borderTopRightRadius: "8px",
                                  borderBottomRightRadius: "8px",
                                }}
                              >
                                {episode.air_date}
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </>
                ) : (
                  <Typography
                    component={"div"}
                    color="#00DFDD"
                    fontFamily={"Montserrat"}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <CircularProgress />
                    Loading...
                  </Typography>
                )}
              </Box>
            </ThemeProvider>
            <Button
              sx={{
                borderStyle: "solid",
                borderWidth: "2px",
                width: "87px",
                height: "38px",
                padding: "10px, 20px, 10px, 20px",
                marginTop: "20px",
                textTransform: "none",
                fontFamily: "Montserrat",
                fontSize: "14px",
                lineHeight: "18px",
                color: "white",
                fontStyle: "normal",
                fontWeight: "400",
              }}
              onClick={handleClose}
              color="primary"
              size="large"
              variant="outlined"
            >
              Close
            </Button>
          </Container>
        </DialogContent>
      </Dialog>
    </StyledTableCell>
  )
}
