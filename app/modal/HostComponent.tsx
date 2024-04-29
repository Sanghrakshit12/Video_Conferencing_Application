import React, { useState } from 'react';
import Modal from '@/Components/modal/modal';
import styles from './styles.module.css'; 

const HostComponent: React.FC = () => {
  const [isPromptOpen, setIsPromptOpen] = useState(false);

  const handleOpenPrompt = () => {
    setIsPromptOpen(true);
  };

  const handleClosePrompt = () => {
    setIsPromptOpen(false);
  };

  return (
    <div className={styles.hostComponent}>
      {/* Your other components */}
      <button onClick={handleOpenPrompt}>Send Prompt</button>
      <Modal isOpen={isPromptOpen} onClose={handleClosePrompt} />
    </div>
  );
};

export default HostComponent;