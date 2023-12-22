import * as React from 'react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { useBoolean } from '@fluentui/react-hooks';
import { SuccessMessage } from '../Dialog/SucessMessage';

const buttonStyles = {
  root: {
    width: '158px',
    height: '32px',
    background: '#ffb500',
    color: 'white',
    selectors: {
      ':hover': {
        background: '#ffc700!important',  // Altere para a cor desejada no hover
      },
    },
  },
};




export const RegistrationForm: React.FunctionComponent = () => {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);

  function onCloseDialog(): void {
    dismissPanel()
    // throw new Error('Function not implemented.');
  }

  // This panel doesn't actually save anything; the buttons are just an example of what
  // someone might want to render in a panel footer.
  const onRenderFooterContent = React.useCallback(
    () => (
      <div style={{display: 'flex', flexDirection: 'row', gap: '5px'}}>
        <DefaultButton onClick={dismissPanel}>Cancelar</DefaultButton>
        <SuccessMessage onCloseDialog={onCloseDialog} buttonText="Cadastrar Imagem" subText='Imagem cadastrada'/>
      </div>
    ),
    [dismissPanel],
  );

  return (
    <div>
      <DefaultButton text="+ Nova Imagem" onClick={openPanel} styles={buttonStyles}/>
      <Panel
        isOpen={isOpen}
        onDismiss={dismissPanel}
        headerText="Panel with footer at bottom"
        closeButtonAriaLabel="Close"
        type={PanelType.medium}
        // customWidth={panelType === PanelType.medium }
        onRenderFooterContent={onRenderFooterContent}
        // Stretch panel content to fill the available height so the footer is positioned
        // at the bottom of the page
        isFooterAtBottom={true}
      >
        <p>Content goes here.</p>
      </Panel>
    </div>
  );
};


