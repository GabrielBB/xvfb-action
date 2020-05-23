const core = require('@actions/core');
const exec = require('@actions/exec');

async function main() {

    try {
        const command = core.getInput('run', { required: true });
        const directory = core.getInput('working-directory');

        if (process.platform == "linux") {
            await runCommandWithXvfb(command, directory);
        } else {
            await runCommand(command, directory);
        }
    }
    catch (error) {
        core.setFailed(error.message);
    }
}

async function runCommandWithXvfb(command, directory) {
    await exec.exec("sudo apt-get install xvfb");
    command = `xvfb-run --auto-servernum ${command}`;

    try {
        await runCommand(command, directory)
    } finally {
        await cleanUpXvfb();
    }
}

async function cleanUpXvfb() {
    try {
        await exec.exec("bash", [`${__dirname}/cleanup.sh`]);
    } catch {

    }
}

async function runCommand(command, directory) {
    await directory ? exec.exec(command, [], {cwd: directory}) : exec.exec(command);
}

main();