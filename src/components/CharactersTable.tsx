import {
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material"
import Box from "@mui/material/Box"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import api from "../api"
import { Character } from "../Interfaces"
import { CharacterRow } from "./CharacterRow"

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    headerAlign: "left",
    width: 200,
    sortable: true,
    align: "left",
  },
  {
    field: "status",
    headerName: "Status",
    headerAlign: "left",
    align: "left",
    width: 100,
    sortable: false,
  },
  {
    field: "species",
    headerName: "Specie",
    headerAlign: "left",
    align: "left",
    width: 100,
    sortable: false,
  },
]

export default function RankingTable() {
  const [characterList, setCharacterList] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    api
      .getCharacters(1)
      .then((result) => {
        setLoading(false)
        setCharacterList(result)
      })
      .catch((err) => {
        console.log("No se pudo consultar la API de Rick & Morty", err)
      })
  }, [])

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    api
      .getCharacters(page)
      .then((result) => {
        setLoading(false)
        setCharacterList(result)
      })
      .catch((err) => {
        console.log("No se pudo consultar la API de Rick & Morty", err)
      })
  }

  const characterRows = () =>
    characterList.map((character: Character) => (
      <CharacterRow key={character.id} character={character} />
    ))

  return (
    <Paper
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        minHeight: "100vh",
      }}
    >
      <TableContainer
        component={Paper}
        sx={{
          width: "90%",
          marginDown: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
              <TableCell align="left">Name</TableCell>
              <TableCell align="left" sx={{ width: "100px" }}>
                Status
              </TableCell>
              <TableCell align="left" sx={{ width: "100px" }}>
                Species
              </TableCell>
              <TableCell align="left" sx={{ width: "100px" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{characterRows()}</TableBody>
        </Table>
      </TableContainer>
      <Pagination
        onChange={handleChangePage}
        count={42}
        variant="outlined"
        boundaryCount={1}
        siblingCount={0}
        size="small"
      />
    </Paper>
  )
}
