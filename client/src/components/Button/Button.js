import './Button.scss'

const Button = (props) => {
  return (
    <a href={props.link}>
      <button className="main-button" type="button">
        {props.label}
      </button>
    </a>
  )
}

export default Button;