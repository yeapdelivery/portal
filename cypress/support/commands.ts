/// <reference types="cypress" />

const cookieName = "appSession";

Cypress.Commands.add("login", (email: string, password: string) => {
  const tokenEndpoint = `${Cypress.env("auth_url_base")}oauth/token`;
  const clientId = Cypress.env("auth_client_id");
  const clientSecret = Cypress.env("auth_client_secret");
  const audience = Cypress.env("auth_audience");
  const cookieSecret = "GwKPPuCQh8";

  const options = {
    body: {
      client_id: clientId,
      client_secret: clientSecret,
      audience: audience,
      username: email,
      password,
      grant_type: "http://auth0.com/oauth/grant-type/password-realm",
      realm: "Username-Password-Authentication",
    },
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    url: tokenEndpoint,
  };

  // Use the Resource Owner Password Flow to get the test user's access token
  cy.request(options).then(async ({ body }) => {
    const { access_token: accessToken } = body;

    // Invoke the task
    cy.task("getSessionCookie", {
      session: { accessToken, user: { email } },
      config: { secret: cookieSecret },
    }).then((cookie) => {
      // Set the cookie
      cy.setCookie(cookieName, cookie as string);
    });
  });
});

Cypress.Commands.add("logout", () => {
  cy.clearCookie(cookieName);
});
