module.exports = {
    extends: ['@commitlint/cli', '@commitlint/config-conventional'], // https://commitlint.js.org/#/reference-rules
    rules: {
        'type-enum': [2, 'always', ['build', 'chore', 'ci', 'docs', 'feat', 'fix', 'perf', 'refactor', 'revert', 'style', 'test']],
        'subject-case': [2, 'always', 'sentence-case']
    }
}
