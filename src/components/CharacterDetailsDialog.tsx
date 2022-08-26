import {
  Avatar, Box, Button, Dialog,
  DialogContent, Typography, useMediaQuery
} from '@mui/material'
import React, { useState } from 'react'
import { Container } from '@mui/system'

import { Character } from '../Interfaces'
import { maxWidthTable } from '../utils/config'
import preload from './../preload.jpeg'
import { CharacterEpisodesButton } from './CharacterEpisodesButton'
import { CharacterEpisodesDialog } from './CharacterEpisodesDialog'
import { CharacterField } from './CharacterField'

type CharacterDetailsDialogProps = {
  character: Character | null
  onClose: () => void
  open: boolean
}

const properties = [
  { value: 'name', title: 'Name' },
  { value: 'status', title: 'Status' },
  { value: 'species', title: 'Species' },
  { value: 'type', title: 'Type' },
  { value: 'gender', title: 'Gender' }
]

export const CharacterDetailsDialog = (props: CharacterDetailsDialogProps) => {
  const tableMediaQuery = useMediaQuery(`(min-width:${maxWidthTable}px)`)
  const [episodesVisibility, setEpisodesVisibility] = useState<boolean>(false)

  function handleOpenEpisodes () {
    setEpisodesVisibility(true)
  }
  function handleCloseEpisodes () {
    setEpisodesVisibility(false)
  }

  return (

      <Dialog
        open={props.open}
        onClose={props.onClose}
        maxWidth="md"
        scroll="body"
        fullScreen={!tableMediaQuery}
    > {props.character !== null &&
      <DialogContent sx={{ p: 0 }}>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: tableMediaQuery ? '410px' : '770px',
          maxWidth: '100%',
          height: 'auto',
          paddingTop: '40px',
          paddingBottom: '60px',
          backgroundColor: '#0A222D'
        }}
      >
        <Avatar
          alt={props.character.name}
          src={props.character.image}
          sx={{
            width: 100,
            height: 100,
            backgroundImage: `url(${preload})`,
            backgroundSize: '100px'
          }}
        />
        {properties
          .map((property, index) => {
            if (props.character != null && property.value in props.character) {
              const value = props.character[property.value as keyof Character]
              return CharacterField(
                property.title,
                value.toString(),
                index.toString()
              )
            }
            return null
          })
          .filter((element) => element !== null)}
        <Box sx={{ marginTop: '10px', marginBottom: '10px' }}>
          <Typography
            sx={{
              color: 'white',
              fontSize: '14px',
              fontWeight: '400',
              fontStyle: 'normal',
              lineHeight: '20px',
              fontFamily: 'Roboto',
              marginBottom: '4px'
            }}
          >
            Origin
          </Typography>
          <Box
            sx={{
              backgroundColor: 'white',
              borderRadius: '8px',
              width: '268px',
              maxWidth: '95%',
              paddingTop: '12px',
              paddingBottom: '12px',
              paddingLeft: '16px',
              paddingRight: '16px'
            }}
          >
            <Typography
              sx={{
                minHeight: '20px',
                color: '#777777',
                fontSize: '14px',
                fontWeight: '400',
                fontStyle: 'normal',
                lineHeight: '20px',
                fontFamily: 'Roboto'
              }}
            >
              {props.character.origin.name.charAt(0).toUpperCase() +
                props.character.origin.name.slice(1)}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ marginTop: '10px', marginBottom: '10px' }}>
          <Typography
            sx={{
              color: 'white',
              fontSize: '14px',
              fontWeight: '400',
              fontStyle: 'normal',
              lineHeight: '20px',
              fontFamily: 'Roboto',
              marginBottom: '4px'
            }}
          >
            Location
          </Typography>
          <Box
            sx={{
              backgroundColor: 'white',
              borderRadius: '8px',
              width: '268px',
              paddingTop: '12px',
              paddingBottom: '12px',
              paddingLeft: '16px',
              paddingRight: '16px'
            }}
          >
            <Typography
              sx={{
                minHeight: '20px',
                color: '#777777',
                fontSize: '14px',
                fontWeight: '400',
                fontStyle: 'normal',
                lineHeight: '20px',
                fontFamily: 'Roboto'
              }}
            >
              {props.character.location.name.charAt(0).toUpperCase() +
                props.character.location.name.slice(1)}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: '80%',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            margin: 'auto'
          }}
        >
          <Box sx={{ display: tableMediaQuery ? 'none' : 'inline-block' }}>
            <CharacterEpisodesButton showEpisodes={() => handleOpenEpisodes()}/>
          </Box>
          <CharacterEpisodesDialog onClose={() => handleCloseEpisodes()} character={props.character} open={episodesVisibility}/>
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
        </Box>
      </Container>
    </DialogContent>}

      </Dialog>

  )
}
