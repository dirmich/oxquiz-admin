
function access(storage) {
  return {
    get:(key)=>{
      return storage.getItem(key)
    },
    set:(key,val)=>{
        storage.setItem(key,val)
    },
    getObj:(key)=>{
      const v = storage.getItem(key)
      return (v)?JSON.parse(v):null
    },
    setObj:(key,val)=>{
        storage.setItem(key,JSON.stringify(val))
    },
    reset:(key)=>{
      storage.removeItem(key)
    }
  }
}
export const local=access(window.localStorage)
export const session=access(window.sessionStorage)