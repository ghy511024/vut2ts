/**
 * create by ghy 2022/9/1 11:16
 * @desc
 */
export class House {
    _trackURL: string
    adText: string
    address: string
    anXuan: boolean
    biz: number
    cate: string
    clickLog: string
    houseId: number
    logr: string
    mianJi: string
    picUrl: string
    priceVO: {
        num: string
        totalPrice: string
        totalPriceUnit: string
        transferPrice: string
        unit: string
        unitPrice: string
        unitPriceUnit: string
    }
    quYu: string
    quanJing: boolean
    rental: string
    shangQuan: string
    shiKan: boolean
    shiPai: boolean
    shiPin: boolean
    tagsV2: { borderColor: string, textColor: string, title: string, bgColor?: string }[]
    title: string
    type: string
    url: string
}