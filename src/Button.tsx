import React from 'react';


type ButtonProps = {
  style: React.CSSProperties;
  children?: React.ReactNode;
  setcount?: React.Dispatch<React.SetStateAction<number>>;
};

function Button({ style, children, setcount }: ButtonProps) {
  return(
    <button style = {style} onClick={() => setcount && setcount(prev => prev + 1)}>
      {children}
    </button>
  );
}


export default Button;