# PIXIE 📸

## 💡 A Ideia

PIXIE nasceu da necessidade de criar uma plataforma simples e intuitiva para compartilhamento de fotos, focada na experiência do usuário e na facilidade de uso. A ideia central é proporcionar um espaço onde pessoas possam expressar momentos através de imagens, sem complexidades desnecessárias, mantendo o foco no que realmente importa: compartilhar memórias e conectar pessoas.

O nome "PIXIE" reflete a magia e simplicidade que uma foto pode transmitir - assim como as criaturas místicas que dão nome ao app, cada imagem compartilhada carrega sua própria magia e história única.

## 🎯 Objetivo

O objetivo principal do PIXIE é democratizar o compartilhamento de fotos, oferecendo uma alternativa clean e focada às redes sociais tradicionais. Queremos criar um ambiente onde:

- **Simplicidade seja prioridade**: Interface limpa e intuitiva
- **Qualidade supere quantidade**: Foco na experiência, não em métricas
- **Conexões genuínas**: Interações significativas entre usuários
- **Privacidade e segurança**: Controle total sobre o conteúdo compartilhado
- **Acessibilidade**: Funcionalidades essenciais sem sobrecarregar o usuário

## ⚡ Funcionalidades

### 🔐 Autenticação Segura
- **Login/Registro** com email e senha
- **Persistência de sessão** - usuário permanece logado
- **Validação em tempo real** de credenciais
- **Logout seguro** com limpeza de dados locais

### 📸 Captura e Upload de Imagens
- **Galeria de fotos** - acesso às imagens do dispositivo
- **Câmera integrada** - captura de fotos instantâneas
- **Edição básica** - corte quadrado automático
- **Compressão inteligente** - otimização de tamanho sem perder qualidade
- **Upload seguro** para nuvem com URLs únicos

### 🏠 Feed Dinâmico
- **Timeline em tempo real** - atualizações instantâneas
- **Ordenação cronológica** - posts mais recentes primeiro
- **Visualização otimizada** - carregamento eficiente de imagens
- **Informações do usuário** - identificação clara do autor
- **Legendas e timestamps** - contexto completo de cada post

### 👤 Perfil Personalizado
- **Avatar único** - inicial do email como identificação visual
- **Galeria pessoal** - grid organizado de todas as publicações
- **Estatísticas** - contador de posts publicados
- **Menu lateral** - acesso rápido a configurações e opções
- **Histórico completo** - acesso a todas as publicações anteriores

### 💬 Sistema de Comentários
- **Comentários pré-definidos** - adicione comentários antes da publicação
- **Gestão de comentários** - edite e remova comentários
- **Identificação do autor** - cada comentário mostra quem escreveu
- **Integração com posts** - comentários são salvos junto com a publicação

## 🛠️ Ferramentas e Tecnologias

### 📱 Frontend Mobile
- **React Native** - Framework para desenvolvimento multiplataforma
  - Permite criar apps nativos para iOS e Android com uma única base de código
  - Performance próxima ao nativo
  - Comunidade ativa e vasta biblioteca de componentes

- **Expo** - Plataforma de desenvolvimento React Native
  - Facilita o desenvolvimento e teste
  - Acesso simplificado a APIs nativas
  - Build e deploy automatizados

### 🔙 Backend e Infraestrutura
- **Firebase Authentication** - Sistema de autenticação robusto
  - Gerenciamento seguro de usuários
  - Múltiplos provedores de login
  - Tokens JWT automáticos

- **Cloud Firestore** - Banco de dados NoSQL em tempo real
  - Sincronização em tempo real
  - Queries complexas e eficientes
  - Escalabilidade automática
  - Offline support integrado

- **Firebase Storage** - Armazenamento de arquivos na nuvem
  - Upload seguro de imagens
  - CDN global para carregamento rápido
  - Controle granular de permissões

### 🧭 Navegação e Experiência
- **React Navigation** - Sistema de navegação nativo
  - Transições suaves entre telas
  - Gestão de estado de navegação
  - Suporte a deep linking

- **Expo Image Picker** - Acesso à câmera e galeria
  - Permissões gerenciadas automaticamente
  - Múltiplos formatos de imagem
  - Controle de qualidade e tamanho

### 💾 Armazenamento Local
- **AsyncStorage** - Persistência de dados local
  - Cache de dados importantes
  - Preferências do usuário
  - Tokens de autenticação
