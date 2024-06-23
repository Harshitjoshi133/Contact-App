import React from 'react'
import { createPortal } from 'react-dom'
import { AiOutlineClose } from 'react-icons/ai'

const Modal = ({isOpen,onClose,children}) => {
  return createPortal(
    <>
      {isOpen && (
    <div className="grid place-items-center backdrop-blur absolute top-0 z-40 h-screen w-screen">
      <div className="m-auto relative z-50 bg-white min-h-[200px] 
      min-w-[30%] p-4">
        <div className='justify-end flex'>
          <AiOutlineClose onClick={onClose}
          className='cursor-pointer self-end text-2xl'/>
        </div>
        {children}
      </div>
    </div>)}
    </>,document.getElementById("modal-root"))
}

export default Modal