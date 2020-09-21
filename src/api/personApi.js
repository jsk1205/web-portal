import { get, put, post, deleteData } from '../utils/axios'

// 添加人员
export function addPerson(reqData) {
  return post('/ent/person', reqData)
}
// 根据ID软删除人员
export function deletePersonSoft(id) {
  return deleteData(`/ent/person/mark/${id}`)
}
// 根据ID硬删除人员
export function deletePersonHard(id) {
  return deleteData(`/ent/person/${id}`)
}
// 人员更新
export function updatePerson(reqData) {
  return put('/ent/person', reqData)
}
// 分页查询人员
export function selectPerson(page, size, reqData) {
  return post(`/ent/person/page/${page}/${size}`, reqData)
}
// 根据ID查询人员
export function selectPersonById(id) {
  return get(`/ent/person/${id}`)
}
