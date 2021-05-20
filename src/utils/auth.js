import cookie from 'cookie'
import jwt from 'jsonwebtoken'



const options = {
  maxAge: 60 * 60 * 24, // 1d
  cookieName: 'app-access-token',
  cookiePath: '/',
  cookieHttpOnly: true,
  cookieSameSite: 'strict',
  cookieSecure: process.env.NODE_ENV === "Production" && process.env.APP_ENV === "Production", // Override production node env. Very important for integration testing
}

const applySession = (req, res, payload, persistence=true) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: options.maxAge})

  // Set cookie and include maxAge if persistence is set
  if (persistence) {
    res.setHeader('Set-Cookie', cookie.serialize(options.cookieName, token, {
      path: options.cookiePath,
      httpOnly: options.cookieHttpOnly,
      sameSite: options.cookieSameSite,
      secure: options.cookieSecure,
      maxAge: options.maxAge
    }))
  } else {
    res.setHeader('Set-Cookie', cookie.serialize(options.cookieName, token, {
      path: options.cookiePath,
      httpOnly: options.cookieHttpOnly,
      sameSite: options.cookieSameSite,
      secure: options.cookieSecure
    }))
  }
}

const verifySession = (req, res) => {
  const token = cookie.parse(req.headers.cookie || '')[options.cookieName]
  if (!token) return null

  try {
    const session = jwt.verify(token, process.env.JWT_SECRET) // This will throw if any errors
    return session
  }
  catch(error) {
    // https://www.npmjs.com/package/jsonwebtoken#errors--codes
    console.log(error)
    return null
  }
}

const ensureSession = (req, res) => {
  // Simply redirect to the login page if no session can be verified
  const session = verifySession(req, res)
  if (!session) {
    res.writeHead(302, { Location: '/login' })
    res.end()
    return
  }

  return session
}

const removeSession = (req, res) => {
  res.setHeader('Set-Cookie', cookie.serialize(options.cookieName, "...", {
    path: options.cookiePath,
    httpOnly: options.cookieHttpOnly,
    sameSite: options.cookieSameSite,
    secure: options.cookieSecure,
    maxAge: 0
  }))
  return
}



const AuthService = {
  applySession,
  verifySession,
  ensureSession,
  removeSession
}
export default AuthService
