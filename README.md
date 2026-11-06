# Aula 3 – IA para Dev
**Curso:** Kodie

Na aula 3 do curso Kodie, sobre IA para Dev, desenvolvemos a interface de um chatbot utilizando os agentes GitHub Copilot e OpenCode.

## 1. GitHub Copilot

Nas configurações do GitHub Copilot, utilizamos o modelo de agente personalizado.

**Função:** funciona como um chat tradicional, com interação passo a passo.

**Como funciona:** o Copilot sugere códigos, explica bugs e esclarece dúvidas durante a conversa. No modo utilizado, ele não altera os arquivos nem executa comandos no terminal por conta própria. O desenvolvedor fica responsável por copiar, aplicar e executar o código no projeto.

Por esse motivo, foram criados arquivos `.md` (Markdown) com instruções sobre como deveria ser o chatbot. Esses documentos especificavam as linguagens de marcação e programação, a estilização, o tipo de layout, as fontes e outras características da interface.

A ferramenta gerou todo o código, mas não executou a aplicação. Cabe ao programador realizar essa etapa.

Também utilizamos o seguinte prompt no chat:

> Crie uma interface minimalista utilizando HTML, CSS e JavaScript. A aplicação deve seguir rigorosamente o que foi especificado no arquivo space.md. Além disso, deve implementar rigorosamente as diretrizes visuais definidas em design-system.md.

Após a geração dos arquivos, o chat apresentou um feedback sobre a operação, incluindo o tempo gasto, as ações realizadas, os arquivos gerados e as informações sobre o processo de geração.

## 2. OpenCode

O OpenCode apresenta um fluxo de utilização um pouco mais complexo quando comparado ao GitHub Copilot.

No GitHub Copilot, ao inserir o prompt no chat, a ferramenta inicia o processo de geração de código sem exigir configurações adicionais no fluxo utilizado, além da seleção do tipo de agente.

No OpenCode, por outro lado, existem algumas particularidades:

### Comandos e funcionalidades

- **`[Pasted ~1 line]`:** ao inserir o prompt no chat, é necessário clicar nessa opção para visualizar o conteúdo inserido.
- **`Shift + Tab`:** permite selecionar o tipo de agente.
- **`Ctrl + P`:** abre a sessão de comandos para realizar configurações.
- **`@`:** ao utilizar esse caractere no campo de prompt, o OpenCode apresenta uma opção de seleção de arquivos, facilitando a identificação e a inclusão de arquivos específicos no contexto da conversa com o agente.

Esse último recurso é especialmente útil quando precisamos direcionar a IA para consultar arquivos específicos do projeto, fornecendo mais contexto para a realização da tarefa.

### Configurações utilizadas

Durante a aula, utilizei:

- **Modo:** Build.
- **Modelo:** MiMo-V2.6-FlashFree.

Outro ponto interessante é que o OpenCode também apresenta feedbacks mais detalhados sobre as operações realizadas.

## 3. Observações e aprendizados

A atividade permitiu conhecer duas ferramentas de desenvolvimento com IA e observar diferenças na configuração, autonomia dos agentes e interação com o desenvolvedor.

Foi possível perceber que os arquivos Markdown desempenham um papel importante na documentação e especificação dos projetos, pois permitem fornecer instruções mais organizadas e detalhadas para orientar a IA.

Também ficou evidente que, mesmo utilizando ferramentas capazes de gerar códigos e estruturas completas, o desenvolvedor continua responsável por revisar, testar e validar o resultado.

A escolha da ferramenta depende das necessidades do projeto e do nível de autonomia desejado durante o desenvolvimento.
