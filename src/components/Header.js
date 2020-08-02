import React, { useState, useRef } from 'react';
import CartIcon from '../supermarket.svg';
import useOnClickOutside from 'use-onclickoutside';
import { useCart } from '../contexts/use-cart';
import Cart from './Cart';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const {cart} = useCart();
  useOnClickOutside(modalRef, () =>{
    if(isOpen === true) setIsOpen(false);
  })

  return (
    <header>
      <div className="container">
        <div className="cart-button">
          <button onClick={() => setIsOpen(true)}>
            <img src={CartIcon} width="30" />({cart.length})
          </button>

          <div ref={modalRef} className='cart-modal' style={{display: isOpen? 'block' : 'none'}}>
            <Cart />
          </div>
        </div>
      </div>
    </header>
  );
}