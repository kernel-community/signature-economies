import { motion } from 'framer-motion';
import Spinner from './Spinner';

const styles = {
  green: {
    main: `w-32 px-4 py-2 bg-green-600 shadow shadow-green-300 transition-all hover:shadow-md hover:text-green-50 hover:shadow-green-500 text-green-300 border-2 border-transparent rounded-md cursor-pointer flex justify-center`,
    disabled: `w-32 px-4 py-2 bg-gray-600 shadow shadow-green-300 transition-all hover:shadow-md hover:text-green-50 hover:shadow-green-500 text-green-300 border-2 border-transparent rounded-md cursor-wait flex justify-center`
  },
  basic: {
    main: `w-32 px-4 py-2 border-2 border-gray-200 rounded-md hover:border-gray-400 transition-all cursor-pointer flex justify-center`,
    disabled: `w-32 px-4 py-2 border-2 border-gray-200 rounded-md hover:border-gray-400 transition-all cursor-wait flex justify-center`
  },
  big: {
    main: `bg-white select-none text-center bottom-8 border-gray-600 py-2 px-4 md:px-8 md:py-4 right-1/2 md:right-8 w-48 md:w-64 -mr-24 md:-mr-0 border-2 rounded-md hover:border-black font-redaction cursor-pointer`,
    disabled: `bg-gray-300 select-none text-center bottom-8 border-gray-600 py-2 px-4 md:px-8 md:py-4 right-1/2 md:right-8 w-48 md:w-64 -mr-24 md:-mr-0 border-2 rounded-md hover:border-black font-redaction`
  }
}

const getClassNames = ({
  selectStyle,
  fixed,
  disabled,
  bringToFront
}) => {
  let c = styles[selectStyle]['main']
  if (disabled) {
    c = styles[selectStyle]['disabled'];
  }
  if (fixed) {
    c += ` fixed`;
  }
  if (bringToFront) {
    c += ` z-50`;
  }
  return c.toString();
}

const ExecutionButton = ({
  exec,
  disabled = false,
  text = 'Mint',
  selectStyle = 'green',
  tween = false,
  fixed = false,
  bringToFront = false,
  loading = false
}) => {
  if (!tween) {
    return (
      <div
        className = {getClassNames({ selectStyle, fixed, disabled, bringToFront })}
        onClick={exec}
      >
        {loading ? <Spinner />: ``}
        {text}
      </div>
    )
  } else if (tween) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.2, type: "tween" }}
        onClick={exec}
        className={getClassNames({selectStyle, fixed, disabled, bringToFront})}
      >
        {loading ? <Spinner />: ``}
        {text}
      </motion.div>
    )
  }
}
export default ExecutionButton;