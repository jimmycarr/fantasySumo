import React from "react";
import { render } from "react-dom";
import WebFont from "webfontloader";
import App from "./components/App";

WebFont.load({
  google: {
    families: ["Titillium Web:300,400,700", "sans-serif"]
  }
});

render(<App />, document.getElementById("root"));
