import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { DefaultButton, IconButton } from '@fluentui/react/lib/Button';
import { hiddenContentStyle, mergeStyles } from '@fluentui/react/lib/Styling';
import { useId, useBoolean } from '@fluentui/react-hooks';
import { SuccessMessage } from './SucessMessage';

const dialogStyles = { main: { maxWidth: 450 } };
const screenReaderOnly = mergeStyles(hiddenContentStyle);
const dialogContentProps = {
  type: DialogType.normal,
  title: 'Excluir imagem?',
  closeButtonAriaLabel: 'Close',
  subText: 'Esta ação não poderá ser desfeita',
};

export const ConfirmationDialog: React.FunctionComponent = () => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false); // Novo estado

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

  const onCloseDialog = () => {
    toggleHideDialog();
    setShowSuccessMessage(true); // Mostrar o SuccessMessage ao fechar o ConfirmationDialog
  };

  return (
    <>
      <IconButton
        iconProps={{ iconName: 'Delete' }}
        title="Delete"
        ariaLabel="Delete"
        onClick={toggleHideDialog}
        style={{ color: '#ffb500' }}
        text="Open Dialog"
        secondaryText="Opens the Sample Dialog"
      />
      <label id={labelId} className={screenReaderOnly}>
        My sample label
      </label>
      <label id={subTextId} className={screenReaderOnly}>
        My sample description
      </label>

      <Dialog
        hidden={hideDialog}
        onDismiss={onCloseDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
      >
        <DialogFooter>
          <DefaultButton onClick={toggleHideDialog} text="Cancelar" />
          <SuccessMessage onCloseDialog={onCloseDialog} buttonText={'Excluir'} subText={'Item excluido'} />
        </DialogFooter>
      </Dialog>

      {/* Renderizar SuccessMessage se showSuccessMessage for verdadeiro */}
      {showSuccessMessage && <SuccessMessage onCloseDialog={() => setShowSuccessMessage(false)} buttonText={''} subText={''} />}
    </>
  );
};
