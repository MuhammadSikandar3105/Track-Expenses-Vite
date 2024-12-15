import './App.css'
import Adding from './components/Adding'
import { Provider } from './context/ItemsChanger'

function App() {

  return (
    <>
      <Provider>
        <Adding />
      </Provider>
    </>
  )
}

export default App
