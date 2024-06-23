import React from 'react'
import { createPortal } from 'react-dom'
import { AiOutlineClose } from 'react-icons/ai'

const Modal = ({isOpen,onClose,children}) => {
  return createPortal(
    <>
      {isOpen && (
    <>
      <div className="m-auto relative z-50 bg-white min-h-[200px] 
      max-w-[30%] p-4">
        <div className='justify-end flex'>
          <AiOutlineClose onClick={onClose}
          className='self-end text-2xl'/>
        </div>
        {children}
      </div>
      <div
      onClick={onClose}
      className="backdrop-blur absolute top-0 z-40 h-screen w-screen"
      />
    </>)}
    </>,document.getElementById("modal-root"))
}

export default Modal