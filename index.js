const core = require('@actions/core');
const exec = require('@actions/exec');

try {
    const command = core.getInput('run');
    
    exec.exec("sudo apt-get install xvfb");
    exec.exec("xvfb-run", ["--auto-servernum", command]);
} catch (error) {
    core.setFailed(error.message);
}