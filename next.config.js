/** @type {import("next").NextConfig} */

const path = require("path");

// const ESLintPlugin = require("eslint-webpack-plugin");
const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development"
});

const nextConfig = {
    output: "export",
    distDir: "dist",
    typescript: {
        ignoreBuildErrors: true
    },
    reactStrictMode: false,
    swcMinify: true,
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**"
            }
        ]
    },
    webpack: (config, {dev}) => {
        config.module.rules.push({
            loader: "@svgr/webpack",
            options: {
                prettier: false,
                svgo: false,
                svgoConfig: {
                    plugins: [
                        {
                            name: "preset-default",
                            params: {
                                overrides: {removeViewBox: false}
                            }
                        }
                    ]
                },
                titleProp: true
            },
            test: /\.svg$/
        });

        config.module.rules.push({
            test: /\.wav$/,
            type: 'asset/resource',
            generator: {
                filename: 'static/audio/[name][hash][ext]'
            }
        });

        // https://docs.walletconnect.com/web3modal/nextjs/about?platform=wagmi#extra-configuration
        config.externals.push("pino-pretty", "lokijs", "encoding");

        // suppressing error for now
        // https://github.com/wevm/wagmi/issues/3232
        config.module.unknownContextCritical = false;

        if (dev) {
            config.cache = {
                type: "filesystem",
                cacheDirectory: path.resolve(__dirname, ".next/cache"),
                buildDependencies: {
                    config: [__filename]
                }
            };
        }

        return config;
    }
};
module.exports = withPWA(nextConfig);
