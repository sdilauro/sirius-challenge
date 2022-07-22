import { Typography, Box } from "@mui/material"

export const CharacterField = (title: string, value: string) => {
  return (
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
        {title}
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
            minHeight: "20px",
            color: "#777777",
            fontSize: "14px",
            fontWeight: "400",
            fontStyle: "normal",
            lineHeight: "20px",
            fontFamily: "Roboto",
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  )
}
