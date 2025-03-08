import React, { useState } from "react";
import ConfirmationModal from "./Modal";

interface TableProps {
  columns: string[];
  data?: any[];
  onDetail:(id:number)=>void
  onEdit:(id:number)=>void
  onDelete:(id:number)=>void
}

const Table: React.FC<TableProps> = ({ columns, data, onDetail, onDelete, onEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toDelete,setToDelete] = useState(0)
  const handleDelete = (id:number) => {
    onDelete(id)
    setIsModalOpen(false);
  };
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th key="SN" className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
              S.N
            </th>
            {columns.map((col) => (
              <th key={col} className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
                {col}
              </th>
            ))}
            <th key="action" className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50 border-b" onClick={()=>onDetail(row.id)}>
              <td key="SN" className="px-6 py-4">
                  {rowIndex+1}
                </td>
              {columns.map((col) => (
                <td key={col} className="px-6 py-4">
                  {row[col]}
                </td>
              ))}
              <td key="Action" className="px-6 py-4 flex gap-4">
                <button 
                  onClick={(event)=>{event.stopPropagation();onEdit(row.id)}} 
                  className="border hover:border-blue-300 px-3 py-1 rounded-md"
                >Edit</button>
                <button 
                  onClick={(e)=>{e.stopPropagation();setToDelete(row.id);setIsModalOpen(true)}} 
                  className="border hover:border-red-300 px-3 py-1 rounded-md"
                >Delete</button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onConfirm={()=>handleDelete(toDelete)}
        message="Do you really want to delete this item? This action cannot be undone."
      />
    </div>
  );
};

export default Table;
