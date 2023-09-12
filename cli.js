#!/usr/bin/env node
const {mdLinks} = require('./index.js');
const args = process.argv.slice(2);
const filePath = args[0];


const options = {
    validate: args.includes('--validate') || args.includes('-v'),
    stats: args.includes('--stats') || args.includes('-s')
};
    mdLinks(filePath, options)
    .then(links => {
            console.log(links);

        })
        .catch(error => {
            console.error(error);
        });
