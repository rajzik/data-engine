#!/bin/bash

set -e

if [ -n $GITHUB_TOKEN ]; then

  GH_PAGES_DIR=`pwd`/../circle-ci-bot-data-engine
  echo "machine github.com login data-engine-bot password $GITHUB_TOKEN" >~/.netrc
  git config --global user.name "Circle CI"
  git config --global user.email "circle.bot.jansilhan@gmail.com"

fi