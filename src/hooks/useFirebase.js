import { useState, useEffect } from 'react'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from 'firebase/auth'
import Swal from 'sweetalert2'
import initializeAuthentication from '../Firebase/firebase.init'
import { useLocation, useHistory } from 'react-router-dom'

//initialize firebase  authentication
initializeAuthentication()

const useFirebase = () => {
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [authError, setAuthError] = useState('')
  const [admin, setAdmin] = useState(false)
  // const [token, setToken] = useState('')

  const location = useLocation()
  const history = useHistory()
  const redirect_url = location.state?.from || '/'

  const auth = getAuth()

  const registerUser = (email, password, name, history) => {
    setIsLoading(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setAuthError('')
        const newUser = { email, displayName: name }
        setUser(newUser)
        // save user to the database
        saveUser(email, name, 'POST')
        // send name to firebase after creation
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {})
          .catch((error) => {})
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Account has been created!',
          showConfirmButton: false,
          timer: 1500,
        })

        history.replace('/')
      })
      .catch((error) => {
        setAuthError(error.message)
        console.log(error)
      })
      .finally(() => setIsLoading(false))
  }

  const loginUser = (email, password, location, history) => {
    setIsLoading(true)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Sign in Successful!',
          showConfirmButton: false,
          timer: 1500,
        })
        const destination = location?.state?.from || '/'
        history.replace(destination)
        setAuthError('')
      })
      .catch((error) => {
        setAuthError(error.message)
      })
      .finally(() => setIsLoading(false))
  }

  // observer user state
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        // getIdToken(user).then((idToken) => {
        //   setToken(idToken)
        // })
      } else {
        setUser({})
      }
      setIsLoading(false)
    })
    return () => unsubscribed
  }, [auth])

  useEffect(() => {
    fetch(`https://damp-savannah-22237.herokuapp.com/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => setAdmin(data.admin))
  }, [user.email])

  const logout = () => {
    setIsLoading(true)
    signOut(auth)
      .then(() => {
        setUser({})
        history.push(redirect_url)
      })
      .catch((error) => {
        // An error happened.
      })
      .finally(() => setIsLoading(false))
  }

  const saveUser = (email, displayName, method) => {
    const user = { email, displayName }
    fetch('https://damp-savannah-22237.herokuapp.com/users', {
      method: method,
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(user),
    }).then()
  }

  return {
    user,
    admin,
    isLoading,
    authError,
    registerUser,
    loginUser,
    logout,
  }
}

export default useFirebase
