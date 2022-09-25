import Cookies from 'js-cookie'
import './index.css'

const Home = props => {
  const logOut = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/ebank/login')
  }
  return (
    <div className="home-background">
      <div className="home-header-section">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
        />
        <button onClick={logOut} type="button" className="logout-button">
          Logout
        </button>
      </div>
      <div className="digital-card">
        <h1 className="home-heading">Your Flexibility, Our Excellence </h1>
        <img
          className="digital"
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          alt="digital card"
        />
      </div>
    </div>
  )
}
export default Home
