import {server} from '../constants/conf/Server'

const loginService = `${server}/wsso/api/v1/auth/login`

const systemsService = `${server}/wsso/api/v1/systems`

export {
  loginService,
  systemsService
}