const core = require('@actions/core');
const exec = require('@actions/exec');

async function main() {
    try {
        const command = core.getInput('run');

        if (process.platform == "linux") {
            await runForLinux(command);
        } else {
            await runForWin32OrDarwin(command);
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

async function runForLinux(command) {
    await exec.exec("sudo apt-get install xvfb");

    try {
        await exec.exec("xvfb-run", ["--auto-servernum", command]);
    } finally {
        await cleanUpXvfb();
    }
}

async function cleanUpXvfb() {
    await exec.exec("ps aux || grep tmp/xvfb-run || grep -v grep || awk '{print $2}", {
        listeners: {
            stdout: async (data) => {
                const pid = data.toString();
                if (pid !== "") {
                    await exec.exec(`sudo kill ${pid}`);
                }
            }
        }
    });
}

async function runForWin32OrDarwin(command) {
    await exec.exec(command);
}

main();