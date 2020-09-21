import { get, put, post, deleteData } from '../utils/axios'

// 用户注册
export function registerUser(reqData) {
  return post('/ent/enrollment/user/ordinary/register', reqData)
}

// 用户登录
export function login(reqData) {
  return post('/ent/login/admin', reqData)
}

// 域管理添加用户
export function addDomainUser(reqData) {
  return post('/ent/user/domain', reqData)
}
// 平台管理添加用户
export function addPlatformUser(reqData) {
  return post('/ent/user/platform', reqData)
}
// 根据ID删除用户
export function deleteUserById(id) {
  return deleteData(`/ent/user/${id}`)
}
// 用户更新
export function updateUserById(reqData) {
  return put('/ent/user', reqData)
}
// 分页查询用户
export function selectDomainUser(page, size) {
  return post(`/ent/user/pages/domain/${page}/${size}`, {})
}
// 分页查询用户
export function selectPlatformUser(page, size) {
  return post(`/ent/user/pages/platform/${page}/${size}`, {})
}
// 根据ID查询用户
export function selectUserById(id) {
  return get(`/ent/user/${id}`)
}

// 根据APPID查询用户
export function selectUserByAppId(appId) {
  return get(`/ent/user/list/${appId}`)
}
// 根据关键字查询用户
export function selectUserByKeyWords(page, size, keywords) {
  return get(`/ent/user/pages/keywords/${page}/${size}/${keywords}`)
}

