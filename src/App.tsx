import largImgLight from "./assets/images/bg-desktop-light.jpg"
import largImgDark from "./assets/images/bg-desktop-dark.jpg"
import Layout from "./components/Layout"
import { useTheme } from "./components/theme-provider"


const App = () => {
  const { theme } = useTheme()
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
    >

      <div
        className="bg-cover bg-center w-full h-1/2"
        style={{ backgroundImage: `url(${theme === "light" ? largImgLight : largImgDark})` }}
      >

      </div>
      <Layout />
      <div className="absolute dark:bg-very-dark-blue -z-10 h-full w-full"></div>
    </div>
  )
}

export default App