import {
  Typography,
  Button,
  Box,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableHead,
  TableRow,
  CircularProgress,
  Avatar,
  Dialog,
  DialogContent,
  useMediaQuery
} from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Episode, Character } from '../Interfaces'
import api from '../api'
import preload from './../preload.jpeg'
import { maxWidthTable, StyledTableCell, StyledTableRow } from '../utils/config'

type CharacterEpisodesDialogProps = {
  character: Character | null
  onClose: () => void
  open: boolean
}

export const CharacterEpisodesDialog = (props: CharacterEpisodesDialogProps) => {
  const [episodesList, setEpisodesList] = useState<any[]>([])
  const [episodes, setEpisodes] = useState<string>('')
  const [success, setSuccess] = useState<boolean>(true)
  const [episodesLoaded, setEpisodesLoaded] = useState<boolean>(false)

  const tableMediaQuery = useMediaQuery(`(min-width:${maxWidthTable}px)`)

  useEffect(() => {
    if (episodesLoaded === false) {
      return
    }

    api
      .getEpisodes(episodes)
      .then((json) => {
        setEpisodesList(json)
        setSuccess(true)
      })
      .catch((err) => {
        console.log('Error:', err)
        setSuccess(false)
      })
  }, [episodes])

  useEffect(() => {
    if (props.character !== null) {
      loadEpisodes(props.character)
    }
  }, [props.character])

  const loadEpisodes = (character:Character) => {
    let episodes: string = ''
    character.episode.forEach((element) => {
      episodes =
        episodes + element.substring(element.lastIndexOf('/') + 1) + ','
    })
    setEpisodes(episodes)
    setEpisodesLoaded(true)
  }

  return (
    <Dialog open={props.open} onClose={props.onClose} maxWidth="lg" scroll="body">
      {props.character != null && <DialogContent
        sx={{ maxHeight: tableMediaQuery ? 'auto' : '100vh', p: 0 }}
      >
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '800px',
            maxWidth: '100%',
            height: 'auto',
            paddingTop: '40px',
            paddingBottom: '60px',
            backgroundColor: '#0A222D'
          }}
        >
          <Box sx={{ width: '90%', margin: 'auto', maxWidth: '1315px' }}>
            {success
              ? (
              <>
                <Typography
                  component={'div'}
                  color="#00DFDD"
                  fontFamily={'Montserrat'}
                  sx={{
                    fontSize: '25px',
                    lineHeight: '27px',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'end',
                    marginBottom: '15px',
                    justifyContent: 'space-between'
                  }}
                >
                  {props.character.name} appearances
                  <Avatar
                    alt=""
                    src={props.character.image}
                    sx={{
                      width: tableMediaQuery ? 100 : 75,
                      height: 'auto',
                      marginRight: '15px',
                      backgroundImage: `url(${preload})`,
                      backgroundSize: '100px'
                    }}
                  />
                </Typography>

                <TableContainer
                  component={Paper}
                  sx={{
                    paddingTop: '37px',
                    paddingBottom: '37px',
                    width: '100%',
                    margin: 'auto',
                    maxHeight: tableMediaQuery ? '33vh' : 'auto',
                    flex: tableMediaQuery ? 'none' : '1',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(196, 196, 196, 0.5)'
                  }}
                >
                  <Table
                    sx={{
                      width: '90%',
                      maxWidth: '90%',
                      margin: 'auto'
                    }}
                    aria-label="customized table"
                    size="small"
                  >
                    <TableHead
                      sx={{
                        backgroundColor: 'transparent'
                      }}
                    >
                      <TableRow>
                        <StyledTableCell
                          component="th"
                          scope="row"
                          align="left"
                          sx={{
                            width: '60%',
                            fontSize: tableMediaQuery ? '20px' : '12px',
                            lineHeight: tableMediaQuery ? '22px' : '14px'
                          }}
                        >
                          Episode name
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          sx={{
                            width: tableMediaQuery ? '100px' : '50px',
                            fontSize: tableMediaQuery ? '20px' : '12px',
                            lineHeight: tableMediaQuery ? '22px' : '14px'
                          }}
                        >
                          Code
                        </StyledTableCell>
                        <StyledTableCell
                          align="left"
                          sx={{
                            fontSize: tableMediaQuery ? '20px' : '12px',
                            lineHeight: tableMediaQuery ? '22px' : '14px'
                          }}
                        >
                          Air Date
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {episodesList.map((episode: Episode) => (
                        <StyledTableRow key={episode.id}>
                          <StyledTableCell
                            align="left"
                            component="th"
                            scope="row"
                            sx={{
                              borderTopLeftRadius: '8px',
                              borderBottomLeftRadius: '8px',
                              fontSize: tableMediaQuery ? '18px' : '10px',
                              lineHeight: tableMediaQuery ? '20px' : '12px'
                            }}
                          >
                            {episode.name}
                          </StyledTableCell>
                          <StyledTableCell
                            align="left"
                            component="th"
                            scope="row"
                            sx={{
                              fontSize: tableMediaQuery ? '18px' : '10px',
                              lineHeight: tableMediaQuery ? '20px' : '12px'
                            }}
                          >
                            {episode.episode}
                          </StyledTableCell>
                          <StyledTableCell
                            align="left"
                            component="th"
                            scope="row"
                            sx={{
                              borderTopRightRadius: '8px',
                              borderBottomRightRadius: '8px',
                              fontSize: tableMediaQuery ? '18px' : '10px',
                              lineHeight: tableMediaQuery ? '20px' : '12px'
                            }}
                          >
                            {episode.air_date}
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
                )
              : (
              <Typography
                component={'div'}
                color="#00DFDD"
                fontFamily={'Montserrat'}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <CircularProgress />
                Loading...
              </Typography>
                )}
          </Box>
          <Box sx={{ display: 'flex', flexGrow: 1 }}></Box>
          <Button
            sx={{
              borderStyle: 'solid',
              borderWidth: '2px',
              width: '87px',
              height: '38px',
              padding: '10px, 20px, 10px, 20px',
              marginTop: '20px',
              textTransform: 'none',
              fontFamily: 'Montserrat',
              fontSize: '14px',
              lineHeight: '18px',
              color: 'white',
              fontStyle: 'normal',
              fontWeight: '400'
            }}
            onClick={props.onClose}
            color="primary"
            size="large"
            variant="outlined"
          >
            Close
          </Button>
        </Container>
      </DialogContent>}

    </Dialog>

  )
}
