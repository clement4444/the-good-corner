import type { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";

dotenv.config();

const config: CodegenConfig = {
    schema: process.env.URL_APP_NETWORK_DOCKER,
    documents: ["src/graphql/operations.ts"],
    overwrite: true,
    generates: {
        "./src/generated/graphql-types.ts": {
            plugins: [
                "typescript",
                "typescript-operations",
                "typescript-react-apollo",
            ],
            config: {
                withHooks: true,
            },
        },
    },
};
export default config;