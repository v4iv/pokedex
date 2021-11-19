import React, { ForwardedRef, forwardRef } from "react"
import { Link } from "gestalt"
import { useHref, useLinkClickHandler } from "react-router-dom"

const RouterLink: React.FC<any> = forwardRef(
  (
    // @ts-ignore
    { onClick, replace = false, state, target, to, ...rest },
    ref: ForwardedRef<HTMLAnchorElement>
  ) => {
    const href = useHref(to)
    const handleClick = useLinkClickHandler(to, {
      replace,
      state,
      target,
    })

    return (
      <Link
        {...rest}
        href={href}
        onClick={(event) => {
          onClick?.(event)
          // @ts-ignore
          if (!event.defaultPrevented) {
            // onClick prevented default
            // @ts-ignore
            handleClick(event)
          }
        }}
        ref={ref}
        target={target}
      />
    )
  }
)

export default RouterLink
