import { get, post, deleteData } from '../utils/axios'

//法院执行状态
export function getExecuteStatus() {
    return get(`/ent/sysvar/exestatus`)
}

// 核查状态
export function getCheckStatus() {
    return get(`/ent/sysvar/checkstatus`)
}

// 删除
export function deleteExecute(id) {
    return deleteData(`/ent/exetran/${id}`)
}

// 分页查询执行交易数据
export function selectExecuteDatas(page, size, reqData) {
    return post(`/ent/exetran/pages/trans/${page}/${size}`, reqData)
}

// 导出交易数据
export function getExecuteDatas(reqData) {
    return post(`/ent/exetran/export`, reqData)
}




