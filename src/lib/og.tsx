import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { business } from '@/config/business'
import { formatIndianPhone } from '@/lib/phone'

/**
 * Share images (REBUILD_PLAN §3.7): the preview WhatsApp, Facebook and X show
 * when a link is shared. One design for every page type — dark panel, the
 * page title, the one phone number — generated at build time.
 */
export const ogSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'

let logo: Promise<string> | undefined
const logoDataUrl = () =>
  (logo ??= readFile(join(process.cwd(), 'public', 'images', 'brand', 'logo.png')).then(
    (buf) => `data:image/png;base64,${buf.toString('base64')}`,
  ))

export async function ogImage({
  title,
  kicker,
  km,
}: {
  title: string
  /** Small line above the title, e.g. "Taxi service" or "Travel guide". */
  kicker: string
  /** Verified distance for route images (the milestone badge). */
  km?: number | null
}) {
  const src = await logoDataUrl()
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#0e0f11',
        color: '#f4f1ea',
        padding: '64px 72px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <div
          style={{
            display: 'flex',
            background: '#ffffff',
            borderRadius: 16,
            padding: '10px 18px',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
          <img src={src} alt="" width={184} height={88} />
        </div>
        <div style={{ display: 'flex', fontSize: 30, color: '#c8a96a' }}>{kicker}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 40 }}>
        <div
          style={{
            display: 'flex',
            flex: 1,
            fontSize: title.length > 40 ? 64 : 80,
            fontWeight: 800,
            lineHeight: 1.05,
          }}
        >
          {title}
        </div>
        {km != null && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: 170,
              borderRadius: '85px 85px 12px 12px',
              overflow: 'hidden',
              background: '#ffffff',
              color: '#1c1b1d',
            }}
          >
            <div style={{ display: 'flex', width: '100%', height: 70, background: '#ffd400' }} />
            <div style={{ display: 'flex', fontSize: 48, fontWeight: 800, padding: '14px 0' }}>
              {`${km} km`}
            </div>
          </div>
        )}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 30,
          borderTop: '4px solid #f45c0c',
          paddingTop: 24,
        }}
      >
        <div style={{ display: 'flex' }}>taxiverz.com</div>
        <div style={{ display: 'flex' }}>
          {`Call or WhatsApp ${formatIndianPhone(business.phone)}`}
        </div>
      </div>
    </div>,
    ogSize,
  )
}
