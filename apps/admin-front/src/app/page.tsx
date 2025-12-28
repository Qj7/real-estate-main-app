export default function Home() {
  return (
    <main style={{ padding: '2rem' }}>
      <h1>Real Estate Admin Panel</h1>
      <p>Content management and analytics dashboard</p>
      <div style={{ marginTop: '2rem' }}>
        <p>API URL: {process.env.NEXT_PUBLIC_API_URL}</p>
      </div>
    </main>
  )
}

