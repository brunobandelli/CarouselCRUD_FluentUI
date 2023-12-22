import * as React from 'react';
import { DefaultButton, IconButton } from '@fluentui/react/lib/Button';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { useBoolean } from '@fluentui/react-hooks';
import { SuccessMessage } from '../Dialog/SucessMessage'

// const buttonStyles = { root: { marginRight: 8 } };


export const EditForm: React.FunctionComponent = () => {
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
        <DefaultButton onClick={dismissPanel}>Cancel</DefaultButton>
        <SuccessMessage onCloseDialog={onCloseDialog}  buttonText="Salvar alterações" subText='Alterações salvas'/>
      </div>
    ),
    [dismissPanel],
  );

  return (
    <div>
        <IconButton
            iconProps={{ iconName: 'Edit' }}
            title="Edit"
            ariaLabel="Edit"
            onClick={openPanel}
            style={{ color: '#ffb500' }} />
      {/* <DefaultButton text="Open panel" onClick={openPanel} /> */}
      <Panel
        isOpen={isOpen}
        onDismiss={dismissPanel}
        type={PanelType.medium}
        headerText="Panel with footer at bottom"
        closeButtonAriaLabel="Close"
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


