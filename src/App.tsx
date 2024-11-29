import { Route, Routes } from "react-router-dom"
import { Header } from "./components/Header"
import { Hero } from "./pages/Hero"
import { Signin } from "./pages/Signin"
import { Signup } from "./pages/Signup"
import { Footer } from "./components/Footer"
import { NotFound } from "./pages/404/NotFound"
import { DashboardLayout } from "./dashboard/DashboardLayout"
import { Links } from "./components/Links"
import UserProfileUpdate from "./components/ProfileData"

const App = () => {
  return (
    <main
      className="grid max-w-screen min-h-dvh"
      style={{ gridTemplateRows: "auto 1fr auto" }}
    >
      <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] text-black dark:text-neutral-100 dark:bg-neutral-950 transition-all ease-in-out duration-150"></div>
      <Header />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Hero />} />
        <Route path="signin" element={<Signin />} />
        <Route path="signup" element={<Signup />} />

        {/* Protected routes with shared layout */}
        <Route>
          <Route path="dashboard" element={<DashboardLayout />}>
            <Route index element={<Links />} />
            <Route path="settings" element={<UserProfileUpdate />} />
          </Route>
        </Route>

        {/* Not found pages */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </main>
  )
}

export default App
