import { get, put, post, deleteData } from '../utils/axios'

// 添加岗位
export function addPosition(reqData) {
  return post('/ent/position', reqData)
}
// 根据ID软删除岗位
export function deletePositionSoft(id) {
  return deleteData(`/ent/position/mark/${id}`)
}
// 根据ID硬删除岗位
export function deletePositionHard(id) {
  return deleteData(`/ent/position/${id}`)
}
// 岗位更新
export function updatePosition(reqData) {
  return put('/ent/position', reqData)
}
// 分页查询岗位
export function selectPosition(page, size, reqData) {
  return post(`/ent/position/page/${page}/${size}`, reqData)
}
// 根据ID查询岗位
export function selectPositionById(id) {
  return get(`/ent/position/${id}`)
}
