import { VGS } from "../vgs";

let api

describe("aliasesAPI", () => {

  beforeEach(() => {
    let _config = VGS.config(process.env.VAULT_API_USERNAME!, process.env.VAULT_API_PASSWORD!)
    api = new VGS.Aliases(_config);
  });


  describe("Redact", () => {
    test("should redact", async () => {
      let data = [{
        "format": "UUID",
        "value": "5201784564572092",
        "classifiers": ["credit-card", "number"],
        "storage": "PERSISTENT"
      }, {
        "format": "UUID",
        "value": "Joe Doe",
        "storage": "VOLATILE"
      }]

      let aliases = await api.redact(data);

      expect(aliases.length).toEqual(2);

      for (let index = 0; index < data.length; index++) {
        expect(aliases[index]["value"]).toEqual(data[index]["value"]);
        expect(aliases[index]["aliases"][0]["alias"]).toMatch("tok_");
        expect(aliases[index]["storage"]).toEqual(data[index]["storage"]);
      }
      expect(new Set(aliases[0]["classifiers"])).toEqual(new Set(data[0]["classifiers"]))
      expect(new Set(aliases[1]["classifiers"])).toEqual(new Set())
    })
  });

  describe("Reveal", () => {
    test("should reveal", async () => {
      let data = [{
        "format": "UUID",
        "value": "5201784564572092",
        "classifiers": ["credit-card", "number"],
        "storage": "PERSISTENT"
      }, {
        "format": "UUID",
        "value": "Joe Doe",
        "storage": "VOLATILE"
      }]

      let aliases = await api.redact(data).then(
          aliases => aliases.map(i => i["aliases"][0]["alias"])
      );

      let response = await api.reveal(aliases)

      expect(aliases.length).toEqual(2);

      let originalValues = data.map(i => i["value"]);
      let revealedValues = Object.values<Object>(response).map(i => i["value"]);

      expect(new Set(originalValues)).toEqual(new Set(revealedValues));
    })
  });


  describe("Update", () => {
    test("should update", async () => {
      let data = [{
        "format": "UUID",
        "value": random(10),
      }]
      let alias = await api.redact(data).then(
          aliases => aliases.map(i => i["aliases"][0]["alias"])[0]
      );

      await api.update(alias, {"classifiers": ["secure"]})

      let response = await api.reveal(alias)

      expect(response[alias]["classifiers"]).toEqual(["secure"])
    });
  });

  describe("Delete", () => {
    test("should delete", async () => {
      let data = [{
        "format": "UUID",
        "value": "5201784564572092",
      }]
      let alias = await api.redact(data).then(
          aliases => aliases.map(i => i["aliases"][0]["alias"])[0]
      );
      await api.delete(alias)

      await expect(api.reveal(alias)).rejects.toThrow(VGS.ApiError)
    })
  });

  function random(length: number) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
          characters.length));
    }
    return result;
  }
})
