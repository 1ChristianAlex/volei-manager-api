class UserModel {
  constructor(public name: string, public email: string) {}
}

class AuthTokenModel {
  constructor(public user: UserModel, public token: string) {}
}

export { UserModel, AuthTokenModel };
