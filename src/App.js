import { useState } from "react";
import Backdrop from "./components/Backdrop";
import Modal from "./components/Modal";
import Layout from "./components/Layout";

function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModalHandler = () => {
    setModalOpen(true);
  };

  const closeModalHandler = () => {
    setModalOpen(false);
  };

  return (

      <Layout>
        {!modalOpen && <button onClick={openModalHandler} className="btn">Show Modal</button>}
        {modalOpen && <Backdrop closeModal={closeModalHandler} />}
        {modalOpen && <Modal closeModal={closeModalHandler} />}
      </Layout>

  );
}

export default App;
