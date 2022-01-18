
const Modal = ({closeModal}) => {
    return (
        <div className="modal">
            <h1>Modal Content</h1>
            <div className="modal-actions">
                <button onClick={closeModal}>Cancel</button>
            </div>
            
        </div>)
}

export default Modal;