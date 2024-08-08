export const SIGN_IN = `mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      email
      id
    }
  }
}`;

export const SIGN_UP = `mutation Signup( $email: String!, $password: String!) {
    signup(email: $email, password: $password) {
      token
      user {
        email
        id
     }
   }
}`;

export const GET_DEPARTMENT = `query Query {
  departments {
    id
    name
  }
}`;

export const GET_DOCTOR = `query Doctors($departmentId: ID!) {
  doctors(departmentId: $departmentId) {
    id
    name
  }
}`;

export const GET_ACCOUNT_DETAILS = `query GetUserProfile($userId: ID!) {
  getUserProfile(userId: $userId) {
    activity
    address
    dob
    emergencyName
    emergencyPhNo
    name
    phoneNo
  }
}`;

export const CREATE_APPOINTMENT = `
mutation Mutation($input: AppointmentInput!) {
  createAppointment(input: $input) {
    date
    doctor {
      id
    }
    id
    time
    user {
      id
    }
  }
}`;

export const CREATE_USER_PROFILE = `
mutation Mutation($input: UserProfileInput!) {
  createUserProfile(input: $input) {
    activity
    address
    dob
    emergencyName
    emergencyPhNo
    name
    phoneNo
  }
}`;

export const UPDATE_USER_PROFILE = `
mutation UpdateUserProfile($userId: ID!, $input: UserProfileInput!) {
  updateUserProfile(userId: $userId, input: $input) {
    activity
    address
    dob
    emergencyName
    emergencyPhNo
    name
    phoneNo
  }
}`;
