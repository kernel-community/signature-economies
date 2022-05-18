const styles = {
  green: {
    main: `w-32 px-4 py-2 bg-green-600 shadow shadow-green-300 transition-all hover:shadow-md hover:text-green-50 hover:shadow-green-500 text-green-300 border-2 border-transparent rounded-md cursor-pointer flex justify-center`,
    disabled: `w-32 px-4 py-2 bg-gray-600 shadow shadow-green-300 transition-all hover:shadow-md hover:text-green-50 hover:shadow-green-500 text-green-300 border-2 border-transparent rounded-md cursor-wait flex justify-center`
  },
  basic: {
    main: `w-32 px-4 py-2 border-2 border-gray-200 rounded-md hover:border-gray-400 transition-all cursor-pointer flex justify-center`,
    disabled: `w-32 px-4 py-2 border-2 border-gray-200 rounded-md hover:border-gray-400 transition-all cursor-wait flex justify-center`
  }
}
const ExecutionButton = ({
  exec, disabled = false, text = 'Mint', selectStyle = 'green'
}) => {
  return (
    <div
      className ={
        disabled ? styles[selectStyle].disabled : styles[selectStyle].main
      }
      onClick={exec}>
      {text}
    </div>
  )
}
export default ExecutionButton;