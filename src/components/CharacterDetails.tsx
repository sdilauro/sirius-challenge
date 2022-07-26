import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined"
import {
  IconButton,
  Typography,
  Avatar,
  Button,
  Box,
  Dialog,
  DialogContent,
  useMediaQuery,
} from "@mui/material"
import { Container } from "@mui/system"
import { Character } from "../Interfaces"
import { CharacterField } from "./CharacterField"
import preload from "./../preload.jpeg"
import { maxWidthTable, StyledTableCell } from "../utils/config"
import { useState } from "react"
import { CharacterEpisodes } from "./CharacterEpisodes"

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

export const CharacterDetails = ({ character }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const tableMediaQuery = useMediaQuery(`(min-width:${maxWidthTable}px)`)

  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  return (
    <StyledTableCell
      align="right"
      sx={{
        width: "20px",
        padding: "1.25px",
        borderTopRightRadius: "8px",
        borderBottomRightRadius: "8px",
      }}
    >
      <IconButton
        aria-describedby={id}
        onClick={handleClick}
        sx={{ color: "#FFFFFF", marginRight: "10px" }}
      >
        <VisibilityOutlinedIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        scroll="body"
        fullScreen={tableMediaQuery ? false : true}
      >
        <DialogContent sx={{ p: 0 }}>
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              width: tableMediaQuery ? "410px" : "770px",
              maxWidth: "100%",
              height: "auto",
              paddingTop: "40px",
              paddingBottom: "60px",
              backgroundColor: "#0A222D",
            }}
          >
            <Avatar
              alt={character.name}
              src={character.image}
              sx={{
                width: 100,
                height: 100,
                backgroundImage: `url(${preload})`,
                backgroundSize: "100px",
              }}
            />
            {properties
              .map((property, index) => {
                if (property.value in character) {
                  const value = character[property.value as keyof Character]
                  return CharacterField(
                    property.title,
                    value.toString(),
                    index.toString()
                  )
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
                  maxWidth: "95%",
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
            <Box
              sx={{
                width: "80%",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                margin: "auto",
              }}
            >
              <Box sx={{ display: tableMediaQuery ? "none" : "inline-block" }}>
                <CharacterEpisodes character={character} />
              </Box>
              <Button
                sx={{
                  borderStyle: "solid",
                  borderWidth: "2px",
                  width: "87px",
                  height: "38px",
                  padding: "10px, 20px, 10px, 20px",
                  marginTop: "20px",
                  textTransform: "none",
                  fontFamily: "Montserrat",
                  fontSize: "14px",
                  lineHeight: "18px",
                  color: "white",
                  fontStyle: "normal",
                  fontWeight: "400",
                }}
                onClick={handleClose}
                color="primary"
                size="large"
                variant="outlined"
              >
                Close
              </Button>
            </Box>
          </Container>
        </DialogContent>
      </Dialog>
    </StyledTableCell>
  )
}
