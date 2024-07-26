// src/components/InputComponent.jsx


const Input = () => {
  return (
    <div className="w-[210px] h-[50px] flex items-center justify-center bg-gradient-to-b from-blue to-blue-100 rounded-[30px] overflow-hidden cursor-pointer shadow-[2px_2px_10px_rgba(0,0,0,0.075)]">
      <input
        placeholder="Search.."
        id="input"
        className="w-[200px] h-[40px] border-none outline-none caret-[#ff5100] bg-white rounded-[30px] pl-[15px] tracking-wide text-[#131313] text-[13.4px]"
        name="text"
        type="text"
      />
    </div>
  );
};

export default Input;
