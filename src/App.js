import React from 'react';
import * as XLSX from 'xlsx';
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'

function App() {
  const [highlighted, setHighlighted] = React.useState(false);
  const [users, setUsers] = React.useState([]);

  const getUpluadParams = ({ meta }) => { return {url: 'https://httpbin.org/post' }};
  const handleChangeStatus = ({meta, file}, status) => { console.log(status, meta, file.name)};
  const handleSubmit = (files) => {console.log(files.map(f => f.meta))};

  const sheet = (file) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload=(e)=>{
    const bufferArray = e.target.result;

    const wb = XLSX.read(bufferArray, {type:'array'});
    const wsname = wb.SheetNames[0];
    const ws = wb.Sheets[wsname];
    const data = XLSX.utils.sheet_to_json(ws, {header:true});
    console.log(data)
    setUsers((existing) => [...existing, ...data])
    }
    console.log(sheet.data)
  }

  return (
  //   <div>
  //     <h1 className="text-center text-4xl">Import</h1>
  //     <div className={`border border-5 rounded-pill min-vw-100 shadow-lg p-3 mb-5 rounded text-center ${highlighted ? "border border-white bg-success text-white" : "border-info"}`}
  //     onDragEnter={() => {
  //       setHighlighted(true);
  //     }}
  //     onDragLeave={() => {
  //       setHighlighted(false);
  //     }}
  //     onDragOver={(e) => {
  //       e.preventDefault();
  //     }}
  //     onDrop={(e) =>{
  //       e.preventDefault();
  //       setHighlighted(false);
  //       Array.from(e.dataTransfer.files).filter((file) => file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet").forEach(async(file) => {
  //         console.log(file.name);
  //         const fileReader = new FileReader();
  //         fileReader.readAsArrayBuffer(file);
    
  //         fileReader.onload=(e)=>{
  //           const bufferArray = e.target.result;
    
  //           const wb = XLSX.read(bufferArray, {type:'array'});
  //           const wsname = wb.SheetNames[0];
  //           const ws = wb.Sheets[wsname];
  //           const data = XLSX.utils.sheet_to_json(ws, {header:true});
  //           console.log(data)
  //           setUsers((existing) => [...existing, ...data])
  //         }
  //       });
  //     }}
  //     >
  //       Drop Here
  //     </div>
  //     <ul>{users.map((user) =>(
  //       <li key={user.email}>{user.firstName}</li>
  //     ))}</ul>
  //     <div className="d-flex flex-row-reverse bd-highlight justify-content-around">
  //       <button className="btn btn-success p-2 bd-highlight" onClick={() => postData()}>Upload</button>
  //     </div>
  //   </div>
    <Dropzone
      getUploadParams={getUpluadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
    />
  );
}

export default App;
