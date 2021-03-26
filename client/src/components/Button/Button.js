const Button = (props) => {
  return (
    <a href={props.link}>
      <button type="button">
        {props.label}
      </button>
    </a>
  )
}

export default Button;