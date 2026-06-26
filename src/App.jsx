import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'

// Public layout + pages
import PublicLayout from './layouts/PublicLayout'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import ActivityLog from './pages/ActivityLog'
import RequestService from './pages/RequestService'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'

// Portal layout + pages — lazy-loaded so the Firebase-heavy portal code is
// split into its own chunk and doesn't slow down the public marketing pages.
import RequireAuth from './components/RequireAuth'
const PortalLayout = lazy(() => import('./layouts/PortalLayout'))
const Login = lazy(() => import('./pages/portal/Login'))
const Dashboard = lazy(() => import('./pages/portal/Dashboard'))
const Roadmap = lazy(() => import('./pages/portal/Roadmap'))
const PhaseDetail = lazy(() => import('./pages/portal/PhaseDetail'))
const JobLogs = lazy(() => import('./pages/portal/JobLogs'))
const AddActivity = lazy(() => import('./pages/portal/AddActivity'))
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
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="services/:slug" element={<ServiceDetail />} />
          <Route path="activity" element={<ActivityLog />} />
          <Route path="request" element={<RequestService />} />
          <Route path="contact" element={<Contact />} />
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
          <Route path="roadmap/:slug" element={<PhaseDetail />} />
          <Route path="jobs" element={<JobLogs />} />
          <Route path="requests" element={<Requests />} />
          <Route path="activity/new" element={<AddActivity />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}
