import { useEffect, useState } from 'react';

export const useSandpackLint = () => {
  const [lintErrors, setLintErrors] = useState([]);
  const [lintExtensions, setLintExtensions] = useState([]);
  useEffect(() => {
    const loadLinter = async () => {
      const { linter } = await import('@codemirror/lint');
      const onLint = linter(async (props) => {
        // This is intentionally delayed until CodeMirror calls it
        // so that we don't take away bandwidth from things loading early.
        const { runESLint } = await import('./run-eslint');
        const editorState = props.state.doc;
        let { errors, codeMirrorErrors } = runESLint(editorState);
        // Ignore parsing or internal linter errors.
        const isReactRuleError = (error) => error.ruleId !== undefined;
        setLintErrors(errors.filter(isReactRuleError));
        return codeMirrorErrors.filter(isReactRuleError);
      });
      setLintExtensions([onLint]);
    };

    loadLinter();
  }, []);
  return { lintErrors, lintExtensions };
};
