# Tickets 4-Way

Frontend de uma plataforma de venda e gerenciamento de ingressos para eventos. O projeto apresenta eventos disponíveis, detalhes de cada evento, fluxo de compra, consulta de ingressos e páginas institucionais.

## Funcionalidades

- Listagem de eventos e visualização de detalhes
- Mapa do evento
- Seleção de ingressos e quantidade
- Cadastro, login e área do usuário
- Consulta de ingressos e dados da conta
- Cadastro de eventos para produtores
- Páginas de dúvidas, políticas, cancelamentos e pontos de venda
- Interface responsiva para desktop e dispositivos móveis

## Tecnologias

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- Bootstrap Icons
- Google Fonts locais (DM Sans)

## Como executar

O projeto não possui etapa de build nem dependências de Node.js. Como os eventos e cartões são carregados com `fetch`, execute-o usando um servidor HTTP local.

### VS Code

1. Abra a pasta no VS Code.
2. Instale uma extensão de servidor local, como Live Server.
3. Abra `index.html` pelo servidor local.

### Python

Com Python instalado, execute na raiz do projeto:

```bash
python -m http.server 8000
```

Depois acesse [http://localhost:8000](http://localhost:8000) no navegador.

## Estrutura do projeto

```text
.
├── index.html                 # Página inicial
├── event.html                 # Detalhes e compra de ingressos
├── event-map.html             # Mapa do evento
├── my-account.html            # Conta do usuário
├── my-tickets.html            # Ingressos do usuário
├── events.json                # Dados dos eventos
├── cards.json                 # Dados dos cartões
├── assets/css/                # Bootstrap e estilos do projeto
├── assets/js/                 # Scripts de eventos, cartões e interface
├── assets/img/                # Logos, ícones e imagens
└── assets/fonts/              # Fontes utilizadas pela interface
```

## Páginas principais

- `index.html`: início e eventos em destaque
- `about-us.html`: sobre a Tickets 4-Way
- `event.html`: informações e compra de ingressos
- `your-event-here.html`: cadastro de evento
- `outlets.html`: pontos de venda
- `questions.html`: dúvidas frequentes

## Status

Este repositório contém a camada visual e a interação client-side da plataforma. A integração com serviços reais de autenticação, pagamentos e persistência de pedidos não faz parte deste protótipo.

## Licença

Este projeto foi desenvolvido como trabalho freelance. Consulte o responsável pelo repositório antes de reutilizar o código, as imagens ou a identidade visual.
