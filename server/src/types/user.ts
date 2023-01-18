export interface User {
  email: string;
  password: string;
  pseudo: string;
}

export interface FirebaseUser {
  uid: string;
  email: string;
  emailVerified: boolean;
  password: string;
  displayName: string;
  disabled: boolean;
}

export interface UserRank {
  userRank: number;
  top: number;
  ranking: number;
}
