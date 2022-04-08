import { AliasesApi } from "../api/aliasesApi";
import { CreateAliasesRequest } from "../model/createAliasesRequest";
import { CreateAliasesRequestNew } from "../model/createAliasesRequestNew";
import { UpdateAliasRequest } from "../model/updateAliasRequest";
import { UpdateAliasRequestData } from "../model/updateAliasRequestData";
import { AliasFormat } from "../model/aliasFormat";

describe("aliasesAPI", () => {

  let createAliasesRequest = new CreateAliasesRequest();
  let createAliasesRequestNew = new CreateAliasesRequestNew();
  createAliasesRequestNew.classifiers=["bank-account"];
  createAliasesRequestNew.format = AliasFormat.UUID;
  createAliasesRequestNew.value = "122105155"
  let createAliasesRequestNew2 = new CreateAliasesRequestNew();
  createAliasesRequestNew2.classifiers=["bank-account"];
  createAliasesRequestNew2.format = AliasFormat.UUID;
  createAliasesRequestNew2.value = "122105156"
  createAliasesRequest.data = [createAliasesRequestNew, createAliasesRequestNew2];
  let api = new AliasesApi('US8X3DSEC1MyCACn6RpJL8LT', '02ceadd3-273a-4e98-9005-5daa28a0f6d2');
  let aliases = new Array();

  describe("Redact", () => {
    test("should return aliases", async () => {
      let thrownErr = false;

      try {
        let apiResponse = await api.createAliases(createAliasesRequest);

        apiResponse.body.data!.forEach(element => {
            element.aliases!.forEach(alias => {
              expect(alias.alias).toMatch(RegExp('tok_sandbox_.+'));
              expect(alias.format).toBe('UUID');
              aliases.push(alias.alias);
            });
        });
      } catch(err) {
        thrownErr = true;
        console.log(err);
      }

      expect(thrownErr).toBeFalsy();
    })
  });
  
  describe("Reveal", () => {
    test("should return the original value", async () => {
      let thrownErr = false;

      try {
        let res = await api.revealAlias(aliases[0]);

        expect(res.body.data!.length).toBeTruthy();
        expect(res.body.data![0].value).toBe("122105155");
        expect(res.body.data![0].classifiers).toContain("bank-account");

      } catch (err) {
        thrownErr = true;
        console.log(err);
      }
      expect(thrownErr).toBeFalsy();
          
    })
  });

  describe("Reveal Multiple", () => {
    test("should return original values", async () => {
      let thrownErr = false;

      try {
        // this test would fail in auto generated ts code line 341, need to fix it as localVarQueryParameters['q'] = q.join(',');
        let apiResponse = await api.revealMultipleAliases(aliases.join(','));

        expect(apiResponse.response.statusCode).toBe(200);
        expect(apiResponse.body.data![aliases[0]].value).toBe("122105155");
        expect(apiResponse.body.data![aliases[1]].value).toBe("122105156");
      } 
      catch(err) {
        thrownErr = true;
        console.log(err);
      }

      expect(thrownErr).toBeFalsy();
    })
  });

  describe("Update Alias", () => {
    test("should update alias classifier", async () => {
      let updateAliasRequest = new UpdateAliasRequest();
      let updateAliasRequestData = new UpdateAliasRequestData();
      updateAliasRequestData.classifiers = ["bank-account", "test-tag"];
      updateAliasRequest.data = updateAliasRequestData;

      let thrownErr = false;
      try {
        let apiResponse = await api.updateAlias(aliases[1], updateAliasRequest);

        expect(apiResponse.response.statusCode).toBe(204);
      } 
      catch(err) {
        thrownErr = true;
        console.log(err);
      }

      expect(thrownErr).toBeFalsy();
    })
  });

})
