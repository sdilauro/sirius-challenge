import { TableRow } from "@mui/material"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import { createTheme, styled } from "@mui/material/styles"

export const maxWidth = 650

export const theme = createTheme({
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

export const StyledTableCell = styled(TableCell)(({}) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "transparent",
    color: "#00DFDD",
    fontFamily: "Montserrat",
    fontSize: "20px",
    lineHeight: "22px",
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

export const StyledTableRow = styled(TableRow)(({}) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "rgba(10, 34, 45, 0.7)",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}))
