
      // Código JavaScript para gerar os números
      const numberGrid = document.getElementById("numberGrid");
      const cartItems = document.getElementById("cartItems");
      const totalNumbers = 150;

      for (let i = 1; i <= totalNumbers; i++) {
        const numberDiv = document.createElement("div");
        numberDiv.classList.add("number");
        numberDiv.textContent = i;

        numberDiv.addEventListener("click", () => {
          if (!numberDiv.classList.contains("selected")) {
            numberDiv.classList.add("selected");

            const cartItem = document.createElement("li");
            cartItem.textContent = i;
            cartItems.appendChild(cartItem);
          } else {
            numberDiv.classList.remove("selected");

            const cartItem = Array.from(cartItems.children).find(
              (item) => item.textContent === i.toString()
            );
            if (cartItem) {
              cartItems.removeChild(cartItem);
            }
          }

          updateTotalValue(); // Adicionando chamada para atualizar o valor total após selecionar ou remover números
          updateCartVisibility(); // Adicionando chamada para atualizar a visibilidade do carrinho
        });

        numberGrid.appendChild(numberDiv);
      }

      // Função para limpar o carrinho
      function clearCart() {
        const selectedNumbers = document.getElementsByClassName("selected");
        while (selectedNumbers.length > 0) {
          selectedNumbers[0].classList.remove("selected");
        }

        cartItems.innerHTML = "";
        updateTotalValue(); // Chamada para atualizar o valor total após limpar o carrinho
        updateCartVisibility(); // Chamada para atualizar a visibilidade do carrinho após limpar o carrinho
      }

      // Função para realizar o checkout
      function checkout() {
        const selectedNumbers = Array.from(
          document.getElementsByClassName("selected")
        ).map((div) => div.textContent);
        console.log("Números selecionados: ", selectedNumbers);

        // Cálculo do valor total dos números selecionados (R$ 1,00 por número)
        const totalValue = selectedNumbers.length * 5;

        // Exibir o valor total no carrinho
        const totalValueElement = document.getElementById("totalValue");
        totalValueElement.textContent = "R$ " + totalValue.toFixed(2); // Formatando o valor para 2 casas decimais
      }

      // Função para atualizar a visibilidade do carrinho
      function showCart() {
        const cart = document.getElementById("cart");
        cart.style.display = "block";
        clearTimeout(cartTimer); // Limpa o timer para manter o carrinho visível enquanto está interagindo
      }

      // Função para ocultar o carrinho após 5 segundos de inatividade
      let cartTimer; // Variável para armazenar o timer do carrinho

      function hideCart() {
        const cart = document.getElementById("cart");
        cart.style.display = "none";
      }

      function updateCartVisibility() {
        const cart = document.getElementById("cart");
        const cartItems = document.getElementsByClassName("selected");

        if (cartItems.length > 0) {
          cart.style.display = "block";

          // Configura um timer para ocultar o carrinho após 5 segundos de inatividade
          clearTimeout(cartTimer);
          cartTimer = setTimeout(hideCart, 5000);
        } else {
          cart.style.display = "none";
        }
      }

      function updateTotalValue() {
        const selectedNumbers = Array.from(
          document.getElementsByClassName("selected")
        ).map((div) => div.textContent);
        const totalValue = selectedNumbers.length * 5;
        const totalValueElement = document.getElementById("totalValue");
        totalValueElement.textContent = "R$ " + totalValue.toFixed(2);
      }

      // Atualizar o valor total ao carregar a página
      updateTotalValue();
