import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import {
  TableCell,
  TableRow,
  IconButton,
  Popover,
  Typography,
  Avatar,
  Button,
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

const places = [{ value: "Origin" }, { value: "Location" }]

export const CharacterRow = ({ character }: Props) => {
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
    <TableRow
      sx={{
        width: "100%",
        p: "0",
        height: "15px",
        backgroundColor: "rgba(10, 34, 45, 0.7)",
        border: "none",
      }}
    >
      <TableCell align="left">
        <Typography
          sx={{
            color: "#FFFFFF",
            fontFamily: "Roboto",
            fontWeight: "400",
            fontSize: "18px",
            lineHeight: "20px",
          }}
        >
          {character.name}
        </Typography>
      </TableCell>
      <TableCell align="left">
        <Typography
          sx={{
            color: "#FFFFFF",
            fontFamily: "Roboto",
            fontWeight: "400",
            fontSize: "18px",
            lineHeight: "20px",
            textTransform: "uppercase:first-letter",
          }}
        >
          {character.status.charAt(0).toUpperCase() + character.status.slice(1)}
        </Typography>
      </TableCell>
      <TableCell align="left">
        <Typography
          sx={{
            color: "#FFFFFF",
            fontFamily: "Roboto",
            fontWeight: "400",
            fontSize: "18px",
            lineHeight: "20px",
          }}
        >
          {character.species}
        </Typography>
      </TableCell>
      <TableCell align="left">
        <Typography
          sx={{
            color: "#FFFFFF",
            fontFamily: "Roboto",
            fontWeight: "400",
            fontSize: "18px",
            lineHeight: "20px",
          }}
        >
          ...
        </Typography>
      </TableCell>
      <TableCell align="left">
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
              height: "700px",
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
      </TableCell>
    </TableRow>
  )
}
