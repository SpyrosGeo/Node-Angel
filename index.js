#!/usr/bin/env node
const fs = require('fs');
const debounce = require('lodash.debounce');
const chokidar = require('chokidar');
const prog = require('caporal');
const { spawn } = require('child_process');
const chalk = require('chalk');

prog
    .version('1.0.0')
    .argument('[filename]','Name of a file to execute')
    .action(async({ filename }) =>{
        const name = filename || 'index.js';
        try{

            await fs.promises.access(name);
        }catch(err){
            throw new Error(`Could not locate file ${name} `)
        }

        let proc;
        const start = debounce(() =>{
            if(proc){
                proc.kill;
                console.log('terminated!')
            }
            console.log(chalk.blue(`${name} is praying to God...` ))
           proc =  spawn('node',[name],{stdio:'inherit'});
        },550)

        chokidar.watch('.')
            .on('add',start)
            .on('change',start)
            .on('unlink',start);
    })
prog.parse(process.argv)
