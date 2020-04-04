import {Roles} from "./roles";

export interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  description?: string;
  roles?: Roles;
}
