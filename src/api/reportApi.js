import { get } from "../utils/axios";

// 客户统计
export function getCustomerStatistics(reqData) {
    return get(`/ent/report/customer`, reqData);
}

// 公证/执行人数统计
export function getPeopleCounting(reqData) {
    return get(`/ent/report/population`, reqData);
}

// 放贷额度统计
export function getLendingStatistics(reqData) {
    return get(`/ent/report/quota`, reqData);
}

// 机构数据集
export function getOrgList() {
    return get(`/ent/report/apps`);
}