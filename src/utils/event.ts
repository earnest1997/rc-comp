export class EventEmitter {
  private eventMap: Map<string, Function> = new Map()
  on(name: string, func: Function) {
    this.eventMap.set(name, func)
  }
  un(name: string) {
    this.eventMap.delete(name)
  }
  clear() {
    this.eventMap.clear()
  }
  emit(name: string, ...data: any[]) {
    const func = this.eventMap.get(name)
    func && func.call(undefined, ...data)
  }
}
