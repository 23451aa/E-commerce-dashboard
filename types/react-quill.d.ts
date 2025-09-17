declare module 'react-quill' {
  import * as React from 'react';

  interface ReactQuillProps {
    value: string;
    onChange: (content: string, delta: any, source: string, editor: any) => void;
    placeholder?: string;
    theme?: string;
    modules?: any;
    formats?: string[];
    readOnly?: boolean;
    style?: React.CSSProperties;
    className?: string;
  }

  class ReactQuill extends React.Component<ReactQuillProps> {}
  export default ReactQuill;
}

