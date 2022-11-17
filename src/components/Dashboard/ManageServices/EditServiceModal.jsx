import { useState } from "react";
import Modal from "react-modal";

const EditServiceModal = ({ closeModal, modalIsOpen, item }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  Modal.setAppElement("#root");

  const [serviceTitle, setServiceTitle] = useState(item.title);
  const [description, setDescription] = useState(item.description);

  const handleSubmit = (e) => {
    console.log(serviceTitle, description, item._id);

    e.preventDefault();
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 className="my-3">Update Service</h2>
        <div>
          <form onSubmit={handleSubmit}>
            <div className="input-area">
              <label>
                Service Title
                <input
                  className="form-control mb-3"
                  type="text"
                  placeholder="App-Develop"
                  defaultValue={serviceTitle}
                  required
                  onChange={(e) => setServiceTitle(e.target.value)}
                />
              </label>
              <br />

              <label>Description</label>
              <textarea
                className="form-control w-50 mb-3"
                rows="4"
                cols="50"
                defaultValue={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-bg text-light me-3" type="submit">
              Submit
            </button>
            <button className="btn btn-outline-danger" onClick={closeModal}>
              close
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default EditServiceModal;
