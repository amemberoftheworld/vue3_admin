// 本地读写数据
export const SET_TOKEN = (token: string) => {
  return localStorage.setItem('TOKEN', token)
}

export const GET_TOKEN = () => {
  return localStorage.getItem('TOKEN')
}

export const REMOVE_TOKEN = () => {
  return localStorage.removeItem('TOKEN')
}
