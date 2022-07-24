import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import './Navbar.scss'

const Navbar = () => {
  const { i18n, t } = useTranslation('translation')
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  
  return (
    <div className='navbar' data-testid='navbar'>
      <div className='navContainer'>
        <div>
          <NavLink to='/' style={{ color: 'inherit', textDecoration: 'none' }}>
            <span className='logo'>CheapyBookingApp</span>
          </NavLink>
          <button
            className='lngButton'
            onClick={() => i18n.changeLanguage('es')}
          >
            ESP
          </button>
          <button
            className='lngButton'
            onClick={() => i18n.changeLanguage('en')}
          >
            ENG
          </button>
        </div>
        {user ? (
          user?.user?.username
        ) : (
          <div className='navItems'>
            <button className='navButton'>{t('navbarPageRegister')}</button>
            <button className='navButton' onClick={() => navigate('/login')}>
              {t('navbarPageLogin')}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
