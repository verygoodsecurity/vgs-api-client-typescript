/**
 * Vault HTTP API
 * The VGS Vault HTTP API is used for storing, retrieving, and managing sensitive data (aka Tokenization) within a VGS Vault.  The VGS API is organized around REST. Our API is built with a predictable resource-oriented structure, uses JSON-encoded requests and responses, follows standard HTTP verbs/responses, and uses industry standard authentication.  ## What is VGS  Storing sensitive data on your company’s infrastructure often comes with a heavy compliance burden. For instance, storing payments data yourself greatly increases the amount of work needed to become PCI compliant. It also increases your security risk in general. To combat this, companies will minimize the amount of sensitive information they have to handle or store.  VGS provides multiple methods for minimizing the sensitive information that needs to be stored which allows customers to secure any type of data for any use-case.  **Tokenization** is a method that focuses on securing the storage of data. This is the quickest way to get started and is free. [Get started with Tokenization](https://www.verygoodsecurity.com/docs/tokenization/getting-started).  **Zero Data** is a unique method invented by VGS in 2016 that securely stores data like Tokenization, however it also removes the customer’s environment from PCI scope completely providing maximum security, and minimum compliance scope. [Get started with Zero Data](https://www.verygoodsecurity.com/docs/getting-started/before-you-start).  Additionally, for scenarios where neither technology is a complete solution, for instance with legacy systems, VGS provides a compliance product which guarantees customers are able to meet their compliance needs no matter what may happen. [Get started with Control](https://www.verygoodsecurity.com/docs/control).  ## Learn about Tokenization  - [Create an Account for Free Tokenization](https://dashboard.verygoodsecurity.com/tokenization) - [Try a Tokenization Demo](https://www.verygoodsecurity.com/docs/tokenization/getting-started) - [Install a Tokenization SDK](https://www.verygoodsecurity.com/docs/tokenization/client-libraries)  ## Introduction  ### Alias-Formats | Format                          | Description                                                                               | |---------------------------------|-------------------------------------------------------------------------------------------| | UUID                            | Generic - VGS Alias (Default) - tok_sandbox_xxxxxxxxxxxxxxxxxxxxxxxxx                     | | NUM_LENGTH_PRESERVING           | Generic - Numeric Length Preserving - xxxxxxxxxxxxxxxx                                    | | FPE_SIX_T_FOUR                  | Payment Card - Format Preserving, Luhn Valid (6T4) - <first_six>xxxxxx<last_four>         | | FPE_T_FOUR                      | Payment Card - Format Preserving, Luhn Valid (T4) - xxxxxxxxxxxx<last_four>               | | PFPT                            | Payment Card - Prefixed, Luhn Valid, 19 Digits Fixed Length - xxxxxxxxxxxxxxxxxxx         | | NON_LUHN_FPE_ALPHANUMERIC       | Payment Card - Format Preserving - Non Luhn Valid - xxxxxxxxxxxxxxxx                      | | FPE_SSN_T_FOUR                  | SSN - Format Preserving (A4) - xxx-xx-<last_four>                                         | | FPE_ACC_NUM_T_FOUR              | Account Number - Numeric Length Preserving (A4) - xxxxxxxxxxxx<last_four>                 | | FPE_ALPHANUMERIC_ACC_NUM_T_FOUR | Account Number - Alphanumeric Length Preserving (A4) - xxxxxxxxxxxx<last_four>            | | GENERIC_T_FOUR                  | Generic - VGS Alias Last Four (T4) - tok_sandbox_xxxxxxxxxxxxxxxxxxxxxxxxx_<last_four>    | | RAW_UUID                        | Generic - UUID - xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx                                     | | ALPHANUMERIC_SIX_T_FOUR         | Numeric - Include Alphanumeric, 19 symbols length (6T4) - <first_six>xxxxxxxxx<last_four> | | VGS_FIXED_LEN_GENERIC           | Generic - VGS Alphanumeric Fixed Length, 29 characters - vgsxxxxxxxxxxxxxxxxxxxxxxxxxx    |   ## Authentication  This API uses `Basic` authentication and is implemented using industry best practices to ensure the security of the connection. Read more about [Identity and Access Management at VGS](https://www.verygoodsecurity.com/docs/vault/the-platform/iam)  Credentials to access the API can be generated on the [dashboard](https://dashboard.verygoodsecurity.com) by going to the Settings section of the vault of your choosing.  [Docs » Guides » Access credentials](https://www.verygoodsecurity.com/docs/settings/access-credentials)  ## Resource Limits  ### Data Limits  This API allows storing data up to 32MB in size.  ### Rate Limiting  The API allows up to 3,000 requests per minute. Requests are associated with the vault, regardless of the access credentials used to authenticate the request.  Your current rate limit is included as HTTP headers in every API response:  | Header Name             | Description                                              | |-------------------------|----------------------------------------------------------| | `x-ratelimit-remaining` | The number of requests remaining in the 1-minute window. |  If you exceed the rate limit, the API will reject the request with HTTP [429 Too Many Requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429).  ### Errors  The API uses standard HTTP status codes to indicate whether the request succeeded or not.  In case of failure, the response body will be JSON in a predefined format. For example, trying to create too many aliases at once results in the following response:  ```json {     \"errors\": [         {             \"status\": 400,             \"title\": \"Bad request\",             \"detail\": \"Too many values (limit: 20)\",             \"href\": \"https://api.sandbox.verygoodvault.com/aliases\"         }     ] } ``` 
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: support@verygoodsecurity.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { RequestFile } from './models';
import { AliasFormat } from './aliasFormat';

export class AliasDto {
    /**
    * Opaque string used to substitute the raw value.
    */
    'alias'?: string;
    'format'?: AliasFormat | null;

    static discriminator: string | undefined = undefined;

    static attributeTypeMap: Array<{name: string, baseName: string, type: string}> = [
        {
            "name": "alias",
            "baseName": "alias",
            "type": "string"
        },
        {
            "name": "format",
            "baseName": "format",
            "type": "AliasFormat"
        }    ];

    static getAttributeTypeMap() {
        return AliasDto.attributeTypeMap;
    }
}

