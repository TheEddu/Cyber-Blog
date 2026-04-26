
# Aula Prática - Configuração de Roteador Archer72

### **Cenário**

Nesta atividade, realizamos a configuração inicial de um roteador **Archer72**, conectado à internet por meio da porta WAN com obtenção automática de IP (DHCP). Um computador foi utilizado para acessar a interface de gerenciamento do equipamento via navegador.

A rede local foi planejada com o endereço **192.168.10.1/24**, com distribuição automática de IPs (DHCP) para os dispositivos conectados. Também foi configurada uma outra rede "para visitantes", Guest, com limitação de velocidade.

### **Proposta**

- Definir a rede local como **192.168.10.0/24**
    
- Configurar o servidor DHCP com faixa de distribuição de **192.168.10.50 à 192.168.10.200**
    
- Criar duas redes Wi-Fi:
    
    - **NETWORK_A** (rede principal)
        
    - **GUEST_A** (rede de visitantes)
        
- Aplicar limite de banda de **50 Mbps** para a rede Guest

![Proposta](/Cyber-Blog/images/routerConfiguration/proposta.jpg)
(Desenho feito pelo professor para orientações)

---
### **Procedimentos realizados**

1. **Reset do roteador** 
    Inicialmente, restauramos para as configurações de fábrica utilizando o botão físico de reset, para podermos trabalhar em com um ambiente limpo.
    
2. **Acesso ao painel administrativo**  
    O computador foi conectado ao roteador via cabo de rede. Utilizando o comando `ipconfig`, foi possível identificar o gateway padrão e acessar o painel de configuração pelo navegador.
    
3. **Configuração inicial de acesso**  
    Redefinimos uma nova senha de administrador.
    
4. **Configuração da WAN**  
    A conexão com a internet foi definida como **Dynamic IP (DHCP)**, permitindo que o roteador recebesse automaticamente um endereço IP.
    
5. **Alteração do endereço IP da rede**  
    O IP LAN do roteador foi alterado para **192.168.10.1**. Após essa alteração, foi necessário acessar novamente o painel utilizando o novo endereço.
    
6. **Configuração das redes Wi-Fi**
    
    - Rede principal: **NETWORK_A**
        
    - Rede visitante: **GUEST_A**  
        
        Ambas foram configuradas com senha e protocolo de segurança **WPA/WPA2-Personal**.
        
7. **Ativação da rede Guest**  
    A rede de visitantes foi ativada com restrições específicas para controle de uso.
    
8. **Configuração do servidor DHCP**  
    Foi definida a faixa de distribuição de IPs de **192.168.10.50 a 192.168.10.200**, permitindo a conexão automática de múltiplos dispositivos.
    
9. **Limitação de banda da rede Guest**  
    Foi aplicado um limite de **50 Mbps** para dispositivos conectados à rede de visitantes, 
    evitando impacto na rede principal.
    
---

### **Testes realizados**

Após a configuração, foram realizados testes práticos para validar o funcionamento:

- Conexão à rede Wi-Fi utilizando um celular
    
- Verificação da distribuição automática de IP, pudemos ver que cada celular recebeu um Endereço IP dentro do range estabelecido.
    
- Teste de acesso à internet em ambas as redes, constatamos que a navegação estava disponível!
    
- Bloqueio e desbloqueio de um dispositivo conectado, validando o controle de acesso do roteador
    
![Demonstração](/Cyber-Blog/images/routerConfiguration/demonstracao.jpg)
---

### **Benefícios da configuração realizada**

- **Organização da rede:** separação entre rede principal e visitantes aumenta a segurança e o controle
    
- **Gerenciamento eficiente de IPs:** uso de DHCP facilita a conexão de novos dispositivos
    
- **Controle de banda:** evita que usuários da rede Guest consumam recursos excessivos
    
- **Segurança básica:** uso de autenticação WPA/WPA2 protege contra acessos não autorizados
    

---

### **Aprendizados obtidos**

Durante a prática, pudemos ver prática conceitos importantes de redes, como:

- Funcionamento de um roteador em ambiente doméstico ou corporativo
    
- Importância do DHCP na automação da rede
    
- Criação e gerenciamento de múltiplas redes Wi-Fi
    
- Aplicação de políticas simples de controle de acesso e banda
    
- Importância de alterar credenciais padrão por motivos de segurança
    

Além disso, a atividade ajudou a desenvolver habilidades práticas de configuração e validação de rede, fundamentais para atuação na área de infraestrutura e suporte.

