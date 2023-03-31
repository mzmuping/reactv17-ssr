import express from "express";
import path from "path";

import React from "react";
import serialize from "serialize-javascript";
import { renderToString } from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import Helmet from "react-helmet";
import routes from "./routes";
import Layout from "./components/Layout";
import createStore, { initializeSession } from "./store";

const app = express();
console.log("process.env.NODE_ENV===", process.env.APP_URL);

app.use(express.static(path.resolve(__dirname, "../dist")));

app.get("/*", (req, res) => {
  const context = {};
  const store = createStore();

  store.dispatch(initializeSession());

  const dataRequirements = routes
    .filter((route) => matchPath(req.url, route)) // filter matching paths
    .map((route) => route.component) // map to components
    .filter((comp) => comp.serverFetch) // check if components have data requirement
    .map((comp) => store.dispatch(comp.serverFetch())); // dispatch data requirement

  Promise.all(dataRequirements).then(() => {
    const jsx = (
      <ReduxProvider store={store}>
        <StaticRouter context={context} location={req.url}>
          <Layout />
        </StaticRouter>
      </ReduxProvider>
    );
    const reactDom = renderToString(jsx);
    const reduxState = store.getState();
    const helmetData = Helmet.renderStatic();

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(htmlTemplate(reactDom, reduxState, helmetData));
  });
});
const port = process.env.PORT || 2048;
app.listen(port, () => {
  console.log("http://localhost:" + port);
});

function htmlTemplate(reactDom, reduxState, helmetData) {
  return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            ${helmetData.title.toString()}
            ${helmetData.meta.toString()}
            <title>React SSR</title>
            <link rel="stylesheet" type="text/css" href="./styles.css" />
        </head>
        
        <body>
            <div id="app">${reactDom}</div>
            <script>
                window.REDUX_DATA = ${serialize(reduxState, { isJSON: true })}
            </script>
            <script>
              function changesize() {
                console.log('changesize=====')
                let designsize = 192;
                let html = document.documentElement;
                let clientw = html.clientWidth;
                let htmlRem = clientw / designsize;
                html.style.fontSize = htmlRem + "px";
                document.body.style.fontSize = htmlRem + "px";
              }
             // setTimeout(() => {changesize()}, 0);
              //window.addEventListener("load", changesize);
              //window.addEventListener("resize", changesize);
            </script>
            <script src="./app.bundle.js"></script>
        </body>
        </html>
    `;
}
