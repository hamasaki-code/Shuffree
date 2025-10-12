'use client'

import { LinkIcon, Share2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

interface ShareButtonsProps {
  title: string
  text: string
}

export function ShareButtons({ title, text }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const [shareUrl, setShareUrl] = useState('')

  useEffect(() => {
    setShareUrl(window.location.href)
  }, [])

  const handleCopy = async () => {
    if (typeof navigator === 'undefined' || !navigator.clipboard || shareUrl.length === 0) {
      return
    }

    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('URLコピーに失敗しました', error)
    }
  }

  const tweetHref = useMemo(() => {
    const payload = `${title}｜${text}\n${shareUrl}`
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(payload)}`
  }, [shareUrl, text, title])

  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={handleCopy}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-slate-700"
      >
        <LinkIcon size={16} /> {copied ? 'コピーしました！' : '結果URLをコピー'}
      </button>
      <a
        href={tweetHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-100"
      >
        <Share2 size={16} /> X / Twitterでシェア
      </a>
    </div>
  )
}
