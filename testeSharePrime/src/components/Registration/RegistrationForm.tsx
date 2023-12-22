import * as React from 'react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { useBoolean } from '@fluentui/react-hooks';
import { SuccessMessage } from '../Dialog/SucessMessage';
import { TextField,  } from '@fluentui/react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from '@fluentui/react/lib/Stack';


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

const stackTokens = { childrenGap: 50 };
// const iconProps = { iconName: 'Calendar' };
const stackStyles: Partial<IStackStyles> = { root: { width: 600 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: '100%'} },
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
        headerText="Nova imagem"
        closeButtonAriaLabel="Close"
        type={PanelType.medium}
        // customWidth={panelType === PanelType.medium }
        onRenderFooterContent={onRenderFooterContent}
        // Stretch panel content to fill the available height so the footer is positioned
        // at the bottom of the page
        isFooterAtBottom={true}
      >
        <form noValidate autoComplete="off">
      <Stack horizontal tokens={stackTokens} styles={stackStyles}>
        <Stack {...columnProps}>
          {/* <TextField label="Standard" /> */}
          {/* <TextField label="Disabled" disabled defaultValue="I am disabled" /> */}
          {/* <TextField label="Read-only" readOnly defaultValue="I am read-only" /> */}
          <TextField label="Título" errorMessage="Error message" required />
          <TextField label="Descrição" multiline resizable={false}  errorMessage="Error message" required style={{height:'100px'}}/>
          <TextField label="URL arquivo" errorMessage="Error message" required />
          <TextField label="URL direcionamento" errorMessage="Error message" required />
          <TextField label="Ordem" errorMessage="Error message" required />
          {/* <TextField ariaLabel="Required without visible label" required /> */}
          {/* <TextField label="With error message" errorMessage="Error message" /> */}
        </Stack>
        {/* <Stack {...columnProps}>
          <MaskedTextField label="With input mask" mask="m\ask: (999) 999 - 9999" title="A 10 digit number" />
          <TextField label="With an icon" iconProps={iconProps} />
          <TextField label="With placeholder" placeholder="Please enter text here" />
          <TextField label="Disabled with placeholder" disabled placeholder="I am disabled" /> */}
          {/* All password fields should be rendered inside of a form */}
          {/* <TextField
            label="Password with reveal button"
            type="password"
            canRevealPassword
            revealPasswordAriaLabel="Show password"
          /> */}
        {/* </Stack> */}
      </Stack>
    </form>
      </Panel>
    </div>
  );
};


