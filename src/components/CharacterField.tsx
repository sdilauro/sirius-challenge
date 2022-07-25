import { Typography, Box } from "@mui/material"

export const CharacterField = (title: string, value: string, key: string) => {
  return (
    <Box key={key} sx={{ marginTop: "10px", marginBottom: "10px" }}>
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
        {title.charAt(0).toUpperCase() + title.slice(1)}
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
          {value.charAt(0).toUpperCase() + value.slice(1)}
        </Typography>
      </Box>
    </Box>
  )
}
