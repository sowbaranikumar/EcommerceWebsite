import type { ReactNode } from "react";

interface ModalProps{
  isOpen:boolean;
  onClose:()=>void;
  title:string;
  children:ReactNode;
}

const Modal=({isOpen,onClose,title,children}:ModalProps)=>{
  if (!isOpen) return null;

  return(
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 backdrop-blur-sm" onClick={onClose}></div>
       <div className="bg-white rounded-lg w-[60vw] max-w-5xl max-h-[60vh] relative flex flex-col">
        
        <h2 className="text-xl font-semibold text-gray-500 px-2 py-2 border-b">{title}</h2>
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-white bg-gray-400 hover:text-gray"
        >
          ✕
        </button>

        <div className="p-6 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;


