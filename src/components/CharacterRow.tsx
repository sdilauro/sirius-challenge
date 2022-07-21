import { Done, Edit } from "@mui/icons-material"
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import {
  TableCell,
  TableRow,
  IconButton,
  Popover,
  TextField,
  Typography,
} from "@mui/material"
import { Container } from "@mui/system"
import React, { useState } from "react"
import { Character } from "../Interfaces"

interface Props {
  character: Character
}

export const CharacterRow = ({ character }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [editedTaskName, setEditedTaskName] = useState<string>(character.name)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
    setEditedTaskName(character.name)
  }

  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  const updateEditTaskValue = (e: {
    target: { value: React.SetStateAction<string> }
  }) => {
    setEditedTaskName(e.target.value)
  }

  return (
    <TableRow
      sx={{
        width: "100%",
        height: "15px",
      }}
    >
      <TableCell align="left">
        <Typography>{character.name}</Typography>
      </TableCell>
      <TableCell align="left">
        <Typography>{character.status}</Typography>
      </TableCell>
      <TableCell align="left">
        <Typography>{character.species}</Typography>
      </TableCell>
      <TableCell align="left">
        <IconButton aria-describedby={id} onClick={handleClick}>
          <VisibilityOutlinedIcon />
        </IconButton>
        <Popover
          sx={{ p: 20 }}
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
              marginBottom: "20px",
              marginTop: "20px",
              display: "flex",
              alignItems: "center",
              width: "100%",
              color: "tomato",
            }}
          >
            <TextField
              sx={{ marginTop: "10" }}
              fullWidth
              size="small"
              id="outlined-basic"
              label="Editar tarea"
              variant="outlined"
              value={editedTaskName}
              onChange={updateEditTaskValue}
              onKeyPress={() => {}}
            />
            <IconButton onClick={() => {}} color="inherit" size="large">
              <Done />
            </IconButton>
          </Container>
        </Popover>
      </TableCell>
    </TableRow>
  )
}
