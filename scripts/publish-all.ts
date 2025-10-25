import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import { argv } from "bun";

const names = argv.slice(2);

const packagesDir = join(process.cwd(), "packages");

const dirs = readdirSync(packagesDir).filter((f) => {
  const full = join(packagesDir, f);
  return statSync(full).isDirectory();
});

for (const dir of dirs) {
  if (names.length && !names.includes(dir)) continue;
  const pkgPath = join(packagesDir, dir);
  console.log(`🚀 Publicando ${dir}...`);

  // Build antes de publicar
  spawnSync("bun", ["run", "build"], {
    cwd: pkgPath,
    stdio: "inherit",
  });

  // Publica con npm (más confiable que bun publish)
  const result = spawnSync("npm", ["publish", "--access", "public"], {
    cwd: pkgPath,
    stdio: "inherit",
  });

  if (result.status === 0) {
    console.log(`✅ ${dir} publicado con éxito`);
  } else {
    console.log(`❌ Error publicando ${dir}`);
  }
}
