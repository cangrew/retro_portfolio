export async function register() {
  // Next.js 15.3.x + Turbopack passes --localstorage-file to worker processes
  // for dev overlay persistence. If the path is invalid it leaves localStorage
  // defined but broken (getItem is not a function), crashing SSR.
  if (typeof localStorage === 'undefined' || typeof localStorage.getItem !== 'function') {
    const noop = () => null
    ;(global as unknown as Record<string, unknown>).localStorage = {
      getItem: noop,
      setItem: () => {},
      removeItem: () => {},
      clear: () => {},
      key: noop,
      length: 0,
    }
  }
}
