import React, { useContext, useRef, useState } from "react"
import {
  Avatar,
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
  Text,
} from "gestalt"
import { capitalize, get } from "lodash"
import {
  fetchSearchResults,
  pokemonIDGenerator,
  ThemeContext,
} from "../../../utils"
import RouterLink from "../RouterLink"

const Header: React.FunctionComponent = () => {
  const themeContext = useContext(ThemeContext)
  const anchorRef = useRef(null)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])

  const SEARCH_ZINDEX = new FixedZIndex(10)
  const resultsZIndex = new CompositeZIndex([SEARCH_ZINDEX])

  const handleSearch: SearchFieldProps["onChange"] = ({ value }) => {
    setQuery(value)

    if (value.length >= 3) {
      fetchSearchResults(value)
        .then((res: any) => setResults(res))
        .catch((err) => console.error("Search Error: ", err))
    }
  }

  return (
    <>
      <Box
        color="white"
        rounding={1}
        padding={2}
        display="flex"
        alignItems="center"
        borderStyle="sm"
      >
        <Box padding={2}>
          <RouterLink to="/" hoverStyle="none" accessibilityLabel="Home">
            <Icon
              dangerouslySetSvgPath={{
                __path:
                  "M4.463 11.691c-.081-.436-.651-.676-1.217-.368l.146.498.23.737.104.335c.423-.272.85-.599.737-1.203zm-.562.67a56.82 56.82 0 0 0-.197-.636l-.059-.203a.54.54 0 0 1 .33.033c.053.026.146.084.166.196.047.25-.037.429-.24.608zm9.108-1.362a.774.774 0 1 0-.963 1.207l1.018-1.153a1.058 1.058 0 0 0-.055-.054zm-.961.812a.5.5 0 0 1 .618-.707zm7.551.225a.375.375 0 0 1 .013.105c-.01.215-.213.382-.454.37-.241-.008-.43-.191-.42-.405.007-.203.187-.362.409-.372a.712.712 0 0 0-.132-.017c-.405-.017-.735.27-.748.626-.017.38.289.692.686.709.406.015.735-.272.75-.651a.625.625 0 0 0-.103-.365m-12.255.436c0 .216-.197.39-.438.39-.242 0-.438-.173-.438-.39 0-.202.173-.368.394-.388a.736.736 0 0 0-.132-.012c-.404 0-.723.3-.723.656 0 .382.32.68.716.68.405 0 .723-.298.723-.68a.605.605 0 0 0-.119-.358c.01.03.017.065.017.102m14.768-2.185l-.18.739-.166-.82-2.218-.487.016 1.233.334.075-.024.223-.01-.007c-.414-.218-.927-.24-1.41-.058-.163.06-.314.143-.45.242l-.335-2.112h-1.475l-.04.244h-1.553l-.177 1.085-.13-.159a1.986 1.986 0 0 0-1.525-.73l1.318-.709-.918-1.37-1.663 1.913.287.35a2.19 2.19 0 0 0-.674.429L9.696 9.104l-.497.953.019-.916-2.226.712.057 1.196.379-.098.056.605c-.433-.193-.954-.19-1.436.014a2.12 2.12 0 0 0-.399.229 1.695 1.695 0 0 0-.077-1.058 1.904 1.904 0 0 0-.817-.9 1.958 1.958 0 0 0-.865-.308c-.77-.135-1.696.003-2.606.392a6.339 6.339 0 0 0-.928.483L0 10.634l.215.363.667 1.127s.204.346.205.345l.361-.177.05-.023 1.658 3.7.16.355.37-.118.896-.288.394-.125-.104-.4-.476-1.829c.137-.101.264-.209.383-.321-.027.219-.013.44.047.652.124.443.416.793.818.986.435.21.965.21 1.456.002.247-.104.467-.257.651-.439l.068.728 1.57-.231-.002-1.407 3.282 1.62v-1.57a3.335 3.335 0 0 0 1.347-.436l-.138.843 1.77.279.097-.637.461.854.283-.545.104.895 2.005.352-.106-.674a1.817 1.817 0 0 0 1.038-.198l-.08.718 1.336.189.01.547 1.39.438L24 10.745zm-7.839.81l.092-.097-.112.69-.289-.262zm-1.177-2.813l.487.661-1.39.689-.097-.146zm-9.202 5.091l.555 2.128-.898.287-1.841-4.112c-.1.053-.284.14-.455.223L.59 10.775c.266-.169.556-.319.865-.45.868-.369 1.697-.48 2.36-.362.233.027.481.095.7.24.298.168.525.406.657.711.32.74-.215 1.807-1.276 2.461zm4.126-.378c-.01.318-.127.634-.321.903a1.797 1.797 0 0 1-.749.605c-.779.33-1.557 0-1.764-.74-.203-.714.266-1.565 1.02-1.89.483-.202.966-.155 1.312.08.213.146.377.364.453.637a1.33 1.33 0 0 1 .049.406zm4.236 1.504l-3.254-1.629.006 1.707-.843.115-.059-.703c.26-.446.355-.972.22-1.454a1.526 1.526 0 0 0-.4-.68l-.121-1.433-.377.098-.017-.362 1.352-.404.083 1.396.997-1.4.974.927-1.362 1.436 1.28.507c.142.27.36.5.634.67.264.163.568.26.889.291v.918zm-1.69-2.36l-.454-.174.423-.41c-.019.188-.01.385.03.584zm3.542.427c-.312.259-.67.427-1.139.54a2.216 2.216 0 0 1-.302.051c-.747.073-1.374-.27-1.612-.826a1.191 1.191 0 0 1-.069-.209c-.11-.468-.016-.887.215-1.215a1.47 1.47 0 0 1 .235-.261 1.87 1.87 0 0 1 .812-.413c.712-.171 1.339.046 1.723.517l-1.355 1.444a.978.978 0 0 0 .345-.033c.323-.079.504-.25.663-.436l.542.486.164.15a3.016 3.016 0 0 1-.222.205zm2.877 1.927l-.294-1.954-.418 1.078-.625-1.348h-.007l-.246 1.56-1.041-.18.146-.87a4.17 4.17 0 0 0 .116-.114l.338-.348-.329-.294.35-2.073h1.05l.262 1.436.294-1.663h.752l.312 2.026c-.396.451-.59 1.06-.456 1.615a1.478 1.478 0 0 0 .865 1.035l.04.263zm2.595-.637a1.64 1.64 0 0 1-.377.2 1.397 1.397 0 0 1-.773.077 1.153 1.153 0 0 1-.448-.19 1.118 1.118 0 0 1-.43-.655c-.08-.336-.007-.696.174-1.012.091-.154.207-.298.344-.423.152-.137.33-.25.527-.325.459-.172.912-.112 1.23.116a1.08 1.08 0 0 1 .422.633c.098.406-.018.838-.274 1.187a1.75 1.75 0 0 1-.395.392zm2.343 1.841l-.77-.229-.066-2.838-.388 2.19-.84-.135.062-.63c.547-.464.838-1.195.679-1.856a1.457 1.457 0 0 0-.434-.744l.071-.743-.317-.085.02-.396 1.448.29.487 2.308.499-2.069 1.1.244z",
              }}
              color="watermelon"
              size={42}
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

        <Box paddingX={2} display="inlineBlock">
          <IconButton
            accessibilityExpanded={themeContext.theme === "dark"}
            accessibilityLabel="Toggle Dark Mode"
            icon="workflow-status-in-progress"
            size="md"
            selected={themeContext.theme === "dark"}
            onClick={themeContext.toggleTheme}
          />
        </Box>
        <Box paddingX={2} display="inlineBlock">
          <RouterLink to="https://github.com/v4iv/pokedex" target="blank">
            <Pog
              accessibilityLabel="Github"
              dangerouslySetSvgPath={{
                __path:
                  "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
              }}
              size="md"
            />
          </RouterLink>
        </Box>
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
            <Box padding={3} column={12}>
              {results.length ? (
                <>
                  {results.map((pokemon: any) => {
                    const pokemonID = pokemonIDGenerator(
                      // eslint-disable-next-line radix
                      parseInt(get(pokemon, ["id"]))
                    )
                    const pokemonName = get(pokemon, ["name"])
                    return (
                      <Box
                        key={pokemonID}
                        borderStyle="sm"
                        rounding={2}
                        margin={1}
                        flex="grow"
                      >
                        <RouterLink
                          to={`/pokemon/${pokemonName}`}
                          hoverStyle="none"
                        >
                          <Box padding={2} alignItems="center" display="flex">
                            <Box paddingX={2}>
                              <Avatar
                                name={pokemonName}
                                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                                size="xs"
                              />
                            </Box>
                            <Box paddingX={2} flex="grow">
                              <Text color="darkGray" weight="bold">
                                {pokemonName}
                              </Text>
                              <Text
                                size="sm"
                                color="gray"
                              >{`#${pokemonID}`}</Text>
                            </Box>
                          </Box>
                        </RouterLink>
                      </Box>
                    )
                  })}
                </>
              ) : (
                <Spinner accessibilityLabel="Loading..." show />
              )}
            </Box>
          </Flyout>
        </Layer>
      )}
    </>
  )
}

export default Header
