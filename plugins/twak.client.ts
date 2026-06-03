export default defineNuxtPlugin(() => {
  const router = useRouter()

  const HIDDEN_ROUTES = ['/contact-us']
  const HIDDEN_PREFIXES = ['/admin']

  function shouldHide(path: string) {
    return (
      HIDDEN_ROUTES.includes(path) ||
      HIDDEN_PREFIXES.some(prefix => path.startsWith(prefix))
    )
  }

  function applyVisibility(path: string) {
    const api = (window as any).Tawk_API
    if (!api || typeof api.hideWidget !== 'function' || typeof api.showWidget !== 'function') return
    shouldHide(path) ? api.hideWidget() : api.showWidget()
  }

  // Must be set before the script loads so Tawk picks it up
  ;(window as any).Tawk_API = (window as any).Tawk_API || {}
  ;(window as any).Tawk_API.onLoad = () => {
    applyVisibility(router.currentRoute.value.path)
  }

  const script = document.createElement('script')
  script.src = 'https://embed.tawk.to/699d73ffd737701c38a648ce/default'
  script.async = true
  script.charset = 'UTF-8'
  script.setAttribute('crossorigin', '*')
  document.head.appendChild(script)

  router.afterEach(to => applyVisibility(to.path))
})
