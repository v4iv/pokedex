import React, {
  lazy,
  Suspense,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react'
import {
  Box,
  CompositeZIndex,
  FixedZIndex,
  Icon,
  IconButton,
  Layer,
  Pog,
  Popover,
  SearchField,
  SearchFieldProps,
  Spinner,
  Tooltip,
} from 'gestalt'
import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'
import {useDispatch, useSelector} from 'react-redux'
import ThemeContext from '../../contexts/ThemeContext'
import {githubSVGPath, pokeballSVGPath} from '../../../assets/images/svg'
import RouterLink from '../RouterLink'
import {RootState} from '../../reducers'
import {
  SEARCH_ERROR,
  SEARCH_REQUEST,
  SEARCH_SUCCESS,
} from '../../constants/search.constants'
import {searchAction} from '../../actions/search.action'
import {useTranslation} from 'react-i18next'
// Lazy Load
const ResultBox = lazy(() => import('../ResultBox'))

const Header: React.FC = () => {
  const {t} = useTranslation(['common'])
  const themeContext = useContext(ThemeContext)
  const dispatch = useDispatch()

  const anchorRef = useRef(null)

  const [query, setQuery] = useState('')

  const SEARCH_ZINDEX = new FixedZIndex(10)
  const resultsZIndex = new CompositeZIndex([SEARCH_ZINDEX])

  const {results, searching} = useSelector((state: RootState) => ({
    results: state.search.results,
    searching: state.search.loading,
  }))

  const search = useCallback(
    (value) => {
      dispatch({
        type: SEARCH_REQUEST,
      })

      const url = `${process.env.REACT_APP_SEARCH_API}${value}`

      searchAction(url)
        .then((res) => {
          dispatch({
            type: SEARCH_SUCCESS,
            payload: res,
          })
        })
        .catch((err) => {
          console.error(SEARCH_ERROR, err)

          dispatch({
            type: SEARCH_ERROR,
            payload: 'Oops! Something went wrong. Please try again later.',
          })
        })
    },
    [dispatch],
  )

  const debouncedSearch = debounce(search, 500)

  const handleChange: SearchFieldProps['onChange'] = useCallback(
    ({value}) => {
      setQuery(value)

      if (value.length) debouncedSearch(value)
    },
    [debouncedSearch],
  )

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
          <RouterLink
            to="/"
            hoverStyle="none"
            accessibilityLabel={t('common:home')}
          >
            <Icon
              dangerouslySetSvgPath={pokeballSVGPath}
              color="watermelon"
              size={32}
              inline
              accessibilityLabel={t('common:pokedex')}
            />
          </RouterLink>
        </Box>

        <Box flex="grow" paddingX={1} ref={anchorRef}>
          <SearchField
            accessibilityLabel={t('common:search')}
            id="searchField"
            autoComplete="off"
            onChange={handleChange}
            placeholder={t('common:search')}
            value={query}
          />
        </Box>

        <Tooltip
          inline
          text={
            themeContext.theme === 'light'
              ? t('common:dark-mode')
              : t('common:light-mode')
          }
        >
          <Box paddingX={2} display="inlineBlock">
            <IconButton
              accessibilityLabel={t('common:toggle-color-scheme')}
              icon="workflow-status-in-progress"
              size="md"
              onClick={themeContext.toggleTheme}
            />
          </Box>
        </Tooltip>
        <Tooltip inline text={t('common:github')}>
          <Box paddingX={2} display="inlineBlock">
            <RouterLink to="https://github.com/v4iv/pokedex" target="blank">
              <Pog
                accessibilityLabel={t('common:github')}
                dangerouslySetSvgPath={githubSVGPath}
                size="md"
              />
            </RouterLink>
          </Box>
        </Tooltip>
      </Box>

      {!isEmpty(query) && (
        <Layer zIndex={resultsZIndex}>
          <Popover
            anchor={anchorRef.current!}
            idealDirection="down"
            onDismiss={() => setQuery('')}
            positionRelativeToAnchor={false}
            size="md"
            showCaret
          >
            <Suspense
              fallback={
                <Box padding={3} column={12}>
                  <Spinner accessibilityLabel={t('common:loading')} show />
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
