import React from 'react'
import { useMediaQuery } from '@mui/material'
import { maxWidthTitle } from '../utils/config'
import pic from './../sirius_logo.png'

const Image = () => {
  const titleMediaQuery = useMediaQuery(`(min-width:${maxWidthTitle}px)`)

  return (
    <img src={pic} width={titleMediaQuery ? '102px' : '75px'} height="auto" alt=''/>
  )
}
export default Image
