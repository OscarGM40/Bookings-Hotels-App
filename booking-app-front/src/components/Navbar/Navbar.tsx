import { useTranslation } from 'react-i18next'
import './Navbar.scss'

const Navbar = () => {
  const { i18n } = useTranslation()
  return (
    <div className='navbar' data-testid='navbar'>
      <div className='navContainer'>
        <span className='logo'>CheapyBookingApp</span>
        <div className='navItems'>
          <button className='navButton'>Register</button>
          <button className='navButton'>Login</button>
          <button className='lngButton' onClick={() => i18n.changeLanguage('es')} >ESP </button>
          <button className='lngButton' onClick={() => i18n.changeLanguage('en')}>ENG</button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
