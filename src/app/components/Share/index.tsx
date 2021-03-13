import React, { useRef, useState } from "react"
import {
  Box,
  CompositeZIndex,
  FixedZIndex,
  Popover,
  Icon,
  IconButton,
  Layer,
} from "gestalt"
import {
  FacebookShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share"
import { redditSVGPath, whatsappSVGPath } from "../../../assets/images/svg"

interface IProps {
  url: string
  title?: string
  excerpt?: string
}

const Share: React.FunctionComponent<IProps> = (props) => {
  const { url, title, excerpt } = props

  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)

  const FLYOUT_ZINDEX = new FixedZIndex(10)
  const shareZIndex = new CompositeZIndex([FLYOUT_ZINDEX])

  const toggleFlyout = () => setOpen(!open)

  return (
    <>
      <Box paddingX={2} ref={anchorRef} aria-haspopup aria-expanded={open}>
        <IconButton
          accessibilityLabel="Share"
          icon="android-share"
          onClick={toggleFlyout}
        />
      </Box>
      {open && (
        <Layer zIndex={shareZIndex}>
          <Popover
            anchor={anchorRef.current!}
            idealDirection="down"
            onDismiss={toggleFlyout}
            positionRelativeToAnchor={false}
            showCaret
          >
            <Box flex="grow" display="flex" direction="column">
              <Box
                padding={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <FacebookShareButton url={url} quote={excerpt}>
                  <Icon
                    accessibilityLabel="Facebook"
                    icon="facebook"
                    color="navy"
                  />
                </FacebookShareButton>
              </Box>
              <Box
                padding={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <TwitterShareButton url={url} title={excerpt}>
                  <Icon
                    accessibilityLabel="Twitter"
                    icon="twitter"
                    color="blue"
                  />
                </TwitterShareButton>
              </Box>
              <Box
                padding={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <WhatsappShareButton url={url} title={title}>
                  <Icon
                    accessibilityLabel="Whatsapp"
                    dangerouslySetSvgPath={whatsappSVGPath}
                    color="green"
                  />
                </WhatsappShareButton>
              </Box>
              <Box
                padding={2}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <RedditShareButton url={url} title={title}>
                  <Icon
                    accessibilityLabel="Reddit"
                    dangerouslySetSvgPath={redditSVGPath}
                    color="red"
                  />
                </RedditShareButton>
              </Box>
            </Box>
          </Popover>
        </Layer>
      )}
    </>
  )
}

export default Share
