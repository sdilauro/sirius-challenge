import {
  Button, useMediaQuery
} from '@mui/material'
import React from 'react'
import { maxWidthTable } from '../utils/config'

type CharacterEpisodesButtonProps = {
  showEpisodes: () => void
}

export const CharacterEpisodesButton = (props: CharacterEpisodesButtonProps) => {
  const tableMediaQuery = useMediaQuery(`(min-width:${maxWidthTable}px)`)

  return (<>
      {tableMediaQuery
        ? (
        <Button
          onClick={props.showEpisodes}
          sx={{
            textTransform: 'none',
            fontFamily: 'Roboto',
            fontSize: '18px',
            lineHeight: '20px',
            color: 'white',
            fontStyle: 'normal',
            fontWeight: '400',
            textAlign: 'left'
          }}
        >
          Episodes
        </Button>
          )
        : (
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
          onClick={props.showEpisodes}
          color="primary"
          size="large"
          variant="outlined"
        >
          Episodes
        </Button>
          )}

</>)
}
