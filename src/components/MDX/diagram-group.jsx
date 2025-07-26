/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

export function DiagramGroup({ children }) {
  return (
    <div className="flex flex-col sm:flex-row py-2 sm:p-0 sm:space-y-0 justify-center items-start sm:items-center w-full">
      {children}
    </div>
  );
}

export default DiagramGroup;
