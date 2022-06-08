import Mintable from "./Mintable";
import Footer from "./Footer";
import { HighlightContext } from "../../contexts/Highlight";
import { useContext } from 'react';
import Wait from "../common/Wait";
import Share from "../common/Share";


const Modal = () => {
  const { state, dispatch } = useContext(HighlightContext);

  return (
    <div className="flex justify-center md:p-8 w-full h-full md:h-auto md:w-min my-auto rounded-lg shadow-xl bg-white ">
      <div className="flex flex-col gap-y-8 items-center my-auto">
        <div className="flex flex-col font-redaction justify-between">
          {
            state.loading &&
            <Wait />
          }
          {
            state.mint &&
            <Share />
          }
          {
            (!state.loading && !state.mint) &&
            <>
              <Mintable />
              <Footer />
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default Modal;