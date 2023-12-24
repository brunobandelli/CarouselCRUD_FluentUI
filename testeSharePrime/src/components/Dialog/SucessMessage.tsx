import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { FontIcon } from '@fluentui/react/lib/Icon';
import { useId } from '@fluentui/react-hooks';
import { mergeStyleSets } from '@fluentui/react';

const dialogStyles = { main: { maxWidth: 450 } };

const iconClass = mergeStyleSets({
  fontSize: 30,
  height: 5,
  width: 5,
  position: 'absolute',
  bottom: 65,
  left: 200,
});

const classNames = mergeStyleSets({
  CheckMark: [{ color: 'green' }, iconClass],
});

const defaultButtonStyle = {
  root: {
    background: '#ffb500',
    color: 'white',
    selectors: {
      ':hover': {
        background: '#ffc700!important',
      },
    },
  },
};

interface SuccessMessageProps {
  onCloseDialog: () => void;
  subText: string;
}

export const SuccessMessage: React.FunctionComponent<SuccessMessageProps> = ({ onCloseDialog, subText }) => {
  const [showModal, setShowModal] = React.useState(true);
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

  const dialogContentProps = {
    type: DialogType.normal,
    title: 'Sucesso!',
    closeButtonAriaLabel: 'Close',
    subText: subText,
  };

  return (
    <>
      <Dialog
        hidden={!showModal}
        onDismiss={() => {
          setShowModal(false);
          onCloseDialog();
        }}
        dialogContentProps={dialogContentProps}
        modalProps={modalProps}
        styles={modalProps.styles}
      >
        <FontIcon aria-label="CheckMark" iconName="CheckMark" className={classNames.CheckMark} />
        <DialogFooter>
          <DefaultButton
            styles={defaultButtonStyle}
            onClick={() => {
              setShowModal(false);
              onCloseDialog();
            }}
            text="Fechar"
          />
        </DialogFooter>
      </Dialog>
    </>
  );
};
