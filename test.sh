#!/bin/bash

karma start &
PID=$!
wait PID

protractor tests/e2e/config.js

kill -9 $PID
exit 0