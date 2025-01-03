import { SplashScreen, Stack } from "expo-router";
import "../global.css";
import UseFonts from "@/constants/fonts";
import { useEffect } from "react";
import GlobalContextProvider from "@/context/GloabalProvider";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = UseFonts();

  useEffect(() => {
    if (error) {
      throw new Error("fonts Not loaded");
    }
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <>
      <GlobalContextProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="search/[query]" />
        </Stack>
      </GlobalContextProvider>
    </>
  );
}
