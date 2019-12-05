export const omit = (obj: object, ...excludeProps: string[]) => {
  const result = { ...obj }
  excludeProps.forEach((prop) => {
    Reflect.deleteProperty(result, prop)
  })
  return result
}

export const omitInvaildProps = (props:any) => {
  let result:any= {}
  Object.keys(props).reduce((obj, key) => {
    if (props[key] !== undefined) {
      result[key] = props[key]
    }
    return obj
  }, result)
  return result as any
}

export const getCurrentHookValue = (setHookFunction:React.Dispatch<React.SetStateAction<any>>) => {
  return new Promise((resolve) => {
    setHookFunction((prev:any) => {
      resolve(prev)
      return prev
    })
  })
}