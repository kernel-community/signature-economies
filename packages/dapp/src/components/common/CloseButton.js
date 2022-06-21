const CloseButton = ({ exec, className }) => {
  return (
    <div
      onClick={exec}
      className={`text-gray-300 hover:text-gray-800 transition-all cursor-pointer ${className}`}
    >
      <svg
        width='26'
        height='26'
        strokeWidth='1.5'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M6.75827 17.2426L12.0009 12M17.2435 6.75736L12.0009 12M12.0009 12L6.75827 6.75736M12.0009 12L17.2435 17.2426'
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </div>
  )
}
export default CloseButton
