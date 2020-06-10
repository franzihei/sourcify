const chai = require('chai');
const chaiExec = require("@jsdevtools/chai-exec");

chai.use(chaiExec);

describe("CLI test", () => {
    it("should ask for arguments", () => {
        const myCLI = chaiExec('node dist/sourcify.js');
        chai.expect(myCLI).stderr.to.contain("Missing required arguments: chain, address");
        chai.expect(myCLI).exitCode.to.equal(1);
    })
    it("should ask for address", () => {
        const myCLI = chaiExec('node dist/sourcify.js -c');
        chai.expect(myCLI).stderr.to.contain("Missing required argument: address");
        chai.expect(myCLI).exitCode.to.equal(1);
    })
    it("should ask for chain", () => {
        const myCLI = chaiExec('node dist/sourcify.js -a');
        chai.expect(myCLI).stderr.to.contain("Missing required argument: chain");
        chai.expect(myCLI).exitCode.to.equal(1);
    })
    it("should show help", () => {
        const myCLI = chaiExec('node dist/sourcify.js --help');
        chai.expect(myCLI).to.have.stdout.that.matches(/^Options:\n\s*--help\s*Show help\s*\[boolean\]\n\s*--version\s*Show version number\s*\[boolean\]/);
        chai.expect(myCLI).exitCode.to.equal(0);
    })
    it("should show version number", () => {
        const myCLI = chaiExec('node dist/sourcify.js --version');
        chai.expect(myCLI).to.have.stdout.that.matches(/^\d{1,}.\d{1,}.\d{1,}/);
        chai.expect(myCLI).exitCode.to.equal(0);
    })
    it("should pass verification (existing sourcecode)", () => {
        const myCLI = chaiExec('node dist/sourcify.js -c 1 -a "0xfff0f5801a9e13426c306455A3BcC5EF3e9BC979"');
        chai.expect(myCLI).to.have.stdout.that.contains("perfect");
        chai.expect(myCLI).exitCode.to.equal(0);
    })
    it("should pass verification (upload files)", () => {
        const myCLI = chaiExec('node dist/sourcify.js -c 1 -a "0xfff0f5801a9e13426c306455A3BcC5EF3e9BC979" -f "testcontracts/ERC20Standard.sol" "testcontracts/metadata.json"');
        chai.expect(myCLI).to.have.stdout.that.contains("perfect");
        chai.expect(myCLI).exitCode.to.equal(0);
    })
    it("should say that address is not found", () => {
        const myCLI = chaiExec('node dist/sourcify.js -c 1 -a "0xfff0f5801a9e13426c306455A3BcC5EF3e9BC978"');
        chai.expect(myCLI).to.have.stdout.that.contains("Address for specified chain not found in repository");
        chai.expect(myCLI).exitCode.to.equal(0);
    })
})
