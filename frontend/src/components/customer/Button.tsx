import React from 'react';

interface ButtonProps
{
    type?:"button"| "submit"|"reset",
    disabled?:boolean,
    onClick?:()=>void,
    children:React.ReactNode;
}
const Button:React.FC<ButtonProps>=({
  type="button",
  onClick,
  disabled=false,
  children,
}) => {
  return (
    <div style={{display:"flex",justifyContent:"center"}}>
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        padding:"10px 16px",
        backgroundColor:disabled?"#ccc":"#2563eb",
        color:"white",
        border:"none",
        borderRadius:"6px",
        cursor:disabled?"not-allowed":"pointer",
      }}
    >
      {children}
    </button>
    </div>
  );
};

export default Button;
