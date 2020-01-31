const core = require('@actions/core');
const github = require('@actions/github');

try {
    const command = core.getInput('run');
    console.log(`Command to execute: ${command}!`);
} catch (error) {
    core.setFailed(error.message);
}