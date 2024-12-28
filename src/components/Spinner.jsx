function Spinner({ onSize, containerPosition = "" }) {
  return (
    <div className={`absolute ${containerPosition}`}>
      <div
        className={` rounded-full  border-t-4 border-b-4 border-main animate-spin`}
        style={{ width: `${onSize}px`, height: `${onSize}px` }}
      ></div>
    </div>
  );
}

export default Spinner;
