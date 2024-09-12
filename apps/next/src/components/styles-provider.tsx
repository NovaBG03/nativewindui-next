'use client';

import { useEffect, useId } from 'react';
import { StyleSheet } from 'react-native';

import { useServerInsertedHTML } from 'next/navigation';

// Used to fix a bug with flickering styles on react-native components rendered on web
// Inserts generated styles server-side (with initialRules/resets)
// https://solito.dev/app-directory/overview#appstyles-providertsx
// https://github.com/necolas/react-native-web/discussions/2474#discussioncomment-6568959
export const StylesProvider = ({ children }: React.PropsWithChildren) => {
  const styleClassName = useId();

  // be careful when using this,
  // the generated server-side styles override the client-inserted ones
  // the problem is visible in react-native components with 'style' prop and style from StyleSheet.create()
  useServerInsertedHTML(() => {
    // @ts-expect-error workaround to load styles
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const sheet = StyleSheet.getSheet() as { id: number; textContent: string };
    return (
      <style
        dangerouslySetInnerHTML={{ __html: sheet.textContent }}
        // if id is set, the react-native-web will insert the same styles + new styles
        // in one of the server-generated style elements
        // id={sheet.id}
        className={styleClassName}
      />
    );
  });

  // used to fix the problem described above
  // by removing the server-generated style tags
  useEffect(() => {
    const elements = document.getElementsByClassName(styleClassName);
    Array.from(elements).forEach((e) => e.remove());
  }, [styleClassName]);

  return <>{children}</>;
};
