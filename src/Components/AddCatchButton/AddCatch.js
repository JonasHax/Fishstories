import React, { useState } from "react";
import css from "./AddCatch.module.css";
import logo from "../../images/fishAdd.png";
import { AddCatchReportModule } from "../AddCatchReport/AddCatchReportModule";
import { Modal } from "@material-ui/core";

export const AddCatchButton = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const handleClose = () => setModalOpen(false);
  const handleShow = () => setModalOpen(true);

  function handleClick() {
    handleShow();
  }

  return (
    <div className={css.Container}>
      <button
        className={[css.add_button, css.AnimatedButton].join(" ")}
        onClick={handleClick}
      >
        <img className={css.add_img} src={logo} alt=""></img>
      </button>
      <Modal open={modalOpen} onClose={handleClose}>
        <AddCatchReportModule onClose={handleClose}></AddCatchReportModule>
      </Modal>
    </div>
  );
};
