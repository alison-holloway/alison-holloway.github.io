// Browser entry point for SVG export - bundled by esbuild for use in Playwright
import { exportToSvg } from "@excalidraw/excalidraw";

window._exportSvg = async function (elements, appState, files) {
  const svg = await exportToSvg({
    elements,
    appState: {
      ...appState,
      exportBackground: true,
      exportWithDarkMode: false,
    },
    files: files || {},
    exportPadding: 20,
  });
  return svg.outerHTML;
};
window._exportReady = true;
