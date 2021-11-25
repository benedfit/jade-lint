module.exports = createTest;

const assert = require('assert');

function createTest(linter, fixturesPath) {
	describe('validateExtensions', () => {
		describe('true', () => {
			before(() => {
				linter.configure({ validateExtensions: true });
			});

			it('should report include no extensions', () => {
				assert.equal(linter.checkString('include a').length, 1);
			});

			it('should report include `.jade` extension', () => {
				assert.equal(linter.checkString('include a.jade').length, 1);
			});

			it('should not report raw include extensions', () => {
				assert.equal(linter.checkString('include a.txt').length, 0);
			});

			it('should not report include `.pug` extension', () => {
				assert.equal(linter.checkString('include a.pug').length, 0);
			});

			it('should report extends no extensions', () => {
				assert.equal(linter.checkString('extends a').length, 1);
			});

			it('should report extends `.jade` extension', () => {
				assert.equal(linter.checkString('extends a.jade').length, 1);
			});

			it('should report other extends extensions', () => {
				assert.equal(linter.checkString('extends a.txt').length, 1);
			});

			it('should not report extends `.pug` extension', () => {
				assert.equal(linter.checkString('extends a.pug').length, 0);
			});

			it('should report multiple errors found in file', () => {
				const result = linter.checkFile(
					fixturesPath + 'validate-extensions.pug'
				);

				assert.equal(result.length, 5);
				assert.equal(result[0].code, 'PUG:LINT_VALIDATEEXTENSIONS');
				assert.equal(result[0].line, 1);
				assert.equal(result[0].column, 9);
				assert.equal(result[1].line, 2);
				assert.equal(result[2].line, 5);
				assert.equal(result[3].line, 6);
				assert.equal(result[4].line, 7);
			});
		});
	});
}
