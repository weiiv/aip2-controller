#!/usr/bin/env bash

set -o allexport
source .env
set +o allexport

npm run migrate
npm run start
