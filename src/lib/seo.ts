import { siteConfig } from "@/config/site"

export function createOgImageUrl(params: { title: string; subtitle?: string; mode?: string }) {
  const url = new URL("/api/og", siteConfig.url)
  url.searchParams.set("title", params.title)
  if (params.subtitle) {
    url.searchParams.set("subtitle", params.subtitle)
  }
  if (params.mode) {
    url.searchParams.set("mode", params.mode)
  }
  return url.toString()
}
