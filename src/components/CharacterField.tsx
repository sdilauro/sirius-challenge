import { Typography, Box } from "@mui/material"
import { characterProperty } from "../Interfaces"

interface Props {
  property: characterProperty
}

export const CharacterField = ({ property }: Props) => {
  return (
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
        {property.key}
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
          {property.value}
        </Typography>
      </Box>
    </Box>
  )
}
