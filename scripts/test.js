'use strict'

const path = require('path')
const spawn = require('cross-spawn')
const chalk = require('chalk')

const mocha = path.resolve(process.cwd(), 'node_modules', '.bin', 'mocha')

const args = [
  '--colors',
  !process.env.CI && (console.log(chalk.green.bold('Enabling watch mode')) || '--watch'),
  'src/**/*.spec.js'
].filter(Boolean)

spawn(mocha, args, {stdio: 'inherit'})
