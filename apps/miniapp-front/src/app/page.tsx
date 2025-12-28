export default function Home() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Real Estate Mini App</h1>
      <p>Telegram Mini App for 360° property tours</p>
      <div style={{ marginTop: '2rem' }}>
        <p>API URL: {process.env.NEXT_PUBLIC_API_URL}</p>
        <p>Events API URL: {process.env.NEXT_PUBLIC_EVENTS_API_URL}</p>
      </div>
    </main>
  )
}

