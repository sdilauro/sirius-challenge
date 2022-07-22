import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import {
  TableCell,
  TableRow,
  IconButton,
  Popover,
  Typography,
  Avatar,
  Button,
  Box,
} from "@mui/material"
import { Container } from "@mui/system"
import React, { useState } from "react"
import { Character } from "../Interfaces"

interface Props {
  character: Character
}

export const CharacterRow = ({ character }: Props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const fields = []

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
            <Box>
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
                Name
              </Typography>
              <Box
                sx={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  width: "300px",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  paddingLeft: "16px",
                  paddingRight: "16px",
                }}
              >
                <Typography
                  sx={{
                    color: "#777777",
                    fontSize: "14px",
                    fontWeight: "400",
                    fontStyle: "normal",
                    lineHeight: "20px",
                    fontFamily: "Roboto",
                  }}
                >
                  {character.name}
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
              CLOSE
            </Button>
          </Container>
        </Popover>
      </TableCell>
    </TableRow>
  )
}
