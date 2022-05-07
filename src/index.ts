/*
 * @Author: losting
 * @Date: 2022-04-01 16:05:12
 * @LastEditTime: 2022-04-01 18:20:32
 * @LastEditors: losting
 * @Description: 
 * @FilePath: \rollup-template\src\index.ts
 */
type Avatar = {
  mini?: string
  small?: string
  medium?: string
  large?: string
}
type Person = {
  name: string
  age?: number
  sex?: number
  email: string
  avatar: Avatar
}

export const getPerson = (id: string): Person|undefined => {
  if (id === 'losting') {
    return
  }
  return {
    name: '123',
    age: 18,
    sex: 1,
    email: '123',
    avatar: {
      mini: 'https://avatar.png',
      small: 'https://avatar.png',
      medium: 'https://avatar.png',
      large: 'https://avatar.png',
    },
  }
}

export const fibonaci = (i: number): number => {
  if (i === 0) {
    return 0
  }
  if (i === 1) {
    return 1
  }
  return fibonaci[i - 1] + fibonaci[i - 2]
}

// (function() {
//   const root: any = document.querySelector("#root")
//   const inner = getPerson('ee')
//   root.innerHTML = `姓名：${inner?.name},年龄：${inner?.age}岁...`
// }())



export default fibonaci
