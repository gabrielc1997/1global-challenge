import { useEffect } from "react";
import { CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@/store";
import { loginSuccess } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { getTheme } from "@/theme";
import { ThemeProviderCustom, useThemeMode } from "@/context/ThemeContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function InnerApp({ Component, pageProps }: AppProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      dispatch(loginSuccess(JSON.parse(user)));
    }
  }, [dispatch]);

  return <Component {...pageProps} />;
}

function AppWithTheme(props: AppProps) {
  const { mode } = useThemeMode();
  const theme = getTheme(mode);

  return (
    <MuiThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <InnerApp {...props} />
        </QueryClientProvider>
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
}

export default function MyApp(props: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProviderCustom>
        <AppWithTheme {...props} />
      </ThemeProviderCustom>
    </Provider>
  );
}
