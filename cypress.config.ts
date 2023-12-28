import { Session } from "@auth0/nextjs-auth0";
import { defineConfig } from "cypress";
import {
  generateSessionCookie,
  GenerateSessionCookieConfig,
} from "@auth0/nextjs-auth0/testing";

export default defineConfig({
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },

  e2e: {
    setupNodeEvents(on, _config) {
      on("task", {
        getSessionCookie(params: {
          session: Session;
          config: GenerateSessionCookieConfig;
        }) {
          const { session, config } = params;
          return generateSessionCookie(session, config);
        },
      });
    },
    baseUrl: "http://localhost:3000",
  },
});
