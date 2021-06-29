// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Makefile Tools Tests
import * as path from 'path';

//import { runTests } from 'vscode-test';
//import * as tests from 'vscode-test';
import * as testRunner from 'vscode-test/out/runTest';

async function main(): Promise<void> {
    try {
        // The folder containing the Extension Manifest package.json
        // Passed to `--extensionDevelopmentPath`
        const extensionDevelopmentPath : string = path.resolve(__dirname, '../../../');

        // The path to the extension test script
        // Passed to --extensionTestsPath
        const extensionTestsPath : string = path.resolve(__dirname, './fakeSuite/index');

        // The path to the makefile repro (containing the root makefile and .vscode folder)
        const reproRootPath : string = path.resolve(extensionDevelopmentPath, "./src/test/fakeSuite/Repros/");

        // Download VS Code, unzip it and run the integration test
        let myOpt : testRunner.TestOptions = {
            extensionPath: extensionDevelopmentPath,
            additionalLaunchArgs: [
                "--disable-workspace-trust",
                "--disable-extensions"
            ],
            testRunnerPath: extensionTestsPath,
            testRunnerEnv: {
                "MAKEFILE_TOOLS_TESTING": "1",
                "WindowsSDKVersion": "12.3.45678.9\\"
            },
            testWorkspace: reproRootPath
        };
        await testRunner.runTests(myOpt);
    } catch (err) {
        console.error('Failed to run tests');
        process.exit(1);
    }
}

main();
