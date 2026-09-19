import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'

// Public layout + pages
import PublicLayout from './layouts/PublicLayout'
import Home from './pages/Home'
import Product from './pages/Product'
import HowItWorks from './pages/HowItWorks'
import WhoItsFor from './pages/WhoItsFor'
import WhyDifferent from './pages/WhyDifferent'
import Status from './pages/Status'
import Changelog from './pages/Changelog'
import Pilot from './pages/Pilot'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

// Portal layout + pages — lazy-loaded so the Firebase-heavy portal code is
// split into its own chunk and doesn't slow down the public marketing pages.
import RequireAuth from './components/RequireAuth'
const PortalLayout = lazy(() => import('./layouts/PortalLayout'))
const Login = lazy(() => import('./pages/portal/Login'))
const Dashboard = lazy(() => import('./pages/portal/Dashboard'))
const Roadmap = lazy(() => import('./pages/portal/Roadmap'))
const StageDetail = lazy(() => import('./pages/portal/StageDetail'))
const AddChangelogEntry = lazy(() => import('./pages/portal/AddChangelogEntry'))
const Requests = lazy(() => import('./pages/portal/Requests'))

function PortalFallback() {
  return (
    <div className="grid min-h-screen place-items-center bg-brand-950">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-brand-600 border-t-accent" />
    </div>
  )
}

export default function App() {
  return (
    <Suspense fallback={<PortalFallback />}>
      <ScrollToTop />
      <Routes>
        {/* Public site */}
        <Route element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="product" element={<Product />} />
          <Route path="how-it-works" element={<HowItWorks />} />
          <Route path="who-its-for" element={<WhoItsFor />} />
          <Route path="why-different" element={<WhyDifferent />} />
          <Route path="status" element={<Status />} />
          <Route path="changelog" element={<Changelog />} />
          <Route path="pilot" element={<Pilot />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />

          {/* Retired routes from the services-business site. Kept as redirects
              so existing links and search results do not land on a 404. */}
          <Route path="services" element={<Navigate to="/product" replace />} />
          <Route path="services/:slug" element={<Navigate to="/product" replace />} />
          <Route path="request" element={<Navigate to="/pilot" replace />} />
          <Route path="activity" element={<Navigate to="/changelog" replace />} />
        </Route>

        {/* Staff login (no portal chrome) */}
        <Route path="portal/login" element={<Login />} />

        {/* Private portal (auth-gated) */}
        <Route
          path="portal"
          element={
            <RequireAuth>
              <PortalLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="roadmap" element={<Roadmap />} />
          <Route path="roadmap/:slug" element={<StageDetail />} />
          <Route path="requests" element={<Requests />} />
          <Route path="changelog/new" element={<AddChangelogEntry />} />

          {/* Retired portal routes (repair job logs, the old activity form). */}
          <Route path="jobs" element={<Navigate to="/portal" replace />} />
          <Route path="activity/new" element={<Navigate to="/portal/changelog/new" replace />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}
