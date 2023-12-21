import * as React from 'react';
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog';
import { DefaultButton } from '@fluentui/react/lib/Button';
// import { hiddenContentStyle, mergeStyles } from '@fluentui/react/lib/Styling';
// import { Toggle } from '@fluentui/react/lib/Toggle';
// import { ContextualMenu } from '@fluentui/react/lib/ContextualMenu';
import { FontIcon } from '@fluentui/react/lib/Icon';
import { useId, useBoolean } from '@fluentui/react-hooks';
import { mergeStyleSets, mergeStyles } from '@fluentui/react';

const dialogStyles = { main: { maxWidth: 450 } }

const iconClass = mergeStyles({
    fontSize: 30,
    height: 5,
    width: 5,
    position: 'absolute',
    bottom: 65,
    left: 200
});
const classNames = mergeStyleSets({
    CheckMark: [{ color: 'green' }, iconClass],

});

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

const defaultButtonStyle = {
    root: {
        background: '#ffb500',
        color: 'white',
        selectors: {
            ':hover': {
                background: '#ffc700!important',  // Altere para a cor desejada no hover
            },
        },
    },
}
// const dragOptions = {
//   moveMenuItemText: 'Move',
//   closeMenuItemText: 'Close',
//   menu: ContextualMenu,
//   keepInBounds: true,
// };
// const screenReaderOnly = mergeStyles(hiddenContentStyle);
const dialogContentProps = {
    type: DialogType.normal,
    title: 'Sucesso!',
    closeButtonAriaLabel: 'Close',
    subText: 'Imagem cadastrada',
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
            <DefaultButton secondaryText="Opens the Sample Dialog" onClick={toggleHideMessage} text="Cadastrar Imagem" styles={buttonStyles} />
            <Dialog
                hidden={hideDialog}
                onDismiss={() => {
                    toggleHideMessage();
                    onCloseDialog(); // Chamando a função onCloseDialog quando o diálogo é fechado
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
                            toggleHideMessage();
                            onCloseDialog(); // Chamando a função onCloseDialog quando o botão "Fechar" é clicado
                        }} text="Fechar"
                    />
                </DialogFooter>
            </Dialog>
        </>
    );
};



