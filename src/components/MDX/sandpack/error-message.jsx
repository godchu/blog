/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

export function ErrorMessage({ error, ...props }) {
  const { message, title } = error;

  return (
    <div className="bg-white border-2 border-red-40 rounded-lg p-6" {...props}>
      <h2 className="text-red-40 text-xl mb-4">{title || 'Error'}</h2>
      <pre className="text-secondary whitespace-pre-wrap break-words leading-tight">{message}</pre>
    </div>
  );
}
