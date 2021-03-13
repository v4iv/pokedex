import React, {
  lazy,
  Suspense,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react"
import {
  Box,
  CompositeZIndex,
  FixedZIndex,
  Icon,
  IconButton,
  Layer,
  Pog,
  // @ts-ignore
  Popover,
  SearchField,
  SearchFieldProps,
  Spinner,
  Tooltip,
} from "gestalt"
import axios from "axios"
import { get } from "lodash"
import ThemeContext from "../../contexts/ThemeContext"
import { githubSVGPath, pokeballSVGPath } from "../../../assets/images/svg"
import RouterLink from "../RouterLink"
// Lazy Load
const ResultBox = lazy(() => import("../ResultBox"))

const Header: React.FunctionComponent = () => {
  const themeContext = useContext(ThemeContext)

  const anchorRef = useRef(null)

  const [query, setQuery] = useState("")
  const [searching, setSearching] = useState(false)
  const [results, setResults] = useState([])

  const SEARCH_ZINDEX = new FixedZIndex(10)
  const resultsZIndex = new CompositeZIndex([SEARCH_ZINDEX])

  const search = useCallback((value) => {
    setSearching(true)

    axios
      .get(`${process.env.REACT_APP_SEARCH_API}${value}`)
      .then((res) => {
        const searchResults = get(res, ["data"])

        setSearching(false)

        setResults(searchResults)
      })
      .catch((err) => {
        setSearching(false)

        if (err.response) {
          console.error(err.response.data)
        } else {
          console.error("Error: ", err.message)
        }
      })
  }, [])

  const handleChange: SearchFieldProps["onChange"] = ({ value }) => {
    setQuery(value)

    if (value.length >= 3) search(value)
  }

  return (
    <>
      <Box
        color="white"
        rounding={1}
        margin={1}
        padding={2}
        display="flex"
        alignItems="center"
        borderStyle="sm"
      >
        <Box padding={2}>
          <RouterLink to="/" hoverStyle="none" accessibilityLabel="Home">
            <Icon
              dangerouslySetSvgPath={pokeballSVGPath}
              color="watermelon"
              size={32}
              inline
              accessibilityLabel="Pokedex"
            />
          </RouterLink>
        </Box>

        <Box flex="grow" paddingX={1} ref={anchorRef}>
          <SearchField
            accessibilityLabel="Search"
            id="searchField"
            autoComplete="off"
            onChange={handleChange}
            placeholder="Search"
            value={query}
          />
        </Box>

        <Tooltip
          inline
          text={themeContext.theme === "light" ? "Dark Mode" : "Light Mode"}
        >
          <Box paddingX={2} display="inlineBlock">
            <IconButton
              accessibilityLabel="toggle color scheme: light / dark mode views"
              icon="workflow-status-in-progress"
              size="md"
              onClick={themeContext.toggleTheme}
            />
          </Box>
        </Tooltip>
        <Tooltip inline text="Github">
          <Box paddingX={2} display="inlineBlock">
            <RouterLink to="https://github.com/v4iv/pokedex" target="blank">
              <Pog
                accessibilityLabel="Github"
                dangerouslySetSvgPath={githubSVGPath}
                size="md"
              />
            </RouterLink>
          </Box>
        </Tooltip>
      </Box>

      {query.length >= 3 && (
        <Layer zIndex={resultsZIndex}>
          <Popover
            anchor={anchorRef.current!}
            idealDirection="down"
            onDismiss={() => setQuery("")}
            positionRelativeToAnchor={false}
            size="md"
            showCaret
          >
            <Suspense
              fallback={
                <Box padding={3} column={12}>
                  <Spinner accessibilityLabel="Loading..." show />
                </Box>
              }
            >
              <ResultBox results={results} searching={searching} />
            </Suspense>
          </Popover>
        </Layer>
      )}
    </>
  )
}

export default Header
