import * as React from 'react';
import { DefaultButton, IconButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { useBoolean } from '@fluentui/react-hooks';
import { TextField } from '@fluentui/react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from '@fluentui/react/lib/Stack';
import axios from 'axios';
import { ICarouselItem } from './RegistrationList';



interface EditFormProps {
  order: number;
  key: string;
  id: number;
  title: string;
  description: string;
  urlArquivo: string;
  urlDirecionamento: string;
  updateListAfterEdit: () => void;
  subText: () => void
  items: ICarouselItem[]
}





const primaryButtonStyle = {
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

const stackTokens = { childrenGap: 50 };
const stackStyles: Partial<IStackStyles> = { root: { width: 600 } };
const columnProps: Partial<IStackProps> = {
  tokens: { childrenGap: 15 },
  styles: { root: { width: '100%' } },
};


export const EditForm: React.FunctionComponent<EditFormProps> = (_props) => {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formErrors, setFormErrors] = React.useState<{ [key: string]: string | undefined }>({});



  const handleEditImagem = async () => {
    // Obtenha os valores dos campos do formulário
    const titulo = document.getElementById('titulo') as HTMLInputElement;
    const descricao = document.getElementById('descricao') as HTMLInputElement;
    const urlArquivo = document.getElementById('urlArquivo') as HTMLInputElement;
    const urlDirecionamento = document.getElementById('urlDirecionamento') as HTMLInputElement;
    const ordem = document.getElementById('ordem') as HTMLInputElement;


    // Verifique se todos os campos obrigatórios estão preenchidos
    const errors: { [key: string]: string | undefined } = {};
    if (!titulo.value) errors['titulo'] = 'Campo obrigatório';
    if (!descricao.value) errors['descricao'] = 'Campo obrigatório';
    if (!urlArquivo.value) errors['urlArquivo'] = 'Campo obrigatório';
    if (!urlDirecionamento.value) errors['urlDirecionamento'] = 'Campo obrigatório';

 // Verifique se o campo 'Ordem' contém apenas números.
    if (!/^\d+$/.test(ordem.value) || isNaN(Number(ordem.value))) {
      errors['ordem'] = 'Campo obrigatório';
    // Verifica se o campo 'Ordem' é inferior a 1 ou superior a 20.
    } else if(Number(ordem.value)< 1 || Number(ordem.value) > 20){
      errors['ordem'] = 'A ordem deve ser um número entre 1 e 20';
    // Verifica se o campo 'Ordem' está preenchido com um numero ja existente
    }
    else if(_props.items.some(item => item.order == Number(ordem.value) &&  item.order !== _props.order)){
      errors['ordem'] = 'Este número de ordem já está em uso';
    }
    else {
      // Se for um número, converta para inteiro
      ordem.value = String(parseInt(ordem.value, 10));
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    // Inicie o processo de envio do formulário
    setIsSubmitting(true);

    // Faça a solicitação de cadastro usando Axios
    try {
      const response = await axios.put(`https://6584f29b022766bcb8c7b0b2.mockapi.io/api/carouselData/items/${_props.id}`, {
        title: titulo.value,
        description: descricao.value,
        image: urlArquivo.value,
        link: urlDirecionamento.value,
        order: ordem.value,
      });

      // Chame a função do componente pai para atualizar a lista
      // _props.onCadastroSucesso();

      // Chame o novo método para garantir que a lista seja atualizada em ordem crescente
      _props.updateListAfterEdit();

      console.log('Imagem cadastrada com sucesso:', response.data);

      // Feche o painel após o cadastro bem-sucedido
      dismissPanel();
    } catch (error) {
      console.error('Erro ao cadastrar imagem:', error);
    } finally {
      // Finalize o processo de envio do formulário, independentemente do resultado
      setIsSubmitting(false);
    }
  };

  const onRenderFooterContent = React.useCallback(
    () => (
      <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
        <DefaultButton onClick={dismissPanel} disabled={isSubmitting}>Cancelar</DefaultButton>
        <PrimaryButton onClick={handleEditImagem} text="Salvar alterações" styles={primaryButtonStyle} disabled={isSubmitting} />
      </div>
    ),
    [dismissPanel, handleEditImagem, isSubmitting],
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
        headerText="Editar imagem"
        closeButtonAriaLabel="Close"
        type={PanelType.medium}
        onRenderFooterContent={onRenderFooterContent}
        isFooterAtBottom={true}
      >
        <form noValidate autoComplete="off">
          <Stack horizontal tokens={stackTokens} styles={stackStyles}>
            <Stack {...columnProps}>
              <TextField
                id="titulo"
                label="Título"
                defaultValue={_props.title}
                errorMessage={formErrors['titulo']}
                required
                maxLength={50}
                onChange={() => setFormErrors({ ...formErrors, titulo: undefined })}
              />
              <TextField
                id="descricao"
                label="Descrição"
                multiline
                defaultValue={_props.description}
                resizable={false}
                errorMessage={formErrors['descricao']}
                required
                maxLength={430}
                style={{ height: '100px' }}
                onChange={() => setFormErrors({ ...formErrors, descricao: undefined })}
              />
              <TextField
                id="urlArquivo"
                label="URL arquivo"
                defaultValue={_props.urlArquivo}
                errorMessage={formErrors['urlArquivo']}
                required
                onChange={() => setFormErrors({ ...formErrors, urlArquivo: undefined })}
              />
              <TextField
                id="urlDirecionamento"
                label="URL direcionamento"
                defaultValue={_props.urlDirecionamento}
                errorMessage={formErrors['urlDirecionamento']}
                required
                onChange={() => setFormErrors({ ...formErrors, urlDirecionamento: undefined })}
              />
              <TextField
                id="ordem"
                label="Ordem"
                defaultValue={String(_props.order)}
                errorMessage={formErrors['ordem']}
                required
                onChange={(ev, newValue) => {
                  setFormErrors({ ...formErrors, ordem: undefined });
                  // Verifica se 'ev.target' é do tipo HTMLInputElement antes de acessar 'value'
                  if (ev?.target instanceof HTMLInputElement) {
                    // Remova caracteres não numéricos
                    // ev.target.value = newValue ? newValue.replace(/\D/g, '') : '';
                    const sanitizedValue = newValue ? newValue.replace(/\D/g, '') : '';
                          // Limite o valor entre 1 e 20
                    const clampedValue = sanitizedValue ? Math.min(Math.max(parseInt(sanitizedValue, 10), 1), 20) : "";

                    ev.target.value = String(clampedValue);

                  //  Verifique se o número já está em uso
                  if(Number(clampedValue) == _props.order){
                    setFormErrors({ ...formErrors, ordem: 'Valor atual' })
                  }
                  else if (_props.items.some(item => item.order == Number(clampedValue ))) {
                    setFormErrors({ ...formErrors, ordem: 'Este número de ordem já está em uso' })
                  }
                  }
                }}
              />
            </Stack>
          </Stack>
        </form>
      </Panel>
    </div>

  );

};


