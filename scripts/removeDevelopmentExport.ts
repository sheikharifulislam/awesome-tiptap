import { existsSync, renameSync, writeFileSync } from 'fs';
import { resolve } from 'path/posix';

const backupFilename = 'package.backup.json';

async function main() {
  const cwd = process.cwd();
  const sourcePath = resolve(cwd, 'package.json');
  const backupPath = resolve(cwd, backupFilename);
  if (process.argv.includes('--restore')) {
    return restore({
      sourcePath,
      backupPath,
    });
  }
  await clean({
    sourcePath,
    backupPath,
  });
}

async function clean(options: { sourcePath: string; backupPath: string }) {
  const packageJson = (await import(options.sourcePath)).default;
  let changed = false;
  // Remove development exports
  if (packageJson.exports) {
    for (const key in packageJson.exports) {
      if (packageJson.exports[key]['development']) {
        delete packageJson.exports[key]['development'];
        changed = true;
      }
    }
  }
  if (changed) {
    await backup(options);
    writeFileSync(options.sourcePath, `${JSON.stringify(packageJson, null, 2)}\n`);
    console.log('\n✓ package.json cleaned successfully');
    console.log(`✓ Backup created at ${backupFilename}`);
  } else {
    console.log('No changes needed');
  }
}

async function backup({
  sourcePath,
  backupPath,
}: {
  sourcePath: string;
  backupPath: string;
}) {
  renameSync(sourcePath, backupPath);
}

async function restore({
  sourcePath,
  backupPath,
}: {
  sourcePath: string;
  backupPath: string;
}) {
  const exists = existsSync(backupPath);
  console.log({ exists });
  if (exists) {
    renameSync(backupPath, sourcePath);
    console.log('✓ package.json restored from backup');
  } else {
    console.log('✗ No backup file found');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
