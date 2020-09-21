import { get, put, post } from '../utils/axios'

// 添加角色菜单关联
export function addRoleMenu(roleId, menuIds) {
  return post(`/ent/rolemenu/${roleId}/${menuIds}`)
}
// 更新角色菜单关联
export function updateRoleMenu(reqData) {
  return put('/ent/rolemenu', reqData)
}
// 根据ID查询角色菜单关联
export function selectRoleMenuById(id) {
  return get(`/ent/rolemenu/${id}`)
}
