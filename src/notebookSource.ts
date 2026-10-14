declare const __NOTEBOOK_REF__: string

export const notebookSourceRef = typeof __NOTEBOOK_REF__ === 'undefined' ? 'main' : __NOTEBOOK_REF__
