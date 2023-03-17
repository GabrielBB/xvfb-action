const core = require('@actions/core');
const exec = require('@actions/exec');

async function main() {

    try {
        if (process.platform == "linux") {
            await exec.exec("sudo apt-get install -y xvfb");
        }

        const commands = core.getInput('run', { required: true }).split("\n");
        const directory = core.getInput('working-directory');
        const serverOptions = core.getInput('options');

        for (i in commands) {
            if (process.platform == "linux") {
                console.log('Command: ' + commands[i]);
                await runCommandWithXvfb(commands[i], directory, serverOptions);
            } else {
                await runCommand(commands[i], directory);
            }
        }
    }
    catch (error) {
        core.setFailed(error.message);
    }
}

async function runCommandWithXvfb(command, directory, options) {
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
