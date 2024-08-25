import { createInertiaApp } from "@inertiajs/inertia-react";
import { createRoot } from "react-dom/client";
import React from "react";

createInertiaApp({
    resolve: (name) => {
        // Remove any leading 'Pages/' prefix from the name
        const componentName = name.replace(/^Pages\//, "");
        return import(`./Pages/${componentName}.tsx`);
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
});
