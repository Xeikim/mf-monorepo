import React from 'react'
import ReactDOM from 'react-dom/client'
import Card from './components/Card'

// Example page showing different styles of cards
function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Card Remote App</h1>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
        <Card 
          title="Basic Card" 
          extra={<a href="#">More</a>}
        >
          <p>Card content</p>
          <p>Card content</p>
        </Card>

        <Card 
          title="Card with Cover"
          cover="https://picsum.photos/300/200"
        >
          <p>This is an example card with a cover image</p>
        </Card>

        <Card style={{ width: '250px' }}>
          <p>Simple card without title</p>
        </Card>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
