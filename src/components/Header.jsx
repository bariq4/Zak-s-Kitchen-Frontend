import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
      <div className="logo">
        <Link to="/">
          <img src="/static/images/logo.png" alt="Zak's Kitchen" className="logo-img" />
        </Link>
      </div>
    </header>
  )
}

export default Header
