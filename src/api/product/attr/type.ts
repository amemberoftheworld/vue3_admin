import { ResponseData } from './../../common'

export interface CategoryObj {
  id: number | string
  name: string
  category1Id?: number
  category2Id?: number
}

export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[]
}

export interface AttrValue {
  id: number
  valueName: string
  attrId: number
}

export type AttrValueList = AttrValue[]

export interface Attr {
  id: number
  attrName: string
  categoryId: number
  categoryLevel: number
  attrValueList: AttrValueList
}

export type AttrList = Attr[]

export interface AttrResponseData extends ResponseData {
  data: Attr[]
}
