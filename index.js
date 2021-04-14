const core = require('@actions/core');
const exec = require('@actions/exec');

async function main() {

    try {
        const command = core.getInput('run', { required: true });
        const directory = core.getInput('working-directory');
        const serverOptions = core.getInput('options');

        if (process.platform == "linux") {
            await runCommandWithXvfb(command, directory, serverOptions);
        } else {
            await runCommand(command, directory);
        }
    }
    catch (error) {
        core.setFailed(error.message);
    }
}

async function runCommandWithXvfb(command, directory, options) {
    await exec.exec("sudo apt-get install xvfb");
    const optionsArgument = options ? `-s "${options}"` : '';
    command = `xvfb-run --auto-servernum ${optionsArgument} ${command}`;

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
    await (directory ? exec.exec(command, [], {cwd: directory}) : exec.exec(command));
}

main();
