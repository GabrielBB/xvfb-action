#!/bin/bash
#author Bret Comnes
SUDO_PREFIX=${1:+sudo}

kill_xvfb () {
    local xvfb_pids=`ps aux | grep tmp/xvfb-run | grep -v grep | awk '{print $2}'`
    if [ "$xvfb_pids" != "" ]; then
        echo "Killing the following xvfb processes: $xvfb_pids"
        $SUDO_PREFIX kill $xvfb_pids
    else
        echo "No xvfb processes to kill"
    fi
}

kill_xvfb