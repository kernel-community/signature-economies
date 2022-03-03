import React from 'react';
import Modal from 'react-modal';
import { useForm } from "react-hook-form";
import { forkDeclaration } from "../arweaveFns";
import Button from "./core/Button";
import Box from "./core/Box";
import ScaleLoader from "react-spinners/ScaleLoader";

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
    borderRadius: '0.75em',
    padding: '0',
  },
};

export default function Fork({text, txId}) {
  const {
    register,
    handleSubmit,
  } = useForm({
    defaultValues: {
      declaration: text,
    }
  });
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [loading, setIsLoading] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const onSubmit = (data) => {
    setIsLoading(true)
    forkDeclaration(txId, data.title, data.declaration, [])
      .then(data => window.location.href = `/declaration/${data.id}`)
      .finally(() => setIsLoading(false))
  }

  return (<Box title="Fork the Declaration" content={
    <>
      <div className="my-4">
        <p className="font-mono mb-6 text-left">
          If you have a revision, addition, or challenge to this declaration, we strongly encourage you to articulate your own vision and values through a fork of this document.
        </p>
        <Button
          primary
          onClick={openModal}>
          Fork
        </Button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="fork-editor"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full font-body bg-gray-50 pb-2">
          <div className="font-mono font-bold text-center py-3.5 bg-gray-wash text-gray-secondary border-b border-gray-detail">Fork the Declaration</div>
          <div className="pt-4 pb-3 px-5 bg-gray-50">
            <input {...register("title")} type="text" placeholder="A Declaration of the Interdependence of Cyberspace" className="border border-gray-detail rounded-lg px-5 py-2 mb-4 w-full max-h-80 outline-none font-mono text-sm" />
            <textarea {...register("declaration")} className="resize-none border border-gray-detail rounded-lg px-5 py-4 w-full max-h-80 outline-none font-mono text-sm" rows={24}/>
          </div>
          <div className="flex px-6">
            <div className="flex-1 text-sm pr-4 pb-4 text-gray-800">
              <div className="font-mono text-gray-20 text-xs">
                Like forking a software project, forking this document enables you to copy, modify, and save your own version of the original text.
              </div>
            </div>
            <div className="flex-0 align-start pb-0.5">
              <Button className="mt-2 mb-4 px-6 py-2 rounded-full bg-gray-20 bg-gray-20 hover:text-gray-100 text-white text-sm sm:text-base font-mono w-32" primary>{loading ? <ScaleLoader color="white" height={12} width={3}/> : 'Fork'}</Button>
            </div>
          </div>
        </form>
      </Modal>
    </>
  }/>);
}
