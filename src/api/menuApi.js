import { get, put, post, deleteData } from '../utils/axios'

// 添加菜单
export function addMenu(reqData) {
  return post('/ent/menu', reqData)
}
// 删除菜单
export function deleteMenu(id) {
  return deleteData(`/ent/menu/${id}`)
}

// 强制删除菜单
export function deleteAffirmMenu(id) {
  return deleteData(`/ent/menu/menuandch/${id}`)
}
// 更新菜单
export function updateMenu(reqData) {
  return put('/ent/menu', reqData)
}
// 根据ID查询菜单
export function selectMenuById(id) {
  return get(`/ent/menu/${id}`)
}

// 查询菜单列表
export function selectMenuList(reqData) {
  return post('/ent/menu/list', reqData)
}
