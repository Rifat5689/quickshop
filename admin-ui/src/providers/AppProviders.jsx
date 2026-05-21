import QueryProvider from './QueryProvider'
import ThemeProvider from './ThemeProvider'
import FontProvider from './FontProvider'
import ToastProvider from './ToastProvider'
import AuthProvider from './AuthProvider'
import NotificationProvider from './NotificationProvider'

const AppProviders = ({ children }) => {
  return (
    <QueryProvider>
      <ThemeProvider>
        <FontProvider>
          <ToastProvider>
            <AuthProvider>
              <NotificationProvider>{children}</NotificationProvider>
            </AuthProvider>
          </ToastProvider>
        </FontProvider>
      </ThemeProvider>
    </QueryProvider>
  )
}

export default AppProviders
