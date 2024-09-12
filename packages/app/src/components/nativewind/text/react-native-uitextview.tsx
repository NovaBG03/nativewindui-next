import { UITextView } from "react-native-uitextview";
import { cssInterop } from "nativewind";

cssInterop(UITextView, { className: "style" });

export { UITextView };
