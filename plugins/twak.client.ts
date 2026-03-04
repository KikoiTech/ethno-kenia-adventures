export default defineNuxtPlugin(() => {
  if (process.client) {
    const script = document.createElement('script')

    script.src = 'https://embed.tawk.to/699d73ffd737701c38a648ce/default'
    script.async = true
    script.charset = 'UTF-8'
    script.setAttribute('crossorigin', '*')

    document.head.appendChild(script)
  }
})