import React from 'react'
import { Box, Container, Typography, useMediaQuery } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import '@fontsource/montserrat'
import './fonts.css'
import MaterialTable from './components/MaterialTable'
import Image from './components/Img'
import { theme, maxWidthTitle } from './utils/config'

function App () {
  const titleMediaQuery = useMediaQuery(`(min-width:${maxWidthTitle}px)`)
  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth={false}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '60px',
          backgroundColor: '#0A222D',
          width: '100%',
          margin: 'auto',
          minHeight: '100vh'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            direction: 'row',
            alignItems: 'end',
            width: '87.5%',
            margin: 'auto'
          }}
        >
          <Typography
            sx={{
              fontSize: titleMediaQuery ? '40px' : '25px',
              fontWeight: '400',
              lineHeight: titleMediaQuery ? '40px' : '27px',
              color: '#00DFDD',
              width: '100%',
              textAlign: 'center',
              flex: '1',
              marginBottom: '20px',
              fontFamily: 'Montserrat'
            }}
          >
            Rick and Morty characters
          </Typography>
          <Image />
        </Box>
        <MaterialTable />
        <Box sx={{ flex: 1 }}></Box>
        <Typography
          sx={{
            backgroundColor: '#0A222D',
            p: '20px',
            fontSize: '.75rem',
            fontWeight: '400',
            lineHeight: '1rem',
            color: '#00DFDD',
            width: '90%',
            margin: 'auto',
            textAlign: 'center',
            height: '2rem',
            fontFamily: 'Montserrat'
          }}
        >
          Site made by{' '}
          <a
            style={{ textDecoration: 'none', color: 'magenta' }}
            href="https://sdilauro.com"
          >
            Sdilauro
          </a>
        </Typography>
      </Container>
    </ThemeProvider>
  )
}

export default App
