import axios from "axios";

export const GerarImagem = async (texto: string) => {
    try {
        const resposta = await axios.get(`https://cataas.com/cat/says/${texto}?json=true`);
        return resposta.data; // Retorna os dados da resposta da API
    } catch (erro) {
        console.error("Erro ao buscar imagem do gato:", erro);
        throw erro; // Re-throw o erro para ser tratado em outro lugar, se necessário
    };
}