import AppRoute from './routes/AppRoute'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DesktopNotice from './components/guest/DeskTopNotice'

function App() {
  return (
    <>
      <DesktopNotice />
      <ToastContainer />
      <AppRoute />
    </>
  )
}

export default App
