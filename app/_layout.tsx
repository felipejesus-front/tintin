import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

// importing tailwind css and fonts
import "../global.css"
import { 
	useFonts as useGoogleFonts, 
	Inter_400Regular, 
	Inter_500Medium,
} from '@expo-google-fonts/inter';


export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
	// Ensure that reloading on `/modal` keeps a back button present.
	initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

	// Carregando as fontes: Inter via expo-google-fonts, SpaceMono e FontAwesome
	const [googleFontsLoaded, error] = useGoogleFonts({
		Inter_400Regular,
		Inter_500Medium,
	});
	
	// const [customFontsLoaded, error] = useFonts({
	// 	SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
	// 	...FontAwesome.font,
	// });

	const loaded = googleFontsLoaded;


	// Expo Router uses Error Boundaries to catch errors in the navigation tree.
	useEffect(() => {
		if (error) throw error;
	}, [error]);

	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
		}
	}, [loaded]);

	if (!loaded) {
	 	return null;
	}

	return <RootLayoutNav />;
}

function RootLayoutNav() {
	const colorScheme = useColorScheme();

	return (
		<ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen name="NewsList" options={{ headerTitle: "TINTIN"}} />
				<Stack.Screen name="Login" options={{ headerShown: false }} />
			</Stack>
		</ThemeProvider>
	);
}


