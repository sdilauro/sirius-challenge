import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight"
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { SetStateAction, useEffect, useState } from "react"
import api from "../api"
import { Character } from "../Interfaces"
import { StyledTableCell, StyledTableRow } from "../utils/config"
import {
  Box,
  TextField,
  Pagination,
  PaginationItem,
  Typography,
  TableSortLabel,
  CircularProgress,
} from "@mui/material"
import React from "react"
import { CharacterDetails } from "./CharacterDetails"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { CharacterEpisodes } from "./CharacterEpisodes"
import { visuallyHidden } from "@mui/utils"

type Order = "asc" | "desc" | undefined

export default function MaterialTable() {
  const [characterList, setCharacterList] = useState<any[]>([])
  const [pageCount, setPageCount] = useState<number>(1)
  const [characterName, setCharacterName] = useState<string>("")
  const [selectedPage, setSelectedPage] = useState<number>(1)
  const [success, setSuccess] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true)
  const [speciesOrder, setSpeciesOrder] = useState<Order>(undefined)
  const [sortIcon, setSortIcon] = useState<boolean>(true)

  useEffect(() => {
    setLoading(true)
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
    }
    setLoading(false)
    characterList.sort(name)
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
    setSelectedPage(1)
  }

  function name(a: Character, b: Character) {
    if (a.name < b.name) {
      return -1
    }
    if (a.name > b.name) {
      return 1
    }
    return 0
  }

  function species(a: Character, b: Character) {
    if (a.species < b.species) {
      return -1
    }
    if (a.species > b.species) {
      return 1
    }
    return 0
  }

  const handleChangeOrder = () => {
    switch (speciesOrder) {
      case "asc": {
        setSpeciesOrder("desc")
        setSortIcon(false)
        characterList.sort(species).reverse()
        break
      }
      case "desc": {
        setSpeciesOrder(undefined)
        setSortIcon(true)
        characterList.sort(name)
        break
      }
      case undefined: {
        setSpeciesOrder("asc")
        setSortIcon(false)
        characterList.sort(species)
        break
      }
    }
  }
  if (speciesOrder === undefined) {
    characterList.sort(name)
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
      {loading ? (
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
      ) : (
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
                      <StyledTableCell
                        align="left"
                        sx={{ minWidth: "55%", width: "55%" }}
                      >
                        Name
                      </StyledTableCell>
                      <StyledTableCell align="left" sx={{ width: "10%" }}>
                        Status
                      </StyledTableCell>
                      <StyledTableCell align="left" sx={{ width: "14%" }}>
                        <TableSortLabel
                          hideSortIcon={sortIcon}
                          direction={speciesOrder}
                          onClick={handleChangeOrder}
                        >
                          Species
                          <Box component="span" sx={visuallyHidden}>
                            {speciesOrder === "desc"
                              ? "sorted descending"
                              : "sorted ascending"}
                          </Box>
                        </TableSortLabel>
                      </StyledTableCell>
                      <StyledTableCell
                        align="left"
                        sx={{ width: "10%" }}
                      ></StyledTableCell>
                      <StyledTableCell
                        align="left"
                        sx={{ width: "5%" }}
                      ></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {characterList.map((character: Character) => (
                      <StyledTableRow key={character.id}>
                        <StyledTableCell
                          align="left"
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
      )}
    </>
  )
}
