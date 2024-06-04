export const SIGN_IN = `mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        id
        username
      }
    }
  }`

export const SIGN_UP = `mutation Signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token
      user {
        email
        id
        username
      }
    }
  }`