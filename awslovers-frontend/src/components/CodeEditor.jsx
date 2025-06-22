import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-text';
import 'ace-builds/src-noconflict/theme-github';

export default function CodeEditor({ value, onChange }) {
  return (
    <AceEditor
      mode="text"
      theme="github"
      width="100%"
      height="300px"
      value={value}
      onChange={onChange}
      setOptions={{ useWorker: false }}
    />
  );
}
