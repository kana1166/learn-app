export interface User {
  firebaseId: string;
  email: string;
  name: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
}
