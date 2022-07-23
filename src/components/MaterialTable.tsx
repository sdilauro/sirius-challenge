import SearchIcon from "@mui/icons-material/Search"
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
import { Box, TextField, Pagination, PaginationItem } from "@mui/material"
import { CharacterField } from "./CharacterField"
import React from "react"
import { CharacterDetails } from "./CharacterDetails"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "transparent",
    color: "#00DFDD",
    fontFamily: "Montserrat",
    fontSize: "20px",
    lineHeight: "20px",
    width: "20%",
    margin: "5px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontFamily: "Roboto",
    fontSize: "18px",
    lineHeight: "20px",
    color: "white",
    fontStyle: "normal",
    fontWeight: "400",
    width: "20%",
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


export default function MaterialTable() {
  const [characterList, setCharacterList] = useState<any[]>([])
  const [pageCount, setPageCount] = useState<number>(1)
  const [characterName, setCharacterName] = useState<string>("")
  const [selectedPage, setSelectedPage] = useState<number>(1)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  useEffect(() => {
    api
      .getCharacters(selectedPage, characterName)
      .then((json) => {
        setCharacterList(json.results)
        setPageCount(json.info.pages)
      })
      .catch((err) => {
        console.log("No se pudo consultar la API de Rick & Morty", err)
      })
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

  return (
    <>
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          width: "87.5%",
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
            sx={{
              width: "447px",
              maxWidth: "80%",
              paddingTop: "51px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <SearchIcon fontSize="large" htmlColor="#00DFDD"></SearchIcon>
            <TextField
              id="standard-basic"
              label=""
              onChange={onChangeHandler}
              value={characterName}
              variant="standard"
              placeholder="Search User"
              color="secondary"
              fullWidth
            />
          </Box>
        </Box>
      </Box>
      <Box sx={{ width: "100%", margin: "auto" }}>
        <TableContainer
          component={Paper}
          sx={{
            width: "87.5%",
            margin: "auto",
            borderRadius: "8px",
            padding: "37px",
            backgroundColor: "rgba(196, 196, 196, 0.5)",
          }}
        >
          <Table
            sx={{ width: "100%" }}
            aria-label="customized table"
            size="small"
          >
            <TableHead sx={{ backgroundColor: "transparent" }}>
              <TableRow>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="left">Status</StyledTableCell>
                <StyledTableCell align="left">Specie</StyledTableCell>
                <StyledTableCell align="center" sx={{ flex: 1 }}>
                  ...
                </StyledTableCell>
                <StyledTableCell align="left"></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {characterList.map((character: Character) => (
                <StyledTableRow key={character.id} sx={{ borderRadius: "8px" }}>
                  <StyledTableCell align="left" component="th" scope="row">
                    {character.name}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {character.status.charAt(0).toUpperCase() +
                      character.status.slice(1)}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {character.species}
                  </StyledTableCell>
                  <StyledTableCell sx={{ flex: 1 }} align="center">
                    ...
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
      </Box>
    </>
  )
}
