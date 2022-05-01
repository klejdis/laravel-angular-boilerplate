export interface User{
  id: number,
  first_name: string,
  last_name: string
  password: string
  roles: Array<any>
  permissions: Array<any>
  is_activated: boolean

}
