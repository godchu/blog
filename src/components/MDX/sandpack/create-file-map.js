// /*
//  * Copyright (c) Facebook, Inc. and its affiliates.
//  */

// export const AppJSPath = `/src/App.js`;
// export const StylesCSSPath = `/src/styles.css`;
// export const SUPPORTED_FILES = [AppJSPath, StylesCSSPath];

// export const createFileMap = (codeSnippets) => {
//   return codeSnippets.reduce((result, codeSnippet) => {
//     console.log({ codeSnippet });

//     if (codeSnippet.type.mdxName !== 'pre' && codeSnippet.type !== 'pre') {
//       return result;
//     }
//     const { props } = codeSnippet.props.children;
//     let filePath; // path in the folder structure
//     let fileHidden = false; // if the file is available as a tab
//     let fileActive = false; // if the file tab is shown by default

//     if (props.meta) {
//       const [name, ...params] = props.meta.split(' ');
//       filePath = '/' + name;
//       if (params.includes('hidden')) {
//         fileHidden = true;
//       }
//       if (params.includes('active')) {
//         fileActive = true;
//       }
//     } else {
//       if (props.className === 'language-js') {
//         filePath = AppJSPath;
//       } else if (props.className === 'language-css') {
//         filePath = StylesCSSPath;
//       } else {
//         throw new Error(`Code block is missing a filename: ${props.children}`);
//       }
//     }

//     if (result[filePath]) {
//       throw new Error(`File ${filePath} was defined multiple times. Each file snippet should have a unique path name`);
//     }
//     result[filePath] = {
//       code: props.children || '',
//       hidden: fileHidden,
//       active: fileActive,
//     };

//     return result;
//   }, {});
// };

export const createFileMap = (codeSnippets) => {
  return codeSnippets.reduce((result, snippet) => {
    const maybeCode = snippet?.props?.children;
    const codeProps = maybeCode?.props;

    // Skip if it doesn't look like a code block
    if (!codeProps?.className?.startsWith('language-')) return result;

    let filePath;
    let fileHidden = false;
    let fileActive = false;

    if (codeProps.meta) {
      const [name, ...params] = codeProps.meta.split(' ');
      filePath = '/' + name;
      fileHidden = params.includes('hidden');
      fileActive = params.includes('active');
    } else {
      if (codeProps.className === 'language-js') filePath = '/src/App.js';
      else if (codeProps.className === 'language-css') filePath = '/src/styles.css';
      else throw new Error(`Missing filename for ${codeProps.children}`);
    }

    result[filePath] = {
      code: codeProps.children || '',
      hidden: fileHidden,
      active: fileActive,
    };

    return result;
  }, {});
};

export const AppJSPath = `/src/App.js`;
export const StylesCSSPath = `/src/styles.css`;
export const SUPPORTED_FILES = [AppJSPath, StylesCSSPath];
