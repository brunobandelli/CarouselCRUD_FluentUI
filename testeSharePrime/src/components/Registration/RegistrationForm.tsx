import * as React from 'react';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { useBoolean } from '@fluentui/react-hooks';
import { TextField } from '@fluentui/react/lib/TextField';
import { Stack, IStackProps, IStackStyles } from '@fluentui/react/lib/Stack';
import axios from 'axios';
import { ICarouselItem } from './RegistrationList';

interface RegistrationFormProps {
  updateListAfterRegister: () => void;
  items: ICarouselItem[];  
}

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

export const RegistrationForm: React.FunctionComponent<RegistrationFormProps> = ({ updateListAfterRegister, items }) => {
  const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formErrors, setFormErrors] = React.useState<{ [key: string]: string | undefined }>({});

  const handleCadastroImagem = async () => {
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
    } else if(items.some(item => item.order == Number(ordem.value))){
      errors['ordem'] = 'Este número de ordem já está em uso';
    }
    else {
      // Se for um número, converta para inteiro
      ordem.value = String(parseInt(ordem.value, 10));
    }

  //     // Verifique se o campo 'Ordem' contém apenas números e está entre 1 e 20
  // const ordemValue = parseInt(ordem.value, 10);
  // if (isNaN(ordemValue) || ordemValue < 1 || ordemValue > 20) {
  //   errors['ordem'] = 'A ordem deve ser um número entre 1 e 20';
  // } else {
  //   ordem.value = String(ordemValue);
  // }


    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

  
    // Inicie o processo de envio do formulário
    setIsSubmitting(true);

    // Faça a solicitação de cadastro usando Axios
    try {
      const response = await axios.post('https://6584f29b022766bcb8c7b0b2.mockapi.io/api/carouselData/items', {
        title: titulo.value,
        description: descricao.value,
        image: urlArquivo.value,
        link: urlDirecionamento.value,
        order: ordem.value,
      });

      // Atualize a lista chamando a função do componente pai
      updateListAfterRegister();

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
        <PrimaryButton onClick={handleCadastroImagem} text="Cadastrar Imagem" styles={primaryButtonStyle} disabled={isSubmitting} />
      </div>
    ),
    [dismissPanel, handleCadastroImagem, isSubmitting],
  );


  //Limita a quantidade de itens que podem ser adicionados na lista para 20.
  const currentItemCount = items.length;
  const maxItemCount = 20;
  if ( isOpen== true && currentItemCount >= maxItemCount) {
    // Exiba um aviso para o usuário e não prossiga com o cadastro
    window.alert(`Você atingiu o limite máximo de ${maxItemCount} itens. Não é possível adicionar mais itens.`);
    dismissPanel()
    return;
  }

  return (
    <div>
      <DefaultButton text="+ Nova Imagem"  onClick={openPanel} styles={buttonStyles} />
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
              <TextField
                id="titulo"
                label="Título"
                errorMessage={formErrors['titulo']}
                required
                maxLength={50}
                onChange={() => setFormErrors({ ...formErrors, titulo: undefined })}
              />
              <TextField
                id="descricao"
                label="Descrição"
                multiline
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
                errorMessage={formErrors['urlArquivo']}
                required
                onChange={() => setFormErrors({ ...formErrors, urlArquivo: undefined })}
              />
              <TextField
                id="urlDirecionamento"
                label="URL direcionamento"
                errorMessage={formErrors['urlDirecionamento']}
                required
                onChange={() => setFormErrors({ ...formErrors, urlDirecionamento: undefined })}
              />
              <TextField
                id="ordem"
                label="Ordem"
                // type='number'
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

                    // Verifique se o número já está em uso
                    if (items.some(item => item.order == Number(clampedValue))) {
                      setFormErrors({ ...formErrors, ordem: 'Este número de ordem já está em uso' });
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
