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
  Flyout,
  Icon,
  IconButton,
  Layer,
  Pog,
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
  const [results, setResults] = useState([])

  const SEARCH_ZINDEX = new FixedZIndex(10)
  const resultsZIndex = new CompositeZIndex([SEARCH_ZINDEX])

  const search = useCallback((value) => {
    axios
      .get(`/api/search?q=${value}`)
      .then((res) => {
        const searchResults = get(res, ["data"])

        setResults(searchResults)
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response.data)
          console.log(err.response.status)
          console.log(err.response.headers)
        } else if (err.request) {
          console.log(err.request)
        } else {
          console.log("Error", err.message)
        }
        console.log(err.config)
      })
  }, [])

  const handleSearch: SearchFieldProps["onChange"] = ({ value }) => {
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
            onChange={handleSearch}
            placeholder="Search"
            value={query}
          />
        </Box>

        <Tooltip
          inline
          text={
            themeContext.theme === "light"
              ? "Dark-Mode View"
              : "Light-Mode View"
          }
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
          <Flyout
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
              <ResultBox results={results} />
            </Suspense>
          </Flyout>
        </Layer>
      )}
    </>
  )
}

export default Header
