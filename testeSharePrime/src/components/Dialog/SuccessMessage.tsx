import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import {  DefaultButton } from '@fluentui/react/lib/Button';
import { hiddenContentStyle, mergeStyles } from '@fluentui/react/lib/Styling';
// import { Toggle } from '@fluentui/react/lib/Toggle';
// import { ContextualMenu } from '@fluentui/react/lib/ContextualMenu';
import { useId, useBoolean } from '@fluentui/react-hooks';

const dialogStyles = { main: { maxWidth: 450 } };
// const dragOptions = {
//   moveMenuItemText: 'Move',
//   closeMenuItemText: 'Close',
//   menu: ContextualMenu,
//   keepInBounds: true,
// };
const screenReaderOnly = mergeStyles(hiddenContentStyle);
const dialogContentProps = {
  type: DialogType.normal,
  title: 'Sucesso!',
  closeButtonAriaLabel: 'Close',
  subText: '........',
};

interface SuccessMessageProps {
    onCloseDialog: () => void;
  }
  
  export const SuccessMessage: React.FunctionComponent<SuccessMessageProps> = ({ onCloseDialog }) => {
    const [hideDialog, { toggle: toggleHideMessage }] = useBoolean(true);
    const labelId: string = useId('dialogLabel');
    const subTextId: string = useId('subTextLabel');
  
    const modalProps = React.useMemo(
      () => ({
        titleAriaId: labelId,
        subtitleAriaId: subTextId,
        isBlocking: false,
        styles: dialogStyles,
      }),
      [labelId, subTextId],
    );
  
    return (
      <>
        <DefaultButton secondaryText="Opens the Sample Dialog" onClick={toggleHideMessage} text="Send" />
        <label id={labelId} className={screenReaderOnly}>
          My sample label
        </label>
        <label id={subTextId} className={screenReaderOnly}>
          My sample description
        </label>
  
        <Dialog
          hidden={hideDialog}
          onDismiss={() => {
            toggleHideMessage();
            onCloseDialog(); // Chamando a função onCloseDialog quando o diálogo é fechado
          }}
          dialogContentProps={dialogContentProps}
          modalProps={modalProps}
        >
          <DialogFooter>
            <DefaultButton onClick={() => {
              toggleHideMessage();
              onCloseDialog(); // Chamando a função onCloseDialog quando o botão "Fechar" é clicado
            }} text="Fechar" />
          </DialogFooter>
        </Dialog>
      </>
    );
  };
