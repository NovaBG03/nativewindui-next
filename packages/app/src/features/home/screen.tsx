import * as React from "react";
import { Linking, Platform, useWindowDimensions, View } from "react-native";
import { Text } from "../../components/nativewind/text";
import { FlashList } from "@shopify/flash-list";
import { useHeaderHeight } from "@react-navigation/elements";
import { useColorScheme } from "../../lib/use-color-scheme";
import { Icon } from "@roninoss/icons";
import { useSafeArea } from "../../lib/use-safe-area";
import { useHeaderSearchBar } from "../../lib/use-header-search-bar";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/nativewind/avatar";
import { DatePicker } from "../../components/nativewind/date-picker";
import { ThemeToggle } from "../../components/theme-toggle";

export const HomeScreen = () => {
  const searchValue = useHeaderSearchBar({
    hideWhenScrolling: COMPONENTS.length === 0,
  });

  const data = searchValue
    ? COMPONENTS.filter((c) =>
        c.name.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : COMPONENTS;

  return (
    <FlashList
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      data={data}
      estimatedItemSize={200}
      contentContainerClassName="py-4 android:pb-12"
      extraData={searchValue}
      removeClippedSubviews={false} // used for selecting text on android
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={renderItemSeparator}
      renderItem={renderItem}
      ListEmptyComponent={
        COMPONENTS.length === 0 ? ListEmptyComponent : undefined
      }
    />
  );
};

function ListEmptyComponent() {
  const insets = useSafeArea();
  const dimensions = useWindowDimensions();
  const headerHeight = Platform.OS === "web" ? 0 : useHeaderHeight();
  const { colors } = useColorScheme();
  const height = dimensions.height - headerHeight - insets.bottom - insets.top;

  return (
    <View
      style={{ height }}
      className="flex-1 items-center justify-center gap-1 px-12 web:min-h-svh"
    >
      <Icon name="file-plus-outline" size={42} color={colors.grey} />
      <Text variant="title3" className="pb-1 text-center font-semibold">
        No Components Installed
      </Text>
      <Text color="tertiary" variant="subhead" className="pb-4 text-center">
        You can install any of the free components from the{" "}
        <Text
          onPress={() => Linking.openURL("https://nativewindui.com")}
          variant="subhead"
          className="text-primary"
        >
          NativeWindUI
        </Text>
        {" website."}
      </Text>
    </View>
  );
}

type ComponentItem = { name: string; component: React.FC };

function keyExtractor(item: ComponentItem) {
  return item.name;
}

function renderItemSeparator() {
  return <View className="p-2" />;
}

function renderItem({ item }: { item: ComponentItem }) {
  return (
    <Card title={item.name}>
      <item.component />
    </Card>
  );
}

function Card({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <View className="px-4">
      <View className="gap-4 rounded-xl border border-border bg-card p-4 pb-6 shadow-sm shadow-black/10 dark:shadow-none">
        <Text className="text-center text-sm font-medium tracking-wider opacity-60">
          {title}
        </Text>
        {children}
      </View>
    </View>
  );
}

const TWITTER_AVATAR_URI =
  "https://pbs.twimg.com/profile_images/1782428433898708992/1voyv4_A_400x400.jpg";

const COMPONENTS: ComponentItem[] = [
  {
    name: "Text",
    component: function TextExample() {
      return (
        <View className="gap-2">
          <Text variant="largeTitle" className="text-center">
            Large Title
          </Text>
          <Text variant="title1" className="text-center">
            Title 1
          </Text>
          <Text variant="title2" className="text-center">
            Title 2
          </Text>
          <Text variant="title3" className="text-center">
            Title 3
          </Text>
          <Text variant="heading" className="text-center">
            Heading
          </Text>
          <Text variant="body" className="text-center">
            Body
          </Text>
          <Text variant="callout" className="text-center">
            Callout
          </Text>
          <Text variant="subhead" className="text-center">
            Subhead
          </Text>
          <Text variant="footnote" className="text-center">
            Footnote
          </Text>
          <Text variant="caption1" className="text-center">
            Caption 1
          </Text>
          <Text variant="caption2" className="text-center">
            Caption 2
          </Text>
        </View>
      );
    },
  },
  {
    name: "Selectable Text",
    component: function SelectableTextExample() {
      return (
        <Text uiTextView selectable>
          Long press or double press this text
        </Text>
      );
    },
  },
  {
    name: "Avatar",
    component: function AvatarExample() {
      return (
        <View className="items-center">
          <Avatar alt="NativeWindUI Avatar">
            <AvatarImage source={{ uri: TWITTER_AVATAR_URI }} />
            <AvatarFallback>
              <Text className="text-white">NUI</Text>
            </AvatarFallback>
          </Avatar>
        </View>
      );
    },
  },
  {
    name: "Theme toggle",
    component: function ThemeToggleExample() {
      return (
        <View className="items-center">
          <ThemeToggle />
        </View>
      );
    },
  },
  {
    name: "Date Picker",
    component: function DatePickerExample() {
      const [date, setDate] = React.useState(new Date());
      return (
        <View className="items-center">
          <DatePicker
            value={date}
            mode="datetime"
            onChange={(ev) => {
              setDate(new Date(ev.nativeEvent.timestamp));
            }}
          />
        </View>
      );
    },
  },
];
