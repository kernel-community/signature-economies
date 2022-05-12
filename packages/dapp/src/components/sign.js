import React from 'react';
import Modal from "react-modal";
import Button from "./core/Button";
import Box from "./core/Box";
import ScaleLoader from "react-spinners/ScaleLoader";
import MetaMaskIcon from "./core/icons/MetaMaskIcon";

// This service should allow anyone to sign the full text of the essay.
// Move the generateSignature function from the arweave file here to encapsulate functionality more clearly.

// We need some way of storing and displaying who has signed the document - either just ETH address or, if available,
// ENS names. If we need to use arweave for that, we can - so long as we separate concerns. That is, we need to use
// Arweave to upload the SignatureNFT dynamic images too, and we should try to keep functionality modular.

export default function Sign({ txId, essay }) {
  
  return (<Box title="Sign Economically" 
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
