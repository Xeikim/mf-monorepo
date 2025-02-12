import React from 'react'
import ReactDOM from 'react-dom/client'
import Button from './components/Button'

// Example page showing different types of buttons
function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Button Remote App</h1>
      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <Button text="Primary Button" type="primary" />
        <Button text="Secondary Button" type="secondary" />
        <Button text="Danger Button" type="danger" />
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
