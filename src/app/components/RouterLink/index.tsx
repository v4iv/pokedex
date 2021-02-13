import React, { useCallback } from "react"
import { Link, LinkProps } from "gestalt"
import {
  LinkProps as RouterLinkProps,
  RouteComponentProps,
  withRouter,
} from "react-router-dom"

const isModifiedEvent = (event: KeyboardEvent) =>
  event.metaKey || event.altKey || event.ctrlKey || event.shiftKey

// @ts-ignore
interface IProps extends LinkProps, RouteComponentProps {
  replace?: RouterLinkProps["replace"]
  to?: RouterLinkProps["to"]
  href?: RouterLinkProps["href"]
  target?: LinkProps["target"]
  onClick?: LinkProps["onClick"]
}

const RouterLink: React.FunctionComponent<IProps> = (props) => {
  const { children, history, onClick, replace = false, target, to } = props

  const href = history.createHref({
    // @ts-ignore
    pathname: to,
  })

  const handleClick = useCallback(
    ({ event }) => {
      if (onClick) {
        // @ts-ignore
        onClick({ event })
      }

      if (
        !event.defaultPrevented && // onClick prevented default
        event.button === 0 && // ignore everything but left clicks
        !target && // let browser handle "target=_blank" etc.
        !isModifiedEvent(event)
      ) {
        // ignore clicks with modifier keys
        event.preventDefault()

        if (replace) {
          // @ts-ignore
          history.replace(to)
        } else {
          // @ts-ignore
          history.push(to)
        }
      }
    },
    [history, onClick, replace, target, to]
  )

  const newProps = {
    ...props,
    target,
    onClick: handleClick,
    href,
  }

  return <Link {...newProps}>{children}</Link>
}

export default withRouter(RouterLink)
