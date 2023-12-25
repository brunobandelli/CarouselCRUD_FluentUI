import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { FontIcon } from '@fluentui/react/lib/Icon';
import { mergeStyleSets } from '@fluentui/react';

const dialogStyles = { main: { maxWidth: 450 } };

const iconClass = mergeStyleSets({
  fontSize: '40px',
  position: 'absolute',
  bottom: "30px",
  left: "200px",
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

  const modalProps = React.useMemo(
    () => ({
      isBlocking: false,
      styles: dialogStyles,
    }), []
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
