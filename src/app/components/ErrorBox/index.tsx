import React from "react"

interface Props {
  message: string
}

const ErrorBox: React.FunctionComponent<Props> = (props) => {
  const { message } = props
  return (
    <section className="section">
      <div className="notification is-danger">{message}</div>
    </section>
  )
}

export default ErrorBox
