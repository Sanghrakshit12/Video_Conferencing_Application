// components/HostComponent.tsx

import React, { useState } from 'react';
import Modal from './modal/modal';
import styles from './styles.module.css'; // Import your global CSS styles if any

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
