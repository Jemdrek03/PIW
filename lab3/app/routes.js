import * as React from "react";

export default [
    {
        path: "/",
        file: "./routes/index.jsx",
        element: React.createElement(React.lazy(() => import("./routes/index.jsx")))
    },
    {
        path: "/new",
        file: "./routes/new.jsx",
        element: React.createElement(React.lazy(() => import("./routes/new.jsx")))
    }
];
