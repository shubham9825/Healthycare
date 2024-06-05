export const SIGN_IN = `mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        email
        id
      }
    }
  }`

export const SIGN_UP = `mutation Signup( $email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
      user {
        email
        id
      }
    }
  }`