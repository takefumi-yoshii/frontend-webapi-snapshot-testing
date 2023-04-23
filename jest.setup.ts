import "@testing-library/jest-dom";

import React from "react";
global.React = React;

const fetchPolifill = require("whatwg-fetch");

global.fetch = fetchPolifill.fetch;
global.Request = fetchPolifill.Request;
global.Headers = fetchPolifill.Headers;
global.Response = fetchPolifill.Response;
