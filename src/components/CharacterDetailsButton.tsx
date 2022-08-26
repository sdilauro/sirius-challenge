import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import {
  IconButton
} from '@mui/material'
import React from 'react'
import { StyledTableCell } from '../utils/config'

type CharacterDetailsButtonProps = {
  showDetails: () => void
}

export const CharacterDetailsButton = (props: CharacterDetailsButtonProps) => {
  return (
    <StyledTableCell
      align="right"
      sx={{
        width: '20px',
        padding: '1.25px',
        borderTopRightRadius: '8px',
        borderBottomRightRadius: '8px'
      }}
    >
      <IconButton
        onClick={props.showDetails}
        sx={{ color: '#FFFFFF', marginRight: '10px' }}
      >
        <VisibilityOutlinedIcon />
      </IconButton>
    </StyledTableCell>
  )
}
