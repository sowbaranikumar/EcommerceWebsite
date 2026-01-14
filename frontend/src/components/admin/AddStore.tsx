import type {ReactNode} from "react";

interface ModalProps{
    isOpen:boolean;
    onClose:()=>void;
    title:string;
    children:ReactNode;
}

const AddStore=({isOpen,onClose,title,children}:ModalProps)=>{
    if (!isOpen) 
    return null;

    return(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
        className="absolute inset-0 backdrop-blur-sm"
        onClick={onClose}
        ></div>

      
      <div className="relative bg-white rounded-lg w-96 p-6 z-10">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-gray-400 rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-700"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
    );
};

export default AddStore;


