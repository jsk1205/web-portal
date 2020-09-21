import { get, post, deleteData } from '../utils/axios'

//公证执行状态
export function getNotaryStatus() {
  return get(`/ent/sysvar/notarizationstatus`)
}

// 删除
export function deleteTran(id) {
  return deleteData(`/ent/tran/${id}`)
}

// 根据ID查询
export function selectTranById(id) {
  return get(`/ent/tran/${id}`)
}

// 根据ID查询日志
export function selectLogById(transId) {
  return post(`/ent/tran/logs/${transId}`)
}
// 分页查询
export function selectTran(page, size,reqData) {
  return post(`/ent/tran/pages/trans/${page}/${size}`,reqData)
}
// 导出数据
export function getTran(reqData) {
  return post(`/ent/tran/export`,reqData)
}