import Modal from "react-modal";
import Button from "../components/core/Button";
import Box from "../components/core/Box";

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
    zIndex: '100'
  },
};
export default function SelectedTextNFT({ isOpen, closeModal, selectedText }) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="nft-modal">
              <Box
                title={<p className="text-center"> Highlighted Text NFT </p>}
                content = {
                  <div> 
                    <img 
                      src={"https://durrifte.sirv.com/Images/cdef.jpg?text=" 
                      //+ encodeURI(window.getSelection().toString()) + 
                      + encodeURI(selectedText) + 
                      "&text.size=100&text.color=000000&text.position.gravity=south&text.position.y=-50&text.align=center&text.font.family=EB%20Garamond&text.font.style=normal&text.font.weight=400&text.width=70%"}/>        
                    <div className="mt-3 mb-3 text-center space-x-6">
                      <Button
                      primary>
                        Mint
                      </Button>
                      <button
                        className="font-mono underline font-light text-gray-400"
                        onClick={closeModal}>
                          Close
                      </button>
                    </div>
                </div>}/>
            </Modal>  
    )
}