export const regexes = {
  // deno-lint-ignore camelcase
  const_statements: /version = ".+"/g,
  // deno-lint-ignore camelcase
  deps_drash: /drash@v[0-9.]+[0-9.]+[0-9]/g,
  // deno-lint-ignore camelcase
  deps_std: /std@[0-9.]+[0-9.]+[0-9]/g,
  // deno-lint-ignore camelcase
  egg_json: /"version": ".+"/,
  urls: /dmm@v[0-9\.]+[0-9\.]+[0-9\.]/g,
  // deno-lint-ignore camelcase
  yml_deno: /deno: \[".+"\]/g,
};

export const preReleaseFiles = [
  {
    filename: "./egg.json",
    replaceTheRegex: regexes.egg_json,
    replaceWith: `"version": "{{ thisModulesLatestVersion }}"`,
  },
];

export const bumperFiles = [];
