import Navbar from "../pages/Navbar"
import Footer from "./Footer"
export default function Layout({ children }) {
  return (
    <div>
      <Navbar /> {children} <Footer />
    </div>
  )
}
