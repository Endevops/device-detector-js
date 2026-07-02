import fs from 'node:fs';
import path from 'node:path';
import { glob } from 'glob';
import * as YAML from 'js-yaml';

const loadYaml = filepath => {
  return YAML.load(fs.readFileSync(filepath, 'utf8'), {
    schema: YAML.FAILSAFE_SCHEMA,
  });
};

const ensureDirectoryExistence = filePath => {
  const dirname = path.dirname(filePath);

  if (fs.existsSync(dirname)) return;

  ensureDirectoryExistence(dirname);

  fs.mkdirSync(dirname);
};

const files = await glob('**/*.yml', { cwd: './node_modules/device-detector/' });
for (const file of files) {
  const src = path.join('./node_modules/device-detector', file);
  const dest = path.join('./src/fixtures', file.replace(RegExp('.yml$', 'i'), '.json'));

  ensureDirectoryExistence(dest);

  const fixture = loadYaml(src);
  const json = JSON.stringify(fixture, null, 2);

  fs.writeFileSync(dest, json);
}
