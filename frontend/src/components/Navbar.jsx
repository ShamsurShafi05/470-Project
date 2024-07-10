
import { Link } from 'react-router-dom'
import ravaLogo from '../public/rava-black.png'

export const Navbar = () => {
    
    return (
        <header className='Navbar'>
            <div className="container">
                <Link to="">
                <h1><img className="logo" src={ravaLogo} alt="RAVA Logo" /></h1>
                </Link>
                <div className="navbarMid">
                    <Link to="/events">
                        <h1>Events</h1>
                    </Link>
                    <Link to="/allclubs">
                        <h1>Clubs</h1>
                    </Link>
                    <Link to="/calendar">
                        <h1>Calendar</h1>
                    </Link>
                </div>
                <div className='navbarRight'>
                    <Link to="/signup">
                        <h1>Sign up</h1>
                    </Link>
                    <Link to="/login">
                        <h1>Login</h1>
                    </Link>
                </div>

        </div>
      </header>
  )
}

export default Navbar