


// curl -vL -X GET http://localhost:3000/api/ping
export default async (req, res) => {

  // Do authorizations here
  // const identity = AuthService.verifySession(req, res)?.identity
  // if (!identity) {
  //   res.status(401).end("Access token required.")
  //   return
  // }

  switch (req.method) {
    case 'GET':
      res.status(200).end("Pong")
      return

    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end("Method " + res.method + " Not Allowed")
      return
  }
}
