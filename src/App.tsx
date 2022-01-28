import { Route, Routes } from "react-router-dom";
import "./assets/scss/App.scss";
import { createRef, lazy, Suspense } from "react";
import { SnackbarProvider } from "notistack";

// Importing Material Ui Components
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Grow from "@mui/material/Grow";

// Importing Components
import Loading from "./shared/Loading";

// Importing Layouts
import AuthLayout from "./core/layouts/AuthLayout";
import ChatLayout from "./core/layouts/ChatLayout";

// Auth Pages
const AuthSignin = lazy(() => import("./features/auth/pages/Signin"));
const AuthSignup = lazy(() => import("./features/auth/pages/Signup"));
const AuthReset = lazy(() => import("./features/auth/pages/PasswordForget"));

// Chat Pages
const ChatIndex = lazy(() => import("./features/chat/pages/Chat"));
const ChatChatting = lazy(() => import("./features/chat/pages/Chatting"));

function App() {
  const toastRef = createRef<any>();

  const closeToast = (key: any) => () => {
    toastRef.current.closeSnackbar(key);
  };
  return (
    <div className="App">
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/"
          element={
            <Suspense fallback={<Loading />}>
              <SnackbarProvider
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                ref={toastRef}
                TransitionComponent={Grow}
                preventDuplicate
                autoHideDuration={4000}
                action={(key: any) => (
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={closeToast(key)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              >
                <AuthLayout />
              </SnackbarProvider>
            </Suspense>
          }
        >
          <Route index element={<AuthSignin />} />
          <Route path="auth/signup" element={<AuthSignup />} />
          <Route path="auth/reset" element={<AuthReset />} />
        </Route>

        {/* Chat Routes */}
        <Route
          path="chat"
          element={
            <Suspense fallback={<Loading />}>
              <SnackbarProvider
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                ref={toastRef}
                TransitionComponent={Grow}
                preventDuplicate
                autoHideDuration={4000}
                action={(key: any) => (
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={closeToast(key)}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              >
                <ChatLayout />
              </SnackbarProvider>
            </Suspense>
          }
        >
          <Route index element={<ChatIndex />} />
          <Route path="send/:user_id" element={<ChatChatting />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
