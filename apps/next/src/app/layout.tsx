// `jsxImportSource` comment must be used in every server component page/layout to prevent
// `Error: (0 , react__WEBPACK_IMPORTED_MODULE_0__.createContext) is not a function`
/** @jsxImportSource react */
import "~/globals.css";

import type { Metadata } from "next";
import { StylesProvider } from "~/components/styles-provider";

export const metadata: Metadata = {
  title: "NativeWindUI Next App",
  description: "",
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <body>
        <StylesProvider>
          <div id="__root">{children}</div>
        </StylesProvider>
      </body>
    </html>
  );
}
