const fs = require('fs');
const runner = require('unity-git-commit').runner;
try {
    console.log(__dirname);
    let message = fs.readFileSync('./.git/COMMIT_EDITMSG', 'utf-8');
    // const lines = message.split('\n');
    // if (!lines[lines.length - 1]) {
    //     lines.pop();
    // }
    // message = lines.join('\n');
    // runner(message);
} catch (e) {
    console.log('检测程序运行出错...', e);
}