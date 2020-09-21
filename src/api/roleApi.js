import { get, put, post, deleteData } from '../utils/axios'

// 添加角色
export function addRole(reqData) {
  return post('/ent/role', reqData)
}
// 删除角色
export function deleteRole(id) {
  return deleteData(`/ent/role/${id}`)
}
// 更新角色
export function updateRole(reqData) {
  return put('/ent/role', reqData)
}
// 根据ID查询角色
export function selectRoleById(id) {
  return get(`/ent/role/${id}`)
}

// 根据APPID查询角色列表
export function selectRoleByAppId(appId) {
  return get(`/ent/role/list/application/${appId}`)
}

// 查询应用角色列表
export function selectApplicationRoleList(page, size, appId) {
  return post(`/ent/role/pages/application/${page}/${size}/${appId}`)
}

// 查询模板角色列表
export function selectTemplateRoleList(page, size, appId) {
  return post(`/ent/role/pages/template/${page}/${size}/${appId}`)
}
