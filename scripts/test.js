'use strict'

const path = require('path')
const spawn = require('cross-spawn')
const chalk = require('chalk')

const ava = path.resolve(process.cwd(), 'node_modules', '.bin', 'ava')

const args = [
  '--colors',
  '--require',
  'babel-register',
  !process.env.CI && (console.log(chalk.green.bold('Enabling watch mode')) || '--watch'),
  'src/**/*.spec.js'
].filter(Boolean)

spawn(ava, args, {stdio: 'inherit'})
