import { createTheme, ThemeProvider } from "@mui/material/styles"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight"
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft"
import { styled } from "@mui/material/styles"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { SetStateAction, useEffect, useState } from "react"
import api from "../api"
import { Character } from "../Interfaces"
import {
  Box,
  TextField,
  Pagination,
  PaginationItem,
  Typography,
  TableSortLabel,
} from "@mui/material"
import React from "react"
import { CharacterDetails } from "./CharacterDetails"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CharacterEpisodes } from "./CharacterEpisodes"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "transparent",
    color: "#00DFDD",
    fontFamily: "Montserrat",
    fontSize: "20px",
    lineHeight: "20px",
    width: "100%",
  },

  [`&.${tableCellClasses.body}`]: {
    fontFamily: "Roboto",
    fontSize: "18px",
    lineHeight: "20px",
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

export default function MaterialTable() {
  const [characterList, setCharacterList] = useState<any[]>([])
  const [pageCount, setPageCount] = useState<number>(1)
  const [characterName, setCharacterName] = useState<string>("")
  const [selectedPage, setSelectedPage] = useState<number>(1)
  const [success, setSuccess] = useState<boolean>(true)

  useEffect(() => {
    if (characterName === "") {
      api
        .getCharacters(selectedPage, characterName)
        .then((json) => {
          setCharacterList(json.results)
          setPageCount(json.info.pages)
          setSuccess(true)
        })
        .catch((err) => {
          console.log("Error:", err)
          setSuccess(false)
        })
    } else {
      api
        .getCharacters(1, characterName)
        .then((json) => {
          setCharacterList(json.results)
          setPageCount(json.info.pages)
          setSuccess(true)
        })
        .catch((err) => {
          console.log("Error:", err)
          setSuccess(false)
        })
    }
  }, [characterName, selectedPage])

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setSelectedPage(page)
  }

  const onChangeHandler = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setCharacterName(event.target.value)
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
  }

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          width: "87.5%",
          maxWidth: "1315px",
          margin: "auto",
        }}
      >
        <Box
          sx={{
            alignItems: "left",
            width: "100%",
            marginBottom: "31.5px",
          }}
        >
          <Box
            component="form"
            noValidate
            autoComplete="off"
            sx={{
              width: "447px",
              maxWidth: "80%",
              paddingTop: "51px",
              display: "flex",
              alignItems: "center",
              fontSize: "33px",
              color: "#00DFDD",
            }}
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} color="inherit" />
            <TextField
              sx={{ marginLeft: "22px", fontStyle: "inherit" }}
              id="standard-basic"
              label=""
              onChange={onChangeHandler}
              value={characterName}
              variant="standard"
              placeholder="Search User"
              color="primary"
              fullWidth
              InputProps={{
                style: {
                  fontFamily: "Montserrat",
                  color: "#00DFDD",
                  borderBlockColor: "#00DFDD",
                },
              }}
              InputLabelProps={{
                style: {
                  fontFamily: "Montserrat",
                  color: "#00DFDD",
                  borderBlockColor: "#00DFDD",
                },
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "87.5%", margin: "auto", maxWidth: "1315px" }}>
        {success ? (
          <>
            <TableContainer
              component={Paper}
              sx={{
                width: "100%",
                margin: "auto",
                borderRadius: "8px",
                backgroundColor: "rgba(196, 196, 196, 0.5)",
              }}
            >
              <Table
                sx={{ margin: "37px", width: "auto" }}
                aria-label="customized table"
                size="small"
              >
                <TableHead
                  sx={{
                    backgroundColor: "transparent",
                  }}
                >
                  <TableRow>
                    <StyledTableCell align="left" sx={{ width: "30%" }}>
                      Name
                    </StyledTableCell>
                    <StyledTableCell align="left" sx={{ width: "15%" }}>
                      Status
                    </StyledTableCell>
                    <StyledTableCell align="left" sx={{ width: "15%" }}>
                      <TableSortLabel active={false} direction="asc">
                        Specie
                      </TableSortLabel>
                    </StyledTableCell>
                    <StyledTableCell align="left"></StyledTableCell>
                    <StyledTableCell align="left"></StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {characterList.map((character: Character) => (
                    <StyledTableRow key={character.id}>
                      <StyledTableCell
                        align="left"
                        component="th"
                        scope="row"
                        sx={{
                          borderTopLeftRadius: "8px",
                          borderBottomLeftRadius: "8px",
                        }}
                      >
                        {character.name}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {character.status.charAt(0).toUpperCase() +
                          character.status.slice(1)}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {character.species.charAt(0).toUpperCase() +
                          character.species.slice(1)}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <CharacterEpisodes character={character} />
                      </StyledTableCell>
                      <CharacterDetails character={character} />
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination
              sx={{
                color: "secondary",
                width: "87.5%",
                margin: "auto",
                marginTop: "35px",
              }}
              shape="circular"
              onChange={handleChangePage}
              count={pageCount}
              boundaryCount={1}
              siblingCount={0}
              size="small"
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: KeyboardDoubleArrowLeftIcon,
                    next: KeyboardDoubleArrowRightIcon,
                  }}
                  {...item}
                  sx={{ color: "white" }}
                />
              )}
            />
          </>
        ) : (
          <Typography color="#00DFDD" fontFamily={"Montserrat"}>
            There was an error with the search criteria or communication with
            the API.
          </Typography>
        )}
      </Box>
    </ThemeProvider>
  )
}
