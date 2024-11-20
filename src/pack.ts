import * as coda from "@codahq/packs-sdk";

const pack = coda.newPack({
  name: "Everhour",
  description: "Connect Everhour time tracking with your Coda docs",
  version: "1.0.0",
  formulaNamespace: "Everhour",
  networkDomains: ["api.everhour.com"]
});

pack.setUserAuthentication({
  type: coda.AuthenticationType.CustomHeaderToken,
  headerName: "X-Api-Key",
  instructionsUrl: "https://everhour.com/developers#authentication"
});

pack.addFormula({
  name: "Hello",
  description: "A simple test formula",
  parameters: [],
  resultType: coda.ValueType.String,
  execute: async function ([], context) {
    return "Hello from Everhour!";
  },
});

export = pack;