import * as React from "react";
import { SearchBarProps } from "react-native-screens";

export function useHeaderSearchBar(props: SearchBarProps = {}) {
  const [search, setSearch] = React.useState("");
  return search;
}
