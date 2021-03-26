import './Button.scss'

const Button = (props) => {
  return (
    <button className="main-button" type="button">
      <img class="logo" src={props.logo}/>
      <a href={props.link}>
        {props.label}
      </a>
    </button>
  )
}

export default Button;