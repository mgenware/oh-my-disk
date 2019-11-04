#!/usr/bin/env node

import * as disk from 'diskusage';
import * as os from 'os';
import * as util from 'util';
import { exec } from 'child_process';
const execAsync = util.promisify(exec);
const args = process.argv.slice(2);

function getArg(idx: number, name: string): string {
  if (idx >= args.length || !args[idx]) {
    throw new Error(`Missing required argument "${name}"`);
  }
  return args[idx];
}

const threshold = parseInt(getArg(0, 'threshold'), 10);
if (!threshold) {
  throw new Error(`threshold must be greater than 0, got "${threshold}".`);
}
const cmd = getArg(1, 'cmd');

(async () => {
  const path = os.platform() === 'win32' ? 'c:' : '/';
  const { free } = await disk.check(path);

  console.log(`Deciding to run command "${cmd}"`);
  if (free < threshold) {
    console.log(`${free} < ${threshold}, running command..."`);
    const { stdout, stderr } = await execAsync(cmd);
    if (stdout) {
      console.log(stdout);
    }
    if (stderr) {
      console.log(
        `An error happened when running command "${cmd}"\n${stderr}\n`,
      );
    }
  } else {
    console.log(`${free} >= ${threshold}, no action taken.`);
  }
})();
