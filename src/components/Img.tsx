import { useWindowSize } from "../hooks/useWindowSize"
import { maxWidthTitle } from "../utils/config"
import pic from "./../sirius_logo.png"

const Image = () => {
  const windowSize = useWindowSize()
  return (
    <img
      src={pic}
      width={
        windowSize.width === undefined || windowSize.width >= maxWidthTitle
          ? "102px"
          : "75px"
      }
      height="auto"
    />
  )
}
export default Image
