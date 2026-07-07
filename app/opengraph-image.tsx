import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'OOS SHOP'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
 return new ImageResponse(
 (
 <div
 style={{
 width: '100%',
 height: '100%',
 display: 'flex',
 flexDirection: 'column',
 alignItems: 'center',
 justifyContent: 'center',
 background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #5B5CEB 100%)',
 }}
 >
 <div style={{ color: 'white', fontSize: 40, fontWeight: 700 }}>OOS SHOP</div>
 <div style={{ color: 'white', fontSize: 52, fontWeight: 700, textAlign: 'center', maxWidth: 900, marginTop: 24 }}>
 Jasa Instal Plugin WordPress Premium Original and Bergaransi
 </div>
 <div style={{ color: '#c7c9ff', fontSize: 28, marginTop: 24 }}>500+ Plugin - Instal Cepat - Bergaransi</div>
 </div>
 ),
 { ...size },
 )
}
