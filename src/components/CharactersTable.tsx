import {
  Pagination,
  PaginationItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  TextField,
} from "@mui/material"
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight"
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft"
import SearchIcon from "@mui/icons-material/Search"
import { SetStateAction, useEffect, useState } from "react"
import api from "../api"
import { Character } from "../Interfaces"
import { CharacterRow } from "./CharacterRow"

export default function RankingTable() {
  const [characterList, setCharacterList] = useState<any[]>([])
  const [pageCount, setPageCount] = useState<number>(1)
  const [characterName, setCharacterName] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedPage, setSelectedPage] = useState<number>(1)

  useEffect(() => {
    api
      .getCharacters(selectedPage, characterName)
      .then((json) => {
        setLoading(false)
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

  const characterRows = () =>
    characterList.map((character: Character) => (
      <CharacterRow key={character.id} character={character} />
    ))

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
            margin: "auto",
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
        <TableContainer
          component={Paper}
          sx={{
            width: "100%",
            marginDown: "10px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "rgba(196, 196, 196, 0.5)",
          }}
        >
          <Table
            aria-label="simple table"
            sx={{ width: "100%", marginDown: "10px" }}
          >
            <TableHead>
              <TableRow
                sx={{
                  width: "100%",
                  height: "15px",
                }}
              >
                <TableCell
                  sx={{
                    color: "#00DFDD",
                    fontFamily: "Montserrat",
                    fontWeight: "400",
                    fontSize: "18px",
                    lineHeight: "20px",
                  }}
                  align="left"
                >
                  Name
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "#00DFDD",
                    fontFamily: "Montserrat",
                    fontWeight: "400",
                    fontSize: "18px",
                    lineHeight: "20px",
                  }}
                >
                  Status
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "#00DFDD",
                    fontFamily: "Montserrat",
                    fontWeight: "400",
                    fontSize: "18px",
                    lineHeight: "20px",
                  }}
                >
                  Specie
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "#00DFDD",
                    fontFamily: "Roboto",
                    fontWeight: "400",
                    fontSize: "18px",
                    lineHeight: "20px",
                    width: "50px",
                  }}
                >
                  ...
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    color: "#00DFDD",
                    fontFamily: "Roboto",
                    fontWeight: "400",
                    fontSize: "18px",
                    lineHeight: "20px",
                    width: "50px",
                  }}
                ></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{characterRows()}</TableBody>
          </Table>
        </TableContainer>
        <Pagination
          sx={{ marginTop: "35px", color: "secondary" }}
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
