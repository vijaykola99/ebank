import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {userId: '', pin: '', isFailure: false, errorMsg: '', checkbox: false}

  onChangeUsername = event => {
    this.setState({userId: event.target.value})
  }

  onChangePassword = event => {
    this.setState({pin: event.target.value})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    console.log(userDetails)
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccess(data.jwt_token)
    } else {
      this.setState({isFailure: true, errorMsg: data.error_msg})
    }
  }

  onSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 3})
    const {history} = this.props
    history.replace('/')
  }

  onChangeCheckbox = () => {
    this.setState(prevState => ({checkbox: !prevState.checkbox}))
  }

  render() {
    const {userId, pin, isFailure, errorMsg, checkbox} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-background">
        <div className="image-form-background">
          <img
            className="login-image"
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
          />
          <form className="form-background" onSubmit={this.onSubmitForm}>
            <h1 className="welcome-heading">Welcome Back</h1>

            <label className="label" htmlFor="text">
              User ID
            </label>
            <input
              onChange={this.onChangeUsername}
              value={userId}
              className="input"
              type="text"
              placeholder="Enter User Id"
              id="text"
            />
            <label className="label" htmlFor="pin">
              PIN
            </label>
            <input
              onChange={this.onChangePassword}
              value={pin}
              className="input"
              type={checkbox ? 'text' : 'password'}
              placeholder="Enter Pin"
              id="pin"
            />
            <div className="checkbox-div">
              <input
                onChange={this.onChangeCheckbox}
                type="checkbox"
                className="input-check-box"
                id="checkbox"
              />
              <label htmlFor="checkbox">
                {checkbox ? 'Hide Password' : 'Show password'}
              </label>
            </div>
            {isFailure && <p className="error-msg">{errorMsg}</p>}
            <button className="login-button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}
export default Login
