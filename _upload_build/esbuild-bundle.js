'use strict';
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../../../../opt/homebrew/lib/node_modules/@codahq/packs-sdk/node_modules/mersenne-twister/src/mersenne-twister.js
var require_mersenne_twister = __commonJS({
  "../../../../../opt/homebrew/lib/node_modules/@codahq/packs-sdk/node_modules/mersenne-twister/src/mersenne-twister.js"(exports2, module2) {
    init_crypto_shim();
    var MersenneTwister2 = /* @__PURE__ */ __name(function(seed) {
      if (seed == void 0) {
        seed = (/* @__PURE__ */ new Date()).getTime();
      }
      this.N = 624;
      this.M = 397;
      this.MATRIX_A = 2567483615;
      this.UPPER_MASK = 2147483648;
      this.LOWER_MASK = 2147483647;
      this.mt = new Array(this.N);
      this.mti = this.N + 1;
      if (seed.constructor == Array) {
        this.init_by_array(seed, seed.length);
      } else {
        this.init_seed(seed);
      }
    }, "MersenneTwister");
    MersenneTwister2.prototype.init_seed = function(s) {
      this.mt[0] = s >>> 0;
      for (this.mti = 1; this.mti < this.N; this.mti++) {
        var s = this.mt[this.mti - 1] ^ this.mt[this.mti - 1] >>> 30;
        this.mt[this.mti] = (((s & 4294901760) >>> 16) * 1812433253 << 16) + (s & 65535) * 1812433253 + this.mti;
        this.mt[this.mti] >>>= 0;
      }
    };
    MersenneTwister2.prototype.init_by_array = function(init_key, key_length) {
      var i, j, k;
      this.init_seed(19650218);
      i = 1;
      j = 0;
      k = this.N > key_length ? this.N : key_length;
      for (; k; k--) {
        var s = this.mt[i - 1] ^ this.mt[i - 1] >>> 30;
        this.mt[i] = (this.mt[i] ^ (((s & 4294901760) >>> 16) * 1664525 << 16) + (s & 65535) * 1664525) + init_key[j] + j;
        this.mt[i] >>>= 0;
        i++;
        j++;
        if (i >= this.N) {
          this.mt[0] = this.mt[this.N - 1];
          i = 1;
        }
        if (j >= key_length)
          j = 0;
      }
      for (k = this.N - 1; k; k--) {
        var s = this.mt[i - 1] ^ this.mt[i - 1] >>> 30;
        this.mt[i] = (this.mt[i] ^ (((s & 4294901760) >>> 16) * 1566083941 << 16) + (s & 65535) * 1566083941) - i;
        this.mt[i] >>>= 0;
        i++;
        if (i >= this.N) {
          this.mt[0] = this.mt[this.N - 1];
          i = 1;
        }
      }
      this.mt[0] = 2147483648;
    };
    MersenneTwister2.prototype.random_int = function() {
      var y;
      var mag01 = new Array(0, this.MATRIX_A);
      if (this.mti >= this.N) {
        var kk;
        if (this.mti == this.N + 1)
          this.init_seed(5489);
        for (kk = 0; kk < this.N - this.M; kk++) {
          y = this.mt[kk] & this.UPPER_MASK | this.mt[kk + 1] & this.LOWER_MASK;
          this.mt[kk] = this.mt[kk + this.M] ^ y >>> 1 ^ mag01[y & 1];
        }
        for (; kk < this.N - 1; kk++) {
          y = this.mt[kk] & this.UPPER_MASK | this.mt[kk + 1] & this.LOWER_MASK;
          this.mt[kk] = this.mt[kk + (this.M - this.N)] ^ y >>> 1 ^ mag01[y & 1];
        }
        y = this.mt[this.N - 1] & this.UPPER_MASK | this.mt[0] & this.LOWER_MASK;
        this.mt[this.N - 1] = this.mt[this.M - 1] ^ y >>> 1 ^ mag01[y & 1];
        this.mti = 0;
      }
      y = this.mt[this.mti++];
      y ^= y >>> 11;
      y ^= y << 7 & 2636928640;
      y ^= y << 15 & 4022730752;
      y ^= y >>> 18;
      return y >>> 0;
    };
    MersenneTwister2.prototype.random_int31 = function() {
      return this.random_int() >>> 1;
    };
    MersenneTwister2.prototype.random_incl = function() {
      return this.random_int() * (1 / 4294967295);
    };
    MersenneTwister2.prototype.random = function() {
      return this.random_int() * (1 / 4294967296);
    };
    MersenneTwister2.prototype.random_excl = function() {
      return (this.random_int() + 0.5) * (1 / 4294967296);
    };
    MersenneTwister2.prototype.random_long = function() {
      var a = this.random_int() >>> 5, b = this.random_int() >>> 6;
      return (a * 67108864 + b) * (1 / 9007199254740992);
    };
    module2.exports = MersenneTwister2;
  }
});

// ../../../../../opt/homebrew/lib/node_modules/@codahq/packs-sdk/dist/testing/injections/crypto_shim.js
function getRandomValues(abv) {
  var l = abv.length;
  while (l--) {
    abv[l] = Math.floor(randomFloat() * 256);
  }
  return abv;
}
function randomFloat() {
  return twister.random();
}
var MersenneTwister, twister, crypto;
var init_crypto_shim = __esm({
  "../../../../../opt/homebrew/lib/node_modules/@codahq/packs-sdk/dist/testing/injections/crypto_shim.js"() {
    MersenneTwister = require_mersenne_twister();
    twister = new MersenneTwister(Math.random() * Number.MAX_SAFE_INTEGER);
    __name(getRandomValues, "getRandomValues");
    __name(randomFloat, "randomFloat");
    crypto = {
      getRandomValues
    };
    if (!global.crypto?.getRandomValues) {
      global.crypto = crypto;
    }
  }
});

// node_modules/@codahq/packs-sdk/dist/types.js
var require_types = __commonJS({
  "node_modules/@codahq/packs-sdk/dist/types.js"(exports2) {
    "use strict";
    init_crypto_shim();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SyncInterval = exports2.QuotaLimitType = exports2.FeatureSet = exports2.PostSetupType = exports2.AuthenticationType = exports2.PackCategory = void 0;
    var PackCategory;
    (function(PackCategory2) {
      PackCategory2["CRM"] = "CRM";
      PackCategory2["Calendar"] = "Calendar";
      PackCategory2["Communication"] = "Communication";
      PackCategory2["DataStorage"] = "DataStorage";
      PackCategory2["Design"] = "Design";
      PackCategory2["Financial"] = "Financial";
      PackCategory2["Fun"] = "Fun";
      PackCategory2["Geo"] = "Geo";
      PackCategory2["IT"] = "IT";
      PackCategory2["Mathematics"] = "Mathematics";
      PackCategory2["Organization"] = "Organization";
      PackCategory2["Recruiting"] = "Recruiting";
      PackCategory2["Shopping"] = "Shopping";
      PackCategory2["Social"] = "Social";
      PackCategory2["Sports"] = "Sports";
      PackCategory2["Travel"] = "Travel";
      PackCategory2["Weather"] = "Weather";
    })(PackCategory = exports2.PackCategory || (exports2.PackCategory = {}));
    var AuthenticationType;
    (function(AuthenticationType2) {
      AuthenticationType2["None"] = "None";
      AuthenticationType2["HeaderBearerToken"] = "HeaderBearerToken";
      AuthenticationType2["CustomHeaderToken"] = "CustomHeaderToken";
      AuthenticationType2["QueryParamToken"] = "QueryParamToken";
      AuthenticationType2["MultiQueryParamToken"] = "MultiQueryParamToken";
      AuthenticationType2["OAuth2"] = "OAuth2";
      AuthenticationType2["WebBasic"] = "WebBasic";
      AuthenticationType2["Custom"] = "Custom";
      AuthenticationType2["AWSAccessKey"] = "AWSAccessKey";
      AuthenticationType2["AWSAssumeRole"] = "AWSAssumeRole";
      AuthenticationType2["CodaApiHeaderBearerToken"] = "CodaApiHeaderBearerToken";
      AuthenticationType2["Various"] = "Various";
    })(AuthenticationType = exports2.AuthenticationType || (exports2.AuthenticationType = {}));
    var PostSetupType;
    (function(PostSetupType2) {
      PostSetupType2["SetEndpoint"] = "SetEndPoint";
    })(PostSetupType = exports2.PostSetupType || (exports2.PostSetupType = {}));
    var FeatureSet;
    (function(FeatureSet2) {
      FeatureSet2["Basic"] = "Basic";
      FeatureSet2["Pro"] = "Pro";
      FeatureSet2["Team"] = "Team";
      FeatureSet2["Enterprise"] = "Enterprise";
    })(FeatureSet = exports2.FeatureSet || (exports2.FeatureSet = {}));
    var QuotaLimitType;
    (function(QuotaLimitType2) {
      QuotaLimitType2["Action"] = "Action";
      QuotaLimitType2["Getter"] = "Getter";
      QuotaLimitType2["Sync"] = "Sync";
      QuotaLimitType2["Metadata"] = "Metadata";
    })(QuotaLimitType = exports2.QuotaLimitType || (exports2.QuotaLimitType = {}));
    var SyncInterval;
    (function(SyncInterval2) {
      SyncInterval2["Manual"] = "Manual";
      SyncInterval2["Daily"] = "Daily";
      SyncInterval2["Hourly"] = "Hourly";
      SyncInterval2["EveryTenMinutes"] = "EveryTenMinutes";
    })(SyncInterval = exports2.SyncInterval || (exports2.SyncInterval = {}));
  }
});

// node_modules/@codahq/packs-sdk/dist/api_types.js
var require_api_types = __commonJS({
  "node_modules/@codahq/packs-sdk/dist/api_types.js"(exports2) {
    "use strict";
    init_crypto_shim();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PrecannedDateRange = exports2.ValidFetchMethods = exports2.NetworkConnection = exports2.ConnectionRequirement = exports2.ParameterTypeInputMap = exports2.ParameterType = exports2.fileArray = exports2.imageArray = exports2.htmlArray = exports2.dateArray = exports2.booleanArray = exports2.numberArray = exports2.stringArray = exports2.isArrayType = exports2.Type = void 0;
    var Type;
    (function(Type2) {
      Type2[Type2["string"] = 0] = "string";
      Type2[Type2["number"] = 1] = "number";
      Type2[Type2["object"] = 2] = "object";
      Type2[Type2["boolean"] = 3] = "boolean";
      Type2[Type2["date"] = 4] = "date";
      Type2[Type2["html"] = 5] = "html";
      Type2[Type2["image"] = 6] = "image";
      Type2[Type2["file"] = 7] = "file";
    })(Type = exports2.Type || (exports2.Type = {}));
    function isArrayType(obj) {
      return obj && obj.type === "array" && typeof obj.items === "number";
    }
    __name(isArrayType, "isArrayType");
    exports2.isArrayType = isArrayType;
    exports2.stringArray = {
      type: "array",
      items: Type.string
    };
    exports2.numberArray = {
      type: "array",
      items: Type.number
    };
    exports2.booleanArray = {
      type: "array",
      items: Type.boolean
    };
    exports2.dateArray = {
      type: "array",
      items: Type.date
    };
    exports2.htmlArray = {
      type: "array",
      items: Type.html
    };
    exports2.imageArray = {
      type: "array",
      items: Type.image
    };
    exports2.fileArray = {
      type: "array",
      items: Type.file
    };
    var ParameterType;
    (function(ParameterType2) {
      ParameterType2["String"] = "string";
      ParameterType2["Number"] = "number";
      ParameterType2["Boolean"] = "boolean";
      ParameterType2["Date"] = "date";
      ParameterType2["Html"] = "html";
      ParameterType2["Image"] = "image";
      ParameterType2["File"] = "file";
      ParameterType2["StringArray"] = "stringArray";
      ParameterType2["SparseStringArray"] = "sparseStringArray";
      ParameterType2["NumberArray"] = "numberArray";
      ParameterType2["SparseNumberArray"] = "sparseNumberArray";
      ParameterType2["BooleanArray"] = "booleanArray";
      ParameterType2["SparseBooleanArray"] = "sparseBooleanArray";
      ParameterType2["DateArray"] = "dateArray";
      ParameterType2["SparseDateArray"] = "sparseDateArray";
      ParameterType2["HtmlArray"] = "htmlArray`";
      ParameterType2["SparseHtmlArray"] = "sparseHtmlArray";
      ParameterType2["ImageArray"] = "imageArray";
      ParameterType2["SparseImageArray"] = "sparseImageArray";
      ParameterType2["FileArray"] = "fileArray";
      ParameterType2["SparseFileArray"] = "sparseFileArray";
    })(ParameterType = exports2.ParameterType || (exports2.ParameterType = {}));
    exports2.ParameterTypeInputMap = {
      [ParameterType.String]: Type.string,
      [ParameterType.Number]: Type.number,
      [ParameterType.Boolean]: Type.boolean,
      [ParameterType.Date]: Type.date,
      [ParameterType.Html]: Type.html,
      [ParameterType.Image]: Type.image,
      [ParameterType.File]: Type.file,
      [ParameterType.StringArray]: { type: "array", items: Type.string },
      [ParameterType.NumberArray]: { type: "array", items: Type.number },
      [ParameterType.BooleanArray]: { type: "array", items: Type.boolean },
      [ParameterType.DateArray]: { type: "array", items: Type.date },
      [ParameterType.HtmlArray]: { type: "array", items: Type.html },
      [ParameterType.ImageArray]: { type: "array", items: Type.image },
      [ParameterType.FileArray]: { type: "array", items: Type.file },
      [ParameterType.SparseStringArray]: { type: "array", items: Type.string, allowEmpty: true },
      [ParameterType.SparseNumberArray]: { type: "array", items: Type.number, allowEmpty: true },
      [ParameterType.SparseBooleanArray]: { type: "array", items: Type.boolean, allowEmpty: true },
      [ParameterType.SparseDateArray]: { type: "array", items: Type.date, allowEmpty: true },
      [ParameterType.SparseHtmlArray]: { type: "array", items: Type.html, allowEmpty: true },
      [ParameterType.SparseImageArray]: { type: "array", items: Type.image, allowEmpty: true },
      [ParameterType.SparseFileArray]: { type: "array", items: Type.file, allowEmpty: true }
    };
    var ConnectionRequirement;
    (function(ConnectionRequirement2) {
      ConnectionRequirement2["None"] = "none";
      ConnectionRequirement2["Optional"] = "optional";
      ConnectionRequirement2["Required"] = "required";
    })(ConnectionRequirement = exports2.ConnectionRequirement || (exports2.ConnectionRequirement = {}));
    var NetworkConnection;
    (function(NetworkConnection2) {
      NetworkConnection2["None"] = "none";
      NetworkConnection2["Optional"] = "optional";
      NetworkConnection2["Required"] = "required";
    })(NetworkConnection = exports2.NetworkConnection || (exports2.NetworkConnection = {}));
    exports2.ValidFetchMethods = ["GET", "PATCH", "POST", "PUT", "DELETE", "HEAD"];
    var PrecannedDateRange;
    (function(PrecannedDateRange2) {
      PrecannedDateRange2["Yesterday"] = "yesterday";
      PrecannedDateRange2["Last7Days"] = "last_7_days";
      PrecannedDateRange2["Last30Days"] = "last_30_days";
      PrecannedDateRange2["LastWeek"] = "last_week";
      PrecannedDateRange2["LastMonth"] = "last_month";
      PrecannedDateRange2["Last3Months"] = "last_3_months";
      PrecannedDateRange2["Last6Months"] = "last_6_months";
      PrecannedDateRange2["LastYear"] = "last_year";
      PrecannedDateRange2["Today"] = "today";
      PrecannedDateRange2["ThisWeek"] = "this_week";
      PrecannedDateRange2["ThisWeekStart"] = "this_week_start";
      PrecannedDateRange2["ThisMonth"] = "this_month";
      PrecannedDateRange2["ThisMonthStart"] = "this_month_start";
      PrecannedDateRange2["ThisYearStart"] = "this_year_start";
      PrecannedDateRange2["YearToDate"] = "year_to_date";
      PrecannedDateRange2["ThisYear"] = "this_year";
      PrecannedDateRange2["Tomorrow"] = "tomorrow";
      PrecannedDateRange2["Next7Days"] = "next_7_days";
      PrecannedDateRange2["Next30Days"] = "next_30_days";
      PrecannedDateRange2["NextWeek"] = "next_week";
      PrecannedDateRange2["NextMonth"] = "next_month";
      PrecannedDateRange2["Next3Months"] = "next_3_months";
      PrecannedDateRange2["Next6Months"] = "next_6_months";
      PrecannedDateRange2["NextYear"] = "next_year";
      PrecannedDateRange2["Everything"] = "everything";
    })(PrecannedDateRange = exports2.PrecannedDateRange || (exports2.PrecannedDateRange = {}));
  }
});

// node_modules/@codahq/packs-sdk/dist/helpers/ensure.js
var require_ensure = __commonJS({
  "node_modules/@codahq/packs-sdk/dist/helpers/ensure.js"(exports2) {
    "use strict";
    init_crypto_shim();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.assertCondition = exports2.ensureExists = exports2.ensureNonEmptyString = exports2.ensureUnreachable = void 0;
    var api_1 = require_api();
    function ensureUnreachable(value, message) {
      throw new Error(message || `Unreachable code hit with value ${String(value)}`);
    }
    __name(ensureUnreachable, "ensureUnreachable");
    exports2.ensureUnreachable = ensureUnreachable;
    function ensureNonEmptyString(value, message) {
      if (typeof value !== "string" || value.length === 0) {
        throw new (getErrorConstructor(message))(message || `Expected non-empty string for ${String(value)}`);
      }
      return value;
    }
    __name(ensureNonEmptyString, "ensureNonEmptyString");
    exports2.ensureNonEmptyString = ensureNonEmptyString;
    function ensureExists(value, message) {
      if (typeof value === "undefined" || value === null) {
        throw new (getErrorConstructor(message))(message || `Expected value for ${String(value)}`);
      }
      return value;
    }
    __name(ensureExists, "ensureExists");
    exports2.ensureExists = ensureExists;
    function getErrorConstructor(message) {
      return message ? api_1.UserVisibleError : Error;
    }
    __name(getErrorConstructor, "getErrorConstructor");
    function assertCondition(condition, message) {
      if (!condition) {
        throw new (getErrorConstructor(message))(message || "Assertion failed");
      }
    }
    __name(assertCondition, "assertCondition");
    exports2.assertCondition = assertCondition;
  }
});

// node_modules/@codahq/packs-sdk/dist/helpers/object_utils.js
var require_object_utils = __commonJS({
  "node_modules/@codahq/packs-sdk/dist/helpers/object_utils.js"(exports2) {
    "use strict";
    init_crypto_shim();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.isPromise = exports2.deepCopy = exports2.isNil = exports2.isDefined = exports2.deepFreeze = void 0;
    function deepFreeze(obj) {
      Object.freeze(obj);
      for (const k of Object.keys(obj)) {
        const key = k;
        if (obj[key] !== null && (typeof obj[key] === "object" || typeof obj[key] === "function") && !Object.isFrozen(obj[key])) {
          deepFreeze(obj[key]);
        }
      }
      return obj;
    }
    __name(deepFreeze, "deepFreeze");
    exports2.deepFreeze = deepFreeze;
    function isDefined(obj) {
      return !isNil(obj);
    }
    __name(isDefined, "isDefined");
    exports2.isDefined = isDefined;
    function isNil(obj) {
      return typeof obj === "undefined" || obj === null;
    }
    __name(isNil, "isNil");
    exports2.isNil = isNil;
    function deepCopy(obj) {
      return JSON.parse(JSON.stringify(obj));
    }
    __name(deepCopy, "deepCopy");
    exports2.deepCopy = deepCopy;
    function isPromise(obj) {
      return obj && typeof obj === "object" && "then" in obj;
    }
    __name(isPromise, "isPromise");
    exports2.isPromise = isPromise;
  }
});

// node_modules/@codahq/packs-sdk/dist/helpers/migration.js
var require_migration = __commonJS({
  "node_modules/@codahq/packs-sdk/dist/helpers/migration.js"(exports2) {
    "use strict";
    init_crypto_shim();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.postSetupMetadataHelper = exports2.setEndpointDefHelper = exports2.setEndpointHelper = exports2.paramDefHelper = exports2.objectSchemaHelper = void 0;
    var ensure_1 = require_ensure();
    function objectSchemaHelper(schema) {
      return new ObjectSchemaHelper(schema);
    }
    __name(objectSchemaHelper, "objectSchemaHelper");
    exports2.objectSchemaHelper = objectSchemaHelper;
    var _ObjectSchemaHelper = class _ObjectSchemaHelper {
      constructor(schema) {
        this._schema = schema;
      }
      get id() {
        var _a;
        return (_a = this._schema.idProperty) !== null && _a !== void 0 ? _a : this._schema.id;
      }
      get primary() {
        var _a;
        return (_a = this._schema.displayProperty) !== null && _a !== void 0 ? _a : this._schema.primary;
      }
      get featured() {
        var _a;
        return (_a = this._schema.featuredProperties) !== null && _a !== void 0 ? _a : this._schema.featured;
      }
      get identity() {
        return this._schema.identity;
      }
      get properties() {
        return this._schema.properties;
      }
      get type() {
        return this._schema.type;
      }
      get attribution() {
        var _a, _b;
        return (_a = this._schema.attribution) !== null && _a !== void 0 ? _a : (_b = this._schema.identity) === null || _b === void 0 ? void 0 : _b.attribution;
      }
    };
    __name(_ObjectSchemaHelper, "ObjectSchemaHelper");
    var ObjectSchemaHelper = _ObjectSchemaHelper;
    function paramDefHelper(def) {
      return new ParamDefHelper(def);
    }
    __name(paramDefHelper, "paramDefHelper");
    exports2.paramDefHelper = paramDefHelper;
    var _ParamDefHelper = class _ParamDefHelper {
      constructor(def) {
        this._def = def;
      }
      get defaultValue() {
        var _a;
        return (_a = this._def.suggestedValue) !== null && _a !== void 0 ? _a : this._def.defaultValue;
      }
    };
    __name(_ParamDefHelper, "ParamDefHelper");
    var ParamDefHelper = _ParamDefHelper;
    function setEndpointHelper(step) {
      return new SetEndpointHelper(step);
    }
    __name(setEndpointHelper, "setEndpointHelper");
    exports2.setEndpointHelper = setEndpointHelper;
    var _SetEndpointHelper = class _SetEndpointHelper {
      constructor(step) {
        this._step = step;
      }
      get getOptions() {
        var _a;
        return (0, ensure_1.ensureExists)((_a = this._step.getOptions) !== null && _a !== void 0 ? _a : this._step.getOptionsFormula);
      }
    };
    __name(_SetEndpointHelper, "SetEndpointHelper");
    var SetEndpointHelper = _SetEndpointHelper;
    function setEndpointDefHelper(step) {
      return new SetEndpointDefHelper(step);
    }
    __name(setEndpointDefHelper, "setEndpointDefHelper");
    exports2.setEndpointDefHelper = setEndpointDefHelper;
    var _SetEndpointDefHelper = class _SetEndpointDefHelper {
      constructor(step) {
        this._step = step;
      }
      get getOptions() {
        var _a;
        return (0, ensure_1.ensureExists)((_a = this._step.getOptions) !== null && _a !== void 0 ? _a : this._step.getOptionsFormula);
      }
    };
    __name(_SetEndpointDefHelper, "SetEndpointDefHelper");
    var SetEndpointDefHelper = _SetEndpointDefHelper;
    function postSetupMetadataHelper(metadata) {
      return new PostSetupMetadataHelper(metadata);
    }
    __name(postSetupMetadataHelper, "postSetupMetadataHelper");
    exports2.postSetupMetadataHelper = postSetupMetadataHelper;
    var _PostSetupMetadataHelper = class _PostSetupMetadataHelper {
      constructor(metadata) {
        this._metadata = metadata;
      }
      get getOptions() {
        var _a;
        return (0, ensure_1.ensureExists)((_a = this._metadata.getOptions) !== null && _a !== void 0 ? _a : this._metadata.getOptionsFormula);
      }
    };
    __name(_PostSetupMetadataHelper, "PostSetupMetadataHelper");
    var PostSetupMetadataHelper = _PostSetupMetadataHelper;
  }
});

// node_modules/pascalcase/index.js
var require_pascalcase = __commonJS({
  "node_modules/pascalcase/index.js"(exports2, module2) {
    init_crypto_shim();
    var titlecase = /* @__PURE__ */ __name((input) => input[0].toLocaleUpperCase() + input.slice(1), "titlecase");
    module2.exports = (value) => {
      if (value === null || value === void 0)
        return "";
      if (typeof value.toString !== "function")
        return "";
      let input = value.toString().trim();
      if (input === "")
        return "";
      if (input.length === 1)
        return input.toLocaleUpperCase();
      let match = input.match(/[a-zA-Z0-9]+/g);
      if (match) {
        return match.map((m) => titlecase(m)).join("");
      }
      return input;
    };
  }
});

// node_modules/@codahq/packs-sdk/dist/schema.js
var require_schema = __commonJS({
  "node_modules/@codahq/packs-sdk/dist/schema.js"(exports2) {
    "use strict";
    init_crypto_shim();
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.withIdentity = exports2.makeReferenceSchemaFromObjectSchema = exports2.normalizeSchema = exports2.normalizeSchemaKey = exports2.makeObjectSchema = exports2.makeSchema = exports2.generateSchema = exports2.isArray = exports2.isObject = exports2.makeAttributionNode = exports2.AttributionNodeType = exports2.SimpleStringHintValueTypes = exports2.DurationUnit = exports2.ImageCornerStyle = exports2.ImageOutline = exports2.LinkDisplayType = exports2.EmailDisplayType = exports2.ScaleIconSet = exports2.CurrencyFormat = exports2.ObjectHintValueTypes = exports2.BooleanHintValueTypes = exports2.NumberHintValueTypes = exports2.StringHintValueTypes = exports2.ValueHintType = exports2.ValueType = void 0;
    var ensure_1 = require_ensure();
    var object_utils_1 = require_object_utils();
    var ensure_2 = require_ensure();
    var ensure_3 = require_ensure();
    var ensure_4 = require_ensure();
    var migration_1 = require_migration();
    var pascalcase_1 = __importDefault(require_pascalcase());
    var ValueType;
    (function(ValueType2) {
      ValueType2["Boolean"] = "boolean";
      ValueType2["Number"] = "number";
      ValueType2["String"] = "string";
      ValueType2["Array"] = "array";
      ValueType2["Object"] = "object";
    })(ValueType = exports2.ValueType || (exports2.ValueType = {}));
    var ValueHintType;
    (function(ValueHintType2) {
      ValueHintType2["Date"] = "date";
      ValueHintType2["Time"] = "time";
      ValueHintType2["DateTime"] = "datetime";
      ValueHintType2["Duration"] = "duration";
      ValueHintType2["Email"] = "email";
      ValueHintType2["Person"] = "person";
      ValueHintType2["Percent"] = "percent";
      ValueHintType2["Currency"] = "currency";
      ValueHintType2["ImageReference"] = "image";
      ValueHintType2["ImageAttachment"] = "imageAttachment";
      ValueHintType2["Url"] = "url";
      ValueHintType2["Markdown"] = "markdown";
      ValueHintType2["Html"] = "html";
      ValueHintType2["Embed"] = "embed";
      ValueHintType2["Reference"] = "reference";
      ValueHintType2["Attachment"] = "attachment";
      ValueHintType2["Slider"] = "slider";
      ValueHintType2["Scale"] = "scale";
      ValueHintType2["ProgressBar"] = "progressBar";
      ValueHintType2["Toggle"] = "toggle";
    })(ValueHintType = exports2.ValueHintType || (exports2.ValueHintType = {}));
    exports2.StringHintValueTypes = [
      ValueHintType.Attachment,
      ValueHintType.Date,
      ValueHintType.Time,
      ValueHintType.DateTime,
      ValueHintType.Duration,
      ValueHintType.Email,
      ValueHintType.Embed,
      ValueHintType.Html,
      ValueHintType.ImageReference,
      ValueHintType.ImageAttachment,
      ValueHintType.Markdown,
      ValueHintType.Url
    ];
    exports2.NumberHintValueTypes = [
      ValueHintType.Date,
      ValueHintType.Time,
      ValueHintType.DateTime,
      ValueHintType.Duration,
      ValueHintType.Percent,
      ValueHintType.Currency,
      ValueHintType.Slider,
      ValueHintType.ProgressBar,
      ValueHintType.Scale
    ];
    exports2.BooleanHintValueTypes = [ValueHintType.Toggle];
    exports2.ObjectHintValueTypes = [ValueHintType.Person, ValueHintType.Reference];
    var CurrencyFormat;
    (function(CurrencyFormat2) {
      CurrencyFormat2["Currency"] = "currency";
      CurrencyFormat2["Accounting"] = "accounting";
      CurrencyFormat2["Financial"] = "financial";
    })(CurrencyFormat = exports2.CurrencyFormat || (exports2.CurrencyFormat = {}));
    var ScaleIconSet;
    (function(ScaleIconSet2) {
      ScaleIconSet2["Star"] = "star";
      ScaleIconSet2["Circle"] = "circle";
      ScaleIconSet2["Fire"] = "fire";
      ScaleIconSet2["Bug"] = "bug";
      ScaleIconSet2["Diamond"] = "diamond";
      ScaleIconSet2["Bell"] = "bell";
      ScaleIconSet2["ThumbsUp"] = "thumbsup";
      ScaleIconSet2["Heart"] = "heart";
      ScaleIconSet2["Chili"] = "chili";
      ScaleIconSet2["Smiley"] = "smiley";
      ScaleIconSet2["Lightning"] = "lightning";
      ScaleIconSet2["Currency"] = "currency";
      ScaleIconSet2["Coffee"] = "coffee";
      ScaleIconSet2["Person"] = "person";
      ScaleIconSet2["Battery"] = "battery";
      ScaleIconSet2["Cocktail"] = "cocktail";
      ScaleIconSet2["Cloud"] = "cloud";
      ScaleIconSet2["Sun"] = "sun";
      ScaleIconSet2["Checkmark"] = "checkmark";
      ScaleIconSet2["LightBulb"] = "lightbulb";
    })(ScaleIconSet = exports2.ScaleIconSet || (exports2.ScaleIconSet = {}));
    var EmailDisplayType;
    (function(EmailDisplayType2) {
      EmailDisplayType2["IconAndEmail"] = "iconAndEmail";
      EmailDisplayType2["IconOnly"] = "iconOnly";
      EmailDisplayType2["EmailOnly"] = "emailOnly";
    })(EmailDisplayType = exports2.EmailDisplayType || (exports2.EmailDisplayType = {}));
    var LinkDisplayType;
    (function(LinkDisplayType2) {
      LinkDisplayType2["IconOnly"] = "iconOnly";
      LinkDisplayType2["Url"] = "url";
      LinkDisplayType2["Title"] = "title";
      LinkDisplayType2["Card"] = "card";
      LinkDisplayType2["Embed"] = "embed";
    })(LinkDisplayType = exports2.LinkDisplayType || (exports2.LinkDisplayType = {}));
    var ImageOutline;
    (function(ImageOutline2) {
      ImageOutline2["Disabled"] = "disabled";
      ImageOutline2["Solid"] = "solid";
    })(ImageOutline = exports2.ImageOutline || (exports2.ImageOutline = {}));
    var ImageCornerStyle;
    (function(ImageCornerStyle2) {
      ImageCornerStyle2["Rounded"] = "rounded";
      ImageCornerStyle2["Square"] = "square";
    })(ImageCornerStyle = exports2.ImageCornerStyle || (exports2.ImageCornerStyle = {}));
    var DurationUnit;
    (function(DurationUnit2) {
      DurationUnit2["Days"] = "days";
      DurationUnit2["Hours"] = "hours";
      DurationUnit2["Minutes"] = "minutes";
      DurationUnit2["Seconds"] = "seconds";
    })(DurationUnit = exports2.DurationUnit || (exports2.DurationUnit = {}));
    exports2.SimpleStringHintValueTypes = [
      ValueHintType.Attachment,
      ValueHintType.Html,
      ValueHintType.Markdown,
      ValueHintType.Url,
      ValueHintType.Email
    ];
    var AttributionNodeType;
    (function(AttributionNodeType2) {
      AttributionNodeType2[AttributionNodeType2["Text"] = 1] = "Text";
      AttributionNodeType2[AttributionNodeType2["Link"] = 2] = "Link";
      AttributionNodeType2[AttributionNodeType2["Image"] = 3] = "Image";
    })(AttributionNodeType = exports2.AttributionNodeType || (exports2.AttributionNodeType = {}));
    function makeAttributionNode(node) {
      return node;
    }
    __name(makeAttributionNode, "makeAttributionNode");
    exports2.makeAttributionNode = makeAttributionNode;
    function isObject(val) {
      return Boolean(val && val.type === ValueType.Object);
    }
    __name(isObject, "isObject");
    exports2.isObject = isObject;
    function isArray(val) {
      return Boolean(val && val.type === ValueType.Array);
    }
    __name(isArray, "isArray");
    exports2.isArray = isArray;
    function generateSchema(obj) {
      if (Array.isArray(obj)) {
        if (obj.length === 0) {
          throw new Error("Must have representative value.");
        }
        return { type: ValueType.Array, items: generateSchema(obj[0]) };
      }
      if (typeof obj === "object") {
        const properties = {};
        if (obj === null) {
          return { type: ValueType.String };
        }
        for (const key in obj) {
          if (obj.hasOwnProperty(key)) {
            properties[key] = generateSchema(obj[key]);
          }
        }
        return { type: ValueType.Object, properties };
      } else if (typeof obj === "string") {
        return { type: ValueType.String };
      } else if (typeof obj === "boolean") {
        return { type: ValueType.Boolean };
      } else if (typeof obj === "number") {
        return { type: ValueType.Number };
      }
      return (0, ensure_4.ensureUnreachable)(obj);
    }
    __name(generateSchema, "generateSchema");
    exports2.generateSchema = generateSchema;
    function makeSchema(schema) {
      return schema;
    }
    __name(makeSchema, "makeSchema");
    exports2.makeSchema = makeSchema;
    function makeObjectSchema(schemaDef) {
      const schema = { ...schemaDef, type: ValueType.Object };
      for (const key of Object.keys(schema.properties)) {
        if (key !== "type") {
          const typedKey = key;
          schema.properties[typedKey] = (0, object_utils_1.deepCopy)(schema.properties[key]);
        }
      }
      validateObjectSchema(schema);
      return schema;
    }
    __name(makeObjectSchema, "makeObjectSchema");
    exports2.makeObjectSchema = makeObjectSchema;
    function validateObjectSchema(schema) {
      if (schema.codaType === ValueHintType.Reference) {
        const { id, identity, primary } = (0, migration_1.objectSchemaHelper)(schema);
        checkRequiredFieldInObjectSchema(id, "id", schema.codaType);
        checkRequiredFieldInObjectSchema(identity, "identity", schema.codaType);
        checkRequiredFieldInObjectSchema(primary, "primary", schema.codaType);
        checkSchemaPropertyIsRequired((0, ensure_2.ensureExists)(id), schema, "idProperty");
        checkSchemaPropertyIsRequired((0, ensure_2.ensureExists)(primary), schema, "displayProperty");
      }
      if (schema.codaType === ValueHintType.Person) {
        const { id } = (0, migration_1.objectSchemaHelper)(schema);
        checkRequiredFieldInObjectSchema(id, "id", schema.codaType);
        checkSchemaPropertyIsRequired((0, ensure_2.ensureExists)(id), schema, "idProperty");
      }
      for (const [_propertyKey, propertySchema] of Object.entries(schema.properties)) {
        if (propertySchema.type === ValueType.Object) {
          validateObjectSchema(propertySchema);
        }
      }
    }
    __name(validateObjectSchema, "validateObjectSchema");
    function checkRequiredFieldInObjectSchema(field, fieldName, codaType) {
      (0, ensure_2.ensureExists)(field, `Objects with codaType "${codaType}" require a "${fieldName}" property in the schema definition.`);
    }
    __name(checkRequiredFieldInObjectSchema, "checkRequiredFieldInObjectSchema");
    function checkSchemaPropertyIsRequired(field, schema, referencedByPropertyName) {
      const { properties, codaType } = schema;
      (0, ensure_1.assertCondition)(properties[field], `${referencedByPropertyName} set to undefined field "${field}"`);
      (0, ensure_1.assertCondition)(properties[field].required, `Field "${field}" must be marked as required in schema with codaType "${codaType}".`);
    }
    __name(checkSchemaPropertyIsRequired, "checkSchemaPropertyIsRequired");
    function normalizeSchemaKey(key) {
      return (0, pascalcase_1.default)(key).replace(/:/g, "_");
    }
    __name(normalizeSchemaKey, "normalizeSchemaKey");
    exports2.normalizeSchemaKey = normalizeSchemaKey;
    function normalizeSchema(schema) {
      if (isArray(schema)) {
        return {
          ...schema,
          type: ValueType.Array,
          items: normalizeSchema(schema.items)
        };
      } else if (isObject(schema)) {
        const normalized = {};
        const { id, primary, featured, idProperty, displayProperty, featuredProperties, titleProperty, subtitleProperties, imageProperty, descriptionProperty, linkProperty } = schema;
        for (const key of Object.keys(schema.properties)) {
          const normalizedKey = normalizeSchemaKey(key);
          const props = schema.properties[key];
          const { required, fromKey } = props;
          normalized[normalizedKey] = Object.assign(normalizeSchema(props), {
            required,
            fromKey: fromKey || (normalizedKey !== key ? key : void 0)
          });
        }
        const normalizedSchema = {
          type: ValueType.Object,
          id: id ? normalizeSchemaKey(id) : void 0,
          featured: featured ? featured.map(normalizeSchemaKey) : void 0,
          primary: primary ? normalizeSchemaKey(primary) : void 0,
          idProperty: idProperty ? normalizeSchemaKey(idProperty) : void 0,
          featuredProperties: featuredProperties ? featuredProperties.map(normalizeSchemaKey) : void 0,
          displayProperty: displayProperty ? normalizeSchemaKey(displayProperty) : void 0,
          properties: normalized,
          identity: schema.identity,
          codaType: schema.codaType,
          description: schema.description,
          attribution: schema.attribution,
          includeUnknownProperties: schema.includeUnknownProperties,
          titleProperty: titleProperty ? normalizeSchemaKey(titleProperty) : void 0,
          subtitleProperties: subtitleProperties ? subtitleProperties.map(normalizeSchemaKey) : void 0,
          imageProperty: imageProperty ? normalizeSchemaKey(imageProperty) : void 0,
          descriptionProperty: descriptionProperty ? normalizeSchemaKey(descriptionProperty) : void 0,
          linkProperty: linkProperty ? normalizeSchemaKey(linkProperty) : void 0
        };
        return normalizedSchema;
      }
      return schema;
    }
    __name(normalizeSchema, "normalizeSchema");
    exports2.normalizeSchema = normalizeSchema;
    function makeReferenceSchemaFromObjectSchema(schema, identityName) {
      const { type, id, primary, identity, properties } = (0, migration_1.objectSchemaHelper)(schema);
      (0, ensure_2.ensureExists)(identity || identityName, "Source schema must have an identity field, or you must provide an identity name for the reference.");
      const validId = (0, ensure_2.ensureExists)(id);
      const referenceProperties = { [validId]: properties[validId] };
      if (primary && primary !== id) {
        referenceProperties[primary] = properties[primary];
      }
      return makeObjectSchema({
        codaType: ValueHintType.Reference,
        type,
        idProperty: id,
        identity: identity || { name: (0, ensure_2.ensureExists)(identityName) },
        displayProperty: primary,
        properties: referenceProperties
      });
    }
    __name(makeReferenceSchemaFromObjectSchema, "makeReferenceSchemaFromObjectSchema");
    exports2.makeReferenceSchemaFromObjectSchema = makeReferenceSchemaFromObjectSchema;
    function withIdentity(schema, identityName) {
      return makeObjectSchema({
        ...(0, object_utils_1.deepCopy)(schema),
        identity: { name: (0, ensure_3.ensureNonEmptyString)(identityName) }
      });
    }
    __name(withIdentity, "withIdentity");
    exports2.withIdentity = withIdentity;
  }
});

// node_modules/clone/clone.js
var require_clone = __commonJS({
  "node_modules/clone/clone.js"(exports2, module2) {
    init_crypto_shim();
    var clone = function() {
      "use strict";
      function _instanceof(obj, type) {
        return type != null && obj instanceof type;
      }
      __name(_instanceof, "_instanceof");
      var nativeMap;
      try {
        nativeMap = Map;
      } catch (_) {
        nativeMap = /* @__PURE__ */ __name(function() {
        }, "nativeMap");
      }
      var nativeSet;
      try {
        nativeSet = Set;
      } catch (_) {
        nativeSet = /* @__PURE__ */ __name(function() {
        }, "nativeSet");
      }
      var nativePromise;
      try {
        nativePromise = Promise;
      } catch (_) {
        nativePromise = /* @__PURE__ */ __name(function() {
        }, "nativePromise");
      }
      function clone2(parent, circular, depth, prototype, includeNonEnumerable) {
        if (typeof circular === "object") {
          depth = circular.depth;
          prototype = circular.prototype;
          includeNonEnumerable = circular.includeNonEnumerable;
          circular = circular.circular;
        }
        var allParents = [];
        var allChildren = [];
        var useBuffer = typeof Buffer != "undefined";
        if (typeof circular == "undefined")
          circular = true;
        if (typeof depth == "undefined")
          depth = Infinity;
        function _clone(parent2, depth2) {
          if (parent2 === null)
            return null;
          if (depth2 === 0)
            return parent2;
          var child;
          var proto;
          if (typeof parent2 != "object") {
            return parent2;
          }
          if (_instanceof(parent2, nativeMap)) {
            child = new nativeMap();
          } else if (_instanceof(parent2, nativeSet)) {
            child = new nativeSet();
          } else if (_instanceof(parent2, nativePromise)) {
            child = new nativePromise(function(resolve, reject) {
              parent2.then(function(value) {
                resolve(_clone(value, depth2 - 1));
              }, function(err) {
                reject(_clone(err, depth2 - 1));
              });
            });
          } else if (clone2.__isArray(parent2)) {
            child = [];
          } else if (clone2.__isRegExp(parent2)) {
            child = new RegExp(parent2.source, __getRegExpFlags(parent2));
            if (parent2.lastIndex)
              child.lastIndex = parent2.lastIndex;
          } else if (clone2.__isDate(parent2)) {
            child = new Date(parent2.getTime());
          } else if (useBuffer && Buffer.isBuffer(parent2)) {
            if (Buffer.allocUnsafe) {
              child = Buffer.allocUnsafe(parent2.length);
            } else {
              child = new Buffer(parent2.length);
            }
            parent2.copy(child);
            return child;
          } else if (_instanceof(parent2, Error)) {
            child = Object.create(parent2);
          } else {
            if (typeof prototype == "undefined") {
              proto = Object.getPrototypeOf(parent2);
              child = Object.create(proto);
            } else {
              child = Object.create(prototype);
              proto = prototype;
            }
          }
          if (circular) {
            var index = allParents.indexOf(parent2);
            if (index != -1) {
              return allChildren[index];
            }
            allParents.push(parent2);
            allChildren.push(child);
          }
          if (_instanceof(parent2, nativeMap)) {
            parent2.forEach(function(value, key) {
              var keyChild = _clone(key, depth2 - 1);
              var valueChild = _clone(value, depth2 - 1);
              child.set(keyChild, valueChild);
            });
          }
          if (_instanceof(parent2, nativeSet)) {
            parent2.forEach(function(value) {
              var entryChild = _clone(value, depth2 - 1);
              child.add(entryChild);
            });
          }
          for (var i in parent2) {
            var attrs;
            if (proto) {
              attrs = Object.getOwnPropertyDescriptor(proto, i);
            }
            if (attrs && attrs.set == null) {
              continue;
            }
            child[i] = _clone(parent2[i], depth2 - 1);
          }
          if (Object.getOwnPropertySymbols) {
            var symbols = Object.getOwnPropertySymbols(parent2);
            for (var i = 0; i < symbols.length; i++) {
              var symbol = symbols[i];
              var descriptor = Object.getOwnPropertyDescriptor(parent2, symbol);
              if (descriptor && !descriptor.enumerable && !includeNonEnumerable) {
                continue;
              }
              child[symbol] = _clone(parent2[symbol], depth2 - 1);
              if (!descriptor.enumerable) {
                Object.defineProperty(child, symbol, {
                  enumerable: false
                });
              }
            }
          }
          if (includeNonEnumerable) {
            var allPropertyNames = Object.getOwnPropertyNames(parent2);
            for (var i = 0; i < allPropertyNames.length; i++) {
              var propertyName = allPropertyNames[i];
              var descriptor = Object.getOwnPropertyDescriptor(parent2, propertyName);
              if (descriptor && descriptor.enumerable) {
                continue;
              }
              child[propertyName] = _clone(parent2[propertyName], depth2 - 1);
              Object.defineProperty(child, propertyName, {
                enumerable: false
              });
            }
          }
          return child;
        }
        __name(_clone, "_clone");
        return _clone(parent, depth);
      }
      __name(clone2, "clone");
      clone2.clonePrototype = /* @__PURE__ */ __name(function clonePrototype(parent) {
        if (parent === null)
          return null;
        var c = /* @__PURE__ */ __name(function() {
        }, "c");
        c.prototype = parent;
        return new c();
      }, "clonePrototype");
      function __objToStr(o) {
        return Object.prototype.toString.call(o);
      }
      __name(__objToStr, "__objToStr");
      clone2.__objToStr = __objToStr;
      function __isDate(o) {
        return typeof o === "object" && __objToStr(o) === "[object Date]";
      }
      __name(__isDate, "__isDate");
      clone2.__isDate = __isDate;
      function __isArray(o) {
        return typeof o === "object" && __objToStr(o) === "[object Array]";
      }
      __name(__isArray, "__isArray");
      clone2.__isArray = __isArray;
      function __isRegExp(o) {
        return typeof o === "object" && __objToStr(o) === "[object RegExp]";
      }
      __name(__isRegExp, "__isRegExp");
      clone2.__isRegExp = __isRegExp;
      function __getRegExpFlags(re) {
        var flags = "";
        if (re.global)
          flags += "g";
        if (re.ignoreCase)
          flags += "i";
        if (re.multiline)
          flags += "m";
        return flags;
      }
      __name(__getRegExpFlags, "__getRegExpFlags");
      clone2.__getRegExpFlags = __getRegExpFlags;
      return clone2;
    }();
    if (typeof module2 === "object" && module2.exports) {
      module2.exports = clone;
    }
  }
});

// node_modules/es-errors/index.js
var require_es_errors = __commonJS({
  "node_modules/es-errors/index.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    module2.exports = Error;
  }
});

// node_modules/es-errors/eval.js
var require_eval = __commonJS({
  "node_modules/es-errors/eval.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    module2.exports = EvalError;
  }
});

// node_modules/es-errors/range.js
var require_range = __commonJS({
  "node_modules/es-errors/range.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    module2.exports = RangeError;
  }
});

// node_modules/es-errors/ref.js
var require_ref = __commonJS({
  "node_modules/es-errors/ref.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    module2.exports = ReferenceError;
  }
});

// node_modules/es-errors/syntax.js
var require_syntax = __commonJS({
  "node_modules/es-errors/syntax.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    module2.exports = SyntaxError;
  }
});

// node_modules/es-errors/type.js
var require_type = __commonJS({
  "node_modules/es-errors/type.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    module2.exports = TypeError;
  }
});

// node_modules/es-errors/uri.js
var require_uri = __commonJS({
  "node_modules/es-errors/uri.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    module2.exports = URIError;
  }
});

// node_modules/has-symbols/shams.js
var require_shams = __commonJS({
  "node_modules/has-symbols/shams.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    module2.exports = /* @__PURE__ */ __name(function hasSymbols() {
      if (typeof Symbol !== "function" || typeof Object.getOwnPropertySymbols !== "function") {
        return false;
      }
      if (typeof Symbol.iterator === "symbol") {
        return true;
      }
      var obj = {};
      var sym = Symbol("test");
      var symObj = Object(sym);
      if (typeof sym === "string") {
        return false;
      }
      if (Object.prototype.toString.call(sym) !== "[object Symbol]") {
        return false;
      }
      if (Object.prototype.toString.call(symObj) !== "[object Symbol]") {
        return false;
      }
      var symVal = 42;
      obj[sym] = symVal;
      for (sym in obj) {
        return false;
      }
      if (typeof Object.keys === "function" && Object.keys(obj).length !== 0) {
        return false;
      }
      if (typeof Object.getOwnPropertyNames === "function" && Object.getOwnPropertyNames(obj).length !== 0) {
        return false;
      }
      var syms = Object.getOwnPropertySymbols(obj);
      if (syms.length !== 1 || syms[0] !== sym) {
        return false;
      }
      if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) {
        return false;
      }
      if (typeof Object.getOwnPropertyDescriptor === "function") {
        var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
        if (descriptor.value !== symVal || descriptor.enumerable !== true) {
          return false;
        }
      }
      return true;
    }, "hasSymbols");
  }
});

// node_modules/has-symbols/index.js
var require_has_symbols = __commonJS({
  "node_modules/has-symbols/index.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var origSymbol = typeof Symbol !== "undefined" && Symbol;
    var hasSymbolSham = require_shams();
    module2.exports = /* @__PURE__ */ __name(function hasNativeSymbols() {
      if (typeof origSymbol !== "function") {
        return false;
      }
      if (typeof Symbol !== "function") {
        return false;
      }
      if (typeof origSymbol("foo") !== "symbol") {
        return false;
      }
      if (typeof Symbol("bar") !== "symbol") {
        return false;
      }
      return hasSymbolSham();
    }, "hasNativeSymbols");
  }
});

// node_modules/has-proto/index.js
var require_has_proto = __commonJS({
  "node_modules/has-proto/index.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var test = {
      __proto__: null,
      foo: {}
    };
    var $Object = Object;
    module2.exports = /* @__PURE__ */ __name(function hasProto() {
      return { __proto__: test }.foo === test.foo && !(test instanceof $Object);
    }, "hasProto");
  }
});

// node_modules/function-bind/implementation.js
var require_implementation = __commonJS({
  "node_modules/function-bind/implementation.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var ERROR_MESSAGE = "Function.prototype.bind called on incompatible ";
    var toStr = Object.prototype.toString;
    var max = Math.max;
    var funcType = "[object Function]";
    var concatty = /* @__PURE__ */ __name(function concatty2(a, b) {
      var arr = [];
      for (var i = 0; i < a.length; i += 1) {
        arr[i] = a[i];
      }
      for (var j = 0; j < b.length; j += 1) {
        arr[j + a.length] = b[j];
      }
      return arr;
    }, "concatty");
    var slicy = /* @__PURE__ */ __name(function slicy2(arrLike, offset) {
      var arr = [];
      for (var i = offset || 0, j = 0; i < arrLike.length; i += 1, j += 1) {
        arr[j] = arrLike[i];
      }
      return arr;
    }, "slicy");
    var joiny = /* @__PURE__ */ __name(function(arr, joiner) {
      var str = "";
      for (var i = 0; i < arr.length; i += 1) {
        str += arr[i];
        if (i + 1 < arr.length) {
          str += joiner;
        }
      }
      return str;
    }, "joiny");
    module2.exports = /* @__PURE__ */ __name(function bind(that) {
      var target = this;
      if (typeof target !== "function" || toStr.apply(target) !== funcType) {
        throw new TypeError(ERROR_MESSAGE + target);
      }
      var args = slicy(arguments, 1);
      var bound;
      var binder = /* @__PURE__ */ __name(function() {
        if (this instanceof bound) {
          var result = target.apply(
            this,
            concatty(args, arguments)
          );
          if (Object(result) === result) {
            return result;
          }
          return this;
        }
        return target.apply(
          that,
          concatty(args, arguments)
        );
      }, "binder");
      var boundLength = max(0, target.length - args.length);
      var boundArgs = [];
      for (var i = 0; i < boundLength; i++) {
        boundArgs[i] = "$" + i;
      }
      bound = Function("binder", "return function (" + joiny(boundArgs, ",") + "){ return binder.apply(this,arguments); }")(binder);
      if (target.prototype) {
        var Empty = /* @__PURE__ */ __name(function Empty2() {
        }, "Empty");
        Empty.prototype = target.prototype;
        bound.prototype = new Empty();
        Empty.prototype = null;
      }
      return bound;
    }, "bind");
  }
});

// node_modules/function-bind/index.js
var require_function_bind = __commonJS({
  "node_modules/function-bind/index.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var implementation = require_implementation();
    module2.exports = Function.prototype.bind || implementation;
  }
});

// node_modules/hasown/index.js
var require_hasown = __commonJS({
  "node_modules/hasown/index.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var call = Function.prototype.call;
    var $hasOwn = Object.prototype.hasOwnProperty;
    var bind = require_function_bind();
    module2.exports = bind.call(call, $hasOwn);
  }
});

// node_modules/get-intrinsic/index.js
var require_get_intrinsic = __commonJS({
  "node_modules/get-intrinsic/index.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var undefined2;
    var $Error = require_es_errors();
    var $EvalError = require_eval();
    var $RangeError = require_range();
    var $ReferenceError = require_ref();
    var $SyntaxError = require_syntax();
    var $TypeError = require_type();
    var $URIError = require_uri();
    var $Function = Function;
    var getEvalledConstructor = /* @__PURE__ */ __name(function(expressionSyntax) {
      try {
        return $Function('"use strict"; return (' + expressionSyntax + ").constructor;")();
      } catch (e) {
      }
    }, "getEvalledConstructor");
    var $gOPD = Object.getOwnPropertyDescriptor;
    if ($gOPD) {
      try {
        $gOPD({}, "");
      } catch (e) {
        $gOPD = null;
      }
    }
    var throwTypeError = /* @__PURE__ */ __name(function() {
      throw new $TypeError();
    }, "throwTypeError");
    var ThrowTypeError = $gOPD ? function() {
      try {
        arguments.callee;
        return throwTypeError;
      } catch (calleeThrows) {
        try {
          return $gOPD(arguments, "callee").get;
        } catch (gOPDthrows) {
          return throwTypeError;
        }
      }
    }() : throwTypeError;
    var hasSymbols = require_has_symbols()();
    var hasProto = require_has_proto()();
    var getProto = Object.getPrototypeOf || (hasProto ? function(x) {
      return x.__proto__;
    } : null);
    var needsEval = {};
    var TypedArray = typeof Uint8Array === "undefined" || !getProto ? undefined2 : getProto(Uint8Array);
    var INTRINSICS = {
      __proto__: null,
      "%AggregateError%": typeof AggregateError === "undefined" ? undefined2 : AggregateError,
      "%Array%": Array,
      "%ArrayBuffer%": typeof ArrayBuffer === "undefined" ? undefined2 : ArrayBuffer,
      "%ArrayIteratorPrototype%": hasSymbols && getProto ? getProto([][Symbol.iterator]()) : undefined2,
      "%AsyncFromSyncIteratorPrototype%": undefined2,
      "%AsyncFunction%": needsEval,
      "%AsyncGenerator%": needsEval,
      "%AsyncGeneratorFunction%": needsEval,
      "%AsyncIteratorPrototype%": needsEval,
      "%Atomics%": typeof Atomics === "undefined" ? undefined2 : Atomics,
      "%BigInt%": typeof BigInt === "undefined" ? undefined2 : BigInt,
      "%BigInt64Array%": typeof BigInt64Array === "undefined" ? undefined2 : BigInt64Array,
      "%BigUint64Array%": typeof BigUint64Array === "undefined" ? undefined2 : BigUint64Array,
      "%Boolean%": Boolean,
      "%DataView%": typeof DataView === "undefined" ? undefined2 : DataView,
      "%Date%": Date,
      "%decodeURI%": decodeURI,
      "%decodeURIComponent%": decodeURIComponent,
      "%encodeURI%": encodeURI,
      "%encodeURIComponent%": encodeURIComponent,
      "%Error%": $Error,
      "%eval%": eval,
      // eslint-disable-line no-eval
      "%EvalError%": $EvalError,
      "%Float32Array%": typeof Float32Array === "undefined" ? undefined2 : Float32Array,
      "%Float64Array%": typeof Float64Array === "undefined" ? undefined2 : Float64Array,
      "%FinalizationRegistry%": typeof FinalizationRegistry === "undefined" ? undefined2 : FinalizationRegistry,
      "%Function%": $Function,
      "%GeneratorFunction%": needsEval,
      "%Int8Array%": typeof Int8Array === "undefined" ? undefined2 : Int8Array,
      "%Int16Array%": typeof Int16Array === "undefined" ? undefined2 : Int16Array,
      "%Int32Array%": typeof Int32Array === "undefined" ? undefined2 : Int32Array,
      "%isFinite%": isFinite,
      "%isNaN%": isNaN,
      "%IteratorPrototype%": hasSymbols && getProto ? getProto(getProto([][Symbol.iterator]())) : undefined2,
      "%JSON%": typeof JSON === "object" ? JSON : undefined2,
      "%Map%": typeof Map === "undefined" ? undefined2 : Map,
      "%MapIteratorPrototype%": typeof Map === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Map())[Symbol.iterator]()),
      "%Math%": Math,
      "%Number%": Number,
      "%Object%": Object,
      "%parseFloat%": parseFloat,
      "%parseInt%": parseInt,
      "%Promise%": typeof Promise === "undefined" ? undefined2 : Promise,
      "%Proxy%": typeof Proxy === "undefined" ? undefined2 : Proxy,
      "%RangeError%": $RangeError,
      "%ReferenceError%": $ReferenceError,
      "%Reflect%": typeof Reflect === "undefined" ? undefined2 : Reflect,
      "%RegExp%": RegExp,
      "%Set%": typeof Set === "undefined" ? undefined2 : Set,
      "%SetIteratorPrototype%": typeof Set === "undefined" || !hasSymbols || !getProto ? undefined2 : getProto((/* @__PURE__ */ new Set())[Symbol.iterator]()),
      "%SharedArrayBuffer%": typeof SharedArrayBuffer === "undefined" ? undefined2 : SharedArrayBuffer,
      "%String%": String,
      "%StringIteratorPrototype%": hasSymbols && getProto ? getProto(""[Symbol.iterator]()) : undefined2,
      "%Symbol%": hasSymbols ? Symbol : undefined2,
      "%SyntaxError%": $SyntaxError,
      "%ThrowTypeError%": ThrowTypeError,
      "%TypedArray%": TypedArray,
      "%TypeError%": $TypeError,
      "%Uint8Array%": typeof Uint8Array === "undefined" ? undefined2 : Uint8Array,
      "%Uint8ClampedArray%": typeof Uint8ClampedArray === "undefined" ? undefined2 : Uint8ClampedArray,
      "%Uint16Array%": typeof Uint16Array === "undefined" ? undefined2 : Uint16Array,
      "%Uint32Array%": typeof Uint32Array === "undefined" ? undefined2 : Uint32Array,
      "%URIError%": $URIError,
      "%WeakMap%": typeof WeakMap === "undefined" ? undefined2 : WeakMap,
      "%WeakRef%": typeof WeakRef === "undefined" ? undefined2 : WeakRef,
      "%WeakSet%": typeof WeakSet === "undefined" ? undefined2 : WeakSet
    };
    if (getProto) {
      try {
        null.error;
      } catch (e) {
        errorProto = getProto(getProto(e));
        INTRINSICS["%Error.prototype%"] = errorProto;
      }
    }
    var errorProto;
    var doEval = /* @__PURE__ */ __name(function doEval2(name) {
      var value;
      if (name === "%AsyncFunction%") {
        value = getEvalledConstructor("async function () {}");
      } else if (name === "%GeneratorFunction%") {
        value = getEvalledConstructor("function* () {}");
      } else if (name === "%AsyncGeneratorFunction%") {
        value = getEvalledConstructor("async function* () {}");
      } else if (name === "%AsyncGenerator%") {
        var fn = doEval2("%AsyncGeneratorFunction%");
        if (fn) {
          value = fn.prototype;
        }
      } else if (name === "%AsyncIteratorPrototype%") {
        var gen = doEval2("%AsyncGenerator%");
        if (gen && getProto) {
          value = getProto(gen.prototype);
        }
      }
      INTRINSICS[name] = value;
      return value;
    }, "doEval");
    var LEGACY_ALIASES = {
      __proto__: null,
      "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
      "%ArrayPrototype%": ["Array", "prototype"],
      "%ArrayProto_entries%": ["Array", "prototype", "entries"],
      "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
      "%ArrayProto_keys%": ["Array", "prototype", "keys"],
      "%ArrayProto_values%": ["Array", "prototype", "values"],
      "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
      "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
      "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
      "%BooleanPrototype%": ["Boolean", "prototype"],
      "%DataViewPrototype%": ["DataView", "prototype"],
      "%DatePrototype%": ["Date", "prototype"],
      "%ErrorPrototype%": ["Error", "prototype"],
      "%EvalErrorPrototype%": ["EvalError", "prototype"],
      "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
      "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
      "%FunctionPrototype%": ["Function", "prototype"],
      "%Generator%": ["GeneratorFunction", "prototype"],
      "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
      "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
      "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
      "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
      "%JSONParse%": ["JSON", "parse"],
      "%JSONStringify%": ["JSON", "stringify"],
      "%MapPrototype%": ["Map", "prototype"],
      "%NumberPrototype%": ["Number", "prototype"],
      "%ObjectPrototype%": ["Object", "prototype"],
      "%ObjProto_toString%": ["Object", "prototype", "toString"],
      "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
      "%PromisePrototype%": ["Promise", "prototype"],
      "%PromiseProto_then%": ["Promise", "prototype", "then"],
      "%Promise_all%": ["Promise", "all"],
      "%Promise_reject%": ["Promise", "reject"],
      "%Promise_resolve%": ["Promise", "resolve"],
      "%RangeErrorPrototype%": ["RangeError", "prototype"],
      "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
      "%RegExpPrototype%": ["RegExp", "prototype"],
      "%SetPrototype%": ["Set", "prototype"],
      "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
      "%StringPrototype%": ["String", "prototype"],
      "%SymbolPrototype%": ["Symbol", "prototype"],
      "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
      "%TypedArrayPrototype%": ["TypedArray", "prototype"],
      "%TypeErrorPrototype%": ["TypeError", "prototype"],
      "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
      "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
      "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
      "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
      "%URIErrorPrototype%": ["URIError", "prototype"],
      "%WeakMapPrototype%": ["WeakMap", "prototype"],
      "%WeakSetPrototype%": ["WeakSet", "prototype"]
    };
    var bind = require_function_bind();
    var hasOwn = require_hasown();
    var $concat = bind.call(Function.call, Array.prototype.concat);
    var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
    var $replace = bind.call(Function.call, String.prototype.replace);
    var $strSlice = bind.call(Function.call, String.prototype.slice);
    var $exec = bind.call(Function.call, RegExp.prototype.exec);
    var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = /* @__PURE__ */ __name(function stringToPath2(string) {
      var first = $strSlice(string, 0, 1);
      var last = $strSlice(string, -1);
      if (first === "%" && last !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected closing `%`");
      } else if (last === "%" && first !== "%") {
        throw new $SyntaxError("invalid intrinsic syntax, expected opening `%`");
      }
      var result = [];
      $replace(string, rePropName, function(match, number, quote, subString) {
        result[result.length] = quote ? $replace(subString, reEscapeChar, "$1") : number || match;
      });
      return result;
    }, "stringToPath");
    var getBaseIntrinsic = /* @__PURE__ */ __name(function getBaseIntrinsic2(name, allowMissing) {
      var intrinsicName = name;
      var alias;
      if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
        alias = LEGACY_ALIASES[intrinsicName];
        intrinsicName = "%" + alias[0] + "%";
      }
      if (hasOwn(INTRINSICS, intrinsicName)) {
        var value = INTRINSICS[intrinsicName];
        if (value === needsEval) {
          value = doEval(intrinsicName);
        }
        if (typeof value === "undefined" && !allowMissing) {
          throw new $TypeError("intrinsic " + name + " exists, but is not available. Please file an issue!");
        }
        return {
          alias,
          name: intrinsicName,
          value
        };
      }
      throw new $SyntaxError("intrinsic " + name + " does not exist!");
    }, "getBaseIntrinsic");
    module2.exports = /* @__PURE__ */ __name(function GetIntrinsic(name, allowMissing) {
      if (typeof name !== "string" || name.length === 0) {
        throw new $TypeError("intrinsic name must be a non-empty string");
      }
      if (arguments.length > 1 && typeof allowMissing !== "boolean") {
        throw new $TypeError('"allowMissing" argument must be a boolean');
      }
      if ($exec(/^%?[^%]*%?$/, name) === null) {
        throw new $SyntaxError("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
      }
      var parts = stringToPath(name);
      var intrinsicBaseName = parts.length > 0 ? parts[0] : "";
      var intrinsic = getBaseIntrinsic("%" + intrinsicBaseName + "%", allowMissing);
      var intrinsicRealName = intrinsic.name;
      var value = intrinsic.value;
      var skipFurtherCaching = false;
      var alias = intrinsic.alias;
      if (alias) {
        intrinsicBaseName = alias[0];
        $spliceApply(parts, $concat([0, 1], alias));
      }
      for (var i = 1, isOwn = true; i < parts.length; i += 1) {
        var part = parts[i];
        var first = $strSlice(part, 0, 1);
        var last = $strSlice(part, -1);
        if ((first === '"' || first === "'" || first === "`" || (last === '"' || last === "'" || last === "`")) && first !== last) {
          throw new $SyntaxError("property names with quotes must have matching quotes");
        }
        if (part === "constructor" || !isOwn) {
          skipFurtherCaching = true;
        }
        intrinsicBaseName += "." + part;
        intrinsicRealName = "%" + intrinsicBaseName + "%";
        if (hasOwn(INTRINSICS, intrinsicRealName)) {
          value = INTRINSICS[intrinsicRealName];
        } else if (value != null) {
          if (!(part in value)) {
            if (!allowMissing) {
              throw new $TypeError("base intrinsic for " + name + " exists, but the property is not available.");
            }
            return void 0;
          }
          if ($gOPD && i + 1 >= parts.length) {
            var desc = $gOPD(value, part);
            isOwn = !!desc;
            if (isOwn && "get" in desc && !("originalValue" in desc.get)) {
              value = desc.get;
            } else {
              value = value[part];
            }
          } else {
            isOwn = hasOwn(value, part);
            value = value[part];
          }
          if (isOwn && !skipFurtherCaching) {
            INTRINSICS[intrinsicRealName] = value;
          }
        }
      }
      return value;
    }, "GetIntrinsic");
  }
});

// node_modules/es-define-property/index.js
var require_es_define_property = __commonJS({
  "node_modules/es-define-property/index.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var GetIntrinsic = require_get_intrinsic();
    var $defineProperty = GetIntrinsic("%Object.defineProperty%", true) || false;
    if ($defineProperty) {
      try {
        $defineProperty({}, "a", { value: 1 });
      } catch (e) {
        $defineProperty = false;
      }
    }
    module2.exports = $defineProperty;
  }
});

// node_modules/gopd/index.js
var require_gopd = __commonJS({
  "node_modules/gopd/index.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var GetIntrinsic = require_get_intrinsic();
    var $gOPD = GetIntrinsic("%Object.getOwnPropertyDescriptor%", true);
    if ($gOPD) {
      try {
        $gOPD([], "length");
      } catch (e) {
        $gOPD = null;
      }
    }
    module2.exports = $gOPD;
  }
});

// node_modules/define-data-property/index.js
var require_define_data_property = __commonJS({
  "node_modules/define-data-property/index.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var $defineProperty = require_es_define_property();
    var $SyntaxError = require_syntax();
    var $TypeError = require_type();
    var gopd = require_gopd();
    module2.exports = /* @__PURE__ */ __name(function defineDataProperty(obj, property, value) {
      if (!obj || typeof obj !== "object" && typeof obj !== "function") {
        throw new $TypeError("`obj` must be an object or a function`");
      }
      if (typeof property !== "string" && typeof property !== "symbol") {
        throw new $TypeError("`property` must be a string or a symbol`");
      }
      if (arguments.length > 3 && typeof arguments[3] !== "boolean" && arguments[3] !== null) {
        throw new $TypeError("`nonEnumerable`, if provided, must be a boolean or null");
      }
      if (arguments.length > 4 && typeof arguments[4] !== "boolean" && arguments[4] !== null) {
        throw new $TypeError("`nonWritable`, if provided, must be a boolean or null");
      }
      if (arguments.length > 5 && typeof arguments[5] !== "boolean" && arguments[5] !== null) {
        throw new $TypeError("`nonConfigurable`, if provided, must be a boolean or null");
      }
      if (arguments.length > 6 && typeof arguments[6] !== "boolean") {
        throw new $TypeError("`loose`, if provided, must be a boolean");
      }
      var nonEnumerable = arguments.length > 3 ? arguments[3] : null;
      var nonWritable = arguments.length > 4 ? arguments[4] : null;
      var nonConfigurable = arguments.length > 5 ? arguments[5] : null;
      var loose = arguments.length > 6 ? arguments[6] : false;
      var desc = !!gopd && gopd(obj, property);
      if ($defineProperty) {
        $defineProperty(obj, property, {
          configurable: nonConfigurable === null && desc ? desc.configurable : !nonConfigurable,
          enumerable: nonEnumerable === null && desc ? desc.enumerable : !nonEnumerable,
          value,
          writable: nonWritable === null && desc ? desc.writable : !nonWritable
        });
      } else if (loose || !nonEnumerable && !nonWritable && !nonConfigurable) {
        obj[property] = value;
      } else {
        throw new $SyntaxError("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
      }
    }, "defineDataProperty");
  }
});

// node_modules/has-property-descriptors/index.js
var require_has_property_descriptors = __commonJS({
  "node_modules/has-property-descriptors/index.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var $defineProperty = require_es_define_property();
    var hasPropertyDescriptors = /* @__PURE__ */ __name(function hasPropertyDescriptors2() {
      return !!$defineProperty;
    }, "hasPropertyDescriptors");
    hasPropertyDescriptors.hasArrayLengthDefineBug = /* @__PURE__ */ __name(function hasArrayLengthDefineBug() {
      if (!$defineProperty) {
        return null;
      }
      try {
        return $defineProperty([], "length", { value: 1 }).length !== 1;
      } catch (e) {
        return true;
      }
    }, "hasArrayLengthDefineBug");
    module2.exports = hasPropertyDescriptors;
  }
});

// node_modules/set-function-length/index.js
var require_set_function_length = __commonJS({
  "node_modules/set-function-length/index.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var GetIntrinsic = require_get_intrinsic();
    var define = require_define_data_property();
    var hasDescriptors = require_has_property_descriptors()();
    var gOPD = require_gopd();
    var $TypeError = require_type();
    var $floor = GetIntrinsic("%Math.floor%");
    module2.exports = /* @__PURE__ */ __name(function setFunctionLength(fn, length) {
      if (typeof fn !== "function") {
        throw new $TypeError("`fn` is not a function");
      }
      if (typeof length !== "number" || length < 0 || length > 4294967295 || $floor(length) !== length) {
        throw new $TypeError("`length` must be a positive 32-bit integer");
      }
      var loose = arguments.length > 2 && !!arguments[2];
      var functionLengthIsConfigurable = true;
      var functionLengthIsWritable = true;
      if ("length" in fn && gOPD) {
        var desc = gOPD(fn, "length");
        if (desc && !desc.configurable) {
          functionLengthIsConfigurable = false;
        }
        if (desc && !desc.writable) {
          functionLengthIsWritable = false;
        }
      }
      if (functionLengthIsConfigurable || functionLengthIsWritable || !loose) {
        if (hasDescriptors) {
          define(
            /** @type {Parameters<define>[0]} */
            fn,
            "length",
            length,
            true,
            true
          );
        } else {
          define(
            /** @type {Parameters<define>[0]} */
            fn,
            "length",
            length
          );
        }
      }
      return fn;
    }, "setFunctionLength");
  }
});

// node_modules/call-bind/index.js
var require_call_bind = __commonJS({
  "node_modules/call-bind/index.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var bind = require_function_bind();
    var GetIntrinsic = require_get_intrinsic();
    var setFunctionLength = require_set_function_length();
    var $TypeError = require_type();
    var $apply = GetIntrinsic("%Function.prototype.apply%");
    var $call = GetIntrinsic("%Function.prototype.call%");
    var $reflectApply = GetIntrinsic("%Reflect.apply%", true) || bind.call($call, $apply);
    var $defineProperty = require_es_define_property();
    var $max = GetIntrinsic("%Math.max%");
    module2.exports = /* @__PURE__ */ __name(function callBind(originalFunction) {
      if (typeof originalFunction !== "function") {
        throw new $TypeError("a function is required");
      }
      var func = $reflectApply(bind, $call, arguments);
      return setFunctionLength(
        func,
        1 + $max(0, originalFunction.length - (arguments.length - 1)),
        true
      );
    }, "callBind");
    var applyBind = /* @__PURE__ */ __name(function applyBind2() {
      return $reflectApply(bind, $apply, arguments);
    }, "applyBind");
    if ($defineProperty) {
      $defineProperty(module2.exports, "apply", { value: applyBind });
    } else {
      module2.exports.apply = applyBind;
    }
  }
});

// node_modules/call-bind/callBound.js
var require_callBound = __commonJS({
  "node_modules/call-bind/callBound.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var GetIntrinsic = require_get_intrinsic();
    var callBind = require_call_bind();
    var $indexOf = callBind(GetIntrinsic("String.prototype.indexOf"));
    module2.exports = /* @__PURE__ */ __name(function callBoundIntrinsic(name, allowMissing) {
      var intrinsic = GetIntrinsic(name, !!allowMissing);
      if (typeof intrinsic === "function" && $indexOf(name, ".prototype.") > -1) {
        return callBind(intrinsic);
      }
      return intrinsic;
    }, "callBoundIntrinsic");
  }
});

// node_modules/object-inspect/util.inspect.js
var require_util_inspect = __commonJS({
  "node_modules/object-inspect/util.inspect.js"(exports2, module2) {
    init_crypto_shim();
    module2.exports = require("util").inspect;
  }
});

// node_modules/object-inspect/index.js
var require_object_inspect = __commonJS({
  "node_modules/object-inspect/index.js"(exports2, module2) {
    init_crypto_shim();
    var hasMap = typeof Map === "function" && Map.prototype;
    var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null;
    var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === "function" ? mapSizeDescriptor.get : null;
    var mapForEach = hasMap && Map.prototype.forEach;
    var hasSet = typeof Set === "function" && Set.prototype;
    var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null;
    var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === "function" ? setSizeDescriptor.get : null;
    var setForEach = hasSet && Set.prototype.forEach;
    var hasWeakMap = typeof WeakMap === "function" && WeakMap.prototype;
    var weakMapHas = hasWeakMap ? WeakMap.prototype.has : null;
    var hasWeakSet = typeof WeakSet === "function" && WeakSet.prototype;
    var weakSetHas = hasWeakSet ? WeakSet.prototype.has : null;
    var hasWeakRef = typeof WeakRef === "function" && WeakRef.prototype;
    var weakRefDeref = hasWeakRef ? WeakRef.prototype.deref : null;
    var booleanValueOf = Boolean.prototype.valueOf;
    var objectToString = Object.prototype.toString;
    var functionToString = Function.prototype.toString;
    var $match = String.prototype.match;
    var $slice = String.prototype.slice;
    var $replace = String.prototype.replace;
    var $toUpperCase = String.prototype.toUpperCase;
    var $toLowerCase = String.prototype.toLowerCase;
    var $test = RegExp.prototype.test;
    var $concat = Array.prototype.concat;
    var $join = Array.prototype.join;
    var $arrSlice = Array.prototype.slice;
    var $floor = Math.floor;
    var bigIntValueOf = typeof BigInt === "function" ? BigInt.prototype.valueOf : null;
    var gOPS = Object.getOwnPropertySymbols;
    var symToString = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? Symbol.prototype.toString : null;
    var hasShammedSymbols = typeof Symbol === "function" && typeof Symbol.iterator === "object";
    var toStringTag = typeof Symbol === "function" && Symbol.toStringTag && (typeof Symbol.toStringTag === hasShammedSymbols ? "object" : "symbol") ? Symbol.toStringTag : null;
    var isEnumerable = Object.prototype.propertyIsEnumerable;
    var gPO = (typeof Reflect === "function" ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(O) {
      return O.__proto__;
    } : null);
    function addNumericSeparator(num, str) {
      if (num === Infinity || num === -Infinity || num !== num || num && num > -1e3 && num < 1e3 || $test.call(/e/, str)) {
        return str;
      }
      var sepRegex = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
      if (typeof num === "number") {
        var int = num < 0 ? -$floor(-num) : $floor(num);
        if (int !== num) {
          var intStr = String(int);
          var dec = $slice.call(str, intStr.length + 1);
          return $replace.call(intStr, sepRegex, "$&_") + "." + $replace.call($replace.call(dec, /([0-9]{3})/g, "$&_"), /_$/, "");
        }
      }
      return $replace.call(str, sepRegex, "$&_");
    }
    __name(addNumericSeparator, "addNumericSeparator");
    var utilInspect = require_util_inspect();
    var inspectCustom = utilInspect.custom;
    var inspectSymbol = isSymbol(inspectCustom) ? inspectCustom : null;
    var quotes = {
      __proto__: null,
      "double": '"',
      single: "'"
    };
    var quoteREs = {
      __proto__: null,
      "double": /(["\\])/g,
      single: /(['\\])/g
    };
    module2.exports = /* @__PURE__ */ __name(function inspect_(obj, options, depth, seen) {
      var opts = options || {};
      if (has(opts, "quoteStyle") && !has(quotes, opts.quoteStyle)) {
        throw new TypeError('option "quoteStyle" must be "single" or "double"');
      }
      if (has(opts, "maxStringLength") && (typeof opts.maxStringLength === "number" ? opts.maxStringLength < 0 && opts.maxStringLength !== Infinity : opts.maxStringLength !== null)) {
        throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
      }
      var customInspect = has(opts, "customInspect") ? opts.customInspect : true;
      if (typeof customInspect !== "boolean" && customInspect !== "symbol") {
        throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
      }
      if (has(opts, "indent") && opts.indent !== null && opts.indent !== "	" && !(parseInt(opts.indent, 10) === opts.indent && opts.indent > 0)) {
        throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
      }
      if (has(opts, "numericSeparator") && typeof opts.numericSeparator !== "boolean") {
        throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
      }
      var numericSeparator = opts.numericSeparator;
      if (typeof obj === "undefined") {
        return "undefined";
      }
      if (obj === null) {
        return "null";
      }
      if (typeof obj === "boolean") {
        return obj ? "true" : "false";
      }
      if (typeof obj === "string") {
        return inspectString(obj, opts);
      }
      if (typeof obj === "number") {
        if (obj === 0) {
          return Infinity / obj > 0 ? "0" : "-0";
        }
        var str = String(obj);
        return numericSeparator ? addNumericSeparator(obj, str) : str;
      }
      if (typeof obj === "bigint") {
        var bigIntStr = String(obj) + "n";
        return numericSeparator ? addNumericSeparator(obj, bigIntStr) : bigIntStr;
      }
      var maxDepth = typeof opts.depth === "undefined" ? 5 : opts.depth;
      if (typeof depth === "undefined") {
        depth = 0;
      }
      if (depth >= maxDepth && maxDepth > 0 && typeof obj === "object") {
        return isArray(obj) ? "[Array]" : "[Object]";
      }
      var indent = getIndent(opts, depth);
      if (typeof seen === "undefined") {
        seen = [];
      } else if (indexOf(seen, obj) >= 0) {
        return "[Circular]";
      }
      function inspect(value, from, noIndent) {
        if (from) {
          seen = $arrSlice.call(seen);
          seen.push(from);
        }
        if (noIndent) {
          var newOpts = {
            depth: opts.depth
          };
          if (has(opts, "quoteStyle")) {
            newOpts.quoteStyle = opts.quoteStyle;
          }
          return inspect_(value, newOpts, depth + 1, seen);
        }
        return inspect_(value, opts, depth + 1, seen);
      }
      __name(inspect, "inspect");
      if (typeof obj === "function" && !isRegExp(obj)) {
        var name = nameOf(obj);
        var keys = arrObjKeys(obj, inspect);
        return "[Function" + (name ? ": " + name : " (anonymous)") + "]" + (keys.length > 0 ? " { " + $join.call(keys, ", ") + " }" : "");
      }
      if (isSymbol(obj)) {
        var symString = hasShammedSymbols ? $replace.call(String(obj), /^(Symbol\(.*\))_[^)]*$/, "$1") : symToString.call(obj);
        return typeof obj === "object" && !hasShammedSymbols ? markBoxed(symString) : symString;
      }
      if (isElement(obj)) {
        var s = "<" + $toLowerCase.call(String(obj.nodeName));
        var attrs = obj.attributes || [];
        for (var i = 0; i < attrs.length; i++) {
          s += " " + attrs[i].name + "=" + wrapQuotes(quote(attrs[i].value), "double", opts);
        }
        s += ">";
        if (obj.childNodes && obj.childNodes.length) {
          s += "...";
        }
        s += "</" + $toLowerCase.call(String(obj.nodeName)) + ">";
        return s;
      }
      if (isArray(obj)) {
        if (obj.length === 0) {
          return "[]";
        }
        var xs = arrObjKeys(obj, inspect);
        if (indent && !singleLineValues(xs)) {
          return "[" + indentedJoin(xs, indent) + "]";
        }
        return "[ " + $join.call(xs, ", ") + " ]";
      }
      if (isError(obj)) {
        var parts = arrObjKeys(obj, inspect);
        if (!("cause" in Error.prototype) && "cause" in obj && !isEnumerable.call(obj, "cause")) {
          return "{ [" + String(obj) + "] " + $join.call($concat.call("[cause]: " + inspect(obj.cause), parts), ", ") + " }";
        }
        if (parts.length === 0) {
          return "[" + String(obj) + "]";
        }
        return "{ [" + String(obj) + "] " + $join.call(parts, ", ") + " }";
      }
      if (typeof obj === "object" && customInspect) {
        if (inspectSymbol && typeof obj[inspectSymbol] === "function" && utilInspect) {
          return utilInspect(obj, { depth: maxDepth - depth });
        } else if (customInspect !== "symbol" && typeof obj.inspect === "function") {
          return obj.inspect();
        }
      }
      if (isMap(obj)) {
        var mapParts = [];
        if (mapForEach) {
          mapForEach.call(obj, function(value, key) {
            mapParts.push(inspect(key, obj, true) + " => " + inspect(value, obj));
          });
        }
        return collectionOf("Map", mapSize.call(obj), mapParts, indent);
      }
      if (isSet(obj)) {
        var setParts = [];
        if (setForEach) {
          setForEach.call(obj, function(value) {
            setParts.push(inspect(value, obj));
          });
        }
        return collectionOf("Set", setSize.call(obj), setParts, indent);
      }
      if (isWeakMap(obj)) {
        return weakCollectionOf("WeakMap");
      }
      if (isWeakSet(obj)) {
        return weakCollectionOf("WeakSet");
      }
      if (isWeakRef(obj)) {
        return weakCollectionOf("WeakRef");
      }
      if (isNumber(obj)) {
        return markBoxed(inspect(Number(obj)));
      }
      if (isBigInt(obj)) {
        return markBoxed(inspect(bigIntValueOf.call(obj)));
      }
      if (isBoolean(obj)) {
        return markBoxed(booleanValueOf.call(obj));
      }
      if (isString(obj)) {
        return markBoxed(inspect(String(obj)));
      }
      if (typeof window !== "undefined" && obj === window) {
        return "{ [object Window] }";
      }
      if (typeof globalThis !== "undefined" && obj === globalThis || typeof global !== "undefined" && obj === global) {
        return "{ [object globalThis] }";
      }
      if (!isDate(obj) && !isRegExp(obj)) {
        var ys = arrObjKeys(obj, inspect);
        var isPlainObject = gPO ? gPO(obj) === Object.prototype : obj instanceof Object || obj.constructor === Object;
        var protoTag = obj instanceof Object ? "" : "null prototype";
        var stringTag = !isPlainObject && toStringTag && Object(obj) === obj && toStringTag in obj ? $slice.call(toStr(obj), 8, -1) : protoTag ? "Object" : "";
        var constructorTag = isPlainObject || typeof obj.constructor !== "function" ? "" : obj.constructor.name ? obj.constructor.name + " " : "";
        var tag = constructorTag + (stringTag || protoTag ? "[" + $join.call($concat.call([], stringTag || [], protoTag || []), ": ") + "] " : "");
        if (ys.length === 0) {
          return tag + "{}";
        }
        if (indent) {
          return tag + "{" + indentedJoin(ys, indent) + "}";
        }
        return tag + "{ " + $join.call(ys, ", ") + " }";
      }
      return String(obj);
    }, "inspect_");
    function wrapQuotes(s, defaultStyle, opts) {
      var style = opts.quoteStyle || defaultStyle;
      var quoteChar = quotes[style];
      return quoteChar + s + quoteChar;
    }
    __name(wrapQuotes, "wrapQuotes");
    function quote(s) {
      return $replace.call(String(s), /"/g, "&quot;");
    }
    __name(quote, "quote");
    function isArray(obj) {
      return toStr(obj) === "[object Array]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    __name(isArray, "isArray");
    function isDate(obj) {
      return toStr(obj) === "[object Date]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    __name(isDate, "isDate");
    function isRegExp(obj) {
      return toStr(obj) === "[object RegExp]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    __name(isRegExp, "isRegExp");
    function isError(obj) {
      return toStr(obj) === "[object Error]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    __name(isError, "isError");
    function isString(obj) {
      return toStr(obj) === "[object String]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    __name(isString, "isString");
    function isNumber(obj) {
      return toStr(obj) === "[object Number]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    __name(isNumber, "isNumber");
    function isBoolean(obj) {
      return toStr(obj) === "[object Boolean]" && (!toStringTag || !(typeof obj === "object" && toStringTag in obj));
    }
    __name(isBoolean, "isBoolean");
    function isSymbol(obj) {
      if (hasShammedSymbols) {
        return obj && typeof obj === "object" && obj instanceof Symbol;
      }
      if (typeof obj === "symbol") {
        return true;
      }
      if (!obj || typeof obj !== "object" || !symToString) {
        return false;
      }
      try {
        symToString.call(obj);
        return true;
      } catch (e) {
      }
      return false;
    }
    __name(isSymbol, "isSymbol");
    function isBigInt(obj) {
      if (!obj || typeof obj !== "object" || !bigIntValueOf) {
        return false;
      }
      try {
        bigIntValueOf.call(obj);
        return true;
      } catch (e) {
      }
      return false;
    }
    __name(isBigInt, "isBigInt");
    var hasOwn = Object.prototype.hasOwnProperty || function(key) {
      return key in this;
    };
    function has(obj, key) {
      return hasOwn.call(obj, key);
    }
    __name(has, "has");
    function toStr(obj) {
      return objectToString.call(obj);
    }
    __name(toStr, "toStr");
    function nameOf(f) {
      if (f.name) {
        return f.name;
      }
      var m = $match.call(functionToString.call(f), /^function\s*([\w$]+)/);
      if (m) {
        return m[1];
      }
      return null;
    }
    __name(nameOf, "nameOf");
    function indexOf(xs, x) {
      if (xs.indexOf) {
        return xs.indexOf(x);
      }
      for (var i = 0, l = xs.length; i < l; i++) {
        if (xs[i] === x) {
          return i;
        }
      }
      return -1;
    }
    __name(indexOf, "indexOf");
    function isMap(x) {
      if (!mapSize || !x || typeof x !== "object") {
        return false;
      }
      try {
        mapSize.call(x);
        try {
          setSize.call(x);
        } catch (s) {
          return true;
        }
        return x instanceof Map;
      } catch (e) {
      }
      return false;
    }
    __name(isMap, "isMap");
    function isWeakMap(x) {
      if (!weakMapHas || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakMapHas.call(x, weakMapHas);
        try {
          weakSetHas.call(x, weakSetHas);
        } catch (s) {
          return true;
        }
        return x instanceof WeakMap;
      } catch (e) {
      }
      return false;
    }
    __name(isWeakMap, "isWeakMap");
    function isWeakRef(x) {
      if (!weakRefDeref || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakRefDeref.call(x);
        return true;
      } catch (e) {
      }
      return false;
    }
    __name(isWeakRef, "isWeakRef");
    function isSet(x) {
      if (!setSize || !x || typeof x !== "object") {
        return false;
      }
      try {
        setSize.call(x);
        try {
          mapSize.call(x);
        } catch (m) {
          return true;
        }
        return x instanceof Set;
      } catch (e) {
      }
      return false;
    }
    __name(isSet, "isSet");
    function isWeakSet(x) {
      if (!weakSetHas || !x || typeof x !== "object") {
        return false;
      }
      try {
        weakSetHas.call(x, weakSetHas);
        try {
          weakMapHas.call(x, weakMapHas);
        } catch (s) {
          return true;
        }
        return x instanceof WeakSet;
      } catch (e) {
      }
      return false;
    }
    __name(isWeakSet, "isWeakSet");
    function isElement(x) {
      if (!x || typeof x !== "object") {
        return false;
      }
      if (typeof HTMLElement !== "undefined" && x instanceof HTMLElement) {
        return true;
      }
      return typeof x.nodeName === "string" && typeof x.getAttribute === "function";
    }
    __name(isElement, "isElement");
    function inspectString(str, opts) {
      if (str.length > opts.maxStringLength) {
        var remaining = str.length - opts.maxStringLength;
        var trailer = "... " + remaining + " more character" + (remaining > 1 ? "s" : "");
        return inspectString($slice.call(str, 0, opts.maxStringLength), opts) + trailer;
      }
      var quoteRE = quoteREs[opts.quoteStyle || "single"];
      quoteRE.lastIndex = 0;
      var s = $replace.call($replace.call(str, quoteRE, "\\$1"), /[\x00-\x1f]/g, lowbyte);
      return wrapQuotes(s, "single", opts);
    }
    __name(inspectString, "inspectString");
    function lowbyte(c) {
      var n = c.charCodeAt(0);
      var x = {
        8: "b",
        9: "t",
        10: "n",
        12: "f",
        13: "r"
      }[n];
      if (x) {
        return "\\" + x;
      }
      return "\\x" + (n < 16 ? "0" : "") + $toUpperCase.call(n.toString(16));
    }
    __name(lowbyte, "lowbyte");
    function markBoxed(str) {
      return "Object(" + str + ")";
    }
    __name(markBoxed, "markBoxed");
    function weakCollectionOf(type) {
      return type + " { ? }";
    }
    __name(weakCollectionOf, "weakCollectionOf");
    function collectionOf(type, size, entries, indent) {
      var joinedEntries = indent ? indentedJoin(entries, indent) : $join.call(entries, ", ");
      return type + " (" + size + ") {" + joinedEntries + "}";
    }
    __name(collectionOf, "collectionOf");
    function singleLineValues(xs) {
      for (var i = 0; i < xs.length; i++) {
        if (indexOf(xs[i], "\n") >= 0) {
          return false;
        }
      }
      return true;
    }
    __name(singleLineValues, "singleLineValues");
    function getIndent(opts, depth) {
      var baseIndent;
      if (opts.indent === "	") {
        baseIndent = "	";
      } else if (typeof opts.indent === "number" && opts.indent > 0) {
        baseIndent = $join.call(Array(opts.indent + 1), " ");
      } else {
        return null;
      }
      return {
        base: baseIndent,
        prev: $join.call(Array(depth + 1), baseIndent)
      };
    }
    __name(getIndent, "getIndent");
    function indentedJoin(xs, indent) {
      if (xs.length === 0) {
        return "";
      }
      var lineJoiner = "\n" + indent.prev + indent.base;
      return lineJoiner + $join.call(xs, "," + lineJoiner) + "\n" + indent.prev;
    }
    __name(indentedJoin, "indentedJoin");
    function arrObjKeys(obj, inspect) {
      var isArr = isArray(obj);
      var xs = [];
      if (isArr) {
        xs.length = obj.length;
        for (var i = 0; i < obj.length; i++) {
          xs[i] = has(obj, i) ? inspect(obj[i], obj) : "";
        }
      }
      var syms = typeof gOPS === "function" ? gOPS(obj) : [];
      var symMap;
      if (hasShammedSymbols) {
        symMap = {};
        for (var k = 0; k < syms.length; k++) {
          symMap["$" + syms[k]] = syms[k];
        }
      }
      for (var key in obj) {
        if (!has(obj, key)) {
          continue;
        }
        if (isArr && String(Number(key)) === key && key < obj.length) {
          continue;
        }
        if (hasShammedSymbols && symMap["$" + key] instanceof Symbol) {
          continue;
        } else if ($test.call(/[^\w$]/, key)) {
          xs.push(inspect(key, obj) + ": " + inspect(obj[key], obj));
        } else {
          xs.push(key + ": " + inspect(obj[key], obj));
        }
      }
      if (typeof gOPS === "function") {
        for (var j = 0; j < syms.length; j++) {
          if (isEnumerable.call(obj, syms[j])) {
            xs.push("[" + inspect(syms[j]) + "]: " + inspect(obj[syms[j]], obj));
          }
        }
      }
      return xs;
    }
    __name(arrObjKeys, "arrObjKeys");
  }
});

// node_modules/side-channel/index.js
var require_side_channel = __commonJS({
  "node_modules/side-channel/index.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var GetIntrinsic = require_get_intrinsic();
    var callBound = require_callBound();
    var inspect = require_object_inspect();
    var $TypeError = require_type();
    var $WeakMap = GetIntrinsic("%WeakMap%", true);
    var $Map = GetIntrinsic("%Map%", true);
    var $weakMapGet = callBound("WeakMap.prototype.get", true);
    var $weakMapSet = callBound("WeakMap.prototype.set", true);
    var $weakMapHas = callBound("WeakMap.prototype.has", true);
    var $mapGet = callBound("Map.prototype.get", true);
    var $mapSet = callBound("Map.prototype.set", true);
    var $mapHas = callBound("Map.prototype.has", true);
    var listGetNode = /* @__PURE__ */ __name(function(list, key) {
      var prev = list;
      var curr;
      for (; (curr = prev.next) !== null; prev = curr) {
        if (curr.key === key) {
          prev.next = curr.next;
          curr.next = /** @type {NonNullable<typeof list.next>} */
          list.next;
          list.next = curr;
          return curr;
        }
      }
    }, "listGetNode");
    var listGet = /* @__PURE__ */ __name(function(objects, key) {
      var node = listGetNode(objects, key);
      return node && node.value;
    }, "listGet");
    var listSet = /* @__PURE__ */ __name(function(objects, key, value) {
      var node = listGetNode(objects, key);
      if (node) {
        node.value = value;
      } else {
        objects.next = /** @type {import('.').ListNode<typeof value>} */
        {
          // eslint-disable-line no-param-reassign, no-extra-parens
          key,
          next: objects.next,
          value
        };
      }
    }, "listSet");
    var listHas = /* @__PURE__ */ __name(function(objects, key) {
      return !!listGetNode(objects, key);
    }, "listHas");
    module2.exports = /* @__PURE__ */ __name(function getSideChannel() {
      var $wm;
      var $m;
      var $o;
      var channel = {
        assert: function(key) {
          if (!channel.has(key)) {
            throw new $TypeError("Side channel does not contain " + inspect(key));
          }
        },
        get: function(key) {
          if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
            if ($wm) {
              return $weakMapGet($wm, key);
            }
          } else if ($Map) {
            if ($m) {
              return $mapGet($m, key);
            }
          } else {
            if ($o) {
              return listGet($o, key);
            }
          }
        },
        has: function(key) {
          if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
            if ($wm) {
              return $weakMapHas($wm, key);
            }
          } else if ($Map) {
            if ($m) {
              return $mapHas($m, key);
            }
          } else {
            if ($o) {
              return listHas($o, key);
            }
          }
          return false;
        },
        set: function(key, value) {
          if ($WeakMap && key && (typeof key === "object" || typeof key === "function")) {
            if (!$wm) {
              $wm = new $WeakMap();
            }
            $weakMapSet($wm, key, value);
          } else if ($Map) {
            if (!$m) {
              $m = new $Map();
            }
            $mapSet($m, key, value);
          } else {
            if (!$o) {
              $o = { key: {}, next: null };
            }
            listSet($o, key, value);
          }
        }
      };
      return channel;
    }, "getSideChannel");
  }
});

// node_modules/qs/lib/formats.js
var require_formats = __commonJS({
  "node_modules/qs/lib/formats.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var replace = String.prototype.replace;
    var percentTwenties = /%20/g;
    var Format = {
      RFC1738: "RFC1738",
      RFC3986: "RFC3986"
    };
    module2.exports = {
      "default": Format.RFC3986,
      formatters: {
        RFC1738: function(value) {
          return replace.call(value, percentTwenties, "+");
        },
        RFC3986: function(value) {
          return String(value);
        }
      },
      RFC1738: Format.RFC1738,
      RFC3986: Format.RFC3986
    };
  }
});

// node_modules/qs/lib/utils.js
var require_utils = __commonJS({
  "node_modules/qs/lib/utils.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var formats = require_formats();
    var has = Object.prototype.hasOwnProperty;
    var isArray = Array.isArray;
    var hexTable = function() {
      var array = [];
      for (var i = 0; i < 256; ++i) {
        array.push("%" + ((i < 16 ? "0" : "") + i.toString(16)).toUpperCase());
      }
      return array;
    }();
    var compactQueue = /* @__PURE__ */ __name(function compactQueue2(queue) {
      while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];
        if (isArray(obj)) {
          var compacted = [];
          for (var j = 0; j < obj.length; ++j) {
            if (typeof obj[j] !== "undefined") {
              compacted.push(obj[j]);
            }
          }
          item.obj[item.prop] = compacted;
        }
      }
    }, "compactQueue");
    var arrayToObject = /* @__PURE__ */ __name(function arrayToObject2(source, options) {
      var obj = options && options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== "undefined") {
          obj[i] = source[i];
        }
      }
      return obj;
    }, "arrayToObject");
    var merge = /* @__PURE__ */ __name(function merge2(target, source, options) {
      if (!source) {
        return target;
      }
      if (typeof source !== "object") {
        if (isArray(target)) {
          target.push(source);
        } else if (target && typeof target === "object") {
          if (options && (options.plainObjects || options.allowPrototypes) || !has.call(Object.prototype, source)) {
            target[source] = true;
          }
        } else {
          return [target, source];
        }
        return target;
      }
      if (!target || typeof target !== "object") {
        return [target].concat(source);
      }
      var mergeTarget = target;
      if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options);
      }
      if (isArray(target) && isArray(source)) {
        source.forEach(function(item, i) {
          if (has.call(target, i)) {
            var targetItem = target[i];
            if (targetItem && typeof targetItem === "object" && item && typeof item === "object") {
              target[i] = merge2(targetItem, item, options);
            } else {
              target.push(item);
            }
          } else {
            target[i] = item;
          }
        });
        return target;
      }
      return Object.keys(source).reduce(function(acc, key) {
        var value = source[key];
        if (has.call(acc, key)) {
          acc[key] = merge2(acc[key], value, options);
        } else {
          acc[key] = value;
        }
        return acc;
      }, mergeTarget);
    }, "merge");
    var assign = /* @__PURE__ */ __name(function assignSingleSource(target, source) {
      return Object.keys(source).reduce(function(acc, key) {
        acc[key] = source[key];
        return acc;
      }, target);
    }, "assignSingleSource");
    var decode = /* @__PURE__ */ __name(function(str, decoder, charset) {
      var strWithoutPlus = str.replace(/\+/g, " ");
      if (charset === "iso-8859-1") {
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
      }
      try {
        return decodeURIComponent(strWithoutPlus);
      } catch (e) {
        return strWithoutPlus;
      }
    }, "decode");
    var encode = /* @__PURE__ */ __name(function encode2(str, defaultEncoder, charset, kind, format) {
      if (str.length === 0) {
        return str;
      }
      var string = str;
      if (typeof str === "symbol") {
        string = Symbol.prototype.toString.call(str);
      } else if (typeof str !== "string") {
        string = String(str);
      }
      if (charset === "iso-8859-1") {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function($0) {
          return "%26%23" + parseInt($0.slice(2), 16) + "%3B";
        });
      }
      var out = "";
      for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);
        if (c === 45 || c === 46 || c === 95 || c === 126 || c >= 48 && c <= 57 || c >= 65 && c <= 90 || c >= 97 && c <= 122 || format === formats.RFC1738 && (c === 40 || c === 41)) {
          out += string.charAt(i);
          continue;
        }
        if (c < 128) {
          out = out + hexTable[c];
          continue;
        }
        if (c < 2048) {
          out = out + (hexTable[192 | c >> 6] + hexTable[128 | c & 63]);
          continue;
        }
        if (c < 55296 || c >= 57344) {
          out = out + (hexTable[224 | c >> 12] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63]);
          continue;
        }
        i += 1;
        c = 65536 + ((c & 1023) << 10 | string.charCodeAt(i) & 1023);
        out += hexTable[240 | c >> 18] + hexTable[128 | c >> 12 & 63] + hexTable[128 | c >> 6 & 63] + hexTable[128 | c & 63];
      }
      return out;
    }, "encode");
    var compact = /* @__PURE__ */ __name(function compact2(value) {
      var queue = [{ obj: { o: value }, prop: "o" }];
      var refs = [];
      for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];
        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
          var key = keys[j];
          var val = obj[key];
          if (typeof val === "object" && val !== null && refs.indexOf(val) === -1) {
            queue.push({ obj, prop: key });
            refs.push(val);
          }
        }
      }
      compactQueue(queue);
      return value;
    }, "compact");
    var isRegExp = /* @__PURE__ */ __name(function isRegExp2(obj) {
      return Object.prototype.toString.call(obj) === "[object RegExp]";
    }, "isRegExp");
    var isBuffer = /* @__PURE__ */ __name(function isBuffer2(obj) {
      if (!obj || typeof obj !== "object") {
        return false;
      }
      return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
    }, "isBuffer");
    var combine = /* @__PURE__ */ __name(function combine2(a, b) {
      return [].concat(a, b);
    }, "combine");
    var maybeMap = /* @__PURE__ */ __name(function maybeMap2(val, fn) {
      if (isArray(val)) {
        var mapped = [];
        for (var i = 0; i < val.length; i += 1) {
          mapped.push(fn(val[i]));
        }
        return mapped;
      }
      return fn(val);
    }, "maybeMap");
    module2.exports = {
      arrayToObject,
      assign,
      combine,
      compact,
      decode,
      encode,
      isBuffer,
      isRegExp,
      maybeMap,
      merge
    };
  }
});

// node_modules/qs/lib/stringify.js
var require_stringify = __commonJS({
  "node_modules/qs/lib/stringify.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var getSideChannel = require_side_channel();
    var utils = require_utils();
    var formats = require_formats();
    var has = Object.prototype.hasOwnProperty;
    var arrayPrefixGenerators = {
      brackets: /* @__PURE__ */ __name(function brackets(prefix) {
        return prefix + "[]";
      }, "brackets"),
      comma: "comma",
      indices: /* @__PURE__ */ __name(function indices(prefix, key) {
        return prefix + "[" + key + "]";
      }, "indices"),
      repeat: /* @__PURE__ */ __name(function repeat(prefix) {
        return prefix;
      }, "repeat")
    };
    var isArray = Array.isArray;
    var push = Array.prototype.push;
    var pushToArray = /* @__PURE__ */ __name(function(arr, valueOrArray) {
      push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
    }, "pushToArray");
    var toISO = Date.prototype.toISOString;
    var defaultFormat = formats["default"];
    var defaults = {
      addQueryPrefix: false,
      allowDots: false,
      charset: "utf-8",
      charsetSentinel: false,
      delimiter: "&",
      encode: true,
      encoder: utils.encode,
      encodeValuesOnly: false,
      format: defaultFormat,
      formatter: formats.formatters[defaultFormat],
      // deprecated
      indices: false,
      serializeDate: /* @__PURE__ */ __name(function serializeDate(date) {
        return toISO.call(date);
      }, "serializeDate"),
      skipNulls: false,
      strictNullHandling: false
    };
    var isNonNullishPrimitive = /* @__PURE__ */ __name(function isNonNullishPrimitive2(v) {
      return typeof v === "string" || typeof v === "number" || typeof v === "boolean" || typeof v === "symbol" || typeof v === "bigint";
    }, "isNonNullishPrimitive");
    var sentinel = {};
    var stringify = /* @__PURE__ */ __name(function stringify2(object, prefix, generateArrayPrefix, commaRoundTrip, strictNullHandling, skipNulls, encoder, filter, sort, allowDots, serializeDate, format, formatter, encodeValuesOnly, charset, sideChannel) {
      var obj = object;
      var tmpSc = sideChannel;
      var step = 0;
      var findFlag = false;
      while ((tmpSc = tmpSc.get(sentinel)) !== void 0 && !findFlag) {
        var pos = tmpSc.get(object);
        step += 1;
        if (typeof pos !== "undefined") {
          if (pos === step) {
            throw new RangeError("Cyclic object value");
          } else {
            findFlag = true;
          }
        }
        if (typeof tmpSc.get(sentinel) === "undefined") {
          step = 0;
        }
      }
      if (typeof filter === "function") {
        obj = filter(prefix, obj);
      } else if (obj instanceof Date) {
        obj = serializeDate(obj);
      } else if (generateArrayPrefix === "comma" && isArray(obj)) {
        obj = utils.maybeMap(obj, function(value2) {
          if (value2 instanceof Date) {
            return serializeDate(value2);
          }
          return value2;
        });
      }
      if (obj === null) {
        if (strictNullHandling) {
          return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset, "key", format) : prefix;
        }
        obj = "";
      }
      if (isNonNullishPrimitive(obj) || utils.isBuffer(obj)) {
        if (encoder) {
          var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset, "key", format);
          return [formatter(keyValue) + "=" + formatter(encoder(obj, defaults.encoder, charset, "value", format))];
        }
        return [formatter(prefix) + "=" + formatter(String(obj))];
      }
      var values = [];
      if (typeof obj === "undefined") {
        return values;
      }
      var objKeys;
      if (generateArrayPrefix === "comma" && isArray(obj)) {
        if (encodeValuesOnly && encoder) {
          obj = utils.maybeMap(obj, encoder);
        }
        objKeys = [{ value: obj.length > 0 ? obj.join(",") || null : void 0 }];
      } else if (isArray(filter)) {
        objKeys = filter;
      } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
      }
      var adjustedPrefix = commaRoundTrip && isArray(obj) && obj.length === 1 ? prefix + "[]" : prefix;
      for (var j = 0; j < objKeys.length; ++j) {
        var key = objKeys[j];
        var value = typeof key === "object" && typeof key.value !== "undefined" ? key.value : obj[key];
        if (skipNulls && value === null) {
          continue;
        }
        var keyPrefix = isArray(obj) ? typeof generateArrayPrefix === "function" ? generateArrayPrefix(adjustedPrefix, key) : adjustedPrefix : adjustedPrefix + (allowDots ? "." + key : "[" + key + "]");
        sideChannel.set(object, step);
        var valueSideChannel = getSideChannel();
        valueSideChannel.set(sentinel, sideChannel);
        pushToArray(values, stringify2(
          value,
          keyPrefix,
          generateArrayPrefix,
          commaRoundTrip,
          strictNullHandling,
          skipNulls,
          generateArrayPrefix === "comma" && encodeValuesOnly && isArray(obj) ? null : encoder,
          filter,
          sort,
          allowDots,
          serializeDate,
          format,
          formatter,
          encodeValuesOnly,
          charset,
          valueSideChannel
        ));
      }
      return values;
    }, "stringify");
    var normalizeStringifyOptions = /* @__PURE__ */ __name(function normalizeStringifyOptions2(opts) {
      if (!opts) {
        return defaults;
      }
      if (opts.encoder !== null && typeof opts.encoder !== "undefined" && typeof opts.encoder !== "function") {
        throw new TypeError("Encoder has to be a function.");
      }
      var charset = opts.charset || defaults.charset;
      if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      }
      var format = formats["default"];
      if (typeof opts.format !== "undefined") {
        if (!has.call(formats.formatters, opts.format)) {
          throw new TypeError("Unknown format option provided.");
        }
        format = opts.format;
      }
      var formatter = formats.formatters[format];
      var filter = defaults.filter;
      if (typeof opts.filter === "function" || isArray(opts.filter)) {
        filter = opts.filter;
      }
      return {
        addQueryPrefix: typeof opts.addQueryPrefix === "boolean" ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots: typeof opts.allowDots === "undefined" ? defaults.allowDots : !!opts.allowDots,
        charset,
        charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
        delimiter: typeof opts.delimiter === "undefined" ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === "boolean" ? opts.encode : defaults.encode,
        encoder: typeof opts.encoder === "function" ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === "boolean" ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter,
        format,
        formatter,
        serializeDate: typeof opts.serializeDate === "function" ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === "boolean" ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === "function" ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
      };
    }, "normalizeStringifyOptions");
    module2.exports = function(object, opts) {
      var obj = object;
      var options = normalizeStringifyOptions(opts);
      var objKeys;
      var filter;
      if (typeof options.filter === "function") {
        filter = options.filter;
        obj = filter("", obj);
      } else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
      }
      var keys = [];
      if (typeof obj !== "object" || obj === null) {
        return "";
      }
      var arrayFormat;
      if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
      } else if (opts && "indices" in opts) {
        arrayFormat = opts.indices ? "indices" : "repeat";
      } else {
        arrayFormat = "indices";
      }
      var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];
      if (opts && "commaRoundTrip" in opts && typeof opts.commaRoundTrip !== "boolean") {
        throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
      }
      var commaRoundTrip = generateArrayPrefix === "comma" && opts && opts.commaRoundTrip;
      if (!objKeys) {
        objKeys = Object.keys(obj);
      }
      if (options.sort) {
        objKeys.sort(options.sort);
      }
      var sideChannel = getSideChannel();
      for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];
        if (options.skipNulls && obj[key] === null) {
          continue;
        }
        pushToArray(keys, stringify(
          obj[key],
          key,
          generateArrayPrefix,
          commaRoundTrip,
          options.strictNullHandling,
          options.skipNulls,
          options.encode ? options.encoder : null,
          options.filter,
          options.sort,
          options.allowDots,
          options.serializeDate,
          options.format,
          options.formatter,
          options.encodeValuesOnly,
          options.charset,
          sideChannel
        ));
      }
      var joined = keys.join(options.delimiter);
      var prefix = options.addQueryPrefix === true ? "?" : "";
      if (options.charsetSentinel) {
        if (options.charset === "iso-8859-1") {
          prefix += "utf8=%26%2310003%3B&";
        } else {
          prefix += "utf8=%E2%9C%93&";
        }
      }
      return joined.length > 0 ? prefix + joined : "";
    };
  }
});

// node_modules/qs/lib/parse.js
var require_parse = __commonJS({
  "node_modules/qs/lib/parse.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var utils = require_utils();
    var has = Object.prototype.hasOwnProperty;
    var isArray = Array.isArray;
    var defaults = {
      allowDots: false,
      allowPrototypes: false,
      allowSparse: false,
      arrayLimit: 20,
      charset: "utf-8",
      charsetSentinel: false,
      comma: false,
      decoder: utils.decode,
      delimiter: "&",
      depth: 5,
      ignoreQueryPrefix: false,
      interpretNumericEntities: false,
      parameterLimit: 1e3,
      parseArrays: true,
      plainObjects: false,
      strictNullHandling: false
    };
    var interpretNumericEntities = /* @__PURE__ */ __name(function(str) {
      return str.replace(/&#(\d+);/g, function($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
      });
    }, "interpretNumericEntities");
    var parseArrayValue = /* @__PURE__ */ __name(function(val, options) {
      if (val && typeof val === "string" && options.comma && val.indexOf(",") > -1) {
        return val.split(",");
      }
      return val;
    }, "parseArrayValue");
    var isoSentinel = "utf8=%26%2310003%3B";
    var charsetSentinel = "utf8=%E2%9C%93";
    var parseValues = /* @__PURE__ */ __name(function parseQueryStringValues(str, options) {
      var obj = { __proto__: null };
      var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, "") : str;
      var limit = options.parameterLimit === Infinity ? void 0 : options.parameterLimit;
      var parts = cleanStr.split(options.delimiter, limit);
      var skipIndex = -1;
      var i;
      var charset = options.charset;
      if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
          if (parts[i].indexOf("utf8=") === 0) {
            if (parts[i] === charsetSentinel) {
              charset = "utf-8";
            } else if (parts[i] === isoSentinel) {
              charset = "iso-8859-1";
            }
            skipIndex = i;
            i = parts.length;
          }
        }
      }
      for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
          continue;
        }
        var part = parts[i];
        var bracketEqualsPos = part.indexOf("]=");
        var pos = bracketEqualsPos === -1 ? part.indexOf("=") : bracketEqualsPos + 1;
        var key, val;
        if (pos === -1) {
          key = options.decoder(part, defaults.decoder, charset, "key");
          val = options.strictNullHandling ? null : "";
        } else {
          key = options.decoder(part.slice(0, pos), defaults.decoder, charset, "key");
          val = utils.maybeMap(
            parseArrayValue(part.slice(pos + 1), options),
            function(encodedVal) {
              return options.decoder(encodedVal, defaults.decoder, charset, "value");
            }
          );
        }
        if (val && options.interpretNumericEntities && charset === "iso-8859-1") {
          val = interpretNumericEntities(val);
        }
        if (part.indexOf("[]=") > -1) {
          val = isArray(val) ? [val] : val;
        }
        if (has.call(obj, key)) {
          obj[key] = utils.combine(obj[key], val);
        } else {
          obj[key] = val;
        }
      }
      return obj;
    }, "parseQueryStringValues");
    var parseObject = /* @__PURE__ */ __name(function(chain, val, options, valuesParsed) {
      var leaf = valuesParsed ? val : parseArrayValue(val, options);
      for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];
        if (root === "[]" && options.parseArrays) {
          obj = [].concat(leaf);
        } else {
          obj = options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
          var cleanRoot = root.charAt(0) === "[" && root.charAt(root.length - 1) === "]" ? root.slice(1, -1) : root;
          var index = parseInt(cleanRoot, 10);
          if (!options.parseArrays && cleanRoot === "") {
            obj = { 0: leaf };
          } else if (!isNaN(index) && root !== cleanRoot && String(index) === cleanRoot && index >= 0 && (options.parseArrays && index <= options.arrayLimit)) {
            obj = [];
            obj[index] = leaf;
          } else if (cleanRoot !== "__proto__") {
            obj[cleanRoot] = leaf;
          }
        }
        leaf = obj;
      }
      return leaf;
    }, "parseObject");
    var parseKeys = /* @__PURE__ */ __name(function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
      if (!givenKey) {
        return;
      }
      var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, "[$1]") : givenKey;
      var brackets = /(\[[^[\]]*])/;
      var child = /(\[[^[\]]*])/g;
      var segment = options.depth > 0 && brackets.exec(key);
      var parent = segment ? key.slice(0, segment.index) : key;
      var keys = [];
      if (parent) {
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
          if (!options.allowPrototypes) {
            return;
          }
        }
        keys.push(parent);
      }
      var i = 0;
      while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
          if (!options.allowPrototypes) {
            return;
          }
        }
        keys.push(segment[1]);
      }
      if (segment) {
        keys.push("[" + key.slice(segment.index) + "]");
      }
      return parseObject(keys, val, options, valuesParsed);
    }, "parseQueryStringKeys");
    var normalizeParseOptions = /* @__PURE__ */ __name(function normalizeParseOptions2(opts) {
      if (!opts) {
        return defaults;
      }
      if (opts.decoder !== null && opts.decoder !== void 0 && typeof opts.decoder !== "function") {
        throw new TypeError("Decoder has to be a function.");
      }
      if (typeof opts.charset !== "undefined" && opts.charset !== "utf-8" && opts.charset !== "iso-8859-1") {
        throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
      }
      var charset = typeof opts.charset === "undefined" ? defaults.charset : opts.charset;
      return {
        allowDots: typeof opts.allowDots === "undefined" ? defaults.allowDots : !!opts.allowDots,
        allowPrototypes: typeof opts.allowPrototypes === "boolean" ? opts.allowPrototypes : defaults.allowPrototypes,
        allowSparse: typeof opts.allowSparse === "boolean" ? opts.allowSparse : defaults.allowSparse,
        arrayLimit: typeof opts.arrayLimit === "number" ? opts.arrayLimit : defaults.arrayLimit,
        charset,
        charsetSentinel: typeof opts.charsetSentinel === "boolean" ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === "boolean" ? opts.comma : defaults.comma,
        decoder: typeof opts.decoder === "function" ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === "string" || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        // eslint-disable-next-line no-implicit-coercion, no-extra-parens
        depth: typeof opts.depth === "number" || opts.depth === false ? +opts.depth : defaults.depth,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === "boolean" ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === "number" ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === "boolean" ? opts.plainObjects : defaults.plainObjects,
        strictNullHandling: typeof opts.strictNullHandling === "boolean" ? opts.strictNullHandling : defaults.strictNullHandling
      };
    }, "normalizeParseOptions");
    module2.exports = function(str, opts) {
      var options = normalizeParseOptions(opts);
      if (str === "" || str === null || typeof str === "undefined") {
        return options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      }
      var tempObj = typeof str === "string" ? parseValues(str, options) : str;
      var obj = options.plainObjects ? /* @__PURE__ */ Object.create(null) : {};
      var keys = Object.keys(tempObj);
      for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options, typeof str === "string");
        obj = utils.merge(obj, newObj, options);
      }
      if (options.allowSparse === true) {
        return obj;
      }
      return utils.compact(obj);
    };
  }
});

// node_modules/qs/lib/index.js
var require_lib = __commonJS({
  "node_modules/qs/lib/index.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var stringify = require_stringify();
    var parse = require_parse();
    var formats = require_formats();
    module2.exports = {
      formats,
      parse,
      stringify
    };
  }
});

// node_modules/requires-port/index.js
var require_requires_port = __commonJS({
  "node_modules/requires-port/index.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    module2.exports = /* @__PURE__ */ __name(function required(port, protocol) {
      protocol = protocol.split(":")[0];
      port = +port;
      if (!port)
        return false;
      switch (protocol) {
        case "http":
        case "ws":
          return port !== 80;
        case "https":
        case "wss":
          return port !== 443;
        case "ftp":
          return port !== 21;
        case "gopher":
          return port !== 70;
        case "file":
          return false;
      }
      return port !== 0;
    }, "required");
  }
});

// node_modules/querystringify/index.js
var require_querystringify = __commonJS({
  "node_modules/querystringify/index.js"(exports2) {
    "use strict";
    init_crypto_shim();
    var has = Object.prototype.hasOwnProperty;
    var undef;
    function decode(input) {
      try {
        return decodeURIComponent(input.replace(/\+/g, " "));
      } catch (e) {
        return null;
      }
    }
    __name(decode, "decode");
    function encode(input) {
      try {
        return encodeURIComponent(input);
      } catch (e) {
        return null;
      }
    }
    __name(encode, "encode");
    function querystring(query) {
      var parser = /([^=?#&]+)=?([^&]*)/g, result = {}, part;
      while (part = parser.exec(query)) {
        var key = decode(part[1]), value = decode(part[2]);
        if (key === null || value === null || key in result)
          continue;
        result[key] = value;
      }
      return result;
    }
    __name(querystring, "querystring");
    function querystringify(obj, prefix) {
      prefix = prefix || "";
      var pairs = [], value, key;
      if ("string" !== typeof prefix)
        prefix = "?";
      for (key in obj) {
        if (has.call(obj, key)) {
          value = obj[key];
          if (!value && (value === null || value === undef || isNaN(value))) {
            value = "";
          }
          key = encode(key);
          value = encode(value);
          if (key === null || value === null)
            continue;
          pairs.push(key + "=" + value);
        }
      }
      return pairs.length ? prefix + pairs.join("&") : "";
    }
    __name(querystringify, "querystringify");
    exports2.stringify = querystringify;
    exports2.parse = querystring;
  }
});

// node_modules/url-parse/index.js
var require_url_parse = __commonJS({
  "node_modules/url-parse/index.js"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var required = require_requires_port();
    var qs = require_querystringify();
    var controlOrWhitespace = /^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/;
    var CRHTLF = /[\n\r\t]/g;
    var slashes = /^[A-Za-z][A-Za-z0-9+-.]*:\/\//;
    var port = /:\d+$/;
    var protocolre = /^([a-z][a-z0-9.+-]*:)?(\/\/)?([\\/]+)?([\S\s]*)/i;
    var windowsDriveLetter = /^[a-zA-Z]:/;
    function trimLeft(str) {
      return (str ? str : "").toString().replace(controlOrWhitespace, "");
    }
    __name(trimLeft, "trimLeft");
    var rules = [
      ["#", "hash"],
      // Extract from the back.
      ["?", "query"],
      // Extract from the back.
      /* @__PURE__ */ __name(function sanitize(address, url) {
        return isSpecial(url.protocol) ? address.replace(/\\/g, "/") : address;
      }, "sanitize"),
      ["/", "pathname"],
      // Extract from the back.
      ["@", "auth", 1],
      // Extract from the front.
      [NaN, "host", void 0, 1, 1],
      // Set left over value.
      [/:(\d*)$/, "port", void 0, 1],
      // RegExp the back.
      [NaN, "hostname", void 0, 1, 1]
      // Set left over.
    ];
    var ignore = { hash: 1, query: 1 };
    function lolcation(loc) {
      var globalVar;
      if (typeof window !== "undefined")
        globalVar = window;
      else if (typeof global !== "undefined")
        globalVar = global;
      else if (typeof self !== "undefined")
        globalVar = self;
      else
        globalVar = {};
      var location = globalVar.location || {};
      loc = loc || location;
      var finaldestination = {}, type = typeof loc, key;
      if ("blob:" === loc.protocol) {
        finaldestination = new Url(unescape(loc.pathname), {});
      } else if ("string" === type) {
        finaldestination = new Url(loc, {});
        for (key in ignore)
          delete finaldestination[key];
      } else if ("object" === type) {
        for (key in loc) {
          if (key in ignore)
            continue;
          finaldestination[key] = loc[key];
        }
        if (finaldestination.slashes === void 0) {
          finaldestination.slashes = slashes.test(loc.href);
        }
      }
      return finaldestination;
    }
    __name(lolcation, "lolcation");
    function isSpecial(scheme) {
      return scheme === "file:" || scheme === "ftp:" || scheme === "http:" || scheme === "https:" || scheme === "ws:" || scheme === "wss:";
    }
    __name(isSpecial, "isSpecial");
    function extractProtocol(address, location) {
      address = trimLeft(address);
      address = address.replace(CRHTLF, "");
      location = location || {};
      var match = protocolre.exec(address);
      var protocol = match[1] ? match[1].toLowerCase() : "";
      var forwardSlashes = !!match[2];
      var otherSlashes = !!match[3];
      var slashesCount = 0;
      var rest;
      if (forwardSlashes) {
        if (otherSlashes) {
          rest = match[2] + match[3] + match[4];
          slashesCount = match[2].length + match[3].length;
        } else {
          rest = match[2] + match[4];
          slashesCount = match[2].length;
        }
      } else {
        if (otherSlashes) {
          rest = match[3] + match[4];
          slashesCount = match[3].length;
        } else {
          rest = match[4];
        }
      }
      if (protocol === "file:") {
        if (slashesCount >= 2) {
          rest = rest.slice(2);
        }
      } else if (isSpecial(protocol)) {
        rest = match[4];
      } else if (protocol) {
        if (forwardSlashes) {
          rest = rest.slice(2);
        }
      } else if (slashesCount >= 2 && isSpecial(location.protocol)) {
        rest = match[4];
      }
      return {
        protocol,
        slashes: forwardSlashes || isSpecial(protocol),
        slashesCount,
        rest
      };
    }
    __name(extractProtocol, "extractProtocol");
    function resolve(relative, base) {
      if (relative === "")
        return base;
      var path = (base || "/").split("/").slice(0, -1).concat(relative.split("/")), i = path.length, last = path[i - 1], unshift = false, up = 0;
      while (i--) {
        if (path[i] === ".") {
          path.splice(i, 1);
        } else if (path[i] === "..") {
          path.splice(i, 1);
          up++;
        } else if (up) {
          if (i === 0)
            unshift = true;
          path.splice(i, 1);
          up--;
        }
      }
      if (unshift)
        path.unshift("");
      if (last === "." || last === "..")
        path.push("");
      return path.join("/");
    }
    __name(resolve, "resolve");
    function Url(address, location, parser) {
      address = trimLeft(address);
      address = address.replace(CRHTLF, "");
      if (!(this instanceof Url)) {
        return new Url(address, location, parser);
      }
      var relative, extracted, parse, instruction, index, key, instructions = rules.slice(), type = typeof location, url = this, i = 0;
      if ("object" !== type && "string" !== type) {
        parser = location;
        location = null;
      }
      if (parser && "function" !== typeof parser)
        parser = qs.parse;
      location = lolcation(location);
      extracted = extractProtocol(address || "", location);
      relative = !extracted.protocol && !extracted.slashes;
      url.slashes = extracted.slashes || relative && location.slashes;
      url.protocol = extracted.protocol || location.protocol || "";
      address = extracted.rest;
      if (extracted.protocol === "file:" && (extracted.slashesCount !== 2 || windowsDriveLetter.test(address)) || !extracted.slashes && (extracted.protocol || extracted.slashesCount < 2 || !isSpecial(url.protocol))) {
        instructions[3] = [/(.*)/, "pathname"];
      }
      for (; i < instructions.length; i++) {
        instruction = instructions[i];
        if (typeof instruction === "function") {
          address = instruction(address, url);
          continue;
        }
        parse = instruction[0];
        key = instruction[1];
        if (parse !== parse) {
          url[key] = address;
        } else if ("string" === typeof parse) {
          index = parse === "@" ? address.lastIndexOf(parse) : address.indexOf(parse);
          if (~index) {
            if ("number" === typeof instruction[2]) {
              url[key] = address.slice(0, index);
              address = address.slice(index + instruction[2]);
            } else {
              url[key] = address.slice(index);
              address = address.slice(0, index);
            }
          }
        } else if (index = parse.exec(address)) {
          url[key] = index[1];
          address = address.slice(0, index.index);
        }
        url[key] = url[key] || (relative && instruction[3] ? location[key] || "" : "");
        if (instruction[4])
          url[key] = url[key].toLowerCase();
      }
      if (parser)
        url.query = parser(url.query);
      if (relative && location.slashes && url.pathname.charAt(0) !== "/" && (url.pathname !== "" || location.pathname !== "")) {
        url.pathname = resolve(url.pathname, location.pathname);
      }
      if (url.pathname.charAt(0) !== "/" && isSpecial(url.protocol)) {
        url.pathname = "/" + url.pathname;
      }
      if (!required(url.port, url.protocol)) {
        url.host = url.hostname;
        url.port = "";
      }
      url.username = url.password = "";
      if (url.auth) {
        index = url.auth.indexOf(":");
        if (~index) {
          url.username = url.auth.slice(0, index);
          url.username = encodeURIComponent(decodeURIComponent(url.username));
          url.password = url.auth.slice(index + 1);
          url.password = encodeURIComponent(decodeURIComponent(url.password));
        } else {
          url.username = encodeURIComponent(decodeURIComponent(url.auth));
        }
        url.auth = url.password ? url.username + ":" + url.password : url.username;
      }
      url.origin = url.protocol !== "file:" && isSpecial(url.protocol) && url.host ? url.protocol + "//" + url.host : "null";
      url.href = url.toString();
    }
    __name(Url, "Url");
    function set(part, value, fn) {
      var url = this;
      switch (part) {
        case "query":
          if ("string" === typeof value && value.length) {
            value = (fn || qs.parse)(value);
          }
          url[part] = value;
          break;
        case "port":
          url[part] = value;
          if (!required(value, url.protocol)) {
            url.host = url.hostname;
            url[part] = "";
          } else if (value) {
            url.host = url.hostname + ":" + value;
          }
          break;
        case "hostname":
          url[part] = value;
          if (url.port)
            value += ":" + url.port;
          url.host = value;
          break;
        case "host":
          url[part] = value;
          if (port.test(value)) {
            value = value.split(":");
            url.port = value.pop();
            url.hostname = value.join(":");
          } else {
            url.hostname = value;
            url.port = "";
          }
          break;
        case "protocol":
          url.protocol = value.toLowerCase();
          url.slashes = !fn;
          break;
        case "pathname":
        case "hash":
          if (value) {
            var char = part === "pathname" ? "/" : "#";
            url[part] = value.charAt(0) !== char ? char + value : value;
          } else {
            url[part] = value;
          }
          break;
        case "username":
        case "password":
          url[part] = encodeURIComponent(value);
          break;
        case "auth":
          var index = value.indexOf(":");
          if (~index) {
            url.username = value.slice(0, index);
            url.username = encodeURIComponent(decodeURIComponent(url.username));
            url.password = value.slice(index + 1);
            url.password = encodeURIComponent(decodeURIComponent(url.password));
          } else {
            url.username = encodeURIComponent(decodeURIComponent(value));
          }
      }
      for (var i = 0; i < rules.length; i++) {
        var ins = rules[i];
        if (ins[4])
          url[ins[1]] = url[ins[1]].toLowerCase();
      }
      url.auth = url.password ? url.username + ":" + url.password : url.username;
      url.origin = url.protocol !== "file:" && isSpecial(url.protocol) && url.host ? url.protocol + "//" + url.host : "null";
      url.href = url.toString();
      return url;
    }
    __name(set, "set");
    function toString(stringify) {
      if (!stringify || "function" !== typeof stringify)
        stringify = qs.stringify;
      var query, url = this, host = url.host, protocol = url.protocol;
      if (protocol && protocol.charAt(protocol.length - 1) !== ":")
        protocol += ":";
      var result = protocol + (url.protocol && url.slashes || isSpecial(url.protocol) ? "//" : "");
      if (url.username) {
        result += url.username;
        if (url.password)
          result += ":" + url.password;
        result += "@";
      } else if (url.password) {
        result += ":" + url.password;
        result += "@";
      } else if (url.protocol !== "file:" && isSpecial(url.protocol) && !host && url.pathname !== "/") {
        result += "@";
      }
      if (host[host.length - 1] === ":" || port.test(url.hostname) && !url.port) {
        host += ":";
      }
      result += host + url.pathname;
      query = "object" === typeof url.query ? stringify(url.query) : url.query;
      if (query)
        result += "?" !== query.charAt(0) ? "?" + query : query;
      if (url.hash)
        result += url.hash;
      return result;
    }
    __name(toString, "toString");
    Url.prototype = { set, toString };
    Url.extractProtocol = extractProtocol;
    Url.location = lolcation;
    Url.trimLeft = trimLeft;
    Url.qs = qs;
    module2.exports = Url;
  }
});

// node_modules/@codahq/packs-sdk/dist/helpers/url.js
var require_url = __commonJS({
  "node_modules/@codahq/packs-sdk/dist/helpers/url.js"(exports2) {
    "use strict";
    init_crypto_shim();
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.join = exports2.getQueryParams = exports2.withQueryParams = void 0;
    var ensure_1 = require_ensure();
    var qs_1 = __importDefault(require_lib());
    var url_parse_1 = __importDefault(require_url_parse());
    function withQueryParams(url, params) {
      if (!params) {
        return url;
      }
      const parsedUrl = (0, url_parse_1.default)(url);
      const updatedParams = Object.assign({}, qs_1.default.parse(parsedUrl.query, { ignoreQueryPrefix: true }), params);
      parsedUrl.set("query", qs_1.default.stringify(JSON.parse(JSON.stringify(updatedParams)), { addQueryPrefix: true }));
      return parsedUrl.toString();
    }
    __name(withQueryParams, "withQueryParams");
    exports2.withQueryParams = withQueryParams;
    function getQueryParams(url) {
      const parsedUrl = (0, url_parse_1.default)(url);
      return qs_1.default.parse(parsedUrl.query, { ignoreQueryPrefix: true });
    }
    __name(getQueryParams, "getQueryParams");
    exports2.getQueryParams = getQueryParams;
    function join(...tokens) {
      if (!tokens || !tokens.length) {
        return "";
      }
      const combinedTokens = [];
      for (const token of tokens) {
        (0, ensure_1.ensureNonEmptyString)(token);
        if (combinedTokens.length === 0) {
          combinedTokens.push(token);
        } else {
          combinedTokens.push(token.replace(/^\/+/, ""));
        }
        if (!token.endsWith("/")) {
          combinedTokens.push("/");
        }
      }
      const combined = combinedTokens.join("");
      if (!tokens[tokens.length - 1].endsWith("/")) {
        return combined.slice(0, combined.length - 1);
      }
      return combined;
    }
    __name(join, "join");
    exports2.join = join;
  }
});

// node_modules/@codahq/packs-sdk/dist/handler_templates.js
var require_handler_templates = __commonJS({
  "node_modules/@codahq/packs-sdk/dist/handler_templates.js"(exports2) {
    "use strict";
    init_crypto_shim();
    var __importDefault = exports2 && exports2.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.generateObjectResponseHandler = exports2.transformBody = exports2.generateRequestHandler = void 0;
    var clone_1 = __importDefault(require_clone());
    var object_utils_1 = require_object_utils();
    var ensure_1 = require_ensure();
    var schema_1 = require_schema();
    var schema_2 = require_schema();
    var url_1 = require_url();
    function generateParamMap(keys, nameToValueMap, optionalNames) {
      const map = {};
      keys.forEach((key) => {
        let val = nameToValueMap[key];
        if (typeof val === "undefined") {
          if (optionalNames && optionalNames.has(key)) {
            return;
          }
          val = "";
        }
        map[key] = val;
      });
      return map;
    }
    __name(generateParamMap, "generateParamMap");
    function generateQueryParamMap(keys, nameToValueMap, optionalNames) {
      const map = {};
      keys.forEach((key) => {
        let val = nameToValueMap[key];
        if (typeof val === "undefined") {
          if (optionalNames && optionalNames.has(key)) {
            return;
          }
          val = "";
        }
        map[key] = encodeURIComponent(String(val));
      });
      return map;
    }
    __name(generateQueryParamMap, "generateQueryParamMap");
    function formatString(template, params) {
      let result = template;
      for (const [key, value] of Object.entries(params)) {
        result = result.replace(`{${key}}`, value);
      }
      return result;
    }
    __name(formatString, "formatString");
    function generateRequestHandler(request, parameters) {
      const { url, queryParams, nameMapping: paramNameMapping, bodyTemplate, bodyParams, method, headers, transforms } = request;
      const indexToNameMap = /* @__PURE__ */ new Map();
      const names = /* @__PURE__ */ new Set();
      const optionalNames = /* @__PURE__ */ new Set();
      parameters.forEach((arg, index) => {
        const name = paramNameMapping && paramNameMapping[arg.name] || arg.name;
        if (names.has(name)) {
          throw new Error(`Duplicate name ${name} detected`);
        }
        names.add(name);
        if (arg.optional) {
          optionalNames.add(name);
        }
        indexToNameMap.set(index, name);
      });
      const hasQueryParams = Boolean(queryParams && queryParams.length);
      const hasBodyParams = Boolean(bodyParams && bodyParams.length);
      return /* @__PURE__ */ __name(function requestHandler(params) {
        const nameMapping = {};
        params.forEach((param, index) => {
          const paramName = (0, ensure_1.ensureExists)(indexToNameMap.get(index));
          const paramTransform = transforms ? transforms[paramName] : void 0;
          if (paramTransform) {
            const transformResult = paramTransform(param);
            if (transformResult && typeof transformResult === "object") {
              Object.assign(nameMapping, transformResult);
            } else {
              nameMapping[paramName] = transformResult;
            }
          } else {
            nameMapping[paramName] = param;
          }
        });
        const baseUrl = formatString(url, generateQueryParamMap(Object.keys(nameMapping), nameMapping));
        const fullUrl = hasQueryParams ? (0, url_1.withQueryParams)(baseUrl, generateQueryParamMap((0, ensure_1.ensureExists)(queryParams), nameMapping, optionalNames)) : baseUrl;
        let body;
        if (bodyTemplate) {
          body = (0, clone_1.default)(bodyTemplate);
        }
        if (hasBodyParams) {
          const currentBodyParams = generateParamMap((0, ensure_1.ensureExists)(bodyParams), nameMapping, optionalNames);
          body = body ? { ...body, ...currentBodyParams } : currentBodyParams;
        }
        return {
          url: fullUrl,
          method,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            ...headers
          },
          body: body ? JSON.stringify(body) : void 0
        };
      }, "requestHandler");
    }
    __name(generateRequestHandler, "generateRequestHandler");
    exports2.generateRequestHandler = generateRequestHandler;
    function mapKeys(obj, schema) {
      if (!(schema && (0, schema_2.isObject)(schema))) {
        return obj;
      }
      const { properties } = schema;
      const remappedKeys = /* @__PURE__ */ new Map();
      for (const key in properties) {
        if (properties.hasOwnProperty(key) && properties[key].fromKey) {
          const fromKey = (0, ensure_1.ensureExists)(properties[key].fromKey);
          remappedKeys.set(fromKey, [...remappedKeys.get(fromKey) || [], key]);
        }
      }
      const remappedObject = {};
      for (const key in obj) {
        if (!obj.hasOwnProperty(key)) {
          continue;
        }
        const mappedKeys = remappedKeys.get(key) || [key];
        for (const newKey of mappedKeys) {
          if (!schema.properties[newKey] && !schema.includeUnknownProperties) {
            continue;
          }
          remappedObject[newKey] = mappedKeys.length > 1 ? (0, object_utils_1.deepCopy)(obj[key]) : obj[key];
          const keySchema = schema.properties[newKey];
          const currentValue = remappedObject[newKey];
          if (Array.isArray(currentValue) && (0, schema_1.isArray)(keySchema) && (0, schema_2.isObject)(keySchema.items)) {
            remappedObject[newKey] = currentValue.map((val) => mapKeys(val, keySchema.items));
          } else if (typeof currentValue === "object" && (0, schema_2.isObject)(keySchema)) {
            remappedObject[newKey] = mapKeys(currentValue, keySchema);
          }
        }
      }
      return remappedObject;
    }
    __name(mapKeys, "mapKeys");
    function transformBody(body, schema) {
      if ((0, schema_1.isArray)(schema) && (0, schema_2.isObject)(schema.items)) {
        const objects = body;
        const mappedObjs = objects.map((obj) => mapKeys(obj, schema.items));
        return mappedObjs;
      }
      if ((0, schema_2.isObject)(schema)) {
        return mapKeys(body, schema);
      }
      return body;
    }
    __name(transformBody, "transformBody");
    exports2.transformBody = transformBody;
    function generateObjectResponseHandler(response) {
      const { projectKey } = response;
      return /* @__PURE__ */ __name(function objectResponseHandler(resp) {
        const { body } = resp;
        if (typeof body !== "object") {
          return body;
        }
        const projectedBody = projectKey ? body[projectKey] : body;
        return projectedBody;
      }, "objectResponseHandler");
    }
    __name(generateObjectResponseHandler, "generateObjectResponseHandler");
    exports2.generateObjectResponseHandler = generateObjectResponseHandler;
  }
});

// node_modules/@codahq/packs-sdk/dist/api.js
var require_api = __commonJS({
  "node_modules/@codahq/packs-sdk/dist/api.js"(exports2) {
    "use strict";
    init_crypto_shim();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.maybeRewriteConnectionForFormula = exports2.makeEmptyFormula = exports2.makeTranslateObjectFormula = exports2.makeDynamicSyncTable = exports2.makeSyncTableLegacy = exports2.makeSyncTable = exports2.makeObjectFormula = exports2.makeSimpleAutocompleteMetadataFormula = exports2.autocompleteSearchObjects = exports2.simpleAutocomplete = exports2.makeMetadataFormula = exports2.makeFormula = exports2.makeStringFormula = exports2.makeNumericFormula = exports2.isSyncPackFormula = exports2.isStringPackFormula = exports2.isObjectPackFormula = exports2.check = exports2.makeUserVisibleError = exports2.makeFileArrayParameter = exports2.makeFileParameter = exports2.makeImageArrayParameter = exports2.makeImageParameter = exports2.makeHtmlArrayParameter = exports2.makeHtmlParameter = exports2.makeDateArrayParameter = exports2.makeDateParameter = exports2.makeBooleanArrayParameter = exports2.makeBooleanParameter = exports2.makeNumericArrayParameter = exports2.makeNumericParameter = exports2.makeStringArrayParameter = exports2.makeStringParameter = exports2.makeParameter = exports2.wrapGetSchema = exports2.wrapMetadataFunction = exports2.isDynamicSyncTable = exports2.isUserVisibleError = exports2.MissingScopesError = exports2.StatusCodeError = exports2.UserVisibleError = void 0;
    var api_types_1 = require_api_types();
    var api_types_2 = require_api_types();
    var api_types_3 = require_api_types();
    var schema_1 = require_schema();
    var api_types_4 = require_api_types();
    var api_types_5 = require_api_types();
    var object_utils_1 = require_object_utils();
    var ensure_1 = require_ensure();
    var api_types_6 = require_api_types();
    var handler_templates_1 = require_handler_templates();
    var handler_templates_2 = require_handler_templates();
    var api_types_7 = require_api_types();
    var api_types_8 = require_api_types();
    var object_utils_2 = require_object_utils();
    var schema_2 = require_schema();
    var schema_3 = require_schema();
    var api_types_9 = require_api_types();
    var migration_1 = require_migration();
    var api_types_10 = require_api_types();
    var _UserVisibleError = class _UserVisibleError extends Error {
      /**
       * Use to construct a user-visible error.
       *
       * @example
       * ```
       * if (!url.startsWith("http")) {
       *   throw new coda.UserVisibleError("Please provide a valid url.");
       * }
       * ```
       */
      constructor(message, internalError) {
        super(message);
        this.isUserVisible = true;
        this.internalError = internalError;
      }
    };
    __name(_UserVisibleError, "UserVisibleError");
    var UserVisibleError = _UserVisibleError;
    exports2.UserVisibleError = UserVisibleError;
    var _StatusCodeError = class _StatusCodeError extends Error {
      /** @hidden */
      constructor(statusCode, body, options, response) {
        super(`${statusCode} - ${JSON.stringify(body)}`);
        this.name = "StatusCodeError";
        this.statusCode = statusCode;
        this.body = body;
        this.error = body;
        this.options = options;
        let responseBody = response === null || response === void 0 ? void 0 : response.body;
        if (typeof responseBody === "object") {
          responseBody = JSON.stringify(responseBody);
        }
        this.response = { ...response, body: responseBody };
      }
      /** Returns if the error is an instance of StatusCodeError. Note that instanceof may not work. */
      static isStatusCodeError(err) {
        return "name" in err && err.name === _StatusCodeError.name;
      }
    };
    __name(_StatusCodeError, "StatusCodeError");
    var StatusCodeError = _StatusCodeError;
    exports2.StatusCodeError = StatusCodeError;
    var _MissingScopesError = class _MissingScopesError extends Error {
      /** @hidden */
      constructor(message) {
        super(message || "Additional permissions are required");
        this.name = "MissingScopesError";
      }
      /** Returns if the error is an instance of MissingScopesError. Note that instanceof may not work. */
      static isMissingScopesError(err) {
        return "name" in err && err.name === _MissingScopesError.name;
      }
    };
    __name(_MissingScopesError, "MissingScopesError");
    var MissingScopesError = _MissingScopesError;
    exports2.MissingScopesError = MissingScopesError;
    function isUserVisibleError(error) {
      return "isUserVisible" in error && error.isUserVisible;
    }
    __name(isUserVisibleError, "isUserVisibleError");
    exports2.isUserVisibleError = isUserVisibleError;
    function isDynamicSyncTable(syncTable) {
      return "isDynamic" in syncTable;
    }
    __name(isDynamicSyncTable, "isDynamicSyncTable");
    exports2.isDynamicSyncTable = isDynamicSyncTable;
    function wrapMetadataFunction(fnOrFormula) {
      return typeof fnOrFormula === "function" ? makeMetadataFormula(fnOrFormula) : fnOrFormula;
    }
    __name(wrapMetadataFunction, "wrapMetadataFunction");
    exports2.wrapMetadataFunction = wrapMetadataFunction;
    function transformToArraySchema(schema) {
      if ((schema === null || schema === void 0 ? void 0 : schema.type) === schema_1.ValueType.Array) {
        return schema;
      } else {
        return {
          type: schema_1.ValueType.Array,
          items: schema
        };
      }
    }
    __name(transformToArraySchema, "transformToArraySchema");
    function wrapGetSchema(getSchema) {
      if (!getSchema) {
        return;
      }
      return {
        ...getSchema,
        execute(params, context) {
          const schema = getSchema.execute(params, context);
          if ((0, object_utils_2.isPromise)(schema)) {
            return schema.then((value) => transformToArraySchema(value));
          } else {
            return transformToArraySchema(schema);
          }
        }
      };
    }
    __name(wrapGetSchema, "wrapGetSchema");
    exports2.wrapGetSchema = wrapGetSchema;
    function makeParameter(paramDefinition) {
      const { type, autocomplete: autocompleteDefOrItems, ...rest } = paramDefinition;
      const actualType = api_types_2.ParameterTypeInputMap[type];
      let autocomplete;
      if (Array.isArray(autocompleteDefOrItems)) {
        const autocompleteDef = makeSimpleAutocompleteMetadataFormula(autocompleteDefOrItems);
        autocomplete = wrapMetadataFunction(autocompleteDef);
      } else {
        autocomplete = wrapMetadataFunction(autocompleteDefOrItems);
      }
      return Object.freeze({ ...rest, autocomplete, type: actualType });
    }
    __name(makeParameter, "makeParameter");
    exports2.makeParameter = makeParameter;
    function makeStringParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_3.Type.string });
    }
    __name(makeStringParameter, "makeStringParameter");
    exports2.makeStringParameter = makeStringParameter;
    function makeStringArrayParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_10.stringArray });
    }
    __name(makeStringArrayParameter, "makeStringArrayParameter");
    exports2.makeStringArrayParameter = makeStringArrayParameter;
    function makeNumericParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_3.Type.number });
    }
    __name(makeNumericParameter, "makeNumericParameter");
    exports2.makeNumericParameter = makeNumericParameter;
    function makeNumericArrayParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_9.numberArray });
    }
    __name(makeNumericArrayParameter, "makeNumericArrayParameter");
    exports2.makeNumericArrayParameter = makeNumericArrayParameter;
    function makeBooleanParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_3.Type.boolean });
    }
    __name(makeBooleanParameter, "makeBooleanParameter");
    exports2.makeBooleanParameter = makeBooleanParameter;
    function makeBooleanArrayParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_4.booleanArray });
    }
    __name(makeBooleanArrayParameter, "makeBooleanArrayParameter");
    exports2.makeBooleanArrayParameter = makeBooleanArrayParameter;
    function makeDateParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_3.Type.date });
    }
    __name(makeDateParameter, "makeDateParameter");
    exports2.makeDateParameter = makeDateParameter;
    function makeDateArrayParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_5.dateArray });
    }
    __name(makeDateArrayParameter, "makeDateArrayParameter");
    exports2.makeDateArrayParameter = makeDateArrayParameter;
    function makeHtmlParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_3.Type.html });
    }
    __name(makeHtmlParameter, "makeHtmlParameter");
    exports2.makeHtmlParameter = makeHtmlParameter;
    function makeHtmlArrayParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_7.htmlArray });
    }
    __name(makeHtmlArrayParameter, "makeHtmlArrayParameter");
    exports2.makeHtmlArrayParameter = makeHtmlArrayParameter;
    function makeImageParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_3.Type.image });
    }
    __name(makeImageParameter, "makeImageParameter");
    exports2.makeImageParameter = makeImageParameter;
    function makeImageArrayParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_8.imageArray });
    }
    __name(makeImageArrayParameter, "makeImageArrayParameter");
    exports2.makeImageArrayParameter = makeImageArrayParameter;
    function makeFileParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_3.Type.file });
    }
    __name(makeFileParameter, "makeFileParameter");
    exports2.makeFileParameter = makeFileParameter;
    function makeFileArrayParameter(name, description, args = {}) {
      return Object.freeze({ ...args, name, description, type: api_types_6.fileArray });
    }
    __name(makeFileArrayParameter, "makeFileArrayParameter");
    exports2.makeFileArrayParameter = makeFileArrayParameter;
    function makeUserVisibleError(msg) {
      return new UserVisibleError(msg);
    }
    __name(makeUserVisibleError, "makeUserVisibleError");
    exports2.makeUserVisibleError = makeUserVisibleError;
    function check(condition, msg) {
      if (!condition) {
        throw makeUserVisibleError(msg);
      }
    }
    __name(check, "check");
    exports2.check = check;
    function isObjectPackFormula(fn) {
      return fn.resultType === api_types_3.Type.object;
    }
    __name(isObjectPackFormula, "isObjectPackFormula");
    exports2.isObjectPackFormula = isObjectPackFormula;
    function isStringPackFormula(fn) {
      return fn.resultType === api_types_3.Type.string;
    }
    __name(isStringPackFormula, "isStringPackFormula");
    exports2.isStringPackFormula = isStringPackFormula;
    function isSyncPackFormula(fn) {
      return Boolean(fn.isSyncFormula);
    }
    __name(isSyncPackFormula, "isSyncPackFormula");
    exports2.isSyncPackFormula = isSyncPackFormula;
    function makeNumericFormula(definition) {
      return Object.assign({}, definition, { resultType: api_types_3.Type.number });
    }
    __name(makeNumericFormula, "makeNumericFormula");
    exports2.makeNumericFormula = makeNumericFormula;
    function makeStringFormula(definition) {
      const { response } = definition;
      return Object.assign({}, definition, {
        resultType: api_types_3.Type.string,
        ...response && { schema: response.schema }
      });
    }
    __name(makeStringFormula, "makeStringFormula");
    exports2.makeStringFormula = makeStringFormula;
    function makeFormula(fullDefinition) {
      let formula;
      switch (fullDefinition.resultType) {
        case schema_1.ValueType.String: {
          const def = {
            ...fullDefinition,
            codaType: "codaType" in fullDefinition ? fullDefinition.codaType : void 0,
            formulaSchema: "schema" in fullDefinition ? fullDefinition.schema : void 0
          };
          const { onError: _, resultType: unused, codaType, formulaSchema, ...rest } = def;
          const stringFormula = {
            ...rest,
            resultType: api_types_3.Type.string,
            schema: formulaSchema || (codaType ? { type: schema_1.ValueType.String, codaType } : void 0)
          };
          formula = stringFormula;
          break;
        }
        case schema_1.ValueType.Number: {
          const def = {
            ...fullDefinition,
            codaType: "codaType" in fullDefinition ? fullDefinition.codaType : void 0,
            formulaSchema: "schema" in fullDefinition ? fullDefinition.schema : void 0
          };
          const { onError: _, resultType: unused, codaType, formulaSchema, ...rest } = def;
          const numericFormula = {
            ...rest,
            resultType: api_types_3.Type.number,
            schema: formulaSchema || (codaType ? { type: schema_1.ValueType.Number, codaType } : void 0)
          };
          formula = numericFormula;
          break;
        }
        case schema_1.ValueType.Boolean: {
          const { onError: _, resultType: unused, ...rest } = fullDefinition;
          const booleanFormula = {
            ...rest,
            resultType: api_types_3.Type.boolean
          };
          formula = booleanFormula;
          break;
        }
        case schema_1.ValueType.Array: {
          const { onError: _, resultType: unused, items, ...rest } = fullDefinition;
          const arrayFormula = {
            ...rest,
            // TypeOf<SchemaType<ArraySchema<SchemaT>>> is always Type.object but TS can't infer this.
            resultType: api_types_3.Type.object,
            schema: (0, schema_3.normalizeSchema)({ type: schema_1.ValueType.Array, items })
          };
          formula = arrayFormula;
          break;
        }
        case schema_1.ValueType.Object: {
          const { onError: _, resultType: unused, schema, ...rest } = fullDefinition;
          const objectFormula = {
            ...rest,
            resultType: api_types_3.Type.object,
            schema: (0, schema_3.normalizeSchema)(schema)
          };
          formula = objectFormula;
          break;
        }
        default:
          return (0, ensure_1.ensureUnreachable)(fullDefinition);
      }
      const onError = fullDefinition.onError;
      if (onError) {
        const wrappedExecute = formula.execute;
        formula.execute = async function(params, context) {
          try {
            return await wrappedExecute(params, context);
          } catch (err) {
            return onError(err);
          }
        };
      }
      return maybeRewriteConnectionForFormula(formula, fullDefinition.connectionRequirement);
    }
    __name(makeFormula, "makeFormula");
    exports2.makeFormula = makeFormula;
    function makeMetadataFormula(execute, options) {
      return makeObjectFormula({
        name: "getMetadata",
        description: "Gets metadata",
        // Formula context is serialized here because we do not want to pass objects into
        // regular pack functions (which this is)
        execute([search, serializedFormulaContext], context) {
          let formulaContext = {};
          try {
            formulaContext = JSON.parse(serializedFormulaContext);
          } catch (err) {
          }
          return execute(context, search, formulaContext);
        },
        parameters: [
          makeStringParameter("search", "Metadata to search for", { optional: true }),
          makeStringParameter("formulaContext", "Serialized JSON for metadata", { optional: true })
        ],
        examples: [],
        connectionRequirement: (options === null || options === void 0 ? void 0 : options.connectionRequirement) || api_types_1.ConnectionRequirement.Optional
      });
    }
    __name(makeMetadataFormula, "makeMetadataFormula");
    exports2.makeMetadataFormula = makeMetadataFormula;
    function simpleAutocomplete(search, options) {
      const normalizedSearch = (search || "").toLowerCase();
      const filtered = options.filter((option) => {
        const display = typeof option === "string" || typeof option === "number" ? option : option.display;
        return display.toString().toLowerCase().includes(normalizedSearch);
      });
      const metadataResults = [];
      for (const option of filtered) {
        if (typeof option === "string") {
          metadataResults.push({
            value: option,
            display: option
          });
        } else if (typeof option === "number") {
          metadataResults.push({
            value: option,
            display: option.toString()
          });
        } else {
          metadataResults.push(option);
        }
      }
      return Promise.resolve(metadataResults);
    }
    __name(simpleAutocomplete, "simpleAutocomplete");
    exports2.simpleAutocomplete = simpleAutocomplete;
    function autocompleteSearchObjects(search, objs, displayKey, valueKey) {
      if (typeof search !== "string") {
        throw new TypeError(`Exepcting a string for "search" parameter but received ${search}`);
      }
      const normalizedSearch = search.toLowerCase();
      const filtered = objs.filter((o) => o[displayKey].toLowerCase().includes(normalizedSearch));
      const metadataResults = filtered.map((o) => {
        return {
          value: o[valueKey],
          display: o[displayKey]
        };
      });
      return Promise.resolve(metadataResults);
    }
    __name(autocompleteSearchObjects, "autocompleteSearchObjects");
    exports2.autocompleteSearchObjects = autocompleteSearchObjects;
    function makeSimpleAutocompleteMetadataFormula(options) {
      return makeMetadataFormula((context, [search]) => simpleAutocomplete(search, options), {
        // A connection won't be used here, but if the parent formula uses a connection
        // the execution code is going to try to pass it here. We should fix that.
        connectionRequirement: api_types_1.ConnectionRequirement.Optional
      });
    }
    __name(makeSimpleAutocompleteMetadataFormula, "makeSimpleAutocompleteMetadataFormula");
    exports2.makeSimpleAutocompleteMetadataFormula = makeSimpleAutocompleteMetadataFormula;
    function isResponseHandlerTemplate(obj) {
      return obj && obj.schema;
    }
    __name(isResponseHandlerTemplate, "isResponseHandlerTemplate");
    function isResponseExampleTemplate(obj) {
      return obj && obj.example;
    }
    __name(isResponseExampleTemplate, "isResponseExampleTemplate");
    function makeObjectFormula({ response, ...definition }) {
      let schema;
      if (response) {
        if (isResponseHandlerTemplate(response) && response.schema) {
          response.schema = (0, schema_3.normalizeSchema)(response.schema);
          schema = response.schema;
        } else if (isResponseExampleTemplate(response)) {
        }
      }
      let execute = definition.execute;
      if (isResponseHandlerTemplate(response)) {
        const { onError } = response;
        const wrappedExecute = execute;
        const responseHandler = (0, handler_templates_1.generateObjectResponseHandler)(response);
        execute = /* @__PURE__ */ __name(async function exec(params, context) {
          let result;
          try {
            result = await wrappedExecute(params, context);
          } catch (err) {
            if (onError) {
              result = onError(err);
            } else {
              throw err;
            }
          }
          return responseHandler({ body: result || {}, status: 200, headers: {} });
        }, "exec");
      }
      return Object.assign({}, definition, {
        resultType: api_types_3.Type.object,
        execute,
        schema
      });
    }
    __name(makeObjectFormula, "makeObjectFormula");
    exports2.makeObjectFormula = makeObjectFormula;
    function makeSyncTable({ name, description, identityName, schema: inputSchema, formula, connectionRequirement, dynamicOptions = {} }) {
      const { getSchema: getSchemaDef, entityName, defaultAddDynamicColumns } = dynamicOptions;
      const { execute: wrappedExecute, ...definition } = maybeRewriteConnectionForFormula(formula, connectionRequirement);
      const schemaDef = (0, object_utils_1.deepCopy)(inputSchema);
      if (!identityName) {
        throw new Error(`Sync table schemas must set an identityName`);
      }
      if (schemaDef.identity) {
        if (schemaDef.identity.name && schemaDef.identity.name !== identityName) {
          throw new Error(`Identity name mismatch for sync table ${name}. Either remove the schema's identity.name (${schemaDef.identity.name}) or ensure it matches the table's identityName (${identityName}).`);
        }
        schemaDef.identity = { ...schemaDef.identity, name: identityName };
      } else {
        schemaDef.identity = { name: identityName };
      }
      const getSchema = wrapGetSchema(wrapMetadataFunction(getSchemaDef));
      const schema = (0, schema_2.makeObjectSchema)(schemaDef);
      const formulaSchema = getSchema ? void 0 : (0, schema_3.normalizeSchema)({ type: schema_1.ValueType.Array, items: schema });
      const { identity, id, primary } = (0, migration_1.objectSchemaHelper)(schema);
      if (!(primary && id)) {
        throw new Error(`Sync table schemas should have defined properties for idProperty and displayProperty`);
      }
      if (!identity) {
        throw new Error(`Unknown error creating sync table identity`);
      }
      if (name.includes(" ")) {
        throw new Error("Sync table name should not include spaces");
      }
      const responseHandler = (0, handler_templates_1.generateObjectResponseHandler)({ schema: formulaSchema });
      const execute = /* @__PURE__ */ __name(async function exec(params, context) {
        const { result, continuation } = await wrappedExecute(params, context) || {};
        const appliedSchema = context.sync.schema;
        return {
          result: responseHandler({ body: result || [], status: 200, headers: {} }, appliedSchema),
          continuation
        };
      }, "exec");
      return {
        name,
        description,
        schema: (0, schema_3.normalizeSchema)(schema),
        identityName,
        getter: {
          ...definition,
          cacheTtlSecs: 0,
          execute,
          schema: formulaSchema,
          isSyncFormula: true,
          connectionRequirement: definition.connectionRequirement || connectionRequirement,
          resultType: api_types_3.Type.object
        },
        getSchema: maybeRewriteConnectionForFormula(getSchema, connectionRequirement),
        entityName,
        defaultAddDynamicColumns
      };
    }
    __name(makeSyncTable, "makeSyncTable");
    exports2.makeSyncTable = makeSyncTable;
    function makeSyncTableLegacy(name, schema, formula, connectionRequirement, dynamicOptions = {}) {
      var _a;
      if (!((_a = schema.identity) === null || _a === void 0 ? void 0 : _a.name)) {
        throw new Error("Legacy sync tables must specify identity.name");
      }
      if (schema.__packId) {
        throw new Error("Do not use the __packId field, it is only for internal Coda use.");
      }
      return makeSyncTable({
        name,
        identityName: schema.identity.name,
        schema,
        formula,
        connectionRequirement,
        dynamicOptions
      });
    }
    __name(makeSyncTableLegacy, "makeSyncTableLegacy");
    exports2.makeSyncTableLegacy = makeSyncTableLegacy;
    function makeDynamicSyncTable({ name, description, getName: getNameDef, getSchema: getSchemaDef, identityName, getDisplayUrl: getDisplayUrlDef, formula, listDynamicUrls: listDynamicUrlsDef, entityName, connectionRequirement, defaultAddDynamicColumns, placeholderSchema: placeholderSchemaInput }) {
      const placeholderSchema = placeholderSchemaInput || // default placeholder only shows a column of id, which will be replaced later by the dynamic schema.
      (0, schema_2.makeObjectSchema)({
        type: schema_1.ValueType.Object,
        idProperty: "id",
        displayProperty: "id",
        identity: { name: identityName },
        properties: {
          id: { type: schema_1.ValueType.String }
        }
      });
      const getName = wrapMetadataFunction(getNameDef);
      const getSchema = wrapMetadataFunction(getSchemaDef);
      const getDisplayUrl = wrapMetadataFunction(getDisplayUrlDef);
      const listDynamicUrls = wrapMetadataFunction(listDynamicUrlsDef);
      const table = makeSyncTable({
        name,
        description,
        identityName,
        schema: placeholderSchema,
        formula,
        connectionRequirement,
        dynamicOptions: { getSchema, entityName, defaultAddDynamicColumns }
      });
      return {
        ...table,
        isDynamic: true,
        getDisplayUrl: maybeRewriteConnectionForFormula(getDisplayUrl, connectionRequirement),
        listDynamicUrls: maybeRewriteConnectionForFormula(listDynamicUrls, connectionRequirement),
        getName: maybeRewriteConnectionForFormula(getName, connectionRequirement)
      };
    }
    __name(makeDynamicSyncTable, "makeDynamicSyncTable");
    exports2.makeDynamicSyncTable = makeDynamicSyncTable;
    function makeTranslateObjectFormula({ response, ...definition }) {
      const { request, ...rest } = definition;
      const { parameters } = rest;
      response.schema = response.schema ? (0, schema_3.normalizeSchema)(response.schema) : void 0;
      const { onError } = response;
      const requestHandler = (0, handler_templates_2.generateRequestHandler)(request, parameters);
      const responseHandler = (0, handler_templates_1.generateObjectResponseHandler)(response);
      function execute(params, context) {
        return context.fetcher.fetch(requestHandler(params)).catch((err) => {
          if (onError) {
            return onError(err);
          }
          throw err;
        }).then(responseHandler);
      }
      __name(execute, "execute");
      return Object.assign({}, rest, {
        execute,
        resultType: api_types_3.Type.object,
        schema: response.schema
      });
    }
    __name(makeTranslateObjectFormula, "makeTranslateObjectFormula");
    exports2.makeTranslateObjectFormula = makeTranslateObjectFormula;
    function makeEmptyFormula(definition) {
      const { request, ...rest } = definition;
      const { parameters } = rest;
      const requestHandler = (0, handler_templates_2.generateRequestHandler)(request, parameters);
      function execute(params, context) {
        return context.fetcher.fetch(requestHandler(params)).then(() => "");
      }
      __name(execute, "execute");
      return Object.assign({}, rest, {
        execute,
        resultType: api_types_3.Type.string
      });
    }
    __name(makeEmptyFormula, "makeEmptyFormula");
    exports2.makeEmptyFormula = makeEmptyFormula;
    function maybeRewriteConnectionForFormula(formula, connectionRequirement) {
      var _a;
      if (formula && connectionRequirement) {
        return {
          ...formula,
          parameters: formula.parameters.map((param) => {
            return {
              ...param,
              autocomplete: param.autocomplete ? maybeRewriteConnectionForFormula(param.autocomplete, connectionRequirement) : void 0
            };
          }),
          varargParameters: (_a = formula.varargParameters) === null || _a === void 0 ? void 0 : _a.map((param) => {
            return {
              ...param,
              autocomplete: param.autocomplete ? maybeRewriteConnectionForFormula(param.autocomplete, connectionRequirement) : void 0
            };
          }),
          connectionRequirement
        };
      }
      return formula;
    }
    __name(maybeRewriteConnectionForFormula, "maybeRewriteConnectionForFormula");
    exports2.maybeRewriteConnectionForFormula = maybeRewriteConnectionForFormula;
  }
});

// node_modules/@codahq/packs-sdk/dist/builder.js
var require_builder = __commonJS({
  "node_modules/@codahq/packs-sdk/dist/builder.js"(exports2) {
    "use strict";
    init_crypto_shim();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.PackDefinitionBuilder = exports2.newPack = void 0;
    var types_1 = require_types();
    var api_types_1 = require_api_types();
    var api_1 = require_api();
    var api_2 = require_api();
    var api_3 = require_api();
    var api_4 = require_api();
    var api_5 = require_api();
    var migration_1 = require_migration();
    var api_6 = require_api();
    function newPack(definition) {
      return new PackDefinitionBuilder(definition);
    }
    __name(newPack, "newPack");
    exports2.newPack = newPack;
    var _PackDefinitionBuilder = class _PackDefinitionBuilder {
      /**
       * Constructs a {@link PackDefinitionBuilder}. However, `coda.newPack()` should be used instead
       * rather than constructing a builder directly.
       */
      constructor(definition) {
        const { formulas, formats, syncTables, networkDomains, defaultAuthentication, systemConnectionAuthentication, version, formulaNamespace } = definition || {};
        this.formulas = formulas || [];
        this.formats = formats || [];
        this.syncTables = syncTables || [];
        this.networkDomains = networkDomains || [];
        this.defaultAuthentication = defaultAuthentication;
        this.systemConnectionAuthentication = systemConnectionAuthentication;
        this.version = version;
        this.formulaNamespace = formulaNamespace || "Deprecated";
      }
      /**
       * Adds a formula definition to this pack.
       *
       * In the web editor, the `/Formula` shortcut will insert a snippet of a skeleton formula.
       *
       * @example
       * ```
       * pack.addFormula({
       *   resultType: ValueType.String,
       *    name: 'MyFormula',
       *    description: 'My description.',
       *    parameters: [
       *      makeParameter({
       *        type: ParameterType.String,
       *        name: 'myParam',
       *        description: 'My param description.',
       *      }),
       *    ],
       *    execute: async ([param]) => {
       *      return `Hello ${param}`;
       *    },
       * });
       * ```
       */
      addFormula(definition) {
        const formula = (0, api_3.makeFormula)({
          ...definition,
          connectionRequirement: definition.connectionRequirement || this._defaultConnectionRequirement
        });
        this.formulas.push(formula);
        return this;
      }
      /**
       * Adds a sync table definition to this pack.
       *
       * In the web editor, the `/SyncTable` shortcut will insert a snippet of a skeleton sync table.
       *
       * @example
       * ```
       * pack.addSyncTable({
       *   name: 'MySyncTable',
       *   identityName: 'EntityName',
       *   schema: coda.makeObjectSchema({
       *     ...
       *   }),
       *   formula: {
       *     ...
       *   },
       * });
       * ```
       */
      addSyncTable({ name, description, identityName, schema, formula, connectionRequirement, dynamicOptions = {} }) {
        const connectionRequirementToUse = connectionRequirement || this._defaultConnectionRequirement;
        const syncTable = (0, api_4.makeSyncTable)({
          name,
          description,
          identityName,
          schema,
          formula,
          connectionRequirement: connectionRequirementToUse,
          dynamicOptions
        });
        this.syncTables.push(syncTable);
        return this;
      }
      /**
       * Adds a dynamic sync table definition to this pack.
       *
       * In the web editor, the `/DynamicSyncTable` shortcut will insert a snippet of a skeleton sync table.
       *
       * @example
       * ```
       * pack.addDynamicSyncTable({
       *   name: "MySyncTable",
       *   getName: async funciton (context) => {
       *     const response = await context.fetcher.fetch({method: "GET", url: context.sync.dynamicUrl});
       *     return response.body.name;
       *   },
       *   getName: async function (context) => {
       *     const response = await context.fetcher.fetch({method: "GET", url: context.sync.dynamicUrl});
       *     return response.body.browserLink;
       *   },
       *   ...
       * });
       * ```
       */
      addDynamicSyncTable(definition) {
        const dynamicSyncTable = (0, api_2.makeDynamicSyncTable)({
          ...definition,
          connectionRequirement: definition.connectionRequirement || this._defaultConnectionRequirement
        });
        this.syncTables.push(dynamicSyncTable);
        return this;
      }
      /**
       * Adds a column format definition to this pack.
       *
       * In the web editor, the `/ColumnFormat` shortcut will insert a snippet of a skeleton format.
       *
       * @example
       * ```
       * pack.addColumnFormat({
       *   name: 'MyColumn',
       *   formulaName: 'MyFormula',
       * });
       * ```
       */
      addColumnFormat(format) {
        this.formats.push(format);
        return this;
      }
      /**
       * Sets this pack to use authentication for individual users, using the
       * authentication method is the given definition.
       *
       * Each user will need to register an account in order to use this pack.
       *
       * In the web editor, the `/UserAuthentication` shortcut will insert a snippet of a skeleton
       * authentication definition.
       *
       * By default, this will set a default connection (account) requirement, making a user account
       * required to invoke all formulas in this pack unless you specify differently on a particular
       * formula. To change the default, you can pass a `defaultConnectionRequirement` option into
       * this method.
       *
       * @example
       * ```
       * pack.setUserAuthentication({
       *   type: AuthenticationType.HeaderBearerToken,
       * });
       * ```
       */
      setUserAuthentication(authDef) {
        const { defaultConnectionRequirement = api_types_1.ConnectionRequirement.Required, ...authentication } = authDef;
        if (authentication.type === types_1.AuthenticationType.None || authentication.type === types_1.AuthenticationType.Various) {
          this.defaultAuthentication = authentication;
        } else {
          const { getConnectionName: getConnectionNameDef, getConnectionUserId: getConnectionUserIdDef, postSetup: postSetupDef, ...rest } = authentication;
          const getConnectionName = (0, api_6.wrapMetadataFunction)(getConnectionNameDef);
          const getConnectionUserId = (0, api_6.wrapMetadataFunction)(getConnectionUserIdDef);
          const postSetup = postSetupDef === null || postSetupDef === void 0 ? void 0 : postSetupDef.map((step) => {
            return { ...step, getOptions: (0, api_6.wrapMetadataFunction)((0, migration_1.setEndpointDefHelper)(step).getOptions) };
          });
          this.defaultAuthentication = { ...rest, getConnectionName, getConnectionUserId, postSetup };
        }
        if (authentication.type !== types_1.AuthenticationType.None) {
          this._setDefaultConnectionRequirement(defaultConnectionRequirement);
        }
        return this;
      }
      /**
       * Sets this pack to use authentication provided by you as the maker of this pack.
       *
       * You will need to register credentials to use with this pack. When users use the
       * pack, their requests will be authenticated with those system credentials, they need
       * not register their own account.
       *
       * In the web editor, the `/SystemAuthentication` shortcut will insert a snippet of a skeleton
       * authentication definition.
       *
       * @example
       * ```
       * pack.setSystemAuthentication({
       *   type: AuthenticationType.HeaderBearerToken,
       * });
       * ```
       */
      setSystemAuthentication(systemAuthentication) {
        const { getConnectionName: getConnectionNameDef, getConnectionUserId: getConnectionUserIdDef, postSetup: postSetupDef, ...rest } = systemAuthentication;
        const getConnectionName = (0, api_6.wrapMetadataFunction)(getConnectionNameDef);
        const getConnectionUserId = (0, api_6.wrapMetadataFunction)(getConnectionUserIdDef);
        const postSetup = postSetupDef === null || postSetupDef === void 0 ? void 0 : postSetupDef.map((step) => {
          return { ...step, getOptions: (0, api_6.wrapMetadataFunction)((0, migration_1.setEndpointDefHelper)(step).getOptions) };
        });
        this.systemConnectionAuthentication = {
          ...rest,
          getConnectionName,
          getConnectionUserId,
          postSetup
        };
        return this;
      }
      /**
       * Adds the domain that this pack makes HTTP requests to.
       * For example, if your pack makes HTTP requests to "api.example.com",
       * use "example.com" as your network domain.
       *
       * If your pack make HTTP requests, it must declare a network domain,
       * for security purposes. Coda enforces that your pack cannot make requests to
       * any undeclared domains.
       *
       * You are allowed one network domain per pack by default. If your pack needs
       * to connect to multiple domains, contact Coda Support for approval.
       *
       * @example
       * ```
       * pack.addNetworkDomain('example.com');
       * ```
       */
      addNetworkDomain(...domain) {
        this.networkDomains.push(...domain);
        return this;
      }
      /**
       * Sets the semantic version of this pack version, e.g. `'1.2.3'`.
       *
       * This is optional, and you only need to provide a version if you are manually doing
       * semantic versioning, or using the CLI. If using the web editor, you can omit this
       * and the web editor will automatically provide an appropriate semantic version
       * each time you build a version.
       *
       * @example
       * ```
       * pack.setVersion('1.2.3');
       * ```
       */
      setVersion(version) {
        this.version = version;
        return this;
      }
      _setDefaultConnectionRequirement(connectionRequirement) {
        this._defaultConnectionRequirement = connectionRequirement;
        this.formulas = this.formulas.map((formula) => {
          return formula.connectionRequirement ? formula : (0, api_5.maybeRewriteConnectionForFormula)(formula, connectionRequirement);
        });
        this.syncTables = this.syncTables.map((syncTable) => {
          if (syncTable.getter.connectionRequirement) {
            return syncTable;
          } else if ((0, api_1.isDynamicSyncTable)(syncTable)) {
            return {
              ...syncTable,
              getter: (0, api_5.maybeRewriteConnectionForFormula)(syncTable.getter, connectionRequirement),
              // These 4 are metadata formulas, so they use ConnectionRequirement.Required
              // by default if you don't specify a connection requirement (a legacy behavior
              // that is confusing and perhaps undesirable now that we have better builders).
              // We don't know if the maker set Required explicitly or if was just the default,
              // so we don't know if we should overwrite the connection requirement. For lack
              // of a better option, we'll override it here regardless. This ensure that these
              // dynamic sync table metadata formulas have the same connetion requirement as the
              // sync table itself, which seems desirable basically 100% of the time and should
              // always work, but it does give rise to confusing behavior that calling
              // setDefaultConnectionRequirement() can wipe away an explicit connection
              // requirement override set on one of these 4 metadata formulas.
              getName: (0, api_5.maybeRewriteConnectionForFormula)(syncTable.getName, connectionRequirement),
              getDisplayUrl: (0, api_5.maybeRewriteConnectionForFormula)(syncTable.getDisplayUrl, connectionRequirement),
              getSchema: (0, api_5.maybeRewriteConnectionForFormula)(syncTable.getSchema, connectionRequirement),
              listDynamicUrls: (0, api_5.maybeRewriteConnectionForFormula)(syncTable.listDynamicUrls, connectionRequirement)
            };
          } else {
            return {
              ...syncTable,
              getter: (0, api_5.maybeRewriteConnectionForFormula)(syncTable.getter, connectionRequirement),
              getSchema: (0, api_5.maybeRewriteConnectionForFormula)(syncTable.getSchema, connectionRequirement)
            };
          }
        });
        return this;
      }
    };
    __name(_PackDefinitionBuilder, "PackDefinitionBuilder");
    var PackDefinitionBuilder = _PackDefinitionBuilder;
    exports2.PackDefinitionBuilder = PackDefinitionBuilder;
  }
});

// node_modules/@codahq/packs-sdk/dist/helpers/svg.js
var require_svg = __commonJS({
  "node_modules/@codahq/packs-sdk/dist/helpers/svg.js"(exports2) {
    "use strict";
    init_crypto_shim();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.SvgConstants = void 0;
    var SvgConstants;
    (function(SvgConstants2) {
      SvgConstants2.DarkModeFragmentId = "DarkMode";
      SvgConstants2.DataUrlPrefix = "data:image/svg+xml;base64,";
      SvgConstants2.DataUrlPrefixWithDarkModeSupport = "data:image/svg+xml;supportsDarkMode=1;base64,";
    })(SvgConstants = exports2.SvgConstants || (exports2.SvgConstants = {}));
  }
});

// node_modules/@codahq/packs-sdk/dist/index.js
var require_dist = __commonJS({
  "node_modules/@codahq/packs-sdk/dist/index.js"(exports2) {
    "use strict";
    init_crypto_shim();
    Object.defineProperty(exports2, "__esModule", { value: true });
    exports2.ValidFetchMethods = exports2.withIdentity = exports2.makeSchema = exports2.makeReferenceSchemaFromObjectSchema = exports2.makeObjectSchema = exports2.makeAttributionNode = exports2.generateSchema = exports2.ValueType = exports2.ValueHintType = exports2.ScaleIconSet = exports2.LinkDisplayType = exports2.ImageOutline = exports2.ImageCornerStyle = exports2.EmailDisplayType = exports2.DurationUnit = exports2.CurrencyFormat = exports2.AttributionNodeType = exports2.ensureUnreachable = exports2.ensureNonEmptyString = exports2.ensureExists = exports2.assertCondition = exports2.SvgConstants = exports2.withQueryParams = exports2.joinUrl = exports2.getQueryParams = exports2.simpleAutocomplete = exports2.makeSimpleAutocompleteMetadataFormula = exports2.autocompleteSearchObjects = exports2.makeParameter = exports2.makeTranslateObjectFormula = exports2.makeSyncTable = exports2.makeFormula = exports2.makeEmptyFormula = exports2.makeDynamicSyncTable = exports2.makeMetadataFormula = exports2.UserVisibleError = exports2.Type = exports2.MissingScopesError = exports2.StatusCodeError = exports2.PrecannedDateRange = exports2.ParameterType = exports2.NetworkConnection = exports2.ConnectionRequirement = exports2.PackDefinitionBuilder = exports2.newPack = exports2.PostSetupType = exports2.AuthenticationType = void 0;
    var types_1 = require_types();
    Object.defineProperty(exports2, "AuthenticationType", { enumerable: true, get: function() {
      return types_1.AuthenticationType;
    } });
    var types_2 = require_types();
    Object.defineProperty(exports2, "PostSetupType", { enumerable: true, get: function() {
      return types_2.PostSetupType;
    } });
    var builder_1 = require_builder();
    Object.defineProperty(exports2, "newPack", { enumerable: true, get: function() {
      return builder_1.newPack;
    } });
    var builder_2 = require_builder();
    Object.defineProperty(exports2, "PackDefinitionBuilder", { enumerable: true, get: function() {
      return builder_2.PackDefinitionBuilder;
    } });
    var api_types_1 = require_api_types();
    Object.defineProperty(exports2, "ConnectionRequirement", { enumerable: true, get: function() {
      return api_types_1.ConnectionRequirement;
    } });
    var api_types_2 = require_api_types();
    Object.defineProperty(exports2, "NetworkConnection", { enumerable: true, get: function() {
      return api_types_2.NetworkConnection;
    } });
    var api_types_3 = require_api_types();
    Object.defineProperty(exports2, "ParameterType", { enumerable: true, get: function() {
      return api_types_3.ParameterType;
    } });
    var api_types_4 = require_api_types();
    Object.defineProperty(exports2, "PrecannedDateRange", { enumerable: true, get: function() {
      return api_types_4.PrecannedDateRange;
    } });
    var api_1 = require_api();
    Object.defineProperty(exports2, "StatusCodeError", { enumerable: true, get: function() {
      return api_1.StatusCodeError;
    } });
    var api_2 = require_api();
    Object.defineProperty(exports2, "MissingScopesError", { enumerable: true, get: function() {
      return api_2.MissingScopesError;
    } });
    var api_types_5 = require_api_types();
    Object.defineProperty(exports2, "Type", { enumerable: true, get: function() {
      return api_types_5.Type;
    } });
    var api_3 = require_api();
    Object.defineProperty(exports2, "UserVisibleError", { enumerable: true, get: function() {
      return api_3.UserVisibleError;
    } });
    var api_4 = require_api();
    Object.defineProperty(exports2, "makeMetadataFormula", { enumerable: true, get: function() {
      return api_4.makeMetadataFormula;
    } });
    var api_5 = require_api();
    Object.defineProperty(exports2, "makeDynamicSyncTable", { enumerable: true, get: function() {
      return api_5.makeDynamicSyncTable;
    } });
    var api_6 = require_api();
    Object.defineProperty(exports2, "makeEmptyFormula", { enumerable: true, get: function() {
      return api_6.makeEmptyFormula;
    } });
    var api_7 = require_api();
    Object.defineProperty(exports2, "makeFormula", { enumerable: true, get: function() {
      return api_7.makeFormula;
    } });
    var api_8 = require_api();
    Object.defineProperty(exports2, "makeSyncTable", { enumerable: true, get: function() {
      return api_8.makeSyncTable;
    } });
    var api_9 = require_api();
    Object.defineProperty(exports2, "makeTranslateObjectFormula", { enumerable: true, get: function() {
      return api_9.makeTranslateObjectFormula;
    } });
    var api_10 = require_api();
    Object.defineProperty(exports2, "makeParameter", { enumerable: true, get: function() {
      return api_10.makeParameter;
    } });
    var api_11 = require_api();
    Object.defineProperty(exports2, "autocompleteSearchObjects", { enumerable: true, get: function() {
      return api_11.autocompleteSearchObjects;
    } });
    var api_12 = require_api();
    Object.defineProperty(exports2, "makeSimpleAutocompleteMetadataFormula", { enumerable: true, get: function() {
      return api_12.makeSimpleAutocompleteMetadataFormula;
    } });
    var api_13 = require_api();
    Object.defineProperty(exports2, "simpleAutocomplete", { enumerable: true, get: function() {
      return api_13.simpleAutocomplete;
    } });
    var url_1 = require_url();
    Object.defineProperty(exports2, "getQueryParams", { enumerable: true, get: function() {
      return url_1.getQueryParams;
    } });
    var url_2 = require_url();
    Object.defineProperty(exports2, "joinUrl", { enumerable: true, get: function() {
      return url_2.join;
    } });
    var url_3 = require_url();
    Object.defineProperty(exports2, "withQueryParams", { enumerable: true, get: function() {
      return url_3.withQueryParams;
    } });
    var svg_1 = require_svg();
    Object.defineProperty(exports2, "SvgConstants", { enumerable: true, get: function() {
      return svg_1.SvgConstants;
    } });
    var ensure_1 = require_ensure();
    Object.defineProperty(exports2, "assertCondition", { enumerable: true, get: function() {
      return ensure_1.assertCondition;
    } });
    var ensure_2 = require_ensure();
    Object.defineProperty(exports2, "ensureExists", { enumerable: true, get: function() {
      return ensure_2.ensureExists;
    } });
    var ensure_3 = require_ensure();
    Object.defineProperty(exports2, "ensureNonEmptyString", { enumerable: true, get: function() {
      return ensure_3.ensureNonEmptyString;
    } });
    var ensure_4 = require_ensure();
    Object.defineProperty(exports2, "ensureUnreachable", { enumerable: true, get: function() {
      return ensure_4.ensureUnreachable;
    } });
    var schema_1 = require_schema();
    Object.defineProperty(exports2, "AttributionNodeType", { enumerable: true, get: function() {
      return schema_1.AttributionNodeType;
    } });
    var schema_2 = require_schema();
    Object.defineProperty(exports2, "CurrencyFormat", { enumerable: true, get: function() {
      return schema_2.CurrencyFormat;
    } });
    var schema_3 = require_schema();
    Object.defineProperty(exports2, "DurationUnit", { enumerable: true, get: function() {
      return schema_3.DurationUnit;
    } });
    var schema_4 = require_schema();
    Object.defineProperty(exports2, "EmailDisplayType", { enumerable: true, get: function() {
      return schema_4.EmailDisplayType;
    } });
    var schema_5 = require_schema();
    Object.defineProperty(exports2, "ImageCornerStyle", { enumerable: true, get: function() {
      return schema_5.ImageCornerStyle;
    } });
    var schema_6 = require_schema();
    Object.defineProperty(exports2, "ImageOutline", { enumerable: true, get: function() {
      return schema_6.ImageOutline;
    } });
    var schema_7 = require_schema();
    Object.defineProperty(exports2, "LinkDisplayType", { enumerable: true, get: function() {
      return schema_7.LinkDisplayType;
    } });
    var schema_8 = require_schema();
    Object.defineProperty(exports2, "ScaleIconSet", { enumerable: true, get: function() {
      return schema_8.ScaleIconSet;
    } });
    var schema_9 = require_schema();
    Object.defineProperty(exports2, "ValueHintType", { enumerable: true, get: function() {
      return schema_9.ValueHintType;
    } });
    var schema_10 = require_schema();
    Object.defineProperty(exports2, "ValueType", { enumerable: true, get: function() {
      return schema_10.ValueType;
    } });
    var schema_11 = require_schema();
    Object.defineProperty(exports2, "generateSchema", { enumerable: true, get: function() {
      return schema_11.generateSchema;
    } });
    var schema_12 = require_schema();
    Object.defineProperty(exports2, "makeAttributionNode", { enumerable: true, get: function() {
      return schema_12.makeAttributionNode;
    } });
    var schema_13 = require_schema();
    Object.defineProperty(exports2, "makeObjectSchema", { enumerable: true, get: function() {
      return schema_13.makeObjectSchema;
    } });
    var schema_14 = require_schema();
    Object.defineProperty(exports2, "makeReferenceSchemaFromObjectSchema", { enumerable: true, get: function() {
      return schema_14.makeReferenceSchemaFromObjectSchema;
    } });
    var schema_15 = require_schema();
    Object.defineProperty(exports2, "makeSchema", { enumerable: true, get: function() {
      return schema_15.makeSchema;
    } });
    var schema_16 = require_schema();
    Object.defineProperty(exports2, "withIdentity", { enumerable: true, get: function() {
      return schema_16.withIdentity;
    } });
    var api_types_6 = require_api_types();
    Object.defineProperty(exports2, "ValidFetchMethods", { enumerable: true, get: function() {
      return api_types_6.ValidFetchMethods;
    } });
  }
});

// pack.ts
var require_pack = __commonJS({
  "pack.ts"(exports2, module2) {
    "use strict";
    init_crypto_shim();
    var coda = __toESM(require_dist());
    var pack2 = coda.newPack({
      name: "Everhour",
      description: "Connect Everhour time tracking with your Coda docs",
      version: "1.0.0",
      formulaNamespace: "Everhour",
      networkDomains: ["api.everhour.com"]
    });
    pack2.setUserAuthentication({
      type: coda.AuthenticationType.HeaderBearerToken,
      instructionsUrl: "https://everhour.com/developers#authentication",
      getConnectionName: async function(context) {
        return "Everhour API";
      }
    });
    pack2.addFormula({
      name: "Hello",
      description: "A simple test formula",
      parameters: [],
      resultType: coda.ValueType.String,
      execute: async function([], context) {
        return "Hello from Everhour!";
      }
    });
    module2.exports = pack2;
  }
});

// index.ts
init_crypto_shim();
var import_pack = __toESM(require_pack());
module.exports = import_pack.default;
/*! Bundled license information:

pascalcase/index.js:
  (*!
   * pascalcase <https://github.com/jonschlinkert/pascalcase>
   *
   * Copyright (c) 2015-present, Jon ("Schlink") Schlinkert.
   * Licensed under the MIT License.
   *)
*/
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vLi4vLi4vLi4vb3B0L2hvbWVicmV3L2xpYi9ub2RlX21vZHVsZXMvQGNvZGFocS9wYWNrcy1zZGsvbm9kZV9tb2R1bGVzL21lcnNlbm5lLXR3aXN0ZXIvc3JjL21lcnNlbm5lLXR3aXN0ZXIuanMiLCAiLi4vLi4vLi4vLi4vLi4vLi4vb3B0L2hvbWVicmV3L2xpYi9ub2RlX21vZHVsZXMvQGNvZGFocS9wYWNrcy1zZGsvZGlzdC90ZXN0aW5nL2luamVjdGlvbnMvY3J5cHRvX3NoaW0uanMiLCAiLi4vbm9kZV9tb2R1bGVzL0Bjb2RhaHEvcGFja3Mtc2RrL2Rpc3QvdHlwZXMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL0Bjb2RhaHEvcGFja3Mtc2RrL2Rpc3QvYXBpX3R5cGVzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AY29kYWhxL3BhY2tzLXNkay9kaXN0L2hlbHBlcnMvZW5zdXJlLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AY29kYWhxL3BhY2tzLXNkay9kaXN0L2hlbHBlcnMvb2JqZWN0X3V0aWxzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AY29kYWhxL3BhY2tzLXNkay9kaXN0L2hlbHBlcnMvbWlncmF0aW9uLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9wYXNjYWxjYXNlL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AY29kYWhxL3BhY2tzLXNkay9kaXN0L3NjaGVtYS5qcyIsICIuLi9ub2RlX21vZHVsZXMvY2xvbmUvY2xvbmUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2VzLWVycm9ycy9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXMtZXJyb3JzL2V2YWwuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2VzLWVycm9ycy9yYW5nZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXMtZXJyb3JzL3JlZi5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXMtZXJyb3JzL3N5bnRheC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZXMtZXJyb3JzL3R5cGUuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2VzLWVycm9ycy91cmkuanMiLCAiLi4vbm9kZV9tb2R1bGVzL2hhcy1zeW1ib2xzL3NoYW1zLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9oYXMtc3ltYm9scy9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvaGFzLXByb3RvL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9mdW5jdGlvbi1iaW5kL2ltcGxlbWVudGF0aW9uLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9mdW5jdGlvbi1iaW5kL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9oYXNvd24vaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL2dldC1pbnRyaW5zaWMvaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL2VzLWRlZmluZS1wcm9wZXJ0eS9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZ29wZC9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvZGVmaW5lLWRhdGEtcHJvcGVydHkvaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL2hhcy1wcm9wZXJ0eS1kZXNjcmlwdG9ycy9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvc2V0LWZ1bmN0aW9uLWxlbmd0aC9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvY2FsbC1iaW5kL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9jYWxsLWJpbmQvY2FsbEJvdW5kLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9vYmplY3QtaW5zcGVjdC91dGlsLmluc3BlY3QuanMiLCAiLi4vbm9kZV9tb2R1bGVzL29iamVjdC1pbnNwZWN0L2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9zaWRlLWNoYW5uZWwvaW5kZXguanMiLCAiLi4vbm9kZV9tb2R1bGVzL3FzL2xpYi9mb3JtYXRzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9xcy9saWIvdXRpbHMuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3FzL2xpYi9zdHJpbmdpZnkuanMiLCAiLi4vbm9kZV9tb2R1bGVzL3FzL2xpYi9wYXJzZS5qcyIsICIuLi9ub2RlX21vZHVsZXMvcXMvbGliL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9yZXF1aXJlcy1wb3J0L2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9xdWVyeXN0cmluZ2lmeS9pbmRleC5qcyIsICIuLi9ub2RlX21vZHVsZXMvdXJsLXBhcnNlL2luZGV4LmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AY29kYWhxL3BhY2tzLXNkay9kaXN0L2hlbHBlcnMvdXJsLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AY29kYWhxL3BhY2tzLXNkay9kaXN0L2hhbmRsZXJfdGVtcGxhdGVzLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AY29kYWhxL3BhY2tzLXNkay9kaXN0L2FwaS5qcyIsICIuLi9ub2RlX21vZHVsZXMvQGNvZGFocS9wYWNrcy1zZGsvZGlzdC9idWlsZGVyLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AY29kYWhxL3BhY2tzLXNkay9kaXN0L2hlbHBlcnMvc3ZnLmpzIiwgIi4uL25vZGVfbW9kdWxlcy9AY29kYWhxL3BhY2tzLXNkay9kaXN0L2luZGV4LmpzIiwgIi4uL3BhY2sudHMiLCAiLi4vaW5kZXgudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qXG4gIGh0dHBzOi8vZ2l0aHViLmNvbS9iYW5rc2VhbiB3cmFwcGVkIE1ha290byBNYXRzdW1vdG8gYW5kIFRha3VqaSBOaXNoaW11cmEncyBjb2RlIGluIGEgbmFtZXNwYWNlXG4gIHNvIGl0J3MgYmV0dGVyIGVuY2Fwc3VsYXRlZC4gTm93IHlvdSBjYW4gaGF2ZSBtdWx0aXBsZSByYW5kb20gbnVtYmVyIGdlbmVyYXRvcnNcbiAgYW5kIHRoZXkgd29uJ3Qgc3RvbXAgYWxsIG92ZXIgZWFjaG90aGVyJ3Mgc3RhdGUuXG5cbiAgSWYgeW91IHdhbnQgdG8gdXNlIHRoaXMgYXMgYSBzdWJzdGl0dXRlIGZvciBNYXRoLnJhbmRvbSgpLCB1c2UgdGhlIHJhbmRvbSgpXG4gIG1ldGhvZCBsaWtlIHNvOlxuXG4gIHZhciBtID0gbmV3IE1lcnNlbm5lVHdpc3RlcigpO1xuICB2YXIgcmFuZG9tTnVtYmVyID0gbS5yYW5kb20oKTtcblxuICBZb3UgY2FuIGFsc28gY2FsbCB0aGUgb3RoZXIgZ2VucmFuZF97Zm9vfSgpIG1ldGhvZHMgb24gdGhlIGluc3RhbmNlLlxuXG4gIElmIHlvdSB3YW50IHRvIHVzZSBhIHNwZWNpZmljIHNlZWQgaW4gb3JkZXIgdG8gZ2V0IGEgcmVwZWF0YWJsZSByYW5kb21cbiAgc2VxdWVuY2UsIHBhc3MgYW4gaW50ZWdlciBpbnRvIHRoZSBjb25zdHJ1Y3RvcjpcblxuICB2YXIgbSA9IG5ldyBNZXJzZW5uZVR3aXN0ZXIoMTIzKTtcblxuICBhbmQgdGhhdCB3aWxsIGFsd2F5cyBwcm9kdWNlIHRoZSBzYW1lIHJhbmRvbSBzZXF1ZW5jZS5cblxuICBTZWFuIE1jQ3VsbG91Z2ggKGJhbmtzZWFuQGdtYWlsLmNvbSlcbiovXG5cbi8qXG4gICBBIEMtcHJvZ3JhbSBmb3IgTVQxOTkzNywgd2l0aCBpbml0aWFsaXphdGlvbiBpbXByb3ZlZCAyMDAyLzEvMjYuXG4gICBDb2RlZCBieSBUYWt1amkgTmlzaGltdXJhIGFuZCBNYWtvdG8gTWF0c3Vtb3RvLlxuXG4gICBCZWZvcmUgdXNpbmcsIGluaXRpYWxpemUgdGhlIHN0YXRlIGJ5IHVzaW5nIGluaXRfc2VlZChzZWVkKVxuICAgb3IgaW5pdF9ieV9hcnJheShpbml0X2tleSwga2V5X2xlbmd0aCkuXG5cbiAgIENvcHlyaWdodCAoQykgMTk5NyAtIDIwMDIsIE1ha290byBNYXRzdW1vdG8gYW5kIFRha3VqaSBOaXNoaW11cmEsXG4gICBBbGwgcmlnaHRzIHJlc2VydmVkLlxuXG4gICBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXRcbiAgIG1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uc1xuICAgYXJlIG1ldDpcblxuICAgICAxLiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodFxuICAgICAgICBub3RpY2UsIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG5cbiAgICAgMi4gUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHRcbiAgICAgICAgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZVxuICAgICAgICBkb2N1bWVudGF0aW9uIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuXG4gICAgIDMuIFRoZSBuYW1lcyBvZiBpdHMgY29udHJpYnV0b3JzIG1heSBub3QgYmUgdXNlZCB0byBlbmRvcnNlIG9yIHByb21vdGVcbiAgICAgICAgcHJvZHVjdHMgZGVyaXZlZCBmcm9tIHRoaXMgc29mdHdhcmUgd2l0aG91dCBzcGVjaWZpYyBwcmlvciB3cml0dGVuXG4gICAgICAgIHBlcm1pc3Npb24uXG5cbiAgIFRISVMgU09GVFdBUkUgSVMgUFJPVklERUQgQlkgVEhFIENPUFlSSUdIVCBIT0xERVJTIEFORCBDT05UUklCVVRPUlNcbiAgIFwiQVMgSVNcIiBBTkQgQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1RcbiAgIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUlxuICAgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQVJFIERJU0NMQUlNRUQuICBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIE9XTkVSIE9SXG4gICBDT05UUklCVVRPUlMgQkUgTElBQkxFIEZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCxcbiAgIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTyxcbiAgIFBST0NVUkVNRU5UIE9GIFNVQlNUSVRVVEUgR09PRFMgT1IgU0VSVklDRVM7IExPU1MgT0YgVVNFLCBEQVRBLCBPUlxuICAgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRlxuICAgTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkdcbiAgIE5FR0xJR0VOQ0UgT1IgT1RIRVJXSVNFKSBBUklTSU5HIElOIEFOWSBXQVkgT1VUIE9GIFRIRSBVU0UgT0YgVEhJU1xuICAgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG5cblxuICAgQW55IGZlZWRiYWNrIGlzIHZlcnkgd2VsY29tZS5cbiAgIGh0dHA6Ly93d3cubWF0aC5zY2kuaGlyb3NoaW1hLXUuYWMuanAvfm0tbWF0L01UL2VtdC5odG1sXG4gICBlbWFpbDogbS1tYXQgQCBtYXRoLnNjaS5oaXJvc2hpbWEtdS5hYy5qcCAocmVtb3ZlIHNwYWNlKVxuKi9cblxudmFyIE1lcnNlbm5lVHdpc3RlciA9IGZ1bmN0aW9uKHNlZWQpIHtcblx0aWYgKHNlZWQgPT0gdW5kZWZpbmVkKSB7XG5cdFx0c2VlZCA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXHR9XG5cblx0LyogUGVyaW9kIHBhcmFtZXRlcnMgKi9cblx0dGhpcy5OID0gNjI0O1xuXHR0aGlzLk0gPSAzOTc7XG5cdHRoaXMuTUFUUklYX0EgPSAweDk5MDhiMGRmOyAgIC8qIGNvbnN0YW50IHZlY3RvciBhICovXG5cdHRoaXMuVVBQRVJfTUFTSyA9IDB4ODAwMDAwMDA7IC8qIG1vc3Qgc2lnbmlmaWNhbnQgdy1yIGJpdHMgKi9cblx0dGhpcy5MT1dFUl9NQVNLID0gMHg3ZmZmZmZmZjsgLyogbGVhc3Qgc2lnbmlmaWNhbnQgciBiaXRzICovXG5cblx0dGhpcy5tdCA9IG5ldyBBcnJheSh0aGlzLk4pOyAvKiB0aGUgYXJyYXkgZm9yIHRoZSBzdGF0ZSB2ZWN0b3IgKi9cblx0dGhpcy5tdGk9dGhpcy5OKzE7IC8qIG10aT09TisxIG1lYW5zIG10W05dIGlzIG5vdCBpbml0aWFsaXplZCAqL1xuXG5cdGlmIChzZWVkLmNvbnN0cnVjdG9yID09IEFycmF5KSB7XG5cdFx0dGhpcy5pbml0X2J5X2FycmF5KHNlZWQsIHNlZWQubGVuZ3RoKTtcblx0fVxuXHRlbHNlIHtcblx0XHR0aGlzLmluaXRfc2VlZChzZWVkKTtcblx0fVxufVxuXG4vKiBpbml0aWFsaXplcyBtdFtOXSB3aXRoIGEgc2VlZCAqL1xuLyogb3JpZ2luIG5hbWUgaW5pdF9nZW5yYW5kICovXG5NZXJzZW5uZVR3aXN0ZXIucHJvdG90eXBlLmluaXRfc2VlZCA9IGZ1bmN0aW9uKHMpIHtcblx0dGhpcy5tdFswXSA9IHMgPj4+IDA7XG5cdGZvciAodGhpcy5tdGk9MTsgdGhpcy5tdGk8dGhpcy5OOyB0aGlzLm10aSsrKSB7XG5cdFx0dmFyIHMgPSB0aGlzLm10W3RoaXMubXRpLTFdIF4gKHRoaXMubXRbdGhpcy5tdGktMV0gPj4+IDMwKTtcblx0XHR0aGlzLm10W3RoaXMubXRpXSA9ICgoKCgocyAmIDB4ZmZmZjAwMDApID4+PiAxNikgKiAxODEyNDMzMjUzKSA8PCAxNikgKyAocyAmIDB4MDAwMGZmZmYpICogMTgxMjQzMzI1Mylcblx0XHQrIHRoaXMubXRpO1xuXHRcdC8qIFNlZSBLbnV0aCBUQU9DUCBWb2wyLiAzcmQgRWQuIFAuMTA2IGZvciBtdWx0aXBsaWVyLiAqL1xuXHRcdC8qIEluIHRoZSBwcmV2aW91cyB2ZXJzaW9ucywgTVNCcyBvZiB0aGUgc2VlZCBhZmZlY3QgICAqL1xuXHRcdC8qIG9ubHkgTVNCcyBvZiB0aGUgYXJyYXkgbXRbXS4gICAgICAgICAgICAgICAgICAgICAgICAqL1xuXHRcdC8qIDIwMDIvMDEvMDkgbW9kaWZpZWQgYnkgTWFrb3RvIE1hdHN1bW90byAgICAgICAgICAgICAqL1xuXHRcdHRoaXMubXRbdGhpcy5tdGldID4+Pj0gMDtcblx0XHQvKiBmb3IgPjMyIGJpdCBtYWNoaW5lcyAqL1xuXHR9XG59XG5cbi8qIGluaXRpYWxpemUgYnkgYW4gYXJyYXkgd2l0aCBhcnJheS1sZW5ndGggKi9cbi8qIGluaXRfa2V5IGlzIHRoZSBhcnJheSBmb3IgaW5pdGlhbGl6aW5nIGtleXMgKi9cbi8qIGtleV9sZW5ndGggaXMgaXRzIGxlbmd0aCAqL1xuLyogc2xpZ2h0IGNoYW5nZSBmb3IgQysrLCAyMDA0LzIvMjYgKi9cbk1lcnNlbm5lVHdpc3Rlci5wcm90b3R5cGUuaW5pdF9ieV9hcnJheSA9IGZ1bmN0aW9uKGluaXRfa2V5LCBrZXlfbGVuZ3RoKSB7XG5cdHZhciBpLCBqLCBrO1xuXHR0aGlzLmluaXRfc2VlZCgxOTY1MDIxOCk7XG5cdGk9MTsgaj0wO1xuXHRrID0gKHRoaXMuTj5rZXlfbGVuZ3RoID8gdGhpcy5OIDoga2V5X2xlbmd0aCk7XG5cdGZvciAoOyBrOyBrLS0pIHtcblx0XHR2YXIgcyA9IHRoaXMubXRbaS0xXSBeICh0aGlzLm10W2ktMV0gPj4+IDMwKVxuXHRcdHRoaXMubXRbaV0gPSAodGhpcy5tdFtpXSBeICgoKCgocyAmIDB4ZmZmZjAwMDApID4+PiAxNikgKiAxNjY0NTI1KSA8PCAxNikgKyAoKHMgJiAweDAwMDBmZmZmKSAqIDE2NjQ1MjUpKSlcblx0XHQrIGluaXRfa2V5W2pdICsgajsgLyogbm9uIGxpbmVhciAqL1xuXHRcdHRoaXMubXRbaV0gPj4+PSAwOyAvKiBmb3IgV09SRFNJWkUgPiAzMiBtYWNoaW5lcyAqL1xuXHRcdGkrKzsgaisrO1xuXHRcdGlmIChpPj10aGlzLk4pIHsgdGhpcy5tdFswXSA9IHRoaXMubXRbdGhpcy5OLTFdOyBpPTE7IH1cblx0XHRpZiAoaj49a2V5X2xlbmd0aCkgaj0wO1xuXHR9XG5cdGZvciAoaz10aGlzLk4tMTsgazsgay0tKSB7XG5cdFx0dmFyIHMgPSB0aGlzLm10W2ktMV0gXiAodGhpcy5tdFtpLTFdID4+PiAzMCk7XG5cdFx0dGhpcy5tdFtpXSA9ICh0aGlzLm10W2ldIF4gKCgoKChzICYgMHhmZmZmMDAwMCkgPj4+IDE2KSAqIDE1NjYwODM5NDEpIDw8IDE2KSArIChzICYgMHgwMDAwZmZmZikgKiAxNTY2MDgzOTQxKSlcblx0XHQtIGk7IC8qIG5vbiBsaW5lYXIgKi9cblx0XHR0aGlzLm10W2ldID4+Pj0gMDsgLyogZm9yIFdPUkRTSVpFID4gMzIgbWFjaGluZXMgKi9cblx0XHRpKys7XG5cdFx0aWYgKGk+PXRoaXMuTikgeyB0aGlzLm10WzBdID0gdGhpcy5tdFt0aGlzLk4tMV07IGk9MTsgfVxuXHR9XG5cblx0dGhpcy5tdFswXSA9IDB4ODAwMDAwMDA7IC8qIE1TQiBpcyAxOyBhc3N1cmluZyBub24temVybyBpbml0aWFsIGFycmF5ICovXG59XG5cbi8qIGdlbmVyYXRlcyBhIHJhbmRvbSBudW1iZXIgb24gWzAsMHhmZmZmZmZmZl0taW50ZXJ2YWwgKi9cbi8qIG9yaWdpbiBuYW1lIGdlbnJhbmRfaW50MzIgKi9cbk1lcnNlbm5lVHdpc3Rlci5wcm90b3R5cGUucmFuZG9tX2ludCA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgeTtcblx0dmFyIG1hZzAxID0gbmV3IEFycmF5KDB4MCwgdGhpcy5NQVRSSVhfQSk7XG5cdC8qIG1hZzAxW3hdID0geCAqIE1BVFJJWF9BICBmb3IgeD0wLDEgKi9cblxuXHRpZiAodGhpcy5tdGkgPj0gdGhpcy5OKSB7IC8qIGdlbmVyYXRlIE4gd29yZHMgYXQgb25lIHRpbWUgKi9cblx0XHR2YXIga2s7XG5cblx0XHRpZiAodGhpcy5tdGkgPT0gdGhpcy5OKzEpICAvKiBpZiBpbml0X3NlZWQoKSBoYXMgbm90IGJlZW4gY2FsbGVkLCAqL1xuXHRcdFx0dGhpcy5pbml0X3NlZWQoNTQ4OSk7ICAvKiBhIGRlZmF1bHQgaW5pdGlhbCBzZWVkIGlzIHVzZWQgKi9cblxuXHRcdGZvciAoa2s9MDtrazx0aGlzLk4tdGhpcy5NO2trKyspIHtcblx0XHRcdHkgPSAodGhpcy5tdFtra10mdGhpcy5VUFBFUl9NQVNLKXwodGhpcy5tdFtraysxXSZ0aGlzLkxPV0VSX01BU0spO1xuXHRcdFx0dGhpcy5tdFtra10gPSB0aGlzLm10W2trK3RoaXMuTV0gXiAoeSA+Pj4gMSkgXiBtYWcwMVt5ICYgMHgxXTtcblx0XHR9XG5cdFx0Zm9yICg7a2s8dGhpcy5OLTE7a2srKykge1xuXHRcdFx0eSA9ICh0aGlzLm10W2trXSZ0aGlzLlVQUEVSX01BU0spfCh0aGlzLm10W2trKzFdJnRoaXMuTE9XRVJfTUFTSyk7XG5cdFx0XHR0aGlzLm10W2trXSA9IHRoaXMubXRba2srKHRoaXMuTS10aGlzLk4pXSBeICh5ID4+PiAxKSBeIG1hZzAxW3kgJiAweDFdO1xuXHRcdH1cblx0XHR5ID0gKHRoaXMubXRbdGhpcy5OLTFdJnRoaXMuVVBQRVJfTUFTSyl8KHRoaXMubXRbMF0mdGhpcy5MT1dFUl9NQVNLKTtcblx0XHR0aGlzLm10W3RoaXMuTi0xXSA9IHRoaXMubXRbdGhpcy5NLTFdIF4gKHkgPj4+IDEpIF4gbWFnMDFbeSAmIDB4MV07XG5cblx0XHR0aGlzLm10aSA9IDA7XG5cdH1cblxuXHR5ID0gdGhpcy5tdFt0aGlzLm10aSsrXTtcblxuXHQvKiBUZW1wZXJpbmcgKi9cblx0eSBePSAoeSA+Pj4gMTEpO1xuXHR5IF49ICh5IDw8IDcpICYgMHg5ZDJjNTY4MDtcblx0eSBePSAoeSA8PCAxNSkgJiAweGVmYzYwMDAwO1xuXHR5IF49ICh5ID4+PiAxOCk7XG5cblx0cmV0dXJuIHkgPj4+IDA7XG59XG5cbi8qIGdlbmVyYXRlcyBhIHJhbmRvbSBudW1iZXIgb24gWzAsMHg3ZmZmZmZmZl0taW50ZXJ2YWwgKi9cbi8qIG9yaWdpbiBuYW1lIGdlbnJhbmRfaW50MzEgKi9cbk1lcnNlbm5lVHdpc3Rlci5wcm90b3R5cGUucmFuZG9tX2ludDMxID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiAodGhpcy5yYW5kb21faW50KCk+Pj4xKTtcbn1cblxuLyogZ2VuZXJhdGVzIGEgcmFuZG9tIG51bWJlciBvbiBbMCwxXS1yZWFsLWludGVydmFsICovXG4vKiBvcmlnaW4gbmFtZSBnZW5yYW5kX3JlYWwxICovXG5NZXJzZW5uZVR3aXN0ZXIucHJvdG90eXBlLnJhbmRvbV9pbmNsID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLnJhbmRvbV9pbnQoKSooMS4wLzQyOTQ5NjcyOTUuMCk7XG5cdC8qIGRpdmlkZWQgYnkgMl4zMi0xICovXG59XG5cbi8qIGdlbmVyYXRlcyBhIHJhbmRvbSBudW1iZXIgb24gWzAsMSktcmVhbC1pbnRlcnZhbCAqL1xuTWVyc2VubmVUd2lzdGVyLnByb3RvdHlwZS5yYW5kb20gPSBmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXMucmFuZG9tX2ludCgpKigxLjAvNDI5NDk2NzI5Ni4wKTtcblx0LyogZGl2aWRlZCBieSAyXjMyICovXG59XG5cbi8qIGdlbmVyYXRlcyBhIHJhbmRvbSBudW1iZXIgb24gKDAsMSktcmVhbC1pbnRlcnZhbCAqL1xuLyogb3JpZ2luIG5hbWUgZ2VucmFuZF9yZWFsMyAqL1xuTWVyc2VubmVUd2lzdGVyLnByb3RvdHlwZS5yYW5kb21fZXhjbCA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gKHRoaXMucmFuZG9tX2ludCgpICsgMC41KSooMS4wLzQyOTQ5NjcyOTYuMCk7XG5cdC8qIGRpdmlkZWQgYnkgMl4zMiAqL1xufVxuXG4vKiBnZW5lcmF0ZXMgYSByYW5kb20gbnVtYmVyIG9uIFswLDEpIHdpdGggNTMtYml0IHJlc29sdXRpb24qL1xuLyogb3JpZ2luIG5hbWUgZ2VucmFuZF9yZXM1MyAqL1xuTWVyc2VubmVUd2lzdGVyLnByb3RvdHlwZS5yYW5kb21fbG9uZyA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgYT10aGlzLnJhbmRvbV9pbnQoKT4+PjUsIGI9dGhpcy5yYW5kb21faW50KCk+Pj42O1xuXHRyZXR1cm4oYSo2NzEwODg2NC4wK2IpKigxLjAvOTAwNzE5OTI1NDc0MDk5Mi4wKTtcbn1cblxuLyogVGhlc2UgcmVhbCB2ZXJzaW9ucyBhcmUgZHVlIHRvIElzYWt1IFdhZGEsIDIwMDIvMDEvMDkgYWRkZWQgKi9cblxubW9kdWxlLmV4cG9ydHMgPSBNZXJzZW5uZVR3aXN0ZXI7XG4iLCAiLy8gaXZtIGRvZW5zJ3QgaGF2ZSBhIGNyeXB0byBpbXBsZW1lbnRhdGlvbi4gc2luY2Ugd2UgYnJvd3NlcmlmeSBtb2R1bGVzIGFscmVhZHksIHRoaXMgc2hpbSBpbXBsZW1lbnRzIHRoZSBicm93c2VyIGNyeXB0byBpbnRlcmZhY2UuXG4vLyBpbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20va3VtYXZpcy9wb2x5ZmlsbC1jcnlwdG8uZ2V0cmFuZG9tdmFsdWVzL2Jsb2IvbWFzdGVyL2luZGV4LmpzXG5cbnZhciBNZXJzZW5uZVR3aXN0ZXIgPSByZXF1aXJlKCdtZXJzZW5uZS10d2lzdGVyJyk7XG5cbnZhciB0d2lzdGVyID0gbmV3IE1lcnNlbm5lVHdpc3RlcihNYXRoLnJhbmRvbSgpICogTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIpO1xuXG5mdW5jdGlvbiBnZXRSYW5kb21WYWx1ZXMoYWJ2KSB7XG4gIHZhciBsID0gYWJ2Lmxlbmd0aDtcbiAgd2hpbGUgKGwtLSkge1xuICAgIGFidltsXSA9IE1hdGguZmxvb3IocmFuZG9tRmxvYXQoKSAqIDI1Nik7XG4gIH1cbiAgcmV0dXJuIGFidjtcbn1cblxuZnVuY3Rpb24gcmFuZG9tRmxvYXQoKSB7XG4gIHJldHVybiB0d2lzdGVyLnJhbmRvbSgpO1xufVxuXG5leHBvcnQgY29uc3QgY3J5cHRvID0ge1xuICBnZXRSYW5kb21WYWx1ZXMsXG59O1xuXG4vLyBlc2J1aWxkIGlzbid0IGluamVjdGluZyB0aGUgc2hpbSBleHBvcnRzIGludG8gZ2xvYmFsLiBpbiB0aGlzIHBhcnRpY3VsYXIgY2FzZSwgY3J5cHRvXG4vLyBsaWJyYXJ5IGlzIHVzdWFsbHkgdXNlZCBhcyBnbG9iYWwuY3J5cHRvIHdoaWNoIHJldHVybnMgdW5kZWZpbmVkIG90aGVyd2lzZS5cbi8vXG4vLyBhbHRlcm5hdGl2ZWx5IGEgZmV3IG90aGVyIGFwcHJvYWNoZXMgYXJlIHRyaWVkOlxuLy8gLSBzaGltIGdsb2JhbDogd2hpY2ggZG9lc24ndCB3b3JrIHdpdGggVk0gc29tZWhvdyBzaW5jZSB0aGUgVk0gbWFuYWdlcyBjb250ZXh0Lmdsb2JhbCB3aGljaFxuLy8gICBzZWVtcyBhIGRpZmZlcmVudCBvYmplY3QgZnJvbSB0aGUgZ2xvYmFsIGhlcmUuIGNhdXNpbmcgbWFuaWZlc3QgdG8gYmUgdW5kZWZpbmVkLlxuLy8gLSB1c2UgZXNidWlsZCBkZWZpbmUgZ2xvYmFsLmNyeXB0bzogY3J5cHRvLiBkaWRuJ3Qgd29yay5cbi8vIC0gaHR0cHM6Ly9naXRodWIuY29tL2V2YW53L2VzYnVpbGQvaXNzdWVzLzI5NiBEaWRuJ3Qgd29yayBzaW5jZSB3ZSBiYW5uZWQgZXZhbCBpbiBWTS5cbi8vXG4vLyBMYXN0bHksIHdlIGNhbiBtb3ZlIHRoaXMgc2hpbSB0byB0aHVuayBidW5kbGUgYW5kIHJlZ2lzdGVyIGl0IGludG8gZ2xvYmFsIGZyb20gdGhlIHRodW5rIGJ1bmRsZS5cbi8vIEl0IGhhcyB0aGUgc2FtZSBzaWRlIGVmZmVjdCBvZiB0aGUgc2hpbSB0aG91Z2guXG4vL1xuLy8gcGxlYXNlIG5vdGUgdGhhdCB0aGlzIGNhdXNlcyBhIGdsb2JhbCBsZWFrIGFuZCBuZWVkcyBiZSBpZ25vcmVkIGluIHNvbWUgY29uZmlncy5cbi8vIE5vZGUgMTkgaGFzIG5hdGl2ZSBzdXBwb3J0IGZvciB0aGUgY3J5cHRvIG1vZHVsZS5cbmlmICghZ2xvYmFsLmNyeXB0bz8uZ2V0UmFuZG9tVmFsdWVzKSB7XG4gIGdsb2JhbC5jcnlwdG8gPSBjcnlwdG87XG59XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlN5bmNJbnRlcnZhbCA9IGV4cG9ydHMuUXVvdGFMaW1pdFR5cGUgPSBleHBvcnRzLkZlYXR1cmVTZXQgPSBleHBvcnRzLlBvc3RTZXR1cFR5cGUgPSBleHBvcnRzLkF1dGhlbnRpY2F0aW9uVHlwZSA9IGV4cG9ydHMuUGFja0NhdGVnb3J5ID0gdm9pZCAwO1xuLyoqXG4gKiBAZGVwcmVjYXRlZFxuICovXG52YXIgUGFja0NhdGVnb3J5O1xuKGZ1bmN0aW9uIChQYWNrQ2F0ZWdvcnkpIHtcbiAgICBQYWNrQ2F0ZWdvcnlbXCJDUk1cIl0gPSBcIkNSTVwiO1xuICAgIFBhY2tDYXRlZ29yeVtcIkNhbGVuZGFyXCJdID0gXCJDYWxlbmRhclwiO1xuICAgIFBhY2tDYXRlZ29yeVtcIkNvbW11bmljYXRpb25cIl0gPSBcIkNvbW11bmljYXRpb25cIjtcbiAgICBQYWNrQ2F0ZWdvcnlbXCJEYXRhU3RvcmFnZVwiXSA9IFwiRGF0YVN0b3JhZ2VcIjtcbiAgICBQYWNrQ2F0ZWdvcnlbXCJEZXNpZ25cIl0gPSBcIkRlc2lnblwiO1xuICAgIFBhY2tDYXRlZ29yeVtcIkZpbmFuY2lhbFwiXSA9IFwiRmluYW5jaWFsXCI7XG4gICAgUGFja0NhdGVnb3J5W1wiRnVuXCJdID0gXCJGdW5cIjtcbiAgICBQYWNrQ2F0ZWdvcnlbXCJHZW9cIl0gPSBcIkdlb1wiO1xuICAgIFBhY2tDYXRlZ29yeVtcIklUXCJdID0gXCJJVFwiO1xuICAgIFBhY2tDYXRlZ29yeVtcIk1hdGhlbWF0aWNzXCJdID0gXCJNYXRoZW1hdGljc1wiO1xuICAgIFBhY2tDYXRlZ29yeVtcIk9yZ2FuaXphdGlvblwiXSA9IFwiT3JnYW5pemF0aW9uXCI7XG4gICAgUGFja0NhdGVnb3J5W1wiUmVjcnVpdGluZ1wiXSA9IFwiUmVjcnVpdGluZ1wiO1xuICAgIFBhY2tDYXRlZ29yeVtcIlNob3BwaW5nXCJdID0gXCJTaG9wcGluZ1wiO1xuICAgIFBhY2tDYXRlZ29yeVtcIlNvY2lhbFwiXSA9IFwiU29jaWFsXCI7XG4gICAgUGFja0NhdGVnb3J5W1wiU3BvcnRzXCJdID0gXCJTcG9ydHNcIjtcbiAgICBQYWNrQ2F0ZWdvcnlbXCJUcmF2ZWxcIl0gPSBcIlRyYXZlbFwiO1xuICAgIFBhY2tDYXRlZ29yeVtcIldlYXRoZXJcIl0gPSBcIldlYXRoZXJcIjtcbn0pKFBhY2tDYXRlZ29yeSA9IGV4cG9ydHMuUGFja0NhdGVnb3J5IHx8IChleHBvcnRzLlBhY2tDYXRlZ29yeSA9IHt9KSk7XG4vKipcbiAqIEF1dGhlbnRpY2F0aW9uIHR5cGVzIHN1cHBvcnRlZCBieSBDb2RhIFBhY2tzLlxuICovXG52YXIgQXV0aGVudGljYXRpb25UeXBlO1xuKGZ1bmN0aW9uIChBdXRoZW50aWNhdGlvblR5cGUpIHtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdGhpcyBwYWNrIGRvZXMgbm90IHVzZSBhdXRoZW50aWNhdGlvbi4gWW91IG1heSBhbHNvIG9taXQgYW4gYXV0aGVudGljYXRpb24gZGVjbGFyYXRpb24gZW50aXJlbHkuXG4gICAgICovXG4gICAgQXV0aGVudGljYXRpb25UeXBlW1wiTm9uZVwiXSA9IFwiTm9uZVwiO1xuICAgIC8qKlxuICAgICAqIEF1dGhlbnRpY2F0ZSB1c2luZyBhbiBIVFRQIGhlYWRlciBvZiB0aGUgZm9ybSBgQXV0aG9yaXphdGlvbjogQmVhcmVyIDx0b2tlbj5gLlxuICAgICAqL1xuICAgIEF1dGhlbnRpY2F0aW9uVHlwZVtcIkhlYWRlckJlYXJlclRva2VuXCJdID0gXCJIZWFkZXJCZWFyZXJUb2tlblwiO1xuICAgIC8qKlxuICAgICAqIEF1dGhlbnRpY2F0ZSB1c2luZyBhbiBIVFRQIGhlYWRlciB3aXRoIGEgY3VzdG9tIG5hbWUgYW5kIHRva2VuIHByZWZpeCB0aGF0IHlvdSBzcGVjaWZ5LlxuICAgICAqIFRoZSBoZWFkZXIgbmFtZSBpcyBkZWZpbmVkIGluIHRoZSB7QGxpbmsgQ3VzdG9tSGVhZGVyVG9rZW5BdXRoZW50aWNhdGlvbi5oZWFkZXJOYW1lfSBwcm9wZXJ0eS5cbiAgICAgKi9cbiAgICBBdXRoZW50aWNhdGlvblR5cGVbXCJDdXN0b21IZWFkZXJUb2tlblwiXSA9IFwiQ3VzdG9tSGVhZGVyVG9rZW5cIjtcbiAgICAvKipcbiAgICAgKiBBdXRoZW50aWNhdGUgdXNpbmcgYSB0b2tlbiB0aGF0IGlzIHBhc3NlZCBhcyBhIFVSTCBwYXJhbWV0ZXIgd2l0aCBlYWNoIHJlcXVlc3QsIGUuZy5cbiAgICAgKiBodHRwczovL2V4YW1wbGUuY29tL2FwaT9wYXJhbU5hbWU9dG9rZW5cbiAgICAgKlxuICAgICAqIFRoZSBwYXJhbWV0ZXIgbmFtZSBpcyBkZWZpbmVkIGluIHRoZSB7QGxpbmsgUXVlcnlQYXJhbVRva2VuQXV0aGVudGljYXRpb24ucGFyYW1OYW1lfSBwcm9wZXJ0eS5cbiAgICAgKi9cbiAgICBBdXRoZW50aWNhdGlvblR5cGVbXCJRdWVyeVBhcmFtVG9rZW5cIl0gPSBcIlF1ZXJ5UGFyYW1Ub2tlblwiO1xuICAgIC8qKlxuICAgICAqIEF1dGhlbnRpY2F0ZSB1c2luZyBtdWx0aXBsZSB0b2tlbnMsIGVhY2ggcGFzc2VkIGFzIGEgZGlmZmVyZW50IFVSTCBwYXJhbWV0ZXIsIGUuZy5cbiAgICAgKiBodHRwczovL2V4YW1wbGUuY29tL2FwaT9wYXJhbTE9dG9rZW4xJnBhcmFtMj10b2tlbjJcbiAgICAgKlxuICAgICAqIFRoZSBwYXJhbWV0ZXIgbmFtZXMgYXJlIGRlZmluZWQgaW4gdGhlIHtAbGluayBNdWx0aVF1ZXJ5UGFyYW1Ub2tlbkF1dGhlbnRpY2F0aW9uLnBhcmFtc30gYXJyYXkgcHJvcGVydHkuXG4gICAgICovXG4gICAgQXV0aGVudGljYXRpb25UeXBlW1wiTXVsdGlRdWVyeVBhcmFtVG9rZW5cIl0gPSBcIk11bHRpUXVlcnlQYXJhbVRva2VuXCI7XG4gICAgLyoqXG4gICAgICogQXV0aGVudGljYXRlIHVzaW5nIE9BdXRoMi4gWW91IG11c3Qgc3BlY2lmeSB0aGUgYXV0aG9yaXphdGlvbiBVUkwsIHRva2VuIGV4Y2hhbmdlIFVSTCwgYW5kXG4gICAgICogc2NvcGVzIGhlcmUgYXMgcGFydCBvZiB0aGUgcGFjayBkZWZpbml0aW9uLiBZb3UnbGwgcHJvdmlkZSB0aGUgYXBwbGljYXRpb24ncyBjbGllbnQgSUQgYW5kXG4gICAgICogY2xpZW50IHNlY3JldCBpbiB0aGUgcGFjayBtYW5hZ2VtZW50IFVJLCBzbyB0aGF0IHRoZXNlIGNhbiBiZSBzdG9yZWQgc2VjdXJlbHkuXG4gICAgICpcbiAgICAgKiBUaGUgQVBJIG11c3QgdXNlIGEgKGxhcmdlbHkpIHN0YW5kYXJkcy1jb21wbGlhbnQgaW1wbGVtZW50YXRpb24gb2YgT0F1dGgyLlxuICAgICAqL1xuICAgIEF1dGhlbnRpY2F0aW9uVHlwZVtcIk9BdXRoMlwiXSA9IFwiT0F1dGgyXCI7XG4gICAgLyoqXG4gICAgICogQXV0aGVudGljYXRlIHVzaW5nIEhUVFAgQmFzaWMgYXV0aG9yaXphdGlvbi4gVGhlIHVzZXIgcHJvdmlkZXMgYSB1c2VybmFtZSBhbmQgcGFzc3dvcmRcbiAgICAgKiAoc29tZXRpbWVzIG9wdGlvbmFsKSB3aGljaCBhcmUgaW5jbHVkZWQgYXMgYW4gSFRUUCBoZWFkZXIgYWNjb3JkaW5nIHRvIHRoZSBCYXNpYyBhdXRoIHN0YW5kYXJkLlxuICAgICAqXG4gICAgICogU2VlIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Jhc2ljX2FjY2Vzc19hdXRoZW50aWNhdGlvblxuICAgICAqL1xuICAgIEF1dGhlbnRpY2F0aW9uVHlwZVtcIldlYkJhc2ljXCJdID0gXCJXZWJCYXNpY1wiO1xuICAgIC8qKlxuICAgICAqIEF1dGhlbnRpY2F0ZSBpbiBhIGN1c3RvbSB3YXkgYnkgaGF2aW5nIG9uZSBvciBtb3JlIGFyYml0cmFyeSBzZWNyZXQgdmFsdWVzIGluc2VydGVkIGludG8gdGhlIHJlcXVlc3QgVVJMLCBib2R5LFxuICAgICAqIGhlYWRlcnMsIG9yIHRoZSBmb3JtIGRhdGEgdXNpbmcgdGVtcGxhdGUgcmVwbGFjZW1lbnQuIFNlZSB7QGxpbmsgQ3VzdG9tQXV0aGVudGljYXRpb259LlxuICAgICAqL1xuICAgIEF1dGhlbnRpY2F0aW9uVHlwZVtcIkN1c3RvbVwiXSA9IFwiQ3VzdG9tXCI7XG4gICAgLyoqXG4gICAgICogQXV0aGVudGljYXRlIHRvIEFtYXpvbiBXZWIgU2VydmljZXMgdXNpbmcgYW4gSUFNIGFjY2VzcyBrZXkgaWQgJiBzZWNyZXQgYWNjZXNzIGtleSBwYWlyLlxuICAgICAqIFNlZSBodHRwczovL2RvY3MuYXdzLmFtYXpvbi5jb20vQW1hem9uUzMvbGF0ZXN0L0FQSS9zaWctdjQtYXV0aGVudGljYXRpbmctcmVxdWVzdHMuaHRtbFxuICAgICAqL1xuICAgIEF1dGhlbnRpY2F0aW9uVHlwZVtcIkFXU0FjY2Vzc0tleVwiXSA9IFwiQVdTQWNjZXNzS2V5XCI7XG4gICAgLyoqXG4gICAgICogQXV0aGVudGljYXRlIHRvIEFtYXpvbiBXZWIgU2VydmljZXMgYnkgYXNzdW1pbmcgYW4gSUFNIHJvbGUuXG4gICAgICogU2VlIGh0dHBzOi8vZG9jcy5hd3MuYW1hem9uLmNvbS9BbWF6b25TMy9sYXRlc3QvQVBJL3NpZy12NC1hdXRoZW50aWNhdGluZy1yZXF1ZXN0cy5odG1sXG4gICAgICpcbiAgICAgKiBUaGlzIGlzIG5vdCB5ZXQgc3VwcG9ydGVkLlxuICAgICAqL1xuICAgIEF1dGhlbnRpY2F0aW9uVHlwZVtcIkFXU0Fzc3VtZVJvbGVcIl0gPSBcIkFXU0Fzc3VtZVJvbGVcIjtcbiAgICAvKipcbiAgICAgKiBBdXRoZW50aWNhdGUgdXNpbmcgYSBDb2RhIFJFU1QgQVBJIHRva2VuLCBzZW50IGFzIGFuIEhUVFAgaGVhZGVyLlxuICAgICAqXG4gICAgICogVGhpcyBpcyBpZGVudGljYWwgdG8ge0BsaW5rIEF1dGhlbnRpY2F0aW9uVHlwZS5IZWFkZXJCZWFyZXJUb2tlbn0gZXhjZXB0IHRoZSB1c2VyIHdpbCBiZSBwcmVzZW50ZWRcbiAgICAgKiB3aXRoIGEgVUkgdG8gZ2VuZXJhdGUgYW4gQVBJIHRva2VuIHJhdGhlciB0aGFuIG5lZWRpbmcgdG8gcGFzdGUgYW4gYXJiaXRyYXJ5IEFQSVxuICAgICAqIHRva2VuIGludG8gYSB0ZXh0IGlucHV0LlxuICAgICAqXG4gICAgICogVGhpcyBpcyBwcmltYXJpbHkgZm9yIHVzZSBieSBDb2RhLWF1dGhvcmVkIHBhY2tzLCBhcyBpdCBpcyBvbmx5IHJlbGV2YW50IGZvciBpbnRlcmFjdGluZyB3aXRoIHRoZVxuICAgICAqIENvZGEgUkVTVCBBUEkuXG4gICAgICovXG4gICAgQXV0aGVudGljYXRpb25UeXBlW1wiQ29kYUFwaUhlYWRlckJlYXJlclRva2VuXCJdID0gXCJDb2RhQXBpSGVhZGVyQmVhcmVyVG9rZW5cIjtcbiAgICAvKipcbiAgICAgKiBPbmx5IGZvciB1c2UgYnkgQ29kYS1hdXRob3JlZCBwYWNrcy5cbiAgICAgKi9cbiAgICBBdXRoZW50aWNhdGlvblR5cGVbXCJWYXJpb3VzXCJdID0gXCJWYXJpb3VzXCI7XG59KShBdXRoZW50aWNhdGlvblR5cGUgPSBleHBvcnRzLkF1dGhlbnRpY2F0aW9uVHlwZSB8fCAoZXhwb3J0cy5BdXRoZW50aWNhdGlvblR5cGUgPSB7fSkpO1xuLyoqXG4gKiBFbnVtZXJhdGlvbiBvZiBwb3N0LWFjY291bnQtc2V0dXAgc3RlcCB0eXBlcy4gU2VlIHtAbGluayBQb3N0U2V0dXB9LlxuICovXG52YXIgUG9zdFNldHVwVHlwZTtcbihmdW5jdGlvbiAoUG9zdFNldHVwVHlwZSkge1xuICAgIC8qKlxuICAgICAqIFNlZSB7QGxpbmsgU2V0RW5kcG9pbnR9LlxuICAgICAqL1xuICAgIFBvc3RTZXR1cFR5cGVbXCJTZXRFbmRwb2ludFwiXSA9IFwiU2V0RW5kUG9pbnRcIjtcbn0pKFBvc3RTZXR1cFR5cGUgPSBleHBvcnRzLlBvc3RTZXR1cFR5cGUgfHwgKGV4cG9ydHMuUG9zdFNldHVwVHlwZSA9IHt9KSk7XG4vKipcbiAqIEBkZXByZWNhdGVkXG4gKiBAaWdub3JlXG4gKi9cbnZhciBGZWF0dXJlU2V0O1xuKGZ1bmN0aW9uIChGZWF0dXJlU2V0KSB7XG4gICAgRmVhdHVyZVNldFtcIkJhc2ljXCJdID0gXCJCYXNpY1wiO1xuICAgIEZlYXR1cmVTZXRbXCJQcm9cIl0gPSBcIlByb1wiO1xuICAgIEZlYXR1cmVTZXRbXCJUZWFtXCJdID0gXCJUZWFtXCI7XG4gICAgRmVhdHVyZVNldFtcIkVudGVycHJpc2VcIl0gPSBcIkVudGVycHJpc2VcIjtcbn0pKEZlYXR1cmVTZXQgPSBleHBvcnRzLkZlYXR1cmVTZXQgfHwgKGV4cG9ydHMuRmVhdHVyZVNldCA9IHt9KSk7XG4vKipcbiAqIEBpZ25vcmVcbiAqIEBkZXByZWNhdGVkXG4gKi9cbnZhciBRdW90YUxpbWl0VHlwZTtcbihmdW5jdGlvbiAoUXVvdGFMaW1pdFR5cGUpIHtcbiAgICBRdW90YUxpbWl0VHlwZVtcIkFjdGlvblwiXSA9IFwiQWN0aW9uXCI7XG4gICAgUXVvdGFMaW1pdFR5cGVbXCJHZXR0ZXJcIl0gPSBcIkdldHRlclwiO1xuICAgIFF1b3RhTGltaXRUeXBlW1wiU3luY1wiXSA9IFwiU3luY1wiO1xuICAgIFF1b3RhTGltaXRUeXBlW1wiTWV0YWRhdGFcIl0gPSBcIk1ldGFkYXRhXCI7XG59KShRdW90YUxpbWl0VHlwZSA9IGV4cG9ydHMuUXVvdGFMaW1pdFR5cGUgfHwgKGV4cG9ydHMuUXVvdGFMaW1pdFR5cGUgPSB7fSkpO1xuLyoqXG4gKiBAaWdub3JlXG4gKiBAZGVwcmVjYXRlZFxuICovXG52YXIgU3luY0ludGVydmFsO1xuKGZ1bmN0aW9uIChTeW5jSW50ZXJ2YWwpIHtcbiAgICBTeW5jSW50ZXJ2YWxbXCJNYW51YWxcIl0gPSBcIk1hbnVhbFwiO1xuICAgIFN5bmNJbnRlcnZhbFtcIkRhaWx5XCJdID0gXCJEYWlseVwiO1xuICAgIFN5bmNJbnRlcnZhbFtcIkhvdXJseVwiXSA9IFwiSG91cmx5XCI7XG4gICAgU3luY0ludGVydmFsW1wiRXZlcnlUZW5NaW51dGVzXCJdID0gXCJFdmVyeVRlbk1pbnV0ZXNcIjtcbn0pKFN5bmNJbnRlcnZhbCA9IGV4cG9ydHMuU3luY0ludGVydmFsIHx8IChleHBvcnRzLlN5bmNJbnRlcnZhbCA9IHt9KSk7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlByZWNhbm5lZERhdGVSYW5nZSA9IGV4cG9ydHMuVmFsaWRGZXRjaE1ldGhvZHMgPSBleHBvcnRzLk5ldHdvcmtDb25uZWN0aW9uID0gZXhwb3J0cy5Db25uZWN0aW9uUmVxdWlyZW1lbnQgPSBleHBvcnRzLlBhcmFtZXRlclR5cGVJbnB1dE1hcCA9IGV4cG9ydHMuUGFyYW1ldGVyVHlwZSA9IGV4cG9ydHMuZmlsZUFycmF5ID0gZXhwb3J0cy5pbWFnZUFycmF5ID0gZXhwb3J0cy5odG1sQXJyYXkgPSBleHBvcnRzLmRhdGVBcnJheSA9IGV4cG9ydHMuYm9vbGVhbkFycmF5ID0gZXhwb3J0cy5udW1iZXJBcnJheSA9IGV4cG9ydHMuc3RyaW5nQXJyYXkgPSBleHBvcnRzLmlzQXJyYXlUeXBlID0gZXhwb3J0cy5UeXBlID0gdm9pZCAwO1xuLyoqXG4gKiBNYXJrZXJzIHVzZWQgaW50ZXJuYWxseSB0byByZXByZXNlbnQgZGF0YSB0eXBlcyBmb3IgcGFyYW1ldGVycyBhbmQgcmV0dXJuIHZhbHVlcy5cbiAqIEl0IHNob3VsZCBub3QgYmUgbmVjZXNzYXJ5IHRvIGV2ZXIgdXNlIHRoZXNlIHZhbHVlcyBkaXJlY3RseS5cbiAqXG4gKiBXaGVuIGRlZmluaW5nIGEgcGFyYW1ldGVyLCB1c2Uge0BsaW5rIFBhcmFtZXRlclR5cGV9LiBXaGVuIGRlZmluaW5nXG4gKiBhIGZvcm11bGEgcmV0dXJuIHZhbHVlLCBvciBwcm9wZXJ0aWVzIHdpdGhpbiBhbiBvYmplY3QgcmV0dXJuIHZhbHVlLFxuICogdXNlIHtAbGluayBWYWx1ZVR5cGV9LlxuICovXG52YXIgVHlwZTtcbihmdW5jdGlvbiAoVHlwZSkge1xuICAgIFR5cGVbVHlwZVtcInN0cmluZ1wiXSA9IDBdID0gXCJzdHJpbmdcIjtcbiAgICBUeXBlW1R5cGVbXCJudW1iZXJcIl0gPSAxXSA9IFwibnVtYmVyXCI7XG4gICAgVHlwZVtUeXBlW1wib2JqZWN0XCJdID0gMl0gPSBcIm9iamVjdFwiO1xuICAgIFR5cGVbVHlwZVtcImJvb2xlYW5cIl0gPSAzXSA9IFwiYm9vbGVhblwiO1xuICAgIFR5cGVbVHlwZVtcImRhdGVcIl0gPSA0XSA9IFwiZGF0ZVwiO1xuICAgIFR5cGVbVHlwZVtcImh0bWxcIl0gPSA1XSA9IFwiaHRtbFwiO1xuICAgIFR5cGVbVHlwZVtcImltYWdlXCJdID0gNl0gPSBcImltYWdlXCI7XG4gICAgVHlwZVtUeXBlW1wiZmlsZVwiXSA9IDddID0gXCJmaWxlXCI7XG59KShUeXBlID0gZXhwb3J0cy5UeXBlIHx8IChleHBvcnRzLlR5cGUgPSB7fSkpO1xuZnVuY3Rpb24gaXNBcnJheVR5cGUob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBvYmoudHlwZSA9PT0gJ2FycmF5JyAmJiB0eXBlb2Ygb2JqLml0ZW1zID09PSAnbnVtYmVyJztcbn1cbmV4cG9ydHMuaXNBcnJheVR5cGUgPSBpc0FycmF5VHlwZTtcbi8qKiBAZGVwcmVjYXRlZCAqL1xuZXhwb3J0cy5zdHJpbmdBcnJheSA9IHtcbiAgICB0eXBlOiAnYXJyYXknLFxuICAgIGl0ZW1zOiBUeXBlLnN0cmluZyxcbn07XG4vKiogQGRlcHJlY2F0ZWQgKi9cbmV4cG9ydHMubnVtYmVyQXJyYXkgPSB7XG4gICAgdHlwZTogJ2FycmF5JyxcbiAgICBpdGVtczogVHlwZS5udW1iZXIsXG59O1xuLyoqIEBkZXByZWNhdGVkICovXG5leHBvcnRzLmJvb2xlYW5BcnJheSA9IHtcbiAgICB0eXBlOiAnYXJyYXknLFxuICAgIGl0ZW1zOiBUeXBlLmJvb2xlYW4sXG59O1xuLyoqIEBkZXByZWNhdGVkICovXG5leHBvcnRzLmRhdGVBcnJheSA9IHtcbiAgICB0eXBlOiAnYXJyYXknLFxuICAgIGl0ZW1zOiBUeXBlLmRhdGUsXG59O1xuLyoqIEBkZXByZWNhdGVkICovXG5leHBvcnRzLmh0bWxBcnJheSA9IHtcbiAgICB0eXBlOiAnYXJyYXknLFxuICAgIGl0ZW1zOiBUeXBlLmh0bWwsXG59O1xuLyoqIEBkZXByZWNhdGVkICovXG5leHBvcnRzLmltYWdlQXJyYXkgPSB7XG4gICAgdHlwZTogJ2FycmF5JyxcbiAgICBpdGVtczogVHlwZS5pbWFnZSxcbn07XG4vKiogQGRlcHJlY2F0ZWQgKi9cbmV4cG9ydHMuZmlsZUFycmF5ID0ge1xuICAgIHR5cGU6ICdhcnJheScsXG4gICAgaXRlbXM6IFR5cGUuZmlsZSxcbn07XG4vKipcbiAqIEVudW1lcmF0aW9uIG9mIHR5cGVzIG9mIGZvcm11bGEgcGFyYW1ldGVycy4gVGhlc2UgZGVzY3JpYmUgQ29kYSB2YWx1ZSB0eXBlcyAoYXMgb3Bwb3NlZCB0byBKYXZhU2NyaXB0IHZhbHVlIHR5cGVzKS5cbiAqL1xudmFyIFBhcmFtZXRlclR5cGU7XG4oZnVuY3Rpb24gKFBhcmFtZXRlclR5cGUpIHtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgYSBwYXJhbWV0ZXIgdGhhdCBpcyBhIENvZGEgdGV4dCB2YWx1ZS5cbiAgICAgKi9cbiAgICBQYXJhbWV0ZXJUeXBlW1wiU3RyaW5nXCJdID0gXCJzdHJpbmdcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgYSBwYXJhbWV0ZXIgdGhhdCBpcyBhIENvZGEgbnVtYmVyIHZhbHVlLlxuICAgICAqL1xuICAgIFBhcmFtZXRlclR5cGVbXCJOdW1iZXJcIl0gPSBcIm51bWJlclwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyBhIHBhcmFtZXRlciB0aGF0IGlzIGEgQ29kYSBib29sZWFuIHZhbHVlLlxuICAgICAqL1xuICAgIFBhcmFtZXRlclR5cGVbXCJCb29sZWFuXCJdID0gXCJib29sZWFuXCI7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIGEgcGFyYW1ldGVyIHRoYXQgaXMgYSBDb2RhIGRhdGUgdmFsdWUgKHdoaWNoIGluY2x1ZGVzIHRpbWUgYW5kIGRhdGV0aW1lIHZhbHVlcykuXG4gICAgICovXG4gICAgUGFyYW1ldGVyVHlwZVtcIkRhdGVcIl0gPSBcImRhdGVcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgYSBwYXJhbWV0ZXIgdGhhdCBpcyBhIENvZGEgcmljaCB0ZXh0IHZhbHVlIHRoYXQgc2hvdWxkIGJlIHBhc3NlZCB0byB0aGUgcGFjayBhcyBIVE1MLlxuICAgICAqL1xuICAgIFBhcmFtZXRlclR5cGVbXCJIdG1sXCJdID0gXCJodG1sXCI7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIGEgcGFyYW1ldGVyIHRoYXQgaXMgYSBDb2RhIGltYWdlLiBUaGUgcGFjayBpcyBwYXNzZWQgYW4gaW1hZ2UgVVJMLlxuICAgICAqL1xuICAgIFBhcmFtZXRlclR5cGVbXCJJbWFnZVwiXSA9IFwiaW1hZ2VcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgYSBwYXJhbWV0ZXIgdGhhdCBpcyBhIENvZGEgZmlsZS4gVGhlIHBhY2sgaXMgcGFzc2VkIGEgZmlsZSBVUkwuXG4gICAgICovXG4gICAgUGFyYW1ldGVyVHlwZVtcIkZpbGVcIl0gPSBcImZpbGVcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgYSBwYXJhbWV0ZXIgdGhhdCBpcyBhIGxpc3Qgb2YgQ29kYSB0ZXh0IHZhbHVlcy5cbiAgICAgKi9cbiAgICBQYXJhbWV0ZXJUeXBlW1wiU3RyaW5nQXJyYXlcIl0gPSBcInN0cmluZ0FycmF5XCI7XG4gICAgLyoqXG4gICAgICoge0BsaW5rIFN0cmluZ0FycmF5fSB0aGF0IGFjY2VwdHMgdW5wYXJzYWJsZSB2YWx1ZXMgYXMgYHVuZGVmaW5lZGAuXG4gICAgICovXG4gICAgUGFyYW1ldGVyVHlwZVtcIlNwYXJzZVN0cmluZ0FycmF5XCJdID0gXCJzcGFyc2VTdHJpbmdBcnJheVwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyBhIHBhcmFtZXRlciB0aGF0IGlzIGEgbGlzdCBvZiBDb2RhIG51bWJlciB2YWx1ZXMuXG4gICAgICovXG4gICAgUGFyYW1ldGVyVHlwZVtcIk51bWJlckFycmF5XCJdID0gXCJudW1iZXJBcnJheVwiO1xuICAgIC8qKlxuICAgICAqIHtAbGluayBOdW1iZXJBcnJheX0gdGhhdCBhY2NlcHRzIHVucGFyc2FibGUgdmFsdWVzIGFzIGB1bmRlZmluZWRgLlxuICAgICAqL1xuICAgIFBhcmFtZXRlclR5cGVbXCJTcGFyc2VOdW1iZXJBcnJheVwiXSA9IFwic3BhcnNlTnVtYmVyQXJyYXlcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgYSBwYXJhbWV0ZXIgdGhhdCBpcyBhIGxpc3Qgb2YgQ29kYSBib29sZWFuIHZhbHVlcy5cbiAgICAgKi9cbiAgICBQYXJhbWV0ZXJUeXBlW1wiQm9vbGVhbkFycmF5XCJdID0gXCJib29sZWFuQXJyYXlcIjtcbiAgICAvKipcbiAgICAgKiB7QGxpbmsgQm9vbGVhbkFycmF5fSB0aGF0IGFjY2VwdHMgdW5wYXJzYWJsZSB2YWx1ZXMgYXMgYHVuZGVmaW5lZGAuXG4gICAgICovXG4gICAgUGFyYW1ldGVyVHlwZVtcIlNwYXJzZUJvb2xlYW5BcnJheVwiXSA9IFwic3BhcnNlQm9vbGVhbkFycmF5XCI7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIGEgcGFyYW1ldGVyIHRoYXQgaXMgYSBsaXN0IG9mIENvZGEgZGF0ZSB2YWx1ZXMgKHdoaWNoIGluY2x1ZGVzIHRpbWUgYW5kIGRhdGV0aW1lIHZhbHVlcykuXG4gICAgICpcbiAgICAgKiBDdXJyZW50bHksIHdoZW4gc3VjaCBhIHBhcmFtZXRlciBpcyB1c2VkIHdpdGggYSBzeW5jIHRhYmxlIGZvcm11bGEgb3IgYW4gYWN0aW9uIGZvcm11bGFcbiAgICAgKiAoe0BsaW5rIEJhc2VGb3JtdWxhRGVmLmlzQWN0aW9ufSksIHdoaWNoIHdpbGwgZ2VuZXJhdGUgYSBidWlsZGVyIFVJIGZvciBzZWxlY3RpbmcgcGFyYW1ldGVycywgYSBkYXRlIGFycmF5XG4gICAgICogcGFyYW1ldGVyIHdpbGwgYWx3YXlzIHJlbmRlciBhcyBhIGRhdGUgcmFuZ2Ugc2VsZWN0b3IuIEEgZGF0ZSByYW5nZSB3aWxsIGFsd2F5cyBiZSBwYXNzZWQgdG8gYSBwYWNrIGZvcm11bGFcbiAgICAgKiBhcyBhIGxpc3Qgb2YgdHdvIGVsZW1lbnRzLCB0aGUgYmVnaW5uaW5nIG9mIHRoZSByYW5nZSBhbmQgdGhlIGVuZCBvZiB0aGUgcmFuZ2UuXG4gICAgICovXG4gICAgUGFyYW1ldGVyVHlwZVtcIkRhdGVBcnJheVwiXSA9IFwiZGF0ZUFycmF5XCI7XG4gICAgLyoqXG4gICAgICoge0BsaW5rIERhdGVBcnJheX0gdGhhdCBhY2NlcHRzIHVucGFyc2FibGUgdmFsdWVzIGFzIGB1bmRlZmluZWRgLlxuICAgICAqL1xuICAgIFBhcmFtZXRlclR5cGVbXCJTcGFyc2VEYXRlQXJyYXlcIl0gPSBcInNwYXJzZURhdGVBcnJheVwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyBhIHBhcmFtZXRlciB0aGF0IGlzIGEgbGlzdCBvZiBDb2RhIHJpY2ggdGV4dCB2YWx1ZXMgdGhhdCBzaG91bGQgYmUgcGFzc2VkIHRvIHRoZSBwYWNrIGFzIEhUTUwuXG4gICAgICovXG4gICAgUGFyYW1ldGVyVHlwZVtcIkh0bWxBcnJheVwiXSA9IFwiaHRtbEFycmF5YFwiO1xuICAgIC8qKlxuICAgICAqIHtAbGluayBIdG1sQXJyYXl9IHRoYXQgYWNjZXB0cyB1bnBhcnNhYmxlIHZhbHVlcyBhcyBgdW5kZWZpbmVkYC5cbiAgICAgKi9cbiAgICBQYXJhbWV0ZXJUeXBlW1wiU3BhcnNlSHRtbEFycmF5XCJdID0gXCJzcGFyc2VIdG1sQXJyYXlcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgYSBwYXJhbWV0ZXIgdGhhdCBpcyBhIGxpc3Qgb2YgQ29kYSBpbWFnZSB2YWx1ZXMuIFRoZSBwYWNrIGlzIHBhc3NlZCBhIGxpc3Qgb2YgaW1hZ2UgVVJMcy5cbiAgICAgKi9cbiAgICBQYXJhbWV0ZXJUeXBlW1wiSW1hZ2VBcnJheVwiXSA9IFwiaW1hZ2VBcnJheVwiO1xuICAgIC8qKlxuICAgICAqIHtAbGluayBJbWFnZUFycmF5fSB0aGF0IGFjY2VwdHMgdW5wYXJzYWJsZSB2YWx1ZXMgYXMgYHVuZGVmaW5lZGAuXG4gICAgICovXG4gICAgUGFyYW1ldGVyVHlwZVtcIlNwYXJzZUltYWdlQXJyYXlcIl0gPSBcInNwYXJzZUltYWdlQXJyYXlcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgYSBwYXJhbWV0ZXIgdGhhdCBpcyBhIGxpc3Qgb2YgQ29kYSBmaWxlIHZhbHVlcy4gVGhlIHBhY2sgaXMgcGFzc2VkIGEgbGlzdCBvZiBmaWxlIFVSTHMuXG4gICAgICovXG4gICAgUGFyYW1ldGVyVHlwZVtcIkZpbGVBcnJheVwiXSA9IFwiZmlsZUFycmF5XCI7XG4gICAgLyoqXG4gICAgICoge0BsaW5rIEZpbGVBcnJheX0gdGhhdCBhY2NlcHRzIHVucGFyc2FibGUgdmFsdWVzIGFzIGB1bmRlZmluZWRgLlxuICAgICAqL1xuICAgIFBhcmFtZXRlclR5cGVbXCJTcGFyc2VGaWxlQXJyYXlcIl0gPSBcInNwYXJzZUZpbGVBcnJheVwiO1xufSkoUGFyYW1ldGVyVHlwZSA9IGV4cG9ydHMuUGFyYW1ldGVyVHlwZSB8fCAoZXhwb3J0cy5QYXJhbWV0ZXJUeXBlID0ge30pKTtcbmV4cG9ydHMuUGFyYW1ldGVyVHlwZUlucHV0TWFwID0ge1xuICAgIFtQYXJhbWV0ZXJUeXBlLlN0cmluZ106IFR5cGUuc3RyaW5nLFxuICAgIFtQYXJhbWV0ZXJUeXBlLk51bWJlcl06IFR5cGUubnVtYmVyLFxuICAgIFtQYXJhbWV0ZXJUeXBlLkJvb2xlYW5dOiBUeXBlLmJvb2xlYW4sXG4gICAgW1BhcmFtZXRlclR5cGUuRGF0ZV06IFR5cGUuZGF0ZSxcbiAgICBbUGFyYW1ldGVyVHlwZS5IdG1sXTogVHlwZS5odG1sLFxuICAgIFtQYXJhbWV0ZXJUeXBlLkltYWdlXTogVHlwZS5pbWFnZSxcbiAgICBbUGFyYW1ldGVyVHlwZS5GaWxlXTogVHlwZS5maWxlLFxuICAgIFtQYXJhbWV0ZXJUeXBlLlN0cmluZ0FycmF5XTogeyB0eXBlOiAnYXJyYXknLCBpdGVtczogVHlwZS5zdHJpbmcgfSxcbiAgICBbUGFyYW1ldGVyVHlwZS5OdW1iZXJBcnJheV06IHsgdHlwZTogJ2FycmF5JywgaXRlbXM6IFR5cGUubnVtYmVyIH0sXG4gICAgW1BhcmFtZXRlclR5cGUuQm9vbGVhbkFycmF5XTogeyB0eXBlOiAnYXJyYXknLCBpdGVtczogVHlwZS5ib29sZWFuIH0sXG4gICAgW1BhcmFtZXRlclR5cGUuRGF0ZUFycmF5XTogeyB0eXBlOiAnYXJyYXknLCBpdGVtczogVHlwZS5kYXRlIH0sXG4gICAgW1BhcmFtZXRlclR5cGUuSHRtbEFycmF5XTogeyB0eXBlOiAnYXJyYXknLCBpdGVtczogVHlwZS5odG1sIH0sXG4gICAgW1BhcmFtZXRlclR5cGUuSW1hZ2VBcnJheV06IHsgdHlwZTogJ2FycmF5JywgaXRlbXM6IFR5cGUuaW1hZ2UgfSxcbiAgICBbUGFyYW1ldGVyVHlwZS5GaWxlQXJyYXldOiB7IHR5cGU6ICdhcnJheScsIGl0ZW1zOiBUeXBlLmZpbGUgfSxcbiAgICBbUGFyYW1ldGVyVHlwZS5TcGFyc2VTdHJpbmdBcnJheV06IHsgdHlwZTogJ2FycmF5JywgaXRlbXM6IFR5cGUuc3RyaW5nLCBhbGxvd0VtcHR5OiB0cnVlIH0sXG4gICAgW1BhcmFtZXRlclR5cGUuU3BhcnNlTnVtYmVyQXJyYXldOiB7IHR5cGU6ICdhcnJheScsIGl0ZW1zOiBUeXBlLm51bWJlciwgYWxsb3dFbXB0eTogdHJ1ZSB9LFxuICAgIFtQYXJhbWV0ZXJUeXBlLlNwYXJzZUJvb2xlYW5BcnJheV06IHsgdHlwZTogJ2FycmF5JywgaXRlbXM6IFR5cGUuYm9vbGVhbiwgYWxsb3dFbXB0eTogdHJ1ZSB9LFxuICAgIFtQYXJhbWV0ZXJUeXBlLlNwYXJzZURhdGVBcnJheV06IHsgdHlwZTogJ2FycmF5JywgaXRlbXM6IFR5cGUuZGF0ZSwgYWxsb3dFbXB0eTogdHJ1ZSB9LFxuICAgIFtQYXJhbWV0ZXJUeXBlLlNwYXJzZUh0bWxBcnJheV06IHsgdHlwZTogJ2FycmF5JywgaXRlbXM6IFR5cGUuaHRtbCwgYWxsb3dFbXB0eTogdHJ1ZSB9LFxuICAgIFtQYXJhbWV0ZXJUeXBlLlNwYXJzZUltYWdlQXJyYXldOiB7IHR5cGU6ICdhcnJheScsIGl0ZW1zOiBUeXBlLmltYWdlLCBhbGxvd0VtcHR5OiB0cnVlIH0sXG4gICAgW1BhcmFtZXRlclR5cGUuU3BhcnNlRmlsZUFycmF5XTogeyB0eXBlOiAnYXJyYXknLCBpdGVtczogVHlwZS5maWxlLCBhbGxvd0VtcHR5OiB0cnVlIH0sXG59O1xuLyoqXG4gKiBFbnVtZXJhdGlvbiBvZiByZXF1aXJlbWVudCBzdGF0ZXMgZm9yIHdoZXRoZXIgYSBnaXZlbiBmb3JtdWxhIG9yIHN5bmMgdGFibGUgcmVxdWlyZXNcbiAqIGEgY29ubmVjdGlvbiAoYWNjb3VudCkgdG8gdXNlLlxuICovXG52YXIgQ29ubmVjdGlvblJlcXVpcmVtZW50O1xuKGZ1bmN0aW9uIChDb25uZWN0aW9uUmVxdWlyZW1lbnQpIHtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdGhpcyBidWlsZGluZyBibG9jayBkb2VzIG5vdCBtYWtlIHVzZSBvZiBhbiBhY2NvdW50LlxuICAgICAqL1xuICAgIENvbm5lY3Rpb25SZXF1aXJlbWVudFtcIk5vbmVcIl0gPSBcIm5vbmVcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdGhhdCB0aGlzIGJ1aWxkaW5nIGJsb2NrIGNhbiBiZSB1c2VkIHdpdGggb3Igd2l0aG91dCBhbiBhY2NvdW50LlxuICAgICAqXG4gICAgICogQW4gb3B0aW9uYWwgcGFyYW1ldGVyIHdpbGwgYmUgYWRkZWQgdG8gdGhlIGZvcm11bGEgKG9yIHN5bmMgZm9ybXVsYSkgZm9yIHRoZSBjYWxsaW5nIHVzZXJcbiAgICAgKiB0byBzcGVjaWZ5IGFuIGFjY291bnQgdG8gdXNlLlxuICAgICAqL1xuICAgIENvbm5lY3Rpb25SZXF1aXJlbWVudFtcIk9wdGlvbmFsXCJdID0gXCJvcHRpb25hbFwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0aGF0IHRoaXMgYnVpbGRpbmcgYmxvY2sgbXVzdCBiZSB1c2VkIHdpdGggYW4gYWNjb3VudC5cbiAgICAgKlxuICAgICAqIEEgcmVxdWlyZWQgcGFyYW1ldGVyIHdpbGwgYmUgYWRkZWQgdG8gdGhlIGZvcm11bGEgKG9yIHN5bmMgZm9ybXVsYSkgZm9yIHRoZSBjYWxsaW5nIHVzZXJcbiAgICAgKiB0byBzcGVjaWZ5IGFuIGFjY291bnQgdG8gdXNlLlxuICAgICAqL1xuICAgIENvbm5lY3Rpb25SZXF1aXJlbWVudFtcIlJlcXVpcmVkXCJdID0gXCJyZXF1aXJlZFwiO1xufSkoQ29ubmVjdGlvblJlcXVpcmVtZW50ID0gZXhwb3J0cy5Db25uZWN0aW9uUmVxdWlyZW1lbnQgfHwgKGV4cG9ydHMuQ29ubmVjdGlvblJlcXVpcmVtZW50ID0ge30pKTtcbi8qKiBAZGVwcmVjYXRlZCB1c2UgYENvbm5lY3Rpb25SZXF1aXJlbWVudGAgaW5zdGVhZCAqL1xudmFyIE5ldHdvcmtDb25uZWN0aW9uO1xuKGZ1bmN0aW9uIChOZXR3b3JrQ29ubmVjdGlvbikge1xuICAgIE5ldHdvcmtDb25uZWN0aW9uW1wiTm9uZVwiXSA9IFwibm9uZVwiO1xuICAgIE5ldHdvcmtDb25uZWN0aW9uW1wiT3B0aW9uYWxcIl0gPSBcIm9wdGlvbmFsXCI7XG4gICAgTmV0d29ya0Nvbm5lY3Rpb25bXCJSZXF1aXJlZFwiXSA9IFwicmVxdWlyZWRcIjtcbn0pKE5ldHdvcmtDb25uZWN0aW9uID0gZXhwb3J0cy5OZXR3b3JrQ29ubmVjdGlvbiB8fCAoZXhwb3J0cy5OZXR3b3JrQ29ubmVjdGlvbiA9IHt9KSk7XG4vKiogVGhlIEhUVFAgbWV0aG9kcyAodmVyYnMpIHN1cHBvcnRlZCBieSB0aGUgZmV0Y2hlci4gKi9cbmV4cG9ydHMuVmFsaWRGZXRjaE1ldGhvZHMgPSBbJ0dFVCcsICdQQVRDSCcsICdQT1NUJywgJ1BVVCcsICdERUxFVEUnLCAnSEVBRCddO1xuLy8gQSBtYXBwaW5nIGV4aXN0cyBpbiBjb2RhIHRoYXQgYWxsb3dzIHRoZXNlIHRvIHNob3cgdXAgaW4gdGhlIFVJLlxuLy8gSWYgYWRkaW5nIG5ldyB2YWx1ZXMgaGVyZSwgYWRkIHRoZW0gdG8gdGhhdCBtYXBwaW5nIGFuZCB2aWNlIHZlcnNhLlxuLyoqXG4gKiBTcGVjaWFsIFwibGl2ZVwiIGRhdGUgcmFuZ2UgdmFsdWVzIHRoYXQgY2FuIGJlIHVzZWQgYXMgdGhlIHtAbGluayBQYXJhbURlZi5zdWdnZXN0ZWRWYWx1ZX1cbiAqIGZvciBhIGRhdGUgYXJyYXkgcGFyYW1ldGVyLlxuICpcbiAqIERhdGUgYXJyYXkgcGFyYW1ldGVycyBhcmUgbWVhbnQgdG8gcmVwcmVzZW50IGRhdGUgcmFuZ2VzLiBBIGRhdGUgcmFuZ2UgY2FuXG4gKiBiZSBhIGZpeGVkIHJhbmdlLCBlLmcuIEFwcmlsIDEsIDIwMjAgLSBNYXkgMTUsIDIwMjAsIG9yIGl0IGNhbiBiZSBhIFwibGl2ZVwiXG4gKiByYW5nZSwgbGlrZSBcImxhc3QgMzAgZGF5c1wiLlxuICpcbiAqIEF0IGV4ZWN1dGlvbiB0aW1lLCBhIGRhdGUgcmFuZ2Ugd2lsbCBhbHdheXMgYmUgcGFzc2VkIHRvIGEgcGFjayBhcyBhblxuICogYXJyYXkgb2YgdHdvIHNwZWNpZmljIGRhdGVzLCBidXQgZm9yIG1hbnkgdXNlIGNhc2VzLCBpdCBpcyBuZWNlc3NhcnlcbiAqIHRvIHByb3ZpZGUgYSBkZWZhdWx0IHZhbHVlIHRoYXQgaXMgYSBcImxpdmVcIiByYW5nZSByYXRoZXIgdGhhbiBoYXJkY29kZWRcbiAqIG9uZS4gRm9yIGV4YW1wbGUsIGlmIHlvdXIgcGFjayBoYXMgYSB0YWJsZSB0aGF0IHN5bmNzIHJlY2VudCBlbWFpbHMsXG4gKiB5b3UgbWlnaHQgd2FudCB0byBoYXZlIGEgZGF0ZSByYW5nZSBwYXJhbWV0ZXIgdGhhdCBkZWZhdWx0IHRvXG4gKiBcImxhc3QgNyBkYXlzXCIuIERlZmF1bHRpbmcgdG8gYSBoYXJkY29kZWQgZGF0ZSByYW5nZSB3b3VsZCBub3QgYmUgdXNlZnVsXG4gKiBhbmQgcmVxdWlyaW5nIHRoZSB1c2VyIHRvIGFsd2F5cyBzcGVjaWZ5IGEgZGF0ZSByYW5nZSBtYXkgYmUgaW5jb252ZW5pZW50LlxuICovXG52YXIgUHJlY2FubmVkRGF0ZVJhbmdlO1xuKGZ1bmN0aW9uIChQcmVjYW5uZWREYXRlUmFuZ2UpIHtcbiAgICAvLyBQYXN0XG4gICAgUHJlY2FubmVkRGF0ZVJhbmdlW1wiWWVzdGVyZGF5XCJdID0gXCJ5ZXN0ZXJkYXlcIjtcbiAgICBQcmVjYW5uZWREYXRlUmFuZ2VbXCJMYXN0N0RheXNcIl0gPSBcImxhc3RfN19kYXlzXCI7XG4gICAgUHJlY2FubmVkRGF0ZVJhbmdlW1wiTGFzdDMwRGF5c1wiXSA9IFwibGFzdF8zMF9kYXlzXCI7XG4gICAgUHJlY2FubmVkRGF0ZVJhbmdlW1wiTGFzdFdlZWtcIl0gPSBcImxhc3Rfd2Vla1wiO1xuICAgIFByZWNhbm5lZERhdGVSYW5nZVtcIkxhc3RNb250aFwiXSA9IFwibGFzdF9tb250aFwiO1xuICAgIFByZWNhbm5lZERhdGVSYW5nZVtcIkxhc3QzTW9udGhzXCJdID0gXCJsYXN0XzNfbW9udGhzXCI7XG4gICAgUHJlY2FubmVkRGF0ZVJhbmdlW1wiTGFzdDZNb250aHNcIl0gPSBcImxhc3RfNl9tb250aHNcIjtcbiAgICBQcmVjYW5uZWREYXRlUmFuZ2VbXCJMYXN0WWVhclwiXSA9IFwibGFzdF95ZWFyXCI7XG4gICAgLy8gUHJlc2VudFxuICAgIFByZWNhbm5lZERhdGVSYW5nZVtcIlRvZGF5XCJdID0gXCJ0b2RheVwiO1xuICAgIFByZWNhbm5lZERhdGVSYW5nZVtcIlRoaXNXZWVrXCJdID0gXCJ0aGlzX3dlZWtcIjtcbiAgICBQcmVjYW5uZWREYXRlUmFuZ2VbXCJUaGlzV2Vla1N0YXJ0XCJdID0gXCJ0aGlzX3dlZWtfc3RhcnRcIjtcbiAgICBQcmVjYW5uZWREYXRlUmFuZ2VbXCJUaGlzTW9udGhcIl0gPSBcInRoaXNfbW9udGhcIjtcbiAgICBQcmVjYW5uZWREYXRlUmFuZ2VbXCJUaGlzTW9udGhTdGFydFwiXSA9IFwidGhpc19tb250aF9zdGFydFwiO1xuICAgIFByZWNhbm5lZERhdGVSYW5nZVtcIlRoaXNZZWFyU3RhcnRcIl0gPSBcInRoaXNfeWVhcl9zdGFydFwiO1xuICAgIFByZWNhbm5lZERhdGVSYW5nZVtcIlllYXJUb0RhdGVcIl0gPSBcInllYXJfdG9fZGF0ZVwiO1xuICAgIFByZWNhbm5lZERhdGVSYW5nZVtcIlRoaXNZZWFyXCJdID0gXCJ0aGlzX3llYXJcIjtcbiAgICAvLyBGdXR1cmVcbiAgICBQcmVjYW5uZWREYXRlUmFuZ2VbXCJUb21vcnJvd1wiXSA9IFwidG9tb3Jyb3dcIjtcbiAgICBQcmVjYW5uZWREYXRlUmFuZ2VbXCJOZXh0N0RheXNcIl0gPSBcIm5leHRfN19kYXlzXCI7XG4gICAgUHJlY2FubmVkRGF0ZVJhbmdlW1wiTmV4dDMwRGF5c1wiXSA9IFwibmV4dF8zMF9kYXlzXCI7XG4gICAgUHJlY2FubmVkRGF0ZVJhbmdlW1wiTmV4dFdlZWtcIl0gPSBcIm5leHRfd2Vla1wiO1xuICAgIFByZWNhbm5lZERhdGVSYW5nZVtcIk5leHRNb250aFwiXSA9IFwibmV4dF9tb250aFwiO1xuICAgIFByZWNhbm5lZERhdGVSYW5nZVtcIk5leHQzTW9udGhzXCJdID0gXCJuZXh0XzNfbW9udGhzXCI7XG4gICAgUHJlY2FubmVkRGF0ZVJhbmdlW1wiTmV4dDZNb250aHNcIl0gPSBcIm5leHRfNl9tb250aHNcIjtcbiAgICBQcmVjYW5uZWREYXRlUmFuZ2VbXCJOZXh0WWVhclwiXSA9IFwibmV4dF95ZWFyXCI7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIGEgZGF0ZSByYW5nZSBiZWdpbm5pbmcgaW4gdGhlIHZlcnkgZGlzdGFudCBwYXN0IChlLmcuIDEvMS8xLCBha2EgMSBBLkQuKVxuICAgICAqIGFuZCBlbmRpbmcgaW4gdGhlIGRpc3RhbnQgZnV0dXJlIChlLmcuIDEyLzMxLzM5OTkpLiBFeGFjdCBkYXRlcyBhcmUgc3ViamVjdCB0byBjaGFuZ2UuXG4gICAgICovXG4gICAgUHJlY2FubmVkRGF0ZVJhbmdlW1wiRXZlcnl0aGluZ1wiXSA9IFwiZXZlcnl0aGluZ1wiO1xufSkoUHJlY2FubmVkRGF0ZVJhbmdlID0gZXhwb3J0cy5QcmVjYW5uZWREYXRlUmFuZ2UgfHwgKGV4cG9ydHMuUHJlY2FubmVkRGF0ZVJhbmdlID0ge30pKTtcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYXNzZXJ0Q29uZGl0aW9uID0gZXhwb3J0cy5lbnN1cmVFeGlzdHMgPSBleHBvcnRzLmVuc3VyZU5vbkVtcHR5U3RyaW5nID0gZXhwb3J0cy5lbnN1cmVVbnJlYWNoYWJsZSA9IHZvaWQgMDtcbmNvbnN0IGFwaV8xID0gcmVxdWlyZShcIi4uL2FwaVwiKTtcbi8qKlxuICogSGVscGVyIGZvciBUeXBlU2NyaXB0IHRvIG1ha2Ugc3VyZSB0aGF0IGhhbmRsaW5nIG9mIGNvZGUgZm9ya3MgaXMgZXhoYXVzdGl2ZSxcbiAqIG1vc3QgY29tbW9ubHkgd2l0aCBhIGBzd2l0Y2hgIHN0YXRlbWVudC5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgXG4gKiBlbnVtIE15RW51bSB7XG4gKiAgIEZvbyA9ICdGb28nLFxuICogICBCYXIgPSAnQmFyJyxcbiAqIH1cbiAqXG4gKiBmdW5jdGlvbiBoYW5kbGVFbnVtKHZhbHVlOiBNeUVudW0pIHtcbiAqICAgc3dpdGNoKHZhbHVlKSB7XG4gKiAgICAgY2FzZSBNeUVudW0uRm9vOlxuICogICAgICAgcmV0dXJuICdmb28nO1xuICogICAgIGNhc2UgTXlFbnVtLkJhcjpcbiAqICAgICAgIHJldHVybiAnYmFyJztcbiAqICAgICBkZWZhdWx0OlxuICogICAgICAgLy8gVGhpcyBjb2RlIGlzIHVucmVhY2hhYmxlIHNpbmNlIHRoZSB0d28gY2FzZXMgYWJvdmUgYXJlIGV4aGF1c3RpdmUuXG4gKiAgICAgICAvLyBIb3dldmVyLCBpZiBhIHRoaXJkIHZhbHVlIHdlcmUgYWRkZWQgdG8gTXlFbnVtLCBUeXBlU2NyaXB0IHdvdWxkIGZsYWdcbiAqICAgICAgIC8vIGFuIGVycm9yIGF0IHRoaXMgbGluZSwgaW5mb3JtaW5nIHlvdSB0aGF0IHlvdSBuZWVkIHRvIHVwZGF0ZSB0aGlzIHBpZWNlIG9mIGNvZGUuXG4gKiAgICAgICByZXR1cm4gZW5zdXJlVW5yZWFjaGFibGUodmFsdWUpO1xuICogICB9XG4gKiB9XG4gKiBgYGBcbiAqL1xuZnVuY3Rpb24gZW5zdXJlVW5yZWFjaGFibGUodmFsdWUsIG1lc3NhZ2UpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSB8fCBgVW5yZWFjaGFibGUgY29kZSBoaXQgd2l0aCB2YWx1ZSAke1N0cmluZyh2YWx1ZSl9YCk7XG59XG5leHBvcnRzLmVuc3VyZVVucmVhY2hhYmxlID0gZW5zdXJlVW5yZWFjaGFibGU7XG4vKipcbiAqIEhlbHBlciB0byBjaGVjayB0aGF0IGEgZ2l2ZW4gdmFsdWUgaXMgYSBzdHJpbmcsIGFuZCBpcyBub3QgdGhlIGVtcHR5IHN0cmluZy5cbiAqIElmIHRoZSB2YWx1ZSBpcyBub3QgYSBzdHJpbmcgb3IgaXMgZW1wdHksIGFuIGVycm9yIHdpbGwgYmUgcmFpc2VkIGF0IHJ1bnRpbWUuXG4gKi9cbmZ1bmN0aW9uIGVuc3VyZU5vbkVtcHR5U3RyaW5nKHZhbHVlLCBtZXNzYWdlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycgfHwgdmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRocm93IG5ldyAoZ2V0RXJyb3JDb25zdHJ1Y3RvcihtZXNzYWdlKSkobWVzc2FnZSB8fCBgRXhwZWN0ZWQgbm9uLWVtcHR5IHN0cmluZyBmb3IgJHtTdHJpbmcodmFsdWUpfWApO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59XG5leHBvcnRzLmVuc3VyZU5vbkVtcHR5U3RyaW5nID0gZW5zdXJlTm9uRW1wdHlTdHJpbmc7XG4vKipcbiAqIEhlbHBlciB0byBjaGVjayB0aGF0IGEgZ2l2ZW4gdmFsdWUgaXMgZGVmaW5lZCwgdGhhdCBpcywgaXMgbmVpdGhlciBgdW5kZWZpbmVkYCBub3IgYG51bGxgLlxuICogSWYgdGhlIHZhbHVlIGlzIGB1bmRlZmluZWRgIG9yIGBudWxsYCwgYW4gZXJyb3Igd2lsbCBiZSByYWlzZWQgYXQgcnVudGltZS5cbiAqXG4gKiBUaGlzIGlzIHR5cGljYWxseSB1c2VkIHRvIGluZm9ybSBUeXBlU2NyaXB0IHRoYXQgeW91IGV4cGVjdCBhIGdpdmVuIHZhbHVlIHRvIGFsd2F5cyBleGlzdC5cbiAqIENhbGxpbmcgdGhpcyBmdW5jdGlvbiByZWZpbmVzIGEgdHlwZSB0aGF0IGNhbiBvdGhlcndpc2UgYmUgbnVsbCBvciB1bmRlZmluZWQuXG4gKi9cbmZ1bmN0aW9uIGVuc3VyZUV4aXN0cyh2YWx1ZSwgbWVzc2FnZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnIHx8IHZhbHVlID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyAoZ2V0RXJyb3JDb25zdHJ1Y3RvcihtZXNzYWdlKSkobWVzc2FnZSB8fCBgRXhwZWN0ZWQgdmFsdWUgZm9yICR7U3RyaW5nKHZhbHVlKX1gKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuZXhwb3J0cy5lbnN1cmVFeGlzdHMgPSBlbnN1cmVFeGlzdHM7XG5mdW5jdGlvbiBnZXRFcnJvckNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcbiAgICByZXR1cm4gbWVzc2FnZSA/IGFwaV8xLlVzZXJWaXNpYmxlRXJyb3IgOiBFcnJvcjtcbn1cbi8qKlxuICogSGVscGVyIHRvIGFwcGx5IGEgVHlwZVNjcmlwdCBhc3NlcnRpb24gdG8gc3Vic2VxdWVudCBjb2RlLiBUeXBlU2NyaXB0IGNhbiBpbmZlclxuICogdHlwZSBpbmZvcm1hdGlvbiBmcm9tIG1hbnkgZXhwcmVzc2lvbnMsIGFuZCB0aGlzIGhlbHBlciBhcHBsaWVzIHRob3NlIGluZmVyZW5jZXNcbiAqIHRvIGFsbCBjb2RlIHRoYXQgZm9sbG93cyBjYWxsIHRvIHRoaXMgZnVuY3Rpb24uXG4gKlxuICogU2VlIGh0dHBzOi8vd3d3LnR5cGVzY3JpcHRsYW5nLm9yZy9kb2NzL2hhbmRib29rL3JlbGVhc2Utbm90ZXMvdHlwZXNjcmlwdC0zLTcuaHRtbCNhc3NlcnRpb24tZnVuY3Rpb25zXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogZnVuY3Rpb24gZm9vKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIpIHtcbiAqICAgYXNzZXJ0Q29uZHRpb24odHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyk7XG4gKiAgIC8vIFR5cGVTY3JpcHQgd291bGQgb3RoZXJ3aXNlIGNvbXBhbGluLCBiZWNhdXNlIGB2YWx1ZWAgY291bGQgaGF2ZSBiZWVuIG51bWJlcixcbiAqICAgLy8gYnV0IHRoZSBhYm92ZSBhc3NlcnRpb24gcmVmaW5lcyB0aGUgdHlwZSBiYXNlZCBvbiB0aGUgYHR5cGVvZmAgZXhwcmVzc2lvbi5cbiAqICAgcmV0dXJuIHZhbHVlLnRvVXBwZXJDYXNlKCk7XG4gKiB9XG4gKiBgYGBcbiAqL1xuZnVuY3Rpb24gYXNzZXJ0Q29uZGl0aW9uKGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICAgIHRocm93IG5ldyAoZ2V0RXJyb3JDb25zdHJ1Y3RvcihtZXNzYWdlKSkobWVzc2FnZSB8fCAnQXNzZXJ0aW9uIGZhaWxlZCcpO1xuICAgIH1cbn1cbmV4cG9ydHMuYXNzZXJ0Q29uZGl0aW9uID0gYXNzZXJ0Q29uZGl0aW9uO1xuIiwgIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5pc1Byb21pc2UgPSBleHBvcnRzLmRlZXBDb3B5ID0gZXhwb3J0cy5pc05pbCA9IGV4cG9ydHMuaXNEZWZpbmVkID0gZXhwb3J0cy5kZWVwRnJlZXplID0gdm9pZCAwO1xuZnVuY3Rpb24gZGVlcEZyZWV6ZShvYmopIHtcbiAgICBPYmplY3QuZnJlZXplKG9iaik7XG4gICAgZm9yIChjb25zdCBrIG9mIE9iamVjdC5rZXlzKG9iaikpIHtcbiAgICAgICAgY29uc3Qga2V5ID0gaztcbiAgICAgICAgaWYgKG9ialtrZXldICE9PSBudWxsICYmXG4gICAgICAgICAgICAodHlwZW9mIG9ialtrZXldID09PSAnb2JqZWN0JyB8fCB0eXBlb2Ygb2JqW2tleV0gPT09ICdmdW5jdGlvbicpICYmXG4gICAgICAgICAgICAhT2JqZWN0LmlzRnJvemVuKG9ialtrZXldKSkge1xuICAgICAgICAgICAgZGVlcEZyZWV6ZShvYmpba2V5XSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbn1cbmV4cG9ydHMuZGVlcEZyZWV6ZSA9IGRlZXBGcmVlemU7XG4vKipcbiAqIFJldHVybnMgd2hldGhlciB0aGUgdmFsdWUgaXMgYWN0dWFsbHkgZGVmaW5lZCwgaS5lLiBpcyBhbnl0aGluZyBvdGhlciB0aGFuIG51bGwgb3IgdW5kZWZpbmVkLlxuICovXG5mdW5jdGlvbiBpc0RlZmluZWQob2JqKSB7XG4gICAgcmV0dXJuICFpc05pbChvYmopO1xufVxuZXhwb3J0cy5pc0RlZmluZWQgPSBpc0RlZmluZWQ7XG4vKipcbiAqIFJldHVybnMgd2hldGhlciB0aGUgdmFsdWUgaGFzIG5vdCBiZWVuIGRlZmluZWQsIGkuZS4gaXMgbnVsbCBvciB1bmRlZmluZWQuXG4gKi9cbmZ1bmN0aW9uIGlzTmlsKG9iaikge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJyB8fCBvYmogPT09IG51bGw7XG59XG5leHBvcnRzLmlzTmlsID0gaXNOaWw7XG5mdW5jdGlvbiBkZWVwQ29weShvYmopIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn1cbmV4cG9ydHMuZGVlcENvcHkgPSBkZWVwQ29weTtcbi8qKlxuICogUmV0dXJucyB3aGV0aGVyZSB0aGUgdmFsdWUgaXMgYSBQcm9taXNlLlxuICovXG5mdW5jdGlvbiBpc1Byb21pc2Uob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAndGhlbicgaW4gb2JqO1xufVxuZXhwb3J0cy5pc1Byb21pc2UgPSBpc1Byb21pc2U7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnBvc3RTZXR1cE1ldGFkYXRhSGVscGVyID0gZXhwb3J0cy5zZXRFbmRwb2ludERlZkhlbHBlciA9IGV4cG9ydHMuc2V0RW5kcG9pbnRIZWxwZXIgPSBleHBvcnRzLnBhcmFtRGVmSGVscGVyID0gZXhwb3J0cy5vYmplY3RTY2hlbWFIZWxwZXIgPSB2b2lkIDA7XG5jb25zdCBlbnN1cmVfMSA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL2Vuc3VyZVwiKTtcbmZ1bmN0aW9uIG9iamVjdFNjaGVtYUhlbHBlcihzY2hlbWEpIHtcbiAgICByZXR1cm4gbmV3IE9iamVjdFNjaGVtYUhlbHBlcihzY2hlbWEpO1xufVxuZXhwb3J0cy5vYmplY3RTY2hlbWFIZWxwZXIgPSBvYmplY3RTY2hlbWFIZWxwZXI7XG5jbGFzcyBPYmplY3RTY2hlbWFIZWxwZXIge1xuICAgIGNvbnN0cnVjdG9yKHNjaGVtYSkge1xuICAgICAgICB0aGlzLl9zY2hlbWEgPSBzY2hlbWE7XG4gICAgfVxuICAgIGdldCBpZCgpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICByZXR1cm4gKF9hID0gdGhpcy5fc2NoZW1hLmlkUHJvcGVydHkpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHRoaXMuX3NjaGVtYS5pZDtcbiAgICB9XG4gICAgZ2V0IHByaW1hcnkoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuIChfYSA9IHRoaXMuX3NjaGVtYS5kaXNwbGF5UHJvcGVydHkpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHRoaXMuX3NjaGVtYS5wcmltYXJ5O1xuICAgIH1cbiAgICBnZXQgZmVhdHVyZWQoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuIChfYSA9IHRoaXMuX3NjaGVtYS5mZWF0dXJlZFByb3BlcnRpZXMpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHRoaXMuX3NjaGVtYS5mZWF0dXJlZDtcbiAgICB9XG4gICAgZ2V0IGlkZW50aXR5KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2NoZW1hLmlkZW50aXR5O1xuICAgIH1cbiAgICBnZXQgcHJvcGVydGllcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjaGVtYS5wcm9wZXJ0aWVzO1xuICAgIH1cbiAgICBnZXQgdHlwZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NjaGVtYS50eXBlO1xuICAgIH1cbiAgICBnZXQgYXR0cmlidXRpb24oKSB7XG4gICAgICAgIHZhciBfYSwgX2I7XG4gICAgICAgIHJldHVybiAoX2EgPSB0aGlzLl9zY2hlbWEuYXR0cmlidXRpb24pICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IChfYiA9IHRoaXMuX3NjaGVtYS5pZGVudGl0eSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmF0dHJpYnV0aW9uO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHBhcmFtRGVmSGVscGVyKGRlZikge1xuICAgIHJldHVybiBuZXcgUGFyYW1EZWZIZWxwZXIoZGVmKTtcbn1cbmV4cG9ydHMucGFyYW1EZWZIZWxwZXIgPSBwYXJhbURlZkhlbHBlcjtcbmNsYXNzIFBhcmFtRGVmSGVscGVyIHtcbiAgICBjb25zdHJ1Y3RvcihkZWYpIHtcbiAgICAgICAgdGhpcy5fZGVmID0gZGVmO1xuICAgIH1cbiAgICBnZXQgZGVmYXVsdFZhbHVlKCkge1xuICAgICAgICB2YXIgX2E7XG4gICAgICAgIHJldHVybiAoX2EgPSB0aGlzLl9kZWYuc3VnZ2VzdGVkVmFsdWUpICE9PSBudWxsICYmIF9hICE9PSB2b2lkIDAgPyBfYSA6IHRoaXMuX2RlZi5kZWZhdWx0VmFsdWU7XG4gICAgfVxufVxuZnVuY3Rpb24gc2V0RW5kcG9pbnRIZWxwZXIoc3RlcCkge1xuICAgIHJldHVybiBuZXcgU2V0RW5kcG9pbnRIZWxwZXIoc3RlcCk7XG59XG5leHBvcnRzLnNldEVuZHBvaW50SGVscGVyID0gc2V0RW5kcG9pbnRIZWxwZXI7XG5jbGFzcyBTZXRFbmRwb2ludEhlbHBlciB7XG4gICAgY29uc3RydWN0b3Ioc3RlcCkge1xuICAgICAgICB0aGlzLl9zdGVwID0gc3RlcDtcbiAgICB9XG4gICAgZ2V0IGdldE9wdGlvbnMoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuICgwLCBlbnN1cmVfMS5lbnN1cmVFeGlzdHMpKChfYSA9IHRoaXMuX3N0ZXAuZ2V0T3B0aW9ucykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdGhpcy5fc3RlcC5nZXRPcHRpb25zRm9ybXVsYSk7XG4gICAgfVxufVxuZnVuY3Rpb24gc2V0RW5kcG9pbnREZWZIZWxwZXIoc3RlcCkge1xuICAgIHJldHVybiBuZXcgU2V0RW5kcG9pbnREZWZIZWxwZXIoc3RlcCk7XG59XG5leHBvcnRzLnNldEVuZHBvaW50RGVmSGVscGVyID0gc2V0RW5kcG9pbnREZWZIZWxwZXI7XG5jbGFzcyBTZXRFbmRwb2ludERlZkhlbHBlciB7XG4gICAgY29uc3RydWN0b3Ioc3RlcCkge1xuICAgICAgICB0aGlzLl9zdGVwID0gc3RlcDtcbiAgICB9XG4gICAgZ2V0IGdldE9wdGlvbnMoKSB7XG4gICAgICAgIHZhciBfYTtcbiAgICAgICAgcmV0dXJuICgwLCBlbnN1cmVfMS5lbnN1cmVFeGlzdHMpKChfYSA9IHRoaXMuX3N0ZXAuZ2V0T3B0aW9ucykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdGhpcy5fc3RlcC5nZXRPcHRpb25zRm9ybXVsYSk7XG4gICAgfVxufVxuZnVuY3Rpb24gcG9zdFNldHVwTWV0YWRhdGFIZWxwZXIobWV0YWRhdGEpIHtcbiAgICByZXR1cm4gbmV3IFBvc3RTZXR1cE1ldGFkYXRhSGVscGVyKG1ldGFkYXRhKTtcbn1cbmV4cG9ydHMucG9zdFNldHVwTWV0YWRhdGFIZWxwZXIgPSBwb3N0U2V0dXBNZXRhZGF0YUhlbHBlcjtcbmNsYXNzIFBvc3RTZXR1cE1ldGFkYXRhSGVscGVyIHtcbiAgICBjb25zdHJ1Y3RvcihtZXRhZGF0YSkge1xuICAgICAgICB0aGlzLl9tZXRhZGF0YSA9IG1ldGFkYXRhO1xuICAgIH1cbiAgICBnZXQgZ2V0T3B0aW9ucygpIHtcbiAgICAgICAgdmFyIF9hO1xuICAgICAgICByZXR1cm4gKDAsIGVuc3VyZV8xLmVuc3VyZUV4aXN0cykoKF9hID0gdGhpcy5fbWV0YWRhdGEuZ2V0T3B0aW9ucykgIT09IG51bGwgJiYgX2EgIT09IHZvaWQgMCA/IF9hIDogdGhpcy5fbWV0YWRhdGEuZ2V0T3B0aW9uc0Zvcm11bGEpO1xuICAgIH1cbn1cbiIsICIvKiFcbiAqIHBhc2NhbGNhc2UgPGh0dHBzOi8vZ2l0aHViLmNvbS9qb25zY2hsaW5rZXJ0L3Bhc2NhbGNhc2U+XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE1LXByZXNlbnQsIEpvbiAoXCJTY2hsaW5rXCIpIFNjaGxpbmtlcnQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKi9cblxuY29uc3QgdGl0bGVjYXNlID0gaW5wdXQgPT4gaW5wdXRbMF0udG9Mb2NhbGVVcHBlckNhc2UoKSArIGlucHV0LnNsaWNlKDEpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHZhbHVlID0+IHtcbiAgaWYgKHZhbHVlID09PSBudWxsIHx8IHZhbHVlID09PSB2b2lkIDApIHJldHVybiAnJztcbiAgaWYgKHR5cGVvZiB2YWx1ZS50b1N0cmluZyAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuICcnO1xuXG4gIGxldCBpbnB1dCA9IHZhbHVlLnRvU3RyaW5nKCkudHJpbSgpO1xuICBpZiAoaW5wdXQgPT09ICcnKSByZXR1cm4gJyc7XG4gIGlmIChpbnB1dC5sZW5ndGggPT09IDEpIHJldHVybiBpbnB1dC50b0xvY2FsZVVwcGVyQ2FzZSgpO1xuXG4gIGxldCBtYXRjaCA9IGlucHV0Lm1hdGNoKC9bYS16QS1aMC05XSsvZyk7XG4gIGlmIChtYXRjaCkge1xuICAgIHJldHVybiBtYXRjaC5tYXAobSA9PiB0aXRsZWNhc2UobSkpLmpvaW4oJycpO1xuICB9XG5cbiAgcmV0dXJuIGlucHV0O1xufTtcbiIsICJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMud2l0aElkZW50aXR5ID0gZXhwb3J0cy5tYWtlUmVmZXJlbmNlU2NoZW1hRnJvbU9iamVjdFNjaGVtYSA9IGV4cG9ydHMubm9ybWFsaXplU2NoZW1hID0gZXhwb3J0cy5ub3JtYWxpemVTY2hlbWFLZXkgPSBleHBvcnRzLm1ha2VPYmplY3RTY2hlbWEgPSBleHBvcnRzLm1ha2VTY2hlbWEgPSBleHBvcnRzLmdlbmVyYXRlU2NoZW1hID0gZXhwb3J0cy5pc0FycmF5ID0gZXhwb3J0cy5pc09iamVjdCA9IGV4cG9ydHMubWFrZUF0dHJpYnV0aW9uTm9kZSA9IGV4cG9ydHMuQXR0cmlidXRpb25Ob2RlVHlwZSA9IGV4cG9ydHMuU2ltcGxlU3RyaW5nSGludFZhbHVlVHlwZXMgPSBleHBvcnRzLkR1cmF0aW9uVW5pdCA9IGV4cG9ydHMuSW1hZ2VDb3JuZXJTdHlsZSA9IGV4cG9ydHMuSW1hZ2VPdXRsaW5lID0gZXhwb3J0cy5MaW5rRGlzcGxheVR5cGUgPSBleHBvcnRzLkVtYWlsRGlzcGxheVR5cGUgPSBleHBvcnRzLlNjYWxlSWNvblNldCA9IGV4cG9ydHMuQ3VycmVuY3lGb3JtYXQgPSBleHBvcnRzLk9iamVjdEhpbnRWYWx1ZVR5cGVzID0gZXhwb3J0cy5Cb29sZWFuSGludFZhbHVlVHlwZXMgPSBleHBvcnRzLk51bWJlckhpbnRWYWx1ZVR5cGVzID0gZXhwb3J0cy5TdHJpbmdIaW50VmFsdWVUeXBlcyA9IGV4cG9ydHMuVmFsdWVIaW50VHlwZSA9IGV4cG9ydHMuVmFsdWVUeXBlID0gdm9pZCAwO1xuY29uc3QgZW5zdXJlXzEgPSByZXF1aXJlKFwiLi9oZWxwZXJzL2Vuc3VyZVwiKTtcbmNvbnN0IG9iamVjdF91dGlsc18xID0gcmVxdWlyZShcIi4vaGVscGVycy9vYmplY3RfdXRpbHNcIik7XG5jb25zdCBlbnN1cmVfMiA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvZW5zdXJlXCIpO1xuY29uc3QgZW5zdXJlXzMgPSByZXF1aXJlKFwiLi9oZWxwZXJzL2Vuc3VyZVwiKTtcbmNvbnN0IGVuc3VyZV80ID0gcmVxdWlyZShcIi4vaGVscGVycy9lbnN1cmVcIik7XG5jb25zdCBtaWdyYXRpb25fMSA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvbWlncmF0aW9uXCIpO1xuY29uc3QgcGFzY2FsY2FzZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJwYXNjYWxjYXNlXCIpKTtcbi8vIERlZmluZXMgYSBzdWJzZXQgb2YgdGhlIEpTT04gT2JqZWN0IHNjaGVtYSBmb3IgdXNlIGluIGFubm90YXRpbmcgQVBJIHJlc3VsdHMuXG4vLyBodHRwOi8vanNvbi1zY2hlbWEub3JnL2xhdGVzdC9qc29uLXNjaGVtYS1jb3JlLmh0bWwjcmZjLnNlY3Rpb24uOC4yXG4vKipcbiAqIFRoZSBzZXQgb2YgcHJpbWl0aXZlIHZhbHVlIHR5cGVzIHRoYXQgY2FuIGJlIHVzZWQgYXMgcmV0dXJuIHZhbHVlcyBmb3IgZm9ybXVsYXNcbiAqIG9yIGluIG9iamVjdCBzY2hlbWFzLlxuICovXG52YXIgVmFsdWVUeXBlO1xuKGZ1bmN0aW9uIChWYWx1ZVR5cGUpIHtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgYSBKYXZhU2NyaXB0IGJvb2xlYW4gKHRydWUvZmFsc2UpIHNob3VsZCBiZSByZXR1cm5lZC5cbiAgICAgKi9cbiAgICBWYWx1ZVR5cGVbXCJCb29sZWFuXCJdID0gXCJib29sZWFuXCI7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIGEgSmF2YVNjcmlwdCBudW1iZXIgc2hvdWxkIGJlIHJldHVybmVkLlxuICAgICAqL1xuICAgIFZhbHVlVHlwZVtcIk51bWJlclwiXSA9IFwibnVtYmVyXCI7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIGEgSmF2YVNjcmlwdCBzdHJpbmcgc2hvdWxkIGJlIHJldHVybmVkLlxuICAgICAqL1xuICAgIFZhbHVlVHlwZVtcIlN0cmluZ1wiXSA9IFwic3RyaW5nXCI7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIGEgSmF2YVNjcmlwdCBhcnJheSBzaG91bGQgYmUgcmV0dXJuZWQuIFRoZSBzY2hlbWEgb2YgdGhlIGFycmF5IGl0ZW1zIG11c3QgYWxzbyBiZSBzcGVjaWZpZWQuXG4gICAgICovXG4gICAgVmFsdWVUeXBlW1wiQXJyYXlcIl0gPSBcImFycmF5XCI7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIGEgSmF2YVNjcmlwdCBvYmplY3Qgc2hvdWxkIGJlIHJldHVybmVkLiBUaGUgc2NoZW1hIG9mIGVhY2ggb2JqZWN0IHByb3BlcnR5IG11c3QgYWxzbyBiZSBzcGVjaWZpZWQuXG4gICAgICovXG4gICAgVmFsdWVUeXBlW1wiT2JqZWN0XCJdID0gXCJvYmplY3RcIjtcbn0pKFZhbHVlVHlwZSA9IGV4cG9ydHMuVmFsdWVUeXBlIHx8IChleHBvcnRzLlZhbHVlVHlwZSA9IHt9KSk7XG4vKipcbiAqIFN5bnRoZXRpYyB0eXBlcyB0aGF0IGluc3RydWN0IENvZGEgaG93IHRvIGNvZXJjZSB2YWx1ZXMgZnJvbSBwcmltaXRpdmVzIGF0IGluZ2VzdGlvbiB0aW1lLlxuICovXG52YXIgVmFsdWVIaW50VHlwZTtcbihmdW5jdGlvbiAoVmFsdWVIaW50VHlwZSkge1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0byBpbnRlcnByZXQgdGhlIHZhbHVlIGFzIGEgZGF0ZSAoZS5nLiBNYXJjaCAzLCAyMDIxKS5cbiAgICAgKi9cbiAgICBWYWx1ZUhpbnRUeXBlW1wiRGF0ZVwiXSA9IFwiZGF0ZVwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0byBpbnRlcnByZXQgdGhlIHZhbHVlIGFzIGEgdGltZSAoZS5nLiA1OjI0cG0pLlxuICAgICAqL1xuICAgIFZhbHVlSGludFR5cGVbXCJUaW1lXCJdID0gXCJ0aW1lXCI7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHRvIGludGVycHJldCB0aGUgdmFsdWUgYXMgYSBkYXRldGltZSAoZS5nLiBNYXJjaCAzLCAyMDIxIGF0IDU6MjRwbSkuXG4gICAgICovXG4gICAgVmFsdWVIaW50VHlwZVtcIkRhdGVUaW1lXCJdID0gXCJkYXRldGltZVwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0byBpbnRlcnByZXQgdGhlIHZhbHVlIGFzIGEgZHVyYXRpb24gKGUuZy4gMyBob3VycykuXG4gICAgICovXG4gICAgVmFsdWVIaW50VHlwZVtcIkR1cmF0aW9uXCJdID0gXCJkdXJhdGlvblwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0byBpbnRlcnByZXQgdGhlIHZhbHVlIGFzIGFuIGVtYWlsIGFkZHJlc3MgKGUuZy4gam9lQGZvby5jb20pLlxuICAgICAqL1xuICAgIFZhbHVlSGludFR5cGVbXCJFbWFpbFwiXSA9IFwiZW1haWxcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdG8gaW50ZXJwcmV0IGFuZCByZW5kZXIgdGhlIHZhbHVlIGFzIGEgQ29kYSBwZXJzb24gcmVmZXJlbmNlLiBUaGUgcHJvdmlkZWQgdmFsdWUgc2hvdWxkIGJlXG4gICAgICogYW4gb2JqZWN0IHdob3NlIGBpZGAgcHJvcGVydHkgaXMgYW4gZW1haWwgYWRkcmVzcywgd2hpY2ggQ29kYSB3aWxsIHRyeSB0byByZXNvbHZlIHRvIGEgdXNlclxuICAgICAqIGFuZCByZW5kZXIgYW4gQC1yZWZlcmVuY2UgdG8gdGhlIHVzZXIuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGBgYFxuICAgICAqIG1ha2VPYmplY3RTY2hlbWEoe1xuICAgICAqICAgdHlwZTogVmFsdWVUeXBlLk9iamVjdCxcbiAgICAgKiAgIGNvZGFUeXBlOiBWYWx1ZUhpbnRUeXBlLlBlcnNvbixcbiAgICAgKiAgIGlkOiAnZW1haWwnLFxuICAgICAqICAgcHJpbWFyeTogJ25hbWUnLFxuICAgICAqICAgcHJvcGVydGllczoge1xuICAgICAqICAgICBlbWFpbDoge3R5cGU6IFZhbHVlVHlwZS5TdHJpbmcsIHJlcXVpcmVkOiB0cnVlfSxcbiAgICAgKiAgICAgbmFtZToge3R5cGU6IFZhbHVlVHlwZS5TdHJpbmcsIHJlcXVpcmVkOiB0cnVlfSxcbiAgICAgKiAgIH0sXG4gICAgICogfSk7XG4gICAgICogYGBgXG4gICAgICovXG4gICAgVmFsdWVIaW50VHlwZVtcIlBlcnNvblwiXSA9IFwicGVyc29uXCI7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHRvIGludGVycHJldCBhbmQgcmVuZGVyIHRoZSB2YWx1ZSBhcyBhIHBlcmNlbnRhZ2UuXG4gICAgICovXG4gICAgVmFsdWVIaW50VHlwZVtcIlBlcmNlbnRcIl0gPSBcInBlcmNlbnRcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdG8gaW50ZXJwcmV0IGFuZCByZW5kZXIgdGhlIHZhbHVlIGFzIGEgY3VycmVuY3kgdmFsdWUuXG4gICAgICovXG4gICAgVmFsdWVIaW50VHlwZVtcIkN1cnJlbmN5XCJdID0gXCJjdXJyZW5jeVwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0byBpbnRlcnByZXQgYW5kIHJlbmRlciB0aGUgdmFsdWUgYXMgYW4gaW1hZ2UuIFRoZSBwcm92aWRlZCB2YWx1ZSBzaG91bGQgYmUgYSBVUkwgdGhhdFxuICAgICAqIHBvaW50cyB0byBhbiBpbWFnZS4gQ29kYSB3aWxsIGhvdGxpbmsgdG8gdGhlIGltYWdlIHdoZW4gcmVuZGVyaW5nIGl0IGEgZG9jLlxuICAgICAqXG4gICAgICogVXNpbmcge0BsaW5rIEltYWdlQXR0YWNobWVudH0gaXMgcmVjb21tZW5kZWQgaW5zdGVhZCwgc28gdGhhdCB0aGUgaW1hZ2UgaXMgYWx3YXlzIGFjY2Vzc2libGVcbiAgICAgKiBhbmQgd29uJ3QgYXBwZWFyIGFzIGJyb2tlbiBpZiB0aGUgc291cmNlIGltYWdlIGlzIGxhdGVyIGRlbGV0ZWQuXG4gICAgICovXG4gICAgVmFsdWVIaW50VHlwZVtcIkltYWdlUmVmZXJlbmNlXCJdID0gXCJpbWFnZVwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0byBpbnRlcnByZXQgYW5kIHJlbmRlciB0aGUgdmFsdWUgYXMgYW4gaW1hZ2UuIFRoZSBwcm92aWRlZCB2YWx1ZSBzaG91bGQgYmUgYSBVUkwgdGhhdFxuICAgICAqIHBvaW50cyB0byBhbiBpbWFnZS4gQ29kYSB3aWxsIGluZ2VzdCB0aGUgaW1hZ2UgYW5kIGhvc3QgaXQgZnJvbSBDb2RhIGluZnJhc3RydWN0dXJlLlxuICAgICAqL1xuICAgIFZhbHVlSGludFR5cGVbXCJJbWFnZUF0dGFjaG1lbnRcIl0gPSBcImltYWdlQXR0YWNobWVudFwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0byBpbnRlcnByZXQgYW5kIHJlbmRlciB0aGUgdmFsdWUgYXMgYSBVUkwgbGluay5cbiAgICAgKi9cbiAgICBWYWx1ZUhpbnRUeXBlW1wiVXJsXCJdID0gXCJ1cmxcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdG8gaW50ZXJwcmV0IGEgdGV4dCB2YWx1ZSBhcyBNYXJrZG93biwgd2hpY2ggd2lsbCBiZSBjb252ZXJ0ZWQgYW5kIHJlbmRlcmVkIGFzIENvZGEgcmljaCB0ZXh0LlxuICAgICAqL1xuICAgIFZhbHVlSGludFR5cGVbXCJNYXJrZG93blwiXSA9IFwibWFya2Rvd25cIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdG8gaW50ZXJwcmV0IGEgdGV4dCB2YWx1ZSBhcyBIVE1MLCB3aGljaCB3aWxsIGJlIGNvbnZlcnRlZCBhbmQgcmVuZGVyZWQgYXMgQ29kYSByaWNoIHRleHQuXG4gICAgICovXG4gICAgVmFsdWVIaW50VHlwZVtcIkh0bWxcIl0gPSBcImh0bWxcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdG8gaW50ZXJwcmV0IGFuZCByZW5kZXIgYSB2YWx1ZSBhcyBhbiBlbWJlZC4gVGhlIHByb3ZpZGVkIHZhbHVlIHNob3VsZCBiZSBhIFVSTCBwb2ludGluZ1xuICAgICAqIHRvIGFuIGVtYmVkZGFibGUgd2ViIHBhZ2UuXG4gICAgICovXG4gICAgVmFsdWVIaW50VHlwZVtcIkVtYmVkXCJdID0gXCJlbWJlZFwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0byBpbnRlcnByZXQgYW5kIHJlbmRlciB0aGUgdmFsdWUgYXMgYSBDb2RhIEAtcmVmZXJlbmNlIHRvIGEgdGFibGUgcm93LiBUaGUgcHJvdmlkZWQgdmFsdWUgc2hvdWxkXG4gICAgICogYmUgYW4gb2JqZWN0IHdob3NlIGBpZGAgdmFsdWUgbWF0Y2hlcyB0aGUgaWQgb2Ygc29tZSByb3cgaW4gYSBzeW5jIHRhYmxlLiBUaGUgc2NoZW1hIHdoZXJlIHRoaXMgaGludCB0eXBlIGlzXG4gICAgICogdXNlZCBtdXN0IHNwZWNpZnkgYW4gaWRlbnRpdHkgdGhhdCBzcGVjaWZpZXMgdGhlIGRlc2lyZWQgc3luYyB0YWJsZS5cbiAgICAgKlxuICAgICAqIE5vcm1hbGx5IGEgcmVmZXJlbmNlIHNjaGVtYSBpcyBjb25zdHJ1Y3RlZCBmcm9tIHRoZSBzY2hlbWEgb2JqZWN0IGJlaW5nIHJlZmVyZW5jZWQgdXNpbmcgdGhlIGhlbHBlclxuICAgICAqIHtAbGluayBtYWtlUmVmZXJlbmNlU2NoZW1hRnJvbU9iamVjdFNjaGVtYX0uXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGBgYFxuICAgICAqIG1ha2VPYmplY3RTY2hlbWEoe1xuICAgICAqICAgdHlwZTogVmFsdWVUeXBlLk9iamVjdCxcbiAgICAgKiAgIGNvZGFUeXBlOiBWYWx1ZUhpbnRUeXBlLlJlZmVyZW5jZSxcbiAgICAgKiAgIGlkZW50aXR5OiB7XG4gICAgICogICAgIG5hbWU6IFwiU29tZVN5bmNUYWJsZUlkZW50aXR5XCJcbiAgICAgKiAgIH0sXG4gICAgICogICBpZDogJ2lkZW50aWZpZXInLFxuICAgICAqICAgcHJpbWFyeTogJ25hbWUnLFxuICAgICAqICAgcHJvcGVydGllczoge1xuICAgICAqICAgICBpZGVudGlmaWVyOiB7dHlwZTogVmFsdWVUeXBlLk51bWJlciwgcmVxdWlyZWQ6IHRydWV9LFxuICAgICAqICAgICBuYW1lOiB7dHlwZTogVmFsdWVUeXBlLlN0cmluZywgcmVxdWlyZWQ6IHRydWV9LFxuICAgICAqICAgfSxcbiAgICAgKiB9KTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBWYWx1ZUhpbnRUeXBlW1wiUmVmZXJlbmNlXCJdID0gXCJyZWZlcmVuY2VcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdG8gaW50ZXJwcmV0IGFuZCByZW5kZXIgYSB2YWx1ZSBhcyBhIGZpbGUgYXR0YWNobWVudC4gVGhlIHByb3ZpZGVkIHZhbHVlIHNob3VsZCBiZSBhIFVSTFxuICAgICAqIHBvaW50aW5nIHRvIGEgZmlsZSBvZiBhIENvZGEtc3VwcG9ydGVkIHR5cGUuIENvZGEgd2lsbCBpbmdlc3QgdGhlIGZpbGUgYW5kIGhvc3QgaXQgZnJvbSBDb2RhIGluZnJhc3RydWN0dXJlLlxuICAgICAqL1xuICAgIFZhbHVlSGludFR5cGVbXCJBdHRhY2htZW50XCJdID0gXCJhdHRhY2htZW50XCI7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGVzIHRvIHJlbmRlciBhIG51bWVyaWMgdmFsdWUgYXMgYSBzbGlkZXIgVUkgY29tcG9uZW50LlxuICAgICAqL1xuICAgIFZhbHVlSGludFR5cGVbXCJTbGlkZXJcIl0gPSBcInNsaWRlclwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0byByZW5kZXIgYSBudW1lcmljIHZhbHVlIGFzIGEgc2NhbGUgVUkgY29tcG9uZW50IChlLmcuIGEgc3RhciByYXRpbmcpLlxuICAgICAqL1xuICAgIFZhbHVlSGludFR5cGVbXCJTY2FsZVwiXSA9IFwic2NhbGVcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdG8gcmVuZGVyIGEgbnVtZXJpYyB2YWx1ZSBhcyBhIHByb2dyZXNzIGJhciBVSSBjb21wb25lbnQuXG4gICAgICovXG4gICAgVmFsdWVIaW50VHlwZVtcIlByb2dyZXNzQmFyXCJdID0gXCJwcm9ncmVzc0JhclwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0byByZW5kZXIgYSBib29sZWFuIHZhbHVlIGFzIGEgdG9nZ2xlLlxuICAgICAqL1xuICAgIFZhbHVlSGludFR5cGVbXCJUb2dnbGVcIl0gPSBcInRvZ2dsZVwiO1xufSkoVmFsdWVIaW50VHlwZSA9IGV4cG9ydHMuVmFsdWVIaW50VHlwZSB8fCAoZXhwb3J0cy5WYWx1ZUhpbnRUeXBlID0ge30pKTtcbmV4cG9ydHMuU3RyaW5nSGludFZhbHVlVHlwZXMgPSBbXG4gICAgVmFsdWVIaW50VHlwZS5BdHRhY2htZW50LFxuICAgIFZhbHVlSGludFR5cGUuRGF0ZSxcbiAgICBWYWx1ZUhpbnRUeXBlLlRpbWUsXG4gICAgVmFsdWVIaW50VHlwZS5EYXRlVGltZSxcbiAgICBWYWx1ZUhpbnRUeXBlLkR1cmF0aW9uLFxuICAgIFZhbHVlSGludFR5cGUuRW1haWwsXG4gICAgVmFsdWVIaW50VHlwZS5FbWJlZCxcbiAgICBWYWx1ZUhpbnRUeXBlLkh0bWwsXG4gICAgVmFsdWVIaW50VHlwZS5JbWFnZVJlZmVyZW5jZSxcbiAgICBWYWx1ZUhpbnRUeXBlLkltYWdlQXR0YWNobWVudCxcbiAgICBWYWx1ZUhpbnRUeXBlLk1hcmtkb3duLFxuICAgIFZhbHVlSGludFR5cGUuVXJsLFxuXTtcbmV4cG9ydHMuTnVtYmVySGludFZhbHVlVHlwZXMgPSBbXG4gICAgVmFsdWVIaW50VHlwZS5EYXRlLFxuICAgIFZhbHVlSGludFR5cGUuVGltZSxcbiAgICBWYWx1ZUhpbnRUeXBlLkRhdGVUaW1lLFxuICAgIFZhbHVlSGludFR5cGUuRHVyYXRpb24sXG4gICAgVmFsdWVIaW50VHlwZS5QZXJjZW50LFxuICAgIFZhbHVlSGludFR5cGUuQ3VycmVuY3ksXG4gICAgVmFsdWVIaW50VHlwZS5TbGlkZXIsXG4gICAgVmFsdWVIaW50VHlwZS5Qcm9ncmVzc0JhcixcbiAgICBWYWx1ZUhpbnRUeXBlLlNjYWxlLFxuXTtcbmV4cG9ydHMuQm9vbGVhbkhpbnRWYWx1ZVR5cGVzID0gW1ZhbHVlSGludFR5cGUuVG9nZ2xlXTtcbmV4cG9ydHMuT2JqZWN0SGludFZhbHVlVHlwZXMgPSBbVmFsdWVIaW50VHlwZS5QZXJzb24sIFZhbHVlSGludFR5cGUuUmVmZXJlbmNlXTtcbi8qKlxuICogRW51bWVyYXRpb24gb2YgZm9ybWF0cyBzdXBwb3J0ZWQgYnkgc2NoZW1hcyB0aGF0IHVzZSB7QGxpbmsgVmFsdWVIaW50VHlwZS5DdXJyZW5jeX0uXG4gKlxuICogVGhlc2UgYWZmZWN0IGhvdyBhIG51bWVyaWMgdmFsdWUgaXMgcmVuZGVyZWQgaW4gZG9jcy5cbiAqL1xudmFyIEN1cnJlbmN5Rm9ybWF0O1xuKGZ1bmN0aW9uIChDdXJyZW5jeUZvcm1hdCkge1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0aGUgdmFsdWUgc2hvdWxkIGJlIHJlbmRlcmVkIGFzIGEgbnVtYmVyIHdpdGggYSBjdXJyZW5jeSBzeW1ib2wgYXMgYSBwcmVmaXgsIGUuZy4gYCQyLjUwYC5cbiAgICAgKi9cbiAgICBDdXJyZW5jeUZvcm1hdFtcIkN1cnJlbmN5XCJdID0gXCJjdXJyZW5jeVwiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRlcyB0aGUgdmFsdWUgc2hvdWxkIGJlIHJlbmRlcmVkIGFzIGEgbnVtYmVyIHdpdGggYSBjdXJyZW5jeSBzeW1ib2wgYXMgYSBwcmVmaXgsIGJ1dCBwYWRkZWRcbiAgICAgKiB0byBhbGxvdyB0aGUgbnVtZXJpYyB2YWx1ZXMgdG8gbGluZSB1cCB2ZXJ0aWNhbGx5LCBlLmcuXG4gICAgICpcbiAgICAgKiBgYGBcbiAgICAgKiAkICAgICAgIDIuNTBcbiAgICAgKiAkICAgICAgMjkuOTlcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBDdXJyZW5jeUZvcm1hdFtcIkFjY291bnRpbmdcIl0gPSBcImFjY291bnRpbmdcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdGhlIHZhbHVlIHNob3VsZCBiZSByZW5kZXJlZCBhcyBhIG51bWJlciB3aXRob3V0IGEgY3VycmVuY3kgc3ltYm9sLCBlLmcuIGAyLjUwYC5cbiAgICAgKi9cbiAgICBDdXJyZW5jeUZvcm1hdFtcIkZpbmFuY2lhbFwiXSA9IFwiZmluYW5jaWFsXCI7XG59KShDdXJyZW5jeUZvcm1hdCA9IGV4cG9ydHMuQ3VycmVuY3lGb3JtYXQgfHwgKGV4cG9ydHMuQ3VycmVuY3lGb3JtYXQgPSB7fSkpO1xuLyoqXG4gKiBJY29ucyB0aGF0IGNhbiBiZSB1c2VkIHdpdGggYSB7QGxpbmsgU2NhbGVTY2hlbWF9LlxuICpcbiAqIEZvciBleGFtcGxlLCB0byByZW5kZXIgYSBzdGFyIHJhdGluZywgdXNlIGEge0BsaW5rIFNjYWxlU2NoZW1hfSB3aXRoIGBpY29uOiBjb2RhLlNjYWxlSWNvblNldC5TdGFyYC5cbiAqL1xudmFyIFNjYWxlSWNvblNldDtcbihmdW5jdGlvbiAoU2NhbGVJY29uU2V0KSB7XG4gICAgU2NhbGVJY29uU2V0W1wiU3RhclwiXSA9IFwic3RhclwiO1xuICAgIFNjYWxlSWNvblNldFtcIkNpcmNsZVwiXSA9IFwiY2lyY2xlXCI7XG4gICAgU2NhbGVJY29uU2V0W1wiRmlyZVwiXSA9IFwiZmlyZVwiO1xuICAgIFNjYWxlSWNvblNldFtcIkJ1Z1wiXSA9IFwiYnVnXCI7XG4gICAgU2NhbGVJY29uU2V0W1wiRGlhbW9uZFwiXSA9IFwiZGlhbW9uZFwiO1xuICAgIFNjYWxlSWNvblNldFtcIkJlbGxcIl0gPSBcImJlbGxcIjtcbiAgICBTY2FsZUljb25TZXRbXCJUaHVtYnNVcFwiXSA9IFwidGh1bWJzdXBcIjtcbiAgICBTY2FsZUljb25TZXRbXCJIZWFydFwiXSA9IFwiaGVhcnRcIjtcbiAgICBTY2FsZUljb25TZXRbXCJDaGlsaVwiXSA9IFwiY2hpbGlcIjtcbiAgICBTY2FsZUljb25TZXRbXCJTbWlsZXlcIl0gPSBcInNtaWxleVwiO1xuICAgIFNjYWxlSWNvblNldFtcIkxpZ2h0bmluZ1wiXSA9IFwibGlnaHRuaW5nXCI7XG4gICAgU2NhbGVJY29uU2V0W1wiQ3VycmVuY3lcIl0gPSBcImN1cnJlbmN5XCI7XG4gICAgU2NhbGVJY29uU2V0W1wiQ29mZmVlXCJdID0gXCJjb2ZmZWVcIjtcbiAgICBTY2FsZUljb25TZXRbXCJQZXJzb25cIl0gPSBcInBlcnNvblwiO1xuICAgIFNjYWxlSWNvblNldFtcIkJhdHRlcnlcIl0gPSBcImJhdHRlcnlcIjtcbiAgICBTY2FsZUljb25TZXRbXCJDb2NrdGFpbFwiXSA9IFwiY29ja3RhaWxcIjtcbiAgICBTY2FsZUljb25TZXRbXCJDbG91ZFwiXSA9IFwiY2xvdWRcIjtcbiAgICBTY2FsZUljb25TZXRbXCJTdW5cIl0gPSBcInN1blwiO1xuICAgIFNjYWxlSWNvblNldFtcIkNoZWNrbWFya1wiXSA9IFwiY2hlY2ttYXJrXCI7XG4gICAgU2NhbGVJY29uU2V0W1wiTGlnaHRCdWxiXCJdID0gXCJsaWdodGJ1bGJcIjtcbn0pKFNjYWxlSWNvblNldCA9IGV4cG9ydHMuU2NhbGVJY29uU2V0IHx8IChleHBvcnRzLlNjYWxlSWNvblNldCA9IHt9KSk7XG4vKipcbiAqIERpc3BsYXkgdHlwZXMgdGhhdCBjYW4gYmUgdXNlZCB3aXRoIGFuIHtAbGluayBFbWFpbFNjaGVtYX0uXG4gKi9cbnZhciBFbWFpbERpc3BsYXlUeXBlO1xuKGZ1bmN0aW9uIChFbWFpbERpc3BsYXlUeXBlKSB7XG4gICAgLyoqXG4gICAgICogRGlzcGxheSBib3RoIGljb24gYW5kIGVtYWlsIChkZWZhdWx0KS5cbiAgICAgKi9cbiAgICBFbWFpbERpc3BsYXlUeXBlW1wiSWNvbkFuZEVtYWlsXCJdID0gXCJpY29uQW5kRW1haWxcIjtcbiAgICAvKipcbiAgICAgKiBEaXNwbGF5IGljb24gb25seS5cbiAgICAgKi9cbiAgICBFbWFpbERpc3BsYXlUeXBlW1wiSWNvbk9ubHlcIl0gPSBcImljb25Pbmx5XCI7XG4gICAgLyoqXG4gICAgICogRGlzcGxheSBlbWFpbCBhZGRyZXNzIG9ubHkuXG4gICAgICovXG4gICAgRW1haWxEaXNwbGF5VHlwZVtcIkVtYWlsT25seVwiXSA9IFwiZW1haWxPbmx5XCI7XG59KShFbWFpbERpc3BsYXlUeXBlID0gZXhwb3J0cy5FbWFpbERpc3BsYXlUeXBlIHx8IChleHBvcnRzLkVtYWlsRGlzcGxheVR5cGUgPSB7fSkpO1xuLyoqXG4gKiBEaXNwbGF5IHR5cGVzIHRoYXQgY2FuIGJlIHVzZWQgd2l0aCBhIHtAbGluayBMaW5rU2NoZW1hfS5cbiAqL1xudmFyIExpbmtEaXNwbGF5VHlwZTtcbihmdW5jdGlvbiAoTGlua0Rpc3BsYXlUeXBlKSB7XG4gICAgLyoqXG4gICAgICogRGlzcGxheSBpY29uIG9ubHkuXG4gICAgICovXG4gICAgTGlua0Rpc3BsYXlUeXBlW1wiSWNvbk9ubHlcIl0gPSBcImljb25Pbmx5XCI7XG4gICAgLyoqXG4gICAgICogRGlzcGxheSBVUkwuXG4gICAgICovXG4gICAgTGlua0Rpc3BsYXlUeXBlW1wiVXJsXCJdID0gXCJ1cmxcIjtcbiAgICAvKipcbiAgICAgKiBEaXNwbGF5IHdlYiBwYWdlIHRpdGxlLlxuICAgICAqL1xuICAgIExpbmtEaXNwbGF5VHlwZVtcIlRpdGxlXCJdID0gXCJ0aXRsZVwiO1xuICAgIC8qKlxuICAgICAqIERpc3BsYXkgdGhlIHJlZmVyZW5jZWQgd2ViIHBhZ2UgYXMgYSBjYXJkLlxuICAgICAqL1xuICAgIExpbmtEaXNwbGF5VHlwZVtcIkNhcmRcIl0gPSBcImNhcmRcIjtcbiAgICAvKipcbiAgICAgKiBEaXNwbGF5IHRoZSByZWZlcmVuY2VkIHdlYiBwYWdlIGFzIGFuIGVtYmVkLlxuICAgICAqL1xuICAgIExpbmtEaXNwbGF5VHlwZVtcIkVtYmVkXCJdID0gXCJlbWJlZFwiO1xufSkoTGlua0Rpc3BsYXlUeXBlID0gZXhwb3J0cy5MaW5rRGlzcGxheVR5cGUgfHwgKGV4cG9ydHMuTGlua0Rpc3BsYXlUeXBlID0ge30pKTtcbi8qKlxuICogU3RhdGUgb2Ygb3V0bGluZSBvbiBpbWFnZXMgdGhhdCBjYW4gYmUgdXNlZCB3aXRoIGEge0BsaW5rIEltYWdlU2NoZW1hfS5cbiAqL1xudmFyIEltYWdlT3V0bGluZTtcbihmdW5jdGlvbiAoSW1hZ2VPdXRsaW5lKSB7XG4gICAgLyoqIEltYWdlIGlzIHJlbmRlcmVkIHdpdGhvdXQgb3V0bGluZS4gKi9cbiAgICBJbWFnZU91dGxpbmVbXCJEaXNhYmxlZFwiXSA9IFwiZGlzYWJsZWRcIjtcbiAgICAvKiogSW1hZ2UgaXMgcmVuZGVyZWQgd2l0aCBvdXRsaW5lLiAqL1xuICAgIEltYWdlT3V0bGluZVtcIlNvbGlkXCJdID0gXCJzb2xpZFwiO1xufSkoSW1hZ2VPdXRsaW5lID0gZXhwb3J0cy5JbWFnZU91dGxpbmUgfHwgKGV4cG9ydHMuSW1hZ2VPdXRsaW5lID0ge30pKTtcbi8qKlxuICogU3RhdGUgb2YgY29ybmVycyBvbiBpbWFnZXMgdGhhdCBjYW4gYmUgdXNlZCB3aXRoIGEge0BsaW5rIEltYWdlU2NoZW1hfS5cbiAqL1xudmFyIEltYWdlQ29ybmVyU3R5bGU7XG4oZnVuY3Rpb24gKEltYWdlQ29ybmVyU3R5bGUpIHtcbiAgICAvKiogSW1hZ2UgaXMgcmVuZGVyZWQgd2l0aCByb3VuZGVkIGNvcm5lcnMuICovXG4gICAgSW1hZ2VDb3JuZXJTdHlsZVtcIlJvdW5kZWRcIl0gPSBcInJvdW5kZWRcIjtcbiAgICAvKiogSW1hZ2UgaXMgcmVuZGVyZWQgd2l0aCBzcXVhcmUgY29ybmVycy4gKi9cbiAgICBJbWFnZUNvcm5lclN0eWxlW1wiU3F1YXJlXCJdID0gXCJzcXVhcmVcIjtcbn0pKEltYWdlQ29ybmVyU3R5bGUgPSBleHBvcnRzLkltYWdlQ29ybmVyU3R5bGUgfHwgKGV4cG9ydHMuSW1hZ2VDb3JuZXJTdHlsZSA9IHt9KSk7XG4vKipcbiAqIEVudW1lcmF0aW9uIG9mIHVuaXRzIHN1cHBvcnRlZCBieSBkdXJhdGlvbiBzY2hlbWFzLiBTZWUge0BsaW5rIER1cmF0aW9uU2NoZW1hLm1heFVuaXR9LlxuICovXG52YXIgRHVyYXRpb25Vbml0O1xuKGZ1bmN0aW9uIChEdXJhdGlvblVuaXQpIHtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0aW9ucyBhIGR1cmF0aW9uIGFzIGEgbnVtYmVyIG9mIGRheXMuXG4gICAgICovXG4gICAgRHVyYXRpb25Vbml0W1wiRGF5c1wiXSA9IFwiZGF5c1wiO1xuICAgIC8qKlxuICAgICAqIEluZGljYXRpb25zIGEgZHVyYXRpb24gYXMgYSBudW1iZXIgb2YgaG91cnMuXG4gICAgICovXG4gICAgRHVyYXRpb25Vbml0W1wiSG91cnNcIl0gPSBcImhvdXJzXCI7XG4gICAgLyoqXG4gICAgICogSW5kaWNhdGlvbnMgYSBkdXJhdGlvbiBhcyBhIG51bWJlciBvZiBtaW51dGVzLlxuICAgICAqL1xuICAgIER1cmF0aW9uVW5pdFtcIk1pbnV0ZXNcIl0gPSBcIm1pbnV0ZXNcIjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0aW9ucyBhIGR1cmF0aW9uIGFzIGEgbnVtYmVyIG9mIHNlY29uZHMuXG4gICAgICovXG4gICAgRHVyYXRpb25Vbml0W1wiU2Vjb25kc1wiXSA9IFwic2Vjb25kc1wiO1xufSkoRHVyYXRpb25Vbml0ID0gZXhwb3J0cy5EdXJhdGlvblVuaXQgfHwgKGV4cG9ydHMuRHVyYXRpb25Vbml0ID0ge30pKTtcbi8qKlxuICogVGhlIHN1YnNldCBvZiBTdHJpbmdIaW50VHlwZXMgdGhhdCBkb24ndCBoYXZlIHNwZWNpZmljIHNjaGVtYSBhdHRyaWJ1dGVzLlxuICovXG5leHBvcnRzLlNpbXBsZVN0cmluZ0hpbnRWYWx1ZVR5cGVzID0gW1xuICAgIFZhbHVlSGludFR5cGUuQXR0YWNobWVudCxcbiAgICBWYWx1ZUhpbnRUeXBlLkh0bWwsXG4gICAgVmFsdWVIaW50VHlwZS5NYXJrZG93bixcbiAgICBWYWx1ZUhpbnRUeXBlLlVybCxcbiAgICBWYWx1ZUhpbnRUeXBlLkVtYWlsLFxuXTtcbi8qKlxuICogVGhlIHR5cGUgb2YgY29udGVudCBpbiB0aGlzIGF0dHJpYnV0aW9uIG5vZGUuXG4gKlxuICogTXVsdGlwbGUgYXR0cmlidXRpb24gbm9kZXMgY2FuIGJlIHJlbmRlcmVkIGFsbCB0b2dldGhlciwgZm9yIGV4YW1wbGUgdG8gaGF2ZVxuICogYXR0cmlidXRpb24gdGhhdCBjb250YWlucyBib3RoIHRleHQgYW5kIGEgbG9nbyBpbWFnZS5cbiAqL1xudmFyIEF0dHJpYnV0aW9uTm9kZVR5cGU7XG4oZnVuY3Rpb24gKEF0dHJpYnV0aW9uTm9kZVR5cGUpIHtcbiAgICAvKipcbiAgICAgKiBUZXh0IGF0dHJpYnV0aW9uIGNvbnRlbnQuXG4gICAgICovXG4gICAgQXR0cmlidXRpb25Ob2RlVHlwZVtBdHRyaWJ1dGlvbk5vZGVUeXBlW1wiVGV4dFwiXSA9IDFdID0gXCJUZXh0XCI7XG4gICAgLyoqXG4gICAgICogQSBoeXBlcmxpbmsgcG9pbnRpbmcgdG8gdGhlIGRhdGEgc291cmNlLlxuICAgICAqL1xuICAgIEF0dHJpYnV0aW9uTm9kZVR5cGVbQXR0cmlidXRpb25Ob2RlVHlwZVtcIkxpbmtcIl0gPSAyXSA9IFwiTGlua1wiO1xuICAgIC8qKlxuICAgICAqIEFuIGltYWdlLCBvZnRlbiBhIGxvZ28gb2YgdGhlIGRhdGEgc291cmNlLlxuICAgICAqL1xuICAgIEF0dHJpYnV0aW9uTm9kZVR5cGVbQXR0cmlidXRpb25Ob2RlVHlwZVtcIkltYWdlXCJdID0gM10gPSBcIkltYWdlXCI7XG59KShBdHRyaWJ1dGlvbk5vZGVUeXBlID0gZXhwb3J0cy5BdHRyaWJ1dGlvbk5vZGVUeXBlIHx8IChleHBvcnRzLkF0dHJpYnV0aW9uTm9kZVR5cGUgPSB7fSkpO1xuLyoqXG4gKiBBIGhlbHBlciBmb3IgY29uc3RydWN0aW5nIGF0dHJpYnV0aW9uIHRleHQsIGxpbmtzLCBvciBpbWFnZXMgdGhhdCByZW5kZXIgYWxvbmcgd2l0aCBhIFBhY2sgdmFsdWUuXG4gKlxuICogTWFueSBBUElzIGhhdmUgbGljZW5zaW5nIHJlcXVpcmVtZW50cyB0aGF0IGFzayBmb3Igc3BlY2lmaWMgYXR0cmlidXRpb24gdG8gYmUgaW5jbHVkZWRcbiAqIHdoZW4gdXNpbmcgdGhlaXIgZGF0YS4gRm9yIGV4YW1wbGUsIGEgc3RvY2sgcGhvdG8gQVBJIG1heSByZXF1aXJlIGF0dHJpYnV0aW9uIHRleHRcbiAqIGFuZCBhIGxvZ28uXG4gKlxuICogQW55IHtAbGluayBJZGVudGl0eURlZmluaXRpb259IGNhbiBpbmNsdWRlIG9uZSBvciBtb3JlIGF0dHJpYnV0aW9uIG5vZGVzIHRoYXQgd2lsbCBiZVxuICogcmVuZGVyZWQgYW55IHRpbWUgYSB2YWx1ZSB3aXRoIHRoYXQgaWRlbnRpdHkgaXMgcmVuZGVyZWQgaW4gYSBkb2MuXG4gKi9cbmZ1bmN0aW9uIG1ha2VBdHRyaWJ1dGlvbk5vZGUobm9kZSkge1xuICAgIHJldHVybiBub2RlO1xufVxuZXhwb3J0cy5tYWtlQXR0cmlidXRpb25Ob2RlID0gbWFrZUF0dHJpYnV0aW9uTm9kZTtcbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICAgIHJldHVybiBCb29sZWFuKHZhbCAmJiB2YWwudHlwZSA9PT0gVmFsdWVUeXBlLk9iamVjdCk7XG59XG5leHBvcnRzLmlzT2JqZWN0ID0gaXNPYmplY3Q7XG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICAgIHJldHVybiBCb29sZWFuKHZhbCAmJiB2YWwudHlwZSA9PT0gVmFsdWVUeXBlLkFycmF5KTtcbn1cbmV4cG9ydHMuaXNBcnJheSA9IGlzQXJyYXk7XG4vKipcbiAqIFV0aWxpdHkgdGhhdCBleGFtaW5lcyBhIEphdmFTY3JpcHQgdmFsdWUgYW5kIGF0dGVtcHRzIHRvIGluZmVyIGEgc2NoZW1hIGRlZmluaXRpb25cbiAqIHRoYXQgZGVzY3JpYmVzIGl0LlxuICpcbiAqIEl0IGlzIHZhc3RseSBwcmVmZXJhYmxlIHRvIGRlZmluZSBhIHNjaGVtYSBtYW51YWxseS4gQSBjbGVhciBhbmQgYWNjdXJhdGUgc2NoZW1hIGlzIG9uZSBvZiB0aGVcbiAqIGZ1bmRhbWVudGFscyBvZiBhIGdvb2QgcGFjay4gSG93ZXZlciwgZm9yIGRhdGEgdGhhdCBpcyB0cnVseSBkeW5hbWljIGZvciB3aGljaCBhIHNjaGVtYSBjYW4ndFxuICogYmUga25vd24gaW4gYWR2YW5jZSBub3IgY2FuIGEgZnVuY3Rpb24gYmUgd3JpdHRlbiB0byBnZW5lcmF0ZSBhIGR5bmFtaWMgc2NoZW1hIGZyb20gb3RoZXJcbiAqIGlucHV0cywgaXQgbWF5IGJlIHVzZWZ1bCB0byB1cyB0aGlzIGhlbHBlciB0byBzbmlmZiB0aGUgcmV0dXJuIHZhbHVlIGFuZCBnZW5lcmF0ZSBhIGJhc2ljXG4gKiBpbmZlcnJlZCBzY2hlbWEgZnJvbSBpdC5cbiAqXG4gKiBUaGlzIHV0aWxpdHkgZG9lcyBOT1QgYXR0ZW1wdCB0byBkZXRlcm1pbmUge0BsaW5rIE9iamVjdFNjaGVtYURlZmluaXRpb24uaWRQcm9wZXJ0eX0gb3JcbiAqIHtAbGluayBPYmplY3RTY2hlbWFEZWZpbml0aW9uLmRpc3BsYXlQcm9wZXJ0eX0gYXR0cmlidXRlcyBmb3JcbiAqIGFuIG9iamVjdCBzY2hlbWEsIHRob3NlIGFyZSBsZWZ0IHVuZGVmaW5lZC5cbiAqL1xuZnVuY3Rpb24gZ2VuZXJhdGVTY2hlbWEob2JqKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgICBpZiAob2JqLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNdXN0IGhhdmUgcmVwcmVzZW50YXRpdmUgdmFsdWUuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgdHlwZTogVmFsdWVUeXBlLkFycmF5LCBpdGVtczogZ2VuZXJhdGVTY2hlbWEob2JqWzBdKSB9O1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgY29uc3QgcHJvcGVydGllcyA9IHt9O1xuICAgICAgICBpZiAob2JqID09PSBudWxsKSB7XG4gICAgICAgICAgICAvLyBEZWZhdWx0IG51bGxzIHRvIHN0cmluZyB3aGljaCBpcyB0aGUgbGVhc3QgY29tbW9uIGRlbm9taW5hdG9yLlxuICAgICAgICAgICAgcmV0dXJuIHsgdHlwZTogVmFsdWVUeXBlLlN0cmluZyB9O1xuICAgICAgICB9XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgICAgICAgICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgcHJvcGVydGllc1trZXldID0gZ2VuZXJhdGVTY2hlbWEob2JqW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHR5cGU6IFZhbHVlVHlwZS5PYmplY3QsIHByb3BlcnRpZXMgfTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogVmFsdWVUeXBlLlN0cmluZyB9O1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2Ygb2JqID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogVmFsdWVUeXBlLkJvb2xlYW4gfTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIG9iaiA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgcmV0dXJuIHsgdHlwZTogVmFsdWVUeXBlLk51bWJlciB9O1xuICAgIH1cbiAgICByZXR1cm4gKDAsIGVuc3VyZV80LmVuc3VyZVVucmVhY2hhYmxlKShvYmopO1xufVxuZXhwb3J0cy5nZW5lcmF0ZVNjaGVtYSA9IGdlbmVyYXRlU2NoZW1hO1xuLyoqXG4gKiBBIHdyYXBwZXIgZm9yIGNyZWF0aW5nIGFueSBzY2hlbWEgZGVmaW5pdGlvbi5cbiAqXG4gKiBJZiB5b3UgYXJlIGNyZWF0aW5nIGEgc2NoZW1hIGZvciBhbiBvYmplY3QgKGFzIG9wcG9zZWQgdG8gYSBzY2FsYXIgb3IgYXJyYXkpLFxuICogdXNlIHRoZSBtb3JlIHNwZWNpZmljIHtAbGluayBtYWtlT2JqZWN0U2NoZW1hfS5cbiAqXG4gKiBJdCBpcyBhbHdheXMgcmVjb21tZW5kZWQgdG8gdXNlIHdyYXBwZXIgZnVuY3Rpb25zIGZvciBjcmVhdGluZyB0b3AtbGV2ZWwgc2NoZW1hXG4gKiBvYmplY3RzIHJhdGhlciB0aGFuIHNwZWNpZnlpbmcgb2JqZWN0IGxpdGVyYWxzLiBXcmFwcGVycyB2YWxpZGF0ZSB5b3VyIHNjaGVtYXNcbiAqIGF0IGNyZWF0aW9uIHRpbWUsIHByb3ZpZGUgYmV0dGVyIFR5cGVTY3JpcHQgdHlwZSBpbmZlcmVuY2UsIGFuZCBjYW4gcmVkdWNlXG4gKiBib2lsZXJwbGF0ZS5cbiAqXG4gKiBBdCB0aGlzIHRpbWUsIHRoaXMgd3JhcHBlciBwcm92aWRlcyBvbmx5IGJldHRlciBUeXBlU2NyaXB0IHR5cGUgaW5mZXJlbmNlLFxuICogYnV0IGl0IG1heSBkbyB2YWxpZGF0aW9uIGluIGEgZnV0dXJlIFNESyB2ZXJzaW9uLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIGNvZGEubWFrZVNjaGVtYSh7XG4gKiAgIHR5cGU6IGNvZGEuVmFsdWVUeXBlLkFycmF5LFxuICogICBpdGVtczoge3R5cGU6IGNvZGEuVmFsdWVUeXBlLlN0cmluZ30sXG4gKiB9KTtcbiAqIGBgYFxuICovXG5mdW5jdGlvbiBtYWtlU2NoZW1hKHNjaGVtYSkge1xuICAgIHJldHVybiBzY2hlbWE7XG59XG5leHBvcnRzLm1ha2VTY2hlbWEgPSBtYWtlU2NoZW1hO1xuLyoqXG4gKiBBIHdyYXBwZXIgZm9yIGNyZWF0aW5nIGEgc2NoZW1hIGRlZmluaXRpb24gZm9yIGFuIG9iamVjdCB2YWx1ZS5cbiAqXG4gKiBJdCBpcyBhbHdheXMgcmVjb21tZW5kZWQgdG8gdXNlIHdyYXBwZXIgZnVuY3Rpb25zIGZvciBjcmVhdGluZyB0b3AtbGV2ZWwgc2NoZW1hXG4gKiBvYmplY3RzIHJhdGhlciB0aGFuIHNwZWNpZnlpbmcgb2JqZWN0IGxpdGVyYWxzLiBXcmFwcGVycyB2YWxpZGF0ZSB5b3VyIHNjaGVtYXNcbiAqIGF0IGNyZWF0aW9uIHRpbWUsIHByb3ZpZGUgYmV0dGVyIFR5cGVTY3JpcHQgdHlwZSBpbmZlcmVuY2UsIGFuZCBjYW4gcmVkdWNlXG4gKiBib2lsZXJwbGF0ZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgXG4gKiBjb2RhLm1ha2VPYmplY3RTY2hlbWEoe1xuICogICBpZDogXCJlbWFpbFwiLFxuICogICBwcmltYXJ5OiBcIm5hbWVcIixcbiAqICAgcHJvcGVydGllczoge1xuICogICAgIGVtYWlsOiB7dHlwZTogY29kYS5WYWx1ZVR5cGUuU3RyaW5nLCByZXF1aXJlZDogdHJ1ZX0sXG4gKiAgICAgbmFtZToge3R5cGU6IGNvZGEuVmFsdWVUeXBlLlN0cmluZywgcmVxdWlyZWQ6IHRydWV9LFxuICogICB9LFxuICogfSk7XG4gKiBgYGBcbiAqL1xuZnVuY3Rpb24gbWFrZU9iamVjdFNjaGVtYShzY2hlbWFEZWYpIHtcbiAgICBjb25zdCBzY2hlbWEgPSB7IC4uLnNjaGVtYURlZiwgdHlwZTogVmFsdWVUeXBlLk9iamVjdCB9O1xuICAgIC8vIEluIGNhc2UgYSBzaW5nbGUgc2NoZW1hIG9iamVjdCB3YXMgdXNlZCBmb3IgbXVsdGlwbGUgcHJvcGVydGllcywgbWFrZSBjb3BpZXMgZm9yIGVhY2ggb2YgdGhlbS5cbiAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhzY2hlbWEucHJvcGVydGllcykpIHtcbiAgICAgICAgLy8gJ3R5cGUnIHdhcyBqdXN0IGNyZWF0ZWQgZnJvbSBzY3JhdGNoIGFib3ZlXG4gICAgICAgIGlmIChrZXkgIT09ICd0eXBlJykge1xuICAgICAgICAgICAgLy8gVHlwZXNjcmlwdCBkb2Vzbid0IGxpa2UgdGhlIHJhdyBzY2hlbWEucHJvcGVydGllc1trZXldIChvbiB0aGUgbGVmdCBvbmx5IHRob3VnaC4uLilcbiAgICAgICAgICAgIGNvbnN0IHR5cGVkS2V5ID0ga2V5O1xuICAgICAgICAgICAgc2NoZW1hLnByb3BlcnRpZXNbdHlwZWRLZXldID0gKDAsIG9iamVjdF91dGlsc18xLmRlZXBDb3B5KShzY2hlbWEucHJvcGVydGllc1trZXldKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YWxpZGF0ZU9iamVjdFNjaGVtYShzY2hlbWEpO1xuICAgIHJldHVybiBzY2hlbWE7XG59XG5leHBvcnRzLm1ha2VPYmplY3RTY2hlbWEgPSBtYWtlT2JqZWN0U2NoZW1hO1xuZnVuY3Rpb24gdmFsaWRhdGVPYmplY3RTY2hlbWEoc2NoZW1hKSB7XG4gICAgaWYgKHNjaGVtYS5jb2RhVHlwZSA9PT0gVmFsdWVIaW50VHlwZS5SZWZlcmVuY2UpIHtcbiAgICAgICAgY29uc3QgeyBpZCwgaWRlbnRpdHksIHByaW1hcnkgfSA9ICgwLCBtaWdyYXRpb25fMS5vYmplY3RTY2hlbWFIZWxwZXIpKHNjaGVtYSk7XG4gICAgICAgIGNoZWNrUmVxdWlyZWRGaWVsZEluT2JqZWN0U2NoZW1hKGlkLCAnaWQnLCBzY2hlbWEuY29kYVR5cGUpO1xuICAgICAgICBjaGVja1JlcXVpcmVkRmllbGRJbk9iamVjdFNjaGVtYShpZGVudGl0eSwgJ2lkZW50aXR5Jywgc2NoZW1hLmNvZGFUeXBlKTtcbiAgICAgICAgY2hlY2tSZXF1aXJlZEZpZWxkSW5PYmplY3RTY2hlbWEocHJpbWFyeSwgJ3ByaW1hcnknLCBzY2hlbWEuY29kYVR5cGUpO1xuICAgICAgICBjaGVja1NjaGVtYVByb3BlcnR5SXNSZXF1aXJlZCgoMCwgZW5zdXJlXzIuZW5zdXJlRXhpc3RzKShpZCksIHNjaGVtYSwgJ2lkUHJvcGVydHknKTtcbiAgICAgICAgY2hlY2tTY2hlbWFQcm9wZXJ0eUlzUmVxdWlyZWQoKDAsIGVuc3VyZV8yLmVuc3VyZUV4aXN0cykocHJpbWFyeSksIHNjaGVtYSwgJ2Rpc3BsYXlQcm9wZXJ0eScpO1xuICAgIH1cbiAgICBpZiAoc2NoZW1hLmNvZGFUeXBlID09PSBWYWx1ZUhpbnRUeXBlLlBlcnNvbikge1xuICAgICAgICBjb25zdCB7IGlkIH0gPSAoMCwgbWlncmF0aW9uXzEub2JqZWN0U2NoZW1hSGVscGVyKShzY2hlbWEpO1xuICAgICAgICBjaGVja1JlcXVpcmVkRmllbGRJbk9iamVjdFNjaGVtYShpZCwgJ2lkJywgc2NoZW1hLmNvZGFUeXBlKTtcbiAgICAgICAgY2hlY2tTY2hlbWFQcm9wZXJ0eUlzUmVxdWlyZWQoKDAsIGVuc3VyZV8yLmVuc3VyZUV4aXN0cykoaWQpLCBzY2hlbWEsICdpZFByb3BlcnR5Jyk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgW19wcm9wZXJ0eUtleSwgcHJvcGVydHlTY2hlbWFdIG9mIE9iamVjdC5lbnRyaWVzKHNjaGVtYS5wcm9wZXJ0aWVzKSkge1xuICAgICAgICBpZiAocHJvcGVydHlTY2hlbWEudHlwZSA9PT0gVmFsdWVUeXBlLk9iamVjdCkge1xuICAgICAgICAgICAgdmFsaWRhdGVPYmplY3RTY2hlbWEocHJvcGVydHlTY2hlbWEpO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gY2hlY2tSZXF1aXJlZEZpZWxkSW5PYmplY3RTY2hlbWEoZmllbGQsIGZpZWxkTmFtZSwgY29kYVR5cGUpIHtcbiAgICAoMCwgZW5zdXJlXzIuZW5zdXJlRXhpc3RzKShmaWVsZCwgYE9iamVjdHMgd2l0aCBjb2RhVHlwZSBcIiR7Y29kYVR5cGV9XCIgcmVxdWlyZSBhIFwiJHtmaWVsZE5hbWV9XCIgcHJvcGVydHkgaW4gdGhlIHNjaGVtYSBkZWZpbml0aW9uLmApO1xufVxuZnVuY3Rpb24gY2hlY2tTY2hlbWFQcm9wZXJ0eUlzUmVxdWlyZWQoZmllbGQsIHNjaGVtYSwgcmVmZXJlbmNlZEJ5UHJvcGVydHlOYW1lKSB7XG4gICAgY29uc3QgeyBwcm9wZXJ0aWVzLCBjb2RhVHlwZSB9ID0gc2NoZW1hO1xuICAgICgwLCBlbnN1cmVfMS5hc3NlcnRDb25kaXRpb24pKHByb3BlcnRpZXNbZmllbGRdLCBgJHtyZWZlcmVuY2VkQnlQcm9wZXJ0eU5hbWV9IHNldCB0byB1bmRlZmluZWQgZmllbGQgXCIke2ZpZWxkfVwiYCk7XG4gICAgKDAsIGVuc3VyZV8xLmFzc2VydENvbmRpdGlvbikocHJvcGVydGllc1tmaWVsZF0ucmVxdWlyZWQsIGBGaWVsZCBcIiR7ZmllbGR9XCIgbXVzdCBiZSBtYXJrZWQgYXMgcmVxdWlyZWQgaW4gc2NoZW1hIHdpdGggY29kYVR5cGUgXCIke2NvZGFUeXBlfVwiLmApO1xufVxuZnVuY3Rpb24gbm9ybWFsaXplU2NoZW1hS2V5KGtleSkge1xuICAgIC8vIENvbG9ucyBjYXVzZSBwcm9ibGVtcyBpbiBvdXIgZm9ybXVsYSBoYW5kbGluZy5cbiAgICByZXR1cm4gKDAsIHBhc2NhbGNhc2VfMS5kZWZhdWx0KShrZXkpLnJlcGxhY2UoLzovZywgJ18nKTtcbn1cbmV4cG9ydHMubm9ybWFsaXplU2NoZW1hS2V5ID0gbm9ybWFsaXplU2NoZW1hS2V5O1xuZnVuY3Rpb24gbm9ybWFsaXplU2NoZW1hKHNjaGVtYSkge1xuICAgIGlmIChpc0FycmF5KHNjaGVtYSkpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnNjaGVtYSxcbiAgICAgICAgICAgIHR5cGU6IFZhbHVlVHlwZS5BcnJheSxcbiAgICAgICAgICAgIGl0ZW1zOiBub3JtYWxpemVTY2hlbWEoc2NoZW1hLml0ZW1zKSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZWxzZSBpZiAoaXNPYmplY3Qoc2NoZW1hKSkge1xuICAgICAgICBjb25zdCBub3JtYWxpemVkID0ge307XG4gICAgICAgIGNvbnN0IHsgaWQsIHByaW1hcnksIGZlYXR1cmVkLCBpZFByb3BlcnR5LCBkaXNwbGF5UHJvcGVydHksIGZlYXR1cmVkUHJvcGVydGllcywgdGl0bGVQcm9wZXJ0eSwgc3VidGl0bGVQcm9wZXJ0aWVzLCBpbWFnZVByb3BlcnR5LCBkZXNjcmlwdGlvblByb3BlcnR5LCBsaW5rUHJvcGVydHksIH0gPSBzY2hlbWE7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHNjaGVtYS5wcm9wZXJ0aWVzKSkge1xuICAgICAgICAgICAgY29uc3Qgbm9ybWFsaXplZEtleSA9IG5vcm1hbGl6ZVNjaGVtYUtleShrZXkpO1xuICAgICAgICAgICAgY29uc3QgcHJvcHMgPSBzY2hlbWEucHJvcGVydGllc1trZXldO1xuICAgICAgICAgICAgY29uc3QgeyByZXF1aXJlZCwgZnJvbUtleSB9ID0gcHJvcHM7XG4gICAgICAgICAgICBub3JtYWxpemVkW25vcm1hbGl6ZWRLZXldID0gT2JqZWN0LmFzc2lnbihub3JtYWxpemVTY2hlbWEocHJvcHMpLCB7XG4gICAgICAgICAgICAgICAgcmVxdWlyZWQsXG4gICAgICAgICAgICAgICAgZnJvbUtleTogZnJvbUtleSB8fCAobm9ybWFsaXplZEtleSAhPT0ga2V5ID8ga2V5IDogdW5kZWZpbmVkKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG5vcm1hbGl6ZWRTY2hlbWEgPSB7XG4gICAgICAgICAgICB0eXBlOiBWYWx1ZVR5cGUuT2JqZWN0LFxuICAgICAgICAgICAgaWQ6IGlkID8gbm9ybWFsaXplU2NoZW1hS2V5KGlkKSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGZlYXR1cmVkOiBmZWF0dXJlZCA/IGZlYXR1cmVkLm1hcChub3JtYWxpemVTY2hlbWFLZXkpIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgcHJpbWFyeTogcHJpbWFyeSA/IG5vcm1hbGl6ZVNjaGVtYUtleShwcmltYXJ5KSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGlkUHJvcGVydHk6IGlkUHJvcGVydHkgPyBub3JtYWxpemVTY2hlbWFLZXkoaWRQcm9wZXJ0eSkgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBmZWF0dXJlZFByb3BlcnRpZXM6IGZlYXR1cmVkUHJvcGVydGllcyA/IGZlYXR1cmVkUHJvcGVydGllcy5tYXAobm9ybWFsaXplU2NoZW1hS2V5KSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGRpc3BsYXlQcm9wZXJ0eTogZGlzcGxheVByb3BlcnR5ID8gbm9ybWFsaXplU2NoZW1hS2V5KGRpc3BsYXlQcm9wZXJ0eSkgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiBub3JtYWxpemVkLFxuICAgICAgICAgICAgaWRlbnRpdHk6IHNjaGVtYS5pZGVudGl0eSxcbiAgICAgICAgICAgIGNvZGFUeXBlOiBzY2hlbWEuY29kYVR5cGUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogc2NoZW1hLmRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgYXR0cmlidXRpb246IHNjaGVtYS5hdHRyaWJ1dGlvbixcbiAgICAgICAgICAgIGluY2x1ZGVVbmtub3duUHJvcGVydGllczogc2NoZW1hLmluY2x1ZGVVbmtub3duUHJvcGVydGllcyxcbiAgICAgICAgICAgIHRpdGxlUHJvcGVydHk6IHRpdGxlUHJvcGVydHkgPyBub3JtYWxpemVTY2hlbWFLZXkodGl0bGVQcm9wZXJ0eSkgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBzdWJ0aXRsZVByb3BlcnRpZXM6IHN1YnRpdGxlUHJvcGVydGllcyA/IHN1YnRpdGxlUHJvcGVydGllcy5tYXAobm9ybWFsaXplU2NoZW1hS2V5KSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGltYWdlUHJvcGVydHk6IGltYWdlUHJvcGVydHkgPyBub3JtYWxpemVTY2hlbWFLZXkoaW1hZ2VQcm9wZXJ0eSkgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBkZXNjcmlwdGlvblByb3BlcnR5OiBkZXNjcmlwdGlvblByb3BlcnR5ID8gbm9ybWFsaXplU2NoZW1hS2V5KGRlc2NyaXB0aW9uUHJvcGVydHkpIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgbGlua1Byb3BlcnR5OiBsaW5rUHJvcGVydHkgPyBub3JtYWxpemVTY2hlbWFLZXkobGlua1Byb3BlcnR5KSA6IHVuZGVmaW5lZCxcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZWRTY2hlbWE7XG4gICAgfVxuICAgIHJldHVybiBzY2hlbWE7XG59XG5leHBvcnRzLm5vcm1hbGl6ZVNjaGVtYSA9IG5vcm1hbGl6ZVNjaGVtYTtcbi8qKlxuICogQ29udmVuaWVuY2UgZm9yIGNyZWF0aW5nIGEgcmVmZXJlbmNlIG9iamVjdCBzY2hlbWEgZnJvbSBhbiBleGlzdGluZyBzY2hlbWEgZm9yIHRoZVxuICogb2JqZWN0LiBDb3BpZXMgb3ZlciB0aGUgaWRlbnRpdHksIGlkUHJvcGVydHksIGFuZCBkaXNwbGF5UHJvcGVydHkgZnJvbSB0aGUgc2NoZW1hLFxuICogYW5kIHRoZSBzdWJzZXQgb2YgcHJvcGVydGllcyBpbmRpY2F0ZWQgYnkgdGhlIGlkUHJvcGVydHkgYW5kIGRpc3BsYXlQcm9wZXJ0eS5cbiAqIEEgcmVmZXJlbmNlIHNjaGVtYSBjYW4gYWx3YXlzIGJlIGRlZmluZWQgZGlyZWN0bHksIGJ1dCBpZiB5b3UgYWxyZWFkeSBoYXZlIGFuIG9iamVjdFxuICogc2NoZW1hIGl0IHByb3ZpZGVzIGJldHRlciBjb2RlIHJldXNlIHRvIGRlcml2ZSBhIHJlZmVyZW5jZSBzY2hlbWEgaW5zdGVhZC5cbiAqL1xuZnVuY3Rpb24gbWFrZVJlZmVyZW5jZVNjaGVtYUZyb21PYmplY3RTY2hlbWEoc2NoZW1hLCBpZGVudGl0eU5hbWUpIHtcbiAgICBjb25zdCB7IHR5cGUsIGlkLCBwcmltYXJ5LCBpZGVudGl0eSwgcHJvcGVydGllcyB9ID0gKDAsIG1pZ3JhdGlvbl8xLm9iamVjdFNjaGVtYUhlbHBlcikoc2NoZW1hKTtcbiAgICAoMCwgZW5zdXJlXzIuZW5zdXJlRXhpc3RzKShpZGVudGl0eSB8fCBpZGVudGl0eU5hbWUsICdTb3VyY2Ugc2NoZW1hIG11c3QgaGF2ZSBhbiBpZGVudGl0eSBmaWVsZCwgb3IgeW91IG11c3QgcHJvdmlkZSBhbiBpZGVudGl0eSBuYW1lIGZvciB0aGUgcmVmZXJlbmNlLicpO1xuICAgIGNvbnN0IHZhbGlkSWQgPSAoMCwgZW5zdXJlXzIuZW5zdXJlRXhpc3RzKShpZCk7XG4gICAgY29uc3QgcmVmZXJlbmNlUHJvcGVydGllcyA9IHsgW3ZhbGlkSWRdOiBwcm9wZXJ0aWVzW3ZhbGlkSWRdIH07XG4gICAgaWYgKHByaW1hcnkgJiYgcHJpbWFyeSAhPT0gaWQpIHtcbiAgICAgICAgcmVmZXJlbmNlUHJvcGVydGllc1twcmltYXJ5XSA9IHByb3BlcnRpZXNbcHJpbWFyeV07XG4gICAgfVxuICAgIHJldHVybiBtYWtlT2JqZWN0U2NoZW1hKHtcbiAgICAgICAgY29kYVR5cGU6IFZhbHVlSGludFR5cGUuUmVmZXJlbmNlLFxuICAgICAgICB0eXBlLFxuICAgICAgICBpZFByb3BlcnR5OiBpZCxcbiAgICAgICAgaWRlbnRpdHk6IGlkZW50aXR5IHx8IHsgbmFtZTogKDAsIGVuc3VyZV8yLmVuc3VyZUV4aXN0cykoaWRlbnRpdHlOYW1lKSB9LFxuICAgICAgICBkaXNwbGF5UHJvcGVydHk6IHByaW1hcnksXG4gICAgICAgIHByb3BlcnRpZXM6IHJlZmVyZW5jZVByb3BlcnRpZXMsXG4gICAgfSk7XG59XG5leHBvcnRzLm1ha2VSZWZlcmVuY2VTY2hlbWFGcm9tT2JqZWN0U2NoZW1hID0gbWFrZVJlZmVyZW5jZVNjaGVtYUZyb21PYmplY3RTY2hlbWE7XG4vKipcbiAqIENvbnZlbmllbmNlIGZvciBkZWZpbmluZyB0aGUgcmVzdWx0IHNjaGVtYSBmb3IgYW4gYWN0aW9uLiBUaGUgaWRlbnRpdHkgZW5hYmxlcyBDb2RhIHRvXG4gKiB1cGRhdGUgdGhlIGNvcnJlc3BvbmRpbmcgc3luYyB0YWJsZSByb3csIGlmIGl0IGV4aXN0cy5cbiAqIFlvdSBjb3VsZCBhZGQgdGhlIGlkZW50aXR5IGRpcmVjdGx5LCBidXQgdGhhdCB3b3VsZCBtYWtlIHRoZSBzY2hlbWEgbGVzcyByZS11c2FibGUuXG4gKi9cbmZ1bmN0aW9uIHdpdGhJZGVudGl0eShzY2hlbWEsIGlkZW50aXR5TmFtZSkge1xuICAgIHJldHVybiBtYWtlT2JqZWN0U2NoZW1hKHtcbiAgICAgICAgLi4uKDAsIG9iamVjdF91dGlsc18xLmRlZXBDb3B5KShzY2hlbWEpLFxuICAgICAgICBpZGVudGl0eTogeyBuYW1lOiAoMCwgZW5zdXJlXzMuZW5zdXJlTm9uRW1wdHlTdHJpbmcpKGlkZW50aXR5TmFtZSkgfSxcbiAgICB9KTtcbn1cbmV4cG9ydHMud2l0aElkZW50aXR5ID0gd2l0aElkZW50aXR5O1xuIiwgInZhciBjbG9uZSA9IChmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gX2luc3RhbmNlb2Yob2JqLCB0eXBlKSB7XG4gIHJldHVybiB0eXBlICE9IG51bGwgJiYgb2JqIGluc3RhbmNlb2YgdHlwZTtcbn1cblxudmFyIG5hdGl2ZU1hcDtcbnRyeSB7XG4gIG5hdGl2ZU1hcCA9IE1hcDtcbn0gY2F0Y2goXykge1xuICAvLyBtYXliZSBhIHJlZmVyZW5jZSBlcnJvciBiZWNhdXNlIG5vIGBNYXBgLiBHaXZlIGl0IGEgZHVtbXkgdmFsdWUgdGhhdCBub1xuICAvLyB2YWx1ZSB3aWxsIGV2ZXIgYmUgYW4gaW5zdGFuY2VvZi5cbiAgbmF0aXZlTWFwID0gZnVuY3Rpb24oKSB7fTtcbn1cblxudmFyIG5hdGl2ZVNldDtcbnRyeSB7XG4gIG5hdGl2ZVNldCA9IFNldDtcbn0gY2F0Y2goXykge1xuICBuYXRpdmVTZXQgPSBmdW5jdGlvbigpIHt9O1xufVxuXG52YXIgbmF0aXZlUHJvbWlzZTtcbnRyeSB7XG4gIG5hdGl2ZVByb21pc2UgPSBQcm9taXNlO1xufSBjYXRjaChfKSB7XG4gIG5hdGl2ZVByb21pc2UgPSBmdW5jdGlvbigpIHt9O1xufVxuXG4vKipcbiAqIENsb25lcyAoY29waWVzKSBhbiBPYmplY3QgdXNpbmcgZGVlcCBjb3B5aW5nLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gc3VwcG9ydHMgY2lyY3VsYXIgcmVmZXJlbmNlcyBieSBkZWZhdWx0LCBidXQgaWYgeW91IGFyZSBjZXJ0YWluXG4gKiB0aGVyZSBhcmUgbm8gY2lyY3VsYXIgcmVmZXJlbmNlcyBpbiB5b3VyIG9iamVjdCwgeW91IGNhbiBzYXZlIHNvbWUgQ1BVIHRpbWVcbiAqIGJ5IGNhbGxpbmcgY2xvbmUob2JqLCBmYWxzZSkuXG4gKlxuICogQ2F1dGlvbjogaWYgYGNpcmN1bGFyYCBpcyBmYWxzZSBhbmQgYHBhcmVudGAgY29udGFpbnMgY2lyY3VsYXIgcmVmZXJlbmNlcyxcbiAqIHlvdXIgcHJvZ3JhbSBtYXkgZW50ZXIgYW4gaW5maW5pdGUgbG9vcCBhbmQgY3Jhc2guXG4gKlxuICogQHBhcmFtIGBwYXJlbnRgIC0gdGhlIG9iamVjdCB0byBiZSBjbG9uZWRcbiAqIEBwYXJhbSBgY2lyY3VsYXJgIC0gc2V0IHRvIHRydWUgaWYgdGhlIG9iamVjdCB0byBiZSBjbG9uZWQgbWF5IGNvbnRhaW5cbiAqICAgIGNpcmN1bGFyIHJlZmVyZW5jZXMuIChvcHRpb25hbCAtIHRydWUgYnkgZGVmYXVsdClcbiAqIEBwYXJhbSBgZGVwdGhgIC0gc2V0IHRvIGEgbnVtYmVyIGlmIHRoZSBvYmplY3QgaXMgb25seSB0byBiZSBjbG9uZWQgdG9cbiAqICAgIGEgcGFydGljdWxhciBkZXB0aC4gKG9wdGlvbmFsIC0gZGVmYXVsdHMgdG8gSW5maW5pdHkpXG4gKiBAcGFyYW0gYHByb3RvdHlwZWAgLSBzZXRzIHRoZSBwcm90b3R5cGUgdG8gYmUgdXNlZCB3aGVuIGNsb25pbmcgYW4gb2JqZWN0LlxuICogICAgKG9wdGlvbmFsIC0gZGVmYXVsdHMgdG8gcGFyZW50IHByb3RvdHlwZSkuXG4gKiBAcGFyYW0gYGluY2x1ZGVOb25FbnVtZXJhYmxlYCAtIHNldCB0byB0cnVlIGlmIHRoZSBub24tZW51bWVyYWJsZSBwcm9wZXJ0aWVzXG4gKiAgICBzaG91bGQgYmUgY2xvbmVkIGFzIHdlbGwuIE5vbi1lbnVtZXJhYmxlIHByb3BlcnRpZXMgb24gdGhlIHByb3RvdHlwZVxuICogICAgY2hhaW4gd2lsbCBiZSBpZ25vcmVkLiAob3B0aW9uYWwgLSBmYWxzZSBieSBkZWZhdWx0KVxuKi9cbmZ1bmN0aW9uIGNsb25lKHBhcmVudCwgY2lyY3VsYXIsIGRlcHRoLCBwcm90b3R5cGUsIGluY2x1ZGVOb25FbnVtZXJhYmxlKSB7XG4gIGlmICh0eXBlb2YgY2lyY3VsYXIgPT09ICdvYmplY3QnKSB7XG4gICAgZGVwdGggPSBjaXJjdWxhci5kZXB0aDtcbiAgICBwcm90b3R5cGUgPSBjaXJjdWxhci5wcm90b3R5cGU7XG4gICAgaW5jbHVkZU5vbkVudW1lcmFibGUgPSBjaXJjdWxhci5pbmNsdWRlTm9uRW51bWVyYWJsZTtcbiAgICBjaXJjdWxhciA9IGNpcmN1bGFyLmNpcmN1bGFyO1xuICB9XG4gIC8vIG1haW50YWluIHR3byBhcnJheXMgZm9yIGNpcmN1bGFyIHJlZmVyZW5jZXMsIHdoZXJlIGNvcnJlc3BvbmRpbmcgcGFyZW50c1xuICAvLyBhbmQgY2hpbGRyZW4gaGF2ZSB0aGUgc2FtZSBpbmRleFxuICB2YXIgYWxsUGFyZW50cyA9IFtdO1xuICB2YXIgYWxsQ2hpbGRyZW4gPSBbXTtcblxuICB2YXIgdXNlQnVmZmVyID0gdHlwZW9mIEJ1ZmZlciAhPSAndW5kZWZpbmVkJztcblxuICBpZiAodHlwZW9mIGNpcmN1bGFyID09ICd1bmRlZmluZWQnKVxuICAgIGNpcmN1bGFyID0gdHJ1ZTtcblxuICBpZiAodHlwZW9mIGRlcHRoID09ICd1bmRlZmluZWQnKVxuICAgIGRlcHRoID0gSW5maW5pdHk7XG5cbiAgLy8gcmVjdXJzZSB0aGlzIGZ1bmN0aW9uIHNvIHdlIGRvbid0IHJlc2V0IGFsbFBhcmVudHMgYW5kIGFsbENoaWxkcmVuXG4gIGZ1bmN0aW9uIF9jbG9uZShwYXJlbnQsIGRlcHRoKSB7XG4gICAgLy8gY2xvbmluZyBudWxsIGFsd2F5cyByZXR1cm5zIG51bGxcbiAgICBpZiAocGFyZW50ID09PSBudWxsKVxuICAgICAgcmV0dXJuIG51bGw7XG5cbiAgICBpZiAoZGVwdGggPT09IDApXG4gICAgICByZXR1cm4gcGFyZW50O1xuXG4gICAgdmFyIGNoaWxkO1xuICAgIHZhciBwcm90bztcbiAgICBpZiAodHlwZW9mIHBhcmVudCAhPSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIHBhcmVudDtcbiAgICB9XG5cbiAgICBpZiAoX2luc3RhbmNlb2YocGFyZW50LCBuYXRpdmVNYXApKSB7XG4gICAgICBjaGlsZCA9IG5ldyBuYXRpdmVNYXAoKTtcbiAgICB9IGVsc2UgaWYgKF9pbnN0YW5jZW9mKHBhcmVudCwgbmF0aXZlU2V0KSkge1xuICAgICAgY2hpbGQgPSBuZXcgbmF0aXZlU2V0KCk7XG4gICAgfSBlbHNlIGlmIChfaW5zdGFuY2VvZihwYXJlbnQsIG5hdGl2ZVByb21pc2UpKSB7XG4gICAgICBjaGlsZCA9IG5ldyBuYXRpdmVQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgcGFyZW50LnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICByZXNvbHZlKF9jbG9uZSh2YWx1ZSwgZGVwdGggLSAxKSk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgIHJlamVjdChfY2xvbmUoZXJyLCBkZXB0aCAtIDEpKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGNsb25lLl9faXNBcnJheShwYXJlbnQpKSB7XG4gICAgICBjaGlsZCA9IFtdO1xuICAgIH0gZWxzZSBpZiAoY2xvbmUuX19pc1JlZ0V4cChwYXJlbnQpKSB7XG4gICAgICBjaGlsZCA9IG5ldyBSZWdFeHAocGFyZW50LnNvdXJjZSwgX19nZXRSZWdFeHBGbGFncyhwYXJlbnQpKTtcbiAgICAgIGlmIChwYXJlbnQubGFzdEluZGV4KSBjaGlsZC5sYXN0SW5kZXggPSBwYXJlbnQubGFzdEluZGV4O1xuICAgIH0gZWxzZSBpZiAoY2xvbmUuX19pc0RhdGUocGFyZW50KSkge1xuICAgICAgY2hpbGQgPSBuZXcgRGF0ZShwYXJlbnQuZ2V0VGltZSgpKTtcbiAgICB9IGVsc2UgaWYgKHVzZUJ1ZmZlciAmJiBCdWZmZXIuaXNCdWZmZXIocGFyZW50KSkge1xuICAgICAgaWYgKEJ1ZmZlci5hbGxvY1Vuc2FmZSkge1xuICAgICAgICAvLyBOb2RlLmpzID49IDQuNS4wXG4gICAgICAgIGNoaWxkID0gQnVmZmVyLmFsbG9jVW5zYWZlKHBhcmVudC5sZW5ndGgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gT2xkZXIgTm9kZS5qcyB2ZXJzaW9uc1xuICAgICAgICBjaGlsZCA9IG5ldyBCdWZmZXIocGFyZW50Lmxlbmd0aCk7XG4gICAgICB9XG4gICAgICBwYXJlbnQuY29weShjaGlsZCk7XG4gICAgICByZXR1cm4gY2hpbGQ7XG4gICAgfSBlbHNlIGlmIChfaW5zdGFuY2VvZihwYXJlbnQsIEVycm9yKSkge1xuICAgICAgY2hpbGQgPSBPYmplY3QuY3JlYXRlKHBhcmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0eXBlb2YgcHJvdG90eXBlID09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKHBhcmVudCk7XG4gICAgICAgIGNoaWxkID0gT2JqZWN0LmNyZWF0ZShwcm90byk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY2hpbGQgPSBPYmplY3QuY3JlYXRlKHByb3RvdHlwZSk7XG4gICAgICAgIHByb3RvID0gcHJvdG90eXBlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjaXJjdWxhcikge1xuICAgICAgdmFyIGluZGV4ID0gYWxsUGFyZW50cy5pbmRleE9mKHBhcmVudCk7XG5cbiAgICAgIGlmIChpbmRleCAhPSAtMSkge1xuICAgICAgICByZXR1cm4gYWxsQ2hpbGRyZW5baW5kZXhdO1xuICAgICAgfVxuICAgICAgYWxsUGFyZW50cy5wdXNoKHBhcmVudCk7XG4gICAgICBhbGxDaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgICB9XG5cbiAgICBpZiAoX2luc3RhbmNlb2YocGFyZW50LCBuYXRpdmVNYXApKSB7XG4gICAgICBwYXJlbnQuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgICAgIHZhciBrZXlDaGlsZCA9IF9jbG9uZShrZXksIGRlcHRoIC0gMSk7XG4gICAgICAgIHZhciB2YWx1ZUNoaWxkID0gX2Nsb25lKHZhbHVlLCBkZXB0aCAtIDEpO1xuICAgICAgICBjaGlsZC5zZXQoa2V5Q2hpbGQsIHZhbHVlQ2hpbGQpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChfaW5zdGFuY2VvZihwYXJlbnQsIG5hdGl2ZVNldCkpIHtcbiAgICAgIHBhcmVudC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHZhciBlbnRyeUNoaWxkID0gX2Nsb25lKHZhbHVlLCBkZXB0aCAtIDEpO1xuICAgICAgICBjaGlsZC5hZGQoZW50cnlDaGlsZCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpIGluIHBhcmVudCkge1xuICAgICAgdmFyIGF0dHJzO1xuICAgICAgaWYgKHByb3RvKSB7XG4gICAgICAgIGF0dHJzID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwcm90bywgaSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChhdHRycyAmJiBhdHRycy5zZXQgPT0gbnVsbCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGNoaWxkW2ldID0gX2Nsb25lKHBhcmVudFtpXSwgZGVwdGggLSAxKTtcbiAgICB9XG5cbiAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scykge1xuICAgICAgdmFyIHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHBhcmVudCk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN5bWJvbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gRG9uJ3QgbmVlZCB0byB3b3JyeSBhYm91dCBjbG9uaW5nIGEgc3ltYm9sIGJlY2F1c2UgaXQgaXMgYSBwcmltaXRpdmUsXG4gICAgICAgIC8vIGxpa2UgYSBudW1iZXIgb3Igc3RyaW5nLlxuICAgICAgICB2YXIgc3ltYm9sID0gc3ltYm9sc1tpXTtcbiAgICAgICAgdmFyIGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHBhcmVudCwgc3ltYm9sKTtcbiAgICAgICAgaWYgKGRlc2NyaXB0b3IgJiYgIWRlc2NyaXB0b3IuZW51bWVyYWJsZSAmJiAhaW5jbHVkZU5vbkVudW1lcmFibGUpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjaGlsZFtzeW1ib2xdID0gX2Nsb25lKHBhcmVudFtzeW1ib2xdLCBkZXB0aCAtIDEpO1xuICAgICAgICBpZiAoIWRlc2NyaXB0b3IuZW51bWVyYWJsZSkge1xuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjaGlsZCwgc3ltYm9sLCB7XG4gICAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGluY2x1ZGVOb25FbnVtZXJhYmxlKSB7XG4gICAgICB2YXIgYWxsUHJvcGVydHlOYW1lcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHBhcmVudCk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFsbFByb3BlcnR5TmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHByb3BlcnR5TmFtZSA9IGFsbFByb3BlcnR5TmFtZXNbaV07XG4gICAgICAgIHZhciBkZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihwYXJlbnQsIHByb3BlcnR5TmFtZSk7XG4gICAgICAgIGlmIChkZXNjcmlwdG9yICYmIGRlc2NyaXB0b3IuZW51bWVyYWJsZSkge1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNoaWxkW3Byb3BlcnR5TmFtZV0gPSBfY2xvbmUocGFyZW50W3Byb3BlcnR5TmFtZV0sIGRlcHRoIC0gMSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjaGlsZCwgcHJvcGVydHlOYW1lLCB7XG4gICAgICAgICAgZW51bWVyYWJsZTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNoaWxkO1xuICB9XG5cbiAgcmV0dXJuIF9jbG9uZShwYXJlbnQsIGRlcHRoKTtcbn1cblxuLyoqXG4gKiBTaW1wbGUgZmxhdCBjbG9uZSB1c2luZyBwcm90b3R5cGUsIGFjY2VwdHMgb25seSBvYmplY3RzLCB1c2VmdWxsIGZvciBwcm9wZXJ0eVxuICogb3ZlcnJpZGUgb24gRkxBVCBjb25maWd1cmF0aW9uIG9iamVjdCAobm8gbmVzdGVkIHByb3BzKS5cbiAqXG4gKiBVU0UgV0lUSCBDQVVUSU9OISBUaGlzIG1heSBub3QgYmVoYXZlIGFzIHlvdSB3aXNoIGlmIHlvdSBkbyBub3Qga25vdyBob3cgdGhpc1xuICogd29ya3MuXG4gKi9cbmNsb25lLmNsb25lUHJvdG90eXBlID0gZnVuY3Rpb24gY2xvbmVQcm90b3R5cGUocGFyZW50KSB7XG4gIGlmIChwYXJlbnQgPT09IG51bGwpXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgdmFyIGMgPSBmdW5jdGlvbiAoKSB7fTtcbiAgYy5wcm90b3R5cGUgPSBwYXJlbnQ7XG4gIHJldHVybiBuZXcgYygpO1xufTtcblxuLy8gcHJpdmF0ZSB1dGlsaXR5IGZ1bmN0aW9uc1xuXG5mdW5jdGlvbiBfX29ialRvU3RyKG8pIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKTtcbn1cbmNsb25lLl9fb2JqVG9TdHIgPSBfX29ialRvU3RyO1xuXG5mdW5jdGlvbiBfX2lzRGF0ZShvKSB7XG4gIHJldHVybiB0eXBlb2YgbyA9PT0gJ29iamVjdCcgJiYgX19vYmpUb1N0cihvKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuY2xvbmUuX19pc0RhdGUgPSBfX2lzRGF0ZTtcblxuZnVuY3Rpb24gX19pc0FycmF5KG8pIHtcbiAgcmV0dXJuIHR5cGVvZiBvID09PSAnb2JqZWN0JyAmJiBfX29ialRvU3RyKG8pID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuY2xvbmUuX19pc0FycmF5ID0gX19pc0FycmF5O1xuXG5mdW5jdGlvbiBfX2lzUmVnRXhwKG8pIHtcbiAgcmV0dXJuIHR5cGVvZiBvID09PSAnb2JqZWN0JyAmJiBfX29ialRvU3RyKG8pID09PSAnW29iamVjdCBSZWdFeHBdJztcbn1cbmNsb25lLl9faXNSZWdFeHAgPSBfX2lzUmVnRXhwO1xuXG5mdW5jdGlvbiBfX2dldFJlZ0V4cEZsYWdzKHJlKSB7XG4gIHZhciBmbGFncyA9ICcnO1xuICBpZiAocmUuZ2xvYmFsKSBmbGFncyArPSAnZyc7XG4gIGlmIChyZS5pZ25vcmVDYXNlKSBmbGFncyArPSAnaSc7XG4gIGlmIChyZS5tdWx0aWxpbmUpIGZsYWdzICs9ICdtJztcbiAgcmV0dXJuIGZsYWdzO1xufVxuY2xvbmUuX19nZXRSZWdFeHBGbGFncyA9IF9fZ2V0UmVnRXhwRmxhZ3M7XG5cbnJldHVybiBjbG9uZTtcbn0pKCk7XG5cbmlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiBtb2R1bGUuZXhwb3J0cykge1xuICBtb2R1bGUuZXhwb3J0cyA9IGNsb25lO1xufVxuIiwgIid1c2Ugc3RyaWN0JztcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4nKX0gKi9cbm1vZHVsZS5leHBvcnRzID0gRXJyb3I7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLi9ldmFsJyl9ICovXG5tb2R1bGUuZXhwb3J0cyA9IEV2YWxFcnJvcjtcbiIsICIndXNlIHN0cmljdCc7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuL3JhbmdlJyl9ICovXG5tb2R1bGUuZXhwb3J0cyA9IFJhbmdlRXJyb3I7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLi9yZWYnKX0gKi9cbm1vZHVsZS5leHBvcnRzID0gUmVmZXJlbmNlRXJyb3I7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLi9zeW50YXgnKX0gKi9cbm1vZHVsZS5leHBvcnRzID0gU3ludGF4RXJyb3I7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLi90eXBlJyl9ICovXG5tb2R1bGUuZXhwb3J0cyA9IFR5cGVFcnJvcjtcbiIsICIndXNlIHN0cmljdCc7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuL3VyaScpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSBVUklFcnJvcjtcbiIsICIndXNlIHN0cmljdCc7XG5cbi8qIGVzbGludCBjb21wbGV4aXR5OiBbMiwgMThdLCBtYXgtc3RhdGVtZW50czogWzIsIDMzXSAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYXNTeW1ib2xzKCkge1xuXHRpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ2Z1bmN0aW9uJyB8fCB0eXBlb2YgT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyAhPT0gJ2Z1bmN0aW9uJykgeyByZXR1cm4gZmFsc2U7IH1cblx0aWYgKHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09ICdzeW1ib2wnKSB7IHJldHVybiB0cnVlOyB9XG5cblx0dmFyIG9iaiA9IHt9O1xuXHR2YXIgc3ltID0gU3ltYm9sKCd0ZXN0Jyk7XG5cdHZhciBzeW1PYmogPSBPYmplY3Qoc3ltKTtcblx0aWYgKHR5cGVvZiBzeW0gPT09ICdzdHJpbmcnKSB7IHJldHVybiBmYWxzZTsgfVxuXG5cdGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3ltKSAhPT0gJ1tvYmplY3QgU3ltYm9sXScpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3ltT2JqKSAhPT0gJ1tvYmplY3QgU3ltYm9sXScpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0Ly8gdGVtcCBkaXNhYmxlZCBwZXIgaHR0cHM6Ly9naXRodWIuY29tL2xqaGFyYi9vYmplY3QuYXNzaWduL2lzc3Vlcy8xN1xuXHQvLyBpZiAoc3ltIGluc3RhbmNlb2YgU3ltYm9sKSB7IHJldHVybiBmYWxzZTsgfVxuXHQvLyB0ZW1wIGRpc2FibGVkIHBlciBodHRwczovL2dpdGh1Yi5jb20vV2ViUmVmbGVjdGlvbi9nZXQtb3duLXByb3BlcnR5LXN5bWJvbHMvaXNzdWVzLzRcblx0Ly8gaWYgKCEoc3ltT2JqIGluc3RhbmNlb2YgU3ltYm9sKSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHQvLyBpZiAodHlwZW9mIFN5bWJvbC5wcm90b3R5cGUudG9TdHJpbmcgIT09ICdmdW5jdGlvbicpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdC8vIGlmIChTdHJpbmcoc3ltKSAhPT0gU3ltYm9sLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN5bSkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0dmFyIHN5bVZhbCA9IDQyO1xuXHRvYmpbc3ltXSA9IHN5bVZhbDtcblx0Zm9yIChzeW0gaW4gb2JqKSB7IHJldHVybiBmYWxzZTsgfSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4LCBuby11bnJlYWNoYWJsZS1sb29wXG5cdGlmICh0eXBlb2YgT2JqZWN0LmtleXMgPT09ICdmdW5jdGlvbicgJiYgT2JqZWN0LmtleXMob2JqKS5sZW5ndGggIT09IDApIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0aWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyA9PT0gJ2Z1bmN0aW9uJyAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhvYmopLmxlbmd0aCAhPT0gMCkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHR2YXIgc3ltcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMob2JqKTtcblx0aWYgKHN5bXMubGVuZ3RoICE9PSAxIHx8IHN5bXNbMF0gIT09IHN5bSkgeyByZXR1cm4gZmFsc2U7IH1cblxuXHRpZiAoIU9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChvYmosIHN5bSkpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0aWYgKHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIGRlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iaiwgc3ltKTtcblx0XHRpZiAoZGVzY3JpcHRvci52YWx1ZSAhPT0gc3ltVmFsIHx8IGRlc2NyaXB0b3IuZW51bWVyYWJsZSAhPT0gdHJ1ZSkgeyByZXR1cm4gZmFsc2U7IH1cblx0fVxuXG5cdHJldHVybiB0cnVlO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBvcmlnU3ltYm9sID0gdHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sO1xudmFyIGhhc1N5bWJvbFNoYW0gPSByZXF1aXJlKCcuL3NoYW1zJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFzTmF0aXZlU3ltYm9scygpIHtcblx0aWYgKHR5cGVvZiBvcmlnU3ltYm9sICE9PSAnZnVuY3Rpb24nKSB7IHJldHVybiBmYWxzZTsgfVxuXHRpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ2Z1bmN0aW9uJykgeyByZXR1cm4gZmFsc2U7IH1cblx0aWYgKHR5cGVvZiBvcmlnU3ltYm9sKCdmb28nKSAhPT0gJ3N5bWJvbCcpIHsgcmV0dXJuIGZhbHNlOyB9XG5cdGlmICh0eXBlb2YgU3ltYm9sKCdiYXInKSAhPT0gJ3N5bWJvbCcpIHsgcmV0dXJuIGZhbHNlOyB9XG5cblx0cmV0dXJuIGhhc1N5bWJvbFNoYW0oKTtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdGVzdCA9IHtcblx0X19wcm90b19fOiBudWxsLFxuXHRmb286IHt9XG59O1xuXG52YXIgJE9iamVjdCA9IE9iamVjdDtcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4nKX0gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFzUHJvdG8oKSB7XG5cdC8vIEB0cy1leHBlY3QtZXJyb3I6IFRTIGVycm9ycyBvbiBhbiBpbmhlcml0ZWQgcHJvcGVydHkgZm9yIHNvbWUgcmVhc29uXG5cdHJldHVybiB7IF9fcHJvdG9fXzogdGVzdCB9LmZvbyA9PT0gdGVzdC5mb29cblx0XHQmJiAhKHRlc3QgaW5zdGFuY2VvZiAkT2JqZWN0KTtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG4vKiBlc2xpbnQgbm8taW52YWxpZC10aGlzOiAxICovXG5cbnZhciBFUlJPUl9NRVNTQUdFID0gJ0Z1bmN0aW9uLnByb3RvdHlwZS5iaW5kIGNhbGxlZCBvbiBpbmNvbXBhdGlibGUgJztcbnZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgbWF4ID0gTWF0aC5tYXg7XG52YXIgZnVuY1R5cGUgPSAnW29iamVjdCBGdW5jdGlvbl0nO1xuXG52YXIgY29uY2F0dHkgPSBmdW5jdGlvbiBjb25jYXR0eShhLCBiKSB7XG4gICAgdmFyIGFyciA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGFycltpXSA9IGFbaV07XG4gICAgfVxuICAgIGZvciAodmFyIGogPSAwOyBqIDwgYi5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICBhcnJbaiArIGEubGVuZ3RoXSA9IGJbal07XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycjtcbn07XG5cbnZhciBzbGljeSA9IGZ1bmN0aW9uIHNsaWN5KGFyckxpa2UsIG9mZnNldCkge1xuICAgIHZhciBhcnIgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gb2Zmc2V0IHx8IDAsIGogPSAwOyBpIDwgYXJyTGlrZS5sZW5ndGg7IGkgKz0gMSwgaiArPSAxKSB7XG4gICAgICAgIGFycltqXSA9IGFyckxpa2VbaV07XG4gICAgfVxuICAgIHJldHVybiBhcnI7XG59O1xuXG52YXIgam9pbnkgPSBmdW5jdGlvbiAoYXJyLCBqb2luZXIpIHtcbiAgICB2YXIgc3RyID0gJyc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgc3RyICs9IGFycltpXTtcbiAgICAgICAgaWYgKGkgKyAxIDwgYXJyLmxlbmd0aCkge1xuICAgICAgICAgICAgc3RyICs9IGpvaW5lcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3RyO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKHRoYXQpIHtcbiAgICB2YXIgdGFyZ2V0ID0gdGhpcztcbiAgICBpZiAodHlwZW9mIHRhcmdldCAhPT0gJ2Z1bmN0aW9uJyB8fCB0b1N0ci5hcHBseSh0YXJnZXQpICE9PSBmdW5jVHlwZSkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEVSUk9SX01FU1NBR0UgKyB0YXJnZXQpO1xuICAgIH1cbiAgICB2YXIgYXJncyA9IHNsaWN5KGFyZ3VtZW50cywgMSk7XG5cbiAgICB2YXIgYm91bmQ7XG4gICAgdmFyIGJpbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMgaW5zdGFuY2VvZiBib3VuZCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IHRhcmdldC5hcHBseShcbiAgICAgICAgICAgICAgICB0aGlzLFxuICAgICAgICAgICAgICAgIGNvbmNhdHR5KGFyZ3MsIGFyZ3VtZW50cylcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBpZiAoT2JqZWN0KHJlc3VsdCkgPT09IHJlc3VsdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGFyZ2V0LmFwcGx5KFxuICAgICAgICAgICAgdGhhdCxcbiAgICAgICAgICAgIGNvbmNhdHR5KGFyZ3MsIGFyZ3VtZW50cylcbiAgICAgICAgKTtcblxuICAgIH07XG5cbiAgICB2YXIgYm91bmRMZW5ndGggPSBtYXgoMCwgdGFyZ2V0Lmxlbmd0aCAtIGFyZ3MubGVuZ3RoKTtcbiAgICB2YXIgYm91bmRBcmdzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBib3VuZExlbmd0aDsgaSsrKSB7XG4gICAgICAgIGJvdW5kQXJnc1tpXSA9ICckJyArIGk7XG4gICAgfVxuXG4gICAgYm91bmQgPSBGdW5jdGlvbignYmluZGVyJywgJ3JldHVybiBmdW5jdGlvbiAoJyArIGpvaW55KGJvdW5kQXJncywgJywnKSArICcpeyByZXR1cm4gYmluZGVyLmFwcGx5KHRoaXMsYXJndW1lbnRzKTsgfScpKGJpbmRlcik7XG5cbiAgICBpZiAodGFyZ2V0LnByb3RvdHlwZSkge1xuICAgICAgICB2YXIgRW1wdHkgPSBmdW5jdGlvbiBFbXB0eSgpIHt9O1xuICAgICAgICBFbXB0eS5wcm90b3R5cGUgPSB0YXJnZXQucHJvdG90eXBlO1xuICAgICAgICBib3VuZC5wcm90b3R5cGUgPSBuZXcgRW1wdHkoKTtcbiAgICAgICAgRW1wdHkucHJvdG90eXBlID0gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gYm91bmQ7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIGltcGxlbWVudGF0aW9uID0gcmVxdWlyZSgnLi9pbXBsZW1lbnRhdGlvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kIHx8IGltcGxlbWVudGF0aW9uO1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIGNhbGwgPSBGdW5jdGlvbi5wcm90b3R5cGUuY2FsbDtcbnZhciAkaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBiaW5kID0gcmVxdWlyZSgnZnVuY3Rpb24tYmluZCcpO1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLicpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSBiaW5kLmNhbGwoY2FsbCwgJGhhc093bik7XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdW5kZWZpbmVkO1xuXG52YXIgJEVycm9yID0gcmVxdWlyZSgnZXMtZXJyb3JzJyk7XG52YXIgJEV2YWxFcnJvciA9IHJlcXVpcmUoJ2VzLWVycm9ycy9ldmFsJyk7XG52YXIgJFJhbmdlRXJyb3IgPSByZXF1aXJlKCdlcy1lcnJvcnMvcmFuZ2UnKTtcbnZhciAkUmVmZXJlbmNlRXJyb3IgPSByZXF1aXJlKCdlcy1lcnJvcnMvcmVmJyk7XG52YXIgJFN5bnRheEVycm9yID0gcmVxdWlyZSgnZXMtZXJyb3JzL3N5bnRheCcpO1xudmFyICRUeXBlRXJyb3IgPSByZXF1aXJlKCdlcy1lcnJvcnMvdHlwZScpO1xudmFyICRVUklFcnJvciA9IHJlcXVpcmUoJ2VzLWVycm9ycy91cmknKTtcblxudmFyICRGdW5jdGlvbiA9IEZ1bmN0aW9uO1xuXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbnZhciBnZXRFdmFsbGVkQ29uc3RydWN0b3IgPSBmdW5jdGlvbiAoZXhwcmVzc2lvblN5bnRheCkge1xuXHR0cnkge1xuXHRcdHJldHVybiAkRnVuY3Rpb24oJ1widXNlIHN0cmljdFwiOyByZXR1cm4gKCcgKyBleHByZXNzaW9uU3ludGF4ICsgJykuY29uc3RydWN0b3I7JykoKTtcblx0fSBjYXRjaCAoZSkge31cbn07XG5cbnZhciAkZ09QRCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5pZiAoJGdPUEQpIHtcblx0dHJ5IHtcblx0XHQkZ09QRCh7fSwgJycpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0JGdPUEQgPSBudWxsOyAvLyB0aGlzIGlzIElFIDgsIHdoaWNoIGhhcyBhIGJyb2tlbiBnT1BEXG5cdH1cbn1cblxudmFyIHRocm93VHlwZUVycm9yID0gZnVuY3Rpb24gKCkge1xuXHR0aHJvdyBuZXcgJFR5cGVFcnJvcigpO1xufTtcbnZhciBUaHJvd1R5cGVFcnJvciA9ICRnT1BEXG5cdD8gKGZ1bmN0aW9uICgpIHtcblx0XHR0cnkge1xuXHRcdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC1leHByZXNzaW9ucywgbm8tY2FsbGVyLCBuby1yZXN0cmljdGVkLXByb3BlcnRpZXNcblx0XHRcdGFyZ3VtZW50cy5jYWxsZWU7IC8vIElFIDggZG9lcyBub3QgdGhyb3cgaGVyZVxuXHRcdFx0cmV0dXJuIHRocm93VHlwZUVycm9yO1xuXHRcdH0gY2F0Y2ggKGNhbGxlZVRocm93cykge1xuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Ly8gSUUgOCB0aHJvd3Mgb24gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihhcmd1bWVudHMsICcnKVxuXHRcdFx0XHRyZXR1cm4gJGdPUEQoYXJndW1lbnRzLCAnY2FsbGVlJykuZ2V0O1xuXHRcdFx0fSBjYXRjaCAoZ09QRHRocm93cykge1xuXHRcdFx0XHRyZXR1cm4gdGhyb3dUeXBlRXJyb3I7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KCkpXG5cdDogdGhyb3dUeXBlRXJyb3I7XG5cbnZhciBoYXNTeW1ib2xzID0gcmVxdWlyZSgnaGFzLXN5bWJvbHMnKSgpO1xudmFyIGhhc1Byb3RvID0gcmVxdWlyZSgnaGFzLXByb3RvJykoKTtcblxudmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mIHx8IChcblx0aGFzUHJvdG9cblx0XHQ/IGZ1bmN0aW9uICh4KSB7IHJldHVybiB4Ll9fcHJvdG9fXzsgfSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvXG5cdFx0OiBudWxsXG4pO1xuXG52YXIgbmVlZHNFdmFsID0ge307XG5cbnZhciBUeXBlZEFycmF5ID0gdHlwZW9mIFVpbnQ4QXJyYXkgPT09ICd1bmRlZmluZWQnIHx8ICFnZXRQcm90byA/IHVuZGVmaW5lZCA6IGdldFByb3RvKFVpbnQ4QXJyYXkpO1xuXG52YXIgSU5UUklOU0lDUyA9IHtcblx0X19wcm90b19fOiBudWxsLFxuXHQnJUFnZ3JlZ2F0ZUVycm9yJSc6IHR5cGVvZiBBZ2dyZWdhdGVFcnJvciA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBBZ2dyZWdhdGVFcnJvcixcblx0JyVBcnJheSUnOiBBcnJheSxcblx0JyVBcnJheUJ1ZmZlciUnOiB0eXBlb2YgQXJyYXlCdWZmZXIgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogQXJyYXlCdWZmZXIsXG5cdCclQXJyYXlJdGVyYXRvclByb3RvdHlwZSUnOiBoYXNTeW1ib2xzICYmIGdldFByb3RvID8gZ2V0UHJvdG8oW11bU3ltYm9sLml0ZXJhdG9yXSgpKSA6IHVuZGVmaW5lZCxcblx0JyVBc3luY0Zyb21TeW5jSXRlcmF0b3JQcm90b3R5cGUlJzogdW5kZWZpbmVkLFxuXHQnJUFzeW5jRnVuY3Rpb24lJzogbmVlZHNFdmFsLFxuXHQnJUFzeW5jR2VuZXJhdG9yJSc6IG5lZWRzRXZhbCxcblx0JyVBc3luY0dlbmVyYXRvckZ1bmN0aW9uJSc6IG5lZWRzRXZhbCxcblx0JyVBc3luY0l0ZXJhdG9yUHJvdG90eXBlJSc6IG5lZWRzRXZhbCxcblx0JyVBdG9taWNzJSc6IHR5cGVvZiBBdG9taWNzID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEF0b21pY3MsXG5cdCclQmlnSW50JSc6IHR5cGVvZiBCaWdJbnQgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogQmlnSW50LFxuXHQnJUJpZ0ludDY0QXJyYXklJzogdHlwZW9mIEJpZ0ludDY0QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogQmlnSW50NjRBcnJheSxcblx0JyVCaWdVaW50NjRBcnJheSUnOiB0eXBlb2YgQmlnVWludDY0QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogQmlnVWludDY0QXJyYXksXG5cdCclQm9vbGVhbiUnOiBCb29sZWFuLFxuXHQnJURhdGFWaWV3JSc6IHR5cGVvZiBEYXRhVmlldyA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBEYXRhVmlldyxcblx0JyVEYXRlJSc6IERhdGUsXG5cdCclZGVjb2RlVVJJJSc6IGRlY29kZVVSSSxcblx0JyVkZWNvZGVVUklDb21wb25lbnQlJzogZGVjb2RlVVJJQ29tcG9uZW50LFxuXHQnJWVuY29kZVVSSSUnOiBlbmNvZGVVUkksXG5cdCclZW5jb2RlVVJJQ29tcG9uZW50JSc6IGVuY29kZVVSSUNvbXBvbmVudCxcblx0JyVFcnJvciUnOiAkRXJyb3IsXG5cdCclZXZhbCUnOiBldmFsLCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWV2YWxcblx0JyVFdmFsRXJyb3IlJzogJEV2YWxFcnJvcixcblx0JyVGbG9hdDMyQXJyYXklJzogdHlwZW9mIEZsb2F0MzJBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBGbG9hdDMyQXJyYXksXG5cdCclRmxvYXQ2NEFycmF5JSc6IHR5cGVvZiBGbG9hdDY0QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogRmxvYXQ2NEFycmF5LFxuXHQnJUZpbmFsaXphdGlvblJlZ2lzdHJ5JSc6IHR5cGVvZiBGaW5hbGl6YXRpb25SZWdpc3RyeSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBGaW5hbGl6YXRpb25SZWdpc3RyeSxcblx0JyVGdW5jdGlvbiUnOiAkRnVuY3Rpb24sXG5cdCclR2VuZXJhdG9yRnVuY3Rpb24lJzogbmVlZHNFdmFsLFxuXHQnJUludDhBcnJheSUnOiB0eXBlb2YgSW50OEFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEludDhBcnJheSxcblx0JyVJbnQxNkFycmF5JSc6IHR5cGVvZiBJbnQxNkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IEludDE2QXJyYXksXG5cdCclSW50MzJBcnJheSUnOiB0eXBlb2YgSW50MzJBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBJbnQzMkFycmF5LFxuXHQnJWlzRmluaXRlJSc6IGlzRmluaXRlLFxuXHQnJWlzTmFOJSc6IGlzTmFOLFxuXHQnJUl0ZXJhdG9yUHJvdG90eXBlJSc6IGhhc1N5bWJvbHMgJiYgZ2V0UHJvdG8gPyBnZXRQcm90byhnZXRQcm90byhbXVtTeW1ib2wuaXRlcmF0b3JdKCkpKSA6IHVuZGVmaW5lZCxcblx0JyVKU09OJSc6IHR5cGVvZiBKU09OID09PSAnb2JqZWN0JyA/IEpTT04gOiB1bmRlZmluZWQsXG5cdCclTWFwJSc6IHR5cGVvZiBNYXAgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogTWFwLFxuXHQnJU1hcEl0ZXJhdG9yUHJvdG90eXBlJSc6IHR5cGVvZiBNYXAgPT09ICd1bmRlZmluZWQnIHx8ICFoYXNTeW1ib2xzIHx8ICFnZXRQcm90byA/IHVuZGVmaW5lZCA6IGdldFByb3RvKG5ldyBNYXAoKVtTeW1ib2wuaXRlcmF0b3JdKCkpLFxuXHQnJU1hdGglJzogTWF0aCxcblx0JyVOdW1iZXIlJzogTnVtYmVyLFxuXHQnJU9iamVjdCUnOiBPYmplY3QsXG5cdCclcGFyc2VGbG9hdCUnOiBwYXJzZUZsb2F0LFxuXHQnJXBhcnNlSW50JSc6IHBhcnNlSW50LFxuXHQnJVByb21pc2UlJzogdHlwZW9mIFByb21pc2UgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogUHJvbWlzZSxcblx0JyVQcm94eSUnOiB0eXBlb2YgUHJveHkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogUHJveHksXG5cdCclUmFuZ2VFcnJvciUnOiAkUmFuZ2VFcnJvcixcblx0JyVSZWZlcmVuY2VFcnJvciUnOiAkUmVmZXJlbmNlRXJyb3IsXG5cdCclUmVmbGVjdCUnOiB0eXBlb2YgUmVmbGVjdCA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBSZWZsZWN0LFxuXHQnJVJlZ0V4cCUnOiBSZWdFeHAsXG5cdCclU2V0JSc6IHR5cGVvZiBTZXQgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogU2V0LFxuXHQnJVNldEl0ZXJhdG9yUHJvdG90eXBlJSc6IHR5cGVvZiBTZXQgPT09ICd1bmRlZmluZWQnIHx8ICFoYXNTeW1ib2xzIHx8ICFnZXRQcm90byA/IHVuZGVmaW5lZCA6IGdldFByb3RvKG5ldyBTZXQoKVtTeW1ib2wuaXRlcmF0b3JdKCkpLFxuXHQnJVNoYXJlZEFycmF5QnVmZmVyJSc6IHR5cGVvZiBTaGFyZWRBcnJheUJ1ZmZlciA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBTaGFyZWRBcnJheUJ1ZmZlcixcblx0JyVTdHJpbmclJzogU3RyaW5nLFxuXHQnJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJSc6IGhhc1N5bWJvbHMgJiYgZ2V0UHJvdG8gPyBnZXRQcm90bygnJ1tTeW1ib2wuaXRlcmF0b3JdKCkpIDogdW5kZWZpbmVkLFxuXHQnJVN5bWJvbCUnOiBoYXNTeW1ib2xzID8gU3ltYm9sIDogdW5kZWZpbmVkLFxuXHQnJVN5bnRheEVycm9yJSc6ICRTeW50YXhFcnJvcixcblx0JyVUaHJvd1R5cGVFcnJvciUnOiBUaHJvd1R5cGVFcnJvcixcblx0JyVUeXBlZEFycmF5JSc6IFR5cGVkQXJyYXksXG5cdCclVHlwZUVycm9yJSc6ICRUeXBlRXJyb3IsXG5cdCclVWludDhBcnJheSUnOiB0eXBlb2YgVWludDhBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBVaW50OEFycmF5LFxuXHQnJVVpbnQ4Q2xhbXBlZEFycmF5JSc6IHR5cGVvZiBVaW50OENsYW1wZWRBcnJheSA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBVaW50OENsYW1wZWRBcnJheSxcblx0JyVVaW50MTZBcnJheSUnOiB0eXBlb2YgVWludDE2QXJyYXkgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogVWludDE2QXJyYXksXG5cdCclVWludDMyQXJyYXklJzogdHlwZW9mIFVpbnQzMkFycmF5ID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFVpbnQzMkFycmF5LFxuXHQnJVVSSUVycm9yJSc6ICRVUklFcnJvcixcblx0JyVXZWFrTWFwJSc6IHR5cGVvZiBXZWFrTWFwID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZCA6IFdlYWtNYXAsXG5cdCclV2Vha1JlZiUnOiB0eXBlb2YgV2Vha1JlZiA9PT0gJ3VuZGVmaW5lZCcgPyB1bmRlZmluZWQgOiBXZWFrUmVmLFxuXHQnJVdlYWtTZXQlJzogdHlwZW9mIFdlYWtTZXQgPT09ICd1bmRlZmluZWQnID8gdW5kZWZpbmVkIDogV2Vha1NldFxufTtcblxuaWYgKGdldFByb3RvKSB7XG5cdHRyeSB7XG5cdFx0bnVsbC5lcnJvcjsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtZXhwcmVzc2lvbnNcblx0fSBjYXRjaCAoZSkge1xuXHRcdC8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLXNoYWRvd3JlYWxtL3B1bGwvMzg0I2lzc3VlY29tbWVudC0xMzY0MjY0MjI5XG5cdFx0dmFyIGVycm9yUHJvdG8gPSBnZXRQcm90byhnZXRQcm90byhlKSk7XG5cdFx0SU5UUklOU0lDU1snJUVycm9yLnByb3RvdHlwZSUnXSA9IGVycm9yUHJvdG87XG5cdH1cbn1cblxudmFyIGRvRXZhbCA9IGZ1bmN0aW9uIGRvRXZhbChuYW1lKSB7XG5cdHZhciB2YWx1ZTtcblx0aWYgKG5hbWUgPT09ICclQXN5bmNGdW5jdGlvbiUnKSB7XG5cdFx0dmFsdWUgPSBnZXRFdmFsbGVkQ29uc3RydWN0b3IoJ2FzeW5jIGZ1bmN0aW9uICgpIHt9Jyk7XG5cdH0gZWxzZSBpZiAobmFtZSA9PT0gJyVHZW5lcmF0b3JGdW5jdGlvbiUnKSB7XG5cdFx0dmFsdWUgPSBnZXRFdmFsbGVkQ29uc3RydWN0b3IoJ2Z1bmN0aW9uKiAoKSB7fScpO1xuXHR9IGVsc2UgaWYgKG5hbWUgPT09ICclQXN5bmNHZW5lcmF0b3JGdW5jdGlvbiUnKSB7XG5cdFx0dmFsdWUgPSBnZXRFdmFsbGVkQ29uc3RydWN0b3IoJ2FzeW5jIGZ1bmN0aW9uKiAoKSB7fScpO1xuXHR9IGVsc2UgaWYgKG5hbWUgPT09ICclQXN5bmNHZW5lcmF0b3IlJykge1xuXHRcdHZhciBmbiA9IGRvRXZhbCgnJUFzeW5jR2VuZXJhdG9yRnVuY3Rpb24lJyk7XG5cdFx0aWYgKGZuKSB7XG5cdFx0XHR2YWx1ZSA9IGZuLnByb3RvdHlwZTtcblx0XHR9XG5cdH0gZWxzZSBpZiAobmFtZSA9PT0gJyVBc3luY0l0ZXJhdG9yUHJvdG90eXBlJScpIHtcblx0XHR2YXIgZ2VuID0gZG9FdmFsKCclQXN5bmNHZW5lcmF0b3IlJyk7XG5cdFx0aWYgKGdlbiAmJiBnZXRQcm90bykge1xuXHRcdFx0dmFsdWUgPSBnZXRQcm90byhnZW4ucHJvdG90eXBlKTtcblx0XHR9XG5cdH1cblxuXHRJTlRSSU5TSUNTW25hbWVdID0gdmFsdWU7XG5cblx0cmV0dXJuIHZhbHVlO1xufTtcblxudmFyIExFR0FDWV9BTElBU0VTID0ge1xuXHRfX3Byb3RvX186IG51bGwsXG5cdCclQXJyYXlCdWZmZXJQcm90b3R5cGUlJzogWydBcnJheUJ1ZmZlcicsICdwcm90b3R5cGUnXSxcblx0JyVBcnJheVByb3RvdHlwZSUnOiBbJ0FycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUFycmF5UHJvdG9fZW50cmllcyUnOiBbJ0FycmF5JywgJ3Byb3RvdHlwZScsICdlbnRyaWVzJ10sXG5cdCclQXJyYXlQcm90b19mb3JFYWNoJSc6IFsnQXJyYXknLCAncHJvdG90eXBlJywgJ2ZvckVhY2gnXSxcblx0JyVBcnJheVByb3RvX2tleXMlJzogWydBcnJheScsICdwcm90b3R5cGUnLCAna2V5cyddLFxuXHQnJUFycmF5UHJvdG9fdmFsdWVzJSc6IFsnQXJyYXknLCAncHJvdG90eXBlJywgJ3ZhbHVlcyddLFxuXHQnJUFzeW5jRnVuY3Rpb25Qcm90b3R5cGUlJzogWydBc3luY0Z1bmN0aW9uJywgJ3Byb3RvdHlwZSddLFxuXHQnJUFzeW5jR2VuZXJhdG9yJSc6IFsnQXN5bmNHZW5lcmF0b3JGdW5jdGlvbicsICdwcm90b3R5cGUnXSxcblx0JyVBc3luY0dlbmVyYXRvclByb3RvdHlwZSUnOiBbJ0FzeW5jR2VuZXJhdG9yRnVuY3Rpb24nLCAncHJvdG90eXBlJywgJ3Byb3RvdHlwZSddLFxuXHQnJUJvb2xlYW5Qcm90b3R5cGUlJzogWydCb29sZWFuJywgJ3Byb3RvdHlwZSddLFxuXHQnJURhdGFWaWV3UHJvdG90eXBlJSc6IFsnRGF0YVZpZXcnLCAncHJvdG90eXBlJ10sXG5cdCclRGF0ZVByb3RvdHlwZSUnOiBbJ0RhdGUnLCAncHJvdG90eXBlJ10sXG5cdCclRXJyb3JQcm90b3R5cGUlJzogWydFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVFdmFsRXJyb3JQcm90b3R5cGUlJzogWydFdmFsRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclRmxvYXQzMkFycmF5UHJvdG90eXBlJSc6IFsnRmxvYXQzMkFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJUZsb2F0NjRBcnJheVByb3RvdHlwZSUnOiBbJ0Zsb2F0NjRBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVGdW5jdGlvblByb3RvdHlwZSUnOiBbJ0Z1bmN0aW9uJywgJ3Byb3RvdHlwZSddLFxuXHQnJUdlbmVyYXRvciUnOiBbJ0dlbmVyYXRvckZ1bmN0aW9uJywgJ3Byb3RvdHlwZSddLFxuXHQnJUdlbmVyYXRvclByb3RvdHlwZSUnOiBbJ0dlbmVyYXRvckZ1bmN0aW9uJywgJ3Byb3RvdHlwZScsICdwcm90b3R5cGUnXSxcblx0JyVJbnQ4QXJyYXlQcm90b3R5cGUlJzogWydJbnQ4QXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclSW50MTZBcnJheVByb3RvdHlwZSUnOiBbJ0ludDE2QXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclSW50MzJBcnJheVByb3RvdHlwZSUnOiBbJ0ludDMyQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclSlNPTlBhcnNlJSc6IFsnSlNPTicsICdwYXJzZSddLFxuXHQnJUpTT05TdHJpbmdpZnklJzogWydKU09OJywgJ3N0cmluZ2lmeSddLFxuXHQnJU1hcFByb3RvdHlwZSUnOiBbJ01hcCcsICdwcm90b3R5cGUnXSxcblx0JyVOdW1iZXJQcm90b3R5cGUlJzogWydOdW1iZXInLCAncHJvdG90eXBlJ10sXG5cdCclT2JqZWN0UHJvdG90eXBlJSc6IFsnT2JqZWN0JywgJ3Byb3RvdHlwZSddLFxuXHQnJU9ialByb3RvX3RvU3RyaW5nJSc6IFsnT2JqZWN0JywgJ3Byb3RvdHlwZScsICd0b1N0cmluZyddLFxuXHQnJU9ialByb3RvX3ZhbHVlT2YlJzogWydPYmplY3QnLCAncHJvdG90eXBlJywgJ3ZhbHVlT2YnXSxcblx0JyVQcm9taXNlUHJvdG90eXBlJSc6IFsnUHJvbWlzZScsICdwcm90b3R5cGUnXSxcblx0JyVQcm9taXNlUHJvdG9fdGhlbiUnOiBbJ1Byb21pc2UnLCAncHJvdG90eXBlJywgJ3RoZW4nXSxcblx0JyVQcm9taXNlX2FsbCUnOiBbJ1Byb21pc2UnLCAnYWxsJ10sXG5cdCclUHJvbWlzZV9yZWplY3QlJzogWydQcm9taXNlJywgJ3JlamVjdCddLFxuXHQnJVByb21pc2VfcmVzb2x2ZSUnOiBbJ1Byb21pc2UnLCAncmVzb2x2ZSddLFxuXHQnJVJhbmdlRXJyb3JQcm90b3R5cGUlJzogWydSYW5nZUVycm9yJywgJ3Byb3RvdHlwZSddLFxuXHQnJVJlZmVyZW5jZUVycm9yUHJvdG90eXBlJSc6IFsnUmVmZXJlbmNlRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclUmVnRXhwUHJvdG90eXBlJSc6IFsnUmVnRXhwJywgJ3Byb3RvdHlwZSddLFxuXHQnJVNldFByb3RvdHlwZSUnOiBbJ1NldCcsICdwcm90b3R5cGUnXSxcblx0JyVTaGFyZWRBcnJheUJ1ZmZlclByb3RvdHlwZSUnOiBbJ1NoYXJlZEFycmF5QnVmZmVyJywgJ3Byb3RvdHlwZSddLFxuXHQnJVN0cmluZ1Byb3RvdHlwZSUnOiBbJ1N0cmluZycsICdwcm90b3R5cGUnXSxcblx0JyVTeW1ib2xQcm90b3R5cGUlJzogWydTeW1ib2wnLCAncHJvdG90eXBlJ10sXG5cdCclU3ludGF4RXJyb3JQcm90b3R5cGUlJzogWydTeW50YXhFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVUeXBlZEFycmF5UHJvdG90eXBlJSc6IFsnVHlwZWRBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVUeXBlRXJyb3JQcm90b3R5cGUlJzogWydUeXBlRXJyb3InLCAncHJvdG90eXBlJ10sXG5cdCclVWludDhBcnJheVByb3RvdHlwZSUnOiBbJ1VpbnQ4QXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclVWludDhDbGFtcGVkQXJyYXlQcm90b3R5cGUlJzogWydVaW50OENsYW1wZWRBcnJheScsICdwcm90b3R5cGUnXSxcblx0JyVVaW50MTZBcnJheVByb3RvdHlwZSUnOiBbJ1VpbnQxNkFycmF5JywgJ3Byb3RvdHlwZSddLFxuXHQnJVVpbnQzMkFycmF5UHJvdG90eXBlJSc6IFsnVWludDMyQXJyYXknLCAncHJvdG90eXBlJ10sXG5cdCclVVJJRXJyb3JQcm90b3R5cGUlJzogWydVUklFcnJvcicsICdwcm90b3R5cGUnXSxcblx0JyVXZWFrTWFwUHJvdG90eXBlJSc6IFsnV2Vha01hcCcsICdwcm90b3R5cGUnXSxcblx0JyVXZWFrU2V0UHJvdG90eXBlJSc6IFsnV2Vha1NldCcsICdwcm90b3R5cGUnXVxufTtcblxudmFyIGJpbmQgPSByZXF1aXJlKCdmdW5jdGlvbi1iaW5kJyk7XG52YXIgaGFzT3duID0gcmVxdWlyZSgnaGFzb3duJyk7XG52YXIgJGNvbmNhdCA9IGJpbmQuY2FsbChGdW5jdGlvbi5jYWxsLCBBcnJheS5wcm90b3R5cGUuY29uY2F0KTtcbnZhciAkc3BsaWNlQXBwbHkgPSBiaW5kLmNhbGwoRnVuY3Rpb24uYXBwbHksIEFycmF5LnByb3RvdHlwZS5zcGxpY2UpO1xudmFyICRyZXBsYWNlID0gYmluZC5jYWxsKEZ1bmN0aW9uLmNhbGwsIFN0cmluZy5wcm90b3R5cGUucmVwbGFjZSk7XG52YXIgJHN0clNsaWNlID0gYmluZC5jYWxsKEZ1bmN0aW9uLmNhbGwsIFN0cmluZy5wcm90b3R5cGUuc2xpY2UpO1xudmFyICRleGVjID0gYmluZC5jYWxsKEZ1bmN0aW9uLmNhbGwsIFJlZ0V4cC5wcm90b3R5cGUuZXhlYyk7XG5cbi8qIGFkYXB0ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vbG9kYXNoL2xvZGFzaC9ibG9iLzQuMTcuMTUvZGlzdC9sb2Rhc2guanMjTDY3MzUtTDY3NDQgKi9cbnZhciByZVByb3BOYW1lID0gL1teJS5bXFxdXSt8XFxbKD86KC0/XFxkKyg/OlxcLlxcZCspPyl8KFtcIiddKSgoPzooPyFcXDIpW15cXFxcXXxcXFxcLikqPylcXDIpXFxdfCg/PSg/OlxcLnxcXFtcXF0pKD86XFwufFxcW1xcXXwlJCkpL2c7XG52YXIgcmVFc2NhcGVDaGFyID0gL1xcXFwoXFxcXCk/L2c7IC8qKiBVc2VkIHRvIG1hdGNoIGJhY2tzbGFzaGVzIGluIHByb3BlcnR5IHBhdGhzLiAqL1xudmFyIHN0cmluZ1RvUGF0aCA9IGZ1bmN0aW9uIHN0cmluZ1RvUGF0aChzdHJpbmcpIHtcblx0dmFyIGZpcnN0ID0gJHN0clNsaWNlKHN0cmluZywgMCwgMSk7XG5cdHZhciBsYXN0ID0gJHN0clNsaWNlKHN0cmluZywgLTEpO1xuXHRpZiAoZmlyc3QgPT09ICclJyAmJiBsYXN0ICE9PSAnJScpIHtcblx0XHR0aHJvdyBuZXcgJFN5bnRheEVycm9yKCdpbnZhbGlkIGludHJpbnNpYyBzeW50YXgsIGV4cGVjdGVkIGNsb3NpbmcgYCVgJyk7XG5cdH0gZWxzZSBpZiAobGFzdCA9PT0gJyUnICYmIGZpcnN0ICE9PSAnJScpIHtcblx0XHR0aHJvdyBuZXcgJFN5bnRheEVycm9yKCdpbnZhbGlkIGludHJpbnNpYyBzeW50YXgsIGV4cGVjdGVkIG9wZW5pbmcgYCVgJyk7XG5cdH1cblx0dmFyIHJlc3VsdCA9IFtdO1xuXHQkcmVwbGFjZShzdHJpbmcsIHJlUHJvcE5hbWUsIGZ1bmN0aW9uIChtYXRjaCwgbnVtYmVyLCBxdW90ZSwgc3ViU3RyaW5nKSB7XG5cdFx0cmVzdWx0W3Jlc3VsdC5sZW5ndGhdID0gcXVvdGUgPyAkcmVwbGFjZShzdWJTdHJpbmcsIHJlRXNjYXBlQ2hhciwgJyQxJykgOiBudW1iZXIgfHwgbWF0Y2g7XG5cdH0pO1xuXHRyZXR1cm4gcmVzdWx0O1xufTtcbi8qIGVuZCBhZGFwdGF0aW9uICovXG5cbnZhciBnZXRCYXNlSW50cmluc2ljID0gZnVuY3Rpb24gZ2V0QmFzZUludHJpbnNpYyhuYW1lLCBhbGxvd01pc3NpbmcpIHtcblx0dmFyIGludHJpbnNpY05hbWUgPSBuYW1lO1xuXHR2YXIgYWxpYXM7XG5cdGlmIChoYXNPd24oTEVHQUNZX0FMSUFTRVMsIGludHJpbnNpY05hbWUpKSB7XG5cdFx0YWxpYXMgPSBMRUdBQ1lfQUxJQVNFU1tpbnRyaW5zaWNOYW1lXTtcblx0XHRpbnRyaW5zaWNOYW1lID0gJyUnICsgYWxpYXNbMF0gKyAnJSc7XG5cdH1cblxuXHRpZiAoaGFzT3duKElOVFJJTlNJQ1MsIGludHJpbnNpY05hbWUpKSB7XG5cdFx0dmFyIHZhbHVlID0gSU5UUklOU0lDU1tpbnRyaW5zaWNOYW1lXTtcblx0XHRpZiAodmFsdWUgPT09IG5lZWRzRXZhbCkge1xuXHRcdFx0dmFsdWUgPSBkb0V2YWwoaW50cmluc2ljTmFtZSk7XG5cdFx0fVxuXHRcdGlmICh0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnICYmICFhbGxvd01pc3NpbmcpIHtcblx0XHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdpbnRyaW5zaWMgJyArIG5hbWUgKyAnIGV4aXN0cywgYnV0IGlzIG5vdCBhdmFpbGFibGUuIFBsZWFzZSBmaWxlIGFuIGlzc3VlIScpO1xuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHRhbGlhczogYWxpYXMsXG5cdFx0XHRuYW1lOiBpbnRyaW5zaWNOYW1lLFxuXHRcdFx0dmFsdWU6IHZhbHVlXG5cdFx0fTtcblx0fVxuXG5cdHRocm93IG5ldyAkU3ludGF4RXJyb3IoJ2ludHJpbnNpYyAnICsgbmFtZSArICcgZG9lcyBub3QgZXhpc3QhJyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIEdldEludHJpbnNpYyhuYW1lLCBhbGxvd01pc3NpbmcpIHtcblx0aWYgKHR5cGVvZiBuYW1lICE9PSAnc3RyaW5nJyB8fCBuYW1lLmxlbmd0aCA9PT0gMCkge1xuXHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdpbnRyaW5zaWMgbmFtZSBtdXN0IGJlIGEgbm9uLWVtcHR5IHN0cmluZycpO1xuXHR9XG5cdGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSAmJiB0eXBlb2YgYWxsb3dNaXNzaW5nICE9PSAnYm9vbGVhbicpIHtcblx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignXCJhbGxvd01pc3NpbmdcIiBhcmd1bWVudCBtdXN0IGJlIGEgYm9vbGVhbicpO1xuXHR9XG5cblx0aWYgKCRleGVjKC9eJT9bXiVdKiU/JC8sIG5hbWUpID09PSBudWxsKSB7XG5cdFx0dGhyb3cgbmV3ICRTeW50YXhFcnJvcignYCVgIG1heSBub3QgYmUgcHJlc2VudCBhbnl3aGVyZSBidXQgYXQgdGhlIGJlZ2lubmluZyBhbmQgZW5kIG9mIHRoZSBpbnRyaW5zaWMgbmFtZScpO1xuXHR9XG5cdHZhciBwYXJ0cyA9IHN0cmluZ1RvUGF0aChuYW1lKTtcblx0dmFyIGludHJpbnNpY0Jhc2VOYW1lID0gcGFydHMubGVuZ3RoID4gMCA/IHBhcnRzWzBdIDogJyc7XG5cblx0dmFyIGludHJpbnNpYyA9IGdldEJhc2VJbnRyaW5zaWMoJyUnICsgaW50cmluc2ljQmFzZU5hbWUgKyAnJScsIGFsbG93TWlzc2luZyk7XG5cdHZhciBpbnRyaW5zaWNSZWFsTmFtZSA9IGludHJpbnNpYy5uYW1lO1xuXHR2YXIgdmFsdWUgPSBpbnRyaW5zaWMudmFsdWU7XG5cdHZhciBza2lwRnVydGhlckNhY2hpbmcgPSBmYWxzZTtcblxuXHR2YXIgYWxpYXMgPSBpbnRyaW5zaWMuYWxpYXM7XG5cdGlmIChhbGlhcykge1xuXHRcdGludHJpbnNpY0Jhc2VOYW1lID0gYWxpYXNbMF07XG5cdFx0JHNwbGljZUFwcGx5KHBhcnRzLCAkY29uY2F0KFswLCAxXSwgYWxpYXMpKTtcblx0fVxuXG5cdGZvciAodmFyIGkgPSAxLCBpc093biA9IHRydWU7IGkgPCBwYXJ0cy5sZW5ndGg7IGkgKz0gMSkge1xuXHRcdHZhciBwYXJ0ID0gcGFydHNbaV07XG5cdFx0dmFyIGZpcnN0ID0gJHN0clNsaWNlKHBhcnQsIDAsIDEpO1xuXHRcdHZhciBsYXN0ID0gJHN0clNsaWNlKHBhcnQsIC0xKTtcblx0XHRpZiAoXG5cdFx0XHQoXG5cdFx0XHRcdChmaXJzdCA9PT0gJ1wiJyB8fCBmaXJzdCA9PT0gXCInXCIgfHwgZmlyc3QgPT09ICdgJylcblx0XHRcdFx0fHwgKGxhc3QgPT09ICdcIicgfHwgbGFzdCA9PT0gXCInXCIgfHwgbGFzdCA9PT0gJ2AnKVxuXHRcdFx0KVxuXHRcdFx0JiYgZmlyc3QgIT09IGxhc3Rcblx0XHQpIHtcblx0XHRcdHRocm93IG5ldyAkU3ludGF4RXJyb3IoJ3Byb3BlcnR5IG5hbWVzIHdpdGggcXVvdGVzIG11c3QgaGF2ZSBtYXRjaGluZyBxdW90ZXMnKTtcblx0XHR9XG5cdFx0aWYgKHBhcnQgPT09ICdjb25zdHJ1Y3RvcicgfHwgIWlzT3duKSB7XG5cdFx0XHRza2lwRnVydGhlckNhY2hpbmcgPSB0cnVlO1xuXHRcdH1cblxuXHRcdGludHJpbnNpY0Jhc2VOYW1lICs9ICcuJyArIHBhcnQ7XG5cdFx0aW50cmluc2ljUmVhbE5hbWUgPSAnJScgKyBpbnRyaW5zaWNCYXNlTmFtZSArICclJztcblxuXHRcdGlmIChoYXNPd24oSU5UUklOU0lDUywgaW50cmluc2ljUmVhbE5hbWUpKSB7XG5cdFx0XHR2YWx1ZSA9IElOVFJJTlNJQ1NbaW50cmluc2ljUmVhbE5hbWVdO1xuXHRcdH0gZWxzZSBpZiAodmFsdWUgIT0gbnVsbCkge1xuXHRcdFx0aWYgKCEocGFydCBpbiB2YWx1ZSkpIHtcblx0XHRcdFx0aWYgKCFhbGxvd01pc3NpbmcpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignYmFzZSBpbnRyaW5zaWMgZm9yICcgKyBuYW1lICsgJyBleGlzdHMsIGJ1dCB0aGUgcHJvcGVydHkgaXMgbm90IGF2YWlsYWJsZS4nKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdm9pZCB1bmRlZmluZWQ7XG5cdFx0XHR9XG5cdFx0XHRpZiAoJGdPUEQgJiYgKGkgKyAxKSA+PSBwYXJ0cy5sZW5ndGgpIHtcblx0XHRcdFx0dmFyIGRlc2MgPSAkZ09QRCh2YWx1ZSwgcGFydCk7XG5cdFx0XHRcdGlzT3duID0gISFkZXNjO1xuXG5cdFx0XHRcdC8vIEJ5IGNvbnZlbnRpb24sIHdoZW4gYSBkYXRhIHByb3BlcnR5IGlzIGNvbnZlcnRlZCB0byBhbiBhY2Nlc3NvclxuXHRcdFx0XHQvLyBwcm9wZXJ0eSB0byBlbXVsYXRlIGEgZGF0YSBwcm9wZXJ0eSB0aGF0IGRvZXMgbm90IHN1ZmZlciBmcm9tXG5cdFx0XHRcdC8vIHRoZSBvdmVycmlkZSBtaXN0YWtlLCB0aGF0IGFjY2Vzc29yJ3MgZ2V0dGVyIGlzIG1hcmtlZCB3aXRoXG5cdFx0XHRcdC8vIGFuIGBvcmlnaW5hbFZhbHVlYCBwcm9wZXJ0eS4gSGVyZSwgd2hlbiB3ZSBkZXRlY3QgdGhpcywgd2Vcblx0XHRcdFx0Ly8gdXBob2xkIHRoZSBpbGx1c2lvbiBieSBwcmV0ZW5kaW5nIHRvIHNlZSB0aGF0IG9yaWdpbmFsIGRhdGFcblx0XHRcdFx0Ly8gcHJvcGVydHksIGkuZS4sIHJldHVybmluZyB0aGUgdmFsdWUgcmF0aGVyIHRoYW4gdGhlIGdldHRlclxuXHRcdFx0XHQvLyBpdHNlbGYuXG5cdFx0XHRcdGlmIChpc093biAmJiAnZ2V0JyBpbiBkZXNjICYmICEoJ29yaWdpbmFsVmFsdWUnIGluIGRlc2MuZ2V0KSkge1xuXHRcdFx0XHRcdHZhbHVlID0gZGVzYy5nZXQ7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dmFsdWUgPSB2YWx1ZVtwYXJ0XTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aXNPd24gPSBoYXNPd24odmFsdWUsIHBhcnQpO1xuXHRcdFx0XHR2YWx1ZSA9IHZhbHVlW3BhcnRdO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoaXNPd24gJiYgIXNraXBGdXJ0aGVyQ2FjaGluZykge1xuXHRcdFx0XHRJTlRSSU5TSUNTW2ludHJpbnNpY1JlYWxOYW1lXSA9IHZhbHVlO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gdmFsdWU7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIEdldEludHJpbnNpYyA9IHJlcXVpcmUoJ2dldC1pbnRyaW5zaWMnKTtcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4nKX0gKi9cbnZhciAkZGVmaW5lUHJvcGVydHkgPSBHZXRJbnRyaW5zaWMoJyVPYmplY3QuZGVmaW5lUHJvcGVydHklJywgdHJ1ZSkgfHwgZmFsc2U7XG5pZiAoJGRlZmluZVByb3BlcnR5KSB7XG5cdHRyeSB7XG5cdFx0JGRlZmluZVByb3BlcnR5KHt9LCAnYScsIHsgdmFsdWU6IDEgfSk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHQvLyBJRSA4IGhhcyBhIGJyb2tlbiBkZWZpbmVQcm9wZXJ0eVxuXHRcdCRkZWZpbmVQcm9wZXJ0eSA9IGZhbHNlO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gJGRlZmluZVByb3BlcnR5O1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIEdldEludHJpbnNpYyA9IHJlcXVpcmUoJ2dldC1pbnRyaW5zaWMnKTtcblxudmFyICRnT1BEID0gR2V0SW50cmluc2ljKCclT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvciUnLCB0cnVlKTtcblxuaWYgKCRnT1BEKSB7XG5cdHRyeSB7XG5cdFx0JGdPUEQoW10sICdsZW5ndGgnKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdC8vIElFIDggaGFzIGEgYnJva2VuIGdPUERcblx0XHQkZ09QRCA9IG51bGw7XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSAkZ09QRDtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciAkZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCdlcy1kZWZpbmUtcHJvcGVydHknKTtcblxudmFyICRTeW50YXhFcnJvciA9IHJlcXVpcmUoJ2VzLWVycm9ycy9zeW50YXgnKTtcbnZhciAkVHlwZUVycm9yID0gcmVxdWlyZSgnZXMtZXJyb3JzL3R5cGUnKTtcblxudmFyIGdvcGQgPSByZXF1aXJlKCdnb3BkJyk7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuJyl9ICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZURhdGFQcm9wZXJ0eShcblx0b2JqLFxuXHRwcm9wZXJ0eSxcblx0dmFsdWVcbikge1xuXHRpZiAoIW9iaiB8fCAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcgJiYgdHlwZW9mIG9iaiAhPT0gJ2Z1bmN0aW9uJykpIHtcblx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignYG9iamAgbXVzdCBiZSBhbiBvYmplY3Qgb3IgYSBmdW5jdGlvbmAnKTtcblx0fVxuXHRpZiAodHlwZW9mIHByb3BlcnR5ICE9PSAnc3RyaW5nJyAmJiB0eXBlb2YgcHJvcGVydHkgIT09ICdzeW1ib2wnKSB7XG5cdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ2Bwcm9wZXJ0eWAgbXVzdCBiZSBhIHN0cmluZyBvciBhIHN5bWJvbGAnKTtcblx0fVxuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgdHlwZW9mIGFyZ3VtZW50c1szXSAhPT0gJ2Jvb2xlYW4nICYmIGFyZ3VtZW50c1szXSAhPT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdgbm9uRW51bWVyYWJsZWAsIGlmIHByb3ZpZGVkLCBtdXN0IGJlIGEgYm9vbGVhbiBvciBudWxsJyk7XG5cdH1cblx0aWYgKGFyZ3VtZW50cy5sZW5ndGggPiA0ICYmIHR5cGVvZiBhcmd1bWVudHNbNF0gIT09ICdib29sZWFuJyAmJiBhcmd1bWVudHNbNF0gIT09IG51bGwpIHtcblx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignYG5vbldyaXRhYmxlYCwgaWYgcHJvdmlkZWQsIG11c3QgYmUgYSBib29sZWFuIG9yIG51bGwnKTtcblx0fVxuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDUgJiYgdHlwZW9mIGFyZ3VtZW50c1s1XSAhPT0gJ2Jvb2xlYW4nICYmIGFyZ3VtZW50c1s1XSAhPT0gbnVsbCkge1xuXHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdgbm9uQ29uZmlndXJhYmxlYCwgaWYgcHJvdmlkZWQsIG11c3QgYmUgYSBib29sZWFuIG9yIG51bGwnKTtcblx0fVxuXHRpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDYgJiYgdHlwZW9mIGFyZ3VtZW50c1s2XSAhPT0gJ2Jvb2xlYW4nKSB7XG5cdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ2Bsb29zZWAsIGlmIHByb3ZpZGVkLCBtdXN0IGJlIGEgYm9vbGVhbicpO1xuXHR9XG5cblx0dmFyIG5vbkVudW1lcmFibGUgPSBhcmd1bWVudHMubGVuZ3RoID4gMyA/IGFyZ3VtZW50c1szXSA6IG51bGw7XG5cdHZhciBub25Xcml0YWJsZSA9IGFyZ3VtZW50cy5sZW5ndGggPiA0ID8gYXJndW1lbnRzWzRdIDogbnVsbDtcblx0dmFyIG5vbkNvbmZpZ3VyYWJsZSA9IGFyZ3VtZW50cy5sZW5ndGggPiA1ID8gYXJndW1lbnRzWzVdIDogbnVsbDtcblx0dmFyIGxvb3NlID0gYXJndW1lbnRzLmxlbmd0aCA+IDYgPyBhcmd1bWVudHNbNl0gOiBmYWxzZTtcblxuXHQvKiBAdHlwZSB7ZmFsc2UgfCBUeXBlZFByb3BlcnR5RGVzY3JpcHRvcjx1bmtub3duPn0gKi9cblx0dmFyIGRlc2MgPSAhIWdvcGQgJiYgZ29wZChvYmosIHByb3BlcnR5KTtcblxuXHRpZiAoJGRlZmluZVByb3BlcnR5KSB7XG5cdFx0JGRlZmluZVByb3BlcnR5KG9iaiwgcHJvcGVydHksIHtcblx0XHRcdGNvbmZpZ3VyYWJsZTogbm9uQ29uZmlndXJhYmxlID09PSBudWxsICYmIGRlc2MgPyBkZXNjLmNvbmZpZ3VyYWJsZSA6ICFub25Db25maWd1cmFibGUsXG5cdFx0XHRlbnVtZXJhYmxlOiBub25FbnVtZXJhYmxlID09PSBudWxsICYmIGRlc2MgPyBkZXNjLmVudW1lcmFibGUgOiAhbm9uRW51bWVyYWJsZSxcblx0XHRcdHZhbHVlOiB2YWx1ZSxcblx0XHRcdHdyaXRhYmxlOiBub25Xcml0YWJsZSA9PT0gbnVsbCAmJiBkZXNjID8gZGVzYy53cml0YWJsZSA6ICFub25Xcml0YWJsZVxuXHRcdH0pO1xuXHR9IGVsc2UgaWYgKGxvb3NlIHx8ICghbm9uRW51bWVyYWJsZSAmJiAhbm9uV3JpdGFibGUgJiYgIW5vbkNvbmZpZ3VyYWJsZSkpIHtcblx0XHQvLyBtdXN0IGZhbGwgYmFjayB0byBbW1NldF1dLCBhbmQgd2FzIG5vdCBleHBsaWNpdGx5IGFza2VkIHRvIG1ha2Ugbm9uLWVudW1lcmFibGUsIG5vbi13cml0YWJsZSwgb3Igbm9uLWNvbmZpZ3VyYWJsZVxuXHRcdG9ialtwcm9wZXJ0eV0gPSB2YWx1ZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyAkU3ludGF4RXJyb3IoJ1RoaXMgZW52aXJvbm1lbnQgZG9lcyBub3Qgc3VwcG9ydCBkZWZpbmluZyBhIHByb3BlcnR5IGFzIG5vbi1jb25maWd1cmFibGUsIG5vbi13cml0YWJsZSwgb3Igbm9uLWVudW1lcmFibGUuJyk7XG5cdH1cbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgJGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnZXMtZGVmaW5lLXByb3BlcnR5Jyk7XG5cbnZhciBoYXNQcm9wZXJ0eURlc2NyaXB0b3JzID0gZnVuY3Rpb24gaGFzUHJvcGVydHlEZXNjcmlwdG9ycygpIHtcblx0cmV0dXJuICEhJGRlZmluZVByb3BlcnR5O1xufTtcblxuaGFzUHJvcGVydHlEZXNjcmlwdG9ycy5oYXNBcnJheUxlbmd0aERlZmluZUJ1ZyA9IGZ1bmN0aW9uIGhhc0FycmF5TGVuZ3RoRGVmaW5lQnVnKCkge1xuXHQvLyBub2RlIHYwLjYgaGFzIGEgYnVnIHdoZXJlIGFycmF5IGxlbmd0aHMgY2FuIGJlIFNldCBidXQgbm90IERlZmluZWRcblx0aWYgKCEkZGVmaW5lUHJvcGVydHkpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHR0cnkge1xuXHRcdHJldHVybiAkZGVmaW5lUHJvcGVydHkoW10sICdsZW5ndGgnLCB7IHZhbHVlOiAxIH0pLmxlbmd0aCAhPT0gMTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdC8vIEluIEZpcmVmb3ggNC0yMiwgZGVmaW5pbmcgbGVuZ3RoIG9uIGFuIGFycmF5IHRocm93cyBhbiBleGNlcHRpb24uXG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzUHJvcGVydHlEZXNjcmlwdG9ycztcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBHZXRJbnRyaW5zaWMgPSByZXF1aXJlKCdnZXQtaW50cmluc2ljJyk7XG52YXIgZGVmaW5lID0gcmVxdWlyZSgnZGVmaW5lLWRhdGEtcHJvcGVydHknKTtcbnZhciBoYXNEZXNjcmlwdG9ycyA9IHJlcXVpcmUoJ2hhcy1wcm9wZXJ0eS1kZXNjcmlwdG9ycycpKCk7XG52YXIgZ09QRCA9IHJlcXVpcmUoJ2dvcGQnKTtcblxudmFyICRUeXBlRXJyb3IgPSByZXF1aXJlKCdlcy1lcnJvcnMvdHlwZScpO1xudmFyICRmbG9vciA9IEdldEludHJpbnNpYygnJU1hdGguZmxvb3IlJyk7XG5cbi8qKiBAdHlwZSB7aW1wb3J0KCcuJyl9ICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNldEZ1bmN0aW9uTGVuZ3RoKGZuLCBsZW5ndGgpIHtcblx0aWYgKHR5cGVvZiBmbiAhPT0gJ2Z1bmN0aW9uJykge1xuXHRcdHRocm93IG5ldyAkVHlwZUVycm9yKCdgZm5gIGlzIG5vdCBhIGZ1bmN0aW9uJyk7XG5cdH1cblx0aWYgKHR5cGVvZiBsZW5ndGggIT09ICdudW1iZXInIHx8IGxlbmd0aCA8IDAgfHwgbGVuZ3RoID4gMHhGRkZGRkZGRiB8fCAkZmxvb3IobGVuZ3RoKSAhPT0gbGVuZ3RoKSB7XG5cdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ2BsZW5ndGhgIG11c3QgYmUgYSBwb3NpdGl2ZSAzMi1iaXQgaW50ZWdlcicpO1xuXHR9XG5cblx0dmFyIGxvb3NlID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgISFhcmd1bWVudHNbMl07XG5cblx0dmFyIGZ1bmN0aW9uTGVuZ3RoSXNDb25maWd1cmFibGUgPSB0cnVlO1xuXHR2YXIgZnVuY3Rpb25MZW5ndGhJc1dyaXRhYmxlID0gdHJ1ZTtcblx0aWYgKCdsZW5ndGgnIGluIGZuICYmIGdPUEQpIHtcblx0XHR2YXIgZGVzYyA9IGdPUEQoZm4sICdsZW5ndGgnKTtcblx0XHRpZiAoZGVzYyAmJiAhZGVzYy5jb25maWd1cmFibGUpIHtcblx0XHRcdGZ1bmN0aW9uTGVuZ3RoSXNDb25maWd1cmFibGUgPSBmYWxzZTtcblx0XHR9XG5cdFx0aWYgKGRlc2MgJiYgIWRlc2Mud3JpdGFibGUpIHtcblx0XHRcdGZ1bmN0aW9uTGVuZ3RoSXNXcml0YWJsZSA9IGZhbHNlO1xuXHRcdH1cblx0fVxuXG5cdGlmIChmdW5jdGlvbkxlbmd0aElzQ29uZmlndXJhYmxlIHx8IGZ1bmN0aW9uTGVuZ3RoSXNXcml0YWJsZSB8fCAhbG9vc2UpIHtcblx0XHRpZiAoaGFzRGVzY3JpcHRvcnMpIHtcblx0XHRcdGRlZmluZSgvKiogQHR5cGUge1BhcmFtZXRlcnM8ZGVmaW5lPlswXX0gKi8gKGZuKSwgJ2xlbmd0aCcsIGxlbmd0aCwgdHJ1ZSwgdHJ1ZSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGRlZmluZSgvKiogQHR5cGUge1BhcmFtZXRlcnM8ZGVmaW5lPlswXX0gKi8gKGZuKSwgJ2xlbmd0aCcsIGxlbmd0aCk7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBmbjtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmluZCA9IHJlcXVpcmUoJ2Z1bmN0aW9uLWJpbmQnKTtcbnZhciBHZXRJbnRyaW5zaWMgPSByZXF1aXJlKCdnZXQtaW50cmluc2ljJyk7XG52YXIgc2V0RnVuY3Rpb25MZW5ndGggPSByZXF1aXJlKCdzZXQtZnVuY3Rpb24tbGVuZ3RoJyk7XG5cbnZhciAkVHlwZUVycm9yID0gcmVxdWlyZSgnZXMtZXJyb3JzL3R5cGUnKTtcbnZhciAkYXBwbHkgPSBHZXRJbnRyaW5zaWMoJyVGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHklJyk7XG52YXIgJGNhbGwgPSBHZXRJbnRyaW5zaWMoJyVGdW5jdGlvbi5wcm90b3R5cGUuY2FsbCUnKTtcbnZhciAkcmVmbGVjdEFwcGx5ID0gR2V0SW50cmluc2ljKCclUmVmbGVjdC5hcHBseSUnLCB0cnVlKSB8fCBiaW5kLmNhbGwoJGNhbGwsICRhcHBseSk7XG5cbnZhciAkZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCdlcy1kZWZpbmUtcHJvcGVydHknKTtcbnZhciAkbWF4ID0gR2V0SW50cmluc2ljKCclTWF0aC5tYXglJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsbEJpbmQob3JpZ2luYWxGdW5jdGlvbikge1xuXHRpZiAodHlwZW9mIG9yaWdpbmFsRnVuY3Rpb24gIT09ICdmdW5jdGlvbicpIHtcblx0XHR0aHJvdyBuZXcgJFR5cGVFcnJvcignYSBmdW5jdGlvbiBpcyByZXF1aXJlZCcpO1xuXHR9XG5cdHZhciBmdW5jID0gJHJlZmxlY3RBcHBseShiaW5kLCAkY2FsbCwgYXJndW1lbnRzKTtcblx0cmV0dXJuIHNldEZ1bmN0aW9uTGVuZ3RoKFxuXHRcdGZ1bmMsXG5cdFx0MSArICRtYXgoMCwgb3JpZ2luYWxGdW5jdGlvbi5sZW5ndGggLSAoYXJndW1lbnRzLmxlbmd0aCAtIDEpKSxcblx0XHR0cnVlXG5cdCk7XG59O1xuXG52YXIgYXBwbHlCaW5kID0gZnVuY3Rpb24gYXBwbHlCaW5kKCkge1xuXHRyZXR1cm4gJHJlZmxlY3RBcHBseShiaW5kLCAkYXBwbHksIGFyZ3VtZW50cyk7XG59O1xuXG5pZiAoJGRlZmluZVByb3BlcnR5KSB7XG5cdCRkZWZpbmVQcm9wZXJ0eShtb2R1bGUuZXhwb3J0cywgJ2FwcGx5JywgeyB2YWx1ZTogYXBwbHlCaW5kIH0pO1xufSBlbHNlIHtcblx0bW9kdWxlLmV4cG9ydHMuYXBwbHkgPSBhcHBseUJpbmQ7XG59XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgR2V0SW50cmluc2ljID0gcmVxdWlyZSgnZ2V0LWludHJpbnNpYycpO1xuXG52YXIgY2FsbEJpbmQgPSByZXF1aXJlKCcuLycpO1xuXG52YXIgJGluZGV4T2YgPSBjYWxsQmluZChHZXRJbnRyaW5zaWMoJ1N0cmluZy5wcm90b3R5cGUuaW5kZXhPZicpKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxsQm91bmRJbnRyaW5zaWMobmFtZSwgYWxsb3dNaXNzaW5nKSB7XG5cdHZhciBpbnRyaW5zaWMgPSBHZXRJbnRyaW5zaWMobmFtZSwgISFhbGxvd01pc3NpbmcpO1xuXHRpZiAodHlwZW9mIGludHJpbnNpYyA9PT0gJ2Z1bmN0aW9uJyAmJiAkaW5kZXhPZihuYW1lLCAnLnByb3RvdHlwZS4nKSA+IC0xKSB7XG5cdFx0cmV0dXJuIGNhbGxCaW5kKGludHJpbnNpYyk7XG5cdH1cblx0cmV0dXJuIGludHJpbnNpYztcbn07XG4iLCAibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCd1dGlsJykuaW5zcGVjdDtcbiIsICJ2YXIgaGFzTWFwID0gdHlwZW9mIE1hcCA9PT0gJ2Z1bmN0aW9uJyAmJiBNYXAucHJvdG90eXBlO1xudmFyIG1hcFNpemVEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvciAmJiBoYXNNYXAgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE1hcC5wcm90b3R5cGUsICdzaXplJykgOiBudWxsO1xudmFyIG1hcFNpemUgPSBoYXNNYXAgJiYgbWFwU2l6ZURlc2NyaXB0b3IgJiYgdHlwZW9mIG1hcFNpemVEZXNjcmlwdG9yLmdldCA9PT0gJ2Z1bmN0aW9uJyA/IG1hcFNpemVEZXNjcmlwdG9yLmdldCA6IG51bGw7XG52YXIgbWFwRm9yRWFjaCA9IGhhc01hcCAmJiBNYXAucHJvdG90eXBlLmZvckVhY2g7XG52YXIgaGFzU2V0ID0gdHlwZW9mIFNldCA9PT0gJ2Z1bmN0aW9uJyAmJiBTZXQucHJvdG90eXBlO1xudmFyIHNldFNpemVEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvciAmJiBoYXNTZXQgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKFNldC5wcm90b3R5cGUsICdzaXplJykgOiBudWxsO1xudmFyIHNldFNpemUgPSBoYXNTZXQgJiYgc2V0U2l6ZURlc2NyaXB0b3IgJiYgdHlwZW9mIHNldFNpemVEZXNjcmlwdG9yLmdldCA9PT0gJ2Z1bmN0aW9uJyA/IHNldFNpemVEZXNjcmlwdG9yLmdldCA6IG51bGw7XG52YXIgc2V0Rm9yRWFjaCA9IGhhc1NldCAmJiBTZXQucHJvdG90eXBlLmZvckVhY2g7XG52YXIgaGFzV2Vha01hcCA9IHR5cGVvZiBXZWFrTWFwID09PSAnZnVuY3Rpb24nICYmIFdlYWtNYXAucHJvdG90eXBlO1xudmFyIHdlYWtNYXBIYXMgPSBoYXNXZWFrTWFwID8gV2Vha01hcC5wcm90b3R5cGUuaGFzIDogbnVsbDtcbnZhciBoYXNXZWFrU2V0ID0gdHlwZW9mIFdlYWtTZXQgPT09ICdmdW5jdGlvbicgJiYgV2Vha1NldC5wcm90b3R5cGU7XG52YXIgd2Vha1NldEhhcyA9IGhhc1dlYWtTZXQgPyBXZWFrU2V0LnByb3RvdHlwZS5oYXMgOiBudWxsO1xudmFyIGhhc1dlYWtSZWYgPSB0eXBlb2YgV2Vha1JlZiA9PT0gJ2Z1bmN0aW9uJyAmJiBXZWFrUmVmLnByb3RvdHlwZTtcbnZhciB3ZWFrUmVmRGVyZWYgPSBoYXNXZWFrUmVmID8gV2Vha1JlZi5wcm90b3R5cGUuZGVyZWYgOiBudWxsO1xudmFyIGJvb2xlYW5WYWx1ZU9mID0gQm9vbGVhbi5wcm90b3R5cGUudmFsdWVPZjtcbnZhciBvYmplY3RUb1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgZnVuY3Rpb25Ub1N0cmluZyA9IEZ1bmN0aW9uLnByb3RvdHlwZS50b1N0cmluZztcbnZhciAkbWF0Y2ggPSBTdHJpbmcucHJvdG90eXBlLm1hdGNoO1xudmFyICRzbGljZSA9IFN0cmluZy5wcm90b3R5cGUuc2xpY2U7XG52YXIgJHJlcGxhY2UgPSBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2U7XG52YXIgJHRvVXBwZXJDYXNlID0gU3RyaW5nLnByb3RvdHlwZS50b1VwcGVyQ2FzZTtcbnZhciAkdG9Mb3dlckNhc2UgPSBTdHJpbmcucHJvdG90eXBlLnRvTG93ZXJDYXNlO1xudmFyICR0ZXN0ID0gUmVnRXhwLnByb3RvdHlwZS50ZXN0O1xudmFyICRjb25jYXQgPSBBcnJheS5wcm90b3R5cGUuY29uY2F0O1xudmFyICRqb2luID0gQXJyYXkucHJvdG90eXBlLmpvaW47XG52YXIgJGFyclNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xudmFyICRmbG9vciA9IE1hdGguZmxvb3I7XG52YXIgYmlnSW50VmFsdWVPZiA9IHR5cGVvZiBCaWdJbnQgPT09ICdmdW5jdGlvbicgPyBCaWdJbnQucHJvdG90eXBlLnZhbHVlT2YgOiBudWxsO1xudmFyIGdPUFMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xudmFyIHN5bVRvU3RyaW5nID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSAnc3ltYm9sJyA/IFN5bWJvbC5wcm90b3R5cGUudG9TdHJpbmcgOiBudWxsO1xudmFyIGhhc1NoYW1tZWRTeW1ib2xzID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSAnb2JqZWN0Jztcbi8vIGllLCBgaGFzLXRvc3RyaW5ndGFnL3NoYW1zXG52YXIgdG9TdHJpbmdUYWcgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC50b1N0cmluZ1RhZyAmJiAodHlwZW9mIFN5bWJvbC50b1N0cmluZ1RhZyA9PT0gaGFzU2hhbW1lZFN5bWJvbHMgPyAnb2JqZWN0JyA6ICdzeW1ib2wnKVxuICAgID8gU3ltYm9sLnRvU3RyaW5nVGFnXG4gICAgOiBudWxsO1xudmFyIGlzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbnZhciBnUE8gPSAodHlwZW9mIFJlZmxlY3QgPT09ICdmdW5jdGlvbicgPyBSZWZsZWN0LmdldFByb3RvdHlwZU9mIDogT2JqZWN0LmdldFByb3RvdHlwZU9mKSB8fCAoXG4gICAgW10uX19wcm90b19fID09PSBBcnJheS5wcm90b3R5cGUgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wcm90b1xuICAgICAgICA/IGZ1bmN0aW9uIChPKSB7XG4gICAgICAgICAgICByZXR1cm4gTy5fX3Byb3RvX187IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcHJvdG9cbiAgICAgICAgfVxuICAgICAgICA6IG51bGxcbik7XG5cbmZ1bmN0aW9uIGFkZE51bWVyaWNTZXBhcmF0b3IobnVtLCBzdHIpIHtcbiAgICBpZiAoXG4gICAgICAgIG51bSA9PT0gSW5maW5pdHlcbiAgICAgICAgfHwgbnVtID09PSAtSW5maW5pdHlcbiAgICAgICAgfHwgbnVtICE9PSBudW1cbiAgICAgICAgfHwgKG51bSAmJiBudW0gPiAtMTAwMCAmJiBudW0gPCAxMDAwKVxuICAgICAgICB8fCAkdGVzdC5jYWxsKC9lLywgc3RyKVxuICAgICkge1xuICAgICAgICByZXR1cm4gc3RyO1xuICAgIH1cbiAgICB2YXIgc2VwUmVnZXggPSAvWzAtOV0oPz0oPzpbMC05XXszfSkrKD8hWzAtOV0pKS9nO1xuICAgIGlmICh0eXBlb2YgbnVtID09PSAnbnVtYmVyJykge1xuICAgICAgICB2YXIgaW50ID0gbnVtIDwgMCA/IC0kZmxvb3IoLW51bSkgOiAkZmxvb3IobnVtKTsgLy8gdHJ1bmMobnVtKVxuICAgICAgICBpZiAoaW50ICE9PSBudW0pIHtcbiAgICAgICAgICAgIHZhciBpbnRTdHIgPSBTdHJpbmcoaW50KTtcbiAgICAgICAgICAgIHZhciBkZWMgPSAkc2xpY2UuY2FsbChzdHIsIGludFN0ci5sZW5ndGggKyAxKTtcbiAgICAgICAgICAgIHJldHVybiAkcmVwbGFjZS5jYWxsKGludFN0ciwgc2VwUmVnZXgsICckJl8nKSArICcuJyArICRyZXBsYWNlLmNhbGwoJHJlcGxhY2UuY2FsbChkZWMsIC8oWzAtOV17M30pL2csICckJl8nKSwgL18kLywgJycpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiAkcmVwbGFjZS5jYWxsKHN0ciwgc2VwUmVnZXgsICckJl8nKTtcbn1cblxudmFyIHV0aWxJbnNwZWN0ID0gcmVxdWlyZSgnLi91dGlsLmluc3BlY3QnKTtcbnZhciBpbnNwZWN0Q3VzdG9tID0gdXRpbEluc3BlY3QuY3VzdG9tO1xudmFyIGluc3BlY3RTeW1ib2wgPSBpc1N5bWJvbChpbnNwZWN0Q3VzdG9tKSA/IGluc3BlY3RDdXN0b20gOiBudWxsO1xuXG52YXIgcXVvdGVzID0ge1xuICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICAnZG91YmxlJzogJ1wiJyxcbiAgICBzaW5nbGU6IFwiJ1wiXG59O1xudmFyIHF1b3RlUkVzID0ge1xuICAgIF9fcHJvdG9fXzogbnVsbCxcbiAgICAnZG91YmxlJzogLyhbXCJcXFxcXSkvZyxcbiAgICBzaW5nbGU6IC8oWydcXFxcXSkvZ1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBpbnNwZWN0XyhvYmosIG9wdGlvbnMsIGRlcHRoLCBzZWVuKSB7XG4gICAgdmFyIG9wdHMgPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgaWYgKGhhcyhvcHRzLCAncXVvdGVTdHlsZScpICYmICFoYXMocXVvdGVzLCBvcHRzLnF1b3RlU3R5bGUpKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29wdGlvbiBcInF1b3RlU3R5bGVcIiBtdXN0IGJlIFwic2luZ2xlXCIgb3IgXCJkb3VibGVcIicpO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICAgIGhhcyhvcHRzLCAnbWF4U3RyaW5nTGVuZ3RoJykgJiYgKHR5cGVvZiBvcHRzLm1heFN0cmluZ0xlbmd0aCA9PT0gJ251bWJlcidcbiAgICAgICAgICAgID8gb3B0cy5tYXhTdHJpbmdMZW5ndGggPCAwICYmIG9wdHMubWF4U3RyaW5nTGVuZ3RoICE9PSBJbmZpbml0eVxuICAgICAgICAgICAgOiBvcHRzLm1heFN0cmluZ0xlbmd0aCAhPT0gbnVsbFxuICAgICAgICApXG4gICAgKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ29wdGlvbiBcIm1heFN0cmluZ0xlbmd0aFwiLCBpZiBwcm92aWRlZCwgbXVzdCBiZSBhIHBvc2l0aXZlIGludGVnZXIsIEluZmluaXR5LCBvciBgbnVsbGAnKTtcbiAgICB9XG4gICAgdmFyIGN1c3RvbUluc3BlY3QgPSBoYXMob3B0cywgJ2N1c3RvbUluc3BlY3QnKSA/IG9wdHMuY3VzdG9tSW5zcGVjdCA6IHRydWU7XG4gICAgaWYgKHR5cGVvZiBjdXN0b21JbnNwZWN0ICE9PSAnYm9vbGVhbicgJiYgY3VzdG9tSW5zcGVjdCAhPT0gJ3N5bWJvbCcpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9uIFwiY3VzdG9tSW5zcGVjdFwiLCBpZiBwcm92aWRlZCwgbXVzdCBiZSBgdHJ1ZWAsIGBmYWxzZWAsIG9yIGBcXCdzeW1ib2xcXCdgJyk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgICBoYXMob3B0cywgJ2luZGVudCcpXG4gICAgICAgICYmIG9wdHMuaW5kZW50ICE9PSBudWxsXG4gICAgICAgICYmIG9wdHMuaW5kZW50ICE9PSAnXFx0J1xuICAgICAgICAmJiAhKHBhcnNlSW50KG9wdHMuaW5kZW50LCAxMCkgPT09IG9wdHMuaW5kZW50ICYmIG9wdHMuaW5kZW50ID4gMClcbiAgICApIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignb3B0aW9uIFwiaW5kZW50XCIgbXVzdCBiZSBcIlxcXFx0XCIsIGFuIGludGVnZXIgPiAwLCBvciBgbnVsbGAnKTtcbiAgICB9XG4gICAgaWYgKGhhcyhvcHRzLCAnbnVtZXJpY1NlcGFyYXRvcicpICYmIHR5cGVvZiBvcHRzLm51bWVyaWNTZXBhcmF0b3IgIT09ICdib29sZWFuJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdvcHRpb24gXCJudW1lcmljU2VwYXJhdG9yXCIsIGlmIHByb3ZpZGVkLCBtdXN0IGJlIGB0cnVlYCBvciBgZmFsc2VgJyk7XG4gICAgfVxuICAgIHZhciBudW1lcmljU2VwYXJhdG9yID0gb3B0cy5udW1lcmljU2VwYXJhdG9yO1xuXG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiAndW5kZWZpbmVkJztcbiAgICB9XG4gICAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJ251bGwnO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIHJldHVybiBvYmogPyAndHJ1ZScgOiAnZmFsc2UnO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gaW5zcGVjdFN0cmluZyhvYmosIG9wdHMpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgaWYgKG9iaiA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIEluZmluaXR5IC8gb2JqID4gMCA/ICcwJyA6ICctMCc7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN0ciA9IFN0cmluZyhvYmopO1xuICAgICAgICByZXR1cm4gbnVtZXJpY1NlcGFyYXRvciA/IGFkZE51bWVyaWNTZXBhcmF0b3Iob2JqLCBzdHIpIDogc3RyO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ2JpZ2ludCcpIHtcbiAgICAgICAgdmFyIGJpZ0ludFN0ciA9IFN0cmluZyhvYmopICsgJ24nO1xuICAgICAgICByZXR1cm4gbnVtZXJpY1NlcGFyYXRvciA/IGFkZE51bWVyaWNTZXBhcmF0b3Iob2JqLCBiaWdJbnRTdHIpIDogYmlnSW50U3RyO1xuICAgIH1cblxuICAgIHZhciBtYXhEZXB0aCA9IHR5cGVvZiBvcHRzLmRlcHRoID09PSAndW5kZWZpbmVkJyA/IDUgOiBvcHRzLmRlcHRoO1xuICAgIGlmICh0eXBlb2YgZGVwdGggPT09ICd1bmRlZmluZWQnKSB7IGRlcHRoID0gMDsgfVxuICAgIGlmIChkZXB0aCA+PSBtYXhEZXB0aCAmJiBtYXhEZXB0aCA+IDAgJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIGlzQXJyYXkob2JqKSA/ICdbQXJyYXldJyA6ICdbT2JqZWN0XSc7XG4gICAgfVxuXG4gICAgdmFyIGluZGVudCA9IGdldEluZGVudChvcHRzLCBkZXB0aCk7XG5cbiAgICBpZiAodHlwZW9mIHNlZW4gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHNlZW4gPSBbXTtcbiAgICB9IGVsc2UgaWYgKGluZGV4T2Yoc2Vlbiwgb2JqKSA+PSAwKSB7XG4gICAgICAgIHJldHVybiAnW0NpcmN1bGFyXSc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zcGVjdCh2YWx1ZSwgZnJvbSwgbm9JbmRlbnQpIHtcbiAgICAgICAgaWYgKGZyb20pIHtcbiAgICAgICAgICAgIHNlZW4gPSAkYXJyU2xpY2UuY2FsbChzZWVuKTtcbiAgICAgICAgICAgIHNlZW4ucHVzaChmcm9tKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm9JbmRlbnQpIHtcbiAgICAgICAgICAgIHZhciBuZXdPcHRzID0ge1xuICAgICAgICAgICAgICAgIGRlcHRoOiBvcHRzLmRlcHRoXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKGhhcyhvcHRzLCAncXVvdGVTdHlsZScpKSB7XG4gICAgICAgICAgICAgICAgbmV3T3B0cy5xdW90ZVN0eWxlID0gb3B0cy5xdW90ZVN0eWxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGluc3BlY3RfKHZhbHVlLCBuZXdPcHRzLCBkZXB0aCArIDEsIHNlZW4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBpbnNwZWN0Xyh2YWx1ZSwgb3B0cywgZGVwdGggKyAxLCBzZWVuKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ2Z1bmN0aW9uJyAmJiAhaXNSZWdFeHAob2JqKSkgeyAvLyBpbiBvbGRlciBlbmdpbmVzLCByZWdleGVzIGFyZSBjYWxsYWJsZVxuICAgICAgICB2YXIgbmFtZSA9IG5hbWVPZihvYmopO1xuICAgICAgICB2YXIga2V5cyA9IGFyck9iaktleXMob2JqLCBpbnNwZWN0KTtcbiAgICAgICAgcmV0dXJuICdbRnVuY3Rpb24nICsgKG5hbWUgPyAnOiAnICsgbmFtZSA6ICcgKGFub255bW91cyknKSArICddJyArIChrZXlzLmxlbmd0aCA+IDAgPyAnIHsgJyArICRqb2luLmNhbGwoa2V5cywgJywgJykgKyAnIH0nIDogJycpO1xuICAgIH1cbiAgICBpZiAoaXNTeW1ib2wob2JqKSkge1xuICAgICAgICB2YXIgc3ltU3RyaW5nID0gaGFzU2hhbW1lZFN5bWJvbHMgPyAkcmVwbGFjZS5jYWxsKFN0cmluZyhvYmopLCAvXihTeW1ib2xcXCguKlxcKSlfW14pXSokLywgJyQxJykgOiBzeW1Ub1N0cmluZy5jYWxsKG9iaik7XG4gICAgICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAhaGFzU2hhbW1lZFN5bWJvbHMgPyBtYXJrQm94ZWQoc3ltU3RyaW5nKSA6IHN5bVN0cmluZztcbiAgICB9XG4gICAgaWYgKGlzRWxlbWVudChvYmopKSB7XG4gICAgICAgIHZhciBzID0gJzwnICsgJHRvTG93ZXJDYXNlLmNhbGwoU3RyaW5nKG9iai5ub2RlTmFtZSkpO1xuICAgICAgICB2YXIgYXR0cnMgPSBvYmouYXR0cmlidXRlcyB8fCBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhdHRycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcyArPSAnICcgKyBhdHRyc1tpXS5uYW1lICsgJz0nICsgd3JhcFF1b3RlcyhxdW90ZShhdHRyc1tpXS52YWx1ZSksICdkb3VibGUnLCBvcHRzKTtcbiAgICAgICAgfVxuICAgICAgICBzICs9ICc+JztcbiAgICAgICAgaWYgKG9iai5jaGlsZE5vZGVzICYmIG9iai5jaGlsZE5vZGVzLmxlbmd0aCkgeyBzICs9ICcuLi4nOyB9XG4gICAgICAgIHMgKz0gJzwvJyArICR0b0xvd2VyQ2FzZS5jYWxsKFN0cmluZyhvYmoubm9kZU5hbWUpKSArICc+JztcbiAgICAgICAgcmV0dXJuIHM7XG4gICAgfVxuICAgIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAgICAgaWYgKG9iai5sZW5ndGggPT09IDApIHsgcmV0dXJuICdbXSc7IH1cbiAgICAgICAgdmFyIHhzID0gYXJyT2JqS2V5cyhvYmosIGluc3BlY3QpO1xuICAgICAgICBpZiAoaW5kZW50ICYmICFzaW5nbGVMaW5lVmFsdWVzKHhzKSkge1xuICAgICAgICAgICAgcmV0dXJuICdbJyArIGluZGVudGVkSm9pbih4cywgaW5kZW50KSArICddJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJ1sgJyArICRqb2luLmNhbGwoeHMsICcsICcpICsgJyBdJztcbiAgICB9XG4gICAgaWYgKGlzRXJyb3Iob2JqKSkge1xuICAgICAgICB2YXIgcGFydHMgPSBhcnJPYmpLZXlzKG9iaiwgaW5zcGVjdCk7XG4gICAgICAgIGlmICghKCdjYXVzZScgaW4gRXJyb3IucHJvdG90eXBlKSAmJiAnY2F1c2UnIGluIG9iaiAmJiAhaXNFbnVtZXJhYmxlLmNhbGwob2JqLCAnY2F1c2UnKSkge1xuICAgICAgICAgICAgcmV0dXJuICd7IFsnICsgU3RyaW5nKG9iaikgKyAnXSAnICsgJGpvaW4uY2FsbCgkY29uY2F0LmNhbGwoJ1tjYXVzZV06ICcgKyBpbnNwZWN0KG9iai5jYXVzZSksIHBhcnRzKSwgJywgJykgKyAnIH0nO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDApIHsgcmV0dXJuICdbJyArIFN0cmluZyhvYmopICsgJ10nOyB9XG4gICAgICAgIHJldHVybiAneyBbJyArIFN0cmluZyhvYmopICsgJ10gJyArICRqb2luLmNhbGwocGFydHMsICcsICcpICsgJyB9JztcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIGN1c3RvbUluc3BlY3QpIHtcbiAgICAgICAgaWYgKGluc3BlY3RTeW1ib2wgJiYgdHlwZW9mIG9ialtpbnNwZWN0U3ltYm9sXSA9PT0gJ2Z1bmN0aW9uJyAmJiB1dGlsSW5zcGVjdCkge1xuICAgICAgICAgICAgcmV0dXJuIHV0aWxJbnNwZWN0KG9iaiwgeyBkZXB0aDogbWF4RGVwdGggLSBkZXB0aCB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChjdXN0b21JbnNwZWN0ICE9PSAnc3ltYm9sJyAmJiB0eXBlb2Ygb2JqLmluc3BlY3QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiBvYmouaW5zcGVjdCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChpc01hcChvYmopKSB7XG4gICAgICAgIHZhciBtYXBQYXJ0cyA9IFtdO1xuICAgICAgICBpZiAobWFwRm9yRWFjaCkge1xuICAgICAgICAgICAgbWFwRm9yRWFjaC5jYWxsKG9iaiwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgICAgICBtYXBQYXJ0cy5wdXNoKGluc3BlY3Qoa2V5LCBvYmosIHRydWUpICsgJyA9PiAnICsgaW5zcGVjdCh2YWx1ZSwgb2JqKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29sbGVjdGlvbk9mKCdNYXAnLCBtYXBTaXplLmNhbGwob2JqKSwgbWFwUGFydHMsIGluZGVudCk7XG4gICAgfVxuICAgIGlmIChpc1NldChvYmopKSB7XG4gICAgICAgIHZhciBzZXRQYXJ0cyA9IFtdO1xuICAgICAgICBpZiAoc2V0Rm9yRWFjaCkge1xuICAgICAgICAgICAgc2V0Rm9yRWFjaC5jYWxsKG9iaiwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc2V0UGFydHMucHVzaChpbnNwZWN0KHZhbHVlLCBvYmopKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb2xsZWN0aW9uT2YoJ1NldCcsIHNldFNpemUuY2FsbChvYmopLCBzZXRQYXJ0cywgaW5kZW50KTtcbiAgICB9XG4gICAgaWYgKGlzV2Vha01hcChvYmopKSB7XG4gICAgICAgIHJldHVybiB3ZWFrQ29sbGVjdGlvbk9mKCdXZWFrTWFwJyk7XG4gICAgfVxuICAgIGlmIChpc1dlYWtTZXQob2JqKSkge1xuICAgICAgICByZXR1cm4gd2Vha0NvbGxlY3Rpb25PZignV2Vha1NldCcpO1xuICAgIH1cbiAgICBpZiAoaXNXZWFrUmVmKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIHdlYWtDb2xsZWN0aW9uT2YoJ1dlYWtSZWYnKTtcbiAgICB9XG4gICAgaWYgKGlzTnVtYmVyKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIG1hcmtCb3hlZChpbnNwZWN0KE51bWJlcihvYmopKSk7XG4gICAgfVxuICAgIGlmIChpc0JpZ0ludChvYmopKSB7XG4gICAgICAgIHJldHVybiBtYXJrQm94ZWQoaW5zcGVjdChiaWdJbnRWYWx1ZU9mLmNhbGwob2JqKSkpO1xuICAgIH1cbiAgICBpZiAoaXNCb29sZWFuKG9iaikpIHtcbiAgICAgICAgcmV0dXJuIG1hcmtCb3hlZChib29sZWFuVmFsdWVPZi5jYWxsKG9iaikpO1xuICAgIH1cbiAgICBpZiAoaXNTdHJpbmcob2JqKSkge1xuICAgICAgICByZXR1cm4gbWFya0JveGVkKGluc3BlY3QoU3RyaW5nKG9iaikpKTtcbiAgICB9XG4gICAgLy8gbm90ZTogaW4gSUUgOCwgc29tZXRpbWVzIGBnbG9iYWwgIT09IHdpbmRvd2AgYnV0IGJvdGggYXJlIHRoZSBwcm90b3R5cGVzIG9mIGVhY2ggb3RoZXJcbiAgICAvKiBlc2xpbnQtZW52IGJyb3dzZXIgKi9cbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgb2JqID09PSB3aW5kb3cpIHtcbiAgICAgICAgcmV0dXJuICd7IFtvYmplY3QgV2luZG93XSB9JztcbiAgICB9XG4gICAgaWYgKFxuICAgICAgICAodHlwZW9mIGdsb2JhbFRoaXMgIT09ICd1bmRlZmluZWQnICYmIG9iaiA9PT0gZ2xvYmFsVGhpcylcbiAgICAgICAgfHwgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnICYmIG9iaiA9PT0gZ2xvYmFsKVxuICAgICkge1xuICAgICAgICByZXR1cm4gJ3sgW29iamVjdCBnbG9iYWxUaGlzXSB9JztcbiAgICB9XG4gICAgaWYgKCFpc0RhdGUob2JqKSAmJiAhaXNSZWdFeHAob2JqKSkge1xuICAgICAgICB2YXIgeXMgPSBhcnJPYmpLZXlzKG9iaiwgaW5zcGVjdCk7XG4gICAgICAgIHZhciBpc1BsYWluT2JqZWN0ID0gZ1BPID8gZ1BPKG9iaikgPT09IE9iamVjdC5wcm90b3R5cGUgOiBvYmogaW5zdGFuY2VvZiBPYmplY3QgfHwgb2JqLmNvbnN0cnVjdG9yID09PSBPYmplY3Q7XG4gICAgICAgIHZhciBwcm90b1RhZyA9IG9iaiBpbnN0YW5jZW9mIE9iamVjdCA/ICcnIDogJ251bGwgcHJvdG90eXBlJztcbiAgICAgICAgdmFyIHN0cmluZ1RhZyA9ICFpc1BsYWluT2JqZWN0ICYmIHRvU3RyaW5nVGFnICYmIE9iamVjdChvYmopID09PSBvYmogJiYgdG9TdHJpbmdUYWcgaW4gb2JqID8gJHNsaWNlLmNhbGwodG9TdHIob2JqKSwgOCwgLTEpIDogcHJvdG9UYWcgPyAnT2JqZWN0JyA6ICcnO1xuICAgICAgICB2YXIgY29uc3RydWN0b3JUYWcgPSBpc1BsYWluT2JqZWN0IHx8IHR5cGVvZiBvYmouY29uc3RydWN0b3IgIT09ICdmdW5jdGlvbicgPyAnJyA6IG9iai5jb25zdHJ1Y3Rvci5uYW1lID8gb2JqLmNvbnN0cnVjdG9yLm5hbWUgKyAnICcgOiAnJztcbiAgICAgICAgdmFyIHRhZyA9IGNvbnN0cnVjdG9yVGFnICsgKHN0cmluZ1RhZyB8fCBwcm90b1RhZyA/ICdbJyArICRqb2luLmNhbGwoJGNvbmNhdC5jYWxsKFtdLCBzdHJpbmdUYWcgfHwgW10sIHByb3RvVGFnIHx8IFtdKSwgJzogJykgKyAnXSAnIDogJycpO1xuICAgICAgICBpZiAoeXMubGVuZ3RoID09PSAwKSB7IHJldHVybiB0YWcgKyAne30nOyB9XG4gICAgICAgIGlmIChpbmRlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0YWcgKyAneycgKyBpbmRlbnRlZEpvaW4oeXMsIGluZGVudCkgKyAnfSc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRhZyArICd7ICcgKyAkam9pbi5jYWxsKHlzLCAnLCAnKSArICcgfSc7XG4gICAgfVxuICAgIHJldHVybiBTdHJpbmcob2JqKTtcbn07XG5cbmZ1bmN0aW9uIHdyYXBRdW90ZXMocywgZGVmYXVsdFN0eWxlLCBvcHRzKSB7XG4gICAgdmFyIHN0eWxlID0gb3B0cy5xdW90ZVN0eWxlIHx8IGRlZmF1bHRTdHlsZTtcbiAgICB2YXIgcXVvdGVDaGFyID0gcXVvdGVzW3N0eWxlXTtcbiAgICByZXR1cm4gcXVvdGVDaGFyICsgcyArIHF1b3RlQ2hhcjtcbn1cblxuZnVuY3Rpb24gcXVvdGUocykge1xuICAgIHJldHVybiAkcmVwbGFjZS5jYWxsKFN0cmluZyhzKSwgL1wiL2csICcmcXVvdDsnKTtcbn1cblxuZnVuY3Rpb24gaXNBcnJheShvYmopIHsgcmV0dXJuIHRvU3RyKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XScgJiYgKCF0b1N0cmluZ1RhZyB8fCAhKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIHRvU3RyaW5nVGFnIGluIG9iaikpOyB9XG5mdW5jdGlvbiBpc0RhdGUob2JqKSB7IHJldHVybiB0b1N0cihvYmopID09PSAnW29iamVjdCBEYXRlXScgJiYgKCF0b1N0cmluZ1RhZyB8fCAhKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIHRvU3RyaW5nVGFnIGluIG9iaikpOyB9XG5mdW5jdGlvbiBpc1JlZ0V4cChvYmopIHsgcmV0dXJuIHRvU3RyKG9iaikgPT09ICdbb2JqZWN0IFJlZ0V4cF0nICYmICghdG9TdHJpbmdUYWcgfHwgISh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiB0b1N0cmluZ1RhZyBpbiBvYmopKTsgfVxuZnVuY3Rpb24gaXNFcnJvcihvYmopIHsgcmV0dXJuIHRvU3RyKG9iaikgPT09ICdbb2JqZWN0IEVycm9yXScgJiYgKCF0b1N0cmluZ1RhZyB8fCAhKHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIHRvU3RyaW5nVGFnIGluIG9iaikpOyB9XG5mdW5jdGlvbiBpc1N0cmluZyhvYmopIHsgcmV0dXJuIHRvU3RyKG9iaikgPT09ICdbb2JqZWN0IFN0cmluZ10nICYmICghdG9TdHJpbmdUYWcgfHwgISh0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiB0b1N0cmluZ1RhZyBpbiBvYmopKTsgfVxuZnVuY3Rpb24gaXNOdW1iZXIob2JqKSB7IHJldHVybiB0b1N0cihvYmopID09PSAnW29iamVjdCBOdW1iZXJdJyAmJiAoIXRvU3RyaW5nVGFnIHx8ICEodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgdG9TdHJpbmdUYWcgaW4gb2JqKSk7IH1cbmZ1bmN0aW9uIGlzQm9vbGVhbihvYmopIHsgcmV0dXJuIHRvU3RyKG9iaikgPT09ICdbb2JqZWN0IEJvb2xlYW5dJyAmJiAoIXRvU3RyaW5nVGFnIHx8ICEodHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgdG9TdHJpbmdUYWcgaW4gb2JqKSk7IH1cblxuLy8gU3ltYm9sIGFuZCBCaWdJbnQgZG8gaGF2ZSBTeW1ib2wudG9TdHJpbmdUYWcgYnkgc3BlYywgc28gdGhhdCBjYW4ndCBiZSB1c2VkIHRvIGVsaW1pbmF0ZSBmYWxzZSBwb3NpdGl2ZXNcbmZ1bmN0aW9uIGlzU3ltYm9sKG9iaikge1xuICAgIGlmIChoYXNTaGFtbWVkU3ltYm9scykge1xuICAgICAgICByZXR1cm4gb2JqICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIG9iaiBpbnN0YW5jZW9mIFN5bWJvbDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICdzeW1ib2wnKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JyB8fCAhc3ltVG9TdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBzeW1Ub1N0cmluZy5jYWxsKG9iaik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuXG5mdW5jdGlvbiBpc0JpZ0ludChvYmopIHtcbiAgICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JyB8fCAhYmlnSW50VmFsdWVPZikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGJpZ0ludFZhbHVlT2YuY2FsbChvYmopO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxudmFyIGhhc093biA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkgfHwgZnVuY3Rpb24gKGtleSkgeyByZXR1cm4ga2V5IGluIHRoaXM7IH07XG5mdW5jdGlvbiBoYXMob2JqLCBrZXkpIHtcbiAgICByZXR1cm4gaGFzT3duLmNhbGwob2JqLCBrZXkpO1xufVxuXG5mdW5jdGlvbiB0b1N0cihvYmopIHtcbiAgICByZXR1cm4gb2JqZWN0VG9TdHJpbmcuY2FsbChvYmopO1xufVxuXG5mdW5jdGlvbiBuYW1lT2YoZikge1xuICAgIGlmIChmLm5hbWUpIHsgcmV0dXJuIGYubmFtZTsgfVxuICAgIHZhciBtID0gJG1hdGNoLmNhbGwoZnVuY3Rpb25Ub1N0cmluZy5jYWxsKGYpLCAvXmZ1bmN0aW9uXFxzKihbXFx3JF0rKS8pO1xuICAgIGlmIChtKSB7IHJldHVybiBtWzFdOyB9XG4gICAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIGluZGV4T2YoeHMsIHgpIHtcbiAgICBpZiAoeHMuaW5kZXhPZikgeyByZXR1cm4geHMuaW5kZXhPZih4KTsgfVxuICAgIGZvciAodmFyIGkgPSAwLCBsID0geHMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgIGlmICh4c1tpXSA9PT0geCkgeyByZXR1cm4gaTsgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG59XG5cbmZ1bmN0aW9uIGlzTWFwKHgpIHtcbiAgICBpZiAoIW1hcFNpemUgfHwgIXggfHwgdHlwZW9mIHggIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgbWFwU2l6ZS5jYWxsKHgpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgc2V0U2l6ZS5jYWxsKHgpO1xuICAgICAgICB9IGNhdGNoIChzKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geCBpbnN0YW5jZW9mIE1hcDsgLy8gY29yZS1qcyB3b3JrYXJvdW5kLCBwcmUtdjIuNS4wXG4gICAgfSBjYXRjaCAoZSkge31cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGlzV2Vha01hcCh4KSB7XG4gICAgaWYgKCF3ZWFrTWFwSGFzIHx8ICF4IHx8IHR5cGVvZiB4ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHdlYWtNYXBIYXMuY2FsbCh4LCB3ZWFrTWFwSGFzKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHdlYWtTZXRIYXMuY2FsbCh4LCB3ZWFrU2V0SGFzKTtcbiAgICAgICAgfSBjYXRjaCAocykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHggaW5zdGFuY2VvZiBXZWFrTWFwOyAvLyBjb3JlLWpzIHdvcmthcm91bmQsIHByZS12Mi41LjBcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gaXNXZWFrUmVmKHgpIHtcbiAgICBpZiAoIXdlYWtSZWZEZXJlZiB8fCAheCB8fCB0eXBlb2YgeCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICB3ZWFrUmVmRGVyZWYuY2FsbCh4KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGlzU2V0KHgpIHtcbiAgICBpZiAoIXNldFNpemUgfHwgIXggfHwgdHlwZW9mIHggIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgc2V0U2l6ZS5jYWxsKHgpO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbWFwU2l6ZS5jYWxsKHgpO1xuICAgICAgICB9IGNhdGNoIChtKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geCBpbnN0YW5jZW9mIFNldDsgLy8gY29yZS1qcyB3b3JrYXJvdW5kLCBwcmUtdjIuNS4wXG4gICAgfSBjYXRjaCAoZSkge31cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGlzV2Vha1NldCh4KSB7XG4gICAgaWYgKCF3ZWFrU2V0SGFzIHx8ICF4IHx8IHR5cGVvZiB4ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIHdlYWtTZXRIYXMuY2FsbCh4LCB3ZWFrU2V0SGFzKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHdlYWtNYXBIYXMuY2FsbCh4LCB3ZWFrTWFwSGFzKTtcbiAgICAgICAgfSBjYXRjaCAocykge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHggaW5zdGFuY2VvZiBXZWFrU2V0OyAvLyBjb3JlLWpzIHdvcmthcm91bmQsIHByZS12Mi41LjBcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gaXNFbGVtZW50KHgpIHtcbiAgICBpZiAoIXggfHwgdHlwZW9mIHggIT09ICdvYmplY3QnKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIGlmICh0eXBlb2YgSFRNTEVsZW1lbnQgIT09ICd1bmRlZmluZWQnICYmIHggaW5zdGFuY2VvZiBIVE1MRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHR5cGVvZiB4Lm5vZGVOYW1lID09PSAnc3RyaW5nJyAmJiB0eXBlb2YgeC5nZXRBdHRyaWJ1dGUgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGluc3BlY3RTdHJpbmcoc3RyLCBvcHRzKSB7XG4gICAgaWYgKHN0ci5sZW5ndGggPiBvcHRzLm1heFN0cmluZ0xlbmd0aCkge1xuICAgICAgICB2YXIgcmVtYWluaW5nID0gc3RyLmxlbmd0aCAtIG9wdHMubWF4U3RyaW5nTGVuZ3RoO1xuICAgICAgICB2YXIgdHJhaWxlciA9ICcuLi4gJyArIHJlbWFpbmluZyArICcgbW9yZSBjaGFyYWN0ZXInICsgKHJlbWFpbmluZyA+IDEgPyAncycgOiAnJyk7XG4gICAgICAgIHJldHVybiBpbnNwZWN0U3RyaW5nKCRzbGljZS5jYWxsKHN0ciwgMCwgb3B0cy5tYXhTdHJpbmdMZW5ndGgpLCBvcHRzKSArIHRyYWlsZXI7XG4gICAgfVxuICAgIHZhciBxdW90ZVJFID0gcXVvdGVSRXNbb3B0cy5xdW90ZVN0eWxlIHx8ICdzaW5nbGUnXTtcbiAgICBxdW90ZVJFLmxhc3RJbmRleCA9IDA7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnRyb2wtcmVnZXhcbiAgICB2YXIgcyA9ICRyZXBsYWNlLmNhbGwoJHJlcGxhY2UuY2FsbChzdHIsIHF1b3RlUkUsICdcXFxcJDEnKSwgL1tcXHgwMC1cXHgxZl0vZywgbG93Ynl0ZSk7XG4gICAgcmV0dXJuIHdyYXBRdW90ZXMocywgJ3NpbmdsZScsIG9wdHMpO1xufVxuXG5mdW5jdGlvbiBsb3dieXRlKGMpIHtcbiAgICB2YXIgbiA9IGMuY2hhckNvZGVBdCgwKTtcbiAgICB2YXIgeCA9IHtcbiAgICAgICAgODogJ2InLFxuICAgICAgICA5OiAndCcsXG4gICAgICAgIDEwOiAnbicsXG4gICAgICAgIDEyOiAnZicsXG4gICAgICAgIDEzOiAncidcbiAgICB9W25dO1xuICAgIGlmICh4KSB7IHJldHVybiAnXFxcXCcgKyB4OyB9XG4gICAgcmV0dXJuICdcXFxceCcgKyAobiA8IDB4MTAgPyAnMCcgOiAnJykgKyAkdG9VcHBlckNhc2UuY2FsbChuLnRvU3RyaW5nKDE2KSk7XG59XG5cbmZ1bmN0aW9uIG1hcmtCb3hlZChzdHIpIHtcbiAgICByZXR1cm4gJ09iamVjdCgnICsgc3RyICsgJyknO1xufVxuXG5mdW5jdGlvbiB3ZWFrQ29sbGVjdGlvbk9mKHR5cGUpIHtcbiAgICByZXR1cm4gdHlwZSArICcgeyA/IH0nO1xufVxuXG5mdW5jdGlvbiBjb2xsZWN0aW9uT2YodHlwZSwgc2l6ZSwgZW50cmllcywgaW5kZW50KSB7XG4gICAgdmFyIGpvaW5lZEVudHJpZXMgPSBpbmRlbnQgPyBpbmRlbnRlZEpvaW4oZW50cmllcywgaW5kZW50KSA6ICRqb2luLmNhbGwoZW50cmllcywgJywgJyk7XG4gICAgcmV0dXJuIHR5cGUgKyAnICgnICsgc2l6ZSArICcpIHsnICsgam9pbmVkRW50cmllcyArICd9Jztcbn1cblxuZnVuY3Rpb24gc2luZ2xlTGluZVZhbHVlcyh4cykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgeHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGluZGV4T2YoeHNbaV0sICdcXG4nKSA+PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGdldEluZGVudChvcHRzLCBkZXB0aCkge1xuICAgIHZhciBiYXNlSW5kZW50O1xuICAgIGlmIChvcHRzLmluZGVudCA9PT0gJ1xcdCcpIHtcbiAgICAgICAgYmFzZUluZGVudCA9ICdcXHQnO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIG9wdHMuaW5kZW50ID09PSAnbnVtYmVyJyAmJiBvcHRzLmluZGVudCA+IDApIHtcbiAgICAgICAgYmFzZUluZGVudCA9ICRqb2luLmNhbGwoQXJyYXkob3B0cy5pbmRlbnQgKyAxKSwgJyAnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYmFzZTogYmFzZUluZGVudCxcbiAgICAgICAgcHJldjogJGpvaW4uY2FsbChBcnJheShkZXB0aCArIDEpLCBiYXNlSW5kZW50KVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIGluZGVudGVkSm9pbih4cywgaW5kZW50KSB7XG4gICAgaWYgKHhzLmxlbmd0aCA9PT0gMCkgeyByZXR1cm4gJyc7IH1cbiAgICB2YXIgbGluZUpvaW5lciA9ICdcXG4nICsgaW5kZW50LnByZXYgKyBpbmRlbnQuYmFzZTtcbiAgICByZXR1cm4gbGluZUpvaW5lciArICRqb2luLmNhbGwoeHMsICcsJyArIGxpbmVKb2luZXIpICsgJ1xcbicgKyBpbmRlbnQucHJldjtcbn1cblxuZnVuY3Rpb24gYXJyT2JqS2V5cyhvYmosIGluc3BlY3QpIHtcbiAgICB2YXIgaXNBcnIgPSBpc0FycmF5KG9iaik7XG4gICAgdmFyIHhzID0gW107XG4gICAgaWYgKGlzQXJyKSB7XG4gICAgICAgIHhzLmxlbmd0aCA9IG9iai5sZW5ndGg7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB4c1tpXSA9IGhhcyhvYmosIGkpID8gaW5zcGVjdChvYmpbaV0sIG9iaikgOiAnJztcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIgc3ltcyA9IHR5cGVvZiBnT1BTID09PSAnZnVuY3Rpb24nID8gZ09QUyhvYmopIDogW107XG4gICAgdmFyIHN5bU1hcDtcbiAgICBpZiAoaGFzU2hhbW1lZFN5bWJvbHMpIHtcbiAgICAgICAgc3ltTWFwID0ge307XG4gICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgc3ltcy5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgc3ltTWFwWyckJyArIHN5bXNba11dID0gc3ltc1trXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheFxuICAgICAgICBpZiAoIWhhcyhvYmosIGtleSkpIHsgY29udGludWU7IH0gLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1yZXN0cmljdGVkLXN5bnRheCwgbm8tY29udGludWVcbiAgICAgICAgaWYgKGlzQXJyICYmIFN0cmluZyhOdW1iZXIoa2V5KSkgPT09IGtleSAmJiBrZXkgPCBvYmoubGVuZ3RoKSB7IGNvbnRpbnVlOyB9IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXgsIG5vLWNvbnRpbnVlXG4gICAgICAgIGlmIChoYXNTaGFtbWVkU3ltYm9scyAmJiBzeW1NYXBbJyQnICsga2V5XSBpbnN0YW5jZW9mIFN5bWJvbCkge1xuICAgICAgICAgICAgLy8gdGhpcyBpcyB0byBwcmV2ZW50IHNoYW1tZWQgU3ltYm9scywgd2hpY2ggYXJlIHN0b3JlZCBhcyBzdHJpbmdzLCBmcm9tIGJlaW5nIGluY2x1ZGVkIGluIHRoZSBzdHJpbmcga2V5IHNlY3Rpb25cbiAgICAgICAgICAgIGNvbnRpbnVlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4LCBuby1jb250aW51ZVxuICAgICAgICB9IGVsc2UgaWYgKCR0ZXN0LmNhbGwoL1teXFx3JF0vLCBrZXkpKSB7XG4gICAgICAgICAgICB4cy5wdXNoKGluc3BlY3Qoa2V5LCBvYmopICsgJzogJyArIGluc3BlY3Qob2JqW2tleV0sIG9iaikpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgeHMucHVzaChrZXkgKyAnOiAnICsgaW5zcGVjdChvYmpba2V5XSwgb2JqKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHR5cGVvZiBnT1BTID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc3ltcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgaWYgKGlzRW51bWVyYWJsZS5jYWxsKG9iaiwgc3ltc1tqXSkpIHtcbiAgICAgICAgICAgICAgICB4cy5wdXNoKCdbJyArIGluc3BlY3Qoc3ltc1tqXSkgKyAnXTogJyArIGluc3BlY3Qob2JqW3N5bXNbal1dLCBvYmopKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4geHM7XG59XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgR2V0SW50cmluc2ljID0gcmVxdWlyZSgnZ2V0LWludHJpbnNpYycpO1xudmFyIGNhbGxCb3VuZCA9IHJlcXVpcmUoJ2NhbGwtYmluZC9jYWxsQm91bmQnKTtcbnZhciBpbnNwZWN0ID0gcmVxdWlyZSgnb2JqZWN0LWluc3BlY3QnKTtcblxudmFyICRUeXBlRXJyb3IgPSByZXF1aXJlKCdlcy1lcnJvcnMvdHlwZScpO1xudmFyICRXZWFrTWFwID0gR2V0SW50cmluc2ljKCclV2Vha01hcCUnLCB0cnVlKTtcbnZhciAkTWFwID0gR2V0SW50cmluc2ljKCclTWFwJScsIHRydWUpO1xuXG52YXIgJHdlYWtNYXBHZXQgPSBjYWxsQm91bmQoJ1dlYWtNYXAucHJvdG90eXBlLmdldCcsIHRydWUpO1xudmFyICR3ZWFrTWFwU2V0ID0gY2FsbEJvdW5kKCdXZWFrTWFwLnByb3RvdHlwZS5zZXQnLCB0cnVlKTtcbnZhciAkd2Vha01hcEhhcyA9IGNhbGxCb3VuZCgnV2Vha01hcC5wcm90b3R5cGUuaGFzJywgdHJ1ZSk7XG52YXIgJG1hcEdldCA9IGNhbGxCb3VuZCgnTWFwLnByb3RvdHlwZS5nZXQnLCB0cnVlKTtcbnZhciAkbWFwU2V0ID0gY2FsbEJvdW5kKCdNYXAucHJvdG90eXBlLnNldCcsIHRydWUpO1xudmFyICRtYXBIYXMgPSBjYWxsQm91bmQoJ01hcC5wcm90b3R5cGUuaGFzJywgdHJ1ZSk7XG5cbi8qXG4qIFRoaXMgZnVuY3Rpb24gdHJhdmVyc2VzIHRoZSBsaXN0IHJldHVybmluZyB0aGUgbm9kZSBjb3JyZXNwb25kaW5nIHRvIHRoZSBnaXZlbiBrZXkuXG4qXG4qIFRoYXQgbm9kZSBpcyBhbHNvIG1vdmVkIHRvIHRoZSBoZWFkIG9mIHRoZSBsaXN0LCBzbyB0aGF0IGlmIGl0J3MgYWNjZXNzZWQgYWdhaW4gd2UgZG9uJ3QgbmVlZCB0byB0cmF2ZXJzZSB0aGUgd2hvbGUgbGlzdC4gQnkgZG9pbmcgc28sIGFsbCB0aGUgcmVjZW50bHkgdXNlZCBub2RlcyBjYW4gYmUgYWNjZXNzZWQgcmVsYXRpdmVseSBxdWlja2x5LlxuKi9cbi8qKiBAdHlwZSB7aW1wb3J0KCcuJykubGlzdEdldE5vZGV9ICovXG52YXIgbGlzdEdldE5vZGUgPSBmdW5jdGlvbiAobGlzdCwga2V5KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY29uc2lzdGVudC1yZXR1cm5cblx0LyoqIEB0eXBlIHt0eXBlb2YgbGlzdCB8IE5vbk51bGxhYmxlPCh0eXBlb2YgbGlzdClbJ25leHQnXT59ICovXG5cdHZhciBwcmV2ID0gbGlzdDtcblx0LyoqIEB0eXBlIHsodHlwZW9mIGxpc3QpWyduZXh0J119ICovXG5cdHZhciBjdXJyO1xuXHRmb3IgKDsgKGN1cnIgPSBwcmV2Lm5leHQpICE9PSBudWxsOyBwcmV2ID0gY3Vycikge1xuXHRcdGlmIChjdXJyLmtleSA9PT0ga2V5KSB7XG5cdFx0XHRwcmV2Lm5leHQgPSBjdXJyLm5leHQ7XG5cdFx0XHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tZXh0cmEtcGFyZW5zXG5cdFx0XHRjdXJyLm5leHQgPSAvKiogQHR5cGUge05vbk51bGxhYmxlPHR5cGVvZiBsaXN0Lm5leHQ+fSAqLyAobGlzdC5uZXh0KTtcblx0XHRcdGxpc3QubmV4dCA9IGN1cnI7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cblx0XHRcdHJldHVybiBjdXJyO1xuXHRcdH1cblx0fVxufTtcblxuLyoqIEB0eXBlIHtpbXBvcnQoJy4nKS5saXN0R2V0fSAqL1xudmFyIGxpc3RHZXQgPSBmdW5jdGlvbiAob2JqZWN0cywga2V5KSB7XG5cdHZhciBub2RlID0gbGlzdEdldE5vZGUob2JqZWN0cywga2V5KTtcblx0cmV0dXJuIG5vZGUgJiYgbm9kZS52YWx1ZTtcbn07XG4vKiogQHR5cGUge2ltcG9ydCgnLicpLmxpc3RTZXR9ICovXG52YXIgbGlzdFNldCA9IGZ1bmN0aW9uIChvYmplY3RzLCBrZXksIHZhbHVlKSB7XG5cdHZhciBub2RlID0gbGlzdEdldE5vZGUob2JqZWN0cywga2V5KTtcblx0aWYgKG5vZGUpIHtcblx0XHRub2RlLnZhbHVlID0gdmFsdWU7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gUHJlcGVuZCB0aGUgbmV3IG5vZGUgdG8gdGhlIGJlZ2lubmluZyBvZiB0aGUgbGlzdFxuXHRcdG9iamVjdHMubmV4dCA9IC8qKiBAdHlwZSB7aW1wb3J0KCcuJykuTGlzdE5vZGU8dHlwZW9mIHZhbHVlPn0gKi8gKHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnbiwgbm8tZXh0cmEtcGFyZW5zXG5cdFx0XHRrZXk6IGtleSxcblx0XHRcdG5leHQ6IG9iamVjdHMubmV4dCxcblx0XHRcdHZhbHVlOiB2YWx1ZVxuXHRcdH0pO1xuXHR9XG59O1xuLyoqIEB0eXBlIHtpbXBvcnQoJy4nKS5saXN0SGFzfSAqL1xudmFyIGxpc3RIYXMgPSBmdW5jdGlvbiAob2JqZWN0cywga2V5KSB7XG5cdHJldHVybiAhIWxpc3RHZXROb2RlKG9iamVjdHMsIGtleSk7XG59O1xuXG4vKiogQHR5cGUge2ltcG9ydCgnLicpfSAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXRTaWRlQ2hhbm5lbCgpIHtcblx0LyoqIEB0eXBlIHtXZWFrTWFwPG9iamVjdCwgdW5rbm93bj59ICovIHZhciAkd207XG5cdC8qKiBAdHlwZSB7TWFwPG9iamVjdCwgdW5rbm93bj59ICovIHZhciAkbTtcblx0LyoqIEB0eXBlIHtpbXBvcnQoJy4nKS5Sb290Tm9kZTx1bmtub3duPn0gKi8gdmFyICRvO1xuXG5cdC8qKiBAdHlwZSB7aW1wb3J0KCcuJykuQ2hhbm5lbH0gKi9cblx0dmFyIGNoYW5uZWwgPSB7XG5cdFx0YXNzZXJ0OiBmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRpZiAoIWNoYW5uZWwuaGFzKGtleSkpIHtcblx0XHRcdFx0dGhyb3cgbmV3ICRUeXBlRXJyb3IoJ1NpZGUgY2hhbm5lbCBkb2VzIG5vdCBjb250YWluICcgKyBpbnNwZWN0KGtleSkpO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0Z2V0OiBmdW5jdGlvbiAoa2V5KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY29uc2lzdGVudC1yZXR1cm5cblx0XHRcdGlmICgkV2Vha01hcCAmJiBrZXkgJiYgKHR5cGVvZiBrZXkgPT09ICdvYmplY3QnIHx8IHR5cGVvZiBrZXkgPT09ICdmdW5jdGlvbicpKSB7XG5cdFx0XHRcdGlmICgkd20pIHtcblx0XHRcdFx0XHRyZXR1cm4gJHdlYWtNYXBHZXQoJHdtLCBrZXkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKCRNYXApIHtcblx0XHRcdFx0aWYgKCRtKSB7XG5cdFx0XHRcdFx0cmV0dXJuICRtYXBHZXQoJG0sIGtleSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICgkbykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWxvbmVseS1pZlxuXHRcdFx0XHRcdHJldHVybiBsaXN0R2V0KCRvLCBrZXkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRoYXM6IGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdGlmICgkV2Vha01hcCAmJiBrZXkgJiYgKHR5cGVvZiBrZXkgPT09ICdvYmplY3QnIHx8IHR5cGVvZiBrZXkgPT09ICdmdW5jdGlvbicpKSB7XG5cdFx0XHRcdGlmICgkd20pIHtcblx0XHRcdFx0XHRyZXR1cm4gJHdlYWtNYXBIYXMoJHdtLCBrZXkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKCRNYXApIHtcblx0XHRcdFx0aWYgKCRtKSB7XG5cdFx0XHRcdFx0cmV0dXJuICRtYXBIYXMoJG0sIGtleSk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICgkbykgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWxvbmVseS1pZlxuXHRcdFx0XHRcdHJldHVybiBsaXN0SGFzKCRvLCBrZXkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fSxcblx0XHRzZXQ6IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG5cdFx0XHRpZiAoJFdlYWtNYXAgJiYga2V5ICYmICh0eXBlb2Yga2V5ID09PSAnb2JqZWN0JyB8fCB0eXBlb2Yga2V5ID09PSAnZnVuY3Rpb24nKSkge1xuXHRcdFx0XHRpZiAoISR3bSkge1xuXHRcdFx0XHRcdCR3bSA9IG5ldyAkV2Vha01hcCgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdCR3ZWFrTWFwU2V0KCR3bSwga2V5LCB2YWx1ZSk7XG5cdFx0XHR9IGVsc2UgaWYgKCRNYXApIHtcblx0XHRcdFx0aWYgKCEkbSkge1xuXHRcdFx0XHRcdCRtID0gbmV3ICRNYXAoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHQkbWFwU2V0KCRtLCBrZXksIHZhbHVlKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGlmICghJG8pIHtcblx0XHRcdFx0XHQvLyBJbml0aWFsaXplIHRoZSBsaW5rZWQgbGlzdCBhcyBhbiBlbXB0eSBub2RlLCBzbyB0aGF0IHdlIGRvbid0IGhhdmUgdG8gc3BlY2lhbC1jYXNlIGhhbmRsaW5nIG9mIHRoZSBmaXJzdCBub2RlOiB3ZSBjYW4gYWx3YXlzIHJlZmVyIHRvIGl0IGFzIChwcmV2aW91cyBub2RlKS5uZXh0LCBpbnN0ZWFkIG9mIHNvbWV0aGluZyBsaWtlIChsaXN0KS5oZWFkXG5cdFx0XHRcdFx0JG8gPSB7IGtleToge30sIG5leHQ6IG51bGwgfTtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0U2V0KCRvLCBrZXksIHZhbHVlKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cdHJldHVybiBjaGFubmVsO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciByZXBsYWNlID0gU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlO1xudmFyIHBlcmNlbnRUd2VudGllcyA9IC8lMjAvZztcblxudmFyIEZvcm1hdCA9IHtcbiAgICBSRkMxNzM4OiAnUkZDMTczOCcsXG4gICAgUkZDMzk4NjogJ1JGQzM5ODYnXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAnZGVmYXVsdCc6IEZvcm1hdC5SRkMzOTg2LFxuICAgIGZvcm1hdHRlcnM6IHtcbiAgICAgICAgUkZDMTczODogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVwbGFjZS5jYWxsKHZhbHVlLCBwZXJjZW50VHdlbnRpZXMsICcrJyk7XG4gICAgICAgIH0sXG4gICAgICAgIFJGQzM5ODY6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIFN0cmluZyh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFJGQzE3Mzg6IEZvcm1hdC5SRkMxNzM4LFxuICAgIFJGQzM5ODY6IEZvcm1hdC5SRkMzOTg2XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIGZvcm1hdHMgPSByZXF1aXJlKCcuL2Zvcm1hdHMnKTtcblxudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbnZhciBoZXhUYWJsZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFycmF5ID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICAgICAgICBhcnJheS5wdXNoKCclJyArICgoaSA8IDE2ID8gJzAnIDogJycpICsgaS50b1N0cmluZygxNikpLnRvVXBwZXJDYXNlKCkpO1xuICAgIH1cblxuICAgIHJldHVybiBhcnJheTtcbn0oKSk7XG5cbnZhciBjb21wYWN0UXVldWUgPSBmdW5jdGlvbiBjb21wYWN0UXVldWUocXVldWUpIHtcbiAgICB3aGlsZSAocXVldWUubGVuZ3RoID4gMSkge1xuICAgICAgICB2YXIgaXRlbSA9IHF1ZXVlLnBvcCgpO1xuICAgICAgICB2YXIgb2JqID0gaXRlbS5vYmpbaXRlbS5wcm9wXTtcblxuICAgICAgICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgICB2YXIgY29tcGFjdGVkID0gW107XG5cbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgb2JqLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmpbal0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBhY3RlZC5wdXNoKG9ialtqXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpdGVtLm9ialtpdGVtLnByb3BdID0gY29tcGFjdGVkO1xuICAgICAgICB9XG4gICAgfVxufTtcblxudmFyIGFycmF5VG9PYmplY3QgPSBmdW5jdGlvbiBhcnJheVRvT2JqZWN0KHNvdXJjZSwgb3B0aW9ucykge1xuICAgIHZhciBvYmogPSBvcHRpb25zICYmIG9wdGlvbnMucGxhaW5PYmplY3RzID8gT2JqZWN0LmNyZWF0ZShudWxsKSA6IHt9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc291cmNlW2ldICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgb2JqW2ldID0gc291cmNlW2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbn07XG5cbnZhciBtZXJnZSA9IGZ1bmN0aW9uIG1lcmdlKHRhcmdldCwgc291cmNlLCBvcHRpb25zKSB7XG4gICAgLyogZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOiAwICovXG4gICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHNvdXJjZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKGlzQXJyYXkodGFyZ2V0KSkge1xuICAgICAgICAgICAgdGFyZ2V0LnB1c2goc291cmNlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0YXJnZXQgJiYgdHlwZW9mIHRhcmdldCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIGlmICgob3B0aW9ucyAmJiAob3B0aW9ucy5wbGFpbk9iamVjdHMgfHwgb3B0aW9ucy5hbGxvd1Byb3RvdHlwZXMpKSB8fCAhaGFzLmNhbGwoT2JqZWN0LnByb3RvdHlwZSwgc291cmNlKSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtzb3VyY2VdID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBbdGFyZ2V0LCBzb3VyY2VdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICBpZiAoIXRhcmdldCB8fCB0eXBlb2YgdGFyZ2V0ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gW3RhcmdldF0uY29uY2F0KHNvdXJjZSk7XG4gICAgfVxuXG4gICAgdmFyIG1lcmdlVGFyZ2V0ID0gdGFyZ2V0O1xuICAgIGlmIChpc0FycmF5KHRhcmdldCkgJiYgIWlzQXJyYXkoc291cmNlKSkge1xuICAgICAgICBtZXJnZVRhcmdldCA9IGFycmF5VG9PYmplY3QodGFyZ2V0LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBpZiAoaXNBcnJheSh0YXJnZXQpICYmIGlzQXJyYXkoc291cmNlKSkge1xuICAgICAgICBzb3VyY2UuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaSkge1xuICAgICAgICAgICAgaWYgKGhhcy5jYWxsKHRhcmdldCwgaSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0SXRlbSA9IHRhcmdldFtpXTtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0SXRlbSAmJiB0eXBlb2YgdGFyZ2V0SXRlbSA9PT0gJ29iamVjdCcgJiYgaXRlbSAmJiB0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W2ldID0gbWVyZ2UodGFyZ2V0SXRlbSwgaXRlbSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbaV0gPSBpdGVtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmtleXMoc291cmNlKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywga2V5KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHNvdXJjZVtrZXldO1xuXG4gICAgICAgIGlmIChoYXMuY2FsbChhY2MsIGtleSkpIHtcbiAgICAgICAgICAgIGFjY1trZXldID0gbWVyZ2UoYWNjW2tleV0sIHZhbHVlLCBvcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFjY1trZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCBtZXJnZVRhcmdldCk7XG59O1xuXG52YXIgYXNzaWduID0gZnVuY3Rpb24gYXNzaWduU2luZ2xlU291cmNlKHRhcmdldCwgc291cmNlKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHNvdXJjZSkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGtleSkge1xuICAgICAgICBhY2Nba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHRhcmdldCk7XG59O1xuXG52YXIgZGVjb2RlID0gZnVuY3Rpb24gKHN0ciwgZGVjb2RlciwgY2hhcnNldCkge1xuICAgIHZhciBzdHJXaXRob3V0UGx1cyA9IHN0ci5yZXBsYWNlKC9cXCsvZywgJyAnKTtcbiAgICBpZiAoY2hhcnNldCA9PT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgIC8vIHVuZXNjYXBlIG5ldmVyIHRocm93cywgbm8gdHJ5Li4uY2F0Y2ggbmVlZGVkOlxuICAgICAgICByZXR1cm4gc3RyV2l0aG91dFBsdXMucmVwbGFjZSgvJVswLTlhLWZdezJ9L2dpLCB1bmVzY2FwZSk7XG4gICAgfVxuICAgIC8vIHV0Zi04XG4gICAgdHJ5IHtcbiAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChzdHJXaXRob3V0UGx1cyk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICByZXR1cm4gc3RyV2l0aG91dFBsdXM7XG4gICAgfVxufTtcblxudmFyIGVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShzdHIsIGRlZmF1bHRFbmNvZGVyLCBjaGFyc2V0LCBraW5kLCBmb3JtYXQpIHtcbiAgICAvLyBUaGlzIGNvZGUgd2FzIG9yaWdpbmFsbHkgd3JpdHRlbiBieSBCcmlhbiBXaGl0ZSAobXNjZGV4KSBmb3IgdGhlIGlvLmpzIGNvcmUgcXVlcnlzdHJpbmcgbGlicmFyeS5cbiAgICAvLyBJdCBoYXMgYmVlbiBhZGFwdGVkIGhlcmUgZm9yIHN0cmljdGVyIGFkaGVyZW5jZSB0byBSRkMgMzk4NlxuICAgIGlmIChzdHIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgdmFyIHN0cmluZyA9IHN0cjtcbiAgICBpZiAodHlwZW9mIHN0ciA9PT0gJ3N5bWJvbCcpIHtcbiAgICAgICAgc3RyaW5nID0gU3ltYm9sLnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN0cik7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuICAgICAgICBzdHJpbmcgPSBTdHJpbmcoc3RyKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhcnNldCA9PT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgIHJldHVybiBlc2NhcGUoc3RyaW5nKS5yZXBsYWNlKC8ldVswLTlhLWZdezR9L2dpLCBmdW5jdGlvbiAoJDApIHtcbiAgICAgICAgICAgIHJldHVybiAnJTI2JTIzJyArIHBhcnNlSW50KCQwLnNsaWNlKDIpLCAxNikgKyAnJTNCJztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIG91dCA9ICcnO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBjID0gc3RyaW5nLmNoYXJDb2RlQXQoaSk7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgYyA9PT0gMHgyRCAvLyAtXG4gICAgICAgICAgICB8fCBjID09PSAweDJFIC8vIC5cbiAgICAgICAgICAgIHx8IGMgPT09IDB4NUYgLy8gX1xuICAgICAgICAgICAgfHwgYyA9PT0gMHg3RSAvLyB+XG4gICAgICAgICAgICB8fCAoYyA+PSAweDMwICYmIGMgPD0gMHgzOSkgLy8gMC05XG4gICAgICAgICAgICB8fCAoYyA+PSAweDQxICYmIGMgPD0gMHg1QSkgLy8gYS16XG4gICAgICAgICAgICB8fCAoYyA+PSAweDYxICYmIGMgPD0gMHg3QSkgLy8gQS1aXG4gICAgICAgICAgICB8fCAoZm9ybWF0ID09PSBmb3JtYXRzLlJGQzE3MzggJiYgKGMgPT09IDB4MjggfHwgYyA9PT0gMHgyOSkpIC8vICggKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIG91dCArPSBzdHJpbmcuY2hhckF0KGkpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYyA8IDB4ODApIHtcbiAgICAgICAgICAgIG91dCA9IG91dCArIGhleFRhYmxlW2NdO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYyA8IDB4ODAwKSB7XG4gICAgICAgICAgICBvdXQgPSBvdXQgKyAoaGV4VGFibGVbMHhDMCB8IChjID4+IDYpXSArIGhleFRhYmxlWzB4ODAgfCAoYyAmIDB4M0YpXSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjIDwgMHhEODAwIHx8IGMgPj0gMHhFMDAwKSB7XG4gICAgICAgICAgICBvdXQgPSBvdXQgKyAoaGV4VGFibGVbMHhFMCB8IChjID4+IDEyKV0gKyBoZXhUYWJsZVsweDgwIHwgKChjID4+IDYpICYgMHgzRildICsgaGV4VGFibGVbMHg4MCB8IChjICYgMHgzRildKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaSArPSAxO1xuICAgICAgICBjID0gMHgxMDAwMCArICgoKGMgJiAweDNGRikgPDwgMTApIHwgKHN0cmluZy5jaGFyQ29kZUF0KGkpICYgMHgzRkYpKTtcbiAgICAgICAgLyogZXNsaW50IG9wZXJhdG9yLWxpbmVicmVhazogWzIsIFwiYmVmb3JlXCJdICovXG4gICAgICAgIG91dCArPSBoZXhUYWJsZVsweEYwIHwgKGMgPj4gMTgpXVxuICAgICAgICAgICAgKyBoZXhUYWJsZVsweDgwIHwgKChjID4+IDEyKSAmIDB4M0YpXVxuICAgICAgICAgICAgKyBoZXhUYWJsZVsweDgwIHwgKChjID4+IDYpICYgMHgzRildXG4gICAgICAgICAgICArIGhleFRhYmxlWzB4ODAgfCAoYyAmIDB4M0YpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxudmFyIGNvbXBhY3QgPSBmdW5jdGlvbiBjb21wYWN0KHZhbHVlKSB7XG4gICAgdmFyIHF1ZXVlID0gW3sgb2JqOiB7IG86IHZhbHVlIH0sIHByb3A6ICdvJyB9XTtcbiAgICB2YXIgcmVmcyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgaXRlbSA9IHF1ZXVlW2ldO1xuICAgICAgICB2YXIgb2JqID0gaXRlbS5vYmpbaXRlbS5wcm9wXTtcblxuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwga2V5cy5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgdmFyIGtleSA9IGtleXNbal07XG4gICAgICAgICAgICB2YXIgdmFsID0gb2JqW2tleV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsICE9PSBudWxsICYmIHJlZnMuaW5kZXhPZih2YWwpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHF1ZXVlLnB1c2goeyBvYmo6IG9iaiwgcHJvcDoga2V5IH0pO1xuICAgICAgICAgICAgICAgIHJlZnMucHVzaCh2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcGFjdFF1ZXVlKHF1ZXVlKTtcblxuICAgIHJldHVybiB2YWx1ZTtcbn07XG5cbnZhciBpc1JlZ0V4cCA9IGZ1bmN0aW9uIGlzUmVnRXhwKG9iaikge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59O1xuXG52YXIgaXNCdWZmZXIgPSBmdW5jdGlvbiBpc0J1ZmZlcihvYmopIHtcbiAgICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuICEhKG9iai5jb25zdHJ1Y3RvciAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyKG9iaikpO1xufTtcblxudmFyIGNvbWJpbmUgPSBmdW5jdGlvbiBjb21iaW5lKGEsIGIpIHtcbiAgICByZXR1cm4gW10uY29uY2F0KGEsIGIpO1xufTtcblxudmFyIG1heWJlTWFwID0gZnVuY3Rpb24gbWF5YmVNYXAodmFsLCBmbikge1xuICAgIGlmIChpc0FycmF5KHZhbCkpIHtcbiAgICAgICAgdmFyIG1hcHBlZCA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgICAgbWFwcGVkLnB1c2goZm4odmFsW2ldKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hcHBlZDtcbiAgICB9XG4gICAgcmV0dXJuIGZuKHZhbCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhcnJheVRvT2JqZWN0OiBhcnJheVRvT2JqZWN0LFxuICAgIGFzc2lnbjogYXNzaWduLFxuICAgIGNvbWJpbmU6IGNvbWJpbmUsXG4gICAgY29tcGFjdDogY29tcGFjdCxcbiAgICBkZWNvZGU6IGRlY29kZSxcbiAgICBlbmNvZGU6IGVuY29kZSxcbiAgICBpc0J1ZmZlcjogaXNCdWZmZXIsXG4gICAgaXNSZWdFeHA6IGlzUmVnRXhwLFxuICAgIG1heWJlTWFwOiBtYXliZU1hcCxcbiAgICBtZXJnZTogbWVyZ2Vcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZ2V0U2lkZUNoYW5uZWwgPSByZXF1aXJlKCdzaWRlLWNoYW5uZWwnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBmb3JtYXRzID0gcmVxdWlyZSgnLi9mb3JtYXRzJyk7XG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxudmFyIGFycmF5UHJlZml4R2VuZXJhdG9ycyA9IHtcbiAgICBicmFja2V0czogZnVuY3Rpb24gYnJhY2tldHMocHJlZml4KSB7XG4gICAgICAgIHJldHVybiBwcmVmaXggKyAnW10nO1xuICAgIH0sXG4gICAgY29tbWE6ICdjb21tYScsXG4gICAgaW5kaWNlczogZnVuY3Rpb24gaW5kaWNlcyhwcmVmaXgsIGtleSkge1xuICAgICAgICByZXR1cm4gcHJlZml4ICsgJ1snICsga2V5ICsgJ10nO1xuICAgIH0sXG4gICAgcmVwZWF0OiBmdW5jdGlvbiByZXBlYXQocHJlZml4KSB7XG4gICAgICAgIHJldHVybiBwcmVmaXg7XG4gICAgfVxufTtcblxudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xudmFyIHB1c2ggPSBBcnJheS5wcm90b3R5cGUucHVzaDtcbnZhciBwdXNoVG9BcnJheSA9IGZ1bmN0aW9uIChhcnIsIHZhbHVlT3JBcnJheSkge1xuICAgIHB1c2guYXBwbHkoYXJyLCBpc0FycmF5KHZhbHVlT3JBcnJheSkgPyB2YWx1ZU9yQXJyYXkgOiBbdmFsdWVPckFycmF5XSk7XG59O1xuXG52YXIgdG9JU08gPSBEYXRlLnByb3RvdHlwZS50b0lTT1N0cmluZztcblxudmFyIGRlZmF1bHRGb3JtYXQgPSBmb3JtYXRzWydkZWZhdWx0J107XG52YXIgZGVmYXVsdHMgPSB7XG4gICAgYWRkUXVlcnlQcmVmaXg6IGZhbHNlLFxuICAgIGFsbG93RG90czogZmFsc2UsXG4gICAgY2hhcnNldDogJ3V0Zi04JyxcbiAgICBjaGFyc2V0U2VudGluZWw6IGZhbHNlLFxuICAgIGRlbGltaXRlcjogJyYnLFxuICAgIGVuY29kZTogdHJ1ZSxcbiAgICBlbmNvZGVyOiB1dGlscy5lbmNvZGUsXG4gICAgZW5jb2RlVmFsdWVzT25seTogZmFsc2UsXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGZvcm1hdHRlcjogZm9ybWF0cy5mb3JtYXR0ZXJzW2RlZmF1bHRGb3JtYXRdLFxuICAgIC8vIGRlcHJlY2F0ZWRcbiAgICBpbmRpY2VzOiBmYWxzZSxcbiAgICBzZXJpYWxpemVEYXRlOiBmdW5jdGlvbiBzZXJpYWxpemVEYXRlKGRhdGUpIHtcbiAgICAgICAgcmV0dXJuIHRvSVNPLmNhbGwoZGF0ZSk7XG4gICAgfSxcbiAgICBza2lwTnVsbHM6IGZhbHNlLFxuICAgIHN0cmljdE51bGxIYW5kbGluZzogZmFsc2Vcbn07XG5cbnZhciBpc05vbk51bGxpc2hQcmltaXRpdmUgPSBmdW5jdGlvbiBpc05vbk51bGxpc2hQcmltaXRpdmUodikge1xuICAgIHJldHVybiB0eXBlb2YgdiA9PT0gJ3N0cmluZydcbiAgICAgICAgfHwgdHlwZW9mIHYgPT09ICdudW1iZXInXG4gICAgICAgIHx8IHR5cGVvZiB2ID09PSAnYm9vbGVhbidcbiAgICAgICAgfHwgdHlwZW9mIHYgPT09ICdzeW1ib2wnXG4gICAgICAgIHx8IHR5cGVvZiB2ID09PSAnYmlnaW50Jztcbn07XG5cbnZhciBzZW50aW5lbCA9IHt9O1xuXG52YXIgc3RyaW5naWZ5ID0gZnVuY3Rpb24gc3RyaW5naWZ5KFxuICAgIG9iamVjdCxcbiAgICBwcmVmaXgsXG4gICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICBjb21tYVJvdW5kVHJpcCxcbiAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgc2tpcE51bGxzLFxuICAgIGVuY29kZXIsXG4gICAgZmlsdGVyLFxuICAgIHNvcnQsXG4gICAgYWxsb3dEb3RzLFxuICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgZm9ybWF0LFxuICAgIGZvcm1hdHRlcixcbiAgICBlbmNvZGVWYWx1ZXNPbmx5LFxuICAgIGNoYXJzZXQsXG4gICAgc2lkZUNoYW5uZWxcbikge1xuICAgIHZhciBvYmogPSBvYmplY3Q7XG5cbiAgICB2YXIgdG1wU2MgPSBzaWRlQ2hhbm5lbDtcbiAgICB2YXIgc3RlcCA9IDA7XG4gICAgdmFyIGZpbmRGbGFnID0gZmFsc2U7XG4gICAgd2hpbGUgKCh0bXBTYyA9IHRtcFNjLmdldChzZW50aW5lbCkpICE9PSB2b2lkIHVuZGVmaW5lZCAmJiAhZmluZEZsYWcpIHtcbiAgICAgICAgLy8gV2hlcmUgb2JqZWN0IGxhc3QgYXBwZWFyZWQgaW4gdGhlIHJlZiB0cmVlXG4gICAgICAgIHZhciBwb3MgPSB0bXBTYy5nZXQob2JqZWN0KTtcbiAgICAgICAgc3RlcCArPSAxO1xuICAgICAgICBpZiAodHlwZW9mIHBvcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGlmIChwb3MgPT09IHN0ZXApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQ3ljbGljIG9iamVjdCB2YWx1ZScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmaW5kRmxhZyA9IHRydWU7IC8vIEJyZWFrIHdoaWxlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB0bXBTYy5nZXQoc2VudGluZWwpID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgc3RlcCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBvYmogPSBmaWx0ZXIocHJlZml4LCBvYmopO1xuICAgIH0gZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICBvYmogPSBzZXJpYWxpemVEYXRlKG9iaik7XG4gICAgfSBlbHNlIGlmIChnZW5lcmF0ZUFycmF5UHJlZml4ID09PSAnY29tbWEnICYmIGlzQXJyYXkob2JqKSkge1xuICAgICAgICBvYmogPSB1dGlscy5tYXliZU1hcChvYmosIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZXJpYWxpemVEYXRlKHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgICAgICBpZiAoc3RyaWN0TnVsbEhhbmRsaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZW5jb2RlciAmJiAhZW5jb2RlVmFsdWVzT25seSA/IGVuY29kZXIocHJlZml4LCBkZWZhdWx0cy5lbmNvZGVyLCBjaGFyc2V0LCAna2V5JywgZm9ybWF0KSA6IHByZWZpeDtcbiAgICAgICAgfVxuXG4gICAgICAgIG9iaiA9ICcnO1xuICAgIH1cblxuICAgIGlmIChpc05vbk51bGxpc2hQcmltaXRpdmUob2JqKSB8fCB1dGlscy5pc0J1ZmZlcihvYmopKSB7XG4gICAgICAgIGlmIChlbmNvZGVyKSB7XG4gICAgICAgICAgICB2YXIga2V5VmFsdWUgPSBlbmNvZGVWYWx1ZXNPbmx5ID8gcHJlZml4IDogZW5jb2RlcihwcmVmaXgsIGRlZmF1bHRzLmVuY29kZXIsIGNoYXJzZXQsICdrZXknLCBmb3JtYXQpO1xuICAgICAgICAgICAgcmV0dXJuIFtmb3JtYXR0ZXIoa2V5VmFsdWUpICsgJz0nICsgZm9ybWF0dGVyKGVuY29kZXIob2JqLCBkZWZhdWx0cy5lbmNvZGVyLCBjaGFyc2V0LCAndmFsdWUnLCBmb3JtYXQpKV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtmb3JtYXR0ZXIocHJlZml4KSArICc9JyArIGZvcm1hdHRlcihTdHJpbmcob2JqKSldO1xuICAgIH1cblxuICAgIHZhciB2YWx1ZXMgPSBbXTtcblxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH1cblxuICAgIHZhciBvYmpLZXlzO1xuICAgIGlmIChnZW5lcmF0ZUFycmF5UHJlZml4ID09PSAnY29tbWEnICYmIGlzQXJyYXkob2JqKSkge1xuICAgICAgICAvLyB3ZSBuZWVkIHRvIGpvaW4gZWxlbWVudHMgaW5cbiAgICAgICAgaWYgKGVuY29kZVZhbHVlc09ubHkgJiYgZW5jb2Rlcikge1xuICAgICAgICAgICAgb2JqID0gdXRpbHMubWF5YmVNYXAob2JqLCBlbmNvZGVyKTtcbiAgICAgICAgfVxuICAgICAgICBvYmpLZXlzID0gW3sgdmFsdWU6IG9iai5sZW5ndGggPiAwID8gb2JqLmpvaW4oJywnKSB8fCBudWxsIDogdm9pZCB1bmRlZmluZWQgfV07XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KGZpbHRlcikpIHtcbiAgICAgICAgb2JqS2V5cyA9IGZpbHRlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgICAgIG9iaktleXMgPSBzb3J0ID8ga2V5cy5zb3J0KHNvcnQpIDoga2V5cztcbiAgICB9XG5cbiAgICB2YXIgYWRqdXN0ZWRQcmVmaXggPSBjb21tYVJvdW5kVHJpcCAmJiBpc0FycmF5KG9iaikgJiYgb2JqLmxlbmd0aCA9PT0gMSA/IHByZWZpeCArICdbXScgOiBwcmVmaXg7XG5cbiAgICBmb3IgKHZhciBqID0gMDsgaiA8IG9iaktleXMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgdmFyIGtleSA9IG9iaktleXNbal07XG4gICAgICAgIHZhciB2YWx1ZSA9IHR5cGVvZiBrZXkgPT09ICdvYmplY3QnICYmIHR5cGVvZiBrZXkudmFsdWUgIT09ICd1bmRlZmluZWQnID8ga2V5LnZhbHVlIDogb2JqW2tleV07XG5cbiAgICAgICAgaWYgKHNraXBOdWxscyAmJiB2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIga2V5UHJlZml4ID0gaXNBcnJheShvYmopXG4gICAgICAgICAgICA/IHR5cGVvZiBnZW5lcmF0ZUFycmF5UHJlZml4ID09PSAnZnVuY3Rpb24nID8gZ2VuZXJhdGVBcnJheVByZWZpeChhZGp1c3RlZFByZWZpeCwga2V5KSA6IGFkanVzdGVkUHJlZml4XG4gICAgICAgICAgICA6IGFkanVzdGVkUHJlZml4ICsgKGFsbG93RG90cyA/ICcuJyArIGtleSA6ICdbJyArIGtleSArICddJyk7XG5cbiAgICAgICAgc2lkZUNoYW5uZWwuc2V0KG9iamVjdCwgc3RlcCk7XG4gICAgICAgIHZhciB2YWx1ZVNpZGVDaGFubmVsID0gZ2V0U2lkZUNoYW5uZWwoKTtcbiAgICAgICAgdmFsdWVTaWRlQ2hhbm5lbC5zZXQoc2VudGluZWwsIHNpZGVDaGFubmVsKTtcbiAgICAgICAgcHVzaFRvQXJyYXkodmFsdWVzLCBzdHJpbmdpZnkoXG4gICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgIGtleVByZWZpeCxcbiAgICAgICAgICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgICAgICAgICBjb21tYVJvdW5kVHJpcCxcbiAgICAgICAgICAgIHN0cmljdE51bGxIYW5kbGluZyxcbiAgICAgICAgICAgIHNraXBOdWxscyxcbiAgICAgICAgICAgIGdlbmVyYXRlQXJyYXlQcmVmaXggPT09ICdjb21tYScgJiYgZW5jb2RlVmFsdWVzT25seSAmJiBpc0FycmF5KG9iaikgPyBudWxsIDogZW5jb2RlcixcbiAgICAgICAgICAgIGZpbHRlcixcbiAgICAgICAgICAgIHNvcnQsXG4gICAgICAgICAgICBhbGxvd0RvdHMsXG4gICAgICAgICAgICBzZXJpYWxpemVEYXRlLFxuICAgICAgICAgICAgZm9ybWF0LFxuICAgICAgICAgICAgZm9ybWF0dGVyLFxuICAgICAgICAgICAgZW5jb2RlVmFsdWVzT25seSxcbiAgICAgICAgICAgIGNoYXJzZXQsXG4gICAgICAgICAgICB2YWx1ZVNpZGVDaGFubmVsXG4gICAgICAgICkpO1xuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZXM7XG59O1xuXG52YXIgbm9ybWFsaXplU3RyaW5naWZ5T3B0aW9ucyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZVN0cmluZ2lmeU9wdGlvbnMob3B0cykge1xuICAgIGlmICghb3B0cykge1xuICAgICAgICByZXR1cm4gZGVmYXVsdHM7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMuZW5jb2RlciAhPT0gbnVsbCAmJiB0eXBlb2Ygb3B0cy5lbmNvZGVyICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygb3B0cy5lbmNvZGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0VuY29kZXIgaGFzIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgdmFyIGNoYXJzZXQgPSBvcHRzLmNoYXJzZXQgfHwgZGVmYXVsdHMuY2hhcnNldDtcbiAgICBpZiAodHlwZW9mIG9wdHMuY2hhcnNldCAhPT0gJ3VuZGVmaW5lZCcgJiYgb3B0cy5jaGFyc2V0ICE9PSAndXRmLTgnICYmIG9wdHMuY2hhcnNldCAhPT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBjaGFyc2V0IG9wdGlvbiBtdXN0IGJlIGVpdGhlciB1dGYtOCwgaXNvLTg4NTktMSwgb3IgdW5kZWZpbmVkJyk7XG4gICAgfVxuXG4gICAgdmFyIGZvcm1hdCA9IGZvcm1hdHNbJ2RlZmF1bHQnXTtcbiAgICBpZiAodHlwZW9mIG9wdHMuZm9ybWF0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAoIWhhcy5jYWxsKGZvcm1hdHMuZm9ybWF0dGVycywgb3B0cy5mb3JtYXQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGZvcm1hdCBvcHRpb24gcHJvdmlkZWQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgZm9ybWF0ID0gb3B0cy5mb3JtYXQ7XG4gICAgfVxuICAgIHZhciBmb3JtYXR0ZXIgPSBmb3JtYXRzLmZvcm1hdHRlcnNbZm9ybWF0XTtcblxuICAgIHZhciBmaWx0ZXIgPSBkZWZhdWx0cy5maWx0ZXI7XG4gICAgaWYgKHR5cGVvZiBvcHRzLmZpbHRlciA9PT0gJ2Z1bmN0aW9uJyB8fCBpc0FycmF5KG9wdHMuZmlsdGVyKSkge1xuICAgICAgICBmaWx0ZXIgPSBvcHRzLmZpbHRlcjtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhZGRRdWVyeVByZWZpeDogdHlwZW9mIG9wdHMuYWRkUXVlcnlQcmVmaXggPT09ICdib29sZWFuJyA/IG9wdHMuYWRkUXVlcnlQcmVmaXggOiBkZWZhdWx0cy5hZGRRdWVyeVByZWZpeCxcbiAgICAgICAgYWxsb3dEb3RzOiB0eXBlb2Ygb3B0cy5hbGxvd0RvdHMgPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdHMuYWxsb3dEb3RzIDogISFvcHRzLmFsbG93RG90cyxcbiAgICAgICAgY2hhcnNldDogY2hhcnNldCxcbiAgICAgICAgY2hhcnNldFNlbnRpbmVsOiB0eXBlb2Ygb3B0cy5jaGFyc2V0U2VudGluZWwgPT09ICdib29sZWFuJyA/IG9wdHMuY2hhcnNldFNlbnRpbmVsIDogZGVmYXVsdHMuY2hhcnNldFNlbnRpbmVsLFxuICAgICAgICBkZWxpbWl0ZXI6IHR5cGVvZiBvcHRzLmRlbGltaXRlciA9PT0gJ3VuZGVmaW5lZCcgPyBkZWZhdWx0cy5kZWxpbWl0ZXIgOiBvcHRzLmRlbGltaXRlcixcbiAgICAgICAgZW5jb2RlOiB0eXBlb2Ygb3B0cy5lbmNvZGUgPT09ICdib29sZWFuJyA/IG9wdHMuZW5jb2RlIDogZGVmYXVsdHMuZW5jb2RlLFxuICAgICAgICBlbmNvZGVyOiB0eXBlb2Ygb3B0cy5lbmNvZGVyID09PSAnZnVuY3Rpb24nID8gb3B0cy5lbmNvZGVyIDogZGVmYXVsdHMuZW5jb2RlcixcbiAgICAgICAgZW5jb2RlVmFsdWVzT25seTogdHlwZW9mIG9wdHMuZW5jb2RlVmFsdWVzT25seSA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5lbmNvZGVWYWx1ZXNPbmx5IDogZGVmYXVsdHMuZW5jb2RlVmFsdWVzT25seSxcbiAgICAgICAgZmlsdGVyOiBmaWx0ZXIsXG4gICAgICAgIGZvcm1hdDogZm9ybWF0LFxuICAgICAgICBmb3JtYXR0ZXI6IGZvcm1hdHRlcixcbiAgICAgICAgc2VyaWFsaXplRGF0ZTogdHlwZW9mIG9wdHMuc2VyaWFsaXplRGF0ZSA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMuc2VyaWFsaXplRGF0ZSA6IGRlZmF1bHRzLnNlcmlhbGl6ZURhdGUsXG4gICAgICAgIHNraXBOdWxsczogdHlwZW9mIG9wdHMuc2tpcE51bGxzID09PSAnYm9vbGVhbicgPyBvcHRzLnNraXBOdWxscyA6IGRlZmF1bHRzLnNraXBOdWxscyxcbiAgICAgICAgc29ydDogdHlwZW9mIG9wdHMuc29ydCA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMuc29ydCA6IG51bGwsXG4gICAgICAgIHN0cmljdE51bGxIYW5kbGluZzogdHlwZW9mIG9wdHMuc3RyaWN0TnVsbEhhbmRsaW5nID09PSAnYm9vbGVhbicgPyBvcHRzLnN0cmljdE51bGxIYW5kbGluZyA6IGRlZmF1bHRzLnN0cmljdE51bGxIYW5kbGluZ1xuICAgIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG9wdHMpIHtcbiAgICB2YXIgb2JqID0gb2JqZWN0O1xuICAgIHZhciBvcHRpb25zID0gbm9ybWFsaXplU3RyaW5naWZ5T3B0aW9ucyhvcHRzKTtcblxuICAgIHZhciBvYmpLZXlzO1xuICAgIHZhciBmaWx0ZXI7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZmlsdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGZpbHRlciA9IG9wdGlvbnMuZmlsdGVyO1xuICAgICAgICBvYmogPSBmaWx0ZXIoJycsIG9iaik7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KG9wdGlvbnMuZmlsdGVyKSkge1xuICAgICAgICBmaWx0ZXIgPSBvcHRpb25zLmZpbHRlcjtcbiAgICAgICAgb2JqS2V5cyA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnIHx8IG9iaiA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgdmFyIGFycmF5Rm9ybWF0O1xuICAgIGlmIChvcHRzICYmIG9wdHMuYXJyYXlGb3JtYXQgaW4gYXJyYXlQcmVmaXhHZW5lcmF0b3JzKSB7XG4gICAgICAgIGFycmF5Rm9ybWF0ID0gb3B0cy5hcnJheUZvcm1hdDtcbiAgICB9IGVsc2UgaWYgKG9wdHMgJiYgJ2luZGljZXMnIGluIG9wdHMpIHtcbiAgICAgICAgYXJyYXlGb3JtYXQgPSBvcHRzLmluZGljZXMgPyAnaW5kaWNlcycgOiAncmVwZWF0JztcbiAgICB9IGVsc2Uge1xuICAgICAgICBhcnJheUZvcm1hdCA9ICdpbmRpY2VzJztcbiAgICB9XG5cbiAgICB2YXIgZ2VuZXJhdGVBcnJheVByZWZpeCA9IGFycmF5UHJlZml4R2VuZXJhdG9yc1thcnJheUZvcm1hdF07XG4gICAgaWYgKG9wdHMgJiYgJ2NvbW1hUm91bmRUcmlwJyBpbiBvcHRzICYmIHR5cGVvZiBvcHRzLmNvbW1hUm91bmRUcmlwICE9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignYGNvbW1hUm91bmRUcmlwYCBtdXN0IGJlIGEgYm9vbGVhbiwgb3IgYWJzZW50Jyk7XG4gICAgfVxuICAgIHZhciBjb21tYVJvdW5kVHJpcCA9IGdlbmVyYXRlQXJyYXlQcmVmaXggPT09ICdjb21tYScgJiYgb3B0cyAmJiBvcHRzLmNvbW1hUm91bmRUcmlwO1xuXG4gICAgaWYgKCFvYmpLZXlzKSB7XG4gICAgICAgIG9iaktleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnNvcnQpIHtcbiAgICAgICAgb2JqS2V5cy5zb3J0KG9wdGlvbnMuc29ydCk7XG4gICAgfVxuXG4gICAgdmFyIHNpZGVDaGFubmVsID0gZ2V0U2lkZUNoYW5uZWwoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iaktleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IG9iaktleXNbaV07XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuc2tpcE51bGxzICYmIG9ialtrZXldID09PSBudWxsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBwdXNoVG9BcnJheShrZXlzLCBzdHJpbmdpZnkoXG4gICAgICAgICAgICBvYmpba2V5XSxcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgICAgICAgICBjb21tYVJvdW5kVHJpcCxcbiAgICAgICAgICAgIG9wdGlvbnMuc3RyaWN0TnVsbEhhbmRsaW5nLFxuICAgICAgICAgICAgb3B0aW9ucy5za2lwTnVsbHMsXG4gICAgICAgICAgICBvcHRpb25zLmVuY29kZSA/IG9wdGlvbnMuZW5jb2RlciA6IG51bGwsXG4gICAgICAgICAgICBvcHRpb25zLmZpbHRlcixcbiAgICAgICAgICAgIG9wdGlvbnMuc29ydCxcbiAgICAgICAgICAgIG9wdGlvbnMuYWxsb3dEb3RzLFxuICAgICAgICAgICAgb3B0aW9ucy5zZXJpYWxpemVEYXRlLFxuICAgICAgICAgICAgb3B0aW9ucy5mb3JtYXQsXG4gICAgICAgICAgICBvcHRpb25zLmZvcm1hdHRlcixcbiAgICAgICAgICAgIG9wdGlvbnMuZW5jb2RlVmFsdWVzT25seSxcbiAgICAgICAgICAgIG9wdGlvbnMuY2hhcnNldCxcbiAgICAgICAgICAgIHNpZGVDaGFubmVsXG4gICAgICAgICkpO1xuICAgIH1cblxuICAgIHZhciBqb2luZWQgPSBrZXlzLmpvaW4ob3B0aW9ucy5kZWxpbWl0ZXIpO1xuICAgIHZhciBwcmVmaXggPSBvcHRpb25zLmFkZFF1ZXJ5UHJlZml4ID09PSB0cnVlID8gJz8nIDogJyc7XG5cbiAgICBpZiAob3B0aW9ucy5jaGFyc2V0U2VudGluZWwpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuY2hhcnNldCA9PT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgICAgICAvLyBlbmNvZGVVUklDb21wb25lbnQoJyYjMTAwMDM7JyksIHRoZSBcIm51bWVyaWMgZW50aXR5XCIgcmVwcmVzZW50YXRpb24gb2YgYSBjaGVja21hcmtcbiAgICAgICAgICAgIHByZWZpeCArPSAndXRmOD0lMjYlMjMxMDAwMyUzQiYnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZW5jb2RlVVJJQ29tcG9uZW50KCdcdTI3MTMnKVxuICAgICAgICAgICAgcHJlZml4ICs9ICd1dGY4PSVFMiU5QyU5MyYnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpvaW5lZC5sZW5ndGggPiAwID8gcHJlZml4ICsgam9pbmVkIDogJyc7XG59O1xuIiwgIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxudmFyIGRlZmF1bHRzID0ge1xuICAgIGFsbG93RG90czogZmFsc2UsXG4gICAgYWxsb3dQcm90b3R5cGVzOiBmYWxzZSxcbiAgICBhbGxvd1NwYXJzZTogZmFsc2UsXG4gICAgYXJyYXlMaW1pdDogMjAsXG4gICAgY2hhcnNldDogJ3V0Zi04JyxcbiAgICBjaGFyc2V0U2VudGluZWw6IGZhbHNlLFxuICAgIGNvbW1hOiBmYWxzZSxcbiAgICBkZWNvZGVyOiB1dGlscy5kZWNvZGUsXG4gICAgZGVsaW1pdGVyOiAnJicsXG4gICAgZGVwdGg6IDUsXG4gICAgaWdub3JlUXVlcnlQcmVmaXg6IGZhbHNlLFxuICAgIGludGVycHJldE51bWVyaWNFbnRpdGllczogZmFsc2UsXG4gICAgcGFyYW1ldGVyTGltaXQ6IDEwMDAsXG4gICAgcGFyc2VBcnJheXM6IHRydWUsXG4gICAgcGxhaW5PYmplY3RzOiBmYWxzZSxcbiAgICBzdHJpY3ROdWxsSGFuZGxpbmc6IGZhbHNlXG59O1xuXG52YXIgaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzID0gZnVuY3Rpb24gKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvJiMoXFxkKyk7L2csIGZ1bmN0aW9uICgkMCwgbnVtYmVyU3RyKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KG51bWJlclN0ciwgMTApKTtcbiAgICB9KTtcbn07XG5cbnZhciBwYXJzZUFycmF5VmFsdWUgPSBmdW5jdGlvbiAodmFsLCBvcHRpb25zKSB7XG4gICAgaWYgKHZhbCAmJiB0eXBlb2YgdmFsID09PSAnc3RyaW5nJyAmJiBvcHRpb25zLmNvbW1hICYmIHZhbC5pbmRleE9mKCcsJykgPiAtMSkge1xuICAgICAgICByZXR1cm4gdmFsLnNwbGl0KCcsJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHZhbDtcbn07XG5cbi8vIFRoaXMgaXMgd2hhdCBicm93c2VycyB3aWxsIHN1Ym1pdCB3aGVuIHRoZSBcdTI3MTMgY2hhcmFjdGVyIG9jY3VycyBpbiBhblxuLy8gYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkIGJvZHkgYW5kIHRoZSBlbmNvZGluZyBvZiB0aGUgcGFnZSBjb250YWluaW5nXG4vLyB0aGUgZm9ybSBpcyBpc28tODg1OS0xLCBvciB3aGVuIHRoZSBzdWJtaXR0ZWQgZm9ybSBoYXMgYW4gYWNjZXB0LWNoYXJzZXRcbi8vIGF0dHJpYnV0ZSBvZiBpc28tODg1OS0xLiBQcmVzdW1hYmx5IGFsc28gd2l0aCBvdGhlciBjaGFyc2V0cyB0aGF0IGRvIG5vdCBjb250YWluXG4vLyB0aGUgXHUyNzEzIGNoYXJhY3Rlciwgc3VjaCBhcyB1cy1hc2NpaS5cbnZhciBpc29TZW50aW5lbCA9ICd1dGY4PSUyNiUyMzEwMDAzJTNCJzsgLy8gZW5jb2RlVVJJQ29tcG9uZW50KCcmIzEwMDAzOycpXG5cbi8vIFRoZXNlIGFyZSB0aGUgcGVyY2VudC1lbmNvZGVkIHV0Zi04IG9jdGV0cyByZXByZXNlbnRpbmcgYSBjaGVja21hcmssIGluZGljYXRpbmcgdGhhdCB0aGUgcmVxdWVzdCBhY3R1YWxseSBpcyB1dGYtOCBlbmNvZGVkLlxudmFyIGNoYXJzZXRTZW50aW5lbCA9ICd1dGY4PSVFMiU5QyU5Myc7IC8vIGVuY29kZVVSSUNvbXBvbmVudCgnXHUyNzEzJylcblxudmFyIHBhcnNlVmFsdWVzID0gZnVuY3Rpb24gcGFyc2VRdWVyeVN0cmluZ1ZhbHVlcyhzdHIsIG9wdGlvbnMpIHtcbiAgICB2YXIgb2JqID0geyBfX3Byb3RvX186IG51bGwgfTtcblxuICAgIHZhciBjbGVhblN0ciA9IG9wdGlvbnMuaWdub3JlUXVlcnlQcmVmaXggPyBzdHIucmVwbGFjZSgvXlxcPy8sICcnKSA6IHN0cjtcbiAgICB2YXIgbGltaXQgPSBvcHRpb25zLnBhcmFtZXRlckxpbWl0ID09PSBJbmZpbml0eSA/IHVuZGVmaW5lZCA6IG9wdGlvbnMucGFyYW1ldGVyTGltaXQ7XG4gICAgdmFyIHBhcnRzID0gY2xlYW5TdHIuc3BsaXQob3B0aW9ucy5kZWxpbWl0ZXIsIGxpbWl0KTtcbiAgICB2YXIgc2tpcEluZGV4ID0gLTE7IC8vIEtlZXAgdHJhY2sgb2Ygd2hlcmUgdGhlIHV0Zjggc2VudGluZWwgd2FzIGZvdW5kXG4gICAgdmFyIGk7XG5cbiAgICB2YXIgY2hhcnNldCA9IG9wdGlvbnMuY2hhcnNldDtcbiAgICBpZiAob3B0aW9ucy5jaGFyc2V0U2VudGluZWwpIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBpZiAocGFydHNbaV0uaW5kZXhPZigndXRmOD0nKSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGlmIChwYXJ0c1tpXSA9PT0gY2hhcnNldFNlbnRpbmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYXJzZXQgPSAndXRmLTgnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocGFydHNbaV0gPT09IGlzb1NlbnRpbmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYXJzZXQgPSAnaXNvLTg4NTktMSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNraXBJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgaSA9IHBhcnRzLmxlbmd0aDsgLy8gVGhlIGVzbGludCBzZXR0aW5ncyBkbyBub3QgYWxsb3cgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKGkgPT09IHNraXBJbmRleCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBhcnQgPSBwYXJ0c1tpXTtcblxuICAgICAgICB2YXIgYnJhY2tldEVxdWFsc1BvcyA9IHBhcnQuaW5kZXhPZignXT0nKTtcbiAgICAgICAgdmFyIHBvcyA9IGJyYWNrZXRFcXVhbHNQb3MgPT09IC0xID8gcGFydC5pbmRleE9mKCc9JykgOiBicmFja2V0RXF1YWxzUG9zICsgMTtcblxuICAgICAgICB2YXIga2V5LCB2YWw7XG4gICAgICAgIGlmIChwb3MgPT09IC0xKSB7XG4gICAgICAgICAgICBrZXkgPSBvcHRpb25zLmRlY29kZXIocGFydCwgZGVmYXVsdHMuZGVjb2RlciwgY2hhcnNldCwgJ2tleScpO1xuICAgICAgICAgICAgdmFsID0gb3B0aW9ucy5zdHJpY3ROdWxsSGFuZGxpbmcgPyBudWxsIDogJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBrZXkgPSBvcHRpb25zLmRlY29kZXIocGFydC5zbGljZSgwLCBwb3MpLCBkZWZhdWx0cy5kZWNvZGVyLCBjaGFyc2V0LCAna2V5Jyk7XG4gICAgICAgICAgICB2YWwgPSB1dGlscy5tYXliZU1hcChcbiAgICAgICAgICAgICAgICBwYXJzZUFycmF5VmFsdWUocGFydC5zbGljZShwb3MgKyAxKSwgb3B0aW9ucyksXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGVuY29kZWRWYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnMuZGVjb2RlcihlbmNvZGVkVmFsLCBkZWZhdWx0cy5kZWNvZGVyLCBjaGFyc2V0LCAndmFsdWUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbCAmJiBvcHRpb25zLmludGVycHJldE51bWVyaWNFbnRpdGllcyAmJiBjaGFyc2V0ID09PSAnaXNvLTg4NTktMScpIHtcbiAgICAgICAgICAgIHZhbCA9IGludGVycHJldE51bWVyaWNFbnRpdGllcyh2YWwpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcnQuaW5kZXhPZignW109JykgPiAtMSkge1xuICAgICAgICAgICAgdmFsID0gaXNBcnJheSh2YWwpID8gW3ZhbF0gOiB2YWw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaGFzLmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgICAgICBvYmpba2V5XSA9IHV0aWxzLmNvbWJpbmUob2JqW2tleV0sIHZhbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvYmpba2V5XSA9IHZhbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG59O1xuXG52YXIgcGFyc2VPYmplY3QgPSBmdW5jdGlvbiAoY2hhaW4sIHZhbCwgb3B0aW9ucywgdmFsdWVzUGFyc2VkKSB7XG4gICAgdmFyIGxlYWYgPSB2YWx1ZXNQYXJzZWQgPyB2YWwgOiBwYXJzZUFycmF5VmFsdWUodmFsLCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIGkgPSBjaGFpbi5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgb2JqO1xuICAgICAgICB2YXIgcm9vdCA9IGNoYWluW2ldO1xuXG4gICAgICAgIGlmIChyb290ID09PSAnW10nICYmIG9wdGlvbnMucGFyc2VBcnJheXMpIHtcbiAgICAgICAgICAgIG9iaiA9IFtdLmNvbmNhdChsZWFmKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9iaiA9IG9wdGlvbnMucGxhaW5PYmplY3RzID8gT2JqZWN0LmNyZWF0ZShudWxsKSA6IHt9O1xuICAgICAgICAgICAgdmFyIGNsZWFuUm9vdCA9IHJvb3QuY2hhckF0KDApID09PSAnWycgJiYgcm9vdC5jaGFyQXQocm9vdC5sZW5ndGggLSAxKSA9PT0gJ10nID8gcm9vdC5zbGljZSgxLCAtMSkgOiByb290O1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gcGFyc2VJbnQoY2xlYW5Sb290LCAxMCk7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMucGFyc2VBcnJheXMgJiYgY2xlYW5Sb290ID09PSAnJykge1xuICAgICAgICAgICAgICAgIG9iaiA9IHsgMDogbGVhZiB9O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAhaXNOYU4oaW5kZXgpXG4gICAgICAgICAgICAgICAgJiYgcm9vdCAhPT0gY2xlYW5Sb290XG4gICAgICAgICAgICAgICAgJiYgU3RyaW5nKGluZGV4KSA9PT0gY2xlYW5Sb290XG4gICAgICAgICAgICAgICAgJiYgaW5kZXggPj0gMFxuICAgICAgICAgICAgICAgICYmIChvcHRpb25zLnBhcnNlQXJyYXlzICYmIGluZGV4IDw9IG9wdGlvbnMuYXJyYXlMaW1pdClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG9iaiA9IFtdO1xuICAgICAgICAgICAgICAgIG9ialtpbmRleF0gPSBsZWFmO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjbGVhblJvb3QgIT09ICdfX3Byb3RvX18nKSB7XG4gICAgICAgICAgICAgICAgb2JqW2NsZWFuUm9vdF0gPSBsZWFmO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGVhZiA9IG9iajtcbiAgICB9XG5cbiAgICByZXR1cm4gbGVhZjtcbn07XG5cbnZhciBwYXJzZUtleXMgPSBmdW5jdGlvbiBwYXJzZVF1ZXJ5U3RyaW5nS2V5cyhnaXZlbktleSwgdmFsLCBvcHRpb25zLCB2YWx1ZXNQYXJzZWQpIHtcbiAgICBpZiAoIWdpdmVuS2V5KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBUcmFuc2Zvcm0gZG90IG5vdGF0aW9uIHRvIGJyYWNrZXQgbm90YXRpb25cbiAgICB2YXIga2V5ID0gb3B0aW9ucy5hbGxvd0RvdHMgPyBnaXZlbktleS5yZXBsYWNlKC9cXC4oW14uW10rKS9nLCAnWyQxXScpIDogZ2l2ZW5LZXk7XG5cbiAgICAvLyBUaGUgcmVnZXggY2h1bmtzXG5cbiAgICB2YXIgYnJhY2tldHMgPSAvKFxcW1teW1xcXV0qXSkvO1xuICAgIHZhciBjaGlsZCA9IC8oXFxbW15bXFxdXSpdKS9nO1xuXG4gICAgLy8gR2V0IHRoZSBwYXJlbnRcblxuICAgIHZhciBzZWdtZW50ID0gb3B0aW9ucy5kZXB0aCA+IDAgJiYgYnJhY2tldHMuZXhlYyhrZXkpO1xuICAgIHZhciBwYXJlbnQgPSBzZWdtZW50ID8ga2V5LnNsaWNlKDAsIHNlZ21lbnQuaW5kZXgpIDoga2V5O1xuXG4gICAgLy8gU3Rhc2ggdGhlIHBhcmVudCBpZiBpdCBleGlzdHNcblxuICAgIHZhciBrZXlzID0gW107XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgICAvLyBJZiB3ZSBhcmVuJ3QgdXNpbmcgcGxhaW4gb2JqZWN0cywgb3B0aW9uYWxseSBwcmVmaXgga2V5cyB0aGF0IHdvdWxkIG92ZXJ3cml0ZSBvYmplY3QgcHJvdG90eXBlIHByb3BlcnRpZXNcbiAgICAgICAgaWYgKCFvcHRpb25zLnBsYWluT2JqZWN0cyAmJiBoYXMuY2FsbChPYmplY3QucHJvdG90eXBlLCBwYXJlbnQpKSB7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMuYWxsb3dQcm90b3R5cGVzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAga2V5cy5wdXNoKHBhcmVudCk7XG4gICAgfVxuXG4gICAgLy8gTG9vcCB0aHJvdWdoIGNoaWxkcmVuIGFwcGVuZGluZyB0byB0aGUgYXJyYXkgdW50aWwgd2UgaGl0IGRlcHRoXG5cbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKG9wdGlvbnMuZGVwdGggPiAwICYmIChzZWdtZW50ID0gY2hpbGQuZXhlYyhrZXkpKSAhPT0gbnVsbCAmJiBpIDwgb3B0aW9ucy5kZXB0aCkge1xuICAgICAgICBpICs9IDE7XG4gICAgICAgIGlmICghb3B0aW9ucy5wbGFpbk9iamVjdHMgJiYgaGFzLmNhbGwoT2JqZWN0LnByb3RvdHlwZSwgc2VnbWVudFsxXS5zbGljZSgxLCAtMSkpKSB7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMuYWxsb3dQcm90b3R5cGVzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGtleXMucHVzaChzZWdtZW50WzFdKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGVyZSdzIGEgcmVtYWluZGVyLCBqdXN0IGFkZCB3aGF0ZXZlciBpcyBsZWZ0XG5cbiAgICBpZiAoc2VnbWVudCkge1xuICAgICAgICBrZXlzLnB1c2goJ1snICsga2V5LnNsaWNlKHNlZ21lbnQuaW5kZXgpICsgJ10nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyc2VPYmplY3Qoa2V5cywgdmFsLCBvcHRpb25zLCB2YWx1ZXNQYXJzZWQpO1xufTtcblxudmFyIG5vcm1hbGl6ZVBhcnNlT3B0aW9ucyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZVBhcnNlT3B0aW9ucyhvcHRzKSB7XG4gICAgaWYgKCFvcHRzKSB7XG4gICAgICAgIHJldHVybiBkZWZhdWx0cztcbiAgICB9XG5cbiAgICBpZiAob3B0cy5kZWNvZGVyICE9PSBudWxsICYmIG9wdHMuZGVjb2RlciAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvcHRzLmRlY29kZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRGVjb2RlciBoYXMgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9wdHMuY2hhcnNldCAhPT0gJ3VuZGVmaW5lZCcgJiYgb3B0cy5jaGFyc2V0ICE9PSAndXRmLTgnICYmIG9wdHMuY2hhcnNldCAhPT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBjaGFyc2V0IG9wdGlvbiBtdXN0IGJlIGVpdGhlciB1dGYtOCwgaXNvLTg4NTktMSwgb3IgdW5kZWZpbmVkJyk7XG4gICAgfVxuICAgIHZhciBjaGFyc2V0ID0gdHlwZW9mIG9wdHMuY2hhcnNldCA9PT0gJ3VuZGVmaW5lZCcgPyBkZWZhdWx0cy5jaGFyc2V0IDogb3B0cy5jaGFyc2V0O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWxsb3dEb3RzOiB0eXBlb2Ygb3B0cy5hbGxvd0RvdHMgPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdHMuYWxsb3dEb3RzIDogISFvcHRzLmFsbG93RG90cyxcbiAgICAgICAgYWxsb3dQcm90b3R5cGVzOiB0eXBlb2Ygb3B0cy5hbGxvd1Byb3RvdHlwZXMgPT09ICdib29sZWFuJyA/IG9wdHMuYWxsb3dQcm90b3R5cGVzIDogZGVmYXVsdHMuYWxsb3dQcm90b3R5cGVzLFxuICAgICAgICBhbGxvd1NwYXJzZTogdHlwZW9mIG9wdHMuYWxsb3dTcGFyc2UgPT09ICdib29sZWFuJyA/IG9wdHMuYWxsb3dTcGFyc2UgOiBkZWZhdWx0cy5hbGxvd1NwYXJzZSxcbiAgICAgICAgYXJyYXlMaW1pdDogdHlwZW9mIG9wdHMuYXJyYXlMaW1pdCA9PT0gJ251bWJlcicgPyBvcHRzLmFycmF5TGltaXQgOiBkZWZhdWx0cy5hcnJheUxpbWl0LFxuICAgICAgICBjaGFyc2V0OiBjaGFyc2V0LFxuICAgICAgICBjaGFyc2V0U2VudGluZWw6IHR5cGVvZiBvcHRzLmNoYXJzZXRTZW50aW5lbCA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5jaGFyc2V0U2VudGluZWwgOiBkZWZhdWx0cy5jaGFyc2V0U2VudGluZWwsXG4gICAgICAgIGNvbW1hOiB0eXBlb2Ygb3B0cy5jb21tYSA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5jb21tYSA6IGRlZmF1bHRzLmNvbW1hLFxuICAgICAgICBkZWNvZGVyOiB0eXBlb2Ygb3B0cy5kZWNvZGVyID09PSAnZnVuY3Rpb24nID8gb3B0cy5kZWNvZGVyIDogZGVmYXVsdHMuZGVjb2RlcixcbiAgICAgICAgZGVsaW1pdGVyOiB0eXBlb2Ygb3B0cy5kZWxpbWl0ZXIgPT09ICdzdHJpbmcnIHx8IHV0aWxzLmlzUmVnRXhwKG9wdHMuZGVsaW1pdGVyKSA/IG9wdHMuZGVsaW1pdGVyIDogZGVmYXVsdHMuZGVsaW1pdGVyLFxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8taW1wbGljaXQtY29lcmNpb24sIG5vLWV4dHJhLXBhcmVuc1xuICAgICAgICBkZXB0aDogKHR5cGVvZiBvcHRzLmRlcHRoID09PSAnbnVtYmVyJyB8fCBvcHRzLmRlcHRoID09PSBmYWxzZSkgPyArb3B0cy5kZXB0aCA6IGRlZmF1bHRzLmRlcHRoLFxuICAgICAgICBpZ25vcmVRdWVyeVByZWZpeDogb3B0cy5pZ25vcmVRdWVyeVByZWZpeCA9PT0gdHJ1ZSxcbiAgICAgICAgaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzOiB0eXBlb2Ygb3B0cy5pbnRlcnByZXROdW1lcmljRW50aXRpZXMgPT09ICdib29sZWFuJyA/IG9wdHMuaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzIDogZGVmYXVsdHMuaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzLFxuICAgICAgICBwYXJhbWV0ZXJMaW1pdDogdHlwZW9mIG9wdHMucGFyYW1ldGVyTGltaXQgPT09ICdudW1iZXInID8gb3B0cy5wYXJhbWV0ZXJMaW1pdCA6IGRlZmF1bHRzLnBhcmFtZXRlckxpbWl0LFxuICAgICAgICBwYXJzZUFycmF5czogb3B0cy5wYXJzZUFycmF5cyAhPT0gZmFsc2UsXG4gICAgICAgIHBsYWluT2JqZWN0czogdHlwZW9mIG9wdHMucGxhaW5PYmplY3RzID09PSAnYm9vbGVhbicgPyBvcHRzLnBsYWluT2JqZWN0cyA6IGRlZmF1bHRzLnBsYWluT2JqZWN0cyxcbiAgICAgICAgc3RyaWN0TnVsbEhhbmRsaW5nOiB0eXBlb2Ygb3B0cy5zdHJpY3ROdWxsSGFuZGxpbmcgPT09ICdib29sZWFuJyA/IG9wdHMuc3RyaWN0TnVsbEhhbmRsaW5nIDogZGVmYXVsdHMuc3RyaWN0TnVsbEhhbmRsaW5nXG4gICAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHN0ciwgb3B0cykge1xuICAgIHZhciBvcHRpb25zID0gbm9ybWFsaXplUGFyc2VPcHRpb25zKG9wdHMpO1xuXG4gICAgaWYgKHN0ciA9PT0gJycgfHwgc3RyID09PSBudWxsIHx8IHR5cGVvZiBzdHIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLnBsYWluT2JqZWN0cyA/IE9iamVjdC5jcmVhdGUobnVsbCkgOiB7fTtcbiAgICB9XG5cbiAgICB2YXIgdGVtcE9iaiA9IHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnID8gcGFyc2VWYWx1ZXMoc3RyLCBvcHRpb25zKSA6IHN0cjtcbiAgICB2YXIgb2JqID0gb3B0aW9ucy5wbGFpbk9iamVjdHMgPyBPYmplY3QuY3JlYXRlKG51bGwpIDoge307XG5cbiAgICAvLyBJdGVyYXRlIG92ZXIgdGhlIGtleXMgYW5kIHNldHVwIHRoZSBuZXcgb2JqZWN0XG5cbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHRlbXBPYmopO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgdmFyIG5ld09iaiA9IHBhcnNlS2V5cyhrZXksIHRlbXBPYmpba2V5XSwgb3B0aW9ucywgdHlwZW9mIHN0ciA9PT0gJ3N0cmluZycpO1xuICAgICAgICBvYmogPSB1dGlscy5tZXJnZShvYmosIG5ld09iaiwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuYWxsb3dTcGFyc2UgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG5cbiAgICByZXR1cm4gdXRpbHMuY29tcGFjdChvYmopO1xufTtcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdpZnkgPSByZXF1aXJlKCcuL3N0cmluZ2lmeScpO1xudmFyIHBhcnNlID0gcmVxdWlyZSgnLi9wYXJzZScpO1xudmFyIGZvcm1hdHMgPSByZXF1aXJlKCcuL2Zvcm1hdHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZm9ybWF0czogZm9ybWF0cyxcbiAgICBwYXJzZTogcGFyc2UsXG4gICAgc3RyaW5naWZ5OiBzdHJpbmdpZnlcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENoZWNrIGlmIHdlJ3JlIHJlcXVpcmVkIHRvIGFkZCBhIHBvcnQgbnVtYmVyLlxuICpcbiAqIEBzZWUgaHR0cHM6Ly91cmwuc3BlYy53aGF0d2cub3JnLyNkZWZhdWx0LXBvcnRcbiAqIEBwYXJhbSB7TnVtYmVyfFN0cmluZ30gcG9ydCBQb3J0IG51bWJlciB3ZSBuZWVkIHRvIGNoZWNrXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJvdG9jb2wgUHJvdG9jb2wgd2UgbmVlZCB0byBjaGVjayBhZ2FpbnN0LlxuICogQHJldHVybnMge0Jvb2xlYW59IElzIGl0IGEgZGVmYXVsdCBwb3J0IGZvciB0aGUgZ2l2ZW4gcHJvdG9jb2xcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJlcXVpcmVkKHBvcnQsIHByb3RvY29sKSB7XG4gIHByb3RvY29sID0gcHJvdG9jb2wuc3BsaXQoJzonKVswXTtcbiAgcG9ydCA9ICtwb3J0O1xuXG4gIGlmICghcG9ydCkgcmV0dXJuIGZhbHNlO1xuXG4gIHN3aXRjaCAocHJvdG9jb2wpIHtcbiAgICBjYXNlICdodHRwJzpcbiAgICBjYXNlICd3cyc6XG4gICAgcmV0dXJuIHBvcnQgIT09IDgwO1xuXG4gICAgY2FzZSAnaHR0cHMnOlxuICAgIGNhc2UgJ3dzcyc6XG4gICAgcmV0dXJuIHBvcnQgIT09IDQ0MztcblxuICAgIGNhc2UgJ2Z0cCc6XG4gICAgcmV0dXJuIHBvcnQgIT09IDIxO1xuXG4gICAgY2FzZSAnZ29waGVyJzpcbiAgICByZXR1cm4gcG9ydCAhPT0gNzA7XG5cbiAgICBjYXNlICdmaWxlJzpcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICByZXR1cm4gcG9ydCAhPT0gMDtcbn07XG4iLCAiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eVxuICAsIHVuZGVmO1xuXG4vKipcbiAqIERlY29kZSBhIFVSSSBlbmNvZGVkIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIFVSSSBlbmNvZGVkIHN0cmluZy5cbiAqIEByZXR1cm5zIHtTdHJpbmd8TnVsbH0gVGhlIGRlY29kZWQgc3RyaW5nLlxuICogQGFwaSBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGRlY29kZShpbnB1dCkge1xuICB0cnkge1xuICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoaW5wdXQucmVwbGFjZSgvXFwrL2csICcgJykpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbn1cblxuLyoqXG4gKiBBdHRlbXB0cyB0byBlbmNvZGUgYSBnaXZlbiBpbnB1dC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaW5wdXQgVGhlIHN0cmluZyB0aGF0IG5lZWRzIHRvIGJlIGVuY29kZWQuXG4gKiBAcmV0dXJucyB7U3RyaW5nfE51bGx9IFRoZSBlbmNvZGVkIHN0cmluZy5cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBlbmNvZGUoaW5wdXQpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGlucHV0KTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG59XG5cbi8qKlxuICogU2ltcGxlIHF1ZXJ5IHN0cmluZyBwYXJzZXIuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHF1ZXJ5IFRoZSBxdWVyeSBzdHJpbmcgdGhhdCBuZWVkcyB0byBiZSBwYXJzZWQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gcXVlcnlzdHJpbmcocXVlcnkpIHtcbiAgdmFyIHBhcnNlciA9IC8oW149PyMmXSspPT8oW14mXSopL2dcbiAgICAsIHJlc3VsdCA9IHt9XG4gICAgLCBwYXJ0O1xuXG4gIHdoaWxlIChwYXJ0ID0gcGFyc2VyLmV4ZWMocXVlcnkpKSB7XG4gICAgdmFyIGtleSA9IGRlY29kZShwYXJ0WzFdKVxuICAgICAgLCB2YWx1ZSA9IGRlY29kZShwYXJ0WzJdKTtcblxuICAgIC8vXG4gICAgLy8gUHJldmVudCBvdmVycmlkaW5nIG9mIGV4aXN0aW5nIHByb3BlcnRpZXMuIFRoaXMgZW5zdXJlcyB0aGF0IGJ1aWxkLWluXG4gICAgLy8gbWV0aG9kcyBsaWtlIGB0b1N0cmluZ2Agb3IgX19wcm90b19fIGFyZSBub3Qgb3ZlcnJpZGVuIGJ5IG1hbGljaW91c1xuICAgIC8vIHF1ZXJ5c3RyaW5ncy5cbiAgICAvL1xuICAgIC8vIEluIHRoZSBjYXNlIGlmIGZhaWxlZCBkZWNvZGluZywgd2Ugd2FudCB0byBvbWl0IHRoZSBrZXkvdmFsdWUgcGFpcnNcbiAgICAvLyBmcm9tIHRoZSByZXN1bHQuXG4gICAgLy9cbiAgICBpZiAoa2V5ID09PSBudWxsIHx8IHZhbHVlID09PSBudWxsIHx8IGtleSBpbiByZXN1bHQpIGNvbnRpbnVlO1xuICAgIHJlc3VsdFtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRyYW5zZm9ybSBhIHF1ZXJ5IHN0cmluZyB0byBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBPYmplY3QgdGhhdCBzaG91bGQgYmUgdHJhbnNmb3JtZWQuXG4gKiBAcGFyYW0ge1N0cmluZ30gcHJlZml4IE9wdGlvbmFsIHByZWZpeC5cbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBxdWVyeXN0cmluZ2lmeShvYmosIHByZWZpeCkge1xuICBwcmVmaXggPSBwcmVmaXggfHwgJyc7XG5cbiAgdmFyIHBhaXJzID0gW11cbiAgICAsIHZhbHVlXG4gICAgLCBrZXk7XG5cbiAgLy9cbiAgLy8gT3B0aW9uYWxseSBwcmVmaXggd2l0aCBhICc/JyBpZiBuZWVkZWRcbiAgLy9cbiAgaWYgKCdzdHJpbmcnICE9PSB0eXBlb2YgcHJlZml4KSBwcmVmaXggPSAnPyc7XG5cbiAgZm9yIChrZXkgaW4gb2JqKSB7XG4gICAgaWYgKGhhcy5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgdmFsdWUgPSBvYmpba2V5XTtcblxuICAgICAgLy9cbiAgICAgIC8vIEVkZ2UgY2FzZXMgd2hlcmUgd2UgYWN0dWFsbHkgd2FudCB0byBlbmNvZGUgdGhlIHZhbHVlIHRvIGFuIGVtcHR5XG4gICAgICAvLyBzdHJpbmcgaW5zdGVhZCBvZiB0aGUgc3RyaW5naWZpZWQgdmFsdWUuXG4gICAgICAvL1xuICAgICAgaWYgKCF2YWx1ZSAmJiAodmFsdWUgPT09IG51bGwgfHwgdmFsdWUgPT09IHVuZGVmIHx8IGlzTmFOKHZhbHVlKSkpIHtcbiAgICAgICAgdmFsdWUgPSAnJztcbiAgICAgIH1cblxuICAgICAga2V5ID0gZW5jb2RlKGtleSk7XG4gICAgICB2YWx1ZSA9IGVuY29kZSh2YWx1ZSk7XG5cbiAgICAgIC8vXG4gICAgICAvLyBJZiB3ZSBmYWlsZWQgdG8gZW5jb2RlIHRoZSBzdHJpbmdzLCB3ZSBzaG91bGQgYmFpbCBvdXQgYXMgd2UgZG9uJ3RcbiAgICAgIC8vIHdhbnQgdG8gYWRkIGludmFsaWQgc3RyaW5ncyB0byB0aGUgcXVlcnkuXG4gICAgICAvL1xuICAgICAgaWYgKGtleSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gbnVsbCkgY29udGludWU7XG4gICAgICBwYWlycy5wdXNoKGtleSArJz0nKyB2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHBhaXJzLmxlbmd0aCA/IHByZWZpeCArIHBhaXJzLmpvaW4oJyYnKSA6ICcnO1xufVxuXG4vL1xuLy8gRXhwb3NlIHRoZSBtb2R1bGUuXG4vL1xuZXhwb3J0cy5zdHJpbmdpZnkgPSBxdWVyeXN0cmluZ2lmeTtcbmV4cG9ydHMucGFyc2UgPSBxdWVyeXN0cmluZztcbiIsICIndXNlIHN0cmljdCc7XG5cbnZhciByZXF1aXJlZCA9IHJlcXVpcmUoJ3JlcXVpcmVzLXBvcnQnKVxuICAsIHFzID0gcmVxdWlyZSgncXVlcnlzdHJpbmdpZnknKVxuICAsIGNvbnRyb2xPcldoaXRlc3BhY2UgPSAvXltcXHgwMC1cXHgyMFxcdTAwYTBcXHUxNjgwXFx1MjAwMC1cXHUyMDBhXFx1MjAyOFxcdTIwMjlcXHUyMDJmXFx1MjA1ZlxcdTMwMDBcXHVmZWZmXSsvXG4gICwgQ1JIVExGID0gL1tcXG5cXHJcXHRdL2dcbiAgLCBzbGFzaGVzID0gL15bQS1aYS16XVtBLVphLXowLTkrLS5dKjpcXC9cXC8vXG4gICwgcG9ydCA9IC86XFxkKyQvXG4gICwgcHJvdG9jb2xyZSA9IC9eKFthLXpdW2EtejAtOS4rLV0qOik/KFxcL1xcLyk/KFtcXFxcL10rKT8oW1xcU1xcc10qKS9pXG4gICwgd2luZG93c0RyaXZlTGV0dGVyID0gL15bYS16QS1aXTovO1xuXG4vKipcbiAqIFJlbW92ZSBjb250cm9sIGNoYXJhY3RlcnMgYW5kIHdoaXRlc3BhY2UgZnJvbSB0aGUgYmVnaW5uaW5nIG9mIGEgc3RyaW5nLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gc3RyIFN0cmluZyB0byB0cmltLlxuICogQHJldHVybnMge1N0cmluZ30gQSBuZXcgc3RyaW5nIHJlcHJlc2VudGluZyBgc3RyYCBzdHJpcHBlZCBvZiBjb250cm9sXG4gKiAgICAgY2hhcmFjdGVycyBhbmQgd2hpdGVzcGFjZSBmcm9tIGl0cyBiZWdpbm5pbmcuXG4gKiBAcHVibGljXG4gKi9cbmZ1bmN0aW9uIHRyaW1MZWZ0KHN0cikge1xuICByZXR1cm4gKHN0ciA/IHN0ciA6ICcnKS50b1N0cmluZygpLnJlcGxhY2UoY29udHJvbE9yV2hpdGVzcGFjZSwgJycpO1xufVxuXG4vKipcbiAqIFRoZXNlIGFyZSB0aGUgcGFyc2UgcnVsZXMgZm9yIHRoZSBVUkwgcGFyc2VyLCBpdCBpbmZvcm1zIHRoZSBwYXJzZXJcbiAqIGFib3V0OlxuICpcbiAqIDAuIFRoZSBjaGFyIGl0IE5lZWRzIHRvIHBhcnNlLCBpZiBpdCdzIGEgc3RyaW5nIGl0IHNob3VsZCBiZSBkb25lIHVzaW5nXG4gKiAgICBpbmRleE9mLCBSZWdFeHAgdXNpbmcgZXhlYyBhbmQgTmFOIG1lYW5zIHNldCBhcyBjdXJyZW50IHZhbHVlLlxuICogMS4gVGhlIHByb3BlcnR5IHdlIHNob3VsZCBzZXQgd2hlbiBwYXJzaW5nIHRoaXMgdmFsdWUuXG4gKiAyLiBJbmRpY2F0aW9uIGlmIGl0J3MgYmFja3dhcmRzIG9yIGZvcndhcmQgcGFyc2luZywgd2hlbiBzZXQgYXMgbnVtYmVyIGl0J3NcbiAqICAgIHRoZSB2YWx1ZSBvZiBleHRyYSBjaGFycyB0aGF0IHNob3VsZCBiZSBzcGxpdCBvZmYuXG4gKiAzLiBJbmhlcml0IGZyb20gbG9jYXRpb24gaWYgbm9uIGV4aXN0aW5nIGluIHRoZSBwYXJzZXIuXG4gKiA0LiBgdG9Mb3dlckNhc2VgIHRoZSByZXN1bHRpbmcgdmFsdWUuXG4gKi9cbnZhciBydWxlcyA9IFtcbiAgWycjJywgJ2hhc2gnXSwgICAgICAgICAgICAgICAgICAgICAgICAvLyBFeHRyYWN0IGZyb20gdGhlIGJhY2suXG4gIFsnPycsICdxdWVyeSddLCAgICAgICAgICAgICAgICAgICAgICAgLy8gRXh0cmFjdCBmcm9tIHRoZSBiYWNrLlxuICBmdW5jdGlvbiBzYW5pdGl6ZShhZGRyZXNzLCB1cmwpIHsgICAgIC8vIFNhbml0aXplIHdoYXQgaXMgbGVmdCBvZiB0aGUgYWRkcmVzc1xuICAgIHJldHVybiBpc1NwZWNpYWwodXJsLnByb3RvY29sKSA/IGFkZHJlc3MucmVwbGFjZSgvXFxcXC9nLCAnLycpIDogYWRkcmVzcztcbiAgfSxcbiAgWycvJywgJ3BhdGhuYW1lJ10sICAgICAgICAgICAgICAgICAgICAvLyBFeHRyYWN0IGZyb20gdGhlIGJhY2suXG4gIFsnQCcsICdhdXRoJywgMV0sICAgICAgICAgICAgICAgICAgICAgLy8gRXh0cmFjdCBmcm9tIHRoZSBmcm9udC5cbiAgW05hTiwgJ2hvc3QnLCB1bmRlZmluZWQsIDEsIDFdLCAgICAgICAvLyBTZXQgbGVmdCBvdmVyIHZhbHVlLlxuICBbLzooXFxkKikkLywgJ3BvcnQnLCB1bmRlZmluZWQsIDFdLCAgICAvLyBSZWdFeHAgdGhlIGJhY2suXG4gIFtOYU4sICdob3N0bmFtZScsIHVuZGVmaW5lZCwgMSwgMV0gICAgLy8gU2V0IGxlZnQgb3Zlci5cbl07XG5cbi8qKlxuICogVGhlc2UgcHJvcGVydGllcyBzaG91bGQgbm90IGJlIGNvcGllZCBvciBpbmhlcml0ZWQgZnJvbS4gVGhpcyBpcyBvbmx5IG5lZWRlZFxuICogZm9yIGFsbCBub24gYmxvYiBVUkwncyBhcyBhIGJsb2IgVVJMIGRvZXMgbm90IGluY2x1ZGUgYSBoYXNoLCBvbmx5IHRoZVxuICogb3JpZ2luLlxuICpcbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG52YXIgaWdub3JlID0geyBoYXNoOiAxLCBxdWVyeTogMSB9O1xuXG4vKipcbiAqIFRoZSBsb2NhdGlvbiBvYmplY3QgZGlmZmVycyB3aGVuIHlvdXIgY29kZSBpcyBsb2FkZWQgdGhyb3VnaCBhIG5vcm1hbCBwYWdlLFxuICogV29ya2VyIG9yIHRocm91Z2ggYSB3b3JrZXIgdXNpbmcgYSBibG9iLiBBbmQgd2l0aCB0aGUgYmxvYmJsZSBiZWdpbnMgdGhlXG4gKiB0cm91YmxlIGFzIHRoZSBsb2NhdGlvbiBvYmplY3Qgd2lsbCBjb250YWluIHRoZSBVUkwgb2YgdGhlIGJsb2IsIG5vdCB0aGVcbiAqIGxvY2F0aW9uIG9mIHRoZSBwYWdlIHdoZXJlIG91ciBjb2RlIGlzIGxvYWRlZCBpbi4gVGhlIGFjdHVhbCBvcmlnaW4gaXNcbiAqIGVuY29kZWQgaW4gdGhlIGBwYXRobmFtZWAgc28gd2UgY2FuIHRoYW5rZnVsbHkgZ2VuZXJhdGUgYSBnb29kIFwiZGVmYXVsdFwiXG4gKiBsb2NhdGlvbiBmcm9tIGl0IHNvIHdlIGNhbiBnZW5lcmF0ZSBwcm9wZXIgcmVsYXRpdmUgVVJMJ3MgYWdhaW4uXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBsb2MgT3B0aW9uYWwgZGVmYXVsdCBsb2NhdGlvbiBvYmplY3QuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBsb2xjYXRpb24gb2JqZWN0LlxuICogQHB1YmxpY1xuICovXG5mdW5jdGlvbiBsb2xjYXRpb24obG9jKSB7XG4gIHZhciBnbG9iYWxWYXI7XG5cbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSBnbG9iYWxWYXIgPSB3aW5kb3c7XG4gIGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSBnbG9iYWxWYXIgPSBnbG9iYWw7XG4gIGVsc2UgaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykgZ2xvYmFsVmFyID0gc2VsZjtcbiAgZWxzZSBnbG9iYWxWYXIgPSB7fTtcblxuICB2YXIgbG9jYXRpb24gPSBnbG9iYWxWYXIubG9jYXRpb24gfHwge307XG4gIGxvYyA9IGxvYyB8fCBsb2NhdGlvbjtcblxuICB2YXIgZmluYWxkZXN0aW5hdGlvbiA9IHt9XG4gICAgLCB0eXBlID0gdHlwZW9mIGxvY1xuICAgICwga2V5O1xuXG4gIGlmICgnYmxvYjonID09PSBsb2MucHJvdG9jb2wpIHtcbiAgICBmaW5hbGRlc3RpbmF0aW9uID0gbmV3IFVybCh1bmVzY2FwZShsb2MucGF0aG5hbWUpLCB7fSk7XG4gIH0gZWxzZSBpZiAoJ3N0cmluZycgPT09IHR5cGUpIHtcbiAgICBmaW5hbGRlc3RpbmF0aW9uID0gbmV3IFVybChsb2MsIHt9KTtcbiAgICBmb3IgKGtleSBpbiBpZ25vcmUpIGRlbGV0ZSBmaW5hbGRlc3RpbmF0aW9uW2tleV07XG4gIH0gZWxzZSBpZiAoJ29iamVjdCcgPT09IHR5cGUpIHtcbiAgICBmb3IgKGtleSBpbiBsb2MpIHtcbiAgICAgIGlmIChrZXkgaW4gaWdub3JlKSBjb250aW51ZTtcbiAgICAgIGZpbmFsZGVzdGluYXRpb25ba2V5XSA9IGxvY1trZXldO1xuICAgIH1cblxuICAgIGlmIChmaW5hbGRlc3RpbmF0aW9uLnNsYXNoZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZmluYWxkZXN0aW5hdGlvbi5zbGFzaGVzID0gc2xhc2hlcy50ZXN0KGxvYy5ocmVmKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmluYWxkZXN0aW5hdGlvbjtcbn1cblxuLyoqXG4gKiBDaGVjayB3aGV0aGVyIGEgcHJvdG9jb2wgc2NoZW1lIGlzIHNwZWNpYWwuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IFRoZSBwcm90b2NvbCBzY2hlbWUgb2YgdGhlIFVSTFxuICogQHJldHVybiB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBwcm90b2NvbCBzY2hlbWUgaXMgc3BlY2lhbCwgZWxzZSBgZmFsc2VgXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBpc1NwZWNpYWwoc2NoZW1lKSB7XG4gIHJldHVybiAoXG4gICAgc2NoZW1lID09PSAnZmlsZTonIHx8XG4gICAgc2NoZW1lID09PSAnZnRwOicgfHxcbiAgICBzY2hlbWUgPT09ICdodHRwOicgfHxcbiAgICBzY2hlbWUgPT09ICdodHRwczonIHx8XG4gICAgc2NoZW1lID09PSAnd3M6JyB8fFxuICAgIHNjaGVtZSA9PT0gJ3dzczonXG4gICk7XG59XG5cbi8qKlxuICogQHR5cGVkZWYgUHJvdG9jb2xFeHRyYWN0XG4gKiBAdHlwZSBPYmplY3RcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBwcm90b2NvbCBQcm90b2NvbCBtYXRjaGVkIGluIHRoZSBVUkwsIGluIGxvd2VyY2FzZS5cbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gc2xhc2hlcyBgdHJ1ZWAgaWYgcHJvdG9jb2wgaXMgZm9sbG93ZWQgYnkgXCIvL1wiLCBlbHNlIGBmYWxzZWAuXG4gKiBAcHJvcGVydHkge1N0cmluZ30gcmVzdCBSZXN0IG9mIHRoZSBVUkwgdGhhdCBpcyBub3QgcGFydCBvZiB0aGUgcHJvdG9jb2wuXG4gKi9cblxuLyoqXG4gKiBFeHRyYWN0IHByb3RvY29sIGluZm9ybWF0aW9uIGZyb20gYSBVUkwgd2l0aC93aXRob3V0IGRvdWJsZSBzbGFzaCAoXCIvL1wiKS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gYWRkcmVzcyBVUkwgd2Ugd2FudCB0byBleHRyYWN0IGZyb20uXG4gKiBAcGFyYW0ge09iamVjdH0gbG9jYXRpb25cbiAqIEByZXR1cm4ge1Byb3RvY29sRXh0cmFjdH0gRXh0cmFjdGVkIGluZm9ybWF0aW9uLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gZXh0cmFjdFByb3RvY29sKGFkZHJlc3MsIGxvY2F0aW9uKSB7XG4gIGFkZHJlc3MgPSB0cmltTGVmdChhZGRyZXNzKTtcbiAgYWRkcmVzcyA9IGFkZHJlc3MucmVwbGFjZShDUkhUTEYsICcnKTtcbiAgbG9jYXRpb24gPSBsb2NhdGlvbiB8fCB7fTtcblxuICB2YXIgbWF0Y2ggPSBwcm90b2NvbHJlLmV4ZWMoYWRkcmVzcyk7XG4gIHZhciBwcm90b2NvbCA9IG1hdGNoWzFdID8gbWF0Y2hbMV0udG9Mb3dlckNhc2UoKSA6ICcnO1xuICB2YXIgZm9yd2FyZFNsYXNoZXMgPSAhIW1hdGNoWzJdO1xuICB2YXIgb3RoZXJTbGFzaGVzID0gISFtYXRjaFszXTtcbiAgdmFyIHNsYXNoZXNDb3VudCA9IDA7XG4gIHZhciByZXN0O1xuXG4gIGlmIChmb3J3YXJkU2xhc2hlcykge1xuICAgIGlmIChvdGhlclNsYXNoZXMpIHtcbiAgICAgIHJlc3QgPSBtYXRjaFsyXSArIG1hdGNoWzNdICsgbWF0Y2hbNF07XG4gICAgICBzbGFzaGVzQ291bnQgPSBtYXRjaFsyXS5sZW5ndGggKyBtYXRjaFszXS5sZW5ndGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3QgPSBtYXRjaFsyXSArIG1hdGNoWzRdO1xuICAgICAgc2xhc2hlc0NvdW50ID0gbWF0Y2hbMl0ubGVuZ3RoO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAob3RoZXJTbGFzaGVzKSB7XG4gICAgICByZXN0ID0gbWF0Y2hbM10gKyBtYXRjaFs0XTtcbiAgICAgIHNsYXNoZXNDb3VudCA9IG1hdGNoWzNdLmxlbmd0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdCA9IG1hdGNoWzRdXG4gICAgfVxuICB9XG5cbiAgaWYgKHByb3RvY29sID09PSAnZmlsZTonKSB7XG4gICAgaWYgKHNsYXNoZXNDb3VudCA+PSAyKSB7XG4gICAgICByZXN0ID0gcmVzdC5zbGljZSgyKTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNTcGVjaWFsKHByb3RvY29sKSkge1xuICAgIHJlc3QgPSBtYXRjaFs0XTtcbiAgfSBlbHNlIGlmIChwcm90b2NvbCkge1xuICAgIGlmIChmb3J3YXJkU2xhc2hlcykge1xuICAgICAgcmVzdCA9IHJlc3Quc2xpY2UoMik7XG4gICAgfVxuICB9IGVsc2UgaWYgKHNsYXNoZXNDb3VudCA+PSAyICYmIGlzU3BlY2lhbChsb2NhdGlvbi5wcm90b2NvbCkpIHtcbiAgICByZXN0ID0gbWF0Y2hbNF07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHByb3RvY29sOiBwcm90b2NvbCxcbiAgICBzbGFzaGVzOiBmb3J3YXJkU2xhc2hlcyB8fCBpc1NwZWNpYWwocHJvdG9jb2wpLFxuICAgIHNsYXNoZXNDb3VudDogc2xhc2hlc0NvdW50LFxuICAgIHJlc3Q6IHJlc3RcbiAgfTtcbn1cblxuLyoqXG4gKiBSZXNvbHZlIGEgcmVsYXRpdmUgVVJMIHBhdGhuYW1lIGFnYWluc3QgYSBiYXNlIFVSTCBwYXRobmFtZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcmVsYXRpdmUgUGF0aG5hbWUgb2YgdGhlIHJlbGF0aXZlIFVSTC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBiYXNlIFBhdGhuYW1lIG9mIHRoZSBiYXNlIFVSTC5cbiAqIEByZXR1cm4ge1N0cmluZ30gUmVzb2x2ZWQgcGF0aG5hbWUuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiByZXNvbHZlKHJlbGF0aXZlLCBiYXNlKSB7XG4gIGlmIChyZWxhdGl2ZSA9PT0gJycpIHJldHVybiBiYXNlO1xuXG4gIHZhciBwYXRoID0gKGJhc2UgfHwgJy8nKS5zcGxpdCgnLycpLnNsaWNlKDAsIC0xKS5jb25jYXQocmVsYXRpdmUuc3BsaXQoJy8nKSlcbiAgICAsIGkgPSBwYXRoLmxlbmd0aFxuICAgICwgbGFzdCA9IHBhdGhbaSAtIDFdXG4gICAgLCB1bnNoaWZ0ID0gZmFsc2VcbiAgICAsIHVwID0gMDtcblxuICB3aGlsZSAoaS0tKSB7XG4gICAgaWYgKHBhdGhbaV0gPT09ICcuJykge1xuICAgICAgcGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgfSBlbHNlIGlmIChwYXRoW2ldID09PSAnLi4nKSB7XG4gICAgICBwYXRoLnNwbGljZShpLCAxKTtcbiAgICAgIHVwKys7XG4gICAgfSBlbHNlIGlmICh1cCkge1xuICAgICAgaWYgKGkgPT09IDApIHVuc2hpZnQgPSB0cnVlO1xuICAgICAgcGF0aC5zcGxpY2UoaSwgMSk7XG4gICAgICB1cC0tO1xuICAgIH1cbiAgfVxuXG4gIGlmICh1bnNoaWZ0KSBwYXRoLnVuc2hpZnQoJycpO1xuICBpZiAobGFzdCA9PT0gJy4nIHx8IGxhc3QgPT09ICcuLicpIHBhdGgucHVzaCgnJyk7XG5cbiAgcmV0dXJuIHBhdGguam9pbignLycpO1xufVxuXG4vKipcbiAqIFRoZSBhY3R1YWwgVVJMIGluc3RhbmNlLiBJbnN0ZWFkIG9mIHJldHVybmluZyBhbiBvYmplY3Qgd2UndmUgb3B0ZWQtaW4gdG9cbiAqIGNyZWF0ZSBhbiBhY3R1YWwgY29uc3RydWN0b3IgYXMgaXQncyBtdWNoIG1vcmUgbWVtb3J5IGVmZmljaWVudCBhbmRcbiAqIGZhc3RlciBhbmQgaXQgcGxlYXNlcyBteSBPQ0QuXG4gKlxuICogSXQgaXMgd29ydGggbm90aW5nIHRoYXQgd2Ugc2hvdWxkIG5vdCB1c2UgYFVSTGAgYXMgY2xhc3MgbmFtZSB0byBwcmV2ZW50XG4gKiBjbGFzaGVzIHdpdGggdGhlIGdsb2JhbCBVUkwgaW5zdGFuY2UgdGhhdCBnb3QgaW50cm9kdWNlZCBpbiBicm93c2Vycy5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7U3RyaW5nfSBhZGRyZXNzIFVSTCB3ZSB3YW50IHRvIHBhcnNlLlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBbbG9jYXRpb25dIExvY2F0aW9uIGRlZmF1bHRzIGZvciByZWxhdGl2ZSBwYXRocy5cbiAqIEBwYXJhbSB7Qm9vbGVhbnxGdW5jdGlvbn0gW3BhcnNlcl0gUGFyc2VyIGZvciB0aGUgcXVlcnkgc3RyaW5nLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gVXJsKGFkZHJlc3MsIGxvY2F0aW9uLCBwYXJzZXIpIHtcbiAgYWRkcmVzcyA9IHRyaW1MZWZ0KGFkZHJlc3MpO1xuICBhZGRyZXNzID0gYWRkcmVzcy5yZXBsYWNlKENSSFRMRiwgJycpO1xuXG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBVcmwpKSB7XG4gICAgcmV0dXJuIG5ldyBVcmwoYWRkcmVzcywgbG9jYXRpb24sIHBhcnNlcik7XG4gIH1cblxuICB2YXIgcmVsYXRpdmUsIGV4dHJhY3RlZCwgcGFyc2UsIGluc3RydWN0aW9uLCBpbmRleCwga2V5XG4gICAgLCBpbnN0cnVjdGlvbnMgPSBydWxlcy5zbGljZSgpXG4gICAgLCB0eXBlID0gdHlwZW9mIGxvY2F0aW9uXG4gICAgLCB1cmwgPSB0aGlzXG4gICAgLCBpID0gMDtcblxuICAvL1xuICAvLyBUaGUgZm9sbG93aW5nIGlmIHN0YXRlbWVudHMgYWxsb3dzIHRoaXMgbW9kdWxlIHR3byBoYXZlIGNvbXBhdGliaWxpdHkgd2l0aFxuICAvLyAyIGRpZmZlcmVudCBBUEk6XG4gIC8vXG4gIC8vIDEuIE5vZGUuanMncyBgdXJsLnBhcnNlYCBhcGkgd2hpY2ggYWNjZXB0cyBhIFVSTCwgYm9vbGVhbiBhcyBhcmd1bWVudHNcbiAgLy8gICAgd2hlcmUgdGhlIGJvb2xlYW4gaW5kaWNhdGVzIHRoYXQgdGhlIHF1ZXJ5IHN0cmluZyBzaG91bGQgYWxzbyBiZSBwYXJzZWQuXG4gIC8vXG4gIC8vIDIuIFRoZSBgVVJMYCBpbnRlcmZhY2Ugb2YgdGhlIGJyb3dzZXIgd2hpY2ggYWNjZXB0cyBhIFVSTCwgb2JqZWN0IGFzXG4gIC8vICAgIGFyZ3VtZW50cy4gVGhlIHN1cHBsaWVkIG9iamVjdCB3aWxsIGJlIHVzZWQgYXMgZGVmYXVsdCB2YWx1ZXMgLyBmYWxsLWJhY2tcbiAgLy8gICAgZm9yIHJlbGF0aXZlIHBhdGhzLlxuICAvL1xuICBpZiAoJ29iamVjdCcgIT09IHR5cGUgJiYgJ3N0cmluZycgIT09IHR5cGUpIHtcbiAgICBwYXJzZXIgPSBsb2NhdGlvbjtcbiAgICBsb2NhdGlvbiA9IG51bGw7XG4gIH1cblxuICBpZiAocGFyc2VyICYmICdmdW5jdGlvbicgIT09IHR5cGVvZiBwYXJzZXIpIHBhcnNlciA9IHFzLnBhcnNlO1xuXG4gIGxvY2F0aW9uID0gbG9sY2F0aW9uKGxvY2F0aW9uKTtcblxuICAvL1xuICAvLyBFeHRyYWN0IHByb3RvY29sIGluZm9ybWF0aW9uIGJlZm9yZSBydW5uaW5nIHRoZSBpbnN0cnVjdGlvbnMuXG4gIC8vXG4gIGV4dHJhY3RlZCA9IGV4dHJhY3RQcm90b2NvbChhZGRyZXNzIHx8ICcnLCBsb2NhdGlvbik7XG4gIHJlbGF0aXZlID0gIWV4dHJhY3RlZC5wcm90b2NvbCAmJiAhZXh0cmFjdGVkLnNsYXNoZXM7XG4gIHVybC5zbGFzaGVzID0gZXh0cmFjdGVkLnNsYXNoZXMgfHwgcmVsYXRpdmUgJiYgbG9jYXRpb24uc2xhc2hlcztcbiAgdXJsLnByb3RvY29sID0gZXh0cmFjdGVkLnByb3RvY29sIHx8IGxvY2F0aW9uLnByb3RvY29sIHx8ICcnO1xuICBhZGRyZXNzID0gZXh0cmFjdGVkLnJlc3Q7XG5cbiAgLy9cbiAgLy8gV2hlbiB0aGUgYXV0aG9yaXR5IGNvbXBvbmVudCBpcyBhYnNlbnQgdGhlIFVSTCBzdGFydHMgd2l0aCBhIHBhdGhcbiAgLy8gY29tcG9uZW50LlxuICAvL1xuICBpZiAoXG4gICAgZXh0cmFjdGVkLnByb3RvY29sID09PSAnZmlsZTonICYmIChcbiAgICAgIGV4dHJhY3RlZC5zbGFzaGVzQ291bnQgIT09IDIgfHwgd2luZG93c0RyaXZlTGV0dGVyLnRlc3QoYWRkcmVzcykpIHx8XG4gICAgKCFleHRyYWN0ZWQuc2xhc2hlcyAmJlxuICAgICAgKGV4dHJhY3RlZC5wcm90b2NvbCB8fFxuICAgICAgICBleHRyYWN0ZWQuc2xhc2hlc0NvdW50IDwgMiB8fFxuICAgICAgICAhaXNTcGVjaWFsKHVybC5wcm90b2NvbCkpKVxuICApIHtcbiAgICBpbnN0cnVjdGlvbnNbM10gPSBbLyguKikvLCAncGF0aG5hbWUnXTtcbiAgfVxuXG4gIGZvciAoOyBpIDwgaW5zdHJ1Y3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgaW5zdHJ1Y3Rpb24gPSBpbnN0cnVjdGlvbnNbaV07XG5cbiAgICBpZiAodHlwZW9mIGluc3RydWN0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBhZGRyZXNzID0gaW5zdHJ1Y3Rpb24oYWRkcmVzcywgdXJsKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHBhcnNlID0gaW5zdHJ1Y3Rpb25bMF07XG4gICAga2V5ID0gaW5zdHJ1Y3Rpb25bMV07XG5cbiAgICBpZiAocGFyc2UgIT09IHBhcnNlKSB7XG4gICAgICB1cmxba2V5XSA9IGFkZHJlc3M7XG4gICAgfSBlbHNlIGlmICgnc3RyaW5nJyA9PT0gdHlwZW9mIHBhcnNlKSB7XG4gICAgICBpbmRleCA9IHBhcnNlID09PSAnQCdcbiAgICAgICAgPyBhZGRyZXNzLmxhc3RJbmRleE9mKHBhcnNlKVxuICAgICAgICA6IGFkZHJlc3MuaW5kZXhPZihwYXJzZSk7XG5cbiAgICAgIGlmICh+aW5kZXgpIHtcbiAgICAgICAgaWYgKCdudW1iZXInID09PSB0eXBlb2YgaW5zdHJ1Y3Rpb25bMl0pIHtcbiAgICAgICAgICB1cmxba2V5XSA9IGFkZHJlc3Muc2xpY2UoMCwgaW5kZXgpO1xuICAgICAgICAgIGFkZHJlc3MgPSBhZGRyZXNzLnNsaWNlKGluZGV4ICsgaW5zdHJ1Y3Rpb25bMl0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVybFtrZXldID0gYWRkcmVzcy5zbGljZShpbmRleCk7XG4gICAgICAgICAgYWRkcmVzcyA9IGFkZHJlc3Muc2xpY2UoMCwgaW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICgoaW5kZXggPSBwYXJzZS5leGVjKGFkZHJlc3MpKSkge1xuICAgICAgdXJsW2tleV0gPSBpbmRleFsxXTtcbiAgICAgIGFkZHJlc3MgPSBhZGRyZXNzLnNsaWNlKDAsIGluZGV4LmluZGV4KTtcbiAgICB9XG5cbiAgICB1cmxba2V5XSA9IHVybFtrZXldIHx8IChcbiAgICAgIHJlbGF0aXZlICYmIGluc3RydWN0aW9uWzNdID8gbG9jYXRpb25ba2V5XSB8fCAnJyA6ICcnXG4gICAgKTtcblxuICAgIC8vXG4gICAgLy8gSG9zdG5hbWUsIGhvc3QgYW5kIHByb3RvY29sIHNob3VsZCBiZSBsb3dlcmNhc2VkIHNvIHRoZXkgY2FuIGJlIHVzZWQgdG9cbiAgICAvLyBjcmVhdGUgYSBwcm9wZXIgYG9yaWdpbmAuXG4gICAgLy9cbiAgICBpZiAoaW5zdHJ1Y3Rpb25bNF0pIHVybFtrZXldID0gdXJsW2tleV0udG9Mb3dlckNhc2UoKTtcbiAgfVxuXG4gIC8vXG4gIC8vIEFsc28gcGFyc2UgdGhlIHN1cHBsaWVkIHF1ZXJ5IHN0cmluZyBpbiB0byBhbiBvYmplY3QuIElmIHdlJ3JlIHN1cHBsaWVkXG4gIC8vIHdpdGggYSBjdXN0b20gcGFyc2VyIGFzIGZ1bmN0aW9uIHVzZSB0aGF0IGluc3RlYWQgb2YgdGhlIGRlZmF1bHQgYnVpbGQtaW5cbiAgLy8gcGFyc2VyLlxuICAvL1xuICBpZiAocGFyc2VyKSB1cmwucXVlcnkgPSBwYXJzZXIodXJsLnF1ZXJ5KTtcblxuICAvL1xuICAvLyBJZiB0aGUgVVJMIGlzIHJlbGF0aXZlLCByZXNvbHZlIHRoZSBwYXRobmFtZSBhZ2FpbnN0IHRoZSBiYXNlIFVSTC5cbiAgLy9cbiAgaWYgKFxuICAgICAgcmVsYXRpdmVcbiAgICAmJiBsb2NhdGlvbi5zbGFzaGVzXG4gICAgJiYgdXJsLnBhdGhuYW1lLmNoYXJBdCgwKSAhPT0gJy8nXG4gICAgJiYgKHVybC5wYXRobmFtZSAhPT0gJycgfHwgbG9jYXRpb24ucGF0aG5hbWUgIT09ICcnKVxuICApIHtcbiAgICB1cmwucGF0aG5hbWUgPSByZXNvbHZlKHVybC5wYXRobmFtZSwgbG9jYXRpb24ucGF0aG5hbWUpO1xuICB9XG5cbiAgLy9cbiAgLy8gRGVmYXVsdCB0byBhIC8gZm9yIHBhdGhuYW1lIGlmIG5vbmUgZXhpc3RzLiBUaGlzIG5vcm1hbGl6ZXMgdGhlIFVSTFxuICAvLyB0byBhbHdheXMgaGF2ZSBhIC9cbiAgLy9cbiAgaWYgKHVybC5wYXRobmFtZS5jaGFyQXQoMCkgIT09ICcvJyAmJiBpc1NwZWNpYWwodXJsLnByb3RvY29sKSkge1xuICAgIHVybC5wYXRobmFtZSA9ICcvJyArIHVybC5wYXRobmFtZTtcbiAgfVxuXG4gIC8vXG4gIC8vIFdlIHNob3VsZCBub3QgYWRkIHBvcnQgbnVtYmVycyBpZiB0aGV5IGFyZSBhbHJlYWR5IHRoZSBkZWZhdWx0IHBvcnQgbnVtYmVyXG4gIC8vIGZvciBhIGdpdmVuIHByb3RvY29sLiBBcyB0aGUgaG9zdCBhbHNvIGNvbnRhaW5zIHRoZSBwb3J0IG51bWJlciB3ZSdyZSBnb2luZ1xuICAvLyBvdmVycmlkZSBpdCB3aXRoIHRoZSBob3N0bmFtZSB3aGljaCBjb250YWlucyBubyBwb3J0IG51bWJlci5cbiAgLy9cbiAgaWYgKCFyZXF1aXJlZCh1cmwucG9ydCwgdXJsLnByb3RvY29sKSkge1xuICAgIHVybC5ob3N0ID0gdXJsLmhvc3RuYW1lO1xuICAgIHVybC5wb3J0ID0gJyc7XG4gIH1cblxuICAvL1xuICAvLyBQYXJzZSBkb3duIHRoZSBgYXV0aGAgZm9yIHRoZSB1c2VybmFtZSBhbmQgcGFzc3dvcmQuXG4gIC8vXG4gIHVybC51c2VybmFtZSA9IHVybC5wYXNzd29yZCA9ICcnO1xuXG4gIGlmICh1cmwuYXV0aCkge1xuICAgIGluZGV4ID0gdXJsLmF1dGguaW5kZXhPZignOicpO1xuXG4gICAgaWYgKH5pbmRleCkge1xuICAgICAgdXJsLnVzZXJuYW1lID0gdXJsLmF1dGguc2xpY2UoMCwgaW5kZXgpO1xuICAgICAgdXJsLnVzZXJuYW1lID0gZW5jb2RlVVJJQ29tcG9uZW50KGRlY29kZVVSSUNvbXBvbmVudCh1cmwudXNlcm5hbWUpKTtcblxuICAgICAgdXJsLnBhc3N3b3JkID0gdXJsLmF1dGguc2xpY2UoaW5kZXggKyAxKTtcbiAgICAgIHVybC5wYXNzd29yZCA9IGVuY29kZVVSSUNvbXBvbmVudChkZWNvZGVVUklDb21wb25lbnQodXJsLnBhc3N3b3JkKSlcbiAgICB9IGVsc2Uge1xuICAgICAgdXJsLnVzZXJuYW1lID0gZW5jb2RlVVJJQ29tcG9uZW50KGRlY29kZVVSSUNvbXBvbmVudCh1cmwuYXV0aCkpO1xuICAgIH1cblxuICAgIHVybC5hdXRoID0gdXJsLnBhc3N3b3JkID8gdXJsLnVzZXJuYW1lICsnOicrIHVybC5wYXNzd29yZCA6IHVybC51c2VybmFtZTtcbiAgfVxuXG4gIHVybC5vcmlnaW4gPSB1cmwucHJvdG9jb2wgIT09ICdmaWxlOicgJiYgaXNTcGVjaWFsKHVybC5wcm90b2NvbCkgJiYgdXJsLmhvc3RcbiAgICA/IHVybC5wcm90b2NvbCArJy8vJysgdXJsLmhvc3RcbiAgICA6ICdudWxsJztcblxuICAvL1xuICAvLyBUaGUgaHJlZiBpcyBqdXN0IHRoZSBjb21waWxlZCByZXN1bHQuXG4gIC8vXG4gIHVybC5ocmVmID0gdXJsLnRvU3RyaW5nKCk7XG59XG5cbi8qKlxuICogVGhpcyBpcyBjb252ZW5pZW5jZSBtZXRob2QgZm9yIGNoYW5naW5nIHByb3BlcnRpZXMgaW4gdGhlIFVSTCBpbnN0YW5jZSB0b1xuICogaW5zdXJlIHRoYXQgdGhleSBhbGwgcHJvcGFnYXRlIGNvcnJlY3RseS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gcGFydCAgICAgICAgICBQcm9wZXJ0eSB3ZSBuZWVkIHRvIGFkanVzdC5cbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbHVlICAgICAgICAgIFRoZSBuZXdseSBhc3NpZ25lZCB2YWx1ZS5cbiAqIEBwYXJhbSB7Qm9vbGVhbnxGdW5jdGlvbn0gZm4gIFdoZW4gc2V0dGluZyB0aGUgcXVlcnksIGl0IHdpbGwgYmUgdGhlIGZ1bmN0aW9uXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB1c2VkIHRvIHBhcnNlIHRoZSBxdWVyeS5cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFdoZW4gc2V0dGluZyB0aGUgcHJvdG9jb2wsIGRvdWJsZSBzbGFzaCB3aWxsIGJlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZW1vdmVkIGZyb20gdGhlIGZpbmFsIHVybCBpZiBpdCBpcyB0cnVlLlxuICogQHJldHVybnMge1VSTH0gVVJMIGluc3RhbmNlIGZvciBjaGFpbmluZy5cbiAqIEBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gc2V0KHBhcnQsIHZhbHVlLCBmbikge1xuICB2YXIgdXJsID0gdGhpcztcblxuICBzd2l0Y2ggKHBhcnQpIHtcbiAgICBjYXNlICdxdWVyeSc6XG4gICAgICBpZiAoJ3N0cmluZycgPT09IHR5cGVvZiB2YWx1ZSAmJiB2YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgdmFsdWUgPSAoZm4gfHwgcXMucGFyc2UpKHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgdXJsW3BhcnRdID0gdmFsdWU7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ3BvcnQnOlxuICAgICAgdXJsW3BhcnRdID0gdmFsdWU7XG5cbiAgICAgIGlmICghcmVxdWlyZWQodmFsdWUsIHVybC5wcm90b2NvbCkpIHtcbiAgICAgICAgdXJsLmhvc3QgPSB1cmwuaG9zdG5hbWU7XG4gICAgICAgIHVybFtwYXJ0XSA9ICcnO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZSkge1xuICAgICAgICB1cmwuaG9zdCA9IHVybC5ob3N0bmFtZSArJzonKyB2YWx1ZTtcbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdob3N0bmFtZSc6XG4gICAgICB1cmxbcGFydF0gPSB2YWx1ZTtcblxuICAgICAgaWYgKHVybC5wb3J0KSB2YWx1ZSArPSAnOicrIHVybC5wb3J0O1xuICAgICAgdXJsLmhvc3QgPSB2YWx1ZTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnaG9zdCc6XG4gICAgICB1cmxbcGFydF0gPSB2YWx1ZTtcblxuICAgICAgaWYgKHBvcnQudGVzdCh2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS5zcGxpdCgnOicpO1xuICAgICAgICB1cmwucG9ydCA9IHZhbHVlLnBvcCgpO1xuICAgICAgICB1cmwuaG9zdG5hbWUgPSB2YWx1ZS5qb2luKCc6Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1cmwuaG9zdG5hbWUgPSB2YWx1ZTtcbiAgICAgICAgdXJsLnBvcnQgPSAnJztcbiAgICAgIH1cblxuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdwcm90b2NvbCc6XG4gICAgICB1cmwucHJvdG9jb2wgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgdXJsLnNsYXNoZXMgPSAhZm47XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ3BhdGhuYW1lJzpcbiAgICBjYXNlICdoYXNoJzpcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICB2YXIgY2hhciA9IHBhcnQgPT09ICdwYXRobmFtZScgPyAnLycgOiAnIyc7XG4gICAgICAgIHVybFtwYXJ0XSA9IHZhbHVlLmNoYXJBdCgwKSAhPT0gY2hhciA/IGNoYXIgKyB2YWx1ZSA6IHZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdXJsW3BhcnRdID0gdmFsdWU7XG4gICAgICB9XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ3VzZXJuYW1lJzpcbiAgICBjYXNlICdwYXNzd29yZCc6XG4gICAgICB1cmxbcGFydF0gPSBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdhdXRoJzpcbiAgICAgIHZhciBpbmRleCA9IHZhbHVlLmluZGV4T2YoJzonKTtcblxuICAgICAgaWYgKH5pbmRleCkge1xuICAgICAgICB1cmwudXNlcm5hbWUgPSB2YWx1ZS5zbGljZSgwLCBpbmRleCk7XG4gICAgICAgIHVybC51c2VybmFtZSA9IGVuY29kZVVSSUNvbXBvbmVudChkZWNvZGVVUklDb21wb25lbnQodXJsLnVzZXJuYW1lKSk7XG5cbiAgICAgICAgdXJsLnBhc3N3b3JkID0gdmFsdWUuc2xpY2UoaW5kZXggKyAxKTtcbiAgICAgICAgdXJsLnBhc3N3b3JkID0gZW5jb2RlVVJJQ29tcG9uZW50KGRlY29kZVVSSUNvbXBvbmVudCh1cmwucGFzc3dvcmQpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVybC51c2VybmFtZSA9IGVuY29kZVVSSUNvbXBvbmVudChkZWNvZGVVUklDb21wb25lbnQodmFsdWUpKTtcbiAgICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcnVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaW5zID0gcnVsZXNbaV07XG5cbiAgICBpZiAoaW5zWzRdKSB1cmxbaW5zWzFdXSA9IHVybFtpbnNbMV1dLnRvTG93ZXJDYXNlKCk7XG4gIH1cblxuICB1cmwuYXV0aCA9IHVybC5wYXNzd29yZCA/IHVybC51c2VybmFtZSArJzonKyB1cmwucGFzc3dvcmQgOiB1cmwudXNlcm5hbWU7XG5cbiAgdXJsLm9yaWdpbiA9IHVybC5wcm90b2NvbCAhPT0gJ2ZpbGU6JyAmJiBpc1NwZWNpYWwodXJsLnByb3RvY29sKSAmJiB1cmwuaG9zdFxuICAgID8gdXJsLnByb3RvY29sICsnLy8nKyB1cmwuaG9zdFxuICAgIDogJ251bGwnO1xuXG4gIHVybC5ocmVmID0gdXJsLnRvU3RyaW5nKCk7XG5cbiAgcmV0dXJuIHVybDtcbn1cblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIHByb3BlcnRpZXMgYmFjayBpbiB0byBhIHZhbGlkIGFuZCBmdWxsIFVSTCBzdHJpbmcuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc3RyaW5naWZ5IE9wdGlvbmFsIHF1ZXJ5IHN0cmluZ2lmeSBmdW5jdGlvbi5cbiAqIEByZXR1cm5zIHtTdHJpbmd9IENvbXBpbGVkIHZlcnNpb24gb2YgdGhlIFVSTC5cbiAqIEBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gdG9TdHJpbmcoc3RyaW5naWZ5KSB7XG4gIGlmICghc3RyaW5naWZ5IHx8ICdmdW5jdGlvbicgIT09IHR5cGVvZiBzdHJpbmdpZnkpIHN0cmluZ2lmeSA9IHFzLnN0cmluZ2lmeTtcblxuICB2YXIgcXVlcnlcbiAgICAsIHVybCA9IHRoaXNcbiAgICAsIGhvc3QgPSB1cmwuaG9zdFxuICAgICwgcHJvdG9jb2wgPSB1cmwucHJvdG9jb2w7XG5cbiAgaWYgKHByb3RvY29sICYmIHByb3RvY29sLmNoYXJBdChwcm90b2NvbC5sZW5ndGggLSAxKSAhPT0gJzonKSBwcm90b2NvbCArPSAnOic7XG5cbiAgdmFyIHJlc3VsdCA9XG4gICAgcHJvdG9jb2wgK1xuICAgICgodXJsLnByb3RvY29sICYmIHVybC5zbGFzaGVzKSB8fCBpc1NwZWNpYWwodXJsLnByb3RvY29sKSA/ICcvLycgOiAnJyk7XG5cbiAgaWYgKHVybC51c2VybmFtZSkge1xuICAgIHJlc3VsdCArPSB1cmwudXNlcm5hbWU7XG4gICAgaWYgKHVybC5wYXNzd29yZCkgcmVzdWx0ICs9ICc6JysgdXJsLnBhc3N3b3JkO1xuICAgIHJlc3VsdCArPSAnQCc7XG4gIH0gZWxzZSBpZiAodXJsLnBhc3N3b3JkKSB7XG4gICAgcmVzdWx0ICs9ICc6JysgdXJsLnBhc3N3b3JkO1xuICAgIHJlc3VsdCArPSAnQCc7XG4gIH0gZWxzZSBpZiAoXG4gICAgdXJsLnByb3RvY29sICE9PSAnZmlsZTonICYmXG4gICAgaXNTcGVjaWFsKHVybC5wcm90b2NvbCkgJiZcbiAgICAhaG9zdCAmJlxuICAgIHVybC5wYXRobmFtZSAhPT0gJy8nXG4gICkge1xuICAgIC8vXG4gICAgLy8gQWRkIGJhY2sgdGhlIGVtcHR5IHVzZXJpbmZvLCBvdGhlcndpc2UgdGhlIG9yaWdpbmFsIGludmFsaWQgVVJMXG4gICAgLy8gbWlnaHQgYmUgdHJhbnNmb3JtZWQgaW50byBhIHZhbGlkIG9uZSB3aXRoIGB1cmwucGF0aG5hbWVgIGFzIGhvc3QuXG4gICAgLy9cbiAgICByZXN1bHQgKz0gJ0AnO1xuICB9XG5cbiAgLy9cbiAgLy8gVHJhaWxpbmcgY29sb24gaXMgcmVtb3ZlZCBmcm9tIGB1cmwuaG9zdGAgd2hlbiBpdCBpcyBwYXJzZWQuIElmIGl0IHN0aWxsXG4gIC8vIGVuZHMgd2l0aCBhIGNvbG9uLCB0aGVuIGFkZCBiYWNrIHRoZSB0cmFpbGluZyBjb2xvbiB0aGF0IHdhcyByZW1vdmVkLiBUaGlzXG4gIC8vIHByZXZlbnRzIGFuIGludmFsaWQgVVJMIGZyb20gYmVpbmcgdHJhbnNmb3JtZWQgaW50byBhIHZhbGlkIG9uZS5cbiAgLy9cbiAgaWYgKGhvc3RbaG9zdC5sZW5ndGggLSAxXSA9PT0gJzonIHx8IChwb3J0LnRlc3QodXJsLmhvc3RuYW1lKSAmJiAhdXJsLnBvcnQpKSB7XG4gICAgaG9zdCArPSAnOic7XG4gIH1cblxuICByZXN1bHQgKz0gaG9zdCArIHVybC5wYXRobmFtZTtcblxuICBxdWVyeSA9ICdvYmplY3QnID09PSB0eXBlb2YgdXJsLnF1ZXJ5ID8gc3RyaW5naWZ5KHVybC5xdWVyeSkgOiB1cmwucXVlcnk7XG4gIGlmIChxdWVyeSkgcmVzdWx0ICs9ICc/JyAhPT0gcXVlcnkuY2hhckF0KDApID8gJz8nKyBxdWVyeSA6IHF1ZXJ5O1xuXG4gIGlmICh1cmwuaGFzaCkgcmVzdWx0ICs9IHVybC5oYXNoO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cblVybC5wcm90b3R5cGUgPSB7IHNldDogc2V0LCB0b1N0cmluZzogdG9TdHJpbmcgfTtcblxuLy9cbi8vIEV4cG9zZSB0aGUgVVJMIHBhcnNlciBhbmQgc29tZSBhZGRpdGlvbmFsIHByb3BlcnRpZXMgdGhhdCBtaWdodCBiZSB1c2VmdWwgZm9yXG4vLyBvdGhlcnMgb3IgdGVzdGluZy5cbi8vXG5VcmwuZXh0cmFjdFByb3RvY29sID0gZXh0cmFjdFByb3RvY29sO1xuVXJsLmxvY2F0aW9uID0gbG9sY2F0aW9uO1xuVXJsLnRyaW1MZWZ0ID0gdHJpbUxlZnQ7XG5VcmwucXMgPSBxcztcblxubW9kdWxlLmV4cG9ydHMgPSBVcmw7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19pbXBvcnREZWZhdWx0ID0gKHRoaXMgJiYgdGhpcy5fX2ltcG9ydERlZmF1bHQpIHx8IGZ1bmN0aW9uIChtb2QpIHtcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IFwiZGVmYXVsdFwiOiBtb2QgfTtcbn07XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLmpvaW4gPSBleHBvcnRzLmdldFF1ZXJ5UGFyYW1zID0gZXhwb3J0cy53aXRoUXVlcnlQYXJhbXMgPSB2b2lkIDA7XG5jb25zdCBlbnN1cmVfMSA9IHJlcXVpcmUoXCIuL2Vuc3VyZVwiKTtcbmNvbnN0IHFzXzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcInFzXCIpKTtcbmNvbnN0IHVybF9wYXJzZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJ1cmwtcGFyc2VcIikpO1xuLyoqXG4gKiBIZWxwZXIgdG8gY3JlYXRlIGEgbmV3IFVSTCBieSBhcHBlbmRpbmcgcGFyYW1ldGVycyB0byBhIGJhc2UgVVJMLlxuICpcbiAqIFRoZSBpbnB1dCBVUkwgbWF5IG9yIG1heSBub3QgaGF2aW5nIGV4aXN0aW5nIHBhcmFtZXRlcnMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogLy8gUmV0dXJucyBgXCIvc29tZUFwaS9zb21lRW5kcG9pbnQ/dG9rZW49YXNkZiZsaW1pdD01XCJgXG4gKiBsZXQgdXJsID0gd2l0aFF1ZXJ5UGFyYW1zKFwiL3NvbWVBcGkvc29tZUVuZHBvaW50XCIsIHt0b2tlbjogXCJhc2RmXCIsIGxpbWl0OiA1fSk7XG4gKiBgYGBcbiAqL1xuZnVuY3Rpb24gd2l0aFF1ZXJ5UGFyYW1zKHVybCwgcGFyYW1zKSB7XG4gICAgaWYgKCFwYXJhbXMpIHtcbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICB9XG4gICAgY29uc3QgcGFyc2VkVXJsID0gKDAsIHVybF9wYXJzZV8xLmRlZmF1bHQpKHVybCk7XG4gICAgLy8gTWVyZ2UgdGhlIHBhcmFtcyB0b2dldGhlclxuICAgIGNvbnN0IHVwZGF0ZWRQYXJhbXMgPSBPYmplY3QuYXNzaWduKHt9LCBxc18xLmRlZmF1bHQucGFyc2UocGFyc2VkVXJsLnF1ZXJ5LCB7IGlnbm9yZVF1ZXJ5UHJlZml4OiB0cnVlIH0pLCBwYXJhbXMpO1xuICAgIHBhcnNlZFVybC5zZXQoJ3F1ZXJ5JywgcXNfMS5kZWZhdWx0LnN0cmluZ2lmeShKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHVwZGF0ZWRQYXJhbXMpKSwgeyBhZGRRdWVyeVByZWZpeDogdHJ1ZSB9KSk7XG4gICAgcmV0dXJuIHBhcnNlZFVybC50b1N0cmluZygpO1xufVxuZXhwb3J0cy53aXRoUXVlcnlQYXJhbXMgPSB3aXRoUXVlcnlQYXJhbXM7XG4vKipcbiAqIEhlbHBlciB0byB0YWtlIGEgVVJMIHN0cmluZyBhbmQgcmV0dXJuIHRoZSBwYXJhbWV0ZXJzIChpZiBhbnkpIGFzIGEgSmF2YVNjcmlwdCBvYmplY3QuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogLy8gUmV0dXJucyBge3Rva2VuOiBcImFzZGZcIiwgbGltaXQ6IFwiNVwifWBcbiAqIGxldCBwYXJhbXMgPSBnZXRRdWVyeVBhcmFtcyhcIi9zb21lQXBpL3NvbWVFbmRwb2ludD90b2tlbj1hc2RmJmxpbWl0PTVcIik7XG4gKiBgYGBcbiAqL1xuZnVuY3Rpb24gZ2V0UXVlcnlQYXJhbXModXJsKSB7XG4gICAgY29uc3QgcGFyc2VkVXJsID0gKDAsIHVybF9wYXJzZV8xLmRlZmF1bHQpKHVybCk7XG4gICAgLy8gTWVyZ2UgdGhlIHBhcmFtcyB0b2dldGhlclxuICAgIHJldHVybiBxc18xLmRlZmF1bHQucGFyc2UocGFyc2VkVXJsLnF1ZXJ5LCB7IGlnbm9yZVF1ZXJ5UHJlZml4OiB0cnVlIH0pO1xufVxuZXhwb3J0cy5nZXRRdWVyeVBhcmFtcyA9IGdldFF1ZXJ5UGFyYW1zO1xuLyoqXG4gKiBKb2lucyBhbGwgdGhlIHRva2VucyBpbnRvIGEgc2luZ2xlIFVSTCBzdHJpbmcgc2VwYXJhdGVkIGJ5ICcvJy4gWmVybyBsZW5ndGggdG9rZW5zIGNhdXNlIGVycm9ycy5cbiAqIEBwYXJhbSB0b2tlbnMgWmVybyBvciBtb3JlIHRva2VucyB0byBiZSBjb21iaW5lZC4gSWYgdG9rZW4gZG9lc24ndCBlbmQgd2l0aCAnLycsIG9uZSB3aWxsIGJlIGFkZGVkIGFzIHRoZSBzZXBhcmF0b3JcbiAqL1xuZnVuY3Rpb24gam9pbiguLi50b2tlbnMpIHtcbiAgICBpZiAoIXRva2VucyB8fCAhdG9rZW5zLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIGNvbnN0IGNvbWJpbmVkVG9rZW5zID0gW107XG4gICAgZm9yIChjb25zdCB0b2tlbiBvZiB0b2tlbnMpIHtcbiAgICAgICAgKDAsIGVuc3VyZV8xLmVuc3VyZU5vbkVtcHR5U3RyaW5nKSh0b2tlbik7XG4gICAgICAgIGlmIChjb21iaW5lZFRva2Vucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGNvbWJpbmVkVG9rZW5zLnB1c2godG9rZW4pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gRW5zdXJlIHRva2VucyAob3RoZXIgdGhhbiB0aGUgZmlyc3QpIGRvbid0IGhhdmUgbGVhZGluZyBzbGFzaGVzXG4gICAgICAgICAgICBjb21iaW5lZFRva2Vucy5wdXNoKHRva2VuLnJlcGxhY2UoL15cXC8rLywgJycpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRva2VuLmVuZHNXaXRoKCcvJykpIHtcbiAgICAgICAgICAgIGNvbWJpbmVkVG9rZW5zLnB1c2goJy8nKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBjb21iaW5lZCA9IGNvbWJpbmVkVG9rZW5zLmpvaW4oJycpO1xuICAgIGlmICghdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXS5lbmRzV2l0aCgnLycpKSB7XG4gICAgICAgIC8vIFVzZXIgZGlkbid0IHByb3ZpZGUgdG9rZW4gd2l0aCAvLCBzdHJpcCBvdXQgdGhlIGxhc3Qgb25lXG4gICAgICAgIHJldHVybiBjb21iaW5lZC5zbGljZSgwLCBjb21iaW5lZC5sZW5ndGggLSAxKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbWJpbmVkO1xufVxuZXhwb3J0cy5qb2luID0gam9pbjtcbiIsICJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuZ2VuZXJhdGVPYmplY3RSZXNwb25zZUhhbmRsZXIgPSBleHBvcnRzLnRyYW5zZm9ybUJvZHkgPSBleHBvcnRzLmdlbmVyYXRlUmVxdWVzdEhhbmRsZXIgPSB2b2lkIDA7XG5jb25zdCBjbG9uZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJjbG9uZVwiKSk7XG5jb25zdCBvYmplY3RfdXRpbHNfMSA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvb2JqZWN0X3V0aWxzXCIpO1xuY29uc3QgZW5zdXJlXzEgPSByZXF1aXJlKFwiLi9oZWxwZXJzL2Vuc3VyZVwiKTtcbmNvbnN0IHNjaGVtYV8xID0gcmVxdWlyZShcIi4vc2NoZW1hXCIpO1xuY29uc3Qgc2NoZW1hXzIgPSByZXF1aXJlKFwiLi9zY2hlbWFcIik7XG5jb25zdCB1cmxfMSA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvdXJsXCIpO1xuZnVuY3Rpb24gZ2VuZXJhdGVQYXJhbU1hcChrZXlzLCBuYW1lVG9WYWx1ZU1hcCwgb3B0aW9uYWxOYW1lcykge1xuICAgIGNvbnN0IG1hcCA9IHt9O1xuICAgIGtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICBsZXQgdmFsID0gbmFtZVRvVmFsdWVNYXBba2V5XTtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9uYWxOYW1lcyAmJiBvcHRpb25hbE5hbWVzLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gTmV2ZXIgcGFzcyB1bmRlZmluZWQ7XG4gICAgICAgICAgICB2YWwgPSAnJztcbiAgICAgICAgfVxuICAgICAgICBtYXBba2V5XSA9IHZhbDtcbiAgICB9KTtcbiAgICByZXR1cm4gbWFwO1xufVxuZnVuY3Rpb24gZ2VuZXJhdGVRdWVyeVBhcmFtTWFwKGtleXMsIG5hbWVUb1ZhbHVlTWFwLCBvcHRpb25hbE5hbWVzKSB7XG4gICAgY29uc3QgbWFwID0ge307XG4gICAga2V5cy5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgIGxldCB2YWwgPSBuYW1lVG9WYWx1ZU1hcFtrZXldO1xuICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGlmIChvcHRpb25hbE5hbWVzICYmIG9wdGlvbmFsTmFtZXMuaGFzKGtleSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBOZXZlciBwYXNzIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIHZhbCA9ICcnO1xuICAgICAgICB9XG4gICAgICAgIG1hcFtrZXldID0gZW5jb2RlVVJJQ29tcG9uZW50KFN0cmluZyh2YWwpKTtcbiAgICB9KTtcbiAgICByZXR1cm4gbWFwO1xufVxuLy8gQSBxdWljayBpbXBsZW1lbmF0aW9uIG9mIHN0cmluZy10ZW1wbGF0ZS4gTmVlZCB0byByZW1vdmUgdGhlIHBhY2thZ2UgYmVjYXVzZSBpdCB1c2VzIHRoZVxuLy8gYG5ldyBGdW5jdGlvbig8Y29kZT4pYCBzeW50YXguXG5mdW5jdGlvbiBmb3JtYXRTdHJpbmcodGVtcGxhdGUsIHBhcmFtcykge1xuICAgIGxldCByZXN1bHQgPSB0ZW1wbGF0ZTtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhwYXJhbXMpKSB7XG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKGB7JHtrZXl9fWAsIHZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIGdlbmVyYXRlUmVxdWVzdEhhbmRsZXIocmVxdWVzdCwgcGFyYW1ldGVycykge1xuICAgIGNvbnN0IHsgdXJsLCBxdWVyeVBhcmFtcywgbmFtZU1hcHBpbmc6IHBhcmFtTmFtZU1hcHBpbmcsIGJvZHlUZW1wbGF0ZSwgYm9keVBhcmFtcywgbWV0aG9kLCBoZWFkZXJzLCB0cmFuc2Zvcm1zLCB9ID0gcmVxdWVzdDtcbiAgICAvLyBHZW5lcmF0ZSBhIG1hcCBmcm9tIGluZGV4IHRvIG5hbWUgdGhhdCB3ZSB3aWxsIHVzZSB0byBiaW5kIGFyZ3MgdG8gdGhlIGFwcHJvcHJpYXRlIHNwb3RzLlxuICAgIGNvbnN0IGluZGV4VG9OYW1lTWFwID0gbmV3IE1hcCgpO1xuICAgIGNvbnN0IG5hbWVzID0gbmV3IFNldCgpO1xuICAgIGNvbnN0IG9wdGlvbmFsTmFtZXMgPSBuZXcgU2V0KCk7XG4gICAgLy8gVE9ETzogUmVtb3ZlIHRoaXMgY2FzdCBvbmNlIFRTIHVuZGVyc3RhbmRzIGFuIGFycmF5IG9mIHNpemUgMCBpbiB0aGUgdHlwZWRlZi5cbiAgICBwYXJhbWV0ZXJzLmZvckVhY2goKGFyZywgaW5kZXgpID0+IHtcbiAgICAgICAgLy8gQ29udmVydCBwYXJhbWV0ZXIgbmFtZSB0byBpbnRlcm5hbCBuYW1lLCBpZiBuZWNlc3NhcnkuXG4gICAgICAgIGNvbnN0IG5hbWUgPSAocGFyYW1OYW1lTWFwcGluZyAmJiBwYXJhbU5hbWVNYXBwaW5nW2FyZy5uYW1lXSkgfHwgYXJnLm5hbWU7XG4gICAgICAgIGlmIChuYW1lcy5oYXMobmFtZSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgRHVwbGljYXRlIG5hbWUgJHtuYW1lfSBkZXRlY3RlZGApO1xuICAgICAgICB9XG4gICAgICAgIG5hbWVzLmFkZChuYW1lKTtcbiAgICAgICAgaWYgKGFyZy5vcHRpb25hbCkge1xuICAgICAgICAgICAgb3B0aW9uYWxOYW1lcy5hZGQobmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgaW5kZXhUb05hbWVNYXAuc2V0KGluZGV4LCBuYW1lKTtcbiAgICB9KTtcbiAgICBjb25zdCBoYXNRdWVyeVBhcmFtcyA9IEJvb2xlYW4ocXVlcnlQYXJhbXMgJiYgcXVlcnlQYXJhbXMubGVuZ3RoKTtcbiAgICBjb25zdCBoYXNCb2R5UGFyYW1zID0gQm9vbGVhbihib2R5UGFyYW1zICYmIGJvZHlQYXJhbXMubGVuZ3RoKTtcbiAgICByZXR1cm4gZnVuY3Rpb24gcmVxdWVzdEhhbmRsZXIocGFyYW1zKSB7XG4gICAgICAgIGNvbnN0IG5hbWVNYXBwaW5nID0ge307XG4gICAgICAgIHBhcmFtcy5mb3JFYWNoKChwYXJhbSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhcmFtTmFtZSA9ICgwLCBlbnN1cmVfMS5lbnN1cmVFeGlzdHMpKGluZGV4VG9OYW1lTWFwLmdldChpbmRleCkpO1xuICAgICAgICAgICAgY29uc3QgcGFyYW1UcmFuc2Zvcm0gPSB0cmFuc2Zvcm1zID8gdHJhbnNmb3Jtc1twYXJhbU5hbWVdIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgaWYgKHBhcmFtVHJhbnNmb3JtKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdHJhbnNmb3JtUmVzdWx0ID0gcGFyYW1UcmFuc2Zvcm0ocGFyYW0pO1xuICAgICAgICAgICAgICAgIGlmICh0cmFuc2Zvcm1SZXN1bHQgJiYgdHlwZW9mIHRyYW5zZm9ybVJlc3VsdCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTWVyZ2UgdGhlc2UgcmVzdWx0cyBpbnRvIHRoZSBuYW1lIG1hcHBpbmcgc2luY2Ugd2UgYXJlIHNwbGF5aW5nIG91dCByZXN1bHRzLlxuICAgICAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKG5hbWVNYXBwaW5nLCB0cmFuc2Zvcm1SZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZU1hcHBpbmdbcGFyYW1OYW1lXSA9IHRyYW5zZm9ybVJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBuYW1lTWFwcGluZ1twYXJhbU5hbWVdID0gcGFyYW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBXZSBkb24ndCBrbm93IGEgcHJpb3JpIHdoaWNoIHBhcmFtcyBhcmUgdXNlZCB3aXRoaW4gdGhlIFVSTCwgc28gZ2VuZXJhdGUgYSBtYXAgZm9yIGFsbCBvZiB0aGVtLlxuICAgICAgICBjb25zdCBiYXNlVXJsID0gZm9ybWF0U3RyaW5nKHVybCwgZ2VuZXJhdGVRdWVyeVBhcmFtTWFwKE9iamVjdC5rZXlzKG5hbWVNYXBwaW5nKSwgbmFtZU1hcHBpbmcpKTtcbiAgICAgICAgY29uc3QgZnVsbFVybCA9IGhhc1F1ZXJ5UGFyYW1zXG4gICAgICAgICAgICA/ICgwLCB1cmxfMS53aXRoUXVlcnlQYXJhbXMpKGJhc2VVcmwsIGdlbmVyYXRlUXVlcnlQYXJhbU1hcCgoMCwgZW5zdXJlXzEuZW5zdXJlRXhpc3RzKShxdWVyeVBhcmFtcyksIG5hbWVNYXBwaW5nLCBvcHRpb25hbE5hbWVzKSlcbiAgICAgICAgICAgIDogYmFzZVVybDtcbiAgICAgICAgbGV0IGJvZHk7XG4gICAgICAgIGlmIChib2R5VGVtcGxhdGUpIHtcbiAgICAgICAgICAgIGJvZHkgPSAoMCwgY2xvbmVfMS5kZWZhdWx0KShib2R5VGVtcGxhdGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChoYXNCb2R5UGFyYW1zKSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50Qm9keVBhcmFtcyA9IGdlbmVyYXRlUGFyYW1NYXAoKDAsIGVuc3VyZV8xLmVuc3VyZUV4aXN0cykoYm9keVBhcmFtcyksIG5hbWVNYXBwaW5nLCBvcHRpb25hbE5hbWVzKTtcbiAgICAgICAgICAgIC8vIE1lcmdlIHRoZSBwYXJhbSBpZiBuZWVkZWQuXG4gICAgICAgICAgICBib2R5ID0gYm9keSA/IHsgLi4uYm9keSwgLi4uY3VycmVudEJvZHlQYXJhbXMgfSA6IGN1cnJlbnRCb2R5UGFyYW1zO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB1cmw6IGZ1bGxVcmwsXG4gICAgICAgICAgICBtZXRob2QsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICAgQWNjZXB0OiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgICAgICAuLi5oZWFkZXJzLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvZHk6IGJvZHkgPyBKU09OLnN0cmluZ2lmeShib2R5KSA6IHVuZGVmaW5lZCxcbiAgICAgICAgfTtcbiAgICB9O1xufVxuZXhwb3J0cy5nZW5lcmF0ZVJlcXVlc3RIYW5kbGVyID0gZ2VuZXJhdGVSZXF1ZXN0SGFuZGxlcjtcbmZ1bmN0aW9uIG1hcEtleXMob2JqLCBzY2hlbWEpIHtcbiAgICBpZiAoIShzY2hlbWEgJiYgKDAsIHNjaGVtYV8yLmlzT2JqZWN0KShzY2hlbWEpKSkge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgICBjb25zdCB7IHByb3BlcnRpZXMgfSA9IHNjaGVtYTtcbiAgICAvLyBMb29rIGF0IHRoZSBwcm9wZXJ0aWVzIG9mIHRoZSBzY2hlbWEgYW5kIGludmVydCBhbnkga2V5cyBpZiBwcmVzZW50LlxuICAgIGNvbnN0IHJlbWFwcGVkS2V5cyA9IG5ldyBNYXAoKTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBwcm9wZXJ0aWVzKSB7XG4gICAgICAgIGlmIChwcm9wZXJ0aWVzLmhhc093blByb3BlcnR5KGtleSkgJiYgcHJvcGVydGllc1trZXldLmZyb21LZXkpIHtcbiAgICAgICAgICAgIGNvbnN0IGZyb21LZXkgPSAoMCwgZW5zdXJlXzEuZW5zdXJlRXhpc3RzKShwcm9wZXJ0aWVzW2tleV0uZnJvbUtleSk7XG4gICAgICAgICAgICByZW1hcHBlZEtleXMuc2V0KGZyb21LZXksIFsuLi4ocmVtYXBwZWRLZXlzLmdldChmcm9tS2V5KSB8fCBbXSksIGtleV0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHJlbWFwcGVkT2JqZWN0ID0ge307XG4gICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1hcHBlZEtleXMgPSByZW1hcHBlZEtleXMuZ2V0KGtleSkgfHwgW2tleV07XG4gICAgICAgIGZvciAoY29uc3QgbmV3S2V5IG9mIG1hcHBlZEtleXMpIHtcbiAgICAgICAgICAgIGlmICghc2NoZW1hLnByb3BlcnRpZXNbbmV3S2V5XSAmJiAhc2NoZW1hLmluY2x1ZGVVbmtub3duUHJvcGVydGllcykge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVtYXBwZWRPYmplY3RbbmV3S2V5XSA9IG1hcHBlZEtleXMubGVuZ3RoID4gMSA/ICgwLCBvYmplY3RfdXRpbHNfMS5kZWVwQ29weSkob2JqW2tleV0pIDogb2JqW2tleV07XG4gICAgICAgICAgICBjb25zdCBrZXlTY2hlbWEgPSBzY2hlbWEucHJvcGVydGllc1tuZXdLZXldO1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFZhbHVlID0gcmVtYXBwZWRPYmplY3RbbmV3S2V5XTtcbiAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGN1cnJlbnRWYWx1ZSkgJiYgKDAsIHNjaGVtYV8xLmlzQXJyYXkpKGtleVNjaGVtYSkgJiYgKDAsIHNjaGVtYV8yLmlzT2JqZWN0KShrZXlTY2hlbWEuaXRlbXMpKSB7XG4gICAgICAgICAgICAgICAgcmVtYXBwZWRPYmplY3RbbmV3S2V5XSA9IGN1cnJlbnRWYWx1ZS5tYXAodmFsID0+IG1hcEtleXModmFsLCBrZXlTY2hlbWEuaXRlbXMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiBjdXJyZW50VmFsdWUgPT09ICdvYmplY3QnICYmICgwLCBzY2hlbWFfMi5pc09iamVjdCkoa2V5U2NoZW1hKSkge1xuICAgICAgICAgICAgICAgIHJlbWFwcGVkT2JqZWN0W25ld0tleV0gPSBtYXBLZXlzKGN1cnJlbnRWYWx1ZSwga2V5U2NoZW1hKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVtYXBwZWRPYmplY3Q7XG59XG5mdW5jdGlvbiB0cmFuc2Zvcm1Cb2R5KGJvZHksIHNjaGVtYSkge1xuICAgIGlmICgoMCwgc2NoZW1hXzEuaXNBcnJheSkoc2NoZW1hKSAmJiAoMCwgc2NoZW1hXzIuaXNPYmplY3QpKHNjaGVtYS5pdGVtcykpIHtcbiAgICAgICAgY29uc3Qgb2JqZWN0cyA9IGJvZHk7XG4gICAgICAgIGNvbnN0IG1hcHBlZE9ianMgPSBvYmplY3RzLm1hcChvYmogPT4gbWFwS2V5cyhvYmosIHNjaGVtYS5pdGVtcykpO1xuICAgICAgICByZXR1cm4gbWFwcGVkT2JqcztcbiAgICB9XG4gICAgaWYgKCgwLCBzY2hlbWFfMi5pc09iamVjdCkoc2NoZW1hKSkge1xuICAgICAgICByZXR1cm4gbWFwS2V5cyhib2R5LCBzY2hlbWEpO1xuICAgIH1cbiAgICByZXR1cm4gYm9keTtcbn1cbmV4cG9ydHMudHJhbnNmb3JtQm9keSA9IHRyYW5zZm9ybUJvZHk7XG5mdW5jdGlvbiBnZW5lcmF0ZU9iamVjdFJlc3BvbnNlSGFuZGxlcihyZXNwb25zZSkge1xuICAgIGNvbnN0IHsgcHJvamVjdEtleSB9ID0gcmVzcG9uc2U7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIG9iamVjdFJlc3BvbnNlSGFuZGxlcihyZXNwKSB7XG4gICAgICAgIGNvbnN0IHsgYm9keSB9ID0gcmVzcDtcbiAgICAgICAgaWYgKHR5cGVvZiBib2R5ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgLy8gVGhpcyBpcyBhbiBlcnJvciwgd2UnbGwgZmxhZyBpdCBkdXJpbmcgdmFsaWRhdGlvbi5cbiAgICAgICAgICAgIHJldHVybiBib2R5O1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHByb2plY3RlZEJvZHkgPSBwcm9qZWN0S2V5ID8gYm9keVtwcm9qZWN0S2V5XSA6IGJvZHk7XG4gICAgICAgIHJldHVybiBwcm9qZWN0ZWRCb2R5O1xuICAgIH07XG59XG5leHBvcnRzLmdlbmVyYXRlT2JqZWN0UmVzcG9uc2VIYW5kbGVyID0gZ2VuZXJhdGVPYmplY3RSZXNwb25zZUhhbmRsZXI7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLm1heWJlUmV3cml0ZUNvbm5lY3Rpb25Gb3JGb3JtdWxhID0gZXhwb3J0cy5tYWtlRW1wdHlGb3JtdWxhID0gZXhwb3J0cy5tYWtlVHJhbnNsYXRlT2JqZWN0Rm9ybXVsYSA9IGV4cG9ydHMubWFrZUR5bmFtaWNTeW5jVGFibGUgPSBleHBvcnRzLm1ha2VTeW5jVGFibGVMZWdhY3kgPSBleHBvcnRzLm1ha2VTeW5jVGFibGUgPSBleHBvcnRzLm1ha2VPYmplY3RGb3JtdWxhID0gZXhwb3J0cy5tYWtlU2ltcGxlQXV0b2NvbXBsZXRlTWV0YWRhdGFGb3JtdWxhID0gZXhwb3J0cy5hdXRvY29tcGxldGVTZWFyY2hPYmplY3RzID0gZXhwb3J0cy5zaW1wbGVBdXRvY29tcGxldGUgPSBleHBvcnRzLm1ha2VNZXRhZGF0YUZvcm11bGEgPSBleHBvcnRzLm1ha2VGb3JtdWxhID0gZXhwb3J0cy5tYWtlU3RyaW5nRm9ybXVsYSA9IGV4cG9ydHMubWFrZU51bWVyaWNGb3JtdWxhID0gZXhwb3J0cy5pc1N5bmNQYWNrRm9ybXVsYSA9IGV4cG9ydHMuaXNTdHJpbmdQYWNrRm9ybXVsYSA9IGV4cG9ydHMuaXNPYmplY3RQYWNrRm9ybXVsYSA9IGV4cG9ydHMuY2hlY2sgPSBleHBvcnRzLm1ha2VVc2VyVmlzaWJsZUVycm9yID0gZXhwb3J0cy5tYWtlRmlsZUFycmF5UGFyYW1ldGVyID0gZXhwb3J0cy5tYWtlRmlsZVBhcmFtZXRlciA9IGV4cG9ydHMubWFrZUltYWdlQXJyYXlQYXJhbWV0ZXIgPSBleHBvcnRzLm1ha2VJbWFnZVBhcmFtZXRlciA9IGV4cG9ydHMubWFrZUh0bWxBcnJheVBhcmFtZXRlciA9IGV4cG9ydHMubWFrZUh0bWxQYXJhbWV0ZXIgPSBleHBvcnRzLm1ha2VEYXRlQXJyYXlQYXJhbWV0ZXIgPSBleHBvcnRzLm1ha2VEYXRlUGFyYW1ldGVyID0gZXhwb3J0cy5tYWtlQm9vbGVhbkFycmF5UGFyYW1ldGVyID0gZXhwb3J0cy5tYWtlQm9vbGVhblBhcmFtZXRlciA9IGV4cG9ydHMubWFrZU51bWVyaWNBcnJheVBhcmFtZXRlciA9IGV4cG9ydHMubWFrZU51bWVyaWNQYXJhbWV0ZXIgPSBleHBvcnRzLm1ha2VTdHJpbmdBcnJheVBhcmFtZXRlciA9IGV4cG9ydHMubWFrZVN0cmluZ1BhcmFtZXRlciA9IGV4cG9ydHMubWFrZVBhcmFtZXRlciA9IGV4cG9ydHMud3JhcEdldFNjaGVtYSA9IGV4cG9ydHMud3JhcE1ldGFkYXRhRnVuY3Rpb24gPSBleHBvcnRzLmlzRHluYW1pY1N5bmNUYWJsZSA9IGV4cG9ydHMuaXNVc2VyVmlzaWJsZUVycm9yID0gZXhwb3J0cy5NaXNzaW5nU2NvcGVzRXJyb3IgPSBleHBvcnRzLlN0YXR1c0NvZGVFcnJvciA9IGV4cG9ydHMuVXNlclZpc2libGVFcnJvciA9IHZvaWQgMDtcbmNvbnN0IGFwaV90eXBlc18xID0gcmVxdWlyZShcIi4vYXBpX3R5cGVzXCIpO1xuY29uc3QgYXBpX3R5cGVzXzIgPSByZXF1aXJlKFwiLi9hcGlfdHlwZXNcIik7XG5jb25zdCBhcGlfdHlwZXNfMyA9IHJlcXVpcmUoXCIuL2FwaV90eXBlc1wiKTtcbmNvbnN0IHNjaGVtYV8xID0gcmVxdWlyZShcIi4vc2NoZW1hXCIpO1xuY29uc3QgYXBpX3R5cGVzXzQgPSByZXF1aXJlKFwiLi9hcGlfdHlwZXNcIik7XG5jb25zdCBhcGlfdHlwZXNfNSA9IHJlcXVpcmUoXCIuL2FwaV90eXBlc1wiKTtcbmNvbnN0IG9iamVjdF91dGlsc18xID0gcmVxdWlyZShcIi4vaGVscGVycy9vYmplY3RfdXRpbHNcIik7XG5jb25zdCBlbnN1cmVfMSA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvZW5zdXJlXCIpO1xuY29uc3QgYXBpX3R5cGVzXzYgPSByZXF1aXJlKFwiLi9hcGlfdHlwZXNcIik7XG5jb25zdCBoYW5kbGVyX3RlbXBsYXRlc18xID0gcmVxdWlyZShcIi4vaGFuZGxlcl90ZW1wbGF0ZXNcIik7XG5jb25zdCBoYW5kbGVyX3RlbXBsYXRlc18yID0gcmVxdWlyZShcIi4vaGFuZGxlcl90ZW1wbGF0ZXNcIik7XG5jb25zdCBhcGlfdHlwZXNfNyA9IHJlcXVpcmUoXCIuL2FwaV90eXBlc1wiKTtcbmNvbnN0IGFwaV90eXBlc184ID0gcmVxdWlyZShcIi4vYXBpX3R5cGVzXCIpO1xuY29uc3Qgb2JqZWN0X3V0aWxzXzIgPSByZXF1aXJlKFwiLi9oZWxwZXJzL29iamVjdF91dGlsc1wiKTtcbmNvbnN0IHNjaGVtYV8yID0gcmVxdWlyZShcIi4vc2NoZW1hXCIpO1xuY29uc3Qgc2NoZW1hXzMgPSByZXF1aXJlKFwiLi9zY2hlbWFcIik7XG5jb25zdCBhcGlfdHlwZXNfOSA9IHJlcXVpcmUoXCIuL2FwaV90eXBlc1wiKTtcbmNvbnN0IG1pZ3JhdGlvbl8xID0gcmVxdWlyZShcIi4vaGVscGVycy9taWdyYXRpb25cIik7XG5jb25zdCBhcGlfdHlwZXNfMTAgPSByZXF1aXJlKFwiLi9hcGlfdHlwZXNcIik7XG4vKipcbiAqIEFuIGVycm9yIHdob3NlIG1lc3NhZ2Ugd2lsbCBiZSBzaG93biB0byB0aGUgZW5kIHVzZXIgaW4gdGhlIFVJIHdoZW4gaXQgb2NjdXJzLlxuICogSWYgYW4gZXJyb3IgaXMgZW5jb3VudGVyZWQgaW4gYSBmb3JtdWxhIGFuZCB5b3Ugd2FudCB0byBkZXNjcmliZSB0aGUgZXJyb3JcbiAqIHRvIHRoZSBlbmQgdXNlciwgdGhyb3cgYSBVc2VyVmlzaWJsZUVycm9yIHdpdGggYSB1c2VyLWZyaWVuZGx5IG1lc3NhZ2VcbiAqIGFuZCB0aGUgQ29kYSBVSSB3aWxsIGRpc3BsYXkgdGhlIG1lc3NhZ2UuXG4gKi9cbmNsYXNzIFVzZXJWaXNpYmxlRXJyb3IgZXh0ZW5kcyBFcnJvciB7XG4gICAgLyoqXG4gICAgICogVXNlIHRvIGNvbnN0cnVjdCBhIHVzZXItdmlzaWJsZSBlcnJvci5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogYGBgXG4gICAgICogaWYgKCF1cmwuc3RhcnRzV2l0aChcImh0dHBcIikpIHtcbiAgICAgKiAgIHRocm93IG5ldyBjb2RhLlVzZXJWaXNpYmxlRXJyb3IoXCJQbGVhc2UgcHJvdmlkZSBhIHZhbGlkIHVybC5cIik7XG4gICAgICogfVxuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UsIGludGVybmFsRXJyb3IpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSk7XG4gICAgICAgIC8qKiBAaGlkZGVuICovXG4gICAgICAgIHRoaXMuaXNVc2VyVmlzaWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMuaW50ZXJuYWxFcnJvciA9IGludGVybmFsRXJyb3I7XG4gICAgfVxufVxuZXhwb3J0cy5Vc2VyVmlzaWJsZUVycm9yID0gVXNlclZpc2libGVFcnJvcjtcbi8vIFN0YXR1c0NvZGVFcnJvciBpcyBhIHNpbXBsZSB2ZXJzaW9uIG9mIFN0YXR1c0NvZGVFcnJvciBpbiByZXF1ZXN0LXByb21pc2UgdG8ga2VlcCBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eS5cbi8vIFRoaXMgdHJpZXMgdG8gcmVwbGljYXRlIGl0cyBleGFjdCBzdHJ1Y3R1cmUsIG1hc3NhZ2luZyBhcyBuZWNlc3NhcnkgdG8gaGFuZGxlIHRoZSB2YXJpb3VzIHRyYW5zZm9ybXNcbi8vIGluIG91ciBzdGFjay5cbi8vXG4vLyBodHRwczovL2dpdGh1Yi5jb20vcmVxdWVzdC9wcm9taXNlLWNvcmUvYmxvYi9tYXN0ZXIvbGliL2Vycm9ycy5qcyNMMjJcbi8qKlxuICogQW4gZXJyb3IgdGhhdCB3aWxsIGJlIHRocm93biBieSB7QGxpbmsgRmV0Y2hlci5mZXRjaH0gd2hlbiB0aGUgZmV0Y2hlciByZXNwb25zZSBoYXMgYW5cbiAqIEhUVFAgc3RhdHVzIGNvZGUgb2YgNDAwIG9yIGdyZWF0ZXIuXG4gKlxuICogVGhpcyBjbGFzcyBsYXJnZWx5IG1vZGVscyB0aGUgYFN0YXR1c0NvZGVFcnJvcmAgZnJvbSB0aGUgKG5vdyBkZXByZWNhdGVkKSBgcmVxdWVzdC1wcm9taXNlYCBsaWJyYXJ5LFxuICogd2hpY2ggaGFzIGEgcXVpcmt5IHN0cnVjdHVyZS5cbiAqL1xuY2xhc3MgU3RhdHVzQ29kZUVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICAgIC8qKiBAaGlkZGVuICovXG4gICAgY29uc3RydWN0b3Ioc3RhdHVzQ29kZSwgYm9keSwgb3B0aW9ucywgcmVzcG9uc2UpIHtcbiAgICAgICAgc3VwZXIoYCR7c3RhdHVzQ29kZX0gLSAke0pTT04uc3RyaW5naWZ5KGJvZHkpfWApO1xuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG5hbWUgb2YgdGhlIGVycm9yLCBmb3IgaWRlbnRpY2lhdGlvbiBwdXJwb3Nlcy5cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubmFtZSA9ICdTdGF0dXNDb2RlRXJyb3InO1xuICAgICAgICB0aGlzLnN0YXR1c0NvZGUgPSBzdGF0dXNDb2RlO1xuICAgICAgICB0aGlzLmJvZHkgPSBib2R5O1xuICAgICAgICB0aGlzLmVycm9yID0gYm9keTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0gb3B0aW9ucztcbiAgICAgICAgbGV0IHJlc3BvbnNlQm9keSA9IHJlc3BvbnNlID09PSBudWxsIHx8IHJlc3BvbnNlID09PSB2b2lkIDAgPyB2b2lkIDAgOiByZXNwb25zZS5ib2R5O1xuICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlQm9keSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIC8vIFwicmVxdWVzdC1wcm9taXNlXCIncyBlcnJvci5yZXNwb25zZS5ib2R5IGlzIGFsd2F5cyB0aGUgb3JpZ2luYWwsIHVucGFyc2VkIHJlc3BvbnNlIGJvZHksXG4gICAgICAgICAgICAvLyB3aGlsZSBvdXIgZmV0Y2hlciBzZXJ2aWNlIG1heSBhdHRlbXB0IGEgSlNPTi5wYXJzZSBmb3IgYW55IHJlc3BvbnNlIGJvZHkgYW5kIGFsdGVyIHRoZSBiZWhhdmlvci5cbiAgICAgICAgICAgIC8vIEhlcmUgd2UgYXR0ZW1wdCB0byByZXN0b3JlIHRoZSBvcmlnaW5hbCByZXNwb25zZSBib2R5IGZvciBhIGZldyB2MSBwYWNrcyBjb21wYXRpYmlsaXR5LlxuICAgICAgICAgICAgcmVzcG9uc2VCb2R5ID0gSlNPTi5zdHJpbmdpZnkocmVzcG9uc2VCb2R5KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlc3BvbnNlID0geyAuLi5yZXNwb25zZSwgYm9keTogcmVzcG9uc2VCb2R5IH07XG4gICAgfVxuICAgIC8qKiBSZXR1cm5zIGlmIHRoZSBlcnJvciBpcyBhbiBpbnN0YW5jZSBvZiBTdGF0dXNDb2RlRXJyb3IuIE5vdGUgdGhhdCBpbnN0YW5jZW9mIG1heSBub3Qgd29yay4gKi9cbiAgICBzdGF0aWMgaXNTdGF0dXNDb2RlRXJyb3IoZXJyKSB7XG4gICAgICAgIHJldHVybiAnbmFtZScgaW4gZXJyICYmIGVyci5uYW1lID09PSBTdGF0dXNDb2RlRXJyb3IubmFtZTtcbiAgICB9XG59XG5leHBvcnRzLlN0YXR1c0NvZGVFcnJvciA9IFN0YXR1c0NvZGVFcnJvcjtcbi8qKlxuICogVGhyb3cgdGhpcyBlcnJvciBpZiB0aGUgdXNlciBuZWVkcyB0byByZS1hdXRoZW50aWNhdGUgdG8gZ2FpbiBPQXV0aCBzY29wZXMgdGhhdCBoYXZlIGJlZW4gYWRkZWRcbiAqIHRvIHRoZSBwYWNrIHNpbmNlIHRoZWlyIGNvbm5lY3Rpb24gd2FzIGNyZWF0ZWQsIG9yIHNjb3BlcyB0aGF0IGFyZSBzcGVjaWZpYyB0byBhIGNlcnRhaW4gZm9ybXVsYS5cbiAqIFRoaXMgaXMgdXNlZnVsIGJlY2F1c2UgQ29kYSB3aWxsIGFsd2F5cyBhdHRlbXB0IHRvIGV4ZWN1dGUgYSBmb3JtdWxhIGV2ZW4gaWYgYSB1c2VyIGhhcyBub3QgeWV0XG4gKiByZS1hdXRoZW50aWNhdGVkIHdpdGggYWxsIHJlbGV2YW50IHNjb3Blcy5cbiAqXG4gKiBZb3UgZG9uJ3QgKmFsd2F5cyogbmVlZCB0byB0aHJvdyB0aGlzIHNwZWNpZmljIGVycm9yLCBhcyBDb2RhIHdpbGwgaW50ZXJwcmV0IGEgNDAzIChGb3JiaWRkZW4pXG4gKiBzdGF0dXMgY29kZSBlcnJvciBhcyBhIE1pc3NpbmdTY29wZXNFcnJvciB3aGVuIHRoZSB1c2VyJ3MgY29ubmVjdGlvbiB3YXMgbWFkZSB3aXRob3V0IGFsbFxuICogY3VycmVudGx5IHJlbGV2YW50IHNjb3Blcy4gVGhpcyBlcnJvciBleGlzdHMgYmVjYXVzZSB0aGF0IGRlZmF1bHQgYmVoYXZpb3IgaXMgaW5zdWZmaWNpZW50IGlmXG4gKiB0aGUgT0F1dGggc2VydmljZSBkb2VzIG5vdCBzZXQgYSA0MDMgc3RhdHVzIGNvZGUgKHRoZSBPQXV0aCBzcGVjIGRvZXNuJ3Qgc3BlY2lmaWNhbGx5IHJlcXVpcmVcbiAqIHRoZW0gdG8sIGFmdGVyIGFsbCkuXG4gKi9cbmNsYXNzIE1pc3NpbmdTY29wZXNFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgICAvKiogQGhpZGRlbiAqL1xuICAgIGNvbnN0cnVjdG9yKG1lc3NhZ2UpIHtcbiAgICAgICAgc3VwZXIobWVzc2FnZSB8fCAnQWRkaXRpb25hbCBwZXJtaXNzaW9ucyBhcmUgcmVxdWlyZWQnKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBuYW1lIG9mIHRoZSBlcnJvciwgZm9yIGlkZW50aWZpY2F0aW9uIHB1cnBvc2VzLlxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5uYW1lID0gJ01pc3NpbmdTY29wZXNFcnJvcic7XG4gICAgfVxuICAgIC8qKiBSZXR1cm5zIGlmIHRoZSBlcnJvciBpcyBhbiBpbnN0YW5jZSBvZiBNaXNzaW5nU2NvcGVzRXJyb3IuIE5vdGUgdGhhdCBpbnN0YW5jZW9mIG1heSBub3Qgd29yay4gKi9cbiAgICBzdGF0aWMgaXNNaXNzaW5nU2NvcGVzRXJyb3IoZXJyKSB7XG4gICAgICAgIHJldHVybiAnbmFtZScgaW4gZXJyICYmIGVyci5uYW1lID09PSBNaXNzaW5nU2NvcGVzRXJyb3IubmFtZTtcbiAgICB9XG59XG5leHBvcnRzLk1pc3NpbmdTY29wZXNFcnJvciA9IE1pc3NpbmdTY29wZXNFcnJvcjtcbi8qKlxuICogSGVscGVyIHRvIGRldGVybWluZSBpZiBhbiBlcnJvciBpcyBjb25zaWRlcmVkIHVzZXItdmlzaWJsZSBhbmQgY2FuIGJlIHNob3duIGluIHRoZSBVSS5cbiAqIFNlZSB7QGxpbmsgVXNlclZpc2libGVFcnJvcn0uXG4gKiBAcGFyYW0gZXJyb3IgQW55IGVycm9yIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gaXNVc2VyVmlzaWJsZUVycm9yKGVycm9yKSB7XG4gICAgcmV0dXJuICdpc1VzZXJWaXNpYmxlJyBpbiBlcnJvciAmJiBlcnJvci5pc1VzZXJWaXNpYmxlO1xufVxuZXhwb3J0cy5pc1VzZXJWaXNpYmxlRXJyb3IgPSBpc1VzZXJWaXNpYmxlRXJyb3I7XG5mdW5jdGlvbiBpc0R5bmFtaWNTeW5jVGFibGUoc3luY1RhYmxlKSB7XG4gICAgcmV0dXJuICdpc0R5bmFtaWMnIGluIHN5bmNUYWJsZTtcbn1cbmV4cG9ydHMuaXNEeW5hbWljU3luY1RhYmxlID0gaXNEeW5hbWljU3luY1RhYmxlO1xuZnVuY3Rpb24gd3JhcE1ldGFkYXRhRnVuY3Rpb24oZm5PckZvcm11bGEpIHtcbiAgICByZXR1cm4gdHlwZW9mIGZuT3JGb3JtdWxhID09PSAnZnVuY3Rpb24nID8gbWFrZU1ldGFkYXRhRm9ybXVsYShmbk9yRm9ybXVsYSkgOiBmbk9yRm9ybXVsYTtcbn1cbmV4cG9ydHMud3JhcE1ldGFkYXRhRnVuY3Rpb24gPSB3cmFwTWV0YWRhdGFGdW5jdGlvbjtcbmZ1bmN0aW9uIHRyYW5zZm9ybVRvQXJyYXlTY2hlbWEoc2NoZW1hKSB7XG4gICAgaWYgKChzY2hlbWEgPT09IG51bGwgfHwgc2NoZW1hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBzY2hlbWEudHlwZSkgPT09IHNjaGVtYV8xLlZhbHVlVHlwZS5BcnJheSkge1xuICAgICAgICByZXR1cm4gc2NoZW1hO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6IHNjaGVtYV8xLlZhbHVlVHlwZS5BcnJheSxcbiAgICAgICAgICAgIGl0ZW1zOiBzY2hlbWEsXG4gICAgICAgIH07XG4gICAgfVxufVxuZnVuY3Rpb24gd3JhcEdldFNjaGVtYShnZXRTY2hlbWEpIHtcbiAgICBpZiAoIWdldFNjaGVtYSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIC4uLmdldFNjaGVtYSxcbiAgICAgICAgZXhlY3V0ZShwYXJhbXMsIGNvbnRleHQpIHtcbiAgICAgICAgICAgIGNvbnN0IHNjaGVtYSA9IGdldFNjaGVtYS5leGVjdXRlKHBhcmFtcywgY29udGV4dCk7XG4gICAgICAgICAgICBpZiAoKDAsIG9iamVjdF91dGlsc18yLmlzUHJvbWlzZSkoc2NoZW1hKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzY2hlbWEudGhlbih2YWx1ZSA9PiB0cmFuc2Zvcm1Ub0FycmF5U2NoZW1hKHZhbHVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJhbnNmb3JtVG9BcnJheVNjaGVtYShzY2hlbWEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgIH07XG59XG5leHBvcnRzLndyYXBHZXRTY2hlbWEgPSB3cmFwR2V0U2NoZW1hO1xuLyoqXG4gKiBDcmVhdGUgYSBkZWZpbml0aW9uIGZvciBhIHBhcmFtZXRlciBmb3IgYSBmb3JtdWxhIG9yIHN5bmMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogbWFrZVBhcmFtZXRlcih7dHlwZTogUGFyYW1ldGVyVHlwZS5TdHJpbmcsIG5hbWU6ICdteVBhcmFtJywgZGVzY3JpcHRpb246ICdNeSBkZXNjcmlwdGlvbid9KTtcbiAqIGBgYFxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIG1ha2VQYXJhbWV0ZXIoe3R5cGU6IFBhcmFtZXRlclR5cGUuU3RyaW5nQXJyYXksIG5hbWU6ICdteUFycmF5UGFyYW0nLCBkZXNjcmlwdGlvbjogJ015IGRlc2NyaXB0aW9uJ30pO1xuICogYGBgXG4gKi9cbmZ1bmN0aW9uIG1ha2VQYXJhbWV0ZXIocGFyYW1EZWZpbml0aW9uKSB7XG4gICAgY29uc3QgeyB0eXBlLCBhdXRvY29tcGxldGU6IGF1dG9jb21wbGV0ZURlZk9ySXRlbXMsIC4uLnJlc3QgfSA9IHBhcmFtRGVmaW5pdGlvbjtcbiAgICBjb25zdCBhY3R1YWxUeXBlID0gYXBpX3R5cGVzXzIuUGFyYW1ldGVyVHlwZUlucHV0TWFwW3R5cGVdO1xuICAgIGxldCBhdXRvY29tcGxldGU7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXV0b2NvbXBsZXRlRGVmT3JJdGVtcykpIHtcbiAgICAgICAgY29uc3QgYXV0b2NvbXBsZXRlRGVmID0gbWFrZVNpbXBsZUF1dG9jb21wbGV0ZU1ldGFkYXRhRm9ybXVsYShhdXRvY29tcGxldGVEZWZPckl0ZW1zKTtcbiAgICAgICAgYXV0b2NvbXBsZXRlID0gd3JhcE1ldGFkYXRhRnVuY3Rpb24oYXV0b2NvbXBsZXRlRGVmKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGF1dG9jb21wbGV0ZSA9IHdyYXBNZXRhZGF0YUZ1bmN0aW9uKGF1dG9jb21wbGV0ZURlZk9ySXRlbXMpO1xuICAgIH1cbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7IC4uLnJlc3QsIGF1dG9jb21wbGV0ZSwgdHlwZTogYWN0dWFsVHlwZSB9KTtcbn1cbmV4cG9ydHMubWFrZVBhcmFtZXRlciA9IG1ha2VQYXJhbWV0ZXI7XG4vLyBPdGhlciBwYXJhbWV0ZXIgaGVscGVycyBiZWxvdyBoZXJlIGFyZSBvYnNvbGV0ZSBnaXZlbiB0aGUgYWJvdmUgZ2VuZXJhdGUgcGFyYW1ldGVyIG1ha2Vycy5cbi8qKiBAZGVwcmVjYXRlZCAqL1xuZnVuY3Rpb24gbWFrZVN0cmluZ1BhcmFtZXRlcihuYW1lLCBkZXNjcmlwdGlvbiwgYXJncyA9IHt9KSB7XG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoeyAuLi5hcmdzLCBuYW1lLCBkZXNjcmlwdGlvbiwgdHlwZTogYXBpX3R5cGVzXzMuVHlwZS5zdHJpbmcgfSk7XG59XG5leHBvcnRzLm1ha2VTdHJpbmdQYXJhbWV0ZXIgPSBtYWtlU3RyaW5nUGFyYW1ldGVyO1xuLyoqIEBkZXByZWNhdGVkICovXG5mdW5jdGlvbiBtYWtlU3RyaW5nQXJyYXlQYXJhbWV0ZXIobmFtZSwgZGVzY3JpcHRpb24sIGFyZ3MgPSB7fSkge1xuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHsgLi4uYXJncywgbmFtZSwgZGVzY3JpcHRpb24sIHR5cGU6IGFwaV90eXBlc18xMC5zdHJpbmdBcnJheSB9KTtcbn1cbmV4cG9ydHMubWFrZVN0cmluZ0FycmF5UGFyYW1ldGVyID0gbWFrZVN0cmluZ0FycmF5UGFyYW1ldGVyO1xuLyoqIEBkZXByZWNhdGVkICovXG5mdW5jdGlvbiBtYWtlTnVtZXJpY1BhcmFtZXRlcihuYW1lLCBkZXNjcmlwdGlvbiwgYXJncyA9IHt9KSB7XG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoeyAuLi5hcmdzLCBuYW1lLCBkZXNjcmlwdGlvbiwgdHlwZTogYXBpX3R5cGVzXzMuVHlwZS5udW1iZXIgfSk7XG59XG5leHBvcnRzLm1ha2VOdW1lcmljUGFyYW1ldGVyID0gbWFrZU51bWVyaWNQYXJhbWV0ZXI7XG4vKiogQGRlcHJlY2F0ZWQgKi9cbmZ1bmN0aW9uIG1ha2VOdW1lcmljQXJyYXlQYXJhbWV0ZXIobmFtZSwgZGVzY3JpcHRpb24sIGFyZ3MgPSB7fSkge1xuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHsgLi4uYXJncywgbmFtZSwgZGVzY3JpcHRpb24sIHR5cGU6IGFwaV90eXBlc185Lm51bWJlckFycmF5IH0pO1xufVxuZXhwb3J0cy5tYWtlTnVtZXJpY0FycmF5UGFyYW1ldGVyID0gbWFrZU51bWVyaWNBcnJheVBhcmFtZXRlcjtcbi8qKiBAZGVwcmVjYXRlZCAqL1xuZnVuY3Rpb24gbWFrZUJvb2xlYW5QYXJhbWV0ZXIobmFtZSwgZGVzY3JpcHRpb24sIGFyZ3MgPSB7fSkge1xuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHsgLi4uYXJncywgbmFtZSwgZGVzY3JpcHRpb24sIHR5cGU6IGFwaV90eXBlc18zLlR5cGUuYm9vbGVhbiB9KTtcbn1cbmV4cG9ydHMubWFrZUJvb2xlYW5QYXJhbWV0ZXIgPSBtYWtlQm9vbGVhblBhcmFtZXRlcjtcbi8qKiBAZGVwcmVjYXRlZCAqL1xuZnVuY3Rpb24gbWFrZUJvb2xlYW5BcnJheVBhcmFtZXRlcihuYW1lLCBkZXNjcmlwdGlvbiwgYXJncyA9IHt9KSB7XG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoeyAuLi5hcmdzLCBuYW1lLCBkZXNjcmlwdGlvbiwgdHlwZTogYXBpX3R5cGVzXzQuYm9vbGVhbkFycmF5IH0pO1xufVxuZXhwb3J0cy5tYWtlQm9vbGVhbkFycmF5UGFyYW1ldGVyID0gbWFrZUJvb2xlYW5BcnJheVBhcmFtZXRlcjtcbi8qKiBAZGVwcmVjYXRlZCAqL1xuZnVuY3Rpb24gbWFrZURhdGVQYXJhbWV0ZXIobmFtZSwgZGVzY3JpcHRpb24sIGFyZ3MgPSB7fSkge1xuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHsgLi4uYXJncywgbmFtZSwgZGVzY3JpcHRpb24sIHR5cGU6IGFwaV90eXBlc18zLlR5cGUuZGF0ZSB9KTtcbn1cbmV4cG9ydHMubWFrZURhdGVQYXJhbWV0ZXIgPSBtYWtlRGF0ZVBhcmFtZXRlcjtcbi8qKiBAZGVwcmVjYXRlZCAqL1xuZnVuY3Rpb24gbWFrZURhdGVBcnJheVBhcmFtZXRlcihuYW1lLCBkZXNjcmlwdGlvbiwgYXJncyA9IHt9KSB7XG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoeyAuLi5hcmdzLCBuYW1lLCBkZXNjcmlwdGlvbiwgdHlwZTogYXBpX3R5cGVzXzUuZGF0ZUFycmF5IH0pO1xufVxuZXhwb3J0cy5tYWtlRGF0ZUFycmF5UGFyYW1ldGVyID0gbWFrZURhdGVBcnJheVBhcmFtZXRlcjtcbi8qKiBAZGVwcmVjYXRlZCAqL1xuZnVuY3Rpb24gbWFrZUh0bWxQYXJhbWV0ZXIobmFtZSwgZGVzY3JpcHRpb24sIGFyZ3MgPSB7fSkge1xuICAgIHJldHVybiBPYmplY3QuZnJlZXplKHsgLi4uYXJncywgbmFtZSwgZGVzY3JpcHRpb24sIHR5cGU6IGFwaV90eXBlc18zLlR5cGUuaHRtbCB9KTtcbn1cbmV4cG9ydHMubWFrZUh0bWxQYXJhbWV0ZXIgPSBtYWtlSHRtbFBhcmFtZXRlcjtcbi8qKiBAZGVwcmVjYXRlZCAqL1xuZnVuY3Rpb24gbWFrZUh0bWxBcnJheVBhcmFtZXRlcihuYW1lLCBkZXNjcmlwdGlvbiwgYXJncyA9IHt9KSB7XG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoeyAuLi5hcmdzLCBuYW1lLCBkZXNjcmlwdGlvbiwgdHlwZTogYXBpX3R5cGVzXzcuaHRtbEFycmF5IH0pO1xufVxuZXhwb3J0cy5tYWtlSHRtbEFycmF5UGFyYW1ldGVyID0gbWFrZUh0bWxBcnJheVBhcmFtZXRlcjtcbi8qKiBAZGVwcmVjYXRlZCAqL1xuZnVuY3Rpb24gbWFrZUltYWdlUGFyYW1ldGVyKG5hbWUsIGRlc2NyaXB0aW9uLCBhcmdzID0ge30pIHtcbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7IC4uLmFyZ3MsIG5hbWUsIGRlc2NyaXB0aW9uLCB0eXBlOiBhcGlfdHlwZXNfMy5UeXBlLmltYWdlIH0pO1xufVxuZXhwb3J0cy5tYWtlSW1hZ2VQYXJhbWV0ZXIgPSBtYWtlSW1hZ2VQYXJhbWV0ZXI7XG4vKiogQGRlcHJlY2F0ZWQgKi9cbmZ1bmN0aW9uIG1ha2VJbWFnZUFycmF5UGFyYW1ldGVyKG5hbWUsIGRlc2NyaXB0aW9uLCBhcmdzID0ge30pIHtcbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7IC4uLmFyZ3MsIG5hbWUsIGRlc2NyaXB0aW9uLCB0eXBlOiBhcGlfdHlwZXNfOC5pbWFnZUFycmF5IH0pO1xufVxuZXhwb3J0cy5tYWtlSW1hZ2VBcnJheVBhcmFtZXRlciA9IG1ha2VJbWFnZUFycmF5UGFyYW1ldGVyO1xuLyoqIEBkZXByZWNhdGVkICovXG5mdW5jdGlvbiBtYWtlRmlsZVBhcmFtZXRlcihuYW1lLCBkZXNjcmlwdGlvbiwgYXJncyA9IHt9KSB7XG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoeyAuLi5hcmdzLCBuYW1lLCBkZXNjcmlwdGlvbiwgdHlwZTogYXBpX3R5cGVzXzMuVHlwZS5maWxlIH0pO1xufVxuZXhwb3J0cy5tYWtlRmlsZVBhcmFtZXRlciA9IG1ha2VGaWxlUGFyYW1ldGVyO1xuLyoqIEBkZXByZWNhdGVkICovXG5mdW5jdGlvbiBtYWtlRmlsZUFycmF5UGFyYW1ldGVyKG5hbWUsIGRlc2NyaXB0aW9uLCBhcmdzID0ge30pIHtcbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZSh7IC4uLmFyZ3MsIG5hbWUsIGRlc2NyaXB0aW9uLCB0eXBlOiBhcGlfdHlwZXNfNi5maWxlQXJyYXkgfSk7XG59XG5leHBvcnRzLm1ha2VGaWxlQXJyYXlQYXJhbWV0ZXIgPSBtYWtlRmlsZUFycmF5UGFyYW1ldGVyO1xuLyoqIEBkZXByZWNhdGVkICovXG5mdW5jdGlvbiBtYWtlVXNlclZpc2libGVFcnJvcihtc2cpIHtcbiAgICByZXR1cm4gbmV3IFVzZXJWaXNpYmxlRXJyb3IobXNnKTtcbn1cbmV4cG9ydHMubWFrZVVzZXJWaXNpYmxlRXJyb3IgPSBtYWtlVXNlclZpc2libGVFcnJvcjtcbi8qKiBAZGVwcmVjYXRlZCAqL1xuZnVuY3Rpb24gY2hlY2soY29uZGl0aW9uLCBtc2cpIHtcbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgICB0aHJvdyBtYWtlVXNlclZpc2libGVFcnJvcihtc2cpO1xuICAgIH1cbn1cbmV4cG9ydHMuY2hlY2sgPSBjaGVjaztcbmZ1bmN0aW9uIGlzT2JqZWN0UGFja0Zvcm11bGEoZm4pIHtcbiAgICByZXR1cm4gZm4ucmVzdWx0VHlwZSA9PT0gYXBpX3R5cGVzXzMuVHlwZS5vYmplY3Q7XG59XG5leHBvcnRzLmlzT2JqZWN0UGFja0Zvcm11bGEgPSBpc09iamVjdFBhY2tGb3JtdWxhO1xuZnVuY3Rpb24gaXNTdHJpbmdQYWNrRm9ybXVsYShmbikge1xuICAgIHJldHVybiBmbi5yZXN1bHRUeXBlID09PSBhcGlfdHlwZXNfMy5UeXBlLnN0cmluZztcbn1cbmV4cG9ydHMuaXNTdHJpbmdQYWNrRm9ybXVsYSA9IGlzU3RyaW5nUGFja0Zvcm11bGE7XG5mdW5jdGlvbiBpc1N5bmNQYWNrRm9ybXVsYShmbikge1xuICAgIHJldHVybiBCb29sZWFuKGZuLmlzU3luY0Zvcm11bGEpO1xufVxuZXhwb3J0cy5pc1N5bmNQYWNrRm9ybXVsYSA9IGlzU3luY1BhY2tGb3JtdWxhO1xuLyoqXG4gKiBAZGVwcmVjYXRlZFxuICpcbiAqIEhlbHBlciBmb3IgcmV0dXJuaW5nIHRoZSBkZWZpbml0aW9uIG9mIGEgZm9ybXVsYSB0aGF0IHJldHVybnMgYSBudW1iZXIuIEFkZHMgcmVzdWx0IHR5cGUgaW5mb3JtYXRpb25cbiAqIHRvIGEgZ2VuZXJpYyBmb3JtdWxhIGRlZmluaXRpb24uXG4gKlxuICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgYSBmb3JtdWxhIHRoYXQgcmV0dXJucyBhIG51bWJlci5cbiAqL1xuZnVuY3Rpb24gbWFrZU51bWVyaWNGb3JtdWxhKGRlZmluaXRpb24pIHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbih7fSwgZGVmaW5pdGlvbiwgeyByZXN1bHRUeXBlOiBhcGlfdHlwZXNfMy5UeXBlLm51bWJlciB9KTtcbn1cbmV4cG9ydHMubWFrZU51bWVyaWNGb3JtdWxhID0gbWFrZU51bWVyaWNGb3JtdWxhO1xuLyoqXG4gKiBAZGVwcmVjYXRlZFxuICpcbiAqIEhlbHBlciBmb3IgcmV0dXJuaW5nIHRoZSBkZWZpbml0aW9uIG9mIGEgZm9ybXVsYSB0aGF0IHJldHVybnMgYSBzdHJpbmcuIEFkZHMgcmVzdWx0IHR5cGUgaW5mb3JtYXRpb25cbiAqIHRvIGEgZ2VuZXJpYyBmb3JtdWxhIGRlZmluaXRpb24uXG4gKlxuICogQHBhcmFtIGRlZmluaXRpb24gVGhlIGRlZmluaXRpb24gb2YgYSBmb3JtdWxhIHRoYXQgcmV0dXJucyBhIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gbWFrZVN0cmluZ0Zvcm11bGEoZGVmaW5pdGlvbikge1xuICAgIGNvbnN0IHsgcmVzcG9uc2UgfSA9IGRlZmluaXRpb247XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGRlZmluaXRpb24sIHtcbiAgICAgICAgcmVzdWx0VHlwZTogYXBpX3R5cGVzXzMuVHlwZS5zdHJpbmcsXG4gICAgICAgIC4uLihyZXNwb25zZSAmJiB7IHNjaGVtYTogcmVzcG9uc2Uuc2NoZW1hIH0pLFxuICAgIH0pO1xufVxuZXhwb3J0cy5tYWtlU3RyaW5nRm9ybXVsYSA9IG1ha2VTdHJpbmdGb3JtdWxhO1xuLyoqXG4gKiBDcmVhdGVzIGEgZm9ybXVsYSBkZWZpbml0aW9uLlxuICpcbiAqIFlvdSBtdXN0IGluZGljYXRlIHRoZSBraW5kIG9mIHZhbHVlIHRoYXQgdGhpcyBmb3JtdWxhIHJldHVybnMgKHN0cmluZywgbnVtYmVyLCBib29sZWFuLCBhcnJheSwgb3Igb2JqZWN0KVxuICogdXNpbmcgdGhlIGByZXN1bHRUeXBlYCBmaWVsZC5cbiAqXG4gKiBGb3JtdWxhcyBhbHdheXMgcmV0dXJuIGJhc2ljIHR5cGVzLCBidXQgeW91IG1heSBvcHRpb25hbGx5IGdpdmUgYSB0eXBlIGhpbnQgdXNpbmdcbiAqIGBjb2RhVHlwZWAgdG8gdGVsbCBDb2RhIGhvdyB0byBpbnRlcnByZXQgYSBnaXZlbiB2YWx1ZS4gRm9yIGV4YW1wbGUsIHlvdSBjYW4gcmV0dXJuXG4gKiBhIHN0cmluZyB0aGF0IHJlcHJlc2VudHMgYSBkYXRlLCBidXQgdXNlIGBjb2RhVHlwZTogVmFsdWVUeXBlLkRhdGVgIHRvIHRlbGwgQ29kYVxuICogdG8gaW50ZXJwcmV0IGFzIGEgZGF0ZSBpbiBhIGRvY3VtZW50LlxuICpcbiAqIElmIHlvdXIgZm9ybXVsYSByZXR1cm5zIGFuIG9iamVjdCwgeW91IG11c3QgcHJvdmlkZSBhIGBzY2hlbWFgIHByb3BlcnR5IHRoYXQgZGVzY3JpYmVzXG4gKiB0aGUgc3RydWN0dXJlIG9mIHRoZSBvYmplY3QuIFNlZSB7QGxpbmsgbWFrZU9iamVjdFNjaGVtYX0gZm9yIGhvdyB0byBjb25zdHJ1Y3QgYW4gb2JqZWN0IHNjaGVtYS5cbiAqXG4gKiBJZiB5b3VyIGZvcm11bGEgcmV0dXJucyBhIGxpc3QgKGFycmF5KSwgeW91IG11c3QgcHJvdmlkZSBhbiBgaXRlbXNgIHByb3BlcnR5IHRoYXQgZGVzY3JpYmVzXG4gKiB3aGF0IHRoZSBlbGVtZW50cyBvZiB0aGUgYXJyYXkgYXJlLiBUaGlzIGNvdWxkIGJlIGEgc2ltcGxlIHNjaGVtYSBsaWtlIGB7dHlwZTogVmFsdWVUeXBlLlN0cmluZ31gXG4gKiBpbmRpY2F0aW5nIHRoYXQgdGhlIGFycmF5IGVsZW1lbnRzIGFyZSBhbGwganVzdCBzdHJpbmdzLCBvciBpdCBjb3VsZCBiZSBhbiBvYmplY3Qgc2NoZW1hXG4gKiBjcmVhdGVkIHVzaW5nIHtAbGluayBtYWtlT2JqZWN0U2NoZW1hfSBpZiB0aGUgZWxlbWVudHMgYXJlIG9iamVjdHMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogbWFrZUZvcm11bGEoe3Jlc3VsdFR5cGU6IFZhbHVlVHlwZS5TdHJpbmcsIG5hbWU6ICdIZWxsbycsIC4uLn0pO1xuICogYGBgXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogbWFrZUZvcm11bGEoe3Jlc3VsdFR5cGU6IFZhbHVlVHlwZS5TdHJpbmcsIGNvZGFUeXBlOiBWYWx1ZVR5cGUuSHRtbCwgbmFtZTogJ0hlbGxvSHRtbCcsIC4uLn0pO1xuICogYGBgXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogbWFrZUZvcm11bGEoe3Jlc3VsdFR5cGU6IFZhbHVlVHlwZS5BcnJheSwgaXRlbXM6IHt0eXBlOiBWYWx1ZVR5cGUuU3RyaW5nfSwgbmFtZTogJ0hlbGxvU3RyaW5nQXJyYXknLCAuLi59KTtcbiAqIGBgYFxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIG1ha2VGb3JtdWxhKHtcbiAqICAgcmVzdWx0VHlwZTogVmFsdWVUeXBlLk9iamVjdCxcbiAqICAgc2NoZW1hOiBtYWtlT2JqZWN0U2NoZW1hKHt0eXBlOiBWYWx1ZVR5cGUuT2JqZWN0LCBwcm9wZXJ0aWVzOiB7Li4ufX0pLFxuICogICBuYW1lOiAnSGVsbG9PYmplY3QnLFxuICogICAuLi5cbiAqIH0pO1xuICogYGBgXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogbWFrZUZvcm11bGEoe1xuICogICByZXN1bHRUeXBlOiBWYWx1ZVR5cGUuQXJyYXksXG4gKiAgIGl0ZW1zOiBtYWtlT2JqZWN0U2NoZW1hKHt0eXBlOiBWYWx1ZVR5cGUuT2JqZWN0LCBwcm9wZXJ0aWVzOiB7Li4ufX0pLFxuICogICBuYW1lOiAnSGVsbG9PYmplY3RBcnJheScsXG4gKiAgIC4uLlxuICogfSk7XG4gKiBgYGBcbiAqL1xuZnVuY3Rpb24gbWFrZUZvcm11bGEoZnVsbERlZmluaXRpb24pIHtcbiAgICBsZXQgZm9ybXVsYTtcbiAgICBzd2l0Y2ggKGZ1bGxEZWZpbml0aW9uLnJlc3VsdFR5cGUpIHtcbiAgICAgICAgY2FzZSBzY2hlbWFfMS5WYWx1ZVR5cGUuU3RyaW5nOiB7XG4gICAgICAgICAgICAvLyB2ZXJ5IHN0cmFuZ2UgdHMga25vd3MgdGhhdCBmdWxsRGVmaW5pdGlvbi5jb2RhVHlwZSBpcyBTdHJpbmdIaW50VHlwZXMgYnV0IGRvZXNuJ3Qga25vdyBpZlxuICAgICAgICAgICAgLy8gZnVsbERlZmluaXRpb24gaXMgU3RyaW5nRm9ybXVsYURlZlYyLlxuICAgICAgICAgICAgY29uc3QgZGVmID0ge1xuICAgICAgICAgICAgICAgIC4uLmZ1bGxEZWZpbml0aW9uLFxuICAgICAgICAgICAgICAgIGNvZGFUeXBlOiAnY29kYVR5cGUnIGluIGZ1bGxEZWZpbml0aW9uID8gZnVsbERlZmluaXRpb24uY29kYVR5cGUgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgZm9ybXVsYVNjaGVtYTogJ3NjaGVtYScgaW4gZnVsbERlZmluaXRpb24gPyBmdWxsRGVmaW5pdGlvbi5zY2hlbWEgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3QgeyBvbkVycm9yOiBfLCByZXN1bHRUeXBlOiB1bnVzZWQsIGNvZGFUeXBlLCBmb3JtdWxhU2NoZW1hLCAuLi5yZXN0IH0gPSBkZWY7XG4gICAgICAgICAgICBjb25zdCBzdHJpbmdGb3JtdWxhID0ge1xuICAgICAgICAgICAgICAgIC4uLnJlc3QsXG4gICAgICAgICAgICAgICAgcmVzdWx0VHlwZTogYXBpX3R5cGVzXzMuVHlwZS5zdHJpbmcsXG4gICAgICAgICAgICAgICAgc2NoZW1hOiBmb3JtdWxhU2NoZW1hIHx8IChjb2RhVHlwZSA/IHsgdHlwZTogc2NoZW1hXzEuVmFsdWVUeXBlLlN0cmluZywgY29kYVR5cGUgfSA6IHVuZGVmaW5lZCksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZm9ybXVsYSA9IHN0cmluZ0Zvcm11bGE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIHNjaGVtYV8xLlZhbHVlVHlwZS5OdW1iZXI6IHtcbiAgICAgICAgICAgIGNvbnN0IGRlZiA9IHtcbiAgICAgICAgICAgICAgICAuLi5mdWxsRGVmaW5pdGlvbixcbiAgICAgICAgICAgICAgICBjb2RhVHlwZTogJ2NvZGFUeXBlJyBpbiBmdWxsRGVmaW5pdGlvbiA/IGZ1bGxEZWZpbml0aW9uLmNvZGFUeXBlIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGZvcm11bGFTY2hlbWE6ICdzY2hlbWEnIGluIGZ1bGxEZWZpbml0aW9uID8gZnVsbERlZmluaXRpb24uc2NoZW1hIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IHsgb25FcnJvcjogXywgcmVzdWx0VHlwZTogdW51c2VkLCBjb2RhVHlwZSwgZm9ybXVsYVNjaGVtYSwgLi4ucmVzdCB9ID0gZGVmO1xuICAgICAgICAgICAgY29uc3QgbnVtZXJpY0Zvcm11bGEgPSB7XG4gICAgICAgICAgICAgICAgLi4ucmVzdCxcbiAgICAgICAgICAgICAgICByZXN1bHRUeXBlOiBhcGlfdHlwZXNfMy5UeXBlLm51bWJlcixcbiAgICAgICAgICAgICAgICBzY2hlbWE6IGZvcm11bGFTY2hlbWEgfHwgKGNvZGFUeXBlID8geyB0eXBlOiBzY2hlbWFfMS5WYWx1ZVR5cGUuTnVtYmVyLCBjb2RhVHlwZSB9IDogdW5kZWZpbmVkKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3JtdWxhID0gbnVtZXJpY0Zvcm11bGE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIHNjaGVtYV8xLlZhbHVlVHlwZS5Cb29sZWFuOiB7XG4gICAgICAgICAgICBjb25zdCB7IG9uRXJyb3I6IF8sIHJlc3VsdFR5cGU6IHVudXNlZCwgLi4ucmVzdCB9ID0gZnVsbERlZmluaXRpb247XG4gICAgICAgICAgICBjb25zdCBib29sZWFuRm9ybXVsYSA9IHtcbiAgICAgICAgICAgICAgICAuLi5yZXN0LFxuICAgICAgICAgICAgICAgIHJlc3VsdFR5cGU6IGFwaV90eXBlc18zLlR5cGUuYm9vbGVhbixcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3JtdWxhID0gYm9vbGVhbkZvcm11bGE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIHNjaGVtYV8xLlZhbHVlVHlwZS5BcnJheToge1xuICAgICAgICAgICAgY29uc3QgeyBvbkVycm9yOiBfLCByZXN1bHRUeXBlOiB1bnVzZWQsIGl0ZW1zLCAuLi5yZXN0IH0gPSBmdWxsRGVmaW5pdGlvbjtcbiAgICAgICAgICAgIGNvbnN0IGFycmF5Rm9ybXVsYSA9IHtcbiAgICAgICAgICAgICAgICAuLi5yZXN0LFxuICAgICAgICAgICAgICAgIC8vIFR5cGVPZjxTY2hlbWFUeXBlPEFycmF5U2NoZW1hPFNjaGVtYVQ+Pj4gaXMgYWx3YXlzIFR5cGUub2JqZWN0IGJ1dCBUUyBjYW4ndCBpbmZlciB0aGlzLlxuICAgICAgICAgICAgICAgIHJlc3VsdFR5cGU6IGFwaV90eXBlc18zLlR5cGUub2JqZWN0LFxuICAgICAgICAgICAgICAgIHNjaGVtYTogKDAsIHNjaGVtYV8zLm5vcm1hbGl6ZVNjaGVtYSkoeyB0eXBlOiBzY2hlbWFfMS5WYWx1ZVR5cGUuQXJyYXksIGl0ZW1zIH0pLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZvcm11bGEgPSBhcnJheUZvcm11bGE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIHNjaGVtYV8xLlZhbHVlVHlwZS5PYmplY3Q6IHtcbiAgICAgICAgICAgIGNvbnN0IHsgb25FcnJvcjogXywgcmVzdWx0VHlwZTogdW51c2VkLCBzY2hlbWEsIC4uLnJlc3QgfSA9IGZ1bGxEZWZpbml0aW9uO1xuICAgICAgICAgICAgLy8gbmVlZCBhIGZvcmNlIGNhc3Qgc2luY2UgZXhlY3V0ZSBoYXMgYSBkaWZmZXJlbnQgcmV0dXJuIHZhbHVlIGR1ZSB0byBrZXkgbm9ybWFsaXphdGlvbi5cbiAgICAgICAgICAgIGNvbnN0IG9iamVjdEZvcm11bGEgPSB7XG4gICAgICAgICAgICAgICAgLi4ucmVzdCxcbiAgICAgICAgICAgICAgICByZXN1bHRUeXBlOiBhcGlfdHlwZXNfMy5UeXBlLm9iamVjdCxcbiAgICAgICAgICAgICAgICBzY2hlbWE6ICgwLCBzY2hlbWFfMy5ub3JtYWxpemVTY2hlbWEpKHNjaGVtYSksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZm9ybXVsYSA9IG9iamVjdEZvcm11bGE7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuICgwLCBlbnN1cmVfMS5lbnN1cmVVbnJlYWNoYWJsZSkoZnVsbERlZmluaXRpb24pO1xuICAgIH1cbiAgICBjb25zdCBvbkVycm9yID0gZnVsbERlZmluaXRpb24ub25FcnJvcjtcbiAgICBpZiAob25FcnJvcikge1xuICAgICAgICBjb25zdCB3cmFwcGVkRXhlY3V0ZSA9IGZvcm11bGEuZXhlY3V0ZTtcbiAgICAgICAgZm9ybXVsYS5leGVjdXRlID0gYXN5bmMgZnVuY3Rpb24gKHBhcmFtcywgY29udGV4dCkge1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYXdhaXQgd3JhcHBlZEV4ZWN1dGUocGFyYW1zLCBjb250ZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb25FcnJvcihlcnIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gbWF5YmVSZXdyaXRlQ29ubmVjdGlvbkZvckZvcm11bGEoZm9ybXVsYSwgZnVsbERlZmluaXRpb24uY29ubmVjdGlvblJlcXVpcmVtZW50KTtcbn1cbmV4cG9ydHMubWFrZUZvcm11bGEgPSBtYWtlRm9ybXVsYTtcbi8qKlxuICogQSB3cmFwcGVyIHRoYXQgZ2VuZXJhdGVzIGEgZm9ybXVsYSBkZWZpbml0aW9uIGZyb20gdGhlIGZ1bmN0aW9uIHRoYXQgaW1wbGVtZW50cyBhIG1ldGFkYXRhIGZvcm11bGEuXG4gKiBJdCBpcyB1bmNvbW1vbiB0byBldmVyIG5lZWQgdG8gY2FsbCB0aGlzIGRpcmVjdGx5LCBub3JtYWxseSB5b3Ugd291bGQganVzdCBkZWZpbmUgdGhlIEphdmFTY3JpcHRcbiAqIGZ1bmN0aW9uIGltcGxlbWVudGF0aW9uLCBhbmQgQ29kYSB3aWxsIHdyYXAgaXQgd2l0aCB0aGlzIHRvIGdlbmVyYXRlIGEgZnVsbCBtZXRhZGF0YSBmb3JtdWxhXG4gKiBkZWZpbml0aW9uLlxuICpcbiAqIEFsbCBmdW5jdGlvbi1saWtlIGJlaGF2aW9yIGluIGEgcGFjayBpcyB1bHRpbWF0ZWx5IGltcGxlbWVudGVkIHVzaW5nIGZvcm11bGFzLCBsaWtlIHlvdSB3b3VsZFxuICogZGVmaW5lIHVzaW5nIHtAbGluayBtYWtlRm9ybXVsYX0uIFRoYXQgaXMsIGEgZm9ybXVsYSB3aXRoIGEgbmFtZSwgZGVzY3JpcHRpb24sIHBhcmFtZXRlciBsaXN0LFxuICogYW5kIGFuIGBleGVjdXRlYCBmdW5jdGlvbiBib2R5LiBUaGlzIGluY2x1ZGVzIHN1cHBvcnRpbmcgdXRpbGl0aWVzIGxpa2UgcGFyYW10ZXIgYXV0b2NvbXBsZXRlIGZ1bmN0aW9ucy5cbiAqIFRoaXMgd3JhcHBlciBzaW1wbHkgYWRkcyB0aGUgc3Vycm91bmRpbmcgYm9pbGVycGxhdGUgZm9yIGEgZ2l2ZW4gSmF2YVNjcmlwdCBmdW5jdGlvbiBzbyB0aGF0XG4gKiBpdCBpcyBzaGFwZWQgbGlrZSBhIENvZGEgZm9ybXVsYSB0byBiZSB1c2VkIGF0IHJ1bnRpbWUuXG4gKi9cbmZ1bmN0aW9uIG1ha2VNZXRhZGF0YUZvcm11bGEoZXhlY3V0ZSwgb3B0aW9ucykge1xuICAgIHJldHVybiBtYWtlT2JqZWN0Rm9ybXVsYSh7XG4gICAgICAgIG5hbWU6ICdnZXRNZXRhZGF0YScsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnR2V0cyBtZXRhZGF0YScsXG4gICAgICAgIC8vIEZvcm11bGEgY29udGV4dCBpcyBzZXJpYWxpemVkIGhlcmUgYmVjYXVzZSB3ZSBkbyBub3Qgd2FudCB0byBwYXNzIG9iamVjdHMgaW50b1xuICAgICAgICAvLyByZWd1bGFyIHBhY2sgZnVuY3Rpb25zICh3aGljaCB0aGlzIGlzKVxuICAgICAgICBleGVjdXRlKFtzZWFyY2gsIHNlcmlhbGl6ZWRGb3JtdWxhQ29udGV4dF0sIGNvbnRleHQpIHtcbiAgICAgICAgICAgIGxldCBmb3JtdWxhQ29udGV4dCA9IHt9O1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBmb3JtdWxhQ29udGV4dCA9IEpTT04ucGFyc2Uoc2VyaWFsaXplZEZvcm11bGFDb250ZXh0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAvLyAgSWdub3JlLlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGV4ZWN1dGUoY29udGV4dCwgc2VhcmNoLCBmb3JtdWxhQ29udGV4dCk7XG4gICAgICAgIH0sXG4gICAgICAgIHBhcmFtZXRlcnM6IFtcbiAgICAgICAgICAgIG1ha2VTdHJpbmdQYXJhbWV0ZXIoJ3NlYXJjaCcsICdNZXRhZGF0YSB0byBzZWFyY2ggZm9yJywgeyBvcHRpb25hbDogdHJ1ZSB9KSxcbiAgICAgICAgICAgIG1ha2VTdHJpbmdQYXJhbWV0ZXIoJ2Zvcm11bGFDb250ZXh0JywgJ1NlcmlhbGl6ZWQgSlNPTiBmb3IgbWV0YWRhdGEnLCB7IG9wdGlvbmFsOiB0cnVlIH0pLFxuICAgICAgICBdLFxuICAgICAgICBleGFtcGxlczogW10sXG4gICAgICAgIGNvbm5lY3Rpb25SZXF1aXJlbWVudDogKG9wdGlvbnMgPT09IG51bGwgfHwgb3B0aW9ucyA9PT0gdm9pZCAwID8gdm9pZCAwIDogb3B0aW9ucy5jb25uZWN0aW9uUmVxdWlyZW1lbnQpIHx8IGFwaV90eXBlc18xLkNvbm5lY3Rpb25SZXF1aXJlbWVudC5PcHRpb25hbCxcbiAgICB9KTtcbn1cbmV4cG9ydHMubWFrZU1ldGFkYXRhRm9ybXVsYSA9IG1ha2VNZXRhZGF0YUZvcm11bGE7XG4vKipcbiAqIFV0aWxpdHkgdG8gc2VhcmNoIG92ZXIgYW4gYXJyYXkgb2YgYXV0b2NvbXBsZXRlIHJlc3VsdHMgYW5kIHJldHVybiBvbmx5IHRob3NlIHRoYXRcbiAqIG1hdGNoIHRoZSBnaXZlbiBzZWFyY2ggc3RyaW5nLlxuICpcbiAqIFlvdSBjYW4gZG8gdGhpcyB5b3Vyc2VsZiBidXQgdGhpcyBmdW5jdGlvbiBoZWxwcyBzaW1wbGlmeSBtYW55IGNvbW1vbiBzY2VuYXJpb3MuXG4gKiBOb3RlIHRoYXQgaWYgeW91IGhhdmUgYSBoYXJkY29kZWQgbGlzdCBvZiBhdXRvY29tcGxldGUgb3B0aW9ucywgeW91IGNhbiBzaW1wbHkgc3BlY2lmeVxuICogdGhlbSBkaXJlY3RseSBhcyBhIGxpc3QsIHlvdSBuZWVkIG5vdCBhY3R1YWxseSBpbXBsZW1lbnQgYW4gYXV0b2NvbXBsZXRlIGZ1bmN0aW9uLlxuICpcbiAqIFRoZSBwcmltYXJ5IHVzZSBjYXNlIGhlcmUgaXMgZmV0Y2hpbmcgYSBsaXN0IG9mIGFsbCBwb3NzaWJsZSByZXN1bHRzIGZyb20gYW4gQVBJXG4gKiBhbmQgdGhlbiByZWZpbmluZyB0aGVtIHVzaW5nIHRoZSB1c2VyJ3MgY3VycmVudCBzZWFyY2ggc3RyaW5nLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBcbiAqIGF1dG9jb21wbGV0ZTogYXN5bmMgZnVuY3Rpb24oY29udGV4dCwgc2VhcmNoKSB7XG4gKiAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY29udGV4dC5mZXRjaGVyLmZldGNoKHttZXRob2Q6IFwiR0VUXCIsIHVybDogXCIvYXBpL2VudGl0aWVzXCJ9KTtcbiAqICAgY29uc3QgYWxsT3B0aW9ucyA9IHJlc3BvbnNlLmJvZHkuZW50aXRpZXMubWFwKGVudGl0eSA9PiBlbnRpdHkubmFtZSk7XG4gKiAgIHJldHVybiBjb2RhLnNpbXBsZUF1dG9jb21wbGV0ZShzZWFyY2gsIGFsbE9wdGlvbnMpO1xuICogfVxuICogYGBgXG4gKi9cbmZ1bmN0aW9uIHNpbXBsZUF1dG9jb21wbGV0ZShzZWFyY2gsIG9wdGlvbnMpIHtcbiAgICBjb25zdCBub3JtYWxpemVkU2VhcmNoID0gKHNlYXJjaCB8fCAnJykudG9Mb3dlckNhc2UoKTtcbiAgICBjb25zdCBmaWx0ZXJlZCA9IG9wdGlvbnMuZmlsdGVyKG9wdGlvbiA9PiB7XG4gICAgICAgIGNvbnN0IGRpc3BsYXkgPSB0eXBlb2Ygb3B0aW9uID09PSAnc3RyaW5nJyB8fCB0eXBlb2Ygb3B0aW9uID09PSAnbnVtYmVyJyA/IG9wdGlvbiA6IG9wdGlvbi5kaXNwbGF5O1xuICAgICAgICByZXR1cm4gZGlzcGxheS50b1N0cmluZygpLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMobm9ybWFsaXplZFNlYXJjaCk7XG4gICAgfSk7XG4gICAgY29uc3QgbWV0YWRhdGFSZXN1bHRzID0gW107XG4gICAgZm9yIChjb25zdCBvcHRpb24gb2YgZmlsdGVyZWQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBtZXRhZGF0YVJlc3VsdHMucHVzaCh7XG4gICAgICAgICAgICAgICAgdmFsdWU6IG9wdGlvbixcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBvcHRpb24sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2Ygb3B0aW9uID09PSAnbnVtYmVyJykge1xuICAgICAgICAgICAgbWV0YWRhdGFSZXN1bHRzLnB1c2goe1xuICAgICAgICAgICAgICAgIHZhbHVlOiBvcHRpb24sXG4gICAgICAgICAgICAgICAgZGlzcGxheTogb3B0aW9uLnRvU3RyaW5nKCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG1ldGFkYXRhUmVzdWx0cy5wdXNoKG9wdGlvbik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShtZXRhZGF0YVJlc3VsdHMpO1xufVxuZXhwb3J0cy5zaW1wbGVBdXRvY29tcGxldGUgPSBzaW1wbGVBdXRvY29tcGxldGU7XG4vKipcbiAqIEEgaGVscGVyIHRvIHNlYXJjaCBvdmVyIGEgbGlzdCBvZiBvYmplY3RzIHJlcHJlc2VudGluZyBjYW5kaWRhdGUgc2VhcmNoIHJlc3VsdHMsXG4gKiBmaWx0ZXJpbmcgdG8gb25seSB0aG9zZSB0aGF0IG1hdGNoIGEgc2VhcmNoIHN0cmluZywgYW5kIGNvbnZlcnRpbmcgdGhlIG1hdGNoaW5nXG4gKiBvYmplY3RzIGludG8gdGhlIGZvcm1hdCBuZWVkZWQgZm9yIGF1dG9jb21wbGV0ZSByZXN1bHRzLlxuICpcbiAqIEEgY2FzZS1zZW5zaXRpdmUgc2VhcmNoIGlzIHBlcmZvcm1lZCBvdmVyIGVhY2ggb2JqZWN0J3MgYGRpc3BsYXlLZXlgIHByb3BlcnR5LlxuICpcbiAqIEEgY29tbW9uIHBhdHRlcm4gZm9yIGltcGxlbWVudGluZyBhdXRvY29tcGxldGUgZm9yIGEgZm9ybXVsYSBwYXR0ZXJuIGlzIHRvXG4gKiBtYWtlIGEgcmVxdWVzdCB0byBhbiBBUEkgZW5kcG9pbnQgdGhhdCByZXR1cm5zIGEgbGlzdCBvZiBhbGwgZW50aXRpZXMsXG4gKiBhbmQgdGhlbiB0byB0YWtlIHRoZSB1c2VyJ3MgcGFydGlhbCBpbnB1dCBhbmQgc2VhcmNoIG92ZXIgdGhvc2UgZW50aXRpZXNcbiAqIGZvciBtYXRjaGVzLiBUaGUgaGVscGVyIGdlbmVyYWxpemVzIHRoaXMgdXNlIGNhc2UuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogY29kYS5tYWtlUGFyYW1ldGVyKHtcbiAqICAgdHlwZTogUGFyYW1ldGVyVHlwZS5OdW1iZXIsXG4gKiAgIG5hbWU6IFwidXNlcklkXCIsXG4gKiAgIGRlc2NyaXB0aW9uOiBcIlRoZSBJRCBvZiBhIHVzZXIuXCIsXG4gKiAgIGF1dG9jb21wbGV0ZTogYXN5bmMgZnVuY3Rpb24oY29udGV4dCwgc2VhcmNoKSB7XG4gKiAgICAgLy8gU3VwcG9zZSB0aGlzIGVuZHBvaW50IHJldHVybnMgYSBsaXN0IG9mIHVzZXJzIHRoYXQgaGF2ZSB0aGUgZm9ybVxuICogICAgIC8vIGB7bmFtZTogXCJKYW5lIERvZVwiLCB1c2VySWQ6IDEyMywgZW1haWw6IFwiamFuZUBkb2UuY29tXCJ9YFxuICogICAgIGNvbnN0IHVzZXJzUmVzcG9uc2UgPSBhd2FpdCBjb250ZXh0LmZldGNoZXIuZmV0Y2goXCIvYXBpL3VzZXJzXCIpO1xuICogICAgIC8vIFRoaXMgd2lsbCBzZWFyY2ggb3ZlciB0aGUgbmFtZSBwcm9wZXJ0eSBvZiBlYWNoIG9iamVjdCBhbmQgZmlsdGVyIHRvIG9ubHlcbiAqICAgICAvLyB0aG9zZSB0aGF0IG1hdGNoLiBUaGVuIGl0IHdpbGwgdHJhbnNmb3JtIHRoZSBtYXRjaGluZyBvYmplY3RzIGludG8gdGhlIGZvcm1cbiAqICAgICAvLyBge2Rpc3BsYXk6IFwiSmFuZSBEb2VcIiwgdmFsdWU6IDEyM31gIHdoaWNoIGlzIHdoYXQgaXMgcmVxdWlyZWQgdG8gcmVuZGVyXG4gKiAgICAgLy8gYXV0b2NvbXBsZXRlIHJlc3BvbnNlcy5cbiAqICAgICByZXR1cm4gY29kYS5hdXRvY29tcGxldGVTZWFyY2hPYmplY3RzKHNlYXJjaCwgdXNlcnNSZXNwb25zZS5ib2R5LCBcIm5hbWVcIiwgXCJ1c2VySWRcIik7XG4gKiAgIH1cbiAqIH0pO1xuICogYGBgXG4gKi9cbmZ1bmN0aW9uIGF1dG9jb21wbGV0ZVNlYXJjaE9iamVjdHMoc2VhcmNoLCBvYmpzLCBkaXNwbGF5S2V5LCB2YWx1ZUtleSkge1xuICAgIGlmICh0eXBlb2Ygc2VhcmNoICE9PSAnc3RyaW5nJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKGBFeGVwY3RpbmcgYSBzdHJpbmcgZm9yIFwic2VhcmNoXCIgcGFyYW1ldGVyIGJ1dCByZWNlaXZlZCAke3NlYXJjaH1gKTtcbiAgICB9XG4gICAgY29uc3Qgbm9ybWFsaXplZFNlYXJjaCA9IHNlYXJjaC50b0xvd2VyQ2FzZSgpO1xuICAgIGNvbnN0IGZpbHRlcmVkID0gb2Jqcy5maWx0ZXIobyA9PiBvW2Rpc3BsYXlLZXldLnRvTG93ZXJDYXNlKCkuaW5jbHVkZXMobm9ybWFsaXplZFNlYXJjaCkpO1xuICAgIGNvbnN0IG1ldGFkYXRhUmVzdWx0cyA9IGZpbHRlcmVkLm1hcChvID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiBvW3ZhbHVlS2V5XSxcbiAgICAgICAgICAgIGRpc3BsYXk6IG9bZGlzcGxheUtleV0sXG4gICAgICAgIH07XG4gICAgfSk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShtZXRhZGF0YVJlc3VsdHMpO1xufVxuZXhwb3J0cy5hdXRvY29tcGxldGVTZWFyY2hPYmplY3RzID0gYXV0b2NvbXBsZXRlU2VhcmNoT2JqZWN0cztcbi8qKlxuICogQGRlcHJlY2F0ZWQgSWYgeW91IGhhdmUgYSBoYXJkY29kZWQgYXJyYXkgb2YgYXV0b2NvbXBsZXRlIG9wdGlvbnMsIHNpbXBseSBpbmNsdWRlIHRoYXQgYXJyYXlcbiAqIGFzIHRoZSB2YWx1ZSBvZiB0aGUgYGF1dG9jb21wbGV0ZWAgcHJvcGVydHkgaW4geW91ciBwYXJhbWV0ZXIgZGVmaW5pdGlvbi4gVGhlcmUgaXMgbm8gbG9uZ2VyXG4gKiBhbnkgbmVlZGVkIHRvIHdyYXAgYSB2YWx1ZSB3aXRoIHRoaXMgZm9ybXVsYS5cbiAqL1xuZnVuY3Rpb24gbWFrZVNpbXBsZUF1dG9jb21wbGV0ZU1ldGFkYXRhRm9ybXVsYShvcHRpb25zKSB7XG4gICAgcmV0dXJuIG1ha2VNZXRhZGF0YUZvcm11bGEoKGNvbnRleHQsIFtzZWFyY2hdKSA9PiBzaW1wbGVBdXRvY29tcGxldGUoc2VhcmNoLCBvcHRpb25zKSwge1xuICAgICAgICAvLyBBIGNvbm5lY3Rpb24gd29uJ3QgYmUgdXNlZCBoZXJlLCBidXQgaWYgdGhlIHBhcmVudCBmb3JtdWxhIHVzZXMgYSBjb25uZWN0aW9uXG4gICAgICAgIC8vIHRoZSBleGVjdXRpb24gY29kZSBpcyBnb2luZyB0byB0cnkgdG8gcGFzcyBpdCBoZXJlLiBXZSBzaG91bGQgZml4IHRoYXQuXG4gICAgICAgIGNvbm5lY3Rpb25SZXF1aXJlbWVudDogYXBpX3R5cGVzXzEuQ29ubmVjdGlvblJlcXVpcmVtZW50Lk9wdGlvbmFsLFxuICAgIH0pO1xufVxuZXhwb3J0cy5tYWtlU2ltcGxlQXV0b2NvbXBsZXRlTWV0YWRhdGFGb3JtdWxhID0gbWFrZVNpbXBsZUF1dG9jb21wbGV0ZU1ldGFkYXRhRm9ybXVsYTtcbmZ1bmN0aW9uIGlzUmVzcG9uc2VIYW5kbGVyVGVtcGxhdGUob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBvYmouc2NoZW1hO1xufVxuZnVuY3Rpb24gaXNSZXNwb25zZUV4YW1wbGVUZW1wbGF0ZShvYmopIHtcbiAgICByZXR1cm4gb2JqICYmIG9iai5leGFtcGxlO1xufVxuLyoqIEBkZXByZWNhdGVkICovXG5mdW5jdGlvbiBtYWtlT2JqZWN0Rm9ybXVsYSh7IHJlc3BvbnNlLCAuLi5kZWZpbml0aW9uIH0pIHtcbiAgICBsZXQgc2NoZW1hO1xuICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICBpZiAoaXNSZXNwb25zZUhhbmRsZXJUZW1wbGF0ZShyZXNwb25zZSkgJiYgcmVzcG9uc2Uuc2NoZW1hKSB7XG4gICAgICAgICAgICByZXNwb25zZS5zY2hlbWEgPSAoMCwgc2NoZW1hXzMubm9ybWFsaXplU2NoZW1hKShyZXNwb25zZS5zY2hlbWEpO1xuICAgICAgICAgICAgc2NoZW1hID0gcmVzcG9uc2Uuc2NoZW1hO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzUmVzcG9uc2VFeGFtcGxlVGVtcGxhdGUocmVzcG9uc2UpKSB7XG4gICAgICAgICAgICAvLyBUT0RPKGFsZXhkKTogRmlndXJlIG91dCB3aGF0IHRvIGRvIHdpdGggZXhhbXBsZXMuXG4gICAgICAgICAgICAvLyBzY2hlbWEgPSBnZW5lcmF0ZVNjaGVtYShyZXNwb25zZS5leGFtcGxlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgZXhlY3V0ZSA9IGRlZmluaXRpb24uZXhlY3V0ZTtcbiAgICBpZiAoaXNSZXNwb25zZUhhbmRsZXJUZW1wbGF0ZShyZXNwb25zZSkpIHtcbiAgICAgICAgY29uc3QgeyBvbkVycm9yIH0gPSByZXNwb25zZTtcbiAgICAgICAgY29uc3Qgd3JhcHBlZEV4ZWN1dGUgPSBleGVjdXRlO1xuICAgICAgICBjb25zdCByZXNwb25zZUhhbmRsZXIgPSAoMCwgaGFuZGxlcl90ZW1wbGF0ZXNfMS5nZW5lcmF0ZU9iamVjdFJlc3BvbnNlSGFuZGxlcikocmVzcG9uc2UpO1xuICAgICAgICBleGVjdXRlID0gYXN5bmMgZnVuY3Rpb24gZXhlYyhwYXJhbXMsIGNvbnRleHQpIHtcbiAgICAgICAgICAgIGxldCByZXN1bHQ7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGF3YWl0IHdyYXBwZWRFeGVjdXRlKHBhcmFtcywgY29udGV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICAgICAgaWYgKG9uRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gb25FcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXNwb25zZUhhbmRsZXIoeyBib2R5OiByZXN1bHQgfHwge30sIHN0YXR1czogMjAwLCBoZWFkZXJzOiB7fSB9KTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIGRlZmluaXRpb24sIHtcbiAgICAgICAgcmVzdWx0VHlwZTogYXBpX3R5cGVzXzMuVHlwZS5vYmplY3QsXG4gICAgICAgIGV4ZWN1dGUsXG4gICAgICAgIHNjaGVtYSxcbiAgICB9KTtcbn1cbmV4cG9ydHMubWFrZU9iamVjdEZvcm11bGEgPSBtYWtlT2JqZWN0Rm9ybXVsYTtcbi8qKlxuICogV3JhcHBlciB0byBwcm9kdWNlIGEgc3luYyB0YWJsZSBkZWZpbml0aW9uLiBBbGwgKG5vbi1keW5hbWljKSBzeW5jIHRhYmxlcyBzaG91bGQgYmUgY3JlYXRlZFxuICogdXNpbmcgdGhpcyB3cmFwcGVyIHJhdGhlciB0aGFuIGRlY2xhcmluZyBhIHN5bmMgdGFibGUgZGVmaW5pdGlvbiBvYmplY3QgZGlyZWN0bHkuXG4gKlxuICogVGhpcyB3cmFwcGVyIGRvZXMgYSB2YXJpZXR5IG9mIGhlbHBmdWwgdGhpbmdzLCBpbmNsdWRpbmdcbiAqICogRG9pbmcgYmFzaWMgdmFsaWRhdGlvbiBvZiB0aGUgcHJvdmlkZWQgZGVmaW5pdGlvbi5cbiAqICogTm9ybWFsaXppbmcgdGhlIHNjaGVtYSBkZWZpbml0aW9uIHRvIGNvbmZvcm0gdG8gQ29kYS1yZWNvbW1lbmRlZCBzeW50YXguXG4gKiAqIFdyYXBwaW5nIHRoZSBleGVjdXRlIGZvcm11bGEgdG8gbm9ybWFsaXplIHJldHVybiB2YWx1ZXMgdG8gbWF0Y2ggdGhlIG5vcm1hbGl6ZWQgc2NoZW1hLlxuICpcbiAqIFNlZSBbTm9ybWFsaXphdGlvbl0oL2luZGV4Lmh0bWwjbm9ybWFsaXphdGlvbikgZm9yIG1vcmUgaW5mb3JtYXRpb24gYWJvdXQgc2NoZW1hIG5vcm1hbGl6YXRpb24uXG4gKi9cbmZ1bmN0aW9uIG1ha2VTeW5jVGFibGUoeyBuYW1lLCBkZXNjcmlwdGlvbiwgaWRlbnRpdHlOYW1lLCBzY2hlbWE6IGlucHV0U2NoZW1hLCBmb3JtdWxhLCBjb25uZWN0aW9uUmVxdWlyZW1lbnQsIGR5bmFtaWNPcHRpb25zID0ge30sIH0pIHtcbiAgICBjb25zdCB7IGdldFNjaGVtYTogZ2V0U2NoZW1hRGVmLCBlbnRpdHlOYW1lLCBkZWZhdWx0QWRkRHluYW1pY0NvbHVtbnMgfSA9IGR5bmFtaWNPcHRpb25zO1xuICAgIGNvbnN0IHsgZXhlY3V0ZTogd3JhcHBlZEV4ZWN1dGUsIC4uLmRlZmluaXRpb24gfSA9IG1heWJlUmV3cml0ZUNvbm5lY3Rpb25Gb3JGb3JtdWxhKGZvcm11bGEsIGNvbm5lY3Rpb25SZXF1aXJlbWVudCk7XG4gICAgLy8gU2luY2Ugd2UgbXV0YXRlIHNjaGVtYURlZiwgd2UgbmVlZCB0byBtYWtlIGEgY29weSBzbyB0aGUgaW5wdXQgc2NoZW1hIGNhbiBiZSByZXVzZWQgYWNyb3NzIHN5bmMgdGFibGVzLlxuICAgIGNvbnN0IHNjaGVtYURlZiA9ICgwLCBvYmplY3RfdXRpbHNfMS5kZWVwQ29weSkoaW5wdXRTY2hlbWEpO1xuICAgIC8vIEh5ZHJhdGUgdGhlIHNjaGVtYSdzIGlkZW50aXR5LlxuICAgIGlmICghaWRlbnRpdHlOYW1lKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgU3luYyB0YWJsZSBzY2hlbWFzIG11c3Qgc2V0IGFuIGlkZW50aXR5TmFtZWApO1xuICAgIH1cbiAgICBpZiAoc2NoZW1hRGVmLmlkZW50aXR5KSB7XG4gICAgICAgIGlmIChzY2hlbWFEZWYuaWRlbnRpdHkubmFtZSAmJiBzY2hlbWFEZWYuaWRlbnRpdHkubmFtZSAhPT0gaWRlbnRpdHlOYW1lKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYElkZW50aXR5IG5hbWUgbWlzbWF0Y2ggZm9yIHN5bmMgdGFibGUgJHtuYW1lfS4gRWl0aGVyIHJlbW92ZSB0aGUgc2NoZW1hJ3MgaWRlbnRpdHkubmFtZSAoJHtzY2hlbWFEZWYuaWRlbnRpdHkubmFtZX0pIG9yIGVuc3VyZSBpdCBtYXRjaGVzIHRoZSB0YWJsZSdzIGlkZW50aXR5TmFtZSAoJHtpZGVudGl0eU5hbWV9KS5gKTtcbiAgICAgICAgfVxuICAgICAgICBzY2hlbWFEZWYuaWRlbnRpdHkgPSB7IC4uLnNjaGVtYURlZi5pZGVudGl0eSwgbmFtZTogaWRlbnRpdHlOYW1lIH07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBzY2hlbWFEZWYuaWRlbnRpdHkgPSB7IG5hbWU6IGlkZW50aXR5TmFtZSB9O1xuICAgIH1cbiAgICBjb25zdCBnZXRTY2hlbWEgPSB3cmFwR2V0U2NoZW1hKHdyYXBNZXRhZGF0YUZ1bmN0aW9uKGdldFNjaGVtYURlZikpO1xuICAgIGNvbnN0IHNjaGVtYSA9ICgwLCBzY2hlbWFfMi5tYWtlT2JqZWN0U2NoZW1hKShzY2hlbWFEZWYpO1xuICAgIGNvbnN0IGZvcm11bGFTY2hlbWEgPSBnZXRTY2hlbWFcbiAgICAgICAgPyB1bmRlZmluZWRcbiAgICAgICAgOiAoMCwgc2NoZW1hXzMubm9ybWFsaXplU2NoZW1hKSh7IHR5cGU6IHNjaGVtYV8xLlZhbHVlVHlwZS5BcnJheSwgaXRlbXM6IHNjaGVtYSB9KTtcbiAgICBjb25zdCB7IGlkZW50aXR5LCBpZCwgcHJpbWFyeSB9ID0gKDAsIG1pZ3JhdGlvbl8xLm9iamVjdFNjaGVtYUhlbHBlcikoc2NoZW1hKTtcbiAgICBpZiAoIShwcmltYXJ5ICYmIGlkKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFN5bmMgdGFibGUgc2NoZW1hcyBzaG91bGQgaGF2ZSBkZWZpbmVkIHByb3BlcnRpZXMgZm9yIGlkUHJvcGVydHkgYW5kIGRpc3BsYXlQcm9wZXJ0eWApO1xuICAgIH1cbiAgICBpZiAoIWlkZW50aXR5KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgVW5rbm93biBlcnJvciBjcmVhdGluZyBzeW5jIHRhYmxlIGlkZW50aXR5YCk7XG4gICAgfVxuICAgIGlmIChuYW1lLmluY2x1ZGVzKCcgJykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTeW5jIHRhYmxlIG5hbWUgc2hvdWxkIG5vdCBpbmNsdWRlIHNwYWNlcycpO1xuICAgIH1cbiAgICBjb25zdCByZXNwb25zZUhhbmRsZXIgPSAoMCwgaGFuZGxlcl90ZW1wbGF0ZXNfMS5nZW5lcmF0ZU9iamVjdFJlc3BvbnNlSGFuZGxlcikoeyBzY2hlbWE6IGZvcm11bGFTY2hlbWEgfSk7XG4gICAgY29uc3QgZXhlY3V0ZSA9IGFzeW5jIGZ1bmN0aW9uIGV4ZWMocGFyYW1zLCBjb250ZXh0KSB7XG4gICAgICAgIGNvbnN0IHsgcmVzdWx0LCBjb250aW51YXRpb24gfSA9IChhd2FpdCB3cmFwcGVkRXhlY3V0ZShwYXJhbXMsIGNvbnRleHQpKSB8fCB7fTtcbiAgICAgICAgY29uc3QgYXBwbGllZFNjaGVtYSA9IGNvbnRleHQuc3luYy5zY2hlbWE7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXN1bHQ6IHJlc3BvbnNlSGFuZGxlcih7IGJvZHk6IHJlc3VsdCB8fCBbXSwgc3RhdHVzOiAyMDAsIGhlYWRlcnM6IHt9IH0sIGFwcGxpZWRTY2hlbWEpLFxuICAgICAgICAgICAgY29udGludWF0aW9uLFxuICAgICAgICB9O1xuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgIHNjaGVtYTogKDAsIHNjaGVtYV8zLm5vcm1hbGl6ZVNjaGVtYSkoc2NoZW1hKSxcbiAgICAgICAgaWRlbnRpdHlOYW1lLFxuICAgICAgICBnZXR0ZXI6IHtcbiAgICAgICAgICAgIC4uLmRlZmluaXRpb24sXG4gICAgICAgICAgICBjYWNoZVR0bFNlY3M6IDAsXG4gICAgICAgICAgICBleGVjdXRlLFxuICAgICAgICAgICAgc2NoZW1hOiBmb3JtdWxhU2NoZW1hLFxuICAgICAgICAgICAgaXNTeW5jRm9ybXVsYTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbm5lY3Rpb25SZXF1aXJlbWVudDogZGVmaW5pdGlvbi5jb25uZWN0aW9uUmVxdWlyZW1lbnQgfHwgY29ubmVjdGlvblJlcXVpcmVtZW50LFxuICAgICAgICAgICAgcmVzdWx0VHlwZTogYXBpX3R5cGVzXzMuVHlwZS5vYmplY3QsXG4gICAgICAgIH0sXG4gICAgICAgIGdldFNjaGVtYTogbWF5YmVSZXdyaXRlQ29ubmVjdGlvbkZvckZvcm11bGEoZ2V0U2NoZW1hLCBjb25uZWN0aW9uUmVxdWlyZW1lbnQpLFxuICAgICAgICBlbnRpdHlOYW1lLFxuICAgICAgICBkZWZhdWx0QWRkRHluYW1pY0NvbHVtbnMsXG4gICAgfTtcbn1cbmV4cG9ydHMubWFrZVN5bmNUYWJsZSA9IG1ha2VTeW5jVGFibGU7XG4vKiogQGRlcHJlY2F0ZWQgKi9cbmZ1bmN0aW9uIG1ha2VTeW5jVGFibGVMZWdhY3kobmFtZSwgc2NoZW1hLCBmb3JtdWxhLCBjb25uZWN0aW9uUmVxdWlyZW1lbnQsIGR5bmFtaWNPcHRpb25zID0ge30pIHtcbiAgICB2YXIgX2E7XG4gICAgaWYgKCEoKF9hID0gc2NoZW1hLmlkZW50aXR5KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubmFtZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdMZWdhY3kgc3luYyB0YWJsZXMgbXVzdCBzcGVjaWZ5IGlkZW50aXR5Lm5hbWUnKTtcbiAgICB9XG4gICAgaWYgKHNjaGVtYS5fX3BhY2tJZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RvIG5vdCB1c2UgdGhlIF9fcGFja0lkIGZpZWxkLCBpdCBpcyBvbmx5IGZvciBpbnRlcm5hbCBDb2RhIHVzZS4nKTtcbiAgICB9XG4gICAgcmV0dXJuIG1ha2VTeW5jVGFibGUoe1xuICAgICAgICBuYW1lLFxuICAgICAgICBpZGVudGl0eU5hbWU6IHNjaGVtYS5pZGVudGl0eS5uYW1lLFxuICAgICAgICBzY2hlbWEsXG4gICAgICAgIGZvcm11bGEsXG4gICAgICAgIGNvbm5lY3Rpb25SZXF1aXJlbWVudCxcbiAgICAgICAgZHluYW1pY09wdGlvbnMsXG4gICAgfSk7XG59XG5leHBvcnRzLm1ha2VTeW5jVGFibGVMZWdhY3kgPSBtYWtlU3luY1RhYmxlTGVnYWN5O1xuLyoqXG4gKiBDcmVhdGVzIGEgZHluYW1pYyBzeW5jIHRhYmxlIGRlZmluaXRpb24uXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogY29kYS5tYWtlRHluYW1pY1N5bmNUYWJsZSh7XG4gKiAgIG5hbWU6IFwiTXlTeW5jVGFibGVcIixcbiAqICAgZ2V0TmFtZTogYXN5bmMgZnVuY3Rpb24oY29udGV4dCkgPT4ge1xuICogICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgY29udGV4dC5mZXRjaGVyLmZldGNoKHttZXRob2Q6IFwiR0VUXCIsIHVybDogY29udGV4dC5zeW5jLmR5bmFtaWNVcmx9KTtcbiAqICAgICByZXR1cm4gcmVzcG9uc2UuYm9keS5uYW1lO1xuICogICB9LFxuICogICBnZXROYW1lOiBhc3luYyBmdW5jdGlvbihjb250ZXh0KSA9PiB7XG4gKiAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjb250ZXh0LmZldGNoZXIuZmV0Y2goe21ldGhvZDogXCJHRVRcIiwgdXJsOiBjb250ZXh0LnN5bmMuZHluYW1pY1VybH0pO1xuICogICAgIHJldHVybiByZXNwb25zZS5ib2R5LmJyb3dzZXJMaW5rO1xuICogICB9LFxuICogICAuLi5cbiAqIH0pO1xuICogYGBgXG4gKi9cbmZ1bmN0aW9uIG1ha2VEeW5hbWljU3luY1RhYmxlKHsgbmFtZSwgZGVzY3JpcHRpb24sIGdldE5hbWU6IGdldE5hbWVEZWYsIGdldFNjaGVtYTogZ2V0U2NoZW1hRGVmLCBpZGVudGl0eU5hbWUsIGdldERpc3BsYXlVcmw6IGdldERpc3BsYXlVcmxEZWYsIGZvcm11bGEsIGxpc3REeW5hbWljVXJsczogbGlzdER5bmFtaWNVcmxzRGVmLCBlbnRpdHlOYW1lLCBjb25uZWN0aW9uUmVxdWlyZW1lbnQsIGRlZmF1bHRBZGREeW5hbWljQ29sdW1ucywgcGxhY2Vob2xkZXJTY2hlbWE6IHBsYWNlaG9sZGVyU2NoZW1hSW5wdXQsIH0pIHtcbiAgICBjb25zdCBwbGFjZWhvbGRlclNjaGVtYSA9IHBsYWNlaG9sZGVyU2NoZW1hSW5wdXQgfHxcbiAgICAgICAgLy8gZGVmYXVsdCBwbGFjZWhvbGRlciBvbmx5IHNob3dzIGEgY29sdW1uIG9mIGlkLCB3aGljaCB3aWxsIGJlIHJlcGxhY2VkIGxhdGVyIGJ5IHRoZSBkeW5hbWljIHNjaGVtYS5cbiAgICAgICAgKDAsIHNjaGVtYV8yLm1ha2VPYmplY3RTY2hlbWEpKHtcbiAgICAgICAgICAgIHR5cGU6IHNjaGVtYV8xLlZhbHVlVHlwZS5PYmplY3QsXG4gICAgICAgICAgICBpZFByb3BlcnR5OiAnaWQnLFxuICAgICAgICAgICAgZGlzcGxheVByb3BlcnR5OiAnaWQnLFxuICAgICAgICAgICAgaWRlbnRpdHk6IHsgbmFtZTogaWRlbnRpdHlOYW1lIH0sXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgaWQ6IHsgdHlwZTogc2NoZW1hXzEuVmFsdWVUeXBlLlN0cmluZyB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgY29uc3QgZ2V0TmFtZSA9IHdyYXBNZXRhZGF0YUZ1bmN0aW9uKGdldE5hbWVEZWYpO1xuICAgIGNvbnN0IGdldFNjaGVtYSA9IHdyYXBNZXRhZGF0YUZ1bmN0aW9uKGdldFNjaGVtYURlZik7XG4gICAgY29uc3QgZ2V0RGlzcGxheVVybCA9IHdyYXBNZXRhZGF0YUZ1bmN0aW9uKGdldERpc3BsYXlVcmxEZWYpO1xuICAgIGNvbnN0IGxpc3REeW5hbWljVXJscyA9IHdyYXBNZXRhZGF0YUZ1bmN0aW9uKGxpc3REeW5hbWljVXJsc0RlZik7XG4gICAgY29uc3QgdGFibGUgPSBtYWtlU3luY1RhYmxlKHtcbiAgICAgICAgbmFtZSxcbiAgICAgICAgZGVzY3JpcHRpb24sXG4gICAgICAgIGlkZW50aXR5TmFtZSxcbiAgICAgICAgc2NoZW1hOiBwbGFjZWhvbGRlclNjaGVtYSxcbiAgICAgICAgZm9ybXVsYSxcbiAgICAgICAgY29ubmVjdGlvblJlcXVpcmVtZW50LFxuICAgICAgICBkeW5hbWljT3B0aW9uczogeyBnZXRTY2hlbWEsIGVudGl0eU5hbWUsIGRlZmF1bHRBZGREeW5hbWljQ29sdW1ucyB9LFxuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICAgIC4uLnRhYmxlLFxuICAgICAgICBpc0R5bmFtaWM6IHRydWUsXG4gICAgICAgIGdldERpc3BsYXlVcmw6IG1heWJlUmV3cml0ZUNvbm5lY3Rpb25Gb3JGb3JtdWxhKGdldERpc3BsYXlVcmwsIGNvbm5lY3Rpb25SZXF1aXJlbWVudCksXG4gICAgICAgIGxpc3REeW5hbWljVXJsczogbWF5YmVSZXdyaXRlQ29ubmVjdGlvbkZvckZvcm11bGEobGlzdER5bmFtaWNVcmxzLCBjb25uZWN0aW9uUmVxdWlyZW1lbnQpLFxuICAgICAgICBnZXROYW1lOiBtYXliZVJld3JpdGVDb25uZWN0aW9uRm9yRm9ybXVsYShnZXROYW1lLCBjb25uZWN0aW9uUmVxdWlyZW1lbnQpLFxuICAgIH07XG59XG5leHBvcnRzLm1ha2VEeW5hbWljU3luY1RhYmxlID0gbWFrZUR5bmFtaWNTeW5jVGFibGU7XG4vKipcbiAqIEhlbHBlciB0byBnZW5lcmF0ZSBhIGZvcm11bGEgdGhhdCBmZXRjaGVzIGEgbGlzdCBvZiBlbnRpdGllcyBmcm9tIGEgZ2l2ZW4gVVJMIGFuZCByZXR1cm5zIHRoZW0uXG4gKlxuICogT25lIG9mIHRoZSBzaW1wbGVzdCBidXQgbW9zdCBjb21tb24gdXNlIGNhc2VzIGZvciBhIHBhY2sgZm9ybXVsYSBpcyB0byBtYWtlIGEgcmVxdWVzdCB0byBhbiBBUElcbiAqIGVuZHBvaW50IHRoYXQgcmV0dXJucyBhIGxpc3Qgb2Ygb2JqZWN0cywgYW5kIHRoZW4gcmV0dXJuIHRob3NlIG9iamVjdHMgZWl0aGVyIGFzLWlzXG4gKiBvciB3aXRoIHNsaWdodCB0cmFuc2Zvcm1hdGlvbnMuIFRoZSBjYW4gYmUgYWNjb21wbGlzaGVkIHdpdGggYW4gYGV4ZWN1dGVgIGZ1bmN0aW9uIHRoYXQgZG9lc1xuICogZXhhY3RseSB0aGF0LCBidXQgYWx0ZXJuYXRpdmVseSB5b3UgY291bGQgdXNlIGBtYWtlVHJhbnNsYXRlT2JqZWN0Rm9ybXVsYWAgYW5kIGFuXG4gKiBgZXhlY3V0ZWAgaW1wbGVtZW50YXRpb24gd2lsbCBiZSBnZW5lcmF0ZWQgZm9yIHlvdS5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgXG4gKiBtYWtlVHJhbnNsYXRlT2JqZWN0Rm9ybXVsYSh7XG4gKiAgIG5hbWU6IFwiVXNlcnNcIixcbiAqICAgZGVzY3JpcHRpb246IFwiUmV0dXJucyBhIGxpc3Qgb2YgdXNlcnMuXCJcbiAqICAgLy8gVGhpcyB3aWxsIGdlbmVyYXRlIGFuIGBleGVjdXRlYCBmdW5jdGlvbiB0aGF0IG1ha2VzIGEgR0VUIHJlcXVlc3QgdG8gdGhlIGdpdmVuIFVSTC5cbiAqICAgcmVxdWVzdDoge1xuICogICAgIG1ldGhvZDogJ0dFVCcsXG4gKiAgICAgdXJsOiAnaHR0cHM6Ly9hcGkuZXhhbXBsZS5jb20vdXNlcnMnLFxuICogICB9LFxuICogICByZXNwb25zZToge1xuICogICAgIC8vIFN1cHBvc2UgdGhlIHJlc3BvbnNlIGJvZHkgaGFzIHRoZSBmb3JtIGB7dXNlcnM6IFt7IC4uLnVzZXIxIH0sIHsgLi4udXNlcjIgfV19YC5cbiAqICAgICAvLyBUaGlzIFwicHJvamVjdGlvblwiIGtleSB0ZWxscyB0aGUgYGV4ZWN1dGVgIGZ1bmN0aW9uIHRoYXQgdGhlIGxpc3Qgb2YgcmVzdWx0cyB0byByZXR1cm5cbiAqICAgICAvLyBjYW4gYmUgZm91bmQgaW4gdGhlIG9iamVjdCBwcm9wZXJ0eSBgdXNlcnNgLiBJZiBvbWl0dGVkLCB0aGUgcmVzcG9uc2UgYm9keSBpdHNlbGZcbiAqICAgICAvLyBzaG91bGQgYmUgdGhlIGxpc3Qgb2YgcmVzdWx0cy5cbiAqICAgICBwcm9qZWN0S2V5OiAndXNlcnMnLFxuICogICAgIHNjaGVtYTogVXNlclNjaGVtYSxcbiAqICAgfSxcbiAqIH0pO1xuICovXG5mdW5jdGlvbiBtYWtlVHJhbnNsYXRlT2JqZWN0Rm9ybXVsYSh7IHJlc3BvbnNlLCAuLi5kZWZpbml0aW9uIH0pIHtcbiAgICBjb25zdCB7IHJlcXVlc3QsIC4uLnJlc3QgfSA9IGRlZmluaXRpb247XG4gICAgY29uc3QgeyBwYXJhbWV0ZXJzIH0gPSByZXN0O1xuICAgIHJlc3BvbnNlLnNjaGVtYSA9IHJlc3BvbnNlLnNjaGVtYSA/ICgwLCBzY2hlbWFfMy5ub3JtYWxpemVTY2hlbWEpKHJlc3BvbnNlLnNjaGVtYSkgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgeyBvbkVycm9yIH0gPSByZXNwb25zZTtcbiAgICBjb25zdCByZXF1ZXN0SGFuZGxlciA9ICgwLCBoYW5kbGVyX3RlbXBsYXRlc18yLmdlbmVyYXRlUmVxdWVzdEhhbmRsZXIpKHJlcXVlc3QsIHBhcmFtZXRlcnMpO1xuICAgIGNvbnN0IHJlc3BvbnNlSGFuZGxlciA9ICgwLCBoYW5kbGVyX3RlbXBsYXRlc18xLmdlbmVyYXRlT2JqZWN0UmVzcG9uc2VIYW5kbGVyKShyZXNwb25zZSk7XG4gICAgZnVuY3Rpb24gZXhlY3V0ZShwYXJhbXMsIGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIGNvbnRleHQuZmV0Y2hlclxuICAgICAgICAgICAgLmZldGNoKHJlcXVlc3RIYW5kbGVyKHBhcmFtcykpXG4gICAgICAgICAgICAuY2F0Y2goZXJyID0+IHtcbiAgICAgICAgICAgIGlmIChvbkVycm9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG9uRXJyb3IoZXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlSGFuZGxlcik7XG4gICAgfVxuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCByZXN0LCB7XG4gICAgICAgIGV4ZWN1dGUsXG4gICAgICAgIHJlc3VsdFR5cGU6IGFwaV90eXBlc18zLlR5cGUub2JqZWN0LFxuICAgICAgICBzY2hlbWE6IHJlc3BvbnNlLnNjaGVtYSxcbiAgICB9KTtcbn1cbmV4cG9ydHMubWFrZVRyYW5zbGF0ZU9iamVjdEZvcm11bGEgPSBtYWtlVHJhbnNsYXRlT2JqZWN0Rm9ybXVsYTtcbi8vIFRPRE8oam9uYXRoYW4vZWtvbGVkYSk6IEZsZXNoIG91dCBhIGd1aWRlIGZvciBlbXB0eSBmb3JtdWxhcyBpZiB0aGlzIGlzIHNvbWV0aGluZyB3ZSBjYXJlIHRvIHN1cHBvcnQuXG4vLyBXZSBwcm9iYWJseSBhbHNvIG5lZWQgdGhlIGJ1aWxkZXIncyBhZGRGb3JtdWxhKCkgbWV0aG9kIHRvIHN1cHBvcnQgZW1wdHkgZm9ybXVsYSBkZWZzIGlmIGl0IGRvZXNuJ3QgYWxyZWFkeS5cbi8qKlxuICogQ3JlYXRlcyB0aGUgZGVmaW5pdGlvbiBvZiBhbiBcImVtcHR5XCIgZm9ybXVsYSwgdGhhdCBpcywgYSBmb3JtdWxhIHRoYXQgdXNlcyBhIHtAbGluayBSZXF1ZXN0SGFuZGxlclRlbXBsYXRlfVxuICogdG8gZGVmaW5lIGFuIGltcGxlbWVudGF0aW9uIGZvciB0aGUgZm9ybXVsYSByYXRoZXIgdGhhbiBpbXBsZW1lbnRpbmcgYW4gYWN0dWFsIGBleGVjdXRlYCBmdW5jdGlvblxuICogaW4gSmF2YVNjcmlwdC5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgXG4gKiBjb2RhLm1ha2VFbXB0eUZvcm11bGEoe1xuICAgIG5hbWU6IFwiR2V0V2lkZ2V0XCIsXG4gICAgZGVzY3JpcHRpb246IFwiR2V0cyBhIHdpZGdldC5cIixcbiAgICByZXF1ZXN0OiB7XG4gICAgICB1cmw6IFwiaHR0cHM6Ly9leGFtcGxlLmNvbS93aWRnZXRzL3tpZH1cIixcbiAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICB9LFxuICAgIHBhcmFtZXRlcnM6IFtcbiAgICAgIGNvZGEubWFrZVBhcmFtZXRlcih7dHlwZTogY29kYS5QYXJhbWV0ZXJUeXBlLk51bWJlciwgbmFtZTogXCJpZFwiLCBkZXNjcmlwdGlvbjogXCJUaGUgSUQgb2YgdGhlIHdpZGdldCB0byBnZXQuXCJ9KSxcbiAgICBdLFxuICB9KSxcbiAqIGBgYFxuICovXG5mdW5jdGlvbiBtYWtlRW1wdHlGb3JtdWxhKGRlZmluaXRpb24pIHtcbiAgICBjb25zdCB7IHJlcXVlc3QsIC4uLnJlc3QgfSA9IGRlZmluaXRpb247XG4gICAgY29uc3QgeyBwYXJhbWV0ZXJzIH0gPSByZXN0O1xuICAgIGNvbnN0IHJlcXVlc3RIYW5kbGVyID0gKDAsIGhhbmRsZXJfdGVtcGxhdGVzXzIuZ2VuZXJhdGVSZXF1ZXN0SGFuZGxlcikocmVxdWVzdCwgcGFyYW1ldGVycyk7XG4gICAgZnVuY3Rpb24gZXhlY3V0ZShwYXJhbXMsIGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIGNvbnRleHQuZmV0Y2hlci5mZXRjaChyZXF1ZXN0SGFuZGxlcihwYXJhbXMpKS50aGVuKCgpID0+ICcnKTtcbiAgICB9XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHJlc3QsIHtcbiAgICAgICAgZXhlY3V0ZSxcbiAgICAgICAgcmVzdWx0VHlwZTogYXBpX3R5cGVzXzMuVHlwZS5zdHJpbmcsXG4gICAgfSk7XG59XG5leHBvcnRzLm1ha2VFbXB0eUZvcm11bGEgPSBtYWtlRW1wdHlGb3JtdWxhO1xuZnVuY3Rpb24gbWF5YmVSZXdyaXRlQ29ubmVjdGlvbkZvckZvcm11bGEoZm9ybXVsYSwgY29ubmVjdGlvblJlcXVpcmVtZW50KSB7XG4gICAgdmFyIF9hO1xuICAgIGlmIChmb3JtdWxhICYmIGNvbm5lY3Rpb25SZXF1aXJlbWVudCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uZm9ybXVsYSxcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IGZvcm11bGEucGFyYW1ldGVycy5tYXAoKHBhcmFtKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgLi4ucGFyYW0sXG4gICAgICAgICAgICAgICAgICAgIGF1dG9jb21wbGV0ZTogcGFyYW0uYXV0b2NvbXBsZXRlXG4gICAgICAgICAgICAgICAgICAgICAgICA/IG1heWJlUmV3cml0ZUNvbm5lY3Rpb25Gb3JGb3JtdWxhKHBhcmFtLmF1dG9jb21wbGV0ZSwgY29ubmVjdGlvblJlcXVpcmVtZW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgdmFyYXJnUGFyYW1ldGVyczogKF9hID0gZm9ybXVsYS52YXJhcmdQYXJhbWV0ZXJzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EubWFwKChwYXJhbSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLnBhcmFtLFxuICAgICAgICAgICAgICAgICAgICBhdXRvY29tcGxldGU6IHBhcmFtLmF1dG9jb21wbGV0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgPyBtYXliZVJld3JpdGVDb25uZWN0aW9uRm9yRm9ybXVsYShwYXJhbS5hdXRvY29tcGxldGUsIGNvbm5lY3Rpb25SZXF1aXJlbWVudClcbiAgICAgICAgICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGNvbm5lY3Rpb25SZXF1aXJlbWVudCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIGZvcm11bGE7XG59XG5leHBvcnRzLm1heWJlUmV3cml0ZUNvbm5lY3Rpb25Gb3JGb3JtdWxhID0gbWF5YmVSZXdyaXRlQ29ubmVjdGlvbkZvckZvcm11bGE7XG4iLCAiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLlBhY2tEZWZpbml0aW9uQnVpbGRlciA9IGV4cG9ydHMubmV3UGFjayA9IHZvaWQgMDtcbmNvbnN0IHR5cGVzXzEgPSByZXF1aXJlKFwiLi90eXBlc1wiKTtcbmNvbnN0IGFwaV90eXBlc18xID0gcmVxdWlyZShcIi4vYXBpX3R5cGVzXCIpO1xuY29uc3QgYXBpXzEgPSByZXF1aXJlKFwiLi9hcGlcIik7XG5jb25zdCBhcGlfMiA9IHJlcXVpcmUoXCIuL2FwaVwiKTtcbmNvbnN0IGFwaV8zID0gcmVxdWlyZShcIi4vYXBpXCIpO1xuY29uc3QgYXBpXzQgPSByZXF1aXJlKFwiLi9hcGlcIik7XG5jb25zdCBhcGlfNSA9IHJlcXVpcmUoXCIuL2FwaVwiKTtcbmNvbnN0IG1pZ3JhdGlvbl8xID0gcmVxdWlyZShcIi4vaGVscGVycy9taWdyYXRpb25cIik7XG5jb25zdCBhcGlfNiA9IHJlcXVpcmUoXCIuL2FwaVwiKTtcbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBza2VsZXRvbiBwYWNrIGRlZmluaXRpb24gdGhhdCBjYW4gYmUgYWRkZWQgdG8uXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYFxuICogZXhwb3J0IGNvbnN0IHBhY2sgPSBuZXdQYWNrKCk7XG4gKiBwYWNrLmFkZEZvcm11bGEoe3Jlc3VsdFR5cGU6IFZhbHVlVHlwZS5TdHJpbmcsIG5hbWU6ICdNeUZvcm11bGEnLCAuLi59KTtcbiAqIHBhY2suYWRkU3luY1RhYmxlKCdNeVRhYmxlJywgLi4uKTtcbiAqIHBhY2suc2V0VXNlckF1dGhlbnRpY2F0aW9uKHt0eXBlOiBBdXRoZW50aWNhdGlvblR5cGUuSGVhZGVyQmVhcmVyVG9rZW59KTtcbiAqIGBgYFxuICovXG5mdW5jdGlvbiBuZXdQYWNrKGRlZmluaXRpb24pIHtcbiAgICByZXR1cm4gbmV3IFBhY2tEZWZpbml0aW9uQnVpbGRlcihkZWZpbml0aW9uKTtcbn1cbmV4cG9ydHMubmV3UGFjayA9IG5ld1BhY2s7XG4vKipcbiAqIEEgY2xhc3MgdGhhdCBhc3Npc3RzIGluIGNvbnN0cnVjdGluZyBhIHBhY2sgZGVmaW5pdGlvbi4gVXNlIHtAbGluayBuZXdQYWNrfSB0byBjcmVhdGUgb25lLlxuICovXG5jbGFzcyBQYWNrRGVmaW5pdGlvbkJ1aWxkZXIge1xuICAgIC8qKlxuICAgICAqIENvbnN0cnVjdHMgYSB7QGxpbmsgUGFja0RlZmluaXRpb25CdWlsZGVyfS4gSG93ZXZlciwgYGNvZGEubmV3UGFjaygpYCBzaG91bGQgYmUgdXNlZCBpbnN0ZWFkXG4gICAgICogcmF0aGVyIHRoYW4gY29uc3RydWN0aW5nIGEgYnVpbGRlciBkaXJlY3RseS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihkZWZpbml0aW9uKSB7XG4gICAgICAgIGNvbnN0IHsgZm9ybXVsYXMsIGZvcm1hdHMsIHN5bmNUYWJsZXMsIG5ldHdvcmtEb21haW5zLCBkZWZhdWx0QXV0aGVudGljYXRpb24sIHN5c3RlbUNvbm5lY3Rpb25BdXRoZW50aWNhdGlvbiwgdmVyc2lvbiwgZm9ybXVsYU5hbWVzcGFjZSwgfSA9IGRlZmluaXRpb24gfHwge307XG4gICAgICAgIHRoaXMuZm9ybXVsYXMgPSBmb3JtdWxhcyB8fCBbXTtcbiAgICAgICAgdGhpcy5mb3JtYXRzID0gZm9ybWF0cyB8fCBbXTtcbiAgICAgICAgdGhpcy5zeW5jVGFibGVzID0gc3luY1RhYmxlcyB8fCBbXTtcbiAgICAgICAgdGhpcy5uZXR3b3JrRG9tYWlucyA9IG5ldHdvcmtEb21haW5zIHx8IFtdO1xuICAgICAgICB0aGlzLmRlZmF1bHRBdXRoZW50aWNhdGlvbiA9IGRlZmF1bHRBdXRoZW50aWNhdGlvbjtcbiAgICAgICAgdGhpcy5zeXN0ZW1Db25uZWN0aW9uQXV0aGVudGljYXRpb24gPSBzeXN0ZW1Db25uZWN0aW9uQXV0aGVudGljYXRpb247XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IHZlcnNpb247XG4gICAgICAgIHRoaXMuZm9ybXVsYU5hbWVzcGFjZSA9IGZvcm11bGFOYW1lc3BhY2UgfHwgJ0RlcHJlY2F0ZWQnO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgZm9ybXVsYSBkZWZpbml0aW9uIHRvIHRoaXMgcGFjay5cbiAgICAgKlxuICAgICAqIEluIHRoZSB3ZWIgZWRpdG9yLCB0aGUgYC9Gb3JtdWxhYCBzaG9ydGN1dCB3aWxsIGluc2VydCBhIHNuaXBwZXQgb2YgYSBza2VsZXRvbiBmb3JtdWxhLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBgYGBcbiAgICAgKiBwYWNrLmFkZEZvcm11bGEoe1xuICAgICAqICAgcmVzdWx0VHlwZTogVmFsdWVUeXBlLlN0cmluZyxcbiAgICAgKiAgICBuYW1lOiAnTXlGb3JtdWxhJyxcbiAgICAgKiAgICBkZXNjcmlwdGlvbjogJ015IGRlc2NyaXB0aW9uLicsXG4gICAgICogICAgcGFyYW1ldGVyczogW1xuICAgICAqICAgICAgbWFrZVBhcmFtZXRlcih7XG4gICAgICogICAgICAgIHR5cGU6IFBhcmFtZXRlclR5cGUuU3RyaW5nLFxuICAgICAqICAgICAgICBuYW1lOiAnbXlQYXJhbScsXG4gICAgICogICAgICAgIGRlc2NyaXB0aW9uOiAnTXkgcGFyYW0gZGVzY3JpcHRpb24uJyxcbiAgICAgKiAgICAgIH0pLFxuICAgICAqICAgIF0sXG4gICAgICogICAgZXhlY3V0ZTogYXN5bmMgKFtwYXJhbV0pID0+IHtcbiAgICAgKiAgICAgIHJldHVybiBgSGVsbG8gJHtwYXJhbX1gO1xuICAgICAqICAgIH0sXG4gICAgICogfSk7XG4gICAgICogYGBgXG4gICAgICovXG4gICAgYWRkRm9ybXVsYShkZWZpbml0aW9uKSB7XG4gICAgICAgIGNvbnN0IGZvcm11bGEgPSAoMCwgYXBpXzMubWFrZUZvcm11bGEpKHtcbiAgICAgICAgICAgIC4uLmRlZmluaXRpb24sXG4gICAgICAgICAgICBjb25uZWN0aW9uUmVxdWlyZW1lbnQ6IGRlZmluaXRpb24uY29ubmVjdGlvblJlcXVpcmVtZW50IHx8IHRoaXMuX2RlZmF1bHRDb25uZWN0aW9uUmVxdWlyZW1lbnQsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmZvcm11bGFzLnB1c2goZm9ybXVsYSk7IC8vIFdURlxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhIHN5bmMgdGFibGUgZGVmaW5pdGlvbiB0byB0aGlzIHBhY2suXG4gICAgICpcbiAgICAgKiBJbiB0aGUgd2ViIGVkaXRvciwgdGhlIGAvU3luY1RhYmxlYCBzaG9ydGN1dCB3aWxsIGluc2VydCBhIHNuaXBwZXQgb2YgYSBza2VsZXRvbiBzeW5jIHRhYmxlLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBgYGBcbiAgICAgKiBwYWNrLmFkZFN5bmNUYWJsZSh7XG4gICAgICogICBuYW1lOiAnTXlTeW5jVGFibGUnLFxuICAgICAqICAgaWRlbnRpdHlOYW1lOiAnRW50aXR5TmFtZScsXG4gICAgICogICBzY2hlbWE6IGNvZGEubWFrZU9iamVjdFNjaGVtYSh7XG4gICAgICogICAgIC4uLlxuICAgICAqICAgfSksXG4gICAgICogICBmb3JtdWxhOiB7XG4gICAgICogICAgIC4uLlxuICAgICAqICAgfSxcbiAgICAgKiB9KTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBhZGRTeW5jVGFibGUoeyBuYW1lLCBkZXNjcmlwdGlvbiwgaWRlbnRpdHlOYW1lLCBzY2hlbWEsIGZvcm11bGEsIGNvbm5lY3Rpb25SZXF1aXJlbWVudCwgZHluYW1pY09wdGlvbnMgPSB7fSwgfSkge1xuICAgICAgICBjb25zdCBjb25uZWN0aW9uUmVxdWlyZW1lbnRUb1VzZSA9IGNvbm5lY3Rpb25SZXF1aXJlbWVudCB8fCB0aGlzLl9kZWZhdWx0Q29ubmVjdGlvblJlcXVpcmVtZW50O1xuICAgICAgICBjb25zdCBzeW5jVGFibGUgPSAoMCwgYXBpXzQubWFrZVN5bmNUYWJsZSkoe1xuICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgICAgICAgaWRlbnRpdHlOYW1lLFxuICAgICAgICAgICAgc2NoZW1hLFxuICAgICAgICAgICAgZm9ybXVsYSxcbiAgICAgICAgICAgIGNvbm5lY3Rpb25SZXF1aXJlbWVudDogY29ubmVjdGlvblJlcXVpcmVtZW50VG9Vc2UsXG4gICAgICAgICAgICBkeW5hbWljT3B0aW9ucyxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3luY1RhYmxlcy5wdXNoKHN5bmNUYWJsZSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgZHluYW1pYyBzeW5jIHRhYmxlIGRlZmluaXRpb24gdG8gdGhpcyBwYWNrLlxuICAgICAqXG4gICAgICogSW4gdGhlIHdlYiBlZGl0b3IsIHRoZSBgL0R5bmFtaWNTeW5jVGFibGVgIHNob3J0Y3V0IHdpbGwgaW5zZXJ0IGEgc25pcHBldCBvZiBhIHNrZWxldG9uIHN5bmMgdGFibGUuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGBgYFxuICAgICAqIHBhY2suYWRkRHluYW1pY1N5bmNUYWJsZSh7XG4gICAgICogICBuYW1lOiBcIk15U3luY1RhYmxlXCIsXG4gICAgICogICBnZXROYW1lOiBhc3luYyBmdW5jaXRvbiAoY29udGV4dCkgPT4ge1xuICAgICAqICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGNvbnRleHQuZmV0Y2hlci5mZXRjaCh7bWV0aG9kOiBcIkdFVFwiLCB1cmw6IGNvbnRleHQuc3luYy5keW5hbWljVXJsfSk7XG4gICAgICogICAgIHJldHVybiByZXNwb25zZS5ib2R5Lm5hbWU7XG4gICAgICogICB9LFxuICAgICAqICAgZ2V0TmFtZTogYXN5bmMgZnVuY3Rpb24gKGNvbnRleHQpID0+IHtcbiAgICAgKiAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjb250ZXh0LmZldGNoZXIuZmV0Y2goe21ldGhvZDogXCJHRVRcIiwgdXJsOiBjb250ZXh0LnN5bmMuZHluYW1pY1VybH0pO1xuICAgICAqICAgICByZXR1cm4gcmVzcG9uc2UuYm9keS5icm93c2VyTGluaztcbiAgICAgKiAgIH0sXG4gICAgICogICAuLi5cbiAgICAgKiB9KTtcbiAgICAgKiBgYGBcbiAgICAgKi9cbiAgICBhZGREeW5hbWljU3luY1RhYmxlKGRlZmluaXRpb24pIHtcbiAgICAgICAgY29uc3QgZHluYW1pY1N5bmNUYWJsZSA9ICgwLCBhcGlfMi5tYWtlRHluYW1pY1N5bmNUYWJsZSkoe1xuICAgICAgICAgICAgLi4uZGVmaW5pdGlvbixcbiAgICAgICAgICAgIGNvbm5lY3Rpb25SZXF1aXJlbWVudDogZGVmaW5pdGlvbi5jb25uZWN0aW9uUmVxdWlyZW1lbnQgfHwgdGhpcy5fZGVmYXVsdENvbm5lY3Rpb25SZXF1aXJlbWVudCxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc3luY1RhYmxlcy5wdXNoKGR5bmFtaWNTeW5jVGFibGUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkcyBhIGNvbHVtbiBmb3JtYXQgZGVmaW5pdGlvbiB0byB0aGlzIHBhY2suXG4gICAgICpcbiAgICAgKiBJbiB0aGUgd2ViIGVkaXRvciwgdGhlIGAvQ29sdW1uRm9ybWF0YCBzaG9ydGN1dCB3aWxsIGluc2VydCBhIHNuaXBwZXQgb2YgYSBza2VsZXRvbiBmb3JtYXQuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGBgYFxuICAgICAqIHBhY2suYWRkQ29sdW1uRm9ybWF0KHtcbiAgICAgKiAgIG5hbWU6ICdNeUNvbHVtbicsXG4gICAgICogICBmb3JtdWxhTmFtZTogJ015Rm9ybXVsYScsXG4gICAgICogfSk7XG4gICAgICogYGBgXG4gICAgICovXG4gICAgYWRkQ29sdW1uRm9ybWF0KGZvcm1hdCkge1xuICAgICAgICB0aGlzLmZvcm1hdHMucHVzaChmb3JtYXQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGlzIHBhY2sgdG8gdXNlIGF1dGhlbnRpY2F0aW9uIGZvciBpbmRpdmlkdWFsIHVzZXJzLCB1c2luZyB0aGVcbiAgICAgKiBhdXRoZW50aWNhdGlvbiBtZXRob2QgaXMgdGhlIGdpdmVuIGRlZmluaXRpb24uXG4gICAgICpcbiAgICAgKiBFYWNoIHVzZXIgd2lsbCBuZWVkIHRvIHJlZ2lzdGVyIGFuIGFjY291bnQgaW4gb3JkZXIgdG8gdXNlIHRoaXMgcGFjay5cbiAgICAgKlxuICAgICAqIEluIHRoZSB3ZWIgZWRpdG9yLCB0aGUgYC9Vc2VyQXV0aGVudGljYXRpb25gIHNob3J0Y3V0IHdpbGwgaW5zZXJ0IGEgc25pcHBldCBvZiBhIHNrZWxldG9uXG4gICAgICogYXV0aGVudGljYXRpb24gZGVmaW5pdGlvbi5cbiAgICAgKlxuICAgICAqIEJ5IGRlZmF1bHQsIHRoaXMgd2lsbCBzZXQgYSBkZWZhdWx0IGNvbm5lY3Rpb24gKGFjY291bnQpIHJlcXVpcmVtZW50LCBtYWtpbmcgYSB1c2VyIGFjY291bnRcbiAgICAgKiByZXF1aXJlZCB0byBpbnZva2UgYWxsIGZvcm11bGFzIGluIHRoaXMgcGFjayB1bmxlc3MgeW91IHNwZWNpZnkgZGlmZmVyZW50bHkgb24gYSBwYXJ0aWN1bGFyXG4gICAgICogZm9ybXVsYS4gVG8gY2hhbmdlIHRoZSBkZWZhdWx0LCB5b3UgY2FuIHBhc3MgYSBgZGVmYXVsdENvbm5lY3Rpb25SZXF1aXJlbWVudGAgb3B0aW9uIGludG9cbiAgICAgKiB0aGlzIG1ldGhvZC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogYGBgXG4gICAgICogcGFjay5zZXRVc2VyQXV0aGVudGljYXRpb24oe1xuICAgICAqICAgdHlwZTogQXV0aGVudGljYXRpb25UeXBlLkhlYWRlckJlYXJlclRva2VuLFxuICAgICAqIH0pO1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIHNldFVzZXJBdXRoZW50aWNhdGlvbihhdXRoRGVmKSB7XG4gICAgICAgIGNvbnN0IHsgZGVmYXVsdENvbm5lY3Rpb25SZXF1aXJlbWVudCA9IGFwaV90eXBlc18xLkNvbm5lY3Rpb25SZXF1aXJlbWVudC5SZXF1aXJlZCwgLi4uYXV0aGVudGljYXRpb24gfSA9IGF1dGhEZWY7XG4gICAgICAgIGlmIChhdXRoZW50aWNhdGlvbi50eXBlID09PSB0eXBlc18xLkF1dGhlbnRpY2F0aW9uVHlwZS5Ob25lIHx8IGF1dGhlbnRpY2F0aW9uLnR5cGUgPT09IHR5cGVzXzEuQXV0aGVudGljYXRpb25UeXBlLlZhcmlvdXMpIHtcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdEF1dGhlbnRpY2F0aW9uID0gYXV0aGVudGljYXRpb247XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB7IGdldENvbm5lY3Rpb25OYW1lOiBnZXRDb25uZWN0aW9uTmFtZURlZiwgZ2V0Q29ubmVjdGlvblVzZXJJZDogZ2V0Q29ubmVjdGlvblVzZXJJZERlZiwgcG9zdFNldHVwOiBwb3N0U2V0dXBEZWYsIC4uLnJlc3QgfSA9IGF1dGhlbnRpY2F0aW9uO1xuICAgICAgICAgICAgY29uc3QgZ2V0Q29ubmVjdGlvbk5hbWUgPSAoMCwgYXBpXzYud3JhcE1ldGFkYXRhRnVuY3Rpb24pKGdldENvbm5lY3Rpb25OYW1lRGVmKTtcbiAgICAgICAgICAgIGNvbnN0IGdldENvbm5lY3Rpb25Vc2VySWQgPSAoMCwgYXBpXzYud3JhcE1ldGFkYXRhRnVuY3Rpb24pKGdldENvbm5lY3Rpb25Vc2VySWREZWYpO1xuICAgICAgICAgICAgY29uc3QgcG9zdFNldHVwID0gcG9zdFNldHVwRGVmID09PSBudWxsIHx8IHBvc3RTZXR1cERlZiA9PT0gdm9pZCAwID8gdm9pZCAwIDogcG9zdFNldHVwRGVmLm1hcChzdGVwID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyAuLi5zdGVwLCBnZXRPcHRpb25zOiAoMCwgYXBpXzYud3JhcE1ldGFkYXRhRnVuY3Rpb24pKCgwLCBtaWdyYXRpb25fMS5zZXRFbmRwb2ludERlZkhlbHBlcikoc3RlcCkuZ2V0T3B0aW9ucykgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5kZWZhdWx0QXV0aGVudGljYXRpb24gPSB7IC4uLnJlc3QsIGdldENvbm5lY3Rpb25OYW1lLCBnZXRDb25uZWN0aW9uVXNlcklkLCBwb3N0U2V0dXAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXV0aGVudGljYXRpb24udHlwZSAhPT0gdHlwZXNfMS5BdXRoZW50aWNhdGlvblR5cGUuTm9uZSkge1xuICAgICAgICAgICAgdGhpcy5fc2V0RGVmYXVsdENvbm5lY3Rpb25SZXF1aXJlbWVudChkZWZhdWx0Q29ubmVjdGlvblJlcXVpcmVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGlzIHBhY2sgdG8gdXNlIGF1dGhlbnRpY2F0aW9uIHByb3ZpZGVkIGJ5IHlvdSBhcyB0aGUgbWFrZXIgb2YgdGhpcyBwYWNrLlxuICAgICAqXG4gICAgICogWW91IHdpbGwgbmVlZCB0byByZWdpc3RlciBjcmVkZW50aWFscyB0byB1c2Ugd2l0aCB0aGlzIHBhY2suIFdoZW4gdXNlcnMgdXNlIHRoZVxuICAgICAqIHBhY2ssIHRoZWlyIHJlcXVlc3RzIHdpbGwgYmUgYXV0aGVudGljYXRlZCB3aXRoIHRob3NlIHN5c3RlbSBjcmVkZW50aWFscywgdGhleSBuZWVkXG4gICAgICogbm90IHJlZ2lzdGVyIHRoZWlyIG93biBhY2NvdW50LlxuICAgICAqXG4gICAgICogSW4gdGhlIHdlYiBlZGl0b3IsIHRoZSBgL1N5c3RlbUF1dGhlbnRpY2F0aW9uYCBzaG9ydGN1dCB3aWxsIGluc2VydCBhIHNuaXBwZXQgb2YgYSBza2VsZXRvblxuICAgICAqIGF1dGhlbnRpY2F0aW9uIGRlZmluaXRpb24uXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGBgYFxuICAgICAqIHBhY2suc2V0U3lzdGVtQXV0aGVudGljYXRpb24oe1xuICAgICAqICAgdHlwZTogQXV0aGVudGljYXRpb25UeXBlLkhlYWRlckJlYXJlclRva2VuLFxuICAgICAqIH0pO1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIHNldFN5c3RlbUF1dGhlbnRpY2F0aW9uKHN5c3RlbUF1dGhlbnRpY2F0aW9uKSB7XG4gICAgICAgIGNvbnN0IHsgZ2V0Q29ubmVjdGlvbk5hbWU6IGdldENvbm5lY3Rpb25OYW1lRGVmLCBnZXRDb25uZWN0aW9uVXNlcklkOiBnZXRDb25uZWN0aW9uVXNlcklkRGVmLCBwb3N0U2V0dXA6IHBvc3RTZXR1cERlZiwgLi4ucmVzdCB9ID0gc3lzdGVtQXV0aGVudGljYXRpb247XG4gICAgICAgIGNvbnN0IGdldENvbm5lY3Rpb25OYW1lID0gKDAsIGFwaV82LndyYXBNZXRhZGF0YUZ1bmN0aW9uKShnZXRDb25uZWN0aW9uTmFtZURlZik7XG4gICAgICAgIGNvbnN0IGdldENvbm5lY3Rpb25Vc2VySWQgPSAoMCwgYXBpXzYud3JhcE1ldGFkYXRhRnVuY3Rpb24pKGdldENvbm5lY3Rpb25Vc2VySWREZWYpO1xuICAgICAgICBjb25zdCBwb3N0U2V0dXAgPSBwb3N0U2V0dXBEZWYgPT09IG51bGwgfHwgcG9zdFNldHVwRGVmID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwb3N0U2V0dXBEZWYubWFwKHN0ZXAgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHsgLi4uc3RlcCwgZ2V0T3B0aW9uczogKDAsIGFwaV82LndyYXBNZXRhZGF0YUZ1bmN0aW9uKSgoMCwgbWlncmF0aW9uXzEuc2V0RW5kcG9pbnREZWZIZWxwZXIpKHN0ZXApLmdldE9wdGlvbnMpIH07XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN5c3RlbUNvbm5lY3Rpb25BdXRoZW50aWNhdGlvbiA9IHtcbiAgICAgICAgICAgIC4uLnJlc3QsXG4gICAgICAgICAgICBnZXRDb25uZWN0aW9uTmFtZSxcbiAgICAgICAgICAgIGdldENvbm5lY3Rpb25Vc2VySWQsXG4gICAgICAgICAgICBwb3N0U2V0dXAsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGRzIHRoZSBkb21haW4gdGhhdCB0aGlzIHBhY2sgbWFrZXMgSFRUUCByZXF1ZXN0cyB0by5cbiAgICAgKiBGb3IgZXhhbXBsZSwgaWYgeW91ciBwYWNrIG1ha2VzIEhUVFAgcmVxdWVzdHMgdG8gXCJhcGkuZXhhbXBsZS5jb21cIixcbiAgICAgKiB1c2UgXCJleGFtcGxlLmNvbVwiIGFzIHlvdXIgbmV0d29yayBkb21haW4uXG4gICAgICpcbiAgICAgKiBJZiB5b3VyIHBhY2sgbWFrZSBIVFRQIHJlcXVlc3RzLCBpdCBtdXN0IGRlY2xhcmUgYSBuZXR3b3JrIGRvbWFpbixcbiAgICAgKiBmb3Igc2VjdXJpdHkgcHVycG9zZXMuIENvZGEgZW5mb3JjZXMgdGhhdCB5b3VyIHBhY2sgY2Fubm90IG1ha2UgcmVxdWVzdHMgdG9cbiAgICAgKiBhbnkgdW5kZWNsYXJlZCBkb21haW5zLlxuICAgICAqXG4gICAgICogWW91IGFyZSBhbGxvd2VkIG9uZSBuZXR3b3JrIGRvbWFpbiBwZXIgcGFjayBieSBkZWZhdWx0LiBJZiB5b3VyIHBhY2sgbmVlZHNcbiAgICAgKiB0byBjb25uZWN0IHRvIG11bHRpcGxlIGRvbWFpbnMsIGNvbnRhY3QgQ29kYSBTdXBwb3J0IGZvciBhcHByb3ZhbC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogYGBgXG4gICAgICogcGFjay5hZGROZXR3b3JrRG9tYWluKCdleGFtcGxlLmNvbScpO1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIGFkZE5ldHdvcmtEb21haW4oLi4uZG9tYWluKSB7XG4gICAgICAgIHRoaXMubmV0d29ya0RvbWFpbnMucHVzaCguLi5kb21haW4pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgc2VtYW50aWMgdmVyc2lvbiBvZiB0aGlzIHBhY2sgdmVyc2lvbiwgZS5nLiBgJzEuMi4zJ2AuXG4gICAgICpcbiAgICAgKiBUaGlzIGlzIG9wdGlvbmFsLCBhbmQgeW91IG9ubHkgbmVlZCB0byBwcm92aWRlIGEgdmVyc2lvbiBpZiB5b3UgYXJlIG1hbnVhbGx5IGRvaW5nXG4gICAgICogc2VtYW50aWMgdmVyc2lvbmluZywgb3IgdXNpbmcgdGhlIENMSS4gSWYgdXNpbmcgdGhlIHdlYiBlZGl0b3IsIHlvdSBjYW4gb21pdCB0aGlzXG4gICAgICogYW5kIHRoZSB3ZWIgZWRpdG9yIHdpbGwgYXV0b21hdGljYWxseSBwcm92aWRlIGFuIGFwcHJvcHJpYXRlIHNlbWFudGljIHZlcnNpb25cbiAgICAgKiBlYWNoIHRpbWUgeW91IGJ1aWxkIGEgdmVyc2lvbi5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogYGBgXG4gICAgICogcGFjay5zZXRWZXJzaW9uKCcxLjIuMycpO1xuICAgICAqIGBgYFxuICAgICAqL1xuICAgIHNldFZlcnNpb24odmVyc2lvbikge1xuICAgICAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgX3NldERlZmF1bHRDb25uZWN0aW9uUmVxdWlyZW1lbnQoY29ubmVjdGlvblJlcXVpcmVtZW50KSB7XG4gICAgICAgIHRoaXMuX2RlZmF1bHRDb25uZWN0aW9uUmVxdWlyZW1lbnQgPSBjb25uZWN0aW9uUmVxdWlyZW1lbnQ7XG4gICAgICAgIC8vIFJld3JpdGUgYW55IGZvcm11bGFzIG9yIHN5bmMgdGFibGVzIHRoYXQgd2VyZSBhbHJlYWR5IGRlZmluZWQsIGluIGNhc2UgdGhlIG1ha2VyIHNldHMgdGhlIGRlZmF1bHRcbiAgICAgICAgLy8gYWZ0ZXIgdGhlIGZhY3QuXG4gICAgICAgIHRoaXMuZm9ybXVsYXMgPSB0aGlzLmZvcm11bGFzLm1hcChmb3JtdWxhID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmb3JtdWxhLmNvbm5lY3Rpb25SZXF1aXJlbWVudCA/IGZvcm11bGEgOiAoMCwgYXBpXzUubWF5YmVSZXdyaXRlQ29ubmVjdGlvbkZvckZvcm11bGEpKGZvcm11bGEsIGNvbm5lY3Rpb25SZXF1aXJlbWVudCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnN5bmNUYWJsZXMgPSB0aGlzLnN5bmNUYWJsZXMubWFwKHN5bmNUYWJsZSA9PiB7XG4gICAgICAgICAgICBpZiAoc3luY1RhYmxlLmdldHRlci5jb25uZWN0aW9uUmVxdWlyZW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3luY1RhYmxlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoKDAsIGFwaV8xLmlzRHluYW1pY1N5bmNUYWJsZSkoc3luY1RhYmxlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLnN5bmNUYWJsZSxcbiAgICAgICAgICAgICAgICAgICAgZ2V0dGVyOiAoMCwgYXBpXzUubWF5YmVSZXdyaXRlQ29ubmVjdGlvbkZvckZvcm11bGEpKHN5bmNUYWJsZS5nZXR0ZXIsIGNvbm5lY3Rpb25SZXF1aXJlbWVudCksXG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZXNlIDQgYXJlIG1ldGFkYXRhIGZvcm11bGFzLCBzbyB0aGV5IHVzZSBDb25uZWN0aW9uUmVxdWlyZW1lbnQuUmVxdWlyZWRcbiAgICAgICAgICAgICAgICAgICAgLy8gYnkgZGVmYXVsdCBpZiB5b3UgZG9uJ3Qgc3BlY2lmeSBhIGNvbm5lY3Rpb24gcmVxdWlyZW1lbnQgKGEgbGVnYWN5IGJlaGF2aW9yXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoYXQgaXMgY29uZnVzaW5nIGFuZCBwZXJoYXBzIHVuZGVzaXJhYmxlIG5vdyB0aGF0IHdlIGhhdmUgYmV0dGVyIGJ1aWxkZXJzKS5cbiAgICAgICAgICAgICAgICAgICAgLy8gV2UgZG9uJ3Qga25vdyBpZiB0aGUgbWFrZXIgc2V0IFJlcXVpcmVkIGV4cGxpY2l0bHkgb3IgaWYgd2FzIGp1c3QgdGhlIGRlZmF1bHQsXG4gICAgICAgICAgICAgICAgICAgIC8vIHNvIHdlIGRvbid0IGtub3cgaWYgd2Ugc2hvdWxkIG92ZXJ3cml0ZSB0aGUgY29ubmVjdGlvbiByZXF1aXJlbWVudC4gRm9yIGxhY2tcbiAgICAgICAgICAgICAgICAgICAgLy8gb2YgYSBiZXR0ZXIgb3B0aW9uLCB3ZSdsbCBvdmVycmlkZSBpdCBoZXJlIHJlZ2FyZGxlc3MuIFRoaXMgZW5zdXJlIHRoYXQgdGhlc2VcbiAgICAgICAgICAgICAgICAgICAgLy8gZHluYW1pYyBzeW5jIHRhYmxlIG1ldGFkYXRhIGZvcm11bGFzIGhhdmUgdGhlIHNhbWUgY29ubmV0aW9uIHJlcXVpcmVtZW50IGFzIHRoZVxuICAgICAgICAgICAgICAgICAgICAvLyBzeW5jIHRhYmxlIGl0c2VsZiwgd2hpY2ggc2VlbXMgZGVzaXJhYmxlIGJhc2ljYWxseSAxMDAlIG9mIHRoZSB0aW1lIGFuZCBzaG91bGRcbiAgICAgICAgICAgICAgICAgICAgLy8gYWx3YXlzIHdvcmssIGJ1dCBpdCBkb2VzIGdpdmUgcmlzZSB0byBjb25mdXNpbmcgYmVoYXZpb3IgdGhhdCBjYWxsaW5nXG4gICAgICAgICAgICAgICAgICAgIC8vIHNldERlZmF1bHRDb25uZWN0aW9uUmVxdWlyZW1lbnQoKSBjYW4gd2lwZSBhd2F5IGFuIGV4cGxpY2l0IGNvbm5lY3Rpb25cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVxdWlyZW1lbnQgb3ZlcnJpZGUgc2V0IG9uIG9uZSBvZiB0aGVzZSA0IG1ldGFkYXRhIGZvcm11bGFzLlxuICAgICAgICAgICAgICAgICAgICBnZXROYW1lOiAoMCwgYXBpXzUubWF5YmVSZXdyaXRlQ29ubmVjdGlvbkZvckZvcm11bGEpKHN5bmNUYWJsZS5nZXROYW1lLCBjb25uZWN0aW9uUmVxdWlyZW1lbnQpLFxuICAgICAgICAgICAgICAgICAgICBnZXREaXNwbGF5VXJsOiAoMCwgYXBpXzUubWF5YmVSZXdyaXRlQ29ubmVjdGlvbkZvckZvcm11bGEpKHN5bmNUYWJsZS5nZXREaXNwbGF5VXJsLCBjb25uZWN0aW9uUmVxdWlyZW1lbnQpLFxuICAgICAgICAgICAgICAgICAgICBnZXRTY2hlbWE6ICgwLCBhcGlfNS5tYXliZVJld3JpdGVDb25uZWN0aW9uRm9yRm9ybXVsYSkoc3luY1RhYmxlLmdldFNjaGVtYSwgY29ubmVjdGlvblJlcXVpcmVtZW50KSxcbiAgICAgICAgICAgICAgICAgICAgbGlzdER5bmFtaWNVcmxzOiAoMCwgYXBpXzUubWF5YmVSZXdyaXRlQ29ubmVjdGlvbkZvckZvcm11bGEpKHN5bmNUYWJsZS5saXN0RHluYW1pY1VybHMsIGNvbm5lY3Rpb25SZXF1aXJlbWVudCksXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIC4uLnN5bmNUYWJsZSxcbiAgICAgICAgICAgICAgICAgICAgZ2V0dGVyOiAoMCwgYXBpXzUubWF5YmVSZXdyaXRlQ29ubmVjdGlvbkZvckZvcm11bGEpKHN5bmNUYWJsZS5nZXR0ZXIsIGNvbm5lY3Rpb25SZXF1aXJlbWVudCksXG4gICAgICAgICAgICAgICAgICAgIGdldFNjaGVtYTogKDAsIGFwaV81Lm1heWJlUmV3cml0ZUNvbm5lY3Rpb25Gb3JGb3JtdWxhKShzeW5jVGFibGUuZ2V0U2NoZW1hLCBjb25uZWN0aW9uUmVxdWlyZW1lbnQpLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5leHBvcnRzLlBhY2tEZWZpbml0aW9uQnVpbGRlciA9IFBhY2tEZWZpbml0aW9uQnVpbGRlcjtcbiIsICJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuU3ZnQ29uc3RhbnRzID0gdm9pZCAwO1xuLyoqIENvbnN0YW50cyBmb3Igd29ya2luZyB3aXRoIFNWRyBpbWFnZXMuICovXG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5hbWVzcGFjZVxudmFyIFN2Z0NvbnN0YW50cztcbihmdW5jdGlvbiAoU3ZnQ29uc3RhbnRzKSB7XG4gICAgLyoqIElEIG9mIHRoZSBub2RlIGluIGEgcmV0dXJuZWQgU1ZHIGZpbGUgdGhhdCBpcyB0YXJnZXRlZCB3aGVuIERhcmsgTW9kZSBpcyBlbmFibGVkIGluIENvZGEuICovXG4gICAgU3ZnQ29uc3RhbnRzLkRhcmtNb2RlRnJhZ21lbnRJZCA9ICdEYXJrTW9kZSc7XG4gICAgLyoqIFByZWZpeCB0byB1c2UgZm9yIGJhc2UtNjQgZW5jb2RlZCBTVkdzIHJldHVybmVkIGJ5IGZvcm11bGFzLiAqL1xuICAgIFN2Z0NvbnN0YW50cy5EYXRhVXJsUHJlZml4ID0gJ2RhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsJztcbiAgICAvKiogUHJlZml4IHRvIHVzZSBmb3IgYmFzZS02NCBlbmNvZGVkIFNWR3MgKHRoYXQgc3VwcG9ydCBEYXJrIE1vZGUpIHJldHVybmVkIGJ5IGZvcm11bGFzLiAqL1xuICAgIFN2Z0NvbnN0YW50cy5EYXRhVXJsUHJlZml4V2l0aERhcmtNb2RlU3VwcG9ydCA9ICdkYXRhOmltYWdlL3N2Zyt4bWw7c3VwcG9ydHNEYXJrTW9kZT0xO2Jhc2U2NCwnO1xufSkoU3ZnQ29uc3RhbnRzID0gZXhwb3J0cy5TdmdDb25zdGFudHMgfHwgKGV4cG9ydHMuU3ZnQ29uc3RhbnRzID0ge30pKTtcbiIsICJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogVGhlIGNvcmUgY29tcG9uZW50cyBvZiB0aGUgUGFjayBTREsuIFRoZXNlIGZ1bmN0aW9ucyBhbmQgdHlwZXMgYXJlIHVzZWQgdG9cbiAqIGRlZmluZSB5b3VyIFBhY2ssIGl0J3MgYnVpbGRpbmcgYmxvY2tzLCBhbmQgdGhlaXIgbG9naWMuXG4gKlxuICogVGhpcyBtb2R1bGUgaXMgaW1wb3J0ZWQgdXNpbmcgdGhlIGZvbGxvd2luZyBjb2RlOlxuICpcbiAqIGBgYHRzXG4gKiBpbXBvcnQgKiBhcyBjb2RhIGZyb20gXCJAY29kYWhxL3BhY2tzLXNka1wiO1xuICogYGBgXG4gKlxuICogQG1vZHVsZSBjb3JlXG4gKi9cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuVmFsaWRGZXRjaE1ldGhvZHMgPSBleHBvcnRzLndpdGhJZGVudGl0eSA9IGV4cG9ydHMubWFrZVNjaGVtYSA9IGV4cG9ydHMubWFrZVJlZmVyZW5jZVNjaGVtYUZyb21PYmplY3RTY2hlbWEgPSBleHBvcnRzLm1ha2VPYmplY3RTY2hlbWEgPSBleHBvcnRzLm1ha2VBdHRyaWJ1dGlvbk5vZGUgPSBleHBvcnRzLmdlbmVyYXRlU2NoZW1hID0gZXhwb3J0cy5WYWx1ZVR5cGUgPSBleHBvcnRzLlZhbHVlSGludFR5cGUgPSBleHBvcnRzLlNjYWxlSWNvblNldCA9IGV4cG9ydHMuTGlua0Rpc3BsYXlUeXBlID0gZXhwb3J0cy5JbWFnZU91dGxpbmUgPSBleHBvcnRzLkltYWdlQ29ybmVyU3R5bGUgPSBleHBvcnRzLkVtYWlsRGlzcGxheVR5cGUgPSBleHBvcnRzLkR1cmF0aW9uVW5pdCA9IGV4cG9ydHMuQ3VycmVuY3lGb3JtYXQgPSBleHBvcnRzLkF0dHJpYnV0aW9uTm9kZVR5cGUgPSBleHBvcnRzLmVuc3VyZVVucmVhY2hhYmxlID0gZXhwb3J0cy5lbnN1cmVOb25FbXB0eVN0cmluZyA9IGV4cG9ydHMuZW5zdXJlRXhpc3RzID0gZXhwb3J0cy5hc3NlcnRDb25kaXRpb24gPSBleHBvcnRzLlN2Z0NvbnN0YW50cyA9IGV4cG9ydHMud2l0aFF1ZXJ5UGFyYW1zID0gZXhwb3J0cy5qb2luVXJsID0gZXhwb3J0cy5nZXRRdWVyeVBhcmFtcyA9IGV4cG9ydHMuc2ltcGxlQXV0b2NvbXBsZXRlID0gZXhwb3J0cy5tYWtlU2ltcGxlQXV0b2NvbXBsZXRlTWV0YWRhdGFGb3JtdWxhID0gZXhwb3J0cy5hdXRvY29tcGxldGVTZWFyY2hPYmplY3RzID0gZXhwb3J0cy5tYWtlUGFyYW1ldGVyID0gZXhwb3J0cy5tYWtlVHJhbnNsYXRlT2JqZWN0Rm9ybXVsYSA9IGV4cG9ydHMubWFrZVN5bmNUYWJsZSA9IGV4cG9ydHMubWFrZUZvcm11bGEgPSBleHBvcnRzLm1ha2VFbXB0eUZvcm11bGEgPSBleHBvcnRzLm1ha2VEeW5hbWljU3luY1RhYmxlID0gZXhwb3J0cy5tYWtlTWV0YWRhdGFGb3JtdWxhID0gZXhwb3J0cy5Vc2VyVmlzaWJsZUVycm9yID0gZXhwb3J0cy5UeXBlID0gZXhwb3J0cy5NaXNzaW5nU2NvcGVzRXJyb3IgPSBleHBvcnRzLlN0YXR1c0NvZGVFcnJvciA9IGV4cG9ydHMuUHJlY2FubmVkRGF0ZVJhbmdlID0gZXhwb3J0cy5QYXJhbWV0ZXJUeXBlID0gZXhwb3J0cy5OZXR3b3JrQ29ubmVjdGlvbiA9IGV4cG9ydHMuQ29ubmVjdGlvblJlcXVpcmVtZW50ID0gZXhwb3J0cy5QYWNrRGVmaW5pdGlvbkJ1aWxkZXIgPSBleHBvcnRzLm5ld1BhY2sgPSBleHBvcnRzLlBvc3RTZXR1cFR5cGUgPSBleHBvcnRzLkF1dGhlbnRpY2F0aW9uVHlwZSA9IHZvaWQgMDtcbnZhciB0eXBlc18xID0gcmVxdWlyZShcIi4vdHlwZXNcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJBdXRoZW50aWNhdGlvblR5cGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHR5cGVzXzEuQXV0aGVudGljYXRpb25UeXBlOyB9IH0pO1xudmFyIHR5cGVzXzIgPSByZXF1aXJlKFwiLi90eXBlc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlBvc3RTZXR1cFR5cGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHR5cGVzXzIuUG9zdFNldHVwVHlwZTsgfSB9KTtcbnZhciBidWlsZGVyXzEgPSByZXF1aXJlKFwiLi9idWlsZGVyXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibmV3UGFja1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYnVpbGRlcl8xLm5ld1BhY2s7IH0gfSk7XG52YXIgYnVpbGRlcl8yID0gcmVxdWlyZShcIi4vYnVpbGRlclwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlBhY2tEZWZpbml0aW9uQnVpbGRlclwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYnVpbGRlcl8yLlBhY2tEZWZpbml0aW9uQnVpbGRlcjsgfSB9KTtcbnZhciBhcGlfdHlwZXNfMSA9IHJlcXVpcmUoXCIuL2FwaV90eXBlc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkNvbm5lY3Rpb25SZXF1aXJlbWVudFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYXBpX3R5cGVzXzEuQ29ubmVjdGlvblJlcXVpcmVtZW50OyB9IH0pO1xudmFyIGFwaV90eXBlc18yID0gcmVxdWlyZShcIi4vYXBpX3R5cGVzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiTmV0d29ya0Nvbm5lY3Rpb25cIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFwaV90eXBlc18yLk5ldHdvcmtDb25uZWN0aW9uOyB9IH0pO1xudmFyIGFwaV90eXBlc18zID0gcmVxdWlyZShcIi4vYXBpX3R5cGVzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiUGFyYW1ldGVyVHlwZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYXBpX3R5cGVzXzMuUGFyYW1ldGVyVHlwZTsgfSB9KTtcbnZhciBhcGlfdHlwZXNfNCA9IHJlcXVpcmUoXCIuL2FwaV90eXBlc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlByZWNhbm5lZERhdGVSYW5nZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYXBpX3R5cGVzXzQuUHJlY2FubmVkRGF0ZVJhbmdlOyB9IH0pO1xudmFyIGFwaV8xID0gcmVxdWlyZShcIi4vYXBpXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiU3RhdHVzQ29kZUVycm9yXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBhcGlfMS5TdGF0dXNDb2RlRXJyb3I7IH0gfSk7XG52YXIgYXBpXzIgPSByZXF1aXJlKFwiLi9hcGlcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJNaXNzaW5nU2NvcGVzRXJyb3JcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFwaV8yLk1pc3NpbmdTY29wZXNFcnJvcjsgfSB9KTtcbnZhciBhcGlfdHlwZXNfNSA9IHJlcXVpcmUoXCIuL2FwaV90eXBlc1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlR5cGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFwaV90eXBlc181LlR5cGU7IH0gfSk7XG52YXIgYXBpXzMgPSByZXF1aXJlKFwiLi9hcGlcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJVc2VyVmlzaWJsZUVycm9yXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBhcGlfMy5Vc2VyVmlzaWJsZUVycm9yOyB9IH0pO1xuLy8gRm9ybXVsYSBkZWZpbml0aW9uIGhlbHBlcnNcbnZhciBhcGlfNCA9IHJlcXVpcmUoXCIuL2FwaVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm1ha2VNZXRhZGF0YUZvcm11bGFcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFwaV80Lm1ha2VNZXRhZGF0YUZvcm11bGE7IH0gfSk7XG52YXIgYXBpXzUgPSByZXF1aXJlKFwiLi9hcGlcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJtYWtlRHluYW1pY1N5bmNUYWJsZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYXBpXzUubWFrZUR5bmFtaWNTeW5jVGFibGU7IH0gfSk7XG52YXIgYXBpXzYgPSByZXF1aXJlKFwiLi9hcGlcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJtYWtlRW1wdHlGb3JtdWxhXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBhcGlfNi5tYWtlRW1wdHlGb3JtdWxhOyB9IH0pO1xudmFyIGFwaV83ID0gcmVxdWlyZShcIi4vYXBpXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibWFrZUZvcm11bGFcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFwaV83Lm1ha2VGb3JtdWxhOyB9IH0pO1xudmFyIGFwaV84ID0gcmVxdWlyZShcIi4vYXBpXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwibWFrZVN5bmNUYWJsZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYXBpXzgubWFrZVN5bmNUYWJsZTsgfSB9KTtcbnZhciBhcGlfOSA9IHJlcXVpcmUoXCIuL2FwaVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm1ha2VUcmFuc2xhdGVPYmplY3RGb3JtdWxhXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBhcGlfOS5tYWtlVHJhbnNsYXRlT2JqZWN0Rm9ybXVsYTsgfSB9KTtcbnZhciBhcGlfMTAgPSByZXF1aXJlKFwiLi9hcGlcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJtYWtlUGFyYW1ldGVyXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBhcGlfMTAubWFrZVBhcmFtZXRlcjsgfSB9KTtcbnZhciBhcGlfMTEgPSByZXF1aXJlKFwiLi9hcGlcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJhdXRvY29tcGxldGVTZWFyY2hPYmplY3RzXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBhcGlfMTEuYXV0b2NvbXBsZXRlU2VhcmNoT2JqZWN0czsgfSB9KTtcbnZhciBhcGlfMTIgPSByZXF1aXJlKFwiLi9hcGlcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJtYWtlU2ltcGxlQXV0b2NvbXBsZXRlTWV0YWRhdGFGb3JtdWxhXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBhcGlfMTIubWFrZVNpbXBsZUF1dG9jb21wbGV0ZU1ldGFkYXRhRm9ybXVsYTsgfSB9KTtcbnZhciBhcGlfMTMgPSByZXF1aXJlKFwiLi9hcGlcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJzaW1wbGVBdXRvY29tcGxldGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFwaV8xMy5zaW1wbGVBdXRvY29tcGxldGU7IH0gfSk7XG4vLyBVUkwgaGVscGVycy5cbnZhciB1cmxfMSA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvdXJsXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZ2V0UXVlcnlQYXJhbXNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVybF8xLmdldFF1ZXJ5UGFyYW1zOyB9IH0pO1xudmFyIHVybF8yID0gcmVxdWlyZShcIi4vaGVscGVycy91cmxcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJqb2luVXJsXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiB1cmxfMi5qb2luOyB9IH0pO1xudmFyIHVybF8zID0gcmVxdWlyZShcIi4vaGVscGVycy91cmxcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ3aXRoUXVlcnlQYXJhbXNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVybF8zLndpdGhRdWVyeVBhcmFtczsgfSB9KTtcbi8vIFNWRyBjb25zdGFudHMuXG52YXIgc3ZnXzEgPSByZXF1aXJlKFwiLi9oZWxwZXJzL3N2Z1wiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlN2Z0NvbnN0YW50c1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc3ZnXzEuU3ZnQ29uc3RhbnRzOyB9IH0pO1xuLy8gR2VuZXJhbCBVdGlsaXRpZXNcbnZhciBlbnN1cmVfMSA9IHJlcXVpcmUoXCIuL2hlbHBlcnMvZW5zdXJlXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiYXNzZXJ0Q29uZGl0aW9uXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBlbnN1cmVfMS5hc3NlcnRDb25kaXRpb247IH0gfSk7XG52YXIgZW5zdXJlXzIgPSByZXF1aXJlKFwiLi9oZWxwZXJzL2Vuc3VyZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImVuc3VyZUV4aXN0c1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZW5zdXJlXzIuZW5zdXJlRXhpc3RzOyB9IH0pO1xudmFyIGVuc3VyZV8zID0gcmVxdWlyZShcIi4vaGVscGVycy9lbnN1cmVcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJlbnN1cmVOb25FbXB0eVN0cmluZ1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gZW5zdXJlXzMuZW5zdXJlTm9uRW1wdHlTdHJpbmc7IH0gfSk7XG52YXIgZW5zdXJlXzQgPSByZXF1aXJlKFwiLi9oZWxwZXJzL2Vuc3VyZVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImVuc3VyZVVucmVhY2hhYmxlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBlbnN1cmVfNC5lbnN1cmVVbnJlYWNoYWJsZTsgfSB9KTtcbnZhciBzY2hlbWFfMSA9IHJlcXVpcmUoXCIuL3NjaGVtYVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkF0dHJpYnV0aW9uTm9kZVR5cGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNjaGVtYV8xLkF0dHJpYnV0aW9uTm9kZVR5cGU7IH0gfSk7XG52YXIgc2NoZW1hXzIgPSByZXF1aXJlKFwiLi9zY2hlbWFcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJDdXJyZW5jeUZvcm1hdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2NoZW1hXzIuQ3VycmVuY3lGb3JtYXQ7IH0gfSk7XG52YXIgc2NoZW1hXzMgPSByZXF1aXJlKFwiLi9zY2hlbWFcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJEdXJhdGlvblVuaXRcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNjaGVtYV8zLkR1cmF0aW9uVW5pdDsgfSB9KTtcbnZhciBzY2hlbWFfNCA9IHJlcXVpcmUoXCIuL3NjaGVtYVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIkVtYWlsRGlzcGxheVR5cGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNjaGVtYV80LkVtYWlsRGlzcGxheVR5cGU7IH0gfSk7XG52YXIgc2NoZW1hXzUgPSByZXF1aXJlKFwiLi9zY2hlbWFcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJJbWFnZUNvcm5lclN0eWxlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzY2hlbWFfNS5JbWFnZUNvcm5lclN0eWxlOyB9IH0pO1xudmFyIHNjaGVtYV82ID0gcmVxdWlyZShcIi4vc2NoZW1hXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiSW1hZ2VPdXRsaW5lXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzY2hlbWFfNi5JbWFnZU91dGxpbmU7IH0gfSk7XG52YXIgc2NoZW1hXzcgPSByZXF1aXJlKFwiLi9zY2hlbWFcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJMaW5rRGlzcGxheVR5cGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNjaGVtYV83LkxpbmtEaXNwbGF5VHlwZTsgfSB9KTtcbnZhciBzY2hlbWFfOCA9IHJlcXVpcmUoXCIuL3NjaGVtYVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIlNjYWxlSWNvblNldFwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2NoZW1hXzguU2NhbGVJY29uU2V0OyB9IH0pO1xudmFyIHNjaGVtYV85ID0gcmVxdWlyZShcIi4vc2NoZW1hXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiVmFsdWVIaW50VHlwZVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2NoZW1hXzkuVmFsdWVIaW50VHlwZTsgfSB9KTtcbnZhciBzY2hlbWFfMTAgPSByZXF1aXJlKFwiLi9zY2hlbWFcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJWYWx1ZVR5cGVcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNjaGVtYV8xMC5WYWx1ZVR5cGU7IH0gfSk7XG52YXIgc2NoZW1hXzExID0gcmVxdWlyZShcIi4vc2NoZW1hXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiZ2VuZXJhdGVTY2hlbWFcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNjaGVtYV8xMS5nZW5lcmF0ZVNjaGVtYTsgfSB9KTtcbnZhciBzY2hlbWFfMTIgPSByZXF1aXJlKFwiLi9zY2hlbWFcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJtYWtlQXR0cmlidXRpb25Ob2RlXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzY2hlbWFfMTIubWFrZUF0dHJpYnV0aW9uTm9kZTsgfSB9KTtcbnZhciBzY2hlbWFfMTMgPSByZXF1aXJlKFwiLi9zY2hlbWFcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJtYWtlT2JqZWN0U2NoZW1hXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiBzY2hlbWFfMTMubWFrZU9iamVjdFNjaGVtYTsgfSB9KTtcbnZhciBzY2hlbWFfMTQgPSByZXF1aXJlKFwiLi9zY2hlbWFcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJtYWtlUmVmZXJlbmNlU2NoZW1hRnJvbU9iamVjdFNjaGVtYVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2NoZW1hXzE0Lm1ha2VSZWZlcmVuY2VTY2hlbWFGcm9tT2JqZWN0U2NoZW1hOyB9IH0pO1xudmFyIHNjaGVtYV8xNSA9IHJlcXVpcmUoXCIuL3NjaGVtYVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIm1ha2VTY2hlbWFcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHNjaGVtYV8xNS5tYWtlU2NoZW1hOyB9IH0pO1xudmFyIHNjaGVtYV8xNiA9IHJlcXVpcmUoXCIuL3NjaGVtYVwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIndpdGhJZGVudGl0eVwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gc2NoZW1hXzE2LndpdGhJZGVudGl0eTsgfSB9KTtcbi8vIEV4cG9ydHMgZm9yIGludGVybWVkaWF0ZSBlbnRpdGllcyB3ZSB3YW50IGluY2x1ZGVkIGluIHRoZSBUeXBlRG9jIGRvY3VtZW50YXRpb25cbi8vIGJ1dCBvdGhlcndpc2Ugd291bGRuJ3QgY2FyZSBhYm91dCBpbmNsdWRpbmcgYXMgdG9wLWxldmVsIGV4cG9ydHMgb2YgdGhlIFNES1xudmFyIGFwaV90eXBlc182ID0gcmVxdWlyZShcIi4vYXBpX3R5cGVzXCIpO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiVmFsaWRGZXRjaE1ldGhvZHNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIGFwaV90eXBlc182LlZhbGlkRmV0Y2hNZXRob2RzOyB9IH0pO1xuIiwgImltcG9ydCAqIGFzIGNvZGEgZnJvbSBcIkBjb2RhaHEvcGFja3Mtc2RrXCI7XG5cbmNvbnN0IHBhY2sgPSBjb2RhLm5ld1BhY2soe1xuICBuYW1lOiBcIkV2ZXJob3VyXCIsXG4gIGRlc2NyaXB0aW9uOiBcIkNvbm5lY3QgRXZlcmhvdXIgdGltZSB0cmFja2luZyB3aXRoIHlvdXIgQ29kYSBkb2NzXCIsXG4gIHZlcnNpb246IFwiMS4wLjBcIixcbiAgZm9ybXVsYU5hbWVzcGFjZTogXCJFdmVyaG91clwiLFxuICBuZXR3b3JrRG9tYWluczogW1wiYXBpLmV2ZXJob3VyLmNvbVwiXVxufSk7XG5cbi8vIENvbmZpZ3VyZSB1c2VyIGF1dGhlbnRpY2F0aW9uIGZvciBFdmVyaG91ciBBUEkga2V5XG5wYWNrLnNldFVzZXJBdXRoZW50aWNhdGlvbih7XG4gIHR5cGU6IGNvZGEuQXV0aGVudGljYXRpb25UeXBlLkhlYWRlckJlYXJlclRva2VuLFxuICBpbnN0cnVjdGlvbnNVcmw6IFwiaHR0cHM6Ly9ldmVyaG91ci5jb20vZGV2ZWxvcGVycyNhdXRoZW50aWNhdGlvblwiLFxuICBnZXRDb25uZWN0aW9uTmFtZTogYXN5bmMgZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICByZXR1cm4gXCJFdmVyaG91ciBBUElcIjtcbiAgfSxcbn0pO1xuXG4vLyBSZXF1aXJlZDogQWRkIGF0IGxlYXN0IG9uZSBmb3JtdWxhXG5wYWNrLmFkZEZvcm11bGEoe1xuICBuYW1lOiBcIkhlbGxvXCIsXG4gIGRlc2NyaXB0aW9uOiBcIkEgc2ltcGxlIHRlc3QgZm9ybXVsYVwiLFxuICBwYXJhbWV0ZXJzOiBbXSxcbiAgcmVzdWx0VHlwZTogY29kYS5WYWx1ZVR5cGUuU3RyaW5nLFxuICBleGVjdXRlOiBhc3luYyBmdW5jdGlvbiAoW10sIGNvbnRleHQpIHtcbiAgICByZXR1cm4gXCJIZWxsbyBmcm9tIEV2ZXJob3VyIVwiO1xuICB9LFxufSk7XG5cbmV4cG9ydCA9IHBhY2s7IiwgImltcG9ydCBwYWNrIGZyb20gJy4vcGFjayc7XG5leHBvcnQgPSBwYWNrOyAiXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBLHlIQUFBQSxVQUFBQyxTQUFBO0FBQUE7QUFrRUEsUUFBSUMsbUJBQWtCLGdDQUFTLE1BQU07QUFDcEMsVUFBSSxRQUFRLFFBQVc7QUFDdEIsZ0JBQU8sb0JBQUksS0FBSyxHQUFFLFFB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QUUsYUFBTyxVQUFVO0FBQUEsSUFBWSxFQUFFLENBQUM7QUFDcEgsUUFBSSxZQUFZO0FBQ2hCLFdBQU8sZUFBZUEsVUFBUyxnQkFBZ0IsRUFBRSxZQUFZLE1BQU0sS0FBSyxXQUFZO0FBQUUsYUFBTyxVQUFVO0FBQUEsSUFBYyxFQUFFLENBQUM7QUFHeEgsUUFBSSxjQUFjO0FBQ2xCLFdBQU8sZUFBZUEsVUFBUyxxQkFBcUIsRUFBRSxZQUFZLE1BQU0sS0FBSyxXQUFZO0FBQUUsYUFBTyxZQUFZO0FBQUEsSUFBbUIsRUFBRSxDQUFDO0FBQUE7QUFBQTs7O0FDbEhwSTtBQUFBLFlBQUFDLFVBQUFDLFNBQUE7QUFBQTtBQUFBO0FBQUEsZUFBc0I7QUFFdEIsUUFBTUMsUUFBWSxhQUFRO0FBQUEsTUFDeEIsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsU0FBUztBQUFBLE1BQ1Qsa0JBQWtCO0FBQUEsTUFDbEIsZ0JBQWdCLENBQUMsa0JBQWtCO0FBQUEsSUFDckMsQ0FBQztBQUdELElBQUFBLE1BQUssc0JBQXNCO0FBQUEsTUFDekIsTUFBVyx3QkFBbUI7QUFBQSxNQUM5QixpQkFBaUI7QUFBQSxNQUNqQixtQkFBbUIsZUFBZ0IsU0FBUztBQUMxQyxlQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0YsQ0FBQztBQUdELElBQUFBLE1BQUssV0FBVztBQUFBLE1BQ2QsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsWUFBWSxDQUFDO0FBQUEsTUFDYixZQUFpQixlQUFVO0FBQUEsTUFDM0IsU0FBUyxlQUFnQixDQUFDLEdBQUcsU0FBUztBQUNwQyxlQUFPO0FBQUEsTUFDVDtBQUFBLElBQ0YsQ0FBQztBQUVELElBQUFELFFBQUEsVUFBU0M7QUFBQTtBQUFBOzs7QUM5QlQ7QUFBQSxrQkFBaUI7QUFDakIsaUJBQVMsWUFBQUM7IiwKICAibmFtZXMiOiBbImV4cG9ydHMiLCAibW9kdWxlIiwgIk1lcnNlbm5lVHdpc3RlciIsICJleHBvcnRzIiwgIlBhY2tDYXRlZ29yeSIsICJBdXRoZW50aWNhdGlvblR5cGUiLCAiUG9zdFNldHVwVHlwZSIsICJGZWF0dXJlU2V0IiwgIlF1b3RhTGltaXRUeXBlIiwgIlN5bmNJbnRlcnZhbCIsICJleHBvcnRzIiwgIlR5cGUiLCAiUGFyYW1ldGVyVHlwZSIsICJDb25uZWN0aW9uUmVxdWlyZW1lbnQiLCAiTmV0d29ya0Nvbm5lY3Rpb24iLCAiUHJlY2FubmVkRGF0ZVJhbmdlIiwgImV4cG9ydHMiLCAiZXhwb3J0cyIsICJleHBvcnRzIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAiVmFsdWVUeXBlIiwgIlZhbHVlSGludFR5cGUiLCAiQ3VycmVuY3lGb3JtYXQiLCAiU2NhbGVJY29uU2V0IiwgIkVtYWlsRGlzcGxheVR5cGUiLCAiTGlua0Rpc3BsYXlUeXBlIiwgIkltYWdlT3V0bGluZSIsICJJbWFnZUNvcm5lclN0eWxlIiwgIkR1cmF0aW9uVW5pdCIsICJBdHRyaWJ1dGlvbk5vZGVUeXBlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImNsb25lIiwgInBhcmVudCIsICJkZXB0aCIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJjb25jYXR0eSIsICJzbGljeSIsICJFbXB0eSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJ1bmRlZmluZWQiLCAiZG9FdmFsIiwgInN0cmluZ1RvUGF0aCIsICJnZXRCYXNlSW50cmluc2ljIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImhhc1Byb3BlcnR5RGVzY3JpcHRvcnMiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiYXBwbHlCaW5kIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImNvbXBhY3RRdWV1ZSIsICJhcnJheVRvT2JqZWN0IiwgIm1lcmdlIiwgImVuY29kZSIsICJjb21wYWN0IiwgImlzUmVnRXhwIiwgImlzQnVmZmVyIiwgImNvbWJpbmUiLCAibWF5YmVNYXAiLCAiZXhwb3J0cyIsICJtb2R1bGUiLCAiaXNOb25OdWxsaXNoUHJpbWl0aXZlIiwgInN0cmluZ2lmeSIsICJ2YWx1ZSIsICJub3JtYWxpemVTdHJpbmdpZnlPcHRpb25zIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgIm5vcm1hbGl6ZVBhcnNlT3B0aW9ucyIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJleHBvcnRzIiwgImV4cG9ydHMiLCAibW9kdWxlIiwgImV4cG9ydHMiLCAiZXhwb3J0cyIsICJleHBvcnRzIiwgImV4cG9ydHMiLCAiZXhwb3J0cyIsICJTdmdDb25zdGFudHMiLCAiZXhwb3J0cyIsICJleHBvcnRzIiwgIm1vZHVsZSIsICJwYWNrIiwgInBhY2siXQp9Cg==
