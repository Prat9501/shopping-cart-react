import React, { useState, useRef } from 'react';
import CartIcon from '../supermarket.svg';
import useOnClickOutside from 'use-onclickoutside';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  useOnClickOutside(modalRef, () =>{
    if(isOpen === true) setIsOpen(false);
  })

  return (
    <header>
      <div className="container">
        <div className="cart-button">
          <button onClick={() => setIsOpen(true)}>
            <img src={CartIcon} width="30" />({0})
          </button>

          <div ref={modalRef} className='cart-modal' style={{display: isOpen? 'block' : 'none'}}>
            Cart goes hers
          </div>
        </div>
      </div>
    </header>
  );
}