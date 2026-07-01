import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import { PageLoader } from '@/components/ui/PageLoader'
import { PageTransition } from '@/components/ui/PageTransition'

// Lazy load pages — each becomes a separate chunk
// Dashboard loads immediately, Profile only when navigated to
const Dashboard = lazy(() =>
  import('./pages/Dashboard').then((m) => ({ default: m.Dashboard }))
)

const Profile = lazy(() =>
  import('./pages/Profile').then((m) => ({ default: m.Profile }))
)

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<PageLoader />}>
          <PageTransition>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/profile/:username" element={<Profile />} />
            </Routes>
          </PageTransition>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
