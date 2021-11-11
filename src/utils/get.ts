// simplified version of this :
// https://github.com/react-hook-form/react-hook-form/blob/master/src/utils/get.ts

const compact = (value: any[]) => value.filter(Boolean)

const get = <T>(obj: T, path: string, defaultValue?: unknown) => {
  if (obj && path) {
    const result = compact(path.split(/[,[\].]+?/)).reduce(
      (result, key) => (result == null ? result : result[key]),
      obj,
    )
    if (result === undefined || result === obj) {
      return obj[path as keyof T] === undefined ? defaultValue : obj[path as keyof T]
    }
    return result
  }
  return undefined
}

export default get
