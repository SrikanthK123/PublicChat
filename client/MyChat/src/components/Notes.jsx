import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import 'antd/dist/reset.css'; // Make sure to import Ant Design styles

const Rules = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <div style={{ position: 'fixed', right: '2%', top: '50%', zIndex: '1000', margin: '10px' }}>
        <Button type="primary" className='button' onClick={showModal}>
          Rules
        </Button>
      </div>
      <Modal
        title="Chat Rules & Guidelines"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Got it"
        cancelButtonProps={{ style: { display: 'none' } }} // Hide the Cancel button if you only want an OK button
      >
        <ul>
          <li><strong>Respect Others:</strong> Always communicate respectfully. Harassment, bullying, or any form of abusive behavior will not be tolerated.</li>
          <li><strong>No Spamming:</strong> Avoid sending repetitive or irrelevant messages. Spam can disrupt conversations and annoy other users.</li>
          <li><strong>Privacy Matters:</strong> Do not share personal information such as addresses, phone numbers, or other sensitive data. Respect others' privacy as you would your own.</li>
          <li><strong>Content Guidelines:</strong> Do not share inappropriate content, including but not limited to, explicit language, images, or links to harmful websites.</li>
          <li><strong>No Impersonation:</strong> Be yourself. Do not impersonate other users or create misleading accounts.</li>
          <li><strong>Public & Private Chats:</strong>
            <ul>
              <li><strong>Public Chat:</strong> Messages sent in public chat are visible to everyone. Use this space for general discussion.</li>
              <li><strong>Private Chat:</strong> When sending a message to another user privately, the recipient can view the message in their private message list.</li>
            </ul>
          </li>
          <li><strong>Message Notification:</strong> If you receive a private message, it will appear in your message list under your profile name. Be sure to check your message list regularly for new messages.</li>
          <li><strong>Reporting Issues:</strong> If you encounter any issues or see rule violations, report them to the moderators or support team immediately.</li>
          <li><strong>Account Security:</strong> Keep your account credentials secure. Do not share your password with anyone.</li>
          <li><strong>Compliance:</strong> By using this chat service, you agree to comply with these rules. Failure to adhere may result in account suspension or other actions.</li>
        </ul>
      </Modal>
    </>
  );
};

export default Rules;
