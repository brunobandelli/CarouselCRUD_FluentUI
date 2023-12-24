import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { DefaultButton, IconButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { hiddenContentStyle, mergeStyles } from '@fluentui/react/lib/Styling';
import { useId, useBoolean } from '@fluentui/react-hooks';
// import { SuccessMessage } from './SucessMessage';

import axios from 'axios';

const buttonStyles = {
  root: {
      background: '#ffb500',
      color: 'white',
      selectors: {
          ':hover': {
              background: '#ffc700!important',  // Altere para a cor desejada no hover
          },
      },
  },
};

const dialogStyles = { main: { maxWidth: 450 } };
const screenReaderOnly = mergeStyles(hiddenContentStyle);
const dialogContentProps = {
  type: DialogType.normal,
  title: 'Excluir imagem?',
  closeButtonAriaLabel: 'Close',
  subText: 'Esta ação não poderá ser desfeita',
};

interface ConfirmationDialogProps {
  idItem: number;
  updateListAfterDeletion: (deletedItemId: number) => void;
}

export const ConfirmationDialog: React.FunctionComponent<ConfirmationDialogProps> = ({ idItem, updateListAfterDeletion }) => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);
  // const [showSuccessMessage, setShowSuccessMessage] = React.useState(false);
  const [itemIdToDelete, setItemIdToDelete] = React.useState<number | null>(null);

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

  // const onCloseDialog = () => {
  //   toggleHideDialog();
  //   if (itemIdToDelete !== null) {
  //     axios
  //       .delete(`https://6584f29b022766bcb8c7b0b2.mockapi.io/api/carouselData/items/${itemIdToDelete}`)
  //       .then(response => {
  //         console.log('Resposta da API:', response.data);
  //         updateListAfterDeletion(itemIdToDelete);
  //           setShowSuccessMessage(true);
  //       })
  //       .catch(error => {
  //         console.error('Erro na solicitação de exclusão:', error);
  //         setShowSuccessMessage(true);
  //       });
  //   }
  // };

  const onCloseDialog = async () => {
  toggleHideDialog();

  if (itemIdToDelete !== null) {
    try {
      const response = await axios.delete(`https://6584f29b022766bcb8c7b0b2.mockapi.io/api/carouselData/items/${itemIdToDelete}`);
      console.log('Resposta da API:', response.data);
      updateListAfterDeletion(itemIdToDelete);
      // setShowSuccessMessage(true);
    } catch (error) {
      console.error('Erro na solicitação de exclusão:', error);
      // setShowSuccessMessage(true);
    }
  }
};


  const onDeleteClick = () => {
    setItemIdToDelete(idItem);
    toggleHideDialog();
  };

  return (
    <>
      <IconButton
        iconProps={{ iconName: 'Delete' }}
        title="Delete"
        ariaLabel="Delete"
        onClick={onDeleteClick}
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

      <Dialog hidden={hideDialog} onDismiss={toggleHideDialog} dialogContentProps={dialogContentProps} modalProps={modalProps}>
        <DialogFooter>
          <DefaultButton onClick={toggleHideDialog} text="Cancelar" />
          <PrimaryButton onClick={onCloseDialog} text="Excluir" styles={buttonStyles}/>
          {/* <SuccessMessage onCloseDialog={onCloseDialog} buttonText={'Excluir'} subText={'Item excluido'} /> */}
        </DialogFooter>
      </Dialog>

      {/* {showSuccessMessage && <SuccessMessage onCloseDialog={() => setShowSuccessMessage(false)} subText={'Item excluido'} 
      // buttonText={''}
       />} */}
    </>
  );
};