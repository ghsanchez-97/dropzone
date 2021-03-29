import React from 'react';
import * as XLSX from 'xlsx';

function App() {
  const [highlighted, setHighlighted] = React.useState(false);
  const [users, setUsers] = React.useState([]);

  return (
    <div>
      <h1 className="text-center text-4xl">Import</h1>
      <div className={`border border-5 rounded-pill min-vw-100 shadow-lg p-3 mb-5 rounded text-center ${highlighted ? "border border-white bg-success text-white" : "border-info"}`}
      onDragEnter={() => {
        setHighlighted(true);
      }}
      onDragLeave={() => {
        setHighlighted(false);
      }}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) =>{
        e.preventDefault();
        setHighlighted(false);
        Array.from(e.dataTransfer.files).filter((file) => file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet").forEach(async(file) => {
          console.log(file);
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
        });
      }}
      >
        Drop Here
      </div>
      <ul>
        {users.map((user) =>(
          <li key={user.name}>
            <strong>{user.firstName}</strong>: {user.lastName}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
