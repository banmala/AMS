interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    message?: string;
  }
  
  export default function ConfirmationModal({ isOpen, onClose, onConfirm, message }: ConfirmationModalProps) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#00000088]" onClick={()=>onClose()}>
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 transform transition-all scale-95 opacity-0 animate-fade-in" onClick={(event)=>{event.stopPropagation()}}>
          <h2 className="text-lg font-semibold mb-2">Confirm Delete</h2>
          <p className="text-gray-600">{message || "Are you sure you want to delete this item?"}</p>
          <div className="flex justify-end mt-4 space-x-2">
            <button 
              onClick={onClose} 
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button 
              onClick={onConfirm} 
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
  