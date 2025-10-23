import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { argv } from "bun";

const name = argv[2];
if (!name) {
  console.error("❌  Debes pasar el nombre del paquete: bun run new nombre");
  process.exit(1);
}

const dir = join("packages", name);
mkdirSync(join(dir, "src"), { recursive: true });

const pkg = {
  name: `@onielsan/${name}`,
  version: "0.1.0",
  main: "dist/index.js",
  types: "dist/index.d.ts",
  type: "module",
  files: ["dist"],
  scripts: {
    build: "tsup ./src/index.ts",
    test: "bun test",
  },
  publishConfig: {
    access: "public",
    registry: "https://registry.npmjs.org/",
  },
};

writeFileSync(join(dir, "package.json"), JSON.stringify(pkg, null, 2));
writeFileSync(
  join(dir, "src/index.ts"),
  `export const ${name} = () => "${name} package";\n`
);

console.log(`✅ Paquete @onielsan/${name} creado en ${dir}`);
