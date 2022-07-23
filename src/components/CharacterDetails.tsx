import { styled } from "@mui/material/styles"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import {
  IconButton,
  Popover,
  Typography,
  Avatar,
  Button,
  Box,
} from "@mui/material"
import { Container } from "@mui/system"
import React from "react"
import { Character } from "../Interfaces"
import { CharacterField } from "./CharacterField"

interface Props {
  character: Character
}

const properties = [
  { value: "name", title: "Name" },
  { value: "status", title: "Status" },
  { value: "species", title: "Species" },
  { value: "type", title: "Type" },
  { value: "gender", title: "Gender" },
]

const StyledTableCell = styled(TableCell)(({ theme }) => ({
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

export const CharacterDetails = ({ character }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  return (
    <StyledTableCell align="right">
      <IconButton
        aria-describedby={id}
        onClick={handleClick}
        sx={{ color: "#FFFFFF" }}
      >
        <VisibilityOutlinedIcon />
      </IconButton>
      <Popover
        sx={{}}
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            width: "410px",
            height: "auto",
            paddingTop: "40px",
            paddingBottom: "60px",
            backgroundColor: "#0A222D",
          }}
        >
          <Avatar
            alt={character.name}
            src={character.image}
            sx={{ width: 100, height: 100 }}
          />
          {properties
            .map((property) => {
              if (property.value in character) {
                const value = character[property.value as keyof Character]
                return CharacterField(property.title, value.toString())
              }
              return null
            })
            .filter((element) => element !== null)}
          <Box sx={{ marginTop: "10px", marginBottom: "10px" }}>
            <Typography
              sx={{
                color: "white",
                fontSize: "14px",
                fontWeight: "400",
                fontStyle: "normal",
                lineHeight: "20px",
                fontFamily: "Roboto",
                marginBottom: "4px",
              }}
            >
              Origin
            </Typography>
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "8px",
                width: "268px",
                paddingTop: "12px",
                paddingBottom: "12px",
                paddingLeft: "16px",
                paddingRight: "16px",
              }}
            >
              <Typography
                sx={{
                  minHeight: "20px",
                  color: "#777777",
                  fontSize: "14px",
                  fontWeight: "400",
                  fontStyle: "normal",
                  lineHeight: "20px",
                  fontFamily: "Roboto",
                }}
              >
                {character.origin.name.charAt(0).toUpperCase() +
                  character.origin.name.slice(1)}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ marginTop: "10px", marginBottom: "10px" }}>
            <Typography
              sx={{
                color: "white",
                fontSize: "14px",
                fontWeight: "400",
                fontStyle: "normal",
                lineHeight: "20px",
                fontFamily: "Roboto",
                marginBottom: "4px",
              }}
            >
              Location
            </Typography>
            <Box
              sx={{
                backgroundColor: "white",
                borderRadius: "8px",
                width: "268px",
                paddingTop: "12px",
                paddingBottom: "12px",
                paddingLeft: "16px",
                paddingRight: "16px",
              }}
            >
              <Typography
                sx={{
                  minHeight: "20px",
                  color: "#777777",
                  fontSize: "14px",
                  fontWeight: "400",
                  fontStyle: "normal",
                  lineHeight: "20px",
                  fontFamily: "Roboto",
                }}
              >
                {character.location.name.charAt(0).toUpperCase() +
                  character.location.name.slice(1)}
              </Typography>
            </Box>
          </Box>
          <Button
            sx={{
              width: "87px",
              height: "38px",
              padding: "10px, 20px, 10px, 20px",
            }}
            onClick={handleClose}
            color="primary"
            size="large"
            variant="outlined"
          >
            Close
          </Button>
        </Container>
      </Popover>
    </StyledTableCell>
  )
}