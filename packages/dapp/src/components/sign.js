import React from 'react';
import { useForm } from 'react-hook-form';
import {generateSignature, signDeclaration} from "./arweave";
import Modal from "react-modal";
import Button from "./core/Button";
import Box from "./core/Box";
import ScaleLoader from "react-spinners/ScaleLoader";
import MetaMaskIcon from "./core/icons/MetaMaskIcon";

// TODO: check that the stags I removed didn't break anything. Check that the social verification I removed didn't break anything.
//       Remove all the next.js stuff if we decide not to use it.
Modal.setAppElement('#__next');
Modal.defaultStyles.overlay.backgroundColor = '#555555aa';

const customStyles = {
  content: {
    top: '10vh',
    left: '10vw',
    right: 'auto',
    bottom: 'auto',
    width: '80vw',
    marginRight: '-50%',
    borderColor: 'transparent',
    borderRadius: '0.75em',
    padding: '0',
  },
};

export function DisplayedError({displayedError}) {
  return <>
    {(displayedError || !window.ethereum) && <div className="mt-7 text-center font-mono text-sm text-red-700">{displayedError || <>No wallet found. Please install <a className="underline" target="_blank" href="https://metamask.io/download.html">Metamask</a> or another Web3 wallet provider.</>}</div>}
  </>
}

function SignScreen({handleSubmit, onSubmit, register, displayedError, loading}) {
  return <div className="w-full h-full bg-gray-50">
    <form onSubmit={handleSubmit(onSubmit)} className="w-full font-body pb-4">
      <div className="w-full font-mono font-bold text-center py-3.5 bg-gray-wash text-gray-secondary border-b border-gray-detail font-bold">Sign the Declaration</div>
      <div className="pt-7 pb-4 px-8 bg-gray-50">
        <p className="font-mono text-brown-20">Enter your name to sign:</p>
        <div className="mt-6">
          <input className="font-mono rounded-t-lg border border-gray-detail focus:outline-none w-full px-4 py-4" type="text" {...register("name")} autoComplete="off" autoFocus placeholder="Your name or alias" />
          <input className="font-mono rounded-b-lg border-b border-l border-r border-gray-detail focus:outline-none w-full px-4 py-4" type="text"{...register("handle")} autoComplete="off" placeholder="Your Twitter username"/>
        </div>
        <div className="mt-2 text-center">
          <Button disabled={!window.ethereum} className={"mt-5 px-6 py-2 rounded-full bg-truegray-800 hover:text-gray-100 text-white text-sm sm:text-base font-mono" + (window.ethereum ? "" : " opacity-60")} primary>{loading ? <ScaleLoader color="white" height={12} width={3}/> : 'Sign with Metamask'}</Button>
        </div>
        <DisplayedError displayedError={displayedError}/>
      </div>
    </form>
  </div>
}


export default function Sign({ txId, declaration }) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [formData, setFormData] = React.useState();
  const [signSuccess, setSignSuccess] = React.useState(false)

  const [loading, setIsLoading] = React.useState(false);
  const [displayedError, setDisplayedError] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    if (signSuccess) {
      setIsOpen(false);
      setIsLoading(false);
      setDisplayedError(null);
      reset();
    } else {
      // log an err - I removed stages here
    }
  }

  const sign = () => signDeclaration(txId, formData.name, formData.handle, declaration, formData.sig)
    .then(() => setSignSuccess(true))

  const onSubmit = (data) => {
    if (data.name === "") {
      setDisplayedError("Cannot sign with an empty name");
      return
    }

    setIsLoading(true);
    setDisplayedError(null);
    generateSignature(declaration)
      .then((sig) => {
        setFormData({
          sig,
          name: data.name,
          handle: data.handle
        })
        setIsLoading(false)
      })
      .catch((err) => {
        setDisplayedError(err.message);
        setIsLoading(false);
      });
  };



  return (<Box title="Sign the Declaration" 
  content={
    <>
      <div className="my-4">
        <p className="font-mono mb-6 text-left">
          If you'd like to sign this essay, simply click the button below. Signing your unique mark is free and will become part of this document's permanent history on the Arweave smartweave.
        </p>
        <a className="mt-4 font-mono underline font-light text-gray-400"
          href="https://kernel.community/en/guiding/"> 
          First time wallet user? Here is your guide. 
        </a>
        <div className="mt-4">
        <Button
          primary
          onClick={openModal}>
          <MetaMaskIcon/>
          Sign 
        </Button>
        </div>
        
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        
        contentLabel="sign-modal"
      >
        {<SignScreen {...{handleSubmit, onSubmit, register, displayedError, loading}} />}
      </Modal>
    </>} />
  );
}
