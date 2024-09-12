import '~/global.css';

import { Link, Stack } from 'expo-router';
import { NAV_THEME } from '@acme/app/theme';
import { ThemeProvider as NavThemeProvider } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@acme/app/lib/use-color-scheme';
import { useInitialAndroidBarSync } from '@acme/app/lib/use-initial-android-bar-sync.ts';
import { Pressable, View } from 'react-native';
import { cn } from '@acme/app/lib/cn';
import { Icon } from '@roninoss/icons';
import { ThemeToggle } from '@acme/app/components/theme-toggle';

// Catch any errors thrown by the Layout component.
export { ErrorBoundary } from 'expo-router';

export default function RootLayout() {
  useInitialAndroidBarSync();
  const { colorScheme, isDarkColorScheme } = useColorScheme();

  return (
    <>
      <StatusBar
        key={`root-status-bar-${isDarkColorScheme ? 'light' : 'dark'}`}
        style={isDarkColorScheme ? 'light' : 'dark'}
      />
      <NavThemeProvider value={NAV_THEME[colorScheme]}>
        <Stack screenOptions={SCREEN_OPTIONS}>
          <Stack.Screen name="index" options={INDEX_OPTIONS} />
          <Stack.Screen name="modal" options={MODAL_OPTIONS} />
        </Stack>
      </NavThemeProvider>
    </>
  );
}

const SCREEN_OPTIONS = {
  animation: 'ios', // for android
} as const;

const INDEX_OPTIONS = {
  headerLargeTitle: true,
  title: 'NativeWindUI',
  headerRight: () => <SettingsIcon />,
} as const;

function SettingsIcon() {
  const { colors } = useColorScheme();
  return (
    <Link href="/modal" asChild>
      <Pressable className="opacity-80">
        {({ pressed }) => (
          <View className={cn(pressed ? 'opacity-50' : 'opacity-90')}>
            <Icon name="cog-outline" color={colors.foreground} />
          </View>
        )}
      </Pressable>
    </Link>
  );
}

const MODAL_OPTIONS = {
  presentation: 'modal',
  animation: 'fade_from_bottom', // for android
  title: 'Settings',
  headerRight: () => <ThemeToggle />,
} as const;
