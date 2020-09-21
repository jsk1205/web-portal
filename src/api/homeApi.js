import { get } from '../utils/axios'

//首页数据统计
export function getTran(appId, type, date) {
    return get(`/ent/report/index/${appId}/${type}/${date}`)
}