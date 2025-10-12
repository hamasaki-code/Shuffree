"use client"

import { DefaultSeo } from "next-seo"

import { siteConfig } from "@/config/site"

export function SeoDefaults() {
  return (
    <DefaultSeo
      titleTemplate={`%s｜${siteConfig.name}`}
      defaultTitle={`${siteConfig.name}｜${siteConfig.shortDescription}`}
      description={siteConfig.description}
      canonical={siteConfig.url}
      openGraph={{
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        type: "website",
        locale: siteConfig.locale,
        siteName: siteConfig.name,
      }}
      twitter={{
        handle: siteConfig.twitter,
        site: siteConfig.twitter,
        cardType: "summary_large_image",
      }}
    />
  )
}
