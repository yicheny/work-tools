import { createProxyMiddleware, RequestHandler} from "http-proxy-middleware";

export default function setupProxy(app: { use: (arg0: string, arg1: RequestHandler) => void; }) {
    app.use(
        "/api",
        createProxyMiddleware({
            target: 'http://127.0.0.1:8011',
            changeOrigin: true,
            pathRewrite : {
                "/api": "/",
            }
            // ws: true,
        })
    );
};
