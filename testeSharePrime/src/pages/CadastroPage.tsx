// src/pages/CadastroPage.tsx
import React from 'react';
import { RegistrationList } from '../components/Registration/RegistrationList';

const CadastroPage: React.FC = () => {
  return (
    <div style={{ maxWidth: '1280px', padding: '2rem', textAlign: 'center'}}>
    <RegistrationList/>
    </div>
  );
};

export default CadastroPage;
