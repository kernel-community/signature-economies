import { motion } from 'framer-motion'
import Spinner from './Spinner'
const styles = {
  green: {
    main: 'sm:w-32 sm:px-4 sm:py-2 w-24 px-2 py-1 bg-green-600 shadow shadow-green-300 transition-all hover:shadow-md hover:text-green-50 hover:shadow-green-500 text-green-300 border-2 border-transparent rounded-md cursor-pointer flex justify-center',
    disabled: 'sm:w-32 sm:px-4 sm:py-2 w-24 px-2 py-1 bg-gray-600 shadow shadow-green-300 transition-all hover:shadow-md hover:text-green-50 hover:shadow-green-500 text-green-300 border-2 border-transparent rounded-md cursor-wait flex justify-center'
  },
  basic: {
    main: 'sm:w-32 sm:px-4 sm:py-2 w-24 px-2 py-1 border-2 border-gray-200 rounded-md hover:border-gray-400 transition-all cursor-pointer flex justify-center',
    disabled: 'sm:w-32 sm:px-4 sm:py-2 w-24 px-2 py-1 border-2 border-gray-200 rounded-md hover:border-gray-400 transition-all cursor-wait flex justify-center'
  },
  big: {
    main: 'select-none text-center border-gray-600 sm:px-4 py-2 px-2 sm:w-64 border-2 rounded-md hover:border-black font-redaction cursor-pointer text-sm sm:text-base',
    disabled: 'bg-gray-300 select-none text-center border-gray-600 sm:px-4 py-2 px-2 sm:w-64 border-2 rounded-md hover:border-black font-redaction text-sm sm:text-base'
  }
}

const getClassNames = ({
  selectStyle,
  fixed,
  disabled,
  bringToFront
}) => {
  let c = styles[selectStyle].main
  if (disabled) {
    c = styles[selectStyle].disabled
  }
  if (fixed) {
    c += ` fixed ${fixed}`
  }
  if (bringToFront) {
    c += ' z-50'
  }
  return c.toString()
}

const ExecutionButton = ({
  exec,
  disabled = false,
  text = 'Mint',
  selectStyle = 'green',
  tween = false,
  fixed = false,
  bringToFront = false,
  loading = false,
  isError = false
}) => {
  if (!tween) {
    return (
      <>
        <div
          className={getClassNames({ selectStyle, fixed, disabled, bringToFront })}
          onClick={exec}
        >
          {loading ? <Spinner /> : ''}
          {text}
        </div>
        {isError ? <span className='text-red-600 font-garamond text-lg'>there was an error</span> : <></>}
      </>
    )
  } else if (tween) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.2, type: 'tween' }}
        onClick={exec}
        className={getClassNames({ selectStyle, fixed, disabled, bringToFront })}
      >
        {loading ? <Spinner /> : ''}
        {text}
      </motion.div>
    )
  }
}
export default ExecutionButton
