import * as React from 'react';
import { DefaultButton } from '@fluentui/react/lib/Button';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { useBoolean } from '@fluentui/react-hooks';
import { SuccessMessage } from '../Dialog/SucessMessage';
import { TextField } from '@fluentui/react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from '@fluentui/react/lib/Stack';
import axios from 'axios';

const buttonStyles = {
  root: {
    width: '158px',
    height: '32px',
    background: '#ffb500',
    color: 'white',
    selectors: {
      ':hover': {
        background: '#ffc700!important',
      },
    },
  },
};

const stackTokens = { childrenGap: 50 };
const stackStyles: Partial<IStackStyles> = { root: { width: 600 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: '100%' } },
};

export const RegistrationForm: React.FunctionComponent = () => {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);

  function onCloseDialog(): void {
    dismissPanel();
  }

  const handleCadastroImagem = async () => {
    // Obtenha os valores dos campos do formulário
    const titulo = document.getElementById('titulo') as HTMLInputElement;
    const descricao = document.getElementById('descricao') as HTMLInputElement;
    const urlArquivo = document.getElementById('urlArquivo') as HTMLInputElement;
    const urlDirecionamento = document.getElementById('urlDirecionamento') as HTMLInputElement;
    const ordem = document.getElementById('ordem') as HTMLInputElement;

    // Faça a solicitação de cadastro usando Axios
    try {
      const response = await axios.post('https://6584f29b022766bcb8c7b0b2.mockapi.io/api/carouselData/items', {
        title: titulo.value,
        description: descricao.value,
        image: urlArquivo.value,
        link: urlDirecionamento.value,
        order: ordem.value,
      });

      console.log('Imagem cadastrada com sucesso:', response.data);

      // Feche o painel após o cadastro bem-sucedido
      dismissPanel();
    } catch (error) {
      console.error('Erro ao cadastrar imagem:', error);
    }
  };

  const onRenderFooterContent = React.useCallback(
    () => (
      <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
        <DefaultButton onClick={dismissPanel}>Cancelar</DefaultButton>
        <SuccessMessage onCloseDialog={()=>{onCloseDialog(), handleCadastroImagem()}} buttonText="Cadastrar Imagem" subText="Imagem cadastrada"  />
      </div>
    ),
    [dismissPanel, handleCadastroImagem],
  );

  return (
    <div>
      <DefaultButton text="+ Nova Imagem" onClick={openPanel} styles={buttonStyles} />
      <Panel
        isOpen={isOpen}
        onDismiss={dismissPanel}
        headerText="Nova imagem"
        closeButtonAriaLabel="Close"
        type={PanelType.medium}
        onRenderFooterContent={onRenderFooterContent}
        isFooterAtBottom={true}
      >
        <form noValidate autoComplete="off">
          <Stack horizontal tokens={stackTokens} styles={stackStyles}>
            <Stack {...columnProps}>
              <TextField id="titulo" label="Título" errorMessage="Error message" required />
              <TextField id="descricao" label="Descrição" multiline resizable={false} errorMessage="Error message" required style={{ height: '100px' }} />
              <TextField id="urlArquivo" label="URL arquivo" errorMessage="Error message" required />
              <TextField id="urlDirecionamento" label="URL direcionamento" errorMessage="Error message" required />
              <TextField id="ordem" label="Ordem" errorMessage="Error message" required />
            </Stack>
          </Stack>
        </form>
      </Panel>
    </div>
  );
};
