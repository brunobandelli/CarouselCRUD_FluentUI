// import * as React from 'react';
// import { DefaultButton, IconButton, PrimaryButton } from '@fluentui/react/lib/Button';
// import { Panel, PanelType } from '@fluentui/react/lib/Panel';
// import { useBoolean } from '@fluentui/react-hooks';
// import { TextField } from '@fluentui/react/lib/TextField';
// import { Stack, IStackProps, IStackStyles } from '@fluentui/react/lib/Stack';
// import axios from 'axios';

// // const buttonStyles = { root: { marginRight: 8 } };

// // const buttonStyles = {
// //   root: {
// //     width: '158px',
// //     height: '32px',
// //     background: '#ffb500',
// //     color: 'white',
// //     selectors: {
// //       ':hover': {
// //         background: '#ffc700!important',
// //       },
// //     },
// //   },
// // };

// const primaryButtonStyle = {
//   root: {
//     background: '#ffb500',
//     color: 'white',
//     selectors: {
//       ':hover': {
//         background: '#ffc700!important',  // Altere para a cor desejada no hover
//       },
//     },
//   },
// };


// const stackTokens = { childrenGap: 50 };
// const stackStyles: Partial<IStackStyles> = { root: { width: 600 } };
// const columnProps: Partial<IStackProps> = {
//   tokens: { childrenGap: 15 },
//   styles: { root: { width: '100%' } },
// };

// export const EditForm: React.FunctionComponent<{ onCadastroSucesso: () => void }> = ({ onCadastroSucesso }) => {
//   const [isOpen, { setTrue: openPanel, setFalse: dismissPanel }] = useBoolean(false);
//   const [isSubmitting, setIsSubmitting] = React.useState(false);
//   const [formErrors, setFormErrors] = React.useState<{ [key: string]: string | undefined }>({});

//   const handleCadastroImagem = async () => {
//     // Obtenha os valores dos campos do formulário
//     const titulo = document.getElementById('titulo') as HTMLInputElement;
//     const descricao = document.getElementById('descricao') as HTMLInputElement;
//     const urlArquivo = document.getElementById('urlArquivo') as HTMLInputElement;
//     const urlDirecionamento = document.getElementById('urlDirecionamento') as HTMLInputElement;
//     const ordem = document.getElementById('ordem') as HTMLInputElement;

//     // Verifique se todos os campos obrigatórios estão preenchidos
//     const errors: { [key: string]: string | undefined } = {};
//     if (!titulo.value) errors['titulo'] = 'Campo obrigatório';
//     if (!descricao.value) errors['descricao'] = 'Campo obrigatório';
//     if (!urlArquivo.value) errors['urlArquivo'] = 'Campo obrigatório';
//     if (!urlDirecionamento.value) errors['urlDirecionamento'] = 'Campo obrigatório';

//     // Verifique se o campo 'Ordem' contém apenas números
//     if (!/^\d+$/.test(ordem.value)) {
//       errors['ordem'] = 'Campo obrigatório';
//     } else {
//       // Se for um número, converta para inteiro
//       ordem.value = String(parseInt(ordem.value, 10));
//     }

//     setFormErrors(errors);

//     if (Object.keys(errors).length > 0) {
//       return;
//     }

//     // Inicie o processo de envio do formulário
//     setIsSubmitting(true);

//     // Faça a solicitação de cadastro usando Axios
//     try {
//       const response = await axios.post('https://6584f29b022766bcb8c7b0b2.mockapi.io/api/carouselData/items', {
//         title: titulo.value,
//         description: descricao.value,
//         image: urlArquivo.value,
//         link: urlDirecionamento.value,
//         order: ordem.value,
//       });

//       // Atualize a lista chamando a função do componente pai
//       onCadastroSucesso();

//       console.log('Imagem cadastrada com sucesso:', response.data);

//       // Feche o painel após o cadastro bem-sucedido
//       dismissPanel();
//     } catch (error) {
//       console.error('Erro ao cadastrar imagem:', error);
//     } finally {
//       // Finalize o processo de envio do formulário, independentemente do resultado
//       setIsSubmitting(false);
//     }
//   };

//   const onRenderFooterContent = React.useCallback(
//     () => (
//       <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
//         <DefaultButton onClick={dismissPanel} disabled={isSubmitting}>Cancelar</DefaultButton>
//         <PrimaryButton onClick={handleCadastroImagem} text="Salvar alterações" styles={primaryButtonStyle} disabled={isSubmitting} />
//       </div>
//     ),
//     [dismissPanel, handleCadastroImagem, isSubmitting],
//   );

//   return (
//     <div>
//         <IconButton
//             iconProps={{ iconName: 'Edit' }}
//             title="Edit"
//             ariaLabel="Edit"
//             onClick={openPanel}
//             style={{ color: '#ffb500' }} />
//       {/* <DefaultButton text="Open panel" onClick={openPanel} /> */}
//       <Panel
//         isOpen={isOpen}
//         onDismiss={dismissPanel}
//         headerText="Editar imagem"
//         closeButtonAriaLabel="Close"
//         type={PanelType.medium}
//         onRenderFooterContent={onRenderFooterContent}
//         isFooterAtBottom={true}
//       >
//         <form noValidate autoComplete="off">
//           <Stack horizontal tokens={stackTokens} styles={stackStyles}>
//             <Stack {...columnProps}>
//               <TextField
//                 id="titulo"
//                 label="Título"
//                 errorMessage={formErrors['titulo']}
//                 required
//                 maxLength={50}
//                 onChange={() => setFormErrors({ ...formErrors, titulo: undefined })}
//               />
//               <TextField
//                 id="descricao"
//                 label="Descrição"
//                 multiline
//                 resizable={false}
//                 errorMessage={formErrors['descricao']}
//                 required
//                 maxLength={430}
//                 style={{ height: '100px' }}
//                 onChange={() => setFormErrors({ ...formErrors, descricao: undefined })}
//               />
//               <TextField
//                 id="urlArquivo"
//                 label="URL arquivo"
//                 errorMessage={formErrors['urlArquivo']}
//                 required
//                 onChange={() => setFormErrors({ ...formErrors, urlArquivo: undefined })}
//               />
//               <TextField
//                 id="urlDirecionamento"
//                 label="URL direcionamento"
//                 errorMessage={formErrors['urlDirecionamento']}
//                 required
//                 onChange={() => setFormErrors({ ...formErrors, urlDirecionamento: undefined })}
//               />
//               <TextField
//                 id="ordem"
//                 label="Ordem"
//                 // type='number'
//                 errorMessage={formErrors['ordem']}
//                 required
//                 onChange={(ev, newValue) => {
//                   setFormErrors({ ...formErrors, ordem: undefined });
//                   // Verifica se 'ev.target' é do tipo HTMLInputElement antes de acessar 'value'
//                   if (ev?.target instanceof HTMLInputElement) {
//                     // Remova caracteres não numéricos
//                     ev.target.value = newValue ? newValue.replace(/\D/g, '') : '';
//                   }
//                 }}
//               />
//             </Stack>
//           </Stack>
//         </form>
//       </Panel>
//     </div>
//   );
// };


