import { useState, useEffect } from 'react';
import SliderModal from '../components/slider-modal';
import FootNotes from '../components/footnotes';
import Essay from '../components/essay';
import { motion, AnimatePresence } from 'framer-motion';
import { HighlightProvider } from '../contexts/Highlight';

const Home = () => {
  const [sliderModalVisible, setSliderModalVisible] = useState(false);

  useEffect(() => {
    if (sliderModalVisible) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    };
  }, [sliderModalVisible]);

  return (
    <HighlightProvider>
    <div className="mx-auto pb-32 bg-white selection:bg-green-300 selection:text-green-900">
      <AnimatePresence>
        {!sliderModalVisible && (
          <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.2, type: "tween" }}
            onClick={() => {
              setSliderModalVisible(true);
            }}
            className="
              fixed bg-white select-none border-gray-600 z-50 bottom-8 w-max md:w-auto left-1/2 md:left-auto my-auto md:right-8 border-2 rounded-md p-2 md:p-4 px-12 hover:border-black font-redaction cursor-pointer"
          >
            Mint a Sealed NFT
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {sliderModalVisible && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, type: "tween" }}
            className="
              flex justify-center z-50
              fixed top-0 left-0 bg-gray-500/30
              backdrop-blur-lg w-screen h-screen
            "
          >
            <SliderModal setModalVisible={setSliderModalVisible} />
          </motion.div>
        )}
      </AnimatePresence>
      <Essay />
      <FootNotes/>
    </div>
    </HighlightProvider>
  );
}

export default Home;
